'use client';
import { useRouter } from 'next/navigation';
import DashboardStats from './components/DashboardStats';
import PropertyList from './components/PropertyList';
import RecentActivities from './components/RecentActivities';
import PaymentOverview from './components/PaymentOverview';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/app/auth/register/page';
import { RouteGuard } from '@/components/RouteGuard';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Payment } from '@/types/payment';

export default function OwnerDashboard() {
    const { isAuthenticated, role, isLoading } = useAuth();
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoadingPayments, setIsLoadingPayments] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await api.get('/payments/schedules');
                const schedules = response.data;
                const allPayments: Payment[] = [];

                if (Array.isArray(schedules)) {
                    schedules.forEach((schedule: any) => {
                        if (schedule.payments) {
                            allPayments.push(...schedule.payments.map((payment: Payment) => ({
                                ...payment,
                                paymentSchedule: {
                                    ...schedule,
                                    payments: [] // Éviter la récursion infinie
                                }
                            })));
                        }
                    });
                }

                console.log('Paiements chargés dans le dashboard:', allPayments.length);
                setPayments(allPayments);
            } catch (error) {
                console.error('Erreur lors du chargement des paiements:', error);
            } finally {
                setIsLoadingPayments(false);
            }
        };

        if (isAuthenticated) {
            fetchPayments();
        }
    }, [isAuthenticated]);

    if (isLoading || isLoadingPayments) {
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
                    <DashboardStats payments={payments} />

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