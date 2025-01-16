export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 overflow-hidden">
            {/* Cercles décoratifs en arrière-plan */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="space-y-6 max-w-4xl mx-auto">
                    <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium inline-block mb-4 hover:scale-105 transition-transform cursor-default">
                        ✨ La solution intelligente pour votre gestion locative
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-transparent bg-clip-text transform transition-transform hover:scale-105">
                        Gestion Locative Simplifiée 🏠
                    </h1>

                    <p className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Automatisez vos tâches, <span className="text-blue-600 dark:text-blue-400">optimisez vos revenus</span> et gérez vos biens immobiliers en toute sérénité ✨
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 w-64">
                            <span className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 filter blur-lg opacity-0 group-hover:opacity-70 transition-opacity"></span>
                            <span className="relative">Commencer maintenant 🚀</span>
                        </button>

                        <button className="px-8 py-4 rounded-xl bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold text-lg border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 hover:shadow-xl transition-all duration-300 w-64">
                            En savoir plus 📚
                        </button>
                    </div>

                    <div className="mt-16 flex justify-center items-center gap-8 flex-wrap">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <span className="text-2xl">🔒</span>
                            <span>Sécurisé</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <span className="text-2xl">⚡</span>
                            <span>Rapide</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <span className="text-2xl">💎</span>
                            <span>Premium</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 