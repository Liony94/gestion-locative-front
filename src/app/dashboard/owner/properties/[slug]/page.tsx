'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import TenantDetailsModal from '../components/TenantDetailsModal';

interface Tenant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    role: 'OWNER' | 'TENANT' | 'ADMIN';
}

interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    zipCode: string;
    type: string;
    surface: number;
    images: string[];
    tenants: Tenant[];
    owner: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        address: string;
        companyName?: string;
        siret?: string;
    };
}

export default function PropertyDetailsPage() {
    const params = useParams();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/owner`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const properties = await response.json();
                    const slug = params.slug?.toString() || '';
                    const idFromUrl = Number(slug.split('-')[0]);
                    const propertyDetails = properties.find((p: Property) => p.id === idFromUrl);

                    if (propertyDetails) {
                        setProperty(propertyDetails);
                    } else {
                        setError('Propriété non trouvée');
                    }
                } else {
                    setError('Impossible de charger les détails de la propriété');
                }
            } catch (err) {
                setError('Une erreur est survenue lors de la communication avec le serveur');
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [params.slug]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-600 dark:text-red-400">{error || 'Propriété non trouvée'}</p>
                </div>
            </div>
        );
    }

    const defaultImage = 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80';

    const getMainImage = () => {
        if (!property.images || property.images.length === 0) {
            console.log('Pas d\'images disponibles');
            return defaultImage;
        }

        const firstImage = property.images[0];
        console.log('URL stockée:', firstImage);

        // Si l'URL est déjà complète (commence par http ou https)
        if (firstImage.startsWith('http')) {
            console.log('URL complète:', firstImage);
            return firstImage;
        }

        // Construction de l'URL finale
        const finalUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${firstImage}`;
        console.log('URL finale:', finalUrl, 'BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
        return finalUrl;
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        console.error('Erreur de chargement de l\'image:', target.src);
        target.src = defaultImage;
        // Essayons de charger l'image directement pour voir l'erreur
        fetch(target.src)
            .then(response => {
                if (!response.ok) {
                    console.error('Erreur de chargement:', response.status, response.statusText);
                }
            })
            .catch(error => console.error('Erreur réseau:', error));
    };

    const handleOpenTenantDetails = (tenant: Tenant) => {
        setSelectedTenant(tenant);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTenant(null);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* En-tête avec navigation */}
            <div className="mb-6">
                <Link
                    href="/dashboard/owner/properties"
                    className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour aux propriétés
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {property.title}
                </h1>
            </div>

            {/* Image principale */}
            <div className="relative h-96 w-full rounded-lg overflow-hidden mb-8">
                <img
                    src={getMainImage()}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                />
            </div>

            {/* Informations principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Informations générales
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center text-sm">
                            <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">{property.surface} m²</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">{property.price} €/mois</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">
                                {property.address}, {property.zipCode} {property.city}
                            </span>
                        </div>
                        <div className="flex items-center text-sm">
                            <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">{property.type}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Propriétaire
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center text-sm">
                            <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">
                                {property.owner?.firstName} {property.owner?.lastName}
                            </span>
                        </div>
                        <div className="flex items-center text-sm">
                            <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">{property.owner?.email}</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span className="text-gray-600 dark:text-gray-300">{property.owner?.phone}</span>
                        </div>
                        {property.owner?.companyName && (
                            <div className="flex items-center text-sm">
                                <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                <span className="text-gray-600 dark:text-gray-300">{property.owner.companyName}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Locataires ({property.tenants.length})
                    </h2>
                    {property.tenants.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Aucun locataire associé à ce bien
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {property.tenants.map((tenant) => (
                                <div key={tenant.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                                {tenant.firstName} {tenant.lastName}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {tenant.email}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleOpenTenantDetails(tenant)}
                                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        >
                                            Voir détails
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Description
                </h2>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {property.description}
                </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                    Modifier
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700">
                    Supprimer
                </button>
            </div>

            <TenantDetailsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                tenant={selectedTenant}
            />
        </div>
    );
}
