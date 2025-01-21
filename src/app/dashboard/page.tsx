'use client';
import { useRouter } from 'next/navigation';
import DashboardStats from './components/DashboardStats';
import PropertyList from './components/PropertyList';
import RecentActivities from './components/RecentActivities';
import PaymentOverview from './components/PaymentOverview';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/app/auth/register/page';
import { RouteGuard } from '@/components/RouteGuard';

export default function OwnerDashboard() {
    const { isAuthenticated, role, isLoading } = useAuth();

    // console.log('OwnerDashboard - État:', { isAuthenticated, role, isLoading });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <RouteGuard allowedRoles={[UserRole.OWNER]}>
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
        </RouteGuard>
    );
} 