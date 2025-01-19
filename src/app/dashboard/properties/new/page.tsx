'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from 'lodash';

interface Tenant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface PropertyFormData {
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    zipCode: string;
    type: string;
    surface: number;
    users: number[];
}

const propertyTypes = [
    'Maison',
    'Appartement',
    'Studio',
    'Loft',
    'Local commercial',
    'Terrain',
    'Autre'
];

export default function NewPropertyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

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

    useEffect(() => {
        // Charger la liste initiale des locataires
        const fetchTenants = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/role/tenant`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setTenants(data);
                }
            } catch (err) {
                console.error('Erreur lors du chargement des locataires:', err);
            }
        };

        if (currentStep === 2) {
            fetchTenants();
        }
    }, [currentStep]);

    const searchTenants = debounce(async (query: string) => {
        if (!query) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/lastname/${query}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTenants(data);
            }
        } catch (err) {
            console.error('Erreur lors de la recherche des locataires:', err);
        }
    }, 300);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            searchTenants(query);
        } else {
            // Réinitialiser la liste des locataires si la recherche est vide
            const fetchTenants = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/role/tenant`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setTenants(data);
                    }
                } catch (err) {
                    console.error('Erreur lors du chargement des locataires:', err);
                }
            };
            fetchTenants();
        }
    };

    const handleSelectTenant = (tenant: Tenant) => {
        setSelectedTenant(tenant);
        setFormData(prev => ({
            ...prev,
            users: [tenant.id]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (currentStep === 1) {
            setCurrentStep(2);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    users: formData.users
                })
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/dashboard/properties');
                }, 2000);
            } else {
                const data = await response.json();
                setError(data.message || 'Une erreur est survenue lors de la création du bien');
            }
        } catch (err) {
            setError('Une erreur est survenue lors de la communication avec le serveur');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['price', 'surface'].includes(name) ? parseFloat(value) || 0 : value
        }));
    };

    const renderStepContent = () => {
        if (currentStep === 1) {
            return (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Titre */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Titre
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="ex: Maison T4 avec jardin"
                        />
                    </div>

                    {/* Type de bien */}
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Type de bien
                        </label>
                        <select
                            id="type"
                            name="type"
                            required
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            {propertyTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    {/* Surface */}
                    <div>
                        <label htmlFor="surface" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Surface (m²)
                        </label>
                        <input
                            type="number"
                            id="surface"
                            name="surface"
                            required
                            min="0"
                            value={formData.surface}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Prix */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Loyer mensuel (€)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            required
                            min="0"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Adresse */}
                    <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Adresse
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Ville */}
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Ville
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    {/* Code postal */}
                    <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Code postal
                        </label>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            required
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            pattern="[0-9]{5}"
                            title="Le code postal doit contenir 5 chiffres"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Description détaillée du bien..."
                        />
                    </div>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                <div>
                    <label htmlFor="searchTenant" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Rechercher un locataire
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            id="searchTenant"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Rechercher par nom..."
                        />
                    </div>
                </div>

                <div className="mt-4 space-y-2">
                    {tenants.map((tenant) => (
                        <div
                            key={tenant.id}
                            onClick={() => handleSelectTenant(tenant)}
                            className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedTenant?.id === tenant.id
                                ? 'bg-blue-50 dark:bg-blue-900/50 border-2 border-blue-500'
                                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                        {tenant.firstName} {tenant.lastName}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {tenant.email}
                                    </p>
                                </div>
                                {selectedTenant?.id === tenant.id && (
                                    <svg
                                        className="h-5 w-5 text-blue-500"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M5 13l4 4L19 7"></path>
                                    </svg>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {currentStep === 1 ? 'Ajouter un nouveau bien' : 'Sélectionner un locataire'}
                            </h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {currentStep === 1
                                    ? 'Remplissez les informations ci-dessous pour créer un nouveau bien immobilier'
                                    : 'Sélectionnez un locataire à associer à ce bien'
                                }
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`w-3 h-3 rounded-full ${currentStep === 1 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                            <span className={`w-3 h-3 rounded-full ${currentStep === 2 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-md">
                        <p className="text-sm text-green-600 dark:text-green-400">
                            Le bien a été créé avec succès ! Redirection en cours...
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {renderStepContent()}

                    <div className="flex justify-end space-x-4">
                        {currentStep === 2 && (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Retour
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading || (currentStep === 2 && !selectedTenant)}
                            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(loading || (currentStep === 2 && !selectedTenant)) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading
                                ? 'Création en cours...'
                                : currentStep === 1
                                    ? 'Suivant'
                                    : 'Créer le bien'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 