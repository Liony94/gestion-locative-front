'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardStats from './components/DashboardStats';
import DashboardHeader from './components/DashboardHeader';
import PropertyList from './components/PropertyList';
import RecentActivities from './components/RecentActivities';
import PaymentOverview from './components/PaymentOverview';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/app/auth/register/page';

export default function DashboardPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push('/auth/login');
            } else if (user.role !== UserRole.OWNER) {
                console.log('Accès non autorisé. Redirection vers le dashboard locataire');
                router.push('/dashboard/tenant');
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

    if (!user || user.role !== UserRole.OWNER) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

            <main className="container mx-auto px-4 py-8">
                {/* Statistiques principales */}
                <DashboardStats />

                {/* Grille principale */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Liste des propriétés */}
                    <div className="lg:col-span-2">
                        <PropertyList />
                    </div>

                    {/* Activités récentes */}
                    <div className="space-y-8">
                        <RecentActivities />
                        <PaymentOverview />
                    </div>
                </div>
            </main>
        </div>
    );
} 