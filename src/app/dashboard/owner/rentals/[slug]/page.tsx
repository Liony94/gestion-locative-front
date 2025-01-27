'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rental } from '@/types/rental';
import { api } from '@/services/api';
import { HiOutlineHome, HiOutlineCalendar, HiOutlineCurrencyEuro, HiOutlineUser, HiOutlineCheck, HiOutlineX, HiOutlineDocumentText, HiOutlineKey, HiOutlineArrowLeft } from 'react-icons/hi';

const extractIdFromSlug = (slug: string): number => {
    const id = parseInt(slug.split('-')[0]);
    return isNaN(id) ? 0 : id;
};

export default function RentalDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [rental, setRental] = useState<Rental | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRental = async () => {
            try {
                const id = extractIdFromSlug(params.slug as string);
                if (id === 0) {
                    setError('Identifiant de location invalide');
                    return;
                }

                const response = await api.get(`/rentals/${id}`);
                if (!response.data) {
                    setError('Location non trouvée');
                    return;
                }

                setRental(response.data);
            } catch (err: any) {
                console.error('Erreur lors du chargement de la location:', err);
                setError(
                    err.response?.status === 404
                        ? 'Location non trouvée'
                        : 'Une erreur est survenue lors du chargement de la location'
                );
            } finally {
                setLoading(false);
            }
        };

        if (params.slug) {
            fetchRental();
        }
    }, [params.slug]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
            </div>
        );
    }

    if (error || !rental) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex flex-col items-center space-y-4">
                        <p className="text-sm text-red-600 dark:text-red-400">
                            {error || 'Location non trouvée'}
                        </p>
                        <Link
                            href="/dashboard/owner/rentals"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
                            Retour aux locations
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
                <Link
                    href="/dashboard/owner/rentals"
                    className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
                    Retour aux locations
                </Link>
            </div>

            {/* En-tête */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {rental.name}
                    </h1>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${rental.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                        }`}>
                        {rental.isActive ? 'Active' : 'Inactive'}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Informations principales */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Propriété */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                            <HiOutlineHome className="h-5 w-5 mr-2" />
                            Propriété
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Identifiant
                                </p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {rental.property?.identifier}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Adresse
                                </p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {rental.property?.address}
                                    {rental.property?.address2 && `, ${rental.property.address2}`}
                                    <br />
                                    {rental.property?.zipCode} {rental.property?.city}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dates et durée */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                            <HiOutlineCalendar className="h-5 w-5 mr-2" />
                            Dates et durée
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Date de début
                                </p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {new Date(rental.startDate).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Date de fin
                                </p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {rental.endDate ? new Date(rental.endDate).toLocaleDateString() : 'Non définie'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* États des lieux */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                            <HiOutlineKey className="h-5 w-5 mr-2" />
                            États des lieux
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    État des lieux d'entrée
                                </h3>
                                {rental.checkInDate ? (
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Date : {new Date(rental.checkInDate).toLocaleDateString()}
                                        </p>
                                        {rental.checkInNotes && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Notes : {rental.checkInNotes}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Non effectué
                                    </p>
                                )}
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    État des lieux de sortie
                                </h3>
                                {rental.checkOutDate ? (
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Date : {new Date(rental.checkOutDate).toLocaleDateString()}
                                        </p>
                                        {rental.checkOutNotes && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Notes : {rental.checkOutNotes}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Non effectué
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Informations financières */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                            <HiOutlineCurrencyEuro className="h-5 w-5 mr-2" />
                            Informations financières
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Loyer
                                </p>
                                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                    {rental.rent}€
                                </p>
                            </div>
                            {rental.charges && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Charges
                                    </p>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                        {rental.charges}€
                                    </p>
                                </div>
                            )}
                            {rental.deposit && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Dépôt de garantie
                                    </p>
                                    <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                        {rental.deposit}€
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Locataire */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                            <HiOutlineUser className="h-5 w-5 mr-2" />
                            Locataire
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Nom complet
                                </p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {rental.tenant?.firstName} {rental.tenant?.lastName}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Email
                                </p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {rental.tenant?.email}
                                </p>
                            </div>
                            {rental.tenant?.phone && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Téléphone
                                    </p>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {rental.tenant.phone}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Caractéristiques */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                            <HiOutlineDocumentText className="h-5 w-5 mr-2" />
                            Caractéristiques
                        </h2>
                        <div className="space-y-4">
                            {rental.surface && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Surface
                                    </p>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {rental.surface} m²
                                    </p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Meublé
                                </p>
                                <div className="mt-1 flex items-center">
                                    {rental.isFurnished ? (
                                        <HiOutlineCheck className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <HiOutlineX className="h-5 w-5 text-red-500" />
                                    )}
                                    <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                        {rental.isFurnished ? 'Oui' : 'Non'}
                                    </span>
                                </div>
                            </div>
                            {rental.isFurnished && rental.furniture && rental.furniture.length > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Liste des meubles
                                    </p>
                                    <ul className="mt-1 list-disc list-inside text-sm text-gray-900 dark:text-white">
                                        {rental.furniture.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}