'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Payment, PaymentSchedule, PaymentStatistics } from '@/types/payment';
import PaymentList from './components/PaymentList';
import PaymentStatisticsComponent from './components/PaymentStatistics';

export default function AccountingPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [statistics, setStatistics] = useState<PaymentStatistics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [schedulesResponse] = await Promise.all([
                    api.get('/payments/schedules'),
                ]);

                if (!isMounted) return;

                // Extraire tous les paiements des échéanciers
                const allPayments: Payment[] = [];
                if (Array.isArray(schedulesResponse)) {
                    schedulesResponse.forEach((schedule: PaymentSchedule) => {
                        if (schedule.payments) {
                            // Ajouter les informations de l'échéancier à chaque paiement
                            const paymentsWithSchedule = schedule.payments.map(payment => ({
                                ...payment,
                                paymentSchedule: {
                                    ...schedule,
                                    payments: [], // Éviter la récursion infinie
                                }
                            }));
                            allPayments.push(...paymentsWithSchedule);
                        }
                    });
                }

                setPayments(allPayments);

                // Calculer les statistiques
                const stats = {
                    totalDue: 0,
                    totalPaid: 0,
                    totalLate: 0,
                    totalPending: 0,
                    balance: 0
                };

                allPayments.forEach((payment: Payment) => {
                    stats.totalDue += payment.amount;
                    if (payment.status === 'PAID') {
                        stats.totalPaid += payment.paidAmount || payment.amount;
                    } else if (payment.status === 'PENDING') {
                        stats.totalPending += payment.amount;
                    } else if (payment.status === 'LATE') {
                        stats.totalLate += payment.amount;
                    }
                });

                stats.balance = stats.totalDue - stats.totalPaid;
                setStatistics(stats);

            } catch (err) {
                if (isMounted) {
                    console.error('Erreur lors du chargement des paiements:', err);
                    setError(err instanceof Error ? err.message : 'Une erreur est survenue lors du chargement des données');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
                    <div className="grid gap-6 mb-6">
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Gestion des Paiements</h1>

            <div className="grid gap-6 mb-6">
                {statistics && <PaymentStatisticsComponent payments={payments} />}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                    <PaymentList payments={payments} status="all" />
                </div>
            </div>
        </div>
    );
} 