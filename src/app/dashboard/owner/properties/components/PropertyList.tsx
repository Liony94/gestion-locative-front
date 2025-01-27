import Link from 'next/link';
import { Property } from '@/types/property';
import { HiOutlineHome, HiOutlineLocationMarker, HiOutlineCurrencyEuro, HiOutlineScale, HiOutlineKey } from 'react-icons/hi';

interface PropertyListProps {
    properties: Property[];
}

const createSlug = (title: string): string => {
    if (!title) return '';

    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export default function PropertyList({ properties }: PropertyListProps) {
    return (
        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Propriété
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Adresse
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Surface
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Loyer
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Locations
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {properties.map((property) => {
                        const slug = `${property.id}-${createSlug(property.identifier)}`;
                        const activeLeases = property.tenants?.length || 0;

                        return (
                            <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                            <HiOutlineHome className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {property.identifier}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {property.type}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <HiOutlineLocationMarker className="h-5 w-5 mr-2 text-gray-400" />
                                        <span>
                                            {property.address}, {property.zipCode} {property.city}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <HiOutlineScale className="h-5 w-5 mr-2 text-gray-400" />
                                        <span>{property.surface} m²</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                        <HiOutlineCurrencyEuro className="h-5 w-5 mr-2 text-gray-400" />
                                        <span>
                                            {property.rentExcludingCharges} €
                                            {property.charges && ` + ${property.charges}€`}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {activeLeases > 0 ? (
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <HiOutlineKey className="h-5 w-5 mr-2 text-gray-400" />
                                            <span>{activeLeases} location{activeLeases > 1 ? 's' : ''} active{activeLeases > 1 ? 's' : ''}</span>
                                        </div>
                                    ) : (
                                        <Link
                                            href={`/dashboard/owner/properties/${slug}/leases/new`}
                                            className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        >
                                            <HiOutlineKey className="h-5 w-5 mr-2" />
                                            Créer une location
                                        </Link>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-3">
                                        <Link
                                            href={`/dashboard/owner/properties/${slug}`}
                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                        >
                                            Détails
                                        </Link>
                                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                            Modifier
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
} 