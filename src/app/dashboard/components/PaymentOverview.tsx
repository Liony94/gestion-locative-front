'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Payment, PaymentSchedule } from '@/types/payment';
import { formatDate, formatPrice } from '@/lib/utils';

interface PaymentStats {
    paid: { count: number; amount: number };
    pending: { count: number; amount: number };
    late: { count: number; amount: number };
}

export default function PaymentOverview() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                console.log('Début du chargement des paiements...');
                const response = await api.get('/payments/schedules');
                console.log('Réponse brute de l\'API:', response);

                const schedulesResponse = response.data;
                console.log('Données des échéanciers:', schedulesResponse);

                if (!schedulesResponse) {
                    throw new Error('Aucune donnée reçue de l\'API');
                }

                const allPayments: Payment[] = [];

                if (Array.isArray(schedulesResponse)) {
                    schedulesResponse.forEach((schedule: PaymentSchedule) => {
                        if (schedule?.payments && Array.isArray(schedule.payments)) {
                            allPayments.push(...schedule.payments.map(payment => ({
                                ...payment,
                                paymentSchedule: {
                                    ...schedule,
                                    payments: []
                                }
                            })));
                        }
                    });
                } else {
                    throw new Error('Format de réponse invalide');
                }

                console.log('Nombre total de paiements chargés:', allPayments.length);
                setPayments(allPayments);
            } catch (err: any) {
                console.error('Erreur détaillée:', err);
                const errorMessage = err.response?.data?.message || err.message || 'Erreur inconnue';
                setError(`Erreur lors du chargement des données: ${errorMessage}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const stats: PaymentStats = payments.reduce((acc, payment) => {
        if (payment.status === 'PAID') {
            acc.paid.count++;
            acc.paid.amount += payment.paidAmount || 0;
        } else if (payment.status === 'LATE') {
            console.log('Ajout d\'un paiement en retard aux stats:', {
                id: payment.id,
                amount: payment.amount,
                dueDate: payment.dueDate
            });
            acc.late.count++;
            acc.late.amount += payment.amount;
        } else if (payment.status === 'PENDING') {
            acc.pending.count++;
            acc.pending.amount += payment.amount;
        }

        return acc;
    }, {
        paid: { count: 0, amount: 0 },
        pending: { count: 0, amount: 0 },
        late: { count: 0, amount: 0 }
    });

    const totalAmount = stats.paid.amount + stats.pending.amount + stats.late.amount;

    // Récupérer les paiements du mois à venir
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const upcomingPayments = payments
        .filter(payment => {
            const paymentDate = new Date(payment.dueDate);
            return payment.status === 'PENDING' &&
                paymentDate >= today &&
                paymentDate <= nextMonth;
        })
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    if (isLoading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
                <div className="text-red-500 dark:text-red-400">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Aperçu des Paiements
            </h2>

            {/* Statistiques des paiements */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {stats.paid.count}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Payés</div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        {formatPrice(stats.paid.amount)}
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {stats.pending.count}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">En attente</div>
                    <div className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        {formatPrice(stats.pending.amount)}
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {stats.late.count}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">En retard</div>
                    <div className="text-sm font-medium text-red-600 dark:text-red-400">
                        {formatPrice(stats.late.amount)}
                    </div>
                </div>
            </div>

            {/* Graphique simplifié */}
            <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-8">
                <div className="absolute inset-0 flex rounded-full overflow-hidden">
                    <div
                        className="bg-green-500 dark:bg-green-600"
                        style={{ width: `${(stats.paid.amount / totalAmount) * 100}%` }}
                    />
                    <div
                        className="bg-yellow-500 dark:bg-yellow-600"
                        style={{ width: `${(stats.pending.amount / totalAmount) * 100}%` }}
                    />
                    <div
                        className="bg-red-500 dark:bg-red-600"
                        style={{ width: `${(stats.late.amount / totalAmount) * 100}%` }}
                    />
                </div>
            </div>

            {/* Prochains paiements */}
            <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                    Prochains paiements
                </h3>
                <div className="space-y-4">
                    {upcomingPayments.map((payment) => (
                        <div
                            key={payment.id}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-sm transition-shadow duration-300"
                        >
                            <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                    {payment.paymentSchedule?.tenant ?
                                        `${payment.paymentSchedule.tenant.firstName} ${payment.paymentSchedule.tenant.lastName}` :
                                        'Locataire inconnu'}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {payment.paymentSchedule?.property?.title || 'Propriété inconnue'}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium text-gray-900 dark:text-white">
                                    {formatPrice(payment.amount)}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatDate(payment.dueDate)}
                                </div>
                            </div>
                        </div>
                    ))}
                    {upcomingPayments.length === 0 && (
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            Aucun paiement prévu pour le mois à venir
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 