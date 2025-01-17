'use client';
import { useState } from 'react';
import DashboardStats from './components/DashboardStats';
import DashboardHeader from './components/DashboardHeader';
import PropertyList from './components/PropertyList';
import RecentActivities from './components/RecentActivities';
import PaymentOverview from './components/PaymentOverview';

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(false);

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