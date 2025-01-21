'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authApi } from '@/services/api';

type Step = 'role' | 'personal' | 'contact' | 'email';

export enum UserRole {
    OWNER = 'owner',
    TENANT = 'tenant'
}

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
    phone: string;
    address: string;
}

export default function RegisterPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState<Step>('role');
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: UserRole.TENANT,
        phone: '',
        address: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return;
        }

        setIsLoading(true);

        try {
            const { confirmPassword, ...registerData } = formData;
            console.log('Envoi du formulaire avec:', registerData);
            await authApi.register(registerData);

            // Redirection en fonction du rôle
            if (formData.role === UserRole.TENANT) {
                router.push('/dashboard/tenant?registered=true');
            } else {
                router.push('/dashboard?registered=true');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        switch (currentStep) {
            case 'role':
                setCurrentStep('personal');
                break;
            case 'personal':
                setCurrentStep('contact');
                break;
            case 'contact':
                setCurrentStep('email');
                break;
        }
    };

    const previousStep = () => {
        switch (currentStep) {
            case 'personal':
                setCurrentStep('role');
                break;
            case 'contact':
                setCurrentStep('personal');
                break;
            case 'email':
                setCurrentStep('contact');
                break;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Créer un compte ✨
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {currentStep === 'role' && 'Choisissez votre rôle pour commencer'}
                        {currentStep === 'personal' && 'Dites-nous en plus sur vous'}
                        {currentStep === 'contact' && 'Vos coordonnées de contact'}
                        {currentStep === 'email' && 'Plus que quelques détails'}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className="flex justify-center mb-8">
                    <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${currentStep === 'role' ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        <div className={`w-12 h-1 ${currentStep === 'role' ? 'bg-gray-300' : 'bg-blue-600'}`} />
                        <div className={`w-3 h-3 rounded-full ${currentStep === 'personal' ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        <div className={`w-12 h-1 ${currentStep === 'contact' ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        <div className={`w-3 h-3 rounded-full ${currentStep === 'contact' ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        <div className={`w-12 h-1 ${currentStep === 'email' ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        <div className={`w-3 h-3 rounded-full ${currentStep === 'email' ? 'bg-blue-600' : 'bg-gray-300'}`} />
                    </div>
                </div>

                {currentStep === 'role' && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
                            Quel est votre rôle ?
                        </h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => {
                                    handleInputChange('role', UserRole.OWNER);
                                    nextStep();
                                }}
                                className={`p-6 border rounded-xl text-center hover:border-blue-500 transition-all ${formData.role === UserRole.OWNER
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                    : 'border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <div className="text-3xl mb-2">🏠</div>
                                <h4 className="text-lg font-medium">Propriétaire</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Je souhaite gérer mes biens immobiliers
                                </p>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleInputChange('role', UserRole.TENANT);
                                    nextStep();
                                }}
                                className={`p-6 border rounded-xl text-center hover:border-blue-500 transition-all ${formData.role === UserRole.TENANT
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                    : 'border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <div className="text-3xl mb-2">👥</div>
                                <h4 className="text-lg font-medium">Locataire</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Je suis locataire d'un bien
                                </p>
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 'personal' && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
                            Comment vous appelez-vous ?
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Prénom
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    required
                                    value={formData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Jean"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Nom
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    value={formData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Dupont"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={previousStep}
                                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                            >
                                Retour
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                disabled={!formData.firstName || !formData.lastName}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                Continuer
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 'contact' && (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
                            Vos coordonnées
                        </h3>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Téléphone (optionnel)
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="06 12 34 56 78"
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Adresse (optionnel)
                            </label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="123 rue de la Paix, 75000 Paris"
                            />
                        </div>
                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={previousStep}
                                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                            >
                                Retour
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg"
                            >
                                Continuer
                            </button>
                        </div>
                    </div>
                )}

                {currentStep === 'email' && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
                            Finalisez votre inscription
                        </h3>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="vous@exemple.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Confirmer le mot de passe
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                J'accepte les{' '}
                                <Link href="/terms" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                                    conditions d'utilisation
                                </Link>
                            </label>
                        </div>

                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={previousStep}
                                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                            >
                                Retour
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || !formData.email || !formData.password || !formData.confirmPassword}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {isLoading ? 'Inscription en cours...' : 'Créer mon compte'}
                            </button>
                        </div>
                    </form>
                )}

                {currentStep === 'role' && (
                    <div className="text-center text-sm mt-6">
                        <span className="text-gray-600 dark:text-gray-400">Déjà un compte ?</span>{' '}
                        <Link
                            href="/auth/login"
                            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                            Se connecter
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
} 