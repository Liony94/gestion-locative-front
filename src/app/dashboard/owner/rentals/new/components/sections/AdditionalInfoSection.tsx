import { RentalFormData } from '@/types/rental';

interface AdditionalInfoSectionProps {
    formData: RentalFormData;
    onChange: (name: keyof RentalFormData, value: any) => void;
}

export default function AdditionalInfoSection({ formData, onChange }: AdditionalInfoSectionProps) {
    return (
        <div className="space-y-6">
            {/* Travaux propriétaire */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Travaux réalisés par le propriétaire
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="ownerWorkAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Montant des travaux (€)
                            </label>
                            <input
                                type="number"
                                id="ownerWorkAmount"
                                name="ownerWorkAmount"
                                value={formData.ownerWorkAmount}
                                onChange={(e) => onChange('ownerWorkAmount', parseFloat(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="ownerWorkDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Description des travaux
                            </label>
                            <textarea
                                id="ownerWorkDescription"
                                name="ownerWorkDescription"
                                value={formData.ownerWorkDescription || ''}
                                onChange={(e) => onChange('ownerWorkDescription', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Travaux locataire */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Travaux à réaliser par le locataire
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="tenantWorkAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Montant des travaux (€)
                            </label>
                            <input
                                type="number"
                                id="tenantWorkAmount"
                                name="tenantWorkAmount"
                                value={formData.tenantWorkAmount}
                                onChange={(e) => onChange('tenantWorkAmount', parseFloat(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="tenantWorkDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Description des travaux
                            </label>
                            <textarea
                                id="tenantWorkDescription"
                                name="tenantWorkDescription"
                                value={formData.tenantWorkDescription || ''}
                                onChange={(e) => onChange('tenantWorkDescription', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Conditions spéciales */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Conditions spéciales
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="specialConditions" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Conditions particulières
                            </label>
                            <textarea
                                id="specialConditions"
                                name="specialConditions"
                                value={formData.specialConditions || ''}
                                onChange={(e) => onChange('specialConditions', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="specialClauses" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Clauses spéciales
                            </label>
                            <textarea
                                id="specialClauses"
                                name="specialClauses"
                                value={formData.specialClauses || ''}
                                onChange={(e) => onChange('specialClauses', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Commentaires
                            </label>
                            <textarea
                                id="comments"
                                name="comments"
                                value={formData.comments || ''}
                                onChange={(e) => onChange('comments', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* État des lieux */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        État des lieux
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Entrée */}
                        <div>
                            <label htmlFor="checkInDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Date d'entrée
                            </label>
                            <input
                                type="datetime-local"
                                id="checkInDate"
                                name="checkInDate"
                                value={formData.checkInDate || ''}
                                onChange={(e) => onChange('checkInDate', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="checkInNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Notes d'entrée
                            </label>
                            <textarea
                                id="checkInNotes"
                                name="checkInNotes"
                                value={formData.checkInNotes || ''}
                                onChange={(e) => onChange('checkInNotes', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Sortie */}
                        <div>
                            <label htmlFor="checkOutDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Date de sortie
                            </label>
                            <input
                                type="datetime-local"
                                id="checkOutDate"
                                name="checkOutDate"
                                value={formData.checkOutDate || ''}
                                onChange={(e) => onChange('checkOutDate', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="checkOutNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Notes de sortie
                            </label>
                            <textarea
                                id="checkOutNotes"
                                name="checkOutNotes"
                                value={formData.checkOutNotes || ''}
                                onChange={(e) => onChange('checkOutNotes', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quittances */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Quittances
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="billingDay" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Jour de facturation
                            </label>
                            <input
                                type="number"
                                id="billingDay"
                                name="billingDay"
                                value={formData.billingDay}
                                onChange={(e) => onChange('billingDay', parseInt(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                min="1"
                                max="31"
                            />
                        </div>

                        <div>
                            <label htmlFor="documentTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Titre du document
                            </label>
                            <input
                                type="text"
                                id="documentTitle"
                                name="documentTitle"
                                value={formData.documentTitle}
                                onChange={(e) => onChange('documentTitle', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="separateBillingAddress"
                                    name="separateBillingAddress"
                                    checked={formData.separateBillingAddress}
                                    onChange={(e) => onChange('separateBillingAddress', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="separateBillingAddress" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                                    Adresse de facturation différente
                                </label>
                            </div>
                        </div>

                        {formData.separateBillingAddress && (
                            <div className="sm:col-span-2">
                                <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Adresse de facturation
                                </label>
                                <textarea
                                    id="billingAddress"
                                    name="billingAddress"
                                    value={formData.billingAddress || ''}
                                    onChange={(e) => onChange('billingAddress', e.target.value)}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                        )}

                        <div className="sm:col-span-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="automaticNumbering"
                                    name="automaticNumbering"
                                    checked={formData.automaticNumbering}
                                    onChange={(e) => onChange('automaticNumbering', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="automaticNumbering" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                                    Numérotation automatique
                                </label>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="includeNoticeSecondPage"
                                    name="includeNoticeSecondPage"
                                    checked={formData.includeNoticeSecondPage}
                                    onChange={(e) => onChange('includeNoticeSecondPage', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="includeNoticeSecondPage" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                                    Inclure l'avis en deuxième page
                                </label>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="receiptText" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Texte de la quittance
                            </label>
                            <textarea
                                id="receiptText"
                                name="receiptText"
                                value={formData.receiptText || ''}
                                onChange={(e) => onChange('receiptText', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="noticeText" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Texte de l'avis
                            </label>
                            <textarea
                                id="noticeText"
                                name="noticeText"
                                value={formData.noticeText || ''}
                                onChange={(e) => onChange('noticeText', e.target.value)}
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 