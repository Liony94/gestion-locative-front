'use client';

import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Payment } from '@/types/payment';
import { User } from '@/types/user';

interface TenantDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    tenant: User | null;
}

export default function TenantDetailsModal({ isOpen, onClose, tenant }: TenantDetailsModalProps) {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            if (!tenant) return;

            try {
                setIsLoading(true);
                const response = await api.get('/payments/schedules');
                const schedules = response;

                // Extraire tous les paiements des échéanciers du locataire
                const tenantPayments: Payment[] = [];
                if (schedules && Array.isArray(schedules)) {
                    schedules.forEach(schedule => {
                        if (schedule.tenant?.id === tenant.id && schedule.payments) {
                            schedule.payments.forEach((payment: Payment) => {
                                tenantPayments.push({
                                    ...payment,
                                    paymentSchedule: {
                                        ...schedule,
                                        payments: []
                                    }
                                });
                            });
                        }
                    });
                }

                // Trier les paiements par date d'échéance
                tenantPayments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
                setPayments(tenantPayments);
            } catch (error) {
                console.error('Erreur lors de la récupération des paiements:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isOpen && tenant) {
            fetchPayments();
        }

        return () => {
            setPayments([]);
        };
    }, [isOpen, tenant]);

    if (!tenant) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PAID':
                return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
            case 'LATE':
                return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'PAID':
                return 'Payé';
            case 'PENDING':
                return 'En attente';
            case 'LATE':
                return 'En retard';
            default:
                return status;
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Détails du locataire" size="lg">
            <div className="space-y-6">
                {/* Informations personnelles */}
                <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Informations personnelles
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Nom complet</p>
                            <p className="text-base text-gray-900 dark:text-white">
                                {tenant.firstName} {tenant.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                            <p className="text-base text-gray-900 dark:text-white">{tenant.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Téléphone</p>
                            <p className="text-base text-gray-900 dark:text-white">{tenant.phone}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Adresse</p>
                            <p className="text-base text-gray-900 dark:text-white">{tenant.address}</p>
                        </div>
                    </div>
                </div>

                {/* Échéances de paiement */}
                <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        Échéances de paiement
                    </h4>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : payments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Date d'échéance
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Montant
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Date de paiement
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {payments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(payment.amount)}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(payment.status)}`}>
                                                    {getStatusText(payment.status)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {payment.paidAt
                                                    ? new Date(payment.paidAt).toLocaleDateString('fr-FR')
                                                    : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                            Aucun paiement trouvé pour ce locataire
                        </p>
                    )}
                </div>
            </div>
        </Modal>
    );
} 