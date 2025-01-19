import { PropertyFormData, propertyTypes } from '../types';

interface PropertyFormProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const PropertyForm = ({ formData, onChange }: PropertyFormProps) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Titre */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Titre
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="ex: Maison T4 avec jardin"
                />
            </div>

            {/* Type de bien */}
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
                    {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {/* Surface */}
            <div>
                <label htmlFor="surface" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Surface (m²)
                </label>
                <input
                    type="number"
                    id="surface"
                    name="surface"
                    required
                    min="0"
                    value={formData.surface}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            {/* Prix */}
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Loyer mensuel (€)
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    required
                    min="0"
                    value={formData.price}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            {/* Adresse */}
            <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Adresse
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            {/* Ville */}
            <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ville
                </label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            {/* Code postal */}
            <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Code postal
                </label>
                <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    pattern="[0-9]{5}"
                    title="Le code postal doit contenir 5 chiffres"
                />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Description détaillée du bien..."
                />
            </div>
        </div>
    );
}; 