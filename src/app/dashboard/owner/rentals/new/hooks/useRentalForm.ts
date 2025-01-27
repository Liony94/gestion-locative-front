'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/services/api';
import { User } from '@/types/user';
import { Property } from '@/types/property';
import { RentalFormData, PaymentFrequency, PaymentType, ChargeType, RentalType, UsageType, Rental } from '@/types/rental';

export const DEFAULT_RENTAL_FORM_DATA: RentalFormData = {
    // Relations
    propertyId: 0,
    tenantId: 0,

    // Informations générales
    type: RentalType.EMPTY_HOUSING,
    usage: UsageType.MAIN_RESIDENCE,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    tacitRenewal: true,
    name: '',
    description: '',

    // Paiement
    paymentFrequency: PaymentFrequency.MONTHLY,
    paymentType: PaymentType.IN_ADVANCE,
    paymentDay: 1,
    rent: 0,
    rentVatRate: 0,
    charges: 0,
    chargeType: ChargeType.PROVISION,
    chargesVatRate: 0,
    deposit: 0,
    housingBenefit: 0,
    latePaymentFee: 0,

    // Révision de loyer
    rentRevisionEnabled: true,
    rentRevisionIndex: 'IRL',
    rentRevisionPeriod: 12,

    // Encadrement des loyers
    rentControlEnabled: false,
    referenceRent: 0,
    maxRent: 0,
    rentSupplement: 0,
    rentSupplementJustification: '',

    // Travaux
    ownerWorkAmount: 0,
    ownerWorkDescription: '',
    tenantWorkAmount: 0,
    tenantWorkDescription: '',

    // Informations complémentaires
    specialConditions: '',
    specialClauses: '',
    comments: '',

    // État des lieux
    checkInDate: '',
    checkInNotes: '',
    checkOutDate: '',
    checkOutNotes: '',

    // Quittances
    billingDay: 1,
    separateBillingAddress: false,
    billingAddress: '',
    documentTitle: 'Quittance',
    automaticNumbering: true,
    includeNoticeSecondPage: false,
    receiptText: '',
    noticeText: '',

    // Autres réglages
    balanceReportType: 'manual',
    notifyOwner: true,
    notifyTenant: true,
    notifyContractEnd: true,
    isActive: true
};

export const useRentalForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState<RentalFormData>(DEFAULT_RENTAL_FORM_DATA);
    const [properties, setProperties] = useState<Property[]>([]);
    const [tenants, setTenants] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [createdRentalData, setCreatedRentalData] = useState<Rental | null>(null);

    useEffect(() => {
        const propertyId = searchParams.get('propertyId');
        if (propertyId) {
            setFormData(prev => ({ ...prev, propertyId: parseInt(propertyId, 10) }));
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingData(true);
                const [propertiesResponse, tenantsResponse] = await Promise.all([
                    api.get('/properties/owner'),
                    api.get('/user/tenants')
                ]);
                setProperties(propertiesResponse.data);
                setTenants(tenantsResponse.data);
                setError(null);
            } catch (err) {
                console.error('Erreur lors du chargement des données:', err);
                setError('Impossible de charger les données nécessaires');
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (name: keyof RentalFormData, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleArrayChange = (name: keyof RentalFormData, value: any[]) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.propertyId) return 'Veuillez sélectionner un bien';
        if (!formData.tenantId) return 'Veuillez sélectionner un locataire';
        if (!formData.type) return 'Veuillez sélectionner un type de location';
        if (!formData.usage) return 'Veuillez sélectionner un usage';
        if (!formData.startDate) return 'Veuillez sélectionner une date de début';
        if (!formData.rent) return 'Veuillez saisir un montant de loyer';
        if (!formData.deposit) return 'Veuillez saisir un montant de dépôt de garantie';
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Conversion des dates au format attendu par le backend
            const rentalData = {
                ...formData,
                propertyId: parseInt(formData.propertyId.toString(), 10),
                tenantId: parseInt(formData.tenantId.toString(), 10),
                name: formData.name || `Location ${new Date().toISOString().split('T')[0]}`,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
                checkInDate: formData.checkInDate ? new Date(formData.checkInDate).toISOString() : null,
                checkOutDate: formData.checkOutDate ? new Date(formData.checkOutDate).toISOString() : null,
                paymentFrequency: formData.paymentFrequency as PaymentFrequency
            };

            console.log('Fréquence de paiement envoyée:', formData.paymentFrequency);
            console.log('Données envoyées au backend:', rentalData);
            const response = await api.post('/rentals', rentalData);
            setCreatedRentalData(response.data);
            setSuccess(true);
        } catch (err: any) {
            console.error('Erreur lors de la création de la location:', err);
            setError(err.response?.data?.message || 'Une erreur est survenue lors de la création de la location');
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const cleanup = () => {
        setFormData(DEFAULT_RENTAL_FORM_DATA);
        setError(null);
        setSuccess(false);
        setCreatedRentalData(null);
    };

    return {
        formData,
        properties,
        tenants,
        loading,
        loadingData,
        error,
        success,
        createdRentalData,
        handleChange,
        handleArrayChange,
        handleSubmit,
        cleanup
    };
}; 