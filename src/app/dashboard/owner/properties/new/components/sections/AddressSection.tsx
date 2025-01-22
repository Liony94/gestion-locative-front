import { PropertyFormData } from '../../types';

interface AddressSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const AddressSection = ({ formData, onChange }: AddressSectionProps) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    placeholder="Numéro et nom de la rue"
                />
            </div>

            <div className="md:col-span-2">
                <label htmlFor="address2" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Complément d'adresse
                </label>
                <input
                    type="text"
                    id="address2"
                    name="address2"
                    value={formData.address2 || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Appartement, suite, unité, etc."
                />
            </div>

            <div>
                <label htmlFor="building" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Bâtiment
                </label>
                <input
                    type="text"
                    id="building"
                    name="building"
                    value={formData.building || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="staircase" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Escalier
                </label>
                <input
                    type="text"
                    id="staircase"
                    name="staircase"
                    value={formData.staircase || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="floor" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Étage
                </label>
                <input
                    type="text"
                    id="floor"
                    name="floor"
                    value={formData.floor || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Numéro
                </label>
                <input
                    type="text"
                    id="number"
                    name="number"
                    value={formData.number || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

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

            <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Région
                </label>
                <input
                    type="text"
                    id="region"
                    name="region"
                    value={formData.region || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Pays
                </label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={formData.country}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>
        </div>
    );
}; 