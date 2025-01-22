import { PropertyFormData } from '../../types';

interface CadastralSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const CadastralSection = ({ formData, onChange }: CadastralSectionProps) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
                <label htmlFor="lotNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Numéro de lot
                </label>
                <input
                    type="text"
                    id="lotNumber"
                    name="lotNumber"
                    value={formData.lotNumber || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="coownershipUnits" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tantièmes de copropriété
                </label>
                <input
                    type="text"
                    id="coownershipUnits"
                    name="coownershipUnits"
                    value={formData.coownershipUnits || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="cadastralReference" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Référence cadastrale
                </label>
                <input
                    type="text"
                    id="cadastralReference"
                    name="cadastralReference"
                    value={formData.cadastralReference || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div className="md:col-span-2">
                <div className="bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-md p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                Information
                            </h3>
                            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                                <p>
                                    Les informations cadastrales sont importantes pour la gestion administrative et fiscale de votre bien.
                                    Vous pouvez les trouver sur votre acte de propriété ou sur le site du cadastre.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 