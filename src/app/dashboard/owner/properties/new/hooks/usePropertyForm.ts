import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { PropertyFormData, DEFAULT_PROPERTY_FORM_DATA } from '../types';
import { Property } from '@/types/property';
import { api } from '@/services/api';

export const usePropertyForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [createdPropertyData, setCreatedPropertyData] = useState<Property | null>(null);

    const [formData, setFormData] = useState<PropertyFormData>(DEFAULT_PROPERTY_FORM_DATA);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    }, []);

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newPreviewUrls: string[] = [];
        const fileArray = Array.from(files);

        fileArray.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviewUrls.push(reader.result as string);
                if (newPreviewUrls.length === fileArray.length) {
                    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
                }
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const removeImage = useCallback((index: number) => {
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    }, []);

    const handleSubmit = useCallback(async () => {
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

            // Fonction utilitaire pour convertir les entiers
            const toInteger = (value: any): number => {
                if (value === null || value === undefined || value === '') {
                    return 0;
                }
                const num = parseInt(String(value));
                return isNaN(num) ? 0 : num;
            };

            // Préparer les données avec les bonnes conversions de types
            const propertyData = {
                // Champs obligatoires avec valeurs par défaut
                identifier: formData.identifier || '',
                type: formData.type || 'APARTMENT',
                address: formData.address || '',
                city: formData.city || '',
                zipCode: formData.zipCode || '',
                country: formData.country || 'France',

                // Conversion forcée en chaînes décimales
                rentExcludingCharges: toDecimal(formData.rentExcludingCharges),
                charges: toDecimal(formData.charges),
                surface: toDecimal(formData.surface),
                acquisitionPrice: formData.acquisitionPrice ? toDecimal(formData.acquisitionPrice) : undefined,
                acquisitionFees: formData.acquisitionFees ? toDecimal(formData.acquisitionFees) : undefined,
                agencyFees: formData.agencyFees ? toDecimal(formData.agencyFees) : undefined,
                currentValue: formData.currentValue ? toDecimal(formData.currentValue) : undefined,
                housingTax: formData.housingTax ? toDecimal(formData.housingTax) : undefined,
                propertyTax: formData.propertyTax ? toDecimal(formData.propertyTax) : undefined,

                // Conversion forcée en entiers
                numberOfRooms: formData.numberOfRooms ? toInteger(formData.numberOfRooms) : undefined,
                numberOfBedrooms: formData.numberOfBedrooms ? toInteger(formData.numberOfBedrooms) : undefined,
                numberOfBathrooms: formData.numberOfBathrooms ? toInteger(formData.numberOfBathrooms) : undefined,

                // Conversion forcée en booléens
                isFurnished: Boolean(formData.isFurnished),
                smokersAllowed: Boolean(formData.smokersAllowed),
                petsAllowed: Boolean(formData.petsAllowed),
                isAvailableForRent: Boolean(formData.isAvailableForRent),

                // Initialisation des tableaux
                equipment: Array.isArray(formData.equipment) ? formData.equipment : [],
                outdoorSpaces: Array.isArray(formData.outdoorSpaces) ? formData.outdoorSpaces : [],
                buildingAmenities: Array.isArray(formData.buildingAmenities) ? formData.buildingAmenities : [],
                securityFeatures: Array.isArray(formData.securityFeatures) ? formData.securityFeatures : [],
                sportsFacilities: Array.isArray(formData.sportsFacilities) ? formData.sportsFacilities : [],

                // Dates
                constructionDate: formData.constructionDate ? new Date(formData.constructionDate).toISOString() : undefined,
                acquisitionDate: formData.acquisitionDate ? new Date(formData.acquisitionDate).toISOString() : undefined,
                activityStartDate: formData.activityStartDate ? new Date(formData.activityStartDate).toISOString() : undefined,

                // Autres champs optionnels
                address2: formData.address2 || undefined,
                building: formData.building || undefined,
                staircase: formData.staircase || undefined,
                floor: formData.floor || undefined,
                number: formData.number || undefined,
                region: formData.region || undefined,
                description: formData.description || undefined,
                privateNote: formData.privateNote || undefined,
                publicDescription: formData.publicDescription || undefined,
                internalRules: formData.internalRules || undefined,
                propertyVisibility: formData.propertyVisibility || undefined,
                addressVisibility: formData.addressVisibility || undefined,
                phoneVisibility: formData.phoneVisibility || undefined,

                // Autres champs du formulaire
                buildingType: formData.buildingType || undefined,
                buildingLegalStatus: formData.buildingLegalStatus || undefined,
                lotNumber: formData.lotNumber || undefined,
                coownershipUnits: formData.coownershipUnits || undefined,
                cadastralReference: formData.cadastralReference || undefined,
                taxRegime: formData.taxRegime || undefined,
                siret: formData.siret || undefined,
                taxNumber: formData.taxNumber || undefined,
                taxCenterName: formData.taxCenterName || undefined,
                taxCenterAddress: formData.taxCenterAddress || undefined,
                taxCenterAddress2: formData.taxCenterAddress2 || undefined,
                taxCenterZipCode: formData.taxCenterZipCode || undefined,
                taxCenterCity: formData.taxCenterCity || undefined,
                taxNotes: formData.taxNotes || undefined,
                paymentFrequency: formData.paymentFrequency || undefined
            };

            // Si des images sont présentes, créer un FormData
            if (selectedImages && selectedImages.length > 0) {
                const formDataToSend = new FormData();
                formDataToSend.append('propertyData', JSON.stringify(propertyData));
                selectedImages.forEach((image, index) => {
                    formDataToSend.append('images', image);
                });

                // Appeler l'API avec le FormData
                const response = await api.post('/properties', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setCreatedPropertyData(response.data);
            } else {
                // Appeler l'API avec les données JSON
                const response = await api.post('/properties', propertyData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setCreatedPropertyData(response.data);
            }

            setSuccess(true);
        } catch (err: any) {
            console.error('Erreur détaillée:', err.response?.data);
            setError(err.response?.data?.message?.[0] || 'Une erreur est survenue lors de la création du bien');
        } finally {
            setLoading(false);
        }
    }, [formData, selectedImages]);

    const cleanup = useCallback(() => {
        setFormData(DEFAULT_PROPERTY_FORM_DATA);
        setPreviewUrls([]);
        setError(null);
        setSuccess(false);
        setCreatedPropertyData(null);
    }, []);

    return {
        formData,
        loading,
        error,
        success,
        currentStep,
        setCurrentStep,
        handleChange,
        handleSubmit,
        handleImageChange,
        selectedImages,
        previewUrls,
        cleanup,
        removeImage,
        createdPropertyData
    };
}; 