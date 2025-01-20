'use client';

interface Property {
    id: number;
    title: string;
    address: string;
    city: string;
    type: string;
}

interface Tenant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    properties: Property[];
}

interface TenantsCardProps {
    tenant: Tenant;
}

export default function TenantsCard({ tenant }: TenantsCardProps) {
    const defaultImage = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex items-start space-x-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src={defaultImage}
                            alt={`${tenant.firstName} ${tenant.lastName}`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {tenant.firstName} {tenant.lastName}
                        </h3>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {tenant.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {tenant.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                {tenant.address}
                            </div>
                        </div>
                    </div>
                </div>

                {tenant.properties.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Biens loués ({tenant.properties.length})
                        </h4>
                        <div className="space-y-2">
                            {tenant.properties.map((property) => (
                                <div
                                    key={property.id}
                                    className="bg-gray-50 dark:bg-gray-700/50 rounded-md p-3"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                                                {property.title}
                                            </h5>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {property.address}, {property.city}
                                            </p>
                                        </div>
                                        <span className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 rounded-full">
                                            {property.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-6 flex justify-end space-x-3">
                    <button className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                        Détails
                    </button>
                    <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    );
}