import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Property } from '@/types/property';
import { api } from '@/services/api';
import { HiOutlineHome, HiOutlineLocationMarker, HiOutlineCurrencyEuro, HiOutlineScale, HiOutlineKey } from 'react-icons/hi';
import ActiveRentalsModal from './ActiveRentalsModal';

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

interface PropertyRentals {
    [key: number]: number;
}

export default function PropertyList({ properties }: PropertyListProps) {
    const [activeRentals, setActiveRentals] = useState<PropertyRentals>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const rentalCounts: PropertyRentals = {};
                await Promise.all(
                    properties.map(async (property) => {
                        const response = await api.get(`/rentals/property/${property.id}`);
                        rentalCounts[property.id] = response.data.filter((rental: any) => rental.isActive).length;
                    })
                );
                setActiveRentals(rentalCounts);
            } catch (error) {
                console.error('Erreur lors du chargement des locations:', error);
            } finally {
                setLoading(false);
            }
        };

        if (properties.length > 0) {
            fetchRentals();
        }
    }, [properties]);

    const handleOpenModal = (property: Property) => {
        setSelectedProperty(property);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProperty(null);
    };

    return (
        <>
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
                            const activeLeaseCount = activeRentals[property.id] || 0;

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
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                            <HiOutlineKey className="h-5 w-5 mr-2 text-gray-400" />
                                            {loading ? (
                                                <span className="animate-pulse">Chargement...</span>
                                            ) : activeLeaseCount > 0 ? (
                                                <button
                                                    onClick={() => handleOpenModal(property)}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                                >
                                                    {activeLeaseCount} location{activeLeaseCount > 1 ? 's' : ''} active{activeLeaseCount > 1 ? 's' : ''}
                                                </button>
                                            ) : (
                                                <Link
                                                    href={`/dashboard/owner/rentals/new?propertyId=${property.id}`}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                                >
                                                    Créer une location
                                                </Link>
                                            )}
                                        </div>
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

            {selectedProperty && (
                <ActiveRentalsModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    propertyId={selectedProperty.id}
                    propertyName={selectedProperty.identifier}
                />
            )}
        </>
    );
} 