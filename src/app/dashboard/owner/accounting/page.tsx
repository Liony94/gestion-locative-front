'use client';

import { useState, useEffect } from 'react';
import { Payment, PaymentSchedule, PaymentStatistics } from '@/types/payment';
import { Property } from '@/types/property';
import { User } from '@/types/user';
import { api } from '@/services/api';
import PaymentList from './components/PaymentList';
import { PaymentStatisticsCard } from './components/PaymentStatisticsCard';
import { Button } from '@/components/ui/button';
import { Plus, RotateCw } from 'lucide-react';
import CreatePaymentScheduleModal from './components/CreatePaymentScheduleModal';
import { toast } from 'sonner';

export default function AccountingPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [statistics, setStatistics] = useState<PaymentStatistics | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [tenants, setTenants] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'late' | 'paid'>('all');
    const [selectedTenant, setSelectedTenant] = useState<number | 'all'>('all');
    const [selectedProperty, setSelectedProperty] = useState<number | 'all'>('all');
    const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
        start: null,
        end: null
    });
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Début du chargement des données...');
                const [schedulesResponse, propertiesResponse, tenantsResponse] = await Promise.all([
                    api.get('/payments/schedules'),
                    api.get('/properties'),
                    api.get('/user/role/tenant')
                ]);

                // Extraction des paiements depuis les échéanciers
                const allPayments: Payment[] = [];
                const schedules = schedulesResponse;

                if (schedules && Array.isArray(schedules)) {
                    console.log('Nombre d\'échéanciers trouvés:', schedules.length);

                    schedules.forEach((schedule: PaymentSchedule) => {
                        console.log('Traitement de l\'échéancier:', schedule.id);
                        if (schedule?.payments && Array.isArray(schedule.payments)) {
                            schedule.payments.forEach((payment: Payment) => {
                                console.log('Traitement du paiement:', payment.id);
                                allPayments.push({
                                    ...payment,
                                    paymentSchedule: {
                                        id: schedule.id,
                                        startDate: schedule.startDate,
                                        endDate: schedule.endDate,
                                        monthlyAmount: schedule.monthlyAmount,
                                        dayOfMonth: schedule.dayOfMonth,
                                        isActive: schedule.isActive,
                                        property: schedule.property,
                                        tenant: schedule.tenant,
                                        payments: []
                                    }
                                });
                            });
                        }
                    });
                }

                console.log('Nombre total de paiements extraits:', allPayments.length);

                // Tri des paiements par date d'échéance
                allPayments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
                setPayments(allPayments);

                if (propertiesResponse) {
                    setProperties(propertiesResponse);
                }

                if (tenantsResponse) {
                    setTenants(tenantsResponse);
                }

                // Calcul des statistiques
                const stats: PaymentStatistics = {
                    totalDue: 0,
                    totalPaid: 0,
                    totalPending: 0,
                    totalLate: 0,
                    balance: 0
                };

                allPayments.forEach(payment => {
                    if (payment?.amount) {
                        stats.totalDue += payment.amount;
                        if (payment.status === 'PAID' && payment.paidAmount) {
                            stats.totalPaid += payment.paidAmount;
                        } else if (payment.status === 'PENDING') {
                            stats.totalPending += payment.amount;
                        } else if (payment.status === 'LATE') {
                            stats.totalLate += payment.amount;
                        }
                    }
                });

                stats.balance = stats.totalDue - stats.totalPaid;
                setStatistics(stats);
                console.log('Statistiques calculées:', stats);
            } catch (err) {
                console.error('Erreur détaillée lors du chargement des données:', err);
                if (err instanceof Error) {
                    console.error('Message d\'erreur:', err.message);
                    console.error('Stack trace:', err.stack);
                }
                setError('Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            setPayments([]);
            setStatistics(null);
            setProperties([]);
            setTenants([]);
        };
    }, []);

    const filterButtons = [
        { label: 'Tous', value: 'all' },
        { label: 'En attente', value: 'pending' },
        { label: 'En retard', value: 'late' },
        { label: 'Payés', value: 'paid' }
    ] as const;

    // Filtrer les paiements en fonction de tous les filtres
    const filteredPayments = payments.filter(payment => {
        // Filtre par statut
        if (activeFilter !== 'all') {
            if (activeFilter === 'paid' && payment.status !== 'PAID') return false;
            if (activeFilter === 'late' && payment.status !== 'LATE') return false;
            if (activeFilter === 'pending' && payment.status !== 'PENDING') return false;
        }

        // Filtre par locataire
        if (selectedTenant !== 'all' && payment.paymentSchedule?.tenant?.id !== selectedTenant) return false;

        // Filtre par propriété
        if (selectedProperty !== 'all' && payment.paymentSchedule?.property?.id !== selectedProperty) return false;

        // Filtre par date
        if (dateRange.start && new Date(payment.dueDate) < dateRange.start) return false;
        if (dateRange.end && new Date(payment.dueDate) > dateRange.end) return false;

        return true;
    });

    const updateLatePayments = async () => {
        try {
            setIsUpdatingStatus(true);
            const response = await api.post('/payments/update-late-status', {});
            const { updated } = response;

            if (updated > 0) {
                toast.success(`${updated} paiement(s) mis à jour en retard`);
            } else {
                toast.info('Aucun paiement en retard à mettre à jour');
            }

            // Recharger les données
            window.location.reload();
        } catch (error) {
            console.error('Erreur lors de la mise à jour des statuts:', error);
            toast.error('Erreur lors de la mise à jour des statuts');
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    if (error) {
        return (
            <div className="p-4">
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Comptabilité
                </h1>
                <div className="flex gap-2">
                    <Button
                        onClick={updateLatePayments}
                        variant="outline"
                        disabled={isUpdatingStatus}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <RotateCw className={`h-4 w-4 mr-2 ${isUpdatingStatus ? 'animate-spin' : ''}`} />
                        Mettre à jour les retards
                    </Button>
                    <Button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Nouvel échéancier
                    </Button>
                </div>
            </div>

            {statistics && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total dû</p>
                                <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(statistics.totalDue)}</p>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total payé</p>
                                <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(statistics.totalPaid)}</p>
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-full">
                                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">En attente</p>
                                <p className="text-2xl font-semibold text-orange-600 dark:text-orange-400">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(statistics.totalPending)}</p>
                            </div>
                            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-full">
                                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">En retard</p>
                                <p className="text-2xl font-semibold text-red-600 dark:text-red-400">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(statistics.totalLate)}</p>
                            </div>
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-full">
                                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {/* Filtres de statut existants */}
                <div className="flex gap-2">
                    {filterButtons.map((button) => (
                        <Button
                            key={button.value}
                            variant={activeFilter === button.value ? "default" : "outline"}
                            onClick={() => setActiveFilter(button.value)}
                            className={activeFilter === button.value ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                        >
                            {button.label}
                        </Button>
                    ))}
                </div>

                {/* Nouveaux filtres */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Filtre par locataire */}
                    <select
                        value={selectedTenant}
                        onChange={(e) => setSelectedTenant(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                    >
                        <option value="all">Tous les locataires</option>
                        {tenants.map((tenant) => (
                            <option key={tenant.id} value={tenant.id}>
                                {tenant.firstName} {tenant.lastName}
                            </option>
                        ))}
                    </select>

                    {/* Filtre par propriété */}
                    <select
                        value={selectedProperty}
                        onChange={(e) => setSelectedProperty(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                        className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                    >
                        <option value="all">Toutes les propriétés</option>
                        {properties.map((property) => (
                            <option key={property.id} value={property.id}>
                                {property.title}
                            </option>
                        ))}
                    </select>

                    {/* Filtre par date */}
                    <div className="flex gap-2">
                        <input
                            type="date"
                            value={dateRange.start ? dateRange.start.toISOString().split('T')[0] : ''}
                            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value ? new Date(e.target.value) : null }))}
                            className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                        />
                        <input
                            type="date"
                            value={dateRange.end ? dateRange.end.toISOString().split('T')[0] : ''}
                            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value ? new Date(e.target.value) : null }))}
                            className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                        />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <PaymentList payments={payments} status={activeFilter} />
            )}

            {showCreateModal && (
                <CreatePaymentScheduleModal
                    onClose={() => setShowCreateModal(false)}
                    properties={properties}
                    tenants={tenants}
                />
            )}
        </div>
    );
} 