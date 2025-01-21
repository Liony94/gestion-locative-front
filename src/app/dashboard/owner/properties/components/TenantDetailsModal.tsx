import Modal from '@/components/Modal';

interface Payment {
    id: number;
    amount: number;
    dueDate: string;
    status: 'paid' | 'pending' | 'late';
    paidAt?: string;
}

interface Tenant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

interface TenantDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    tenant: Tenant | null;
}

export default function TenantDetailsModal({ isOpen, onClose, tenant }: TenantDetailsModalProps) {
    if (!tenant) return null;

    // Données factices pour la démonstration
    const mockPayments: Payment[] = [
        {
            id: 1,
            amount: 750,
            dueDate: '2024-03-01',
            status: 'paid',
            paidAt: '2024-02-28'
        },
        {
            id: 2,
            amount: 750,
            dueDate: '2024-04-01',
            status: 'pending'
        },
        {
            id: 3,
            amount: 750,
            dueDate: '2024-05-01',
            status: 'pending'
        }
    ];

    const getStatusColor = (status: Payment['status']) => {
        switch (status) {
            case 'paid':
                return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
            case 'late':
                return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400';
        }
    };

    const getStatusText = (status: Payment['status']) => {
        switch (status) {
            case 'paid':
                return 'Payé';
            case 'pending':
                return 'En attente';
            case 'late':
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
                                {mockPayments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {payment.amount} €
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
                </div>
            </div>
        </Modal>
    );
} 