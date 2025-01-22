import { PropertyFormData } from '../../types';
import { HiOutlineHome, HiOutlineOfficeBuilding, HiOutlineLocationMarker } from 'react-icons/hi';
import { FaBuilding } from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs';
import { IoEarthOutline } from 'react-icons/io5';
import React from 'react';

interface AddressSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const AddressSection = ({ formData, onChange }: AddressSectionProps) => {
    const inputClasses = "block w-full pl-10 pr-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
    const iconWrapperClasses = "absolute left-3 top-[2.1rem] text-gray-400 dark:text-gray-500 pointer-events-none";

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Adresse principale
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Renseignez l'adresse complète du bien
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <label htmlFor="address" className={labelClasses}>
                            Adresse
                        </label>
                        <div className={iconWrapperClasses}>
                            <HiOutlineLocationMarker size={20} />
                        </div>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="123 rue de la République"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="additionalAddress" className={labelClasses}>
                            Complément d'adresse
                        </label>
                        <div className={iconWrapperClasses}>
                            <HiOutlineHome size={20} />
                        </div>
                        <input
                            type="text"
                            id="additionalAddress"
                            name="additionalAddress"
                            value={formData.additionalAddress || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="Appartement, suite, etc."
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Localisation
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Précisez la localisation exacte du bien
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative">
                        <label htmlFor="building" className={labelClasses}>
                            Bâtiment
                        </label>
                        <div className={iconWrapperClasses}>
                            <HiOutlineOfficeBuilding size={20} />
                        </div>
                        <input
                            type="text"
                            id="building"
                            name="building"
                            value={formData.building || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="Bâtiment A"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="staircase" className={labelClasses}>
                            Escalier
                        </label>
                        <div className={iconWrapperClasses}>
                            <FaBuilding size={20} />
                        </div>
                        <input
                            type="text"
                            id="staircase"
                            name="staircase"
                            value={formData.staircase || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="Escalier 1"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="floor" className={labelClasses}>
                            Étage
                        </label>
                        <div className={iconWrapperClasses}>
                            <BsBuilding size={20} />
                        </div>
                        <input
                            type="text"
                            id="floor"
                            name="floor"
                            value={formData.floor || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="3ème étage"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="city" className={labelClasses}>
                            Ville
                        </label>
                        <div className={iconWrapperClasses}>
                            <IoEarthOutline size={20} />
                        </div>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="Paris"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="zipCode" className={labelClasses}>
                            Code postal
                        </label>
                        <div className={iconWrapperClasses}>
                            <HiOutlineLocationMarker size={20} />
                        </div>
                        <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="75001"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="country" className={labelClasses}>
                            Pays
                        </label>
                        <div className={iconWrapperClasses}>
                            <IoEarthOutline size={20} />
                        </div>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="France"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}; 