'use client';

import { RentalFormData } from '@/types/rental';
import { Property } from '@/types/property';
import { User } from '@/types/user';
import { Tab } from '@headlessui/react';
import { HiOutlineHome, HiOutlineDocumentText, HiOutlineCurrencyEuro, HiOutlineCalendar, HiOutlineUser } from 'react-icons/hi';

interface RentalFormProps {
    formData: RentalFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onArrayChange: (name: string, value: string[]) => void;
    properties: Property[];
    tenants: User[];
    loadingData: boolean;
}

const formSections = [
    {
        name: 'Informations générales',
        icon: <HiOutlineHome className="w-5 h-5" />,
        description: 'Nom et description de la location'
    },
    {
        name: 'Propriété',
        icon: <HiOutlineHome className="w-5 h-5" />,
        description: 'Sélection de la propriété'
    },
    {
        name: 'Dates',
        icon: <HiOutlineCalendar className="w-5 h-5" />,
        description: 'Dates de début et de fin'
    },
    {
        name: 'Finances',
        icon: <HiOutlineCurrencyEuro className="w-5 h-5" />,
        description: 'Loyer, charges et dépôt de garantie'
    },
    {
        name: 'Caractéristiques',
        icon: <HiOutlineDocumentText className="w-5 h-5" />,
        description: 'Surface et ameublement'
    },
    {
        name: 'Locataire',
        icon: <HiOutlineUser className="w-5 h-5" />,
        description: 'Sélection du locataire'
    }
];

export const RentalForm = ({
    formData,
    onChange,
    onArrayChange,
    properties,
    tenants,
    loadingData
}: RentalFormProps) => {
    if (loadingData) {
        return (
            <div className="w-full h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex flex-wrap gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6">
                    {formSections.map((section) => (
                        <Tab
                            key={section.name}
                            className={({ selected }) =>
                                `flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 outline-none
                                ${selected
                                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }
                                group relative`
                            }
                        >
                            <div className="flex items-center gap-2">
                                {section.icon}
                                <span className="text-sm font-medium whitespace-nowrap">{section.name}</span>
                            </div>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                                {section.description}
                            </div>
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels className="mt-6">
                    {/* Informations générales */}
                    <Tab.Panel>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <div className="border-b dark:border-gray-700 pb-4 mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Informations générales
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Renseignez les informations de base de la location
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="relative">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nom de la location
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={onChange}
                                        className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        placeholder="Location Appartement Centre-ville"
                                    />
                                </div>

                                <div className="relative">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={onChange}
                                        rows={4}
                                        className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        placeholder="Description détaillée de la location..."
                                    />
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>

                    {/* Propriété */}
                    <Tab.Panel>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <div className="border-b dark:border-gray-700 pb-4 mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Propriété
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Sélectionnez la propriété concernée par cette location
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="relative">
                                    <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Propriété
                                    </label>
                                    <select
                                        id="propertyId"
                                        name="propertyId"
                                        required
                                        value={formData.propertyId}
                                        onChange={onChange}
                                        className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    >
                                        <option value="">Sélectionnez une propriété</option>
                                        {properties.map((property) => (
                                            <option key={property.id} value={property.id}>
                                                {property.identifier} - {property.address}, {property.city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>

                    {/* Dates */}
                    <Tab.Panel>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <div className="border-b dark:border-gray-700 pb-4 mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Dates
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Définissez les dates de début et de fin de la location
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Date de début
                                    </label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        required
                                        value={formData.startDate}
                                        onChange={onChange}
                                        className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Date de fin
                                    </label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        name="endDate"
                                        value={formData.endDate || ''}
                                        onChange={onChange}
                                        className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>

                    {/* Finances */}
                    <Tab.Panel>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <div className="border-b dark:border-gray-700 pb-4 mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Finances
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Définissez les montants du loyer, des charges et du dépôt de garantie
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="relative">
                                    <label htmlFor="rent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Loyer (€)
                                    </label>
                                    <input
                                        type="number"
                                        id="rent"
                                        name="rent"
                                        required
                                        value={formData.rent}
                                        onChange={onChange}
                                        min="0"
                                        step="0.01"
                                        className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <label htmlFor="charges" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Charges (€)
                                    </label>
                                    <input
                                        type="number"
                                        id="charges"
                                        name="charges"
                                        value={formData.charges || ''}
                                        onChange={onChange}
                                        min="0"
                                        step="0.01"
                                        className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <label htmlFor="deposit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Dépôt de garantie (€)
                                    </label>
                                    <input
                                        type="number"
                                        id="deposit"
                                        name="deposit"
                                        value={formData.deposit || ''}
                                        onChange={onChange}
                                        min="0"
                                        step="0.01"
                                        className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>

                    {/* Caractéristiques */}
                    <Tab.Panel>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <div className="border-b dark:border-gray-700 pb-4 mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Caractéristiques
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Précisez la surface et l'ameublement
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative">
                                    <label htmlFor="surface" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Surface (m²)
                                    </label>
                                    <input
                                        type="number"
                                        id="surface"
                                        name="surface"
                                        value={formData.surface || ''}
                                        onChange={onChange}
                                        min="0"
                                        step="0.01"
                                        className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    />
                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                        Ameublement
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="isFurnished"
                                            name="isFurnished"
                                            checked={formData.isFurnished}
                                            onChange={onChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                                        />
                                        <label htmlFor="isFurnished" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                                            Location meublée
                                        </label>
                                    </div>
                                </div>

                                {formData.isFurnished && (
                                    <div className="relative col-span-full">
                                        <label htmlFor="furniture" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Liste des meubles
                                        </label>
                                        <textarea
                                            id="furniture"
                                            name="furniture"
                                            value={formData.furniture?.join('\n') || ''}
                                            onChange={(e) => onArrayChange('furniture', e.target.value.split('\n'))}
                                            rows={4}
                                            className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                            placeholder="Entrez chaque meuble sur une nouvelle ligne..."
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Tab.Panel>

                    {/* Locataire */}
                    <Tab.Panel>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                            <div className="border-b dark:border-gray-700 pb-4 mb-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Locataire
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Sélectionnez le locataire pour cette location
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="relative">
                                    <label htmlFor="tenantId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Locataire
                                    </label>
                                    <select
                                        id="tenantId"
                                        name="tenantId"
                                        required
                                        value={formData.tenantId}
                                        onChange={onChange}
                                        className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    >
                                        <option value="">Sélectionnez un locataire</option>
                                        {tenants.map((tenant) => (
                                            <option key={tenant.id} value={tenant.id}>
                                                {tenant.firstName} {tenant.lastName} - {tenant.email}
                                                {tenant.guarantorName && ` (Garant: ${tenant.guarantorName})`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}; 