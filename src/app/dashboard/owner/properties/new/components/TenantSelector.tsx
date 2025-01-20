import { Tenant } from '../types';

interface TenantSelectorProps {
    tenants: Tenant[];
    searchQuery: string;
    selectedTenant: Tenant | null;
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (tenant: Tenant) => void;
}

export const TenantSelector = ({
    tenants,
    searchQuery,
    selectedTenant,
    onSearch,
    onSelect
}: TenantSelectorProps) => {
    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="searchTenant" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rechercher un locataire
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        id="searchTenant"
                        value={searchQuery}
                        onChange={onSearch}
                        className="block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Rechercher par nom..."
                    />
                </div>
            </div>

            <div className="mt-4 space-y-2">
                {tenants.map((tenant) => (
                    <div
                        key={tenant.id}
                        onClick={() => onSelect(tenant)}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedTenant?.id === tenant.id
                            ? 'bg-blue-50 dark:bg-blue-900/50 border-2 border-blue-500'
                            : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                    {tenant.firstName} {tenant.lastName}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {tenant.email}
                                </p>
                            </div>
                            {selectedTenant?.id === tenant.id && (
                                <svg
                                    className="h-5 w-5 text-blue-500"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M5 13l4 4L19 7"></path>
                                </svg>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}; 