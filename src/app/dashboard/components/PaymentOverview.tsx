const payments = [
    { id: 1, status: 'paid', amount: 3250, count: 3 },
    { id: 2, status: 'pending', amount: 1200, count: 1 },
    { id: 3, status: 'late', amount: 450, count: 1 }
];

const upcomingPayments = [
    {
        id: 1,
        tenant: 'Marie Martin',
        property: 'Appartement Centre-Ville',
        amount: 1200,
        dueDate: '05/02/2024'
    },
    {
        id: 2,
        tenant: 'Famille Dubois',
        property: 'Maison Familiale',
        amount: 1500,
        dueDate: '01/02/2024'
    }
];

export default function PaymentOverview() {
    const totalAmount = payments.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Aperçu des Paiements
            </h2>

            {/* Statistiques des paiements */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {payments[0].count}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Payés</div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        {payments[0].amount}€
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {payments[1].count}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">En attente</div>
                    <div className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                        {payments[1].amount}€
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {payments[2].count}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">En retard</div>
                    <div className="text-sm font-medium text-red-600 dark:text-red-400">
                        {payments[2].amount}€
                    </div>
                </div>
            </div>

            {/* Graphique simplifié */}
            <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-8">
                <div className="absolute inset-0 flex rounded-full overflow-hidden">
                    <div
                        className="bg-green-500 dark:bg-green-600"
                        style={{ width: `${(payments[0].amount / totalAmount) * 100}%` }}
                    />
                    <div
                        className="bg-yellow-500 dark:bg-yellow-600"
                        style={{ width: `${(payments[1].amount / totalAmount) * 100}%` }}
                    />
                    <div
                        className="bg-red-500 dark:bg-red-600"
                        style={{ width: `${(payments[2].amount / totalAmount) * 100}%` }}
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
                                    {payment.tenant}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {payment.property}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-medium text-gray-900 dark:text-white">
                                    {payment.amount}€
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {payment.dueDate}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 