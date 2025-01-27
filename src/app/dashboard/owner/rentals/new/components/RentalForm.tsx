'use client';

import { useState } from 'react';
import { RentalFormData, RentalType, UsageType, PaymentFrequency, PaymentType, ChargeType } from '@/types/rental';
import { Property } from '@/types/property';
import { User } from '@/types/user';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import GeneralSection from './sections/GeneralSection';
import AdditionalInfoSection from './sections/AdditionalInfoSection';
import SettingsSection from './sections/SettingsSection';


interface RentalFormProps {
    formData: RentalFormData;
    onChange: (name: keyof RentalFormData, value: any) => void;
    onArrayChange: (name: keyof RentalFormData, value: any[]) => void;
    properties: Property[];
    tenants: User[];
    loadingData: boolean;
}

const TABS = [
    { id: 'general', label: 'Informations générales' },
    { id: 'additional', label: 'Informations complémentaires' },
    { id: 'settings', label: 'Autres réglages' }
];

export function RentalForm({ formData, onChange, onArrayChange, properties, tenants, loadingData }: RentalFormProps) {
    const [currentTab, setCurrentTab] = useState(0);

    const rentalTypes = Object.entries(RentalType).map(([key, value]) => ({
        value,
        label: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    }));

    const usageTypes = Object.entries(UsageType).map(([key, value]) => ({
        value,
        label: key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    }));

    const paymentFrequencies = Object.entries(PaymentFrequency).map(([key, value]) => ({
        value,
        label: key === 'MONTHLY' ? 'Mensuel' :
            key === 'QUARTERLY' ? 'Trimestriel' :
                key === 'ANNUALLY' ? 'Annuel' : key
    }));

    const paymentTypes = Object.entries(PaymentType).map(([key, value]) => ({
        value,
        label: key === 'IN_ADVANCE' ? 'Paiement à échoir' :
            key === 'AT_TERM' ? 'Paiement à terme échu' : key
    }));

    const chargeTypes = Object.entries(ChargeType).map(([key, value]) => ({
        value,
        label: key === 'PROVISION' ? 'Provision pour charges' :
            key === 'FIXED' ? 'Forfait de charges' : key
    }));

    if (loadingData) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    const handleNext = () => {
        if (currentTab < TABS.length - 1) {
            setCurrentTab(currentTab + 1);
        }
    };

    const handlePrevious = () => {
        if (currentTab > 0) {
            setCurrentTab(currentTab - 1);
        }
    };

    return (
        <div className="space-y-6">
            {/* Navigation des onglets */}
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8" aria-label="Onglets">
                    {TABS.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => setCurrentTab(index)}
                            className={`
                                py-4 px-1 border-b-2 font-medium text-sm
                                ${currentTab === index
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-500'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                }
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Contenu de l'onglet actif */}
            <div className="mt-6">
                {currentTab === 0 && (
                    <GeneralSection
                        formData={formData}
                        onChange={onChange}
                        properties={properties}
                        tenants={tenants}
                    />
                )}
                {currentTab === 1 && (
                    <AdditionalInfoSection
                        formData={formData}
                        onChange={onChange}
                    />
                )}
                {currentTab === 2 && (
                    <SettingsSection
                        formData={formData}
                        onChange={onChange}
                    />
                )}

                {/* Boutons de navigation */}
                <div className="mt-8 flex justify-between">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentTab === 0}
                        className={`
                            inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                            ${currentTab === 0
                                ? 'text-gray-400 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                                : 'text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }
                            border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        `}
                    >
                        <HiChevronLeft className="mr-2 h-5 w-5" />
                        Précédent
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={currentTab === TABS.length - 1}
                        className={`
                            inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                            ${currentTab === TABS.length - 1
                                ? 'text-gray-400 bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                                : 'text-white bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-800'
                            }
                            border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                        `}
                    >
                        Suivant
                        <HiChevronRight className="ml-2 h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
} 