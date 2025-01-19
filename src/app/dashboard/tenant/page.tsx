'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/app/auth/register/page';

export default function TenantDashboard() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/login');
            } else if (user.role !== UserRole.TENANT) {
                console.log('Accès non autorisé. Rôle:', user.role);
                router.push('/dashboard');
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!user || user.role !== UserRole.TENANT) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

            <main className="p-6">
                <div className="max-w-7xl mx-auto">
                    {/* En-tête du dashboard */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Tableau de bord locataire
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Gérez vos locations et suivez vos paiements
                        </p>
                    </div>

                    {/* Statistiques principales */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Loyer mensuel
                            </h3>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
                                750 €
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Prochain paiement
                            </h3>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
                                5 mai 2024
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Documents à fournir
                            </h3>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
                                2
                            </p>
                        </div>
                    </div>

                    {/* Informations sur le logement */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Mon logement
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Adresse</span>
                                    <span className="text-gray-900 dark:text-white">123 rue de la Paix, 75000 Paris</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Surface</span>
                                    <span className="text-gray-900 dark:text-white">45 m²</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Type</span>
                                    <span className="text-gray-900 dark:text-white">Appartement</span>
                                </div>
                            </div>
                        </div>

                        {/* Derniers paiements */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Derniers paiements
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Avril 2024</span>
                                    <span className="text-green-600">Payé</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Mars 2024</span>
                                    <span className="text-green-600">Payé</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 dark:text-gray-400">Février 2024</span>
                                    <span className="text-green-600">Payé</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
} 