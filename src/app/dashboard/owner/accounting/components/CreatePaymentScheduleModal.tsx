'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Property } from '@/types/property';
import { User } from '@/types/user'

interface CreatePaymentScheduleModalProps {
    onClose: () => void;
    properties: Property[];
    tenants: User[];
}

export default function CreatePaymentScheduleModal({ onClose, properties, tenants }: CreatePaymentScheduleModalProps) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [monthlyAmount, setMonthlyAmount] = useState('');
    const [dayOfMonth, setDayOfMonth] = useState('');
    const [propertyId, setPropertyId] = useState('');
    const [tenantId, setTenantId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post('/payments/schedules', {
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                monthlyAmount: parseFloat(monthlyAmount),
                dayOfMonth: parseInt(dayOfMonth),
                propertyId: parseInt(propertyId),
                tenantId: parseInt(tenantId),
            });

            toast.success('Échéancier de paiement créé avec succès');
            onClose();
        } catch (error) {
            console.error('Erreur lors de la création de l\'échéancier:', error);
            toast.error('Erreur lors de la création de l\'échéancier');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Créer un nouvel échéancier
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startDate" className="text-gray-700 dark:text-gray-200">
                                    Date de début
                                </Label>
                                <Input
                                    id="startDate"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="bg-white dark:bg-gray-700"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="endDate" className="text-gray-700 dark:text-gray-200">
                                    Date de fin
                                </Label>
                                <Input
                                    id="endDate"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="bg-white dark:bg-gray-700"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="monthlyAmount" className="text-gray-700 dark:text-gray-200">
                                    Montant mensuel
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="monthlyAmount"
                                        type="number"
                                        step="0.01"
                                        value={monthlyAmount}
                                        onChange={(e) => setMonthlyAmount(e.target.value)}
                                        className="pl-8 bg-white dark:bg-gray-700"
                                        required
                                    />
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                        €
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="dayOfMonth" className="text-gray-700 dark:text-gray-200">
                                    Jour du mois
                                </Label>
                                <Input
                                    id="dayOfMonth"
                                    type="number"
                                    min="1"
                                    max="31"
                                    value={dayOfMonth}
                                    onChange={(e) => setDayOfMonth(e.target.value)}
                                    className="bg-white dark:bg-gray-700"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="property" className="text-gray-700 dark:text-gray-200">
                                Propriété
                            </Label>
                            <Select value={propertyId} onValueChange={setPropertyId} required>
                                <SelectTrigger className="w-full bg-white dark:bg-gray-700">
                                    <SelectValue placeholder="Sélectionner une propriété" />
                                </SelectTrigger>
                                <SelectContent>
                                    {properties.map((property) => (
                                        <SelectItem key={property.id} value={property.id.toString()}>
                                            {property.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tenant" className="text-gray-700 dark:text-gray-200">
                                Locataire
                            </Label>
                            <Select value={tenantId} onValueChange={setTenantId} required>
                                <SelectTrigger className="w-full bg-white dark:bg-gray-700">
                                    <SelectValue placeholder="Sélectionner un locataire" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tenants.map((tenant) => (
                                        <SelectItem key={tenant.id} value={tenant.id.toString()}>
                                            {tenant.firstName} {tenant.lastName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter className="flex gap-3 pt-4 border-t dark:border-gray-700">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Création...
                                </>
                            ) : (
                                'Créer l\'échéancier'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 