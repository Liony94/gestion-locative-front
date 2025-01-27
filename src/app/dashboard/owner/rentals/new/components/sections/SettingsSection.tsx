import { RentalFormData } from '@/types/rental';

interface SettingsSectionProps {
    formData: RentalFormData;
    onChange: (name: keyof RentalFormData, value: any) => void;
}

export default function SettingsSection({ formData, onChange }: SettingsSectionProps) {
    return (
        <div className="space-y-6">
            {/* Autres réglages */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Autres réglages
                    </h3>
                    <div className="space-y-4">
                        {/* Type de rapport de solde */}
                        <div>
                            <label htmlFor="balanceReportType" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Type de rapport de solde
                            </label>
                            <select
                                id="balanceReportType"
                                name="balanceReportType"
                                value={formData.balanceReportType}
                                onChange={(e) => onChange('balanceReportType', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            >
                                <option value="manual">Manuel</option>
                                <option value="automatic">Automatique</option>
                            </select>
                        </div>

                        {/* Notifications */}
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="notifyOwner"
                                    name="notifyOwner"
                                    checked={formData.notifyOwner}
                                    onChange={(e) => onChange('notifyOwner', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="notifyOwner" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                                    Notifier le propriétaire
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="notifyTenant"
                                    name="notifyTenant"
                                    checked={formData.notifyTenant}
                                    onChange={(e) => onChange('notifyTenant', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="notifyTenant" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                                    Notifier le locataire
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="notifyContractEnd"
                                    name="notifyContractEnd"
                                    checked={formData.notifyContractEnd}
                                    onChange={(e) => onChange('notifyContractEnd', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="notifyContractEnd" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                                    Notifier la fin du contrat
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => onChange('isActive', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                                    Location active
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 