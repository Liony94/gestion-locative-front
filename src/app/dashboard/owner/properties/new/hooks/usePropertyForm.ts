import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PropertyFormData } from '../types';
import { Property } from '@/types/property';

export const usePropertyForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [createdPropertyData, setCreatedPropertyData] = useState<Property | null>(null);

    const [formData, setFormData] = useState<PropertyFormData>({
        title: '',
        description: '',
        price: 0,
        address: '',
        city: '',
        zipCode: '',
        type: 'Maison',
        surface: 0,
        users: [],
        images: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['price', 'surface'].includes(name) ? parseFloat(value) || 0 : value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);

            // Ajouter les nouvelles images aux images existantes
            setSelectedImages(prevImages => [...prevImages, ...newFiles]);

            // Créer des URLs de prévisualisation pour les nouvelles images
            const newUrls = newFiles.map(file => URL.createObjectURL(file));
            setPreviewUrls(prevUrls => [...prevUrls, ...newUrls]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));

        // Révoquer l'URL de prévisualisation de l'image supprimée
        URL.revokeObjectURL(previewUrls[index]);
        setPreviewUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (currentStep === 1) {
            setCurrentStep(2);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const formDataToSend = new FormData();

            // Ajouter les champs du formulaire
            Object.keys(formData).forEach(key => {
                if (key !== 'images' && key !== 'users') {
                    formDataToSend.append(key, formData[key].toString());
                }
            });

            // Ajouter les images
            selectedImages.forEach(image => {
                formDataToSend.append('images', image);
            });

            console.log('Envoi des données:', {
                images: selectedImages.map(img => img.name),
                formData: Object.fromEntries(formDataToSend.entries())
            });

            const createResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/new`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            if (!createResponse.ok) {
                const data = await createResponse.json();
                throw new Error(data.message || 'Erreur lors de la création du bien');
            }

            const property = await createResponse.json();
            setCreatedPropertyData(property as Property);

            if (formData.users.length > 0) {
                const addTenantsResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/${property.id}/tenants`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ tenantIds: formData.users })
                });

                if (!addTenantsResponse.ok) {
                    throw new Error('Erreur lors de l\'ajout des locataires');
                }
            }

            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la communication avec le serveur');
        } finally {
            setLoading(false);
        }
    };

    const updateUsers = (userId: number) => {
        setFormData(prev => ({
            ...prev,
            users: [userId]
        }));
    };

    // Nettoyer les URLs de prévisualisation lors du démontage du composant
    const cleanup = () => {
        previewUrls.forEach(url => URL.revokeObjectURL(url));
    };

    return {
        formData,
        loading,
        error,
        success,
        currentStep,
        setCurrentStep,
        handleChange,
        handleSubmit,
        updateUsers,
        handleImageChange,
        selectedImages,
        previewUrls,
        cleanup,
        removeImage,
        createdPropertyData
    };
}; 