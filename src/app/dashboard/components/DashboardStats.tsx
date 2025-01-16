const stats = [
    {
        name: 'Revenus mensuels',
        value: '5 250 €',
        change: '+12.5%',
        changeType: 'positive',
        icon: '💰',
        color: 'from-green-500 to-emerald-600'
    },
    {
        name: 'Taux d\'occupation',
        value: '95%',
        change: '+4.75%',
        changeType: 'positive',
        icon: '🏠',
        color: 'from-blue-500 to-indigo-600'
    },
    {
        name: 'Loyers impayés',
        value: '450 €',
        change: '-2.3%',
        changeType: 'negative',
        icon: '⚠️',
        color: 'from-red-500 to-pink-600'
    },
    {
        name: 'Rentabilité moyenne',
        value: '6.8%',
        change: '+0.5%',
        changeType: 'positive',
        icon: '📈',
        color: 'from-purple-500 to-violet-600'
    }
];

export default function DashboardStats() {
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
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
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