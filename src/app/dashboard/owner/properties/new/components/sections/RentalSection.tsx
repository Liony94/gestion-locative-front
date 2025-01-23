import React from 'react';
import { PropertyFormData } from '../../types';
import { HiOutlineUsers, HiOutlineDocumentText, HiOutlineGlobe, HiOutlineCalendar } from 'react-icons/hi';
import { BsHouseDoor, BsShieldCheck, BsEyeFill, BsEyeSlashFill, BsFileEarmarkText, BsCalendarCheck, BsCalendarX } from 'react-icons/bs';
import { MdOutlineDescription } from 'react-icons/md';
import { IoDocumentTextOutline } from 'react-icons/io5';

interface RentalSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const RentalSection = ({ formData, onChange }: RentalSectionProps) => {
    const inputClasses = "block w-full pl-10 pr-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";
    const selectClasses = "block w-full pl-10 pr-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
    const iconWrapperClasses = "absolute left-3 top-[2.1rem] text-gray-400 dark:text-gray-500 pointer-events-none";
    const textareaClasses = "block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";
    const checkboxClasses = "h-5 w-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-0 transition-colors duration-200 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400";
    const checkboxLabelClasses = "ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200";
    const checkboxWrapperClasses = "relative flex items-start p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200";

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Informations de location
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Renseignez les détails de la location
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative">
                        <label htmlFor="rentalStartDate" className={labelClasses}>
                            Date de début
                        </label>
                        <div className={iconWrapperClasses}>
                            <BsCalendarCheck size={20} />
                        </div>
                        <input
                            type="date"
                            id="rentalStartDate"
                            name="rentalStartDate"
                            value={formData.rentalStartDate || ''}
                            onChange={onChange}
                            className={inputClasses}
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="rentalEndDate" className={labelClasses}>
                            Date de fin
                        </label>
                        <div className={iconWrapperClasses}>
                            <BsCalendarX size={20} />
                        </div>
                        <input
                            type="date"
                            id="rentalEndDate"
                            name="rentalEndDate"
                            value={formData.rentalEndDate || ''}
                            onChange={onChange}
                            className={inputClasses}
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="leaseType" className={labelClasses}>
                            Type de bail
                        </label>
                        <div className={iconWrapperClasses}>
                            <HiOutlineDocumentText size={20} />
                        </div>
                        <select
                            id="leaseType"
                            name="leaseType"
                            value={formData.leaseType || ''}
                            onChange={onChange}
                            className={selectClasses}
                        >
                            <option value="">Sélectionnez un type</option>
                            <option value="FURNISHED">Meublé</option>
                            <option value="UNFURNISHED">Non meublé</option>
                            <option value="COMMERCIAL">Commercial</option>
                            <option value="PROFESSIONAL">Professionnel</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className={checkboxWrapperClasses}>
                        <div className="flex items-center h-6">
                            <input
                                id="isFurnished"
                                name="isFurnished"
                                type="checkbox"
                                checked={formData.isFurnished}
                                onChange={onChange}
                                className={checkboxClasses}
                            />
                        </div>
                        <label htmlFor="isFurnished" className={checkboxLabelClasses}>
                            Meublé
                        </label>
                    </div>

                    <div className={checkboxWrapperClasses}>
                        <div className="flex items-center h-6">
                            <input
                                id="smokersAllowed"
                                name="smokersAllowed"
                                type="checkbox"
                                checked={formData.smokersAllowed}
                                onChange={onChange}
                                className={checkboxClasses}
                            />
                        </div>
                        <label htmlFor="smokersAllowed" className={checkboxLabelClasses}>
                            Fumeurs autorisés
                        </label>
                    </div>

                    <div className={checkboxWrapperClasses}>
                        <div className="flex items-center h-6">
                            <input
                                id="petsAllowed"
                                name="petsAllowed"
                                type="checkbox"
                                checked={formData.petsAllowed}
                                onChange={onChange}
                                className={checkboxClasses}
                            />
                        </div>
                        <label htmlFor="petsAllowed" className={checkboxLabelClasses}>
                            Animaux autorisés
                        </label>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Documents et conditions
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Ajoutez les détails des documents et conditions de location
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="leaseTerms" className={labelClasses}>
                            Conditions du bail
                        </label>
                        <div className="relative">
                            <div className={iconWrapperClasses}>
                                <BsFileEarmarkText size={20} />
                            </div>
                            <textarea
                                id="leaseTerms"
                                name="leaseTerms"
                                rows={4}
                                value={formData.leaseTerms || ''}
                                onChange={onChange}
                                className={textareaClasses}
                                placeholder="Détaillez les conditions principales du bail..."
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="specialConditions" className={labelClasses}>
                            Conditions particulières
                        </label>
                        <div className="relative">
                            <div className={iconWrapperClasses}>
                                <MdOutlineDescription size={20} />
                            </div>
                            <textarea
                                id="specialConditions"
                                name="specialConditions"
                                rows={4}
                                value={formData.specialConditions || ''}
                                onChange={onChange}
                                className={textareaClasses}
                                placeholder="Ajoutez des conditions particulières si nécessaire..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 