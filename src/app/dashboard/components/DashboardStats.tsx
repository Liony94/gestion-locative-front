import { Payment } from '@/types/payment';
import { PaymentStatus } from '@/types/enums';
import { formatPrice } from '@/lib/utils';
import { useMemo } from 'react';

interface DashboardStatsProps {
    payments?: Payment[];
}

export default function DashboardStats({ payments = [] }: DashboardStatsProps) {
    console.log('Payments reçus dans DashboardStats:', payments);

    const stats = useMemo(() => {
        // Vérification des paiements payés
        const paidPayments = payments.filter(p => p.status === PaymentStatus.PAID);
        console.log('Paiements payés:', paidPayments);

        // Calcul des revenus totaux (tous les paiements payés)
        const totalRevenue = paidPayments
            .reduce((sum, p) => {
                const amount = p.paidAmount || p.amount;
                console.log(`Ajout au revenu total: ${amount} (ID: ${p.id})`);
                return sum + amount;
            }, 0);

        console.log('Total revenue calculé:', totalRevenue);

        // Calcul des paiements du mois en cours
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        console.log('Période de calcul:', {
            startOfMonth: startOfMonth.toISOString(),
            endOfMonth: endOfMonth.toISOString(),
            now: now.toISOString()
        });

        const currentMonthPayments = payments.filter(payment => {
            const dueDate = new Date(payment.dueDate);
            const isInCurrentMonth = dueDate >= startOfMonth && dueDate <= endOfMonth;
            console.log(`Paiement ${payment.id}: date ${dueDate.toISOString()} - Dans le mois: ${isInCurrentMonth}`);
            return isInCurrentMonth;
        });

        console.log('Paiements du mois trouvés:', currentMonthPayments);

        // Calcul du taux de paiement pour le mois en cours
        const currentMonthTotal = currentMonthPayments.reduce((sum, p) => {
            console.log(`Ajout au total du mois: ${p.amount} (ID: ${p.id})`);
            return sum + p.amount;
        }, 0);

        const currentMonthPaid = currentMonthPayments
            .filter(p => p.status === PaymentStatus.PAID)
            .reduce((sum, p) => {
                const amount = p.paidAmount || p.amount;
                console.log(`Ajout au payé du mois: ${amount} (ID: ${p.id})`);
                return sum + amount;
            }, 0);

        console.log('Montants du mois calculés:', {
            total: currentMonthTotal,
            paid: currentMonthPaid
        });

        const paymentRate = currentMonthTotal > 0 ? (currentMonthPaid / currentMonthTotal * 100) : 0;
        console.log('Taux de paiement calculé:', paymentRate);

        // Calcul des paiements en retard
        const today = new Date();
        const latePayments = payments
            .filter(p => {
                const dueDate = new Date(p.dueDate);
                const isLate = p.status === PaymentStatus.LATE && dueDate < today;
                console.log(`Vérification retard ${p.id}: date ${dueDate.toISOString()} - En retard: ${isLate}`);
                return isLate;
            })
            .reduce((sum, p) => {
                console.log(`Ajout aux impayés: ${p.amount} (ID: ${p.id})`);
                return sum + p.amount;
            }, 0);

        // Calcul des paiements en attente
        const pendingPayments = payments
            .filter(p => {
                const dueDate = new Date(p.dueDate);
                const isPending = p.status === PaymentStatus.PENDING && dueDate >= today;
                console.log(`Vérification en attente ${p.id}: date ${dueDate.toISOString()} - En attente: ${isPending}`);
                return isPending;
            })
            .reduce((sum, p) => {
                console.log(`Ajout aux en attente: ${p.amount} (ID: ${p.id})`);
                return sum + p.amount;
            }, 0);

        console.log('Montants finaux calculés:', {
            totalRevenue,
            paymentRate,
            latePayments,
            pendingPayments
        });

        return [
            {
                name: 'Revenus totaux',
                value: formatPrice(totalRevenue),
                change: `${paymentRate.toFixed(1)}%`,
                changeType: paymentRate >= 95 ? 'positive' : 'negative',
                icon: '💰',
                color: 'from-green-500 to-emerald-600'
            },
            {
                name: 'Taux de paiement',
                value: `${paymentRate.toFixed(1)}%`,
                change: `${(paymentRate - 100).toFixed(1)}%`,
                changeType: paymentRate >= 95 ? 'positive' : 'negative',
                icon: '🏠',
                color: 'from-blue-500 to-indigo-600'
            },
            {
                name: 'Loyers impayés',
                value: formatPrice(latePayments),
                change: `${currentMonthTotal > 0 ? ((latePayments / currentMonthTotal) * 100).toFixed(1) : 0}%`,
                changeType: 'negative',
                icon: '⚠️',
                color: 'from-red-500 to-pink-600'
            },
            {
                name: 'En attente',
                value: formatPrice(pendingPayments),
                change: `${currentMonthTotal > 0 ? ((pendingPayments / currentMonthTotal) * 100).toFixed(1) : 0}%`,
                changeType: 'neutral',
                icon: '📈',
                color: 'from-purple-500 to-violet-600'
            }
        ];
    }, [payments]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.name}
                    className="relative group bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                >
                    {/* Fond avec gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />

                    <div className="relative">
                        {/* En-tête */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-3xl">{stat.icon}</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stat.changeType === 'positive'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : stat.changeType === 'negative'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                }`}>
                                {stat.change}
                            </span>
                        </div>

                        {/* Valeur */}
                        <div className="flex items-baseline">
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {stat.value}
                            </p>
                        </div>

                        {/* Nom */}
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {stat.name}
                        </p>

                        {/* Bouton voir plus */}
                        <button className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                            Voir les détails
                            <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
} 