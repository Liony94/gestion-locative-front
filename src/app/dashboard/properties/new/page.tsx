'use client';

import { useRouter } from 'next/navigation';
import { PropertyForm } from './components/PropertyForm';
import { TenantSelector } from './components/TenantSelector';
import { usePropertyForm } from './hooks/usePropertyForm';
import { useTenants } from './hooks/useTenants';

export default function NewPropertyPage() {
    const router = useRouter();
    const {
        formData,
        loading,
        error,
        success,
        currentStep,
        setCurrentStep,
        handleChange,
        handleSubmit,
        updateUsers
    } = usePropertyForm();

    const {
        tenants,
        searchQuery,
        selectedTenant,
        setSelectedTenant,
        handleSearchChange
    } = useTenants(currentStep);

    const handleTenantSelect = (tenant: typeof selectedTenant) => {
        if (tenant) {
            setSelectedTenant(tenant);
            updateUsers(tenant.id);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {currentStep === 1 ? 'Ajouter un nouveau bien' : 'Sélectionner un locataire'}
                            </h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {currentStep === 1
                                    ? 'Remplissez les informations ci-dessous pour créer un nouveau bien immobilier'
                                    : 'Sélectionnez un locataire à associer à ce bien'
                                }
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`w-3 h-3 rounded-full ${currentStep === 1 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                            <span className={`w-3 h-3 rounded-full ${currentStep === 2 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-md">
                        <p className="text-sm text-green-600 dark:text-green-400">
                            Le bien a été créé avec succès ! Redirection en cours...
                        </p>
                    </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-6">
                    {currentStep === 1 ? (
                        <PropertyForm
                            formData={formData}
                            onChange={handleChange}
                        />
                    ) : (
                        <TenantSelector
                            tenants={tenants}
                            searchQuery={searchQuery}
                            selectedTenant={selectedTenant}
                            onSearch={handleSearchChange}
                            onSelect={handleTenantSelect}
                        />
                    )}

                    <div className="flex justify-end space-x-4">
                        {currentStep === 2 && (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(1)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Retour
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading || (currentStep === 2 && !selectedTenant)}
                            className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(loading || (currentStep === 2 && !selectedTenant)) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            {loading
                                ? 'Création en cours...'
                                : currentStep === 1
                                    ? 'Suivant'
                                    : 'Créer le bien'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 