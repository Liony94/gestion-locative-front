import React from 'react';
import { PropertyFormData } from '../../types';
import { HiOutlineHome, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsRulers, BsBuildingUp, BsCalendarDate } from 'react-icons/bs';
import { MdOutlineMeetingRoom, MdOutlineKingBed, MdOutlineBathtub } from 'react-icons/md';
import { FaRegBuilding } from 'react-icons/fa';
import { TbBuildingEstate } from 'react-icons/tb';

interface PhysicalDescriptionSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const PhysicalDescriptionSection = ({ formData, onChange }: PhysicalDescriptionSectionProps) => {
    const inputClasses = "block w-full pl-10 pr-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";
    const selectClasses = "block w-full pl-10 pr-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
    const iconWrapperClasses = "absolute left-3 top-[2.1rem] text-gray-400 dark:text-gray-500 pointer-events-none";
    const textareaClasses = "block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Description physique
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Renseignez les caractéristiques physiques du bien
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative">
                        <label htmlFor="type" className={labelClasses}>
                            Type de bien
                        </label>
                        <div className={iconWrapperClasses}>
                            <HiOutlineHome size={20} />
                        </div>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={onChange}
                            className={selectClasses}
                        >
                            <option value="">Sélectionnez un type</option>
                            <option value="HOUSE">Maison</option>
                            <option value="APARTMENT">Appartement</option>
                            <option value="STUDIO">Studio</option>
                            <option value="LOFT">Loft</option>
                            <option value="VILLA">Villa</option>
                        </select>
                    </div>

                    <div className="relative">
                        <label htmlFor="buildingType" className={labelClasses}>
                            Type de construction
                        </label>
                        <div className={iconWrapperClasses}>
                            <FaRegBuilding size={20} />
                        </div>
                        <select
                            id="buildingType"
                            name="buildingType"
                            value={formData.buildingType || ''}
                            onChange={onChange}
                            className={selectClasses}
                        >
                            <option value="">Sélectionnez un type</option>
                            <option value="INDIVIDUAL">Individuel</option>
                            <option value="COLLECTIVE">Collectif</option>
                        </select>
                    </div>

                    <div className="relative">
                        <label htmlFor="buildingLegalStatus" className={labelClasses}>
                            Statut juridique
                        </label>
                        <div className={iconWrapperClasses}>
                            <TbBuildingEstate size={20} />
                        </div>
                        <select
                            id="buildingLegalStatus"
                            name="buildingLegalStatus"
                            value={formData.buildingLegalStatus || ''}
                            onChange={onChange}
                            className={selectClasses}
                        >
                            <option value="">Sélectionnez un statut</option>
                            <option value="CONDOMINIUM">Copropriété</option>
                            <option value="SINGLE_OWNER">Propriétaire unique</option>
                        </select>
                    </div>

                    <div className="relative">
                        <label htmlFor="surface" className={labelClasses}>
                            Surface habitable (m²)
                        </label>
                        <div className={iconWrapperClasses}>
                            <BsRulers size={20} />
                        </div>
                        <input
                            type="number"
                            id="surface"
                            name="surface"
                            value={formData.surface || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="80"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="numberOfRooms" className={labelClasses}>
                            Nombre de pièces
                        </label>
                        <div className={iconWrapperClasses}>
                            <MdOutlineMeetingRoom size={20} />
                        </div>
                        <input
                            type="number"
                            id="numberOfRooms"
                            name="numberOfRooms"
                            value={formData.numberOfRooms || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="4"
                            min="0"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="numberOfBedrooms" className={labelClasses}>
                            Chambres
                        </label>
                        <div className={iconWrapperClasses}>
                            <MdOutlineKingBed size={20} />
                        </div>
                        <input
                            type="number"
                            id="numberOfBedrooms"
                            name="numberOfBedrooms"
                            value={formData.numberOfBedrooms || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="2"
                            min="0"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="numberOfBathrooms" className={labelClasses}>
                            Salles de bain
                        </label>
                        <div className={iconWrapperClasses}>
                            <MdOutlineBathtub size={20} />
                        </div>
                        <input
                            type="number"
                            id="numberOfBathrooms"
                            name="numberOfBathrooms"
                            value={formData.numberOfBathrooms || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="1"
                            min="0"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="constructionDate" className={labelClasses}>
                            Année de construction
                        </label>
                        <div className={iconWrapperClasses}>
                            <BsCalendarDate size={20} />
                        </div>
                        <input
                            type="date"
                            id="constructionDate"
                            name="constructionDate"
                            value={formData.constructionDate ? new Date(formData.constructionDate).toISOString().split('T')[0] : ''}
                            onChange={onChange}
                            className={inputClasses}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Description détaillée
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Ajoutez une description détaillée du bien
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="description" className={labelClasses}>
                            Description générale
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description || ''}
                            onChange={onChange}
                            rows={4}
                            className={textareaClasses}
                            placeholder="Description détaillée du bien..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}; 