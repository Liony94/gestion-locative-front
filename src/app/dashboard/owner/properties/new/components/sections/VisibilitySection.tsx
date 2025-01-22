import React, { ReactElement } from 'react';
import { PropertyFormData, VisibilityStatus } from '../../types';
import { HiOutlineEye, HiOutlineEyeOff, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineHome } from 'react-icons/hi';
import { BsHouseDoor, BsShieldCheck, BsLock, BsUnlock } from 'react-icons/bs';
import { IoMdInformationCircleOutline } from 'react-icons/io';

interface VisibilitySectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    previewUrls?: string[];
    onRemoveImage?: (index: number) => void;
}

const visibilityLabels: Record<VisibilityStatus, string> = {
    [VisibilityStatus.PUBLIC]: 'Public',
    [VisibilityStatus.PRIVATE]: 'Privé'
};

const renderVisibilityCard = (
    title: string,
    description: string,
    value: VisibilityStatus,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    icon: ReactElement
): ReactElement => {
    const getStatusMessage = (status: VisibilityStatus) => {
        switch (status) {
            case VisibilityStatus.PUBLIC:
                return {
                    message: "Cette information est visible par tous les utilisateurs",
                    bgColor: "bg-green-50 dark:bg-green-900/20",
                    textColor: "text-green-700 dark:text-green-300",
                    borderColor: "border-green-200 dark:border-green-800"
                };
            case VisibilityStatus.PRIVATE:
                return {
                    message: "Cette information est visible uniquement par vous",
                    bgColor: "bg-red-50 dark:bg-red-900/20",
                    textColor: "text-red-700 dark:text-red-300",
                    borderColor: "border-red-200 dark:border-red-800"
                };
            default:
                return {
                    message: "Cette information est visible par certains utilisateurs",
                    bgColor: "bg-blue-50 dark:bg-blue-900/20",
                    textColor: "text-blue-700 dark:text-blue-300",
                    borderColor: "border-blue-200 dark:border-blue-800"
                };
        }
    };

    const status = getStatusMessage(value);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                    <div className={`p-2 ${status.bgColor} rounded-lg`}>
                        {icon}
                    </div>
                </div>
                <div className="flex-grow">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
                    <div className="flex items-center space-x-4 mb-4">
                        {Object.values(VisibilityStatus).map((status) => (
                            <label key={status} className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name={name}
                                    value={status}
                                    checked={value === status}
                                    onChange={onChange}
                                    className="form-radio h-4 w-4 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    {visibilityLabels[status]}
                                </span>
                            </label>
                        ))}
                    </div>
                    <div className={`mt-2 p-3 rounded-lg ${status.bgColor} ${status.borderColor} border`}>
                        <p className={`text-sm ${status.textColor}`}>
                            {status.message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const VisibilitySection = ({
    formData,
    onChange,
    onImageChange,
    previewUrls = [],
    onRemoveImage
}: VisibilitySectionProps) => {
    const selectClasses = "mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 pl-10";
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
    const iconClasses = "absolute left-3 top-[38px] text-gray-400 dark:text-gray-500";

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Paramètres de visibilité
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Configurez la visibilité de votre bien et de ses informations
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Paramètres de visibilité */}
                    <div className="grid gap-6">
                        {renderVisibilityCard(
                            'Visibilité du bien',
                            'Contrôlez qui peut voir les informations générales de votre bien',
                            formData.propertyVisibility,
                            'propertyVisibility',
                            onChange,
                            <HiOutlineHome className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                        )}

                        {renderVisibilityCard(
                            'Visibilité de l\'adresse',
                            'Définissez qui peut voir l\'adresse complète du bien',
                            formData.addressVisibility,
                            'addressVisibility',
                            onChange,
                            <HiOutlineLocationMarker className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                        )}

                        {renderVisibilityCard(
                            'Visibilité du téléphone',
                            'Choisissez qui peut voir votre numéro de téléphone',
                            formData.phoneVisibility,
                            'phoneVisibility',
                            onChange,
                            <HiOutlinePhone className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                        )}
                    </div>

                    {/* Note d'information */}
                    <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <IoMdInformationCircleOutline className="h-5 w-5 text-blue-400" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                                    À propos de la visibilité
                                </h3>
                                <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                                    <p>
                                        La visibilité "Restreinte" permet de contrôler précisément qui peut voir vos informations.
                                        Les informations privées ne seront visibles que par vous.
                                    </p>
                                </div>
                            </div>
                        </div>
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