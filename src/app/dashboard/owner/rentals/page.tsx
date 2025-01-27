'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Rental } from '@/types/rental';
import { api } from '@/services/api';
import {
    HiOutlinePlus,
    HiOutlineHome,
    HiOutlineCalendar,
    HiOutlineCurrencyEuro,
    HiOutlineUser,
    HiOutlineSearch,
    HiOutlineFilter,
    HiOutlineSortAscending,
    HiOutlineSortDescending
} from 'react-icons/hi';

const createSlug = (id: number, name: string | undefined) => {
    const normalizedName = (name || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    return `${id}-${normalizedName}`;
};

type SortField = 'date' | 'rent' | 'name';
type SortOrder = 'asc' | 'desc';

export default function RentalsPage() {
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [filteredRentals, setFilteredRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filtres
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [sortField, setSortField] = useState<SortField>('date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                const response = await api.get('/rentals');
                setRentals(response.data);
                setFilteredRentals(response.data);
            } catch (err) {
                console.error('Erreur lors du chargement des locations:', err);
                setError('Impossible de charger les locations');
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, []);

    useEffect(() => {
        let result = [...rentals];

        // Filtre par statut
        if (statusFilter !== 'all') {
            result = result.filter(rental =>
                statusFilter === 'active' ? rental.isActive : !rental.isActive
            );
        }

        // Filtre par recherche
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(rental =>
                (rental.name || '').toLowerCase().includes(query) ||
                `${rental.tenant?.firstName || ''} ${rental.tenant?.lastName || ''}`.toLowerCase().includes(query) ||
                (rental.property?.identifier || '').toLowerCase().includes(query)
            );
        }

        // Tri
        result.sort((a, b) => {
            let comparison = 0;
            switch (sortField) {
                case 'date':
                    comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
                    break;
                case 'rent':
                    comparison = (a.rent || 0) - (b.rent || 0);
                    break;
                case 'name':
                    comparison = (a.name || '').localeCompare(b.name || '');
                    break;
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        setFilteredRentals(result);
    }, [rentals, searchQuery, statusFilter, sortField, sortOrder]);

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
                <>
                    <div className="mb-6 space-y-4">
                        {/* Barre de recherche */}
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <HiOutlineSearch className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Rechercher une location, un locataire..."
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="all">Tous les statuts</option>
                                    <option value="active">Actives</option>
                                    <option value="inactive">Inactives</option>
                                </select>
                                <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 p-1">
                                    <button
                                        onClick={() => setSortField('date')}
                                        className={`p-1 rounded ${sortField === 'date' ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                                        title="Trier par date"
                                    >
                                        <HiOutlineCalendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    </button>
                                    <button
                                        onClick={() => setSortField('rent')}
                                        className={`p-1 rounded ${sortField === 'rent' ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                                        title="Trier par loyer"
                                    >
                                        <HiOutlineCurrencyEuro className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    </button>
                                    <button
                                        onClick={() => setSortField('name')}
                                        className={`p-1 rounded ${sortField === 'name' ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
                                        title="Trier par nom"
                                    >
                                        <HiOutlineFilter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    </button>
                                    <button
                                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                                        title="Inverser l'ordre"
                                    >
                                        {sortOrder === 'asc' ? (
                                            <HiOutlineSortAscending className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                        ) : (
                                            <HiOutlineSortDescending className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredRentals.map((rental) => (
                                <li key={rental.id}>
                                    <Link
                                        href={`/dashboard/owner/rentals/${createSlug(rental.id, rental.name)}`}
                                        className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                    >
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                                                    <div className="flex-shrink-0">
                                                        <HiOutlineHome className="h-6 w-6 text-gray-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {rental.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            {rental.property?.identifier} - {rental.property?.address}, {rental.property?.city}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 ml-10 sm:ml-0">
                                                    <div className="flex items-center">
                                                        <HiOutlineUser className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                            {rental.tenant?.firstName} {rental.tenant?.lastName}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <HiOutlineCurrencyEuro className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {rental.rent}€{rental.charges ? ` + ${rental.charges}€` : ''}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <HiOutlineCalendar className="h-5 w-5 text-gray-400 mr-2 flex-shrink-0" />
                                                        <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                            {new Date(rental.startDate).toLocaleDateString()}
                                                            {rental.endDate && (
                                                                <>
                                                                    <br className="sm:hidden" />
                                                                    <span className="hidden sm:inline"> → </span>
                                                                    {new Date(rental.endDate).toLocaleDateString()}
                                                                </>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-4 sm:mt-0 ${rental.isActive
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                                                    }`}>
                                                    {rental.isActive ? 'Active' : 'Inactive'}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}