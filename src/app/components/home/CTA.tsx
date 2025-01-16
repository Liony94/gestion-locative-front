export default function CTA() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Fond avec gradient et effet de flou */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:16px_16px]"></div>
            </div>

            {/* Cercles décoratifs */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 hover:bg-white/20 transition-colors">
                        ✨ Offre de lancement limitée
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                        Prêt à révolutionner votre gestion locative ? 🎯
                    </h2>

                    <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto">
                        Rejoignez les <span className="font-semibold text-white">milliers de propriétaires</span> qui nous font confiance et simplifiez votre quotidien
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                        <button className="group relative w-64 px-6 py-4 rounded-xl bg-white text-blue-600 font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                            <span className="absolute inset-0 w-full h-full rounded-xl bg-white filter blur-lg opacity-0 group-hover:opacity-70 transition-opacity"></span>
                            <span className="relative flex items-center justify-center gap-2">
                                <span>Essai gratuit 14 jours</span>
                                <span className="text-xl">⭐</span>
                            </span>
                        </button>

                        <button className="w-64 px-6 py-4 rounded-xl text-white font-semibold text-lg border-2 border-white/50 hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm">
                            <span className="flex items-center justify-center gap-2">
                                <span>Voir les tarifs</span>
                                <span className="text-xl">💰</span>
                            </span>
                        </button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex justify-center items-center gap-8 flex-wrap">
                        <div className="flex items-center gap-2 text-white/90">
                            <span className="text-2xl">🛡️</span>
                            <span>Données sécurisées</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                            <span className="text-2xl">🔄</span>
                            <span>Annulation flexible</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                            <span className="text-2xl">🎮</span>
                            <span>Support 24/7</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
} 