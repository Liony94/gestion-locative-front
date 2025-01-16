'use client';
import { useState } from 'react';

const plans = [
    {
        name: "Découverte",
        icon: "🎁",
        description: "Idéal pour tester la solution",
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
            "1 bien immobilier",
            "2 locataires maximum",
            "2 baux de location",
            "4 états des lieux",
            "50 Mo de stockage cloud",
            "Compte unique",
            "Support standard",
            "Templates de documents",
            "Signature numérique",
            "Import bancaire",
            "IA conversationnelle"
        ],
        color: "from-blue-500 to-cyan-500",
        cta: "Démarrer gratuitement",
        subtitle: "Offert avec ❤️"
    },
    {
        name: "Essentiel",
        icon: "⭐",
        description: "Pour les petits propriétaires",
        monthlyPrice: 49,
        yearlyPrice: 490,
        features: [
            "2 à 5 biens immobiliers",
            "Locataires illimités",
            "Baux illimités",
            "États des lieux illimités",
            "500 Mo de stockage cloud",
            "Multi-comptes",
            "Support prioritaire",
            "Templates personnalisables",
            "Signature électronique avancée",
            "Synchronisation bancaire",
            "IA avancée & analyses"
        ],
        popular: true,
        color: "from-purple-500 to-indigo-500",
        cta: "Choisir l'Essentiel",
        subtitle: "Prix HT déductible"
    },
    {
        name: "Premium",
        icon: "👑",
        description: "Pour les professionnels",
        monthlyPrice: 99,
        yearlyPrice: 990,
        features: [
            "Biens immobiliers illimités",
            "Gestion multi-portefeuille",
            "Baux & documents illimités",
            "Suite complète d'outils",
            "5 Go de stockage cloud",
            "Équipe illimitée",
            "Support VIP dédié",
            "Documents sur mesure",
            "Signature électronique pro",
            "API bancaire avancée",
            "Suite IA professionnelle"
        ],
        color: "from-orange-500 to-amber-500",
        cta: "Passer au Premium",
        subtitle: "Prix HT déductible"
    }
];

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                        Tarification
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 text-transparent bg-clip-text">
                        Choisissez votre formule 💫
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                        Une solution adaptée à chaque besoin, sans engagement
                    </p>

                    {/* Switch de tarification */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <span className={`text-lg ${!isYearly ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                            Mensuel
                        </span>
                        <button
                            onClick={() => setIsYearly(!isYearly)}
                            className="relative w-16 h-8 rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                        >
                            <span
                                className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white transition-transform transform ${isYearly ? 'translate-x-8' : ''
                                    }`}
                            />
                        </button>
                        <span className={`text-lg ${isYearly ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                            Annuel <span className="text-green-500 text-sm">-17%</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative p-8 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-600 dark:ring-blue-400' : ''
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                                    Le plus choisi
                                </span>
                            )}

                            <div className="text-4xl mb-4">{plan.icon}</div>
                            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                                {plan.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {plan.description}
                            </p>

                            <div className="mb-4">
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}€
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                    /{isYearly ? 'an' : 'mois'}
                                </span>
                                <p className="text-sm text-gray-500 mt-1">{plan.subtitle}</p>
                            </div>

                            <ul className="mb-8 space-y-4">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-400">
                                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                                <li className="flex items-center text-gray-600 dark:text-gray-400 italic text-sm">
                                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Et bien plus encore...
                                </li>
                            </ul>

                            <button
                                className={`w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${plan.color} hover:shadow-lg transition-all duration-300`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
} 