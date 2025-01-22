'use client';

import { useState } from 'react';
import { Payment } from '@/types/payment';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDate, formatPrice } from '@/lib/utils';
import { Loader2, CreditCard, Banknote, Building2, Receipt, FileText } from 'lucide-react';
import { api, getBlob } from '@/services/api';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

interface RecordPaymentModalProps {
    payment: Payment;
    onClose: () => void;
}

const PAYMENT_METHODS = [
    { value: 'BANK_TRANSFER', label: 'Virement bancaire', icon: Building2 },
    { value: 'CASH', label: 'Espèces', icon: Banknote },
    { value: 'CHECK', label: 'Chèque', icon: Receipt },
    { value: 'CREDIT_CARD', label: 'Carte bancaire', icon: CreditCard },
];

export default function RecordPaymentModal({ payment, onClose }: RecordPaymentModalProps) {
    const [amount, setAmount] = useState(payment.amount.toString());
    const [paymentMethod, setPaymentMethod] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [generateReceipt, setGenerateReceipt] = useState(true);

    const handleDownloadReceipt = async (paymentId: number) => {
        try {
            const data = await getBlob(`/payments/${paymentId}/receipt`);
            const url = window.URL.createObjectURL(data);
            const link = document.createElement('a');
            const month = new Date().toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
            link.href = url;
            link.setAttribute('download', `quittance_${month.replace(' ', '_')}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success('Quittance générée avec succès');
        } catch (error) {
            toast.error('Erreur lors de la génération de la quittance');
            console.error('Erreur:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await api.post(`/payments/${payment.id}/record`, {
                amount: parseFloat(amount),
                paymentMethod,
                transactionId: transactionId || undefined,
                notes: notes || undefined,
            });

            toast.success('Paiement enregistré avec succès');

            if (generateReceipt) {
                await handleDownloadReceipt(payment.id);
            }

            onClose();
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement du paiement:', error);
            toast.error('Erreur lors de l\'enregistrement du paiement');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Enregistrer un paiement
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Informations du paiement */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">Date d'échéance:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">{formatDate(payment.dueDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-300">Montant dû:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">{formatPrice(payment.amount)}</span>
                        </div>
                        {payment.paymentSchedule?.tenant && (
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-300">Locataire:</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                    {payment.paymentSchedule.tenant.firstName} {payment.paymentSchedule.tenant.lastName}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Formulaire */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-gray-700 dark:text-gray-200">
                                Montant reçu
                            </Label>
                            <div className="relative">
                                <Input
                                    id="amount"
                                    type="number"
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="pl-8 bg-white dark:bg-gray-700"
                                    required
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                    €
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="paymentMethod" className="text-gray-700 dark:text-gray-200">
                                Méthode de paiement
                            </Label>
                            <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                                <SelectTrigger className="w-full bg-white dark:bg-gray-700">
                                    <SelectValue placeholder="Sélectionner une méthode" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => (
                                        <SelectItem key={value} value={value}>
                                            <div className="flex items-center gap-2">
                                                <Icon className="h-4 w-4" />
                                                <span>{label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="transactionId" className="text-gray-700 dark:text-gray-200">
                                Numéro de transaction (optionnel)
                            </Label>
                            <Input
                                id="transactionId"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                placeholder="Ex: VIRT-123456"
                                className="bg-white dark:bg-gray-700"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes" className="text-gray-700 dark:text-gray-200">
                                Notes (optionnel)
                            </Label>
                            <Input
                                id="notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Ajouter des notes..."
                                className="bg-white dark:bg-gray-700"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="generateReceipt"
                                    checked={generateReceipt}
                                    onCheckedChange={(checked: boolean) => setGenerateReceipt(checked)}
                                />
                                <Label
                                    htmlFor="generateReceipt"
                                    className="text-sm text-gray-700 dark:text-gray-200 cursor-pointer"
                                >
                                    Générer la quittance de loyer
                                </Label>
                            </div>
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
                                    Enregistrement...
                                </>
                            ) : (
                                'Enregistrer le paiement'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 