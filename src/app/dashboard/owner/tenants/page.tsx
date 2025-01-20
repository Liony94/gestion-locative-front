'use client';

import { useState, useEffect } from 'react';
import TenantsCard from './components/TenantsCard';

interface Property {
    id: number;
    title: string;
    address: string;
    city: string;
    type: string;
}

interface Tenant {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    phone: string;
    address: string;
    properties: Property[];
}

export default function TenantsPage() {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties/owner`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const properties = await response.json();
                    // Transformer les données pour regrouper par locataire
                    const tenantsMap = new Map<number, Tenant>();

                    properties.forEach((property: any) => {
                        property.tenants.forEach((tenant: Tenant) => {
                            if (!tenantsMap.has(tenant.id)) {
                                tenantsMap.set(tenant.id, {
                                    ...tenant,
                                    properties: []
                                });
                            }
                            tenantsMap.get(tenant.id)?.properties.push({
                                id: property.id,
                                title: property.title,
                                address: property.address,
                                city: property.city,
                                type: property.type
                            });
                        });
                    });

                    setTenants(Array.from(tenantsMap.values()));
                } else {
                    setError('Impossible de charger les locataires');
                }
            } catch (err) {
                setError('Une erreur est survenue lors de la communication avec le serveur');
            } finally {
                setLoading(false);
            }
        };

        fetchTenants();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Mes locataires
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Gérez vos locataires et leurs biens associés
                    </p>
                </div>
            </div>

            {tenants.length === 0 ? (
                <div className="text-center py-12">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        Aucun locataire
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Vous n'avez pas encore de locataire associé à vos biens.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {tenants.map((tenant) => (
                        <TenantsCard key={tenant.id} tenant={tenant} />
                    ))}
                </div>
            )}
        </div>
    );
}
