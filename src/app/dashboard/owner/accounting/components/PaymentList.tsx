'use client';

import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PaymentStatus } from '@/types/enums';
import { formatDate, formatPrice } from '@/lib/utils';
import { Payment } from '@/types/payment';
import RecordPaymentModal from '@/app/dashboard/owner/accounting/components/RecordPaymentModal';
import { Building2, User2, MapPin } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import PaymentDetailsModal from './PaymentDetailsModal';

interface PaymentListProps {
    payments: Payment[];
    status: 'all' | 'pending' | 'late' | 'paid';
}

export default function PaymentList({ payments, status }: PaymentListProps) {
    const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
    const [showRecordModal, setShowRecordModal] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const getStatusBadge = (payment: Payment) => {
        switch (payment.status) {
            case 'PAID':
                return (
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 cursor-pointer hover:bg-green-200 dark:hover:bg-green-900/50">
                        Payé
                    </Badge>
                );
            case 'LATE':
                return (
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 cursor-pointer hover:bg-red-200 dark:hover:bg-red-900/50">
                        En retard
                    </Badge>
                );
            case 'PENDING':
                return (
                    <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 cursor-pointer hover:bg-orange-200 dark:hover:bg-orange-900/50">
                        En attente
                    </Badge>
                );
            default:
                return null;
        }
    };

    const getTenantInfo = (payment: Payment) => {
        if (!payment.paymentSchedule?.tenant) {
            return {
                name: 'Locataire inconnu',
                email: '',
                phone: '',
            };
        }
        const { firstName, lastName, email, phone } = payment.paymentSchedule.tenant;
        return {
            name: `${firstName} ${lastName}`,
            email,
            phone,
        };
    };

    const getPropertyInfo = (payment: Payment) => {
        const property = payment.paymentSchedule?.property;
        if (!property) {
            return {
                title: 'Propriété inconnue',
                address: '',
                owner: null,
            };
        }
        return {
            title: property.title || 'Sans titre',
            address: property.address || 'Adresse non renseignée',
            owner: property.owner,
        };
    };

    if (!isClient) {
        return (
            <div className="rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm p-4 bg-white dark:bg-gray-800">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full w-1/4"></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-4 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Filtrer les paiements selon le statut sélectionné
    console.log('Status actuel:', status);
    console.log('Paiements avant filtrage:', payments.map(p => ({
        id: p.id,
        status: p.status,
        dueDate: p.dueDate
    })));

    const filteredPayments = payments.filter(payment => {
        if (status === 'all') return true;
        if (status === 'paid') return payment.status === 'PAID';
        if (status === 'late') {
            console.log('Vérification paiement en retard:', {
                id: payment.id,
                status: payment.status,
                isLate: payment.status === 'LATE'
            });
            return payment.status === 'LATE';
        }
        if (status === 'pending') return payment.status === 'PENDING';
        return true;
    });

    console.log('Paiements après filtrage:', filteredPayments.map(p => ({
        id: p.id,
        status: p.status,
        dueDate: p.dueDate
    })));

    if (filteredPayments.length === 0) {
        return (
            <div className="text-center py-12 px-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm bg-gray-50 dark:bg-gray-800 animate-fade-in-up">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Aucun paiement {status === 'pending' ? 'en attente' :
                        status === 'late' ? 'en retard' :
                            status === 'paid' ? 'payé' : ''} trouvé
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden bg-white dark:bg-gray-800">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Date d'échéance</TableHead>
                            <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Locataire</TableHead>
                            <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Propriété</TableHead>
                            <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Montant</TableHead>
                            <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Statut</TableHead>
                            <TableHead className="font-semibold text-gray-600 dark:text-gray-300">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPayments.map((payment, index) => {
                            const tenantInfo = getTenantInfo(payment);
                            const propertyInfo = getPropertyInfo(payment);

                            return (
                                <TableRow
                                    key={payment.id}
                                    className={`
                                        group hover:bg-gray-50 dark:hover:bg-gray-700/50 
                                        transition-colors duration-200
                                        animate-fade-in-up
                                        [animation-delay:${index * 50}ms]
                                        opacity-0
                                        dark:border-gray-700
                                    `}
                                    style={{ animationFillMode: 'forwards' }}
                                    onClick={() => {
                                        if (!showRecordModal) {
                                            setSelectedPayment(payment);
                                        }
                                    }}
                                >
                                    <TableCell className="font-medium text-gray-700 dark:text-gray-200">
                                        {isClient ? formatDate(payment.dueDate) : ''}
                                    </TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex items-center space-x-2 cursor-help">
                                                        <User2 className="h-4 w-4 text-gray-400" />
                                                        <span className="text-gray-600 dark:text-gray-300">
                                                            {tenantInfo.name}
                                                        </span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="space-y-1">
                                                        <p>Email: {tenantInfo.email}</p>
                                                        <p>Tél: {tenantInfo.phone}</p>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="flex items-center space-x-2 cursor-help">
                                                        <Building2 className="h-4 w-4 text-gray-400" />
                                                        <span className="text-gray-600 dark:text-gray-300">
                                                            {propertyInfo.title}
                                                        </span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="space-y-1">
                                                        <p className="flex items-center gap-1">
                                                            <MapPin className="h-3 w-3" />
                                                            {propertyInfo.address}
                                                        </p>
                                                        {propertyInfo.owner && (
                                                            <p className="flex items-center gap-1">
                                                                <User2 className="h-3 w-3" />
                                                                Propriétaire: {propertyInfo.owner.firstName} {propertyInfo.owner.lastName}
                                                            </p>
                                                        )}
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-700 dark:text-gray-200">
                                        {formatPrice(payment.amount)}
                                    </TableCell>
                                    <TableCell>{getStatusBadge(payment)}</TableCell>
                                    <TableCell>
                                        {payment.status !== PaymentStatus.PAID && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedPayment(payment);
                                                    setShowRecordModal(true);
                                                }}
                                                className="opacity-0 group-hover:opacity-100 transition-all duration-200 
                                                    hover:bg-primary/90 hover:text-white dark:border-gray-600 
                                                    dark:text-gray-300 dark:hover:bg-primary/80 dark:hover:text-white 
                                                    hover:scale-105"
                                            >
                                                Enregistrer le paiement
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {showRecordModal && selectedPayment && (
                <RecordPaymentModal
                    payment={selectedPayment}
                    onClose={() => {
                        setShowRecordModal(false);
                        setSelectedPayment(null);
                    }}
                />
            )}

            {!showRecordModal && selectedPayment && (
                <PaymentDetailsModal
                    payment={selectedPayment}
                    onClose={() => setSelectedPayment(null)}
                />
            )}
        </div>
    );
} 