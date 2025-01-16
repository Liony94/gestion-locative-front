const properties = [
    {
        id: 1,
        name: "Appartement Centre-Ville",
        address: "123 rue de la Paix, 75000 Paris",
        type: "Appartement",
        surface: "65m²",
        rent: "1200€",
        status: "Loué",
        tenant: "Marie Martin",
        nextPayment: "05/02/2024",
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
        id: 2,
        name: "Studio Étudiant",
        address: "45 avenue des Étudiants, 69000 Lyon",
        type: "Studio",
        surface: "25m²",
        rent: "550€",
        status: "Disponible",
        tenant: "-",
        nextPayment: "-",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
        id: 3,
        name: "Maison Familiale",
        address: "8 rue des Jardins, 33000 Bordeaux",
        type: "Maison",
        surface: "120m²",
        rent: "1500€",
        status: "Loué",
        tenant: "Famille Dubois",
        nextPayment: "01/02/2024",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    }
];

export default function PropertyList() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Mes Propriétés
                </h2>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Voir tout →
                </button>
            </div>

            <div className="space-y-6">
                {properties.map((property) => (
                    <div
                        key={property.id}
                        className="group relative bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-start space-x-4">
                            {/* Image de la propriété */}
                            <div className="flex-shrink-0">
                                <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                                    <img
                                        src={property.image}
                                        alt={property.name}
                                        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            </div>

                            {/* Informations principales */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                                        {property.name}
                                    </h3>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${property.status === 'Loué'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        }`}>
                                        {property.status}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {property.address}
                                </p>
                                <div className="mt-2 flex items-center space-x-4">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {property.surface}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {property.rent}/mois
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Informations complémentaires */}
                        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Locataire:</span>
                                <span className="ml-2 text-gray-900 dark:text-white">{property.tenant}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 dark:text-gray-400">Prochain paiement:</span>
                                <span className="ml-2 text-gray-900 dark:text-white">{property.nextPayment}</span>
                            </div>
                        </div>

                        {/* Actions rapides */}
                        <div className="mt-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/50 dark:hover:bg-blue-900">
                                Détails
                            </button>
                            <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 dark:text-green-400 dark:bg-green-900/50 dark:hover:bg-green-900">
                                Encaisser
                            </button>
                            <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 dark:text-purple-400 dark:bg-purple-900/50 dark:hover:bg-purple-900">
                                Documents
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 