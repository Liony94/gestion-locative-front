const activities = [
    {
        id: 1,
        type: 'payment',
        title: 'Paiement reçu',
        description: 'Loyer Appartement Centre-Ville',
        amount: '+1200€',
        date: 'Il y a 2 heures',
        icon: '💸',
        color: 'green'
    },
    {
        id: 2,
        type: 'document',
        title: 'Document signé',
        description: 'État des lieux - Studio Étudiant',
        date: 'Il y a 5 heures',
        icon: '📝',
        color: 'blue'
    },
    {
        id: 3,
        type: 'maintenance',
        title: 'Demande de travaux',
        description: 'Plomberie - Maison Familiale',
        date: 'Hier',
        icon: '🔧',
        color: 'orange'
    },
    {
        id: 4,
        type: 'message',
        title: 'Nouveau message',
        description: 'De Marie Martin',
        date: 'Il y a 2 jours',
        icon: '✉️',
        color: 'purple'
    }
];

export default function RecentActivities() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Activités Récentes
                </h2>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Tout voir →
                </button>
            </div>

            <div className="space-y-6">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="group relative flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
                    >
                        {/* Icône */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg
              ${activity.color === 'green' ? 'bg-green-100 dark:bg-green-900/50' :
                                activity.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/50' :
                                    activity.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/50' :
                                        'bg-purple-100 dark:bg-purple-900/50'}`}
                        >
                            {activity.icon}
                        </div>

                        {/* Contenu */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {activity.title}
                                </h3>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {activity.date}
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {activity.description}
                            </p>
                            {activity.amount && (
                                <span className="mt-2 inline-block text-sm font-medium text-green-600 dark:text-green-400">
                                    {activity.amount}
                                </span>
                            )}
                        </div>

                        {/* Bouton d'action */}
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
} 