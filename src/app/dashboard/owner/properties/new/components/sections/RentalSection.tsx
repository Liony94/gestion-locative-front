import { PropertyFormData } from '../../types';

interface RentalSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const RentalSection = ({ formData, onChange }: RentalSectionProps) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
                <label htmlFor="rentExcludingCharges" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Loyer hors charges (€)
                </label>
                <input
                    type="number"
                    id="rentExcludingCharges"
                    name="rentExcludingCharges"
                    required
                    min="0"
                    step="0.01"
                    value={formData.rentExcludingCharges}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="charges" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Charges (€)
                </label>
                <input
                    type="number"
                    id="charges"
                    name="charges"
                    min="0"
                    step="0.01"
                    value={formData.charges || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="paymentFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Fréquence de paiement
                </label>
                <select
                    id="paymentFrequency"
                    name="paymentFrequency"
                    value={formData.paymentFrequency || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Sélectionner une fréquence</option>
                    <option value="MONTHLY">Mensuel</option>
                    <option value="QUARTERLY">Trimestriel</option>
                    <option value="SEMI_ANNUAL">Semestriel</option>
                    <option value="ANNUAL">Annuel</option>
                </select>
            </div>

            <div>
                <label htmlFor="isAvailableForRent" className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="isAvailableForRent"
                        name="isAvailableForRent"
                        checked={formData.isAvailableForRent}
                        onChange={(e) => onChange({
                            ...e,
                            target: {
                                ...e.target,
                                name: 'isAvailableForRent',
                                value: e.target.checked
                            }
                        } as any)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Disponible à la location
                    </span>
                </label>
            </div>

            <div className="md:col-span-2">
                <div className="bg-yellow-50 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800 rounded-md p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                                Information importante
                            </h3>
                            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                <p>
                                    Le montant du loyer et des charges sera utilisé pour générer automatiquement les échéanciers de paiement.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 