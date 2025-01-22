import { PropertyFormData, PropertyTaxRegime } from '../../types';

interface FinancialSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const FinancialSection = ({ formData, onChange }: FinancialSectionProps) => {
    return (
        <div className="space-y-8">
            {/* Informations financières */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                    Informations financières
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="acquisitionDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Date d'acquisition
                        </label>
                        <input
                            type="date"
                            id="acquisitionDate"
                            name="acquisitionDate"
                            value={formData.acquisitionDate ? new Date(formData.acquisitionDate).toISOString().split('T')[0] : ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="acquisitionPrice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Prix d'acquisition (€)
                        </label>
                        <input
                            type="number"
                            id="acquisitionPrice"
                            name="acquisitionPrice"
                            min="0"
                            step="0.01"
                            value={formData.acquisitionPrice || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="acquisitionFees" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Frais d'acquisition (€)
                        </label>
                        <input
                            type="number"
                            id="acquisitionFees"
                            name="acquisitionFees"
                            min="0"
                            step="0.01"
                            value={formData.acquisitionFees || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="agencyFees" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Frais d'agence (€)
                        </label>
                        <input
                            type="number"
                            id="agencyFees"
                            name="agencyFees"
                            min="0"
                            step="0.01"
                            value={formData.agencyFees || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="currentValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Valeur actuelle estimée (€)
                        </label>
                        <input
                            type="number"
                            id="currentValue"
                            name="currentValue"
                            min="0"
                            step="0.01"
                            value={formData.currentValue || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Informations fiscales */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                    Informations fiscales
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="taxRegime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Régime fiscal
                        </label>
                        <select
                            id="taxRegime"
                            name="taxRegime"
                            value={formData.taxRegime || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="">Sélectionner un régime</option>
                            {Object.entries(PropertyTaxRegime).map(([key, value]) => (
                                <option key={key} value={value}>{key.replace(/_/g, ' ')}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="siret" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            SIRET
                        </label>
                        <input
                            type="text"
                            id="siret"
                            name="siret"
                            value={formData.siret || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="activityStartDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Date de début d'activité
                        </label>
                        <input
                            type="date"
                            id="activityStartDate"
                            name="activityStartDate"
                            value={formData.activityStartDate ? new Date(formData.activityStartDate).toISOString().split('T')[0] : ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="taxNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Numéro fiscal
                        </label>
                        <input
                            type="text"
                            id="taxNumber"
                            name="taxNumber"
                            value={formData.taxNumber || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="housingTax" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Taxe d'habitation (€)
                        </label>
                        <input
                            type="number"
                            id="housingTax"
                            name="housingTax"
                            min="0"
                            step="0.01"
                            value={formData.housingTax || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="propertyTax" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Taxe foncière (€)
                        </label>
                        <input
                            type="number"
                            id="propertyTax"
                            name="propertyTax"
                            min="0"
                            step="0.01"
                            value={formData.propertyTax || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Centre des impôts */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                    Centre des impôts
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="taxCenterName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nom du centre
                        </label>
                        <input
                            type="text"
                            id="taxCenterName"
                            name="taxCenterName"
                            value={formData.taxCenterName || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="taxCenterAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Adresse
                        </label>
                        <input
                            type="text"
                            id="taxCenterAddress"
                            name="taxCenterAddress"
                            value={formData.taxCenterAddress || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="taxCenterAddress2" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Complément d'adresse
                        </label>
                        <input
                            type="text"
                            id="taxCenterAddress2"
                            name="taxCenterAddress2"
                            value={formData.taxCenterAddress2 || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="taxCenterZipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Code postal
                        </label>
                        <input
                            type="text"
                            id="taxCenterZipCode"
                            name="taxCenterZipCode"
                            value={formData.taxCenterZipCode || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            pattern="[0-9]{5}"
                        />
                    </div>

                    <div>
                        <label htmlFor="taxCenterCity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Ville
                        </label>
                        <input
                            type="text"
                            id="taxCenterCity"
                            name="taxCenterCity"
                            value={formData.taxCenterCity || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="taxNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Notes fiscales
                        </label>
                        <textarea
                            id="taxNotes"
                            name="taxNotes"
                            rows={4}
                            value={formData.taxNotes || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Notes concernant la fiscalité du bien..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}; 