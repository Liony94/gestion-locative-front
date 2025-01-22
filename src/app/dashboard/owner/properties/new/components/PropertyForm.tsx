import { PropertyFormData, PropertyType, BuildingType, BuildingLegalStatus, VisibilityStatus } from '../types';
import { Tab } from '@headlessui/react';
import { AddressSection } from './sections/AddressSection';
import { RentalSection } from './sections/RentalSection';
import { PhysicalDescriptionSection } from './sections/PhysicalDescriptionSection';
import { AmenitiesSection } from './sections/AmenitiesSection';
import { FinancialSection } from './sections/FinancialSection';
import { CadastralSection } from './sections/CadastralSection';
import { VisibilitySection } from './sections/VisibilitySection';

interface PropertyFormProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    previewUrls?: string[];
    onRemoveImage?: (index: number) => void;
}

const formSections = [
    { name: 'Informations générales', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Adresse', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
    { name: 'Location', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Description', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' },
    { name: 'Équipements', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { name: 'Cadastre', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
    { name: 'Finances', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Visibilité', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

export const PropertyForm = ({
    formData,
    onChange,
    onImageChange,
    previewUrls = [],
    onRemoveImage
}: PropertyFormProps) => {
    return (
        <div className="w-full px-2 py-16 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 overflow-x-auto">
                    {formSections.map((section) => (
                        <Tab
                            key={section.name}
                            className={({ selected }) =>
                                `flex-shrink-0 rounded-lg py-2.5 px-4 text-sm font-medium leading-5 text-blue-700
                                ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                                ${selected
                                    ? 'bg-white shadow'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                }`
                            }
                        >
                            <div className="flex items-center space-x-2">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={section.icon}
                                    />
                                </svg>
                                <span>{section.name}</span>
                            </div>
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels className="mt-6">
                    {/* Informations générales */}
                    <Tab.Panel>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Identifiant unique
                                </label>
                                <input
                                    type="text"
                                    id="identifier"
                                    name="identifier"
                                    required
                                    value={formData.identifier}
                                    onChange={onChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Couleur
                                </label>
                                <input
                                    type="color"
                                    id="color"
                                    name="color"
                                    value={formData.color || '#000000'}
                                    onChange={onChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10"
                                />
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Type de bien
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    required
                                    value={formData.type}
                                    onChange={onChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                >
                                    {Object.entries(PropertyType).map(([key, value]) => (
                                        <option key={key} value={value}>{key}</option>
                                    ))}
                                </select>
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
                        <AmenitiesSection formData={formData} onChange={onChange} />
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