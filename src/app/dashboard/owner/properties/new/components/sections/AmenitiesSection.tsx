import React from 'react';
import { PropertyFormData } from '../../types';
import { HiCheck } from 'react-icons/hi';

interface AmenitiesSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onArrayChange: (name: string, value: string[]) => void;
}

export const AmenitiesSection = ({ formData, onChange, onArrayChange }: AmenitiesSectionProps) => {
    const checkboxClasses = "form-checkbox h-5 w-5 text-blue-500 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200";
    const labelClasses = "ml-3 text-sm font-medium text-gray-700 dark:text-gray-300";
    const groupTitleClasses = "text-base font-medium text-gray-900 dark:text-white mb-4";

    const handleAmenityChange = (amenity: string) => {
        const currentAmenities = formData.amenities || [];
        const newAmenities = currentAmenities.includes(amenity)
            ? currentAmenities.filter(a => a !== amenity)
            : [...currentAmenities, amenity];
        onArrayChange('amenities', newAmenities);
    };

    const amenityGroups = {
        'Équipements principaux': [
            'HEATING',
            'AIR_CONDITIONING',
            'ELEVATOR',
            'PARKING',
            'GARAGE',
            'CELLAR',
            'STORAGE',
        ],
        'Pièces': [
            'LIVING_ROOM',
            'SEPARATE_KITCHEN',
            'OPEN_KITCHEN',
            'DINING_ROOM',
            'OFFICE',
            'DRESSING',
            'LAUNDRY_ROOM',
        ],
        'Extérieur': [
            'BALCONY',
            'TERRACE',
            'GARDEN',
            'POOL',
        ],
        'Sécurité': [
            'INTERCOM',
            'SECURITY_DOOR',
            'ALARM_SYSTEM',
            'CARETAKER',
        ],
    };

    const amenityLabels: { [key: string]: string } = {
        HEATING: 'Chauffage',
        AIR_CONDITIONING: 'Climatisation',
        ELEVATOR: 'Ascenseur',
        PARKING: 'Parking',
        GARAGE: 'Garage',
        CELLAR: 'Cave',
        STORAGE: 'Local de rangement',
        LIVING_ROOM: 'Salon',
        SEPARATE_KITCHEN: 'Cuisine séparée',
        OPEN_KITCHEN: 'Cuisine ouverte',
        DINING_ROOM: 'Salle à manger',
        OFFICE: 'Bureau',
        DRESSING: 'Dressing',
        LAUNDRY_ROOM: 'Buanderie',
        BALCONY: 'Balcon',
        TERRACE: 'Terrasse',
        GARDEN: 'Jardin',
        POOL: 'Piscine',
        INTERCOM: 'Interphone',
        SECURITY_DOOR: 'Porte sécurisée',
        ALARM_SYSTEM: 'Système d\'alarme',
        CARETAKER: 'Gardien',
    };

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Équipements et caractéristiques
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Sélectionnez les équipements présents dans le bien
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(amenityGroups).map(([groupName, amenities]) => (
                        <div key={groupName} className="space-y-4">
                            <h4 className={groupTitleClasses}>{groupName}</h4>
                            <div className="space-y-3">
                                {amenities.map((amenity) => (
                                    <div key={amenity} className="relative flex items-start">
                                        <div className="flex items-center h-6">
                                            <input
                                                id={amenity}
                                                name={amenity}
                                                type="checkbox"
                                                checked={(formData.amenities || []).includes(amenity)}
                                                onChange={() => handleAmenityChange(amenity)}
                                                className={checkboxClasses}
                                            />
                                        </div>
                                        <label htmlFor={amenity} className={labelClasses}>
                                            {amenityLabels[amenity]}
                                        </label>
                                        {(formData.amenities || []).includes(amenity) && (
                                            <HiCheck className="absolute right-0 text-green-500 dark:text-green-400" size={20} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Détails supplémentaires
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Ajoutez des détails sur les équipements
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="amenitiesDetails" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Détails des équipements
                        </label>
                        <textarea
                            id="amenitiesDetails"
                            name="amenitiesDetails"
                            rows={4}
                            value={formData.amenitiesDetails || ''}
                            onChange={onChange}
                            className="block w-full px-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            placeholder="Décrivez les équipements en détail (marques, modèles, état, etc.)..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}; 