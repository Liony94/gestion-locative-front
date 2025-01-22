'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Property {
    id: number;
    identifier: string;
    description: string;
    price: number;
    address: string;
    city: string;
    zipCode: string;
    type: string;
    surface: number;
    images: string[];
}

export default function PropertyList() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/owner`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setProperties(data);
            } catch (err) {
                setError('Une erreur est survenue lors de la récupération de vos propriétés');
                console.error('Erreur:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    // Image par défaut si aucune image n'est fournie
    const defaultImage = 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80';

    const getMainImage = (property: Property) => {
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

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="space-y-3">
                        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Mes Propriétés
                </h2>
                <Link
                    href="/dashboard/owner/properties"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                    Voir tout →
                </Link>
            </div>

            {properties.length === 0 ? (
                <div className="text-center py-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Vous n'avez pas encore de propriété.
                    </p>
                    <Link
                        href="/dashboard/properties/new"
                        className="mt-2 inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500"
                    >
                        + Ajouter votre première propriété
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {properties.slice(0, 3).map((property) => (
                        <div
                            key={property.id}
                            className="group relative bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-start space-x-4">
                                {/* Image de la propriété */}
                                <div className="flex-shrink-0">
                                    <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                                        <img
                                            src={getMainImage(property)}
                                            alt={property.identifier}
                                            className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                            onError={handleImageError}
                                        />
                                    </div>
                                </div>

                                {/* Informations principales */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                                            {property.identifier}
                                        </h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            {property.type}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {property.address}, {property.zipCode} {property.city}
                                    </p>
                                    <div className="mt-2 flex items-center space-x-4">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {property.surface} m²
                                        </span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {property.price} €/mois
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions rapides */}
                            <div className="mt-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Link
                                    href={`/dashboard/owner/properties/${property.id}`}
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/50 dark:hover:bg-blue-900"
                                >
                                    Détails
                                </Link>
                                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 dark:text-orange-400 dark:bg-orange-900/50 dark:hover:bg-orange-900">
                                    Modifier
                                </button>
                                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 dark:text-green-400 dark:bg-green-900/50 dark:hover:bg-green-900">
                                    Encaisser
                                </button>
                                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 dark:text-purple-400 dark:bg-purple-900/50 dark:hover:bg-purple-900">
                                    Documents
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 