'use client';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { HiOutlineX, HiOutlineCalendar, HiOutlineCurrencyEuro, HiOutlineUser, HiOutlineChevronRight } from 'react-icons/hi';
import { api } from '@/services/api';
import Link from 'next/link';

interface Rental {
    id: number;
    name: string;
    startDate: string;
    endDate?: string;
    rent: number;
    charges?: number;
    isActive: boolean;
    tenant?: {
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
    };
}

interface ActiveRentalsModalProps {
    isOpen: boolean;
    onClose: () => void;
    propertyId: number;
    propertyName: string;
}

const createSlug = (id: number, name: string): string => {
    if (!name) return id.toString();
    return `${id}-${name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')}`;
};

export default function ActiveRentalsModal({ isOpen, onClose, propertyId, propertyName }: ActiveRentalsModalProps) {
    const [rentals, setRentals] = useState<Rental[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRentals = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/rentals/property/${propertyId}`);
                setRentals(response.data.filter((rental: Rental) => rental.isActive));
                setError(null);
            } catch (err) {
                console.error('Erreur lors du chargement des locations:', err);
                setError('Impossible de charger les locations');
            } finally {
                setLoading(false);
            }
        };

        if (isOpen && propertyId) {
            fetchRentals();
        }
    }, [propertyId, isOpen]);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full sm:max-w-2xl sm:p-6 mx-4">
                                <div className="absolute right-0 top-0 pr-4 pt-4 block">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                                        onClick={onClose}
                                    >
                                        <span className="sr-only">Fermer</span>
                                        <HiOutlineX className="h-6 w-6" />
                                    </button>
                                </div>
                                <div>
                                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 dark:text-white mb-4">
                                        Locations actives - {propertyName}
                                    </Dialog.Title>
                                    {loading ? (
                                        <div className="space-y-4">
                                            {[...Array(2)].map((_, index) => (
                                                <div key={index} className="animate-pulse bg-gray-200 dark:bg-gray-700 h-24 rounded-lg" />
                                            ))}
                                        </div>
                                    ) : error ? (
                                        <div className="text-center py-4">
                                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                                        </div>
                                    ) : rentals.length === 0 ? (
                                        <div className="text-center py-4">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Aucune location active</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {rentals.map((rental) => {
                                                const slug = createSlug(rental.id, rental.name);
                                                return (
                                                    <Link
                                                        key={rental.id}
                                                        href={`/dashboard/owner/rentals/${slug}`}
                                                        className="block bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
                                                    >
                                                        <div className="flex justify-between items-start mb-3">
                                                            <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                                                {rental.name}
                                                            </h4>
                                                            <HiOutlineChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                                        </div>
                                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                                <HiOutlineCalendar className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" />
                                                                <span className="truncate">
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
                                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                                <HiOutlineCurrencyEuro className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" />
                                                                <span>
                                                                    {rental.rent}€
                                                                    {rental.charges && ` + ${rental.charges}€`}
                                                                </span>
                                                            </div>
                                                            {rental.tenant && (
                                                                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                                                    <HiOutlineUser className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" />
                                                                    <span className="truncate">
                                                                        {rental.tenant.firstName} {rental.tenant.lastName}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
} 