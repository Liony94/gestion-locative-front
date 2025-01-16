const features = [
    {
        icon: "📊",
        title: "Tableau de bord intuitif",
        description: "Visualisez toutes vos données locatives en un coup d'œil",
        color: "from-blue-500 to-cyan-500"
    },
    {
        icon: "💰",
        title: "Gestion des paiements",
        description: "Suivez tous vos loyers et charges facilement",
        color: "from-green-500 to-emerald-500"
    },
    {
        icon: "📝",
        title: "Documents automatisés",
        description: "Générez vos contrats et quittances en quelques clics",
        color: "from-purple-500 to-indigo-500"
    },
    {
        icon: "🏗️",
        title: "Suivi des travaux",
        description: "Planifiez et suivez tous vos travaux d'entretien",
        color: "from-orange-500 to-amber-500"
    }
];

export default function Features() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-blue-50 dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                        Fonctionnalités
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 text-transparent bg-clip-text">
                        Tout ce dont vous avez besoin ⭐
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        Une suite complète d'outils pour simplifier votre gestion locative au quotidien
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${feature.color}"></div>

                            <div className="relative z-10">
                                <div className="text-5xl mb-6 transform transition-transform group-hover:scale-110 inline-block">
                                    {feature.icon}
                                </div>

                                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${feature.color}">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>

                                <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-sm font-semibold">En savoir plus</span>
                                    <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 