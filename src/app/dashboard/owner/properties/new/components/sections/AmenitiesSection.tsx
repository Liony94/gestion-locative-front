import { PropertyFormData } from '../../types';

interface AmenitiesSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const equipmentOptions = [
    'Cuisine équipée',
    'Lave-vaisselle',
    'Lave-linge',
    'Sèche-linge',
    'Réfrigérateur',
    'Four',
    'Micro-ondes',
    'Climatisation',
    'Chauffage',
    'Internet',
    'TV',
    'Ascenseur',
    'Interphone',
    'Digicode'
];

const outdoorSpacesOptions = [
    'Balcon',
    'Terrasse',
    'Jardin',
    'Piscine',
    'Parking',
    'Garage',
    'Cave'
];

const buildingAmenitiesOptions = [
    'Local à vélos',
    'Local poubelles',
    'Gardien',
    'Salle commune',
    'Buanderie'
];

const securityFeaturesOptions = [
    'Alarme',
    'Caméras de surveillance',
    'Porte blindée',
    'Vidéophone',
    'Gardiennage'
];

const sportsFacilitiesOptions = [
    'Salle de sport',
    'Tennis',
    'Piscine intérieure',
    'Spa',
    'Sauna'
];

interface AmenityGroupProps {
    title: string;
    options: string[];
    value: string[];
    name: string;
    onChange: (name: string, values: string[]) => void;
}

const AmenityGroup = ({ title, options, value = [], name, onChange }: AmenityGroupProps) => {
    const handleChange = (option: string) => {
        const newValues = value.includes(option)
            ? value.filter(v => v !== option)
            : [...value, option];
        onChange(name, newValues);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {options.map(option => (
                    <div key={option} className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id={`${name}-${option}`}
                            checked={value.includes(option)}
                            onChange={() => handleChange(option)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                            htmlFor={`${name}-${option}`}
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const AmenitiesSection = ({ formData, onChange }: AmenitiesSectionProps) => {
    const handleAmenityChange = (name: string, values: string[]) => {
        onChange({
            target: {
                name,
                value: values
            }
        } as any);
    };

    return (
        <div className="space-y-8">
            <AmenityGroup
                title="Équipements"
                options={equipmentOptions}
                value={formData.equipment || []}
                name="equipment"
                onChange={handleAmenityChange}
            />

            <AmenityGroup
                title="Espaces extérieurs"
                options={outdoorSpacesOptions}
                value={formData.outdoorSpaces || []}
                name="outdoorSpaces"
                onChange={handleAmenityChange}
            />

            <AmenityGroup
                title="Équipements de l'immeuble"
                options={buildingAmenitiesOptions}
                value={formData.buildingAmenities || []}
                name="buildingAmenities"
                onChange={handleAmenityChange}
            />

            <AmenityGroup
                title="Sécurité"
                options={securityFeaturesOptions}
                value={formData.securityFeatures || []}
                name="securityFeatures"
                onChange={handleAmenityChange}
            />

            <AmenityGroup
                title="Installations sportives"
                options={sportsFacilitiesOptions}
                value={formData.sportsFacilities || []}
                name="sportsFacilities"
                onChange={handleAmenityChange}
            />
        </div>
    );
}; 