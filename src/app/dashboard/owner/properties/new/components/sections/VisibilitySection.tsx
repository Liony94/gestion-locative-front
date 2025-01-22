import { PropertyFormData, VisibilityStatus } from '../../types';

interface VisibilitySectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    previewUrls?: string[];
    onRemoveImage?: (index: number) => void;
}

export const VisibilitySection = ({
    formData,
    onChange,
    onImageChange,
    previewUrls = [],
    onRemoveImage
}: VisibilitySectionProps) => {
    return (
        <div className="space-y-8">
            {/* Paramètres de visibilité */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                    Paramètres de visibilité
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="propertyVisibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Visibilité du bien
                        </label>
                        <select
                            id="propertyVisibility"
                            name="propertyVisibility"
                            value={formData.propertyVisibility}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            {Object.entries(VisibilityStatus).map(([key, value]) => (
                                <option key={key} value={value}>{key}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="addressVisibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Visibilité de l'adresse
                        </label>
                        <select
                            id="addressVisibility"
                            name="addressVisibility"
                            value={formData.addressVisibility}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            {Object.entries(VisibilityStatus).map(([key, value]) => (
                                <option key={key} value={value}>{key}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="phoneVisibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Visibilité du téléphone
                        </label>
                        <select
                            id="phoneVisibility"
                            name="phoneVisibility"
                            value={formData.phoneVisibility}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            {Object.entries(VisibilityStatus).map(([key, value]) => (
                                <option key={key} value={value}>{key}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Description publique */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                    Flyer numérique
                </h3>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="publicDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description publique
                        </label>
                        <textarea
                            id="publicDescription"
                            name="publicDescription"
                            rows={4}
                            value={formData.publicDescription || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Description visible sur le flyer numérique..."
                        />
                    </div>

                    <div>
                        <label htmlFor="internalRules" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Règlement intérieur
                        </label>
                        <textarea
                            id="internalRules"
                            name="internalRules"
                            rows={4}
                            value={formData.internalRules || ''}
                            onChange={onChange}
                            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Règlement intérieur du bien..."
                        />
                    </div>
                </div>
            </div>

            {/* Images */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
                    Images
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                <label
                                    htmlFor="images"
                                    className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                >
                                    <span>Télécharger des images</span>
                                    <input
                                        id="images"
                                        name="images"
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="sr-only"
                                        onChange={onImageChange}
                                    />
                                </label>
                                <p className="pl-1">ou glisser-déposer</p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG, GIF jusqu'à 10MB
                            </p>
                        </div>
                    </div>

                    {/* Prévisualisation des images */}
                    {previewUrls.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {previewUrls.map((url, index) => (
                                <div key={index} className="relative aspect-square group">
                                    <img
                                        src={url}
                                        alt={`Aperçu ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    {onRemoveImage && (
                                        <button
                                            type="button"
                                            onClick={() => onRemoveImage(index)}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}; 