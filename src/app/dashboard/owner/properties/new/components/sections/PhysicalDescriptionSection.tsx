import { PropertyFormData, BuildingType, BuildingLegalStatus } from '../../types';

interface PhysicalDescriptionSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const PhysicalDescriptionSection = ({ formData, onChange }: PhysicalDescriptionSectionProps) => {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                    step="0.01"
                    value={formData.surface}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="numberOfRooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nombre de pièces
                </label>
                <input
                    type="number"
                    id="numberOfRooms"
                    name="numberOfRooms"
                    min="0"
                    value={formData.numberOfRooms || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="numberOfBedrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nombre de chambres
                </label>
                <input
                    type="number"
                    id="numberOfBedrooms"
                    name="numberOfBedrooms"
                    min="0"
                    value={formData.numberOfBedrooms || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="numberOfBathrooms" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Nombre de salles de bain
                </label>
                <input
                    type="number"
                    id="numberOfBathrooms"
                    name="numberOfBathrooms"
                    min="0"
                    value={formData.numberOfBathrooms || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="constructionDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date de construction
                </label>
                <input
                    type="date"
                    id="constructionDate"
                    name="constructionDate"
                    value={formData.constructionDate ? new Date(formData.constructionDate).toISOString().split('T')[0] : ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="buildingType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type de bâtiment
                </label>
                <select
                    id="buildingType"
                    name="buildingType"
                    value={formData.buildingType || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Sélectionner un type</option>
                    {Object.entries(BuildingType).map(([key, value]) => (
                        <option key={key} value={value}>{key}</option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="buildingLegalStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Statut juridique
                </label>
                <select
                    id="buildingLegalStatus"
                    name="buildingLegalStatus"
                    value={formData.buildingLegalStatus || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                    <option value="">Sélectionner un statut</option>
                    {Object.entries(BuildingLegalStatus).map(([key, value]) => (
                        <option key={key} value={value}>{key}</option>
                    ))}
                </select>
            </div>

            <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Description détaillée du bien..."
                />
            </div>

            <div className="md:col-span-2">
                <label htmlFor="privateNote" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Note privée
                </label>
                <textarea
                    id="privateNote"
                    name="privateNote"
                    rows={4}
                    value={formData.privateNote || ''}
                    onChange={onChange}
                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Notes privées (visibles uniquement par vous)..."
                />
            </div>

            <div className="md:col-span-2 space-y-4">
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="isFurnished"
                        name="isFurnished"
                        checked={formData.isFurnished}
                        onChange={(e) => onChange({
                            ...e,
                            target: {
                                ...e.target,
                                name: 'isFurnished',
                                value: e.target.checked
                            }
                        } as any)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isFurnished" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Meublé
                    </label>
                </div>

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="smokersAllowed"
                        name="smokersAllowed"
                        checked={formData.smokersAllowed}
                        onChange={(e) => onChange({
                            ...e,
                            target: {
                                ...e.target,
                                name: 'smokersAllowed',
                                value: e.target.checked
                            }
                        } as any)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="smokersAllowed" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Fumeurs autorisés
                    </label>
                </div>

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="petsAllowed"
                        name="petsAllowed"
                        checked={formData.petsAllowed}
                        onChange={(e) => onChange({
                            ...e,
                            target: {
                                ...e.target,
                                name: 'petsAllowed',
                                value: e.target.checked
                            }
                        } as any)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="petsAllowed" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Animaux autorisés
                    </label>
                </div>
            </div>
        </div>
    );
}; 