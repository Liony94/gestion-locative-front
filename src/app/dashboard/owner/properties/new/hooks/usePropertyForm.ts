import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PropertyFormData } from '../types';

export const usePropertyForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState<PropertyFormData>({
        title: '',
        description: '',
        price: 0,
        address: '',
        city: '',
        zipCode: '',
        type: 'Maison',
        surface: 0,
        users: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['price', 'surface'].includes(name) ? parseFloat(value) || 0 : value
        }));
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

            // Créer la propriété
            const createResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!createResponse.ok) {
                const data = await createResponse.json();
                throw new Error(data.message || 'Erreur lors de la création du bien');
            }

            const property = await createResponse.json();

            // Ajouter les locataires si présents
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
            setTimeout(() => {
                router.push('/dashboard/owner/properties');
            }, 2000);
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

    return {
        formData,
        loading,
        error,
        success,
        currentStep,
        setCurrentStep,
        handleChange,
        handleSubmit,
        updateUsers
    };
}; 