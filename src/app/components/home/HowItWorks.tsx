const steps = [
    {
        number: "1",
        icon: "🏠",
        title: "Créer un bien",
        subtitle: "APPARTEMENTS, MAISONS, PARKINGS...",
        description: "Créez la fiche détaillée de votre bien immobilier avec toutes les informations essentielles : adresse, surface, équipements, etc."
    },
    {
        number: "2",
        icon: "👤",
        title: "Créer un locataire",
        subtitle: "LOCATAIRES ET COLOCATAIRES",
        description: "Ajoutez les informations de vos locataires : coordonnées, documents, garants et toutes les informations nécessaires à la gestion."
    },
    {
        number: "3",
        icon: "🔑",
        title: "Créer une location",
        subtitle: "LE CONTRAT DE BAIL",
        description: "Liez votre bien et votre locataire dans un contrat. Définissez la durée, le montant du loyer et des charges en quelques clics."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 text-transparent bg-clip-text">
                        Comment ça marche ?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Simple comme 1, 2, 3
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                    {/* Ligne de connexion entre les étapes */}
                    <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Cercle numéroté */}
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
                                    {step.number}
                                </div>
                            </div>

                            <div className="pt-8 text-center group">
                                <div className="mb-6 transform transition-transform group-hover:scale-110">
                                    <span className="text-5xl">{step.icon}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                                    {step.title}
                                </h3>

                                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3 tracking-wider">
                                    {step.subtitle}
                                </div>

                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 