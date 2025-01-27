'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Rental } from '@/types/rental';
import { api } from '@/services/api';
import { HiOutlinePlus, HiOutlineHome, HiOutlineCalendar, HiOutlineCurrencyEuro, HiOutlineUser } from 'react-icons/hi';

const createSlug = (id: number, name: string) => {
    const normalizedName = name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    return `${id}-${normalizedName}`;
};

export default function RentalsPage() {
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await api.get('/rentals');
                setRentals(response.data);
            } catch (err) {
                console.error('Erreur lors du chargement des locations:', err);
                setError('Impossible de charger les locations');
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Mes locations
                    </h1>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Gérez vos contrats de location
                    </p>
                </div>
                <Link
                    href="/dashboard/owner/rentals/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <HiOutlinePlus className="mr-2 h-5 w-5" />
                    Nouvelle location
                </Link>
            </div>

            {rentals.length === 0 ? (
                <div className="text-center py-12">
                    <HiOutlineHome className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        Aucune location
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Commencez par créer votre première location.
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/dashboard/owner/rentals/new"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <HiOutlinePlus className="mr-2 h-5 w-5" />
                            Nouvelle location
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {rentals.map((rental) => (
                            <li key={rental.id}>
                                <Link
                                    href={`/dashboard/owner/rentals/${createSlug(rental.id, rental.name)}`}
                                    className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                    <div className="px-4 py-4 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <HiOutlineHome className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <div className="ml-4">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {rental.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {rental.property?.identifier} - {rental.property?.address}, {rental.property?.city}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-6">
                                                <div className="flex items-center">
                                                    <HiOutlineUser className="h-5 w-5 text-gray-400 mr-2" />
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {rental.tenant?.firstName} {rental.tenant?.lastName}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <HiOutlineCurrencyEuro className="h-5 w-5 text-gray-400 mr-2" />
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {rental.rent}€{rental.charges ? ` + ${rental.charges}€` : ''}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <HiOutlineCalendar className="h-5 w-5 text-gray-400 mr-2" />
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        {new Date(rental.startDate).toLocaleDateString()}
                                                        {rental.endDate && ` → ${new Date(rental.endDate).toLocaleDateString()}`}
                                                    </span>
                                                </div>
                                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${rental.isActive
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                                                    }`}>
                                                    {rental.isActive ? 'Active' : 'Inactive'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}