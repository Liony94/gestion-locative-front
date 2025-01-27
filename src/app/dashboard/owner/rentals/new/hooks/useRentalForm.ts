import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RentalFormData, DEFAULT_RENTAL_FORM_DATA, Rental } from '@/types/rental';
import { Property } from '@/types/property';
import { User } from '@/types/user';
import { api } from '@/services/api';

export const useRentalForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState<RentalFormData>(DEFAULT_RENTAL_FORM_DATA);
    const [createdRentalData, setCreatedRentalData] = useState<Rental | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [tenants, setTenants] = useState<User[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    // Charger les propriétés et les locataires
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propertiesResponse, tenantsResponse] = await Promise.all([
                    api.get('/properties/owner'),
                    api.get('/user/tenants')
                ]);
                setProperties(propertiesResponse.data);
                setTenants(tenantsResponse.data);
            } catch (err) {
                console.error('Erreur lors du chargement des données:', err);
                setError('Erreur lors du chargement des données');
            } finally {
                setLoadingData(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : (name === 'propertyId' || name === 'tenantId')
                    ? parseInt(value) || 0
                    : value
        }));

        // Validation des dates
        if (name === 'startDate' || name === 'endDate') {
            const startDate = name === 'startDate' ? new Date(value) : new Date(formData.startDate);
            const endDate = name === 'endDate' ? new Date(value) : formData.endDate ? new Date(formData.endDate) : null;

            if (endDate && startDate > endDate) {
                setError('La date de fin doit être postérieure à la date de début');
            } else {
                setError(null);
            }
        }
    }, [formData.startDate]);

    const handleArrayChange = (name: string, value: string[]) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = (): boolean => {
        if (!formData.name.trim()) {
            setError('Le nom de la location est requis');
            return false;
        }

        if (!formData.startDate) {
            setError('La date de début est requise');
            return false;
        }

        if (formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
            setError('La date de fin doit être postérieure à la date de début');
            return false;
        }

        if (formData.rent <= 0) {
            setError('Le loyer doit être supérieur à 0');
            return false;
        }

        if (!formData.propertyId || formData.propertyId === 0) {
            setError('Veuillez sélectionner une propriété');
            return false;
        }

        if (!formData.tenantId || formData.tenantId === 0) {
            setError('Veuillez sélectionner un locataire');
            return false;
        }

        return true;
    };

    const handleSubmit = useCallback(async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Fonction utilitaire pour convertir les nombres décimaux
            const toDecimal = (value: any): string => {
                if (value === null || value === undefined || value === '') {
                    return '0.00';
                }
                const strValue = String(value).replace(',', '.');
                const num = parseFloat(strValue);
                return isNaN(num) ? '0.00' : num.toFixed(2);
            };

            // Préparer les données avec les bonnes conversions de types
            const rentalData = {
                name: formData.name.trim(),
                description: formData.description?.trim() || undefined,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
                rent: toDecimal(formData.rent),
                charges: formData.charges ? toDecimal(formData.charges) : undefined,
                deposit: formData.deposit ? toDecimal(formData.deposit) : undefined,
                surface: formData.surface ? toDecimal(formData.surface) : undefined,
                isFurnished: Boolean(formData.isFurnished),
                furniture: Array.isArray(formData.furniture) ? formData.furniture.filter(item => item.trim()) : [],
                propertyId: Number(formData.propertyId),
                tenantId: Number(formData.tenantId)
            };

            // Appeler l'API
            const response = await api.post('/rentals', rentalData);
            setCreatedRentalData(response.data);
            setSuccess(true);
        } catch (err: any) {
            console.error('Erreur détaillée:', err.response?.data);
            setError(err.response?.data?.message?.[0] || 'Une erreur est survenue lors de la création de la location');
        } finally {
            setLoading(false);
        }
    }, [formData]);

    const cleanup = useCallback(() => {
        setFormData(DEFAULT_RENTAL_FORM_DATA);
        setError(null);
        setSuccess(false);
        setCreatedRentalData(null);
    }, []);

    return {
        formData,
        loading,
        loadingData,
        error,
        success,
        properties,
        tenants,
        handleChange,
        handleArrayChange,
        handleSubmit,
        cleanup,
        createdRentalData
    };
}; 