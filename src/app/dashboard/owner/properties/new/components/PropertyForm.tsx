import { PropertyFormData, PropertyType, PropertyTypeLabels, BuildingType, BuildingLegalStatus, VisibilityStatus } from '../types';
import { Tab } from '@headlessui/react';
import { AddressSection } from './sections/AddressSection';
import { RentalSection } from './sections/RentalSection';
import { PhysicalDescriptionSection } from './sections/PhysicalDescriptionSection';
import { AmenitiesSection } from './sections/AmenitiesSection';
import { FinancialSection } from './sections/FinancialSection';
import { CadastralSection } from './sections/CadastralSection';
import { VisibilitySection } from './sections/VisibilitySection';
import { HiOutlineHome, HiOutlineTag, HiOutlineColorSwatch, HiOutlineLocationMarker, HiOutlineDocumentText, HiOutlineCog, HiOutlineMap, HiOutlineCurrencyEuro, HiOutlineEye } from 'react-icons/hi';

interface PropertyFormProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onArrayChange: (name: string, value: string[]) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    previewUrls?: string[];
    onRemoveImage?: (index: number) => void;
}

const formSections = [
    {
        name: 'Informations générales',
        icon: <HiOutlineHome className="w-5 h-5" />,
        description: 'Identifiant, type et couleur'
    },
    {
        name: 'Adresse',
        icon: <HiOutlineLocationMarker className="w-5 h-5" />,
        description: 'Localisation du bien'
    },
    {
        name: 'Location',
        icon: <HiOutlineTag className="w-5 h-5" />,
        description: 'Conditions de location'
    },
    {
        name: 'Description',
        icon: <HiOutlineDocumentText className="w-5 h-5" />,
        description: 'Caractéristiques du bien'
    },
    {
        name: 'Équipements',
        icon: <HiOutlineCog className="w-5 h-5" />,
        description: 'Équipements disponibles'
    },
    {
        name: 'Cadastre',
        icon: <HiOutlineMap className="w-5 h-5" />,
        description: 'Informations cadastrales'
    },
    {
        name: 'Finances',
        icon: <HiOutlineCurrencyEuro className="w-5 h-5" />,
        description: 'Informations financières'
    },
    {
        name: 'Visibilité',
        icon: <HiOutlineEye className="w-5 h-5" />,
        description: 'Paramètres de visibilité'
    }
];

export const PropertyForm = ({
    formData,
    onChange,
    onArrayChange,
    onImageChange,
    previewUrls = [],
    onRemoveImage
}: PropertyFormProps) => {
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
                                    Renseignez les informations de base du bien
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="relative">
                                    <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Identifiant unique
                                    </label>
                                    <div className="absolute left-3 top-[2.1rem] text-gray-400 dark:text-gray-500 pointer-events-none">
                                        <HiOutlineTag size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        id="identifier"
                                        name="identifier"
                                        required
                                        value={formData.identifier}
                                        onChange={onChange}
                                        className="block w-full pl-10 pr-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                        placeholder="ID-001"
                                    />
                                </div>

                                <div className="relative">
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Type de bien
                                    </label>
                                    <div className="absolute left-3 top-[2.1rem] text-gray-400 dark:text-gray-500 pointer-events-none">
                                        <HiOutlineTag size={20} />
                                    </div>
                                    <select
                                        id="type"
                                        name="type"
                                        required
                                        value={formData.type}
                                        onChange={onChange}
                                        className="block w-full pl-10 pr-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    >
                                        <option value="">Sélectionnez un type</option>
                                        {Object.values(PropertyType).map((value) => (
                                            <option key={value} value={value}>
                                                {PropertyTypeLabels[value]}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="relative">
                                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Couleur
                                    </label>
                                    <div className="absolute left-3 top-[2.1rem] text-gray-400 dark:text-gray-500 pointer-events-none">
                                        <HiOutlineColorSwatch size={20} />
                                    </div>
                                    <input
                                        type="color"
                                        id="color"
                                        name="color"
                                        value={formData.color || '#000000'}
                                        onChange={onChange}
                                        className="block w-full pl-10 pr-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 h-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </Tab.Panel>

                    {/* Adresse */}
                    <Tab.Panel>
                        <AddressSection formData={formData} onChange={onChange} />
                    </Tab.Panel>

                    {/* Location */}
                    <Tab.Panel>
                        <RentalSection formData={formData} onChange={onChange} />
                    </Tab.Panel>

                    {/* Description */}
                    <Tab.Panel>
                        <PhysicalDescriptionSection formData={formData} onChange={onChange} />
                    </Tab.Panel>

                    {/* Équipements */}
                    <Tab.Panel>
                        <AmenitiesSection
                            formData={formData}
                            onChange={onChange}
                            onArrayChange={onArrayChange}
                        />
                    </Tab.Panel>

                    {/* Cadastre */}
                    <Tab.Panel>
                        <CadastralSection formData={formData} onChange={onChange} />
                    </Tab.Panel>

                    {/* Finances */}
                    <Tab.Panel>
                        <FinancialSection formData={formData} onChange={onChange} />
                    </Tab.Panel>

                    {/* Visibilité */}
                    <Tab.Panel>
                        <VisibilitySection
                            formData={formData}
                            onChange={onChange}
                            onImageChange={onImageChange}
                            previewUrls={previewUrls}
                            onRemoveImage={onRemoveImage}
                        />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}; 