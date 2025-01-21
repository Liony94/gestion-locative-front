'use client';

import { Payment } from '@/types/payment';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Building2, Calendar, CreditCard, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentDetailsModalProps {
    payment: Payment | null;
    onClose: () => void;
}

export default function PaymentDetailsModal({ payment, onClose }: PaymentDetailsModalProps) {
    if (!payment) return null;

    const formatDate = (date: string) => {
        return format(new Date(date), 'dd MMMM yyyy', { locale: fr });
    };

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PAID':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800';
            case 'PENDING':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800';
            case 'LATE':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border border-gray-200 dark:border-gray-800';
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
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg [&>button]:hidden">
                <DialogHeader className="border-b border-gray-200 dark:border-gray-800 pb-4">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            Détails du paiement
                        </DialogTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </DialogHeader>

                <div className="space-y-6 pt-4">
                    {/* Statut et montants */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-2">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Statut</p>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                                {getStatusText(payment.status)}
                            </span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-2">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Montant</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                {formatAmount(payment.amount)}
                            </p>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Date d'échéance</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {formatDate(payment.dueDate)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {payment.paidAt && (
                            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-green-500 dark:text-green-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Date de paiement</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(payment.paidAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Informations sur le locataire */}
                    {payment.paymentSchedule?.tenant && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                                <User className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Locataire</p>
                                    <div className="mt-1 space-y-1">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            {payment.paymentSchedule.tenant.firstName} {payment.paymentSchedule.tenant.lastName}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {payment.paymentSchedule.tenant.email}
                                        </p>
                                        {payment.paymentSchedule.tenant.phone && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {payment.paymentSchedule.tenant.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Informations sur la propriété */}
                    {payment.paymentSchedule?.property && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                                <Building2 className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Propriété</p>
                                    <div className="mt-1 space-y-1">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            {payment.paymentSchedule.property.title}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {payment.paymentSchedule.property.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Informations de paiement */}
                    {payment.status === 'PAID' && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                            <div className="flex items-start gap-3">
                                <CreditCard className="h-5 w-5 text-teal-500 dark:text-teal-400" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Détails du paiement</p>
                                    <div className="mt-1 space-y-1">
                                        {payment.paymentMethod && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Méthode : {payment.paymentMethod}
                                            </p>
                                        )}
                                        {payment.transactionId && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Transaction : {payment.transactionId}
                                            </p>
                                        )}
                                        {payment.notes && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Notes : {payment.notes}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
} 