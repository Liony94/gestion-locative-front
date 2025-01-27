'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Rental } from '@/types/rental';
import { api } from '@/services/api';
import { HiOutlineHome, HiOutlineCalendar, HiOutlineCurrencyEuro, HiOutlineUser, HiOutlineCheck, HiOutlineX, HiOutlineDocumentText, HiOutlineKey, HiOutlineArrowLeft } from 'react-icons/hi';

// Ajout des propriétés manquantes à l'interface Property
interface ExtendedPropertySummary {
    id: number;
    identifier: string;
    address: string;
    address2?: string;
    city: string;
    zipCode: string;
}

// Ajout des propriétés manquantes à l'interface Tenant
interface ExtendedTenantSummary {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}

// Extension de l'interface Rental pour inclure les propriétés manquantes
interface ExtendedRental extends Rental {
    property: ExtendedPropertySummary;
    tenant: ExtendedTenantSummary;
    surface?: number;
    isFurnished?: boolean;
    furniture?: string[];
}

const extractIdFromSlug = (slug: string): number => {
    const id = parseInt(slug.split('-')[0], 10);
    return isNaN(id) ? 0 : id;
};

export default function RentalDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const [rental, setRental] = useState<ExtendedRental | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRental = async () => {
            try {
                const id = extractIdFromSlug(params.slug as string);
                const response = await api.get(`/rentals/${id}`);
                setRental(response.data);
                setError(null);
            } catch (err) {
                console.error('Erreur lors du chargement de la location:', err);
                setError('Impossible de charger les détails de la location');
            } finally {
                setLoading(false);
            }
        };

        fetchRental();
    }, [params.slug]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
            </div>
        );
    }

    if (error || !rental) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-600 dark:text-red-400">{error || 'Location non trouvée'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* En-tête avec navigation */}
            <div className="mb-6">
                <Link
                    href="/dashboard/owner/rentals"
                    className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour aux locations
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {rental.name || `Location du ${new Date(rental.startDate).toLocaleDateString()}`}
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations générales */}
                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                            Informations générales
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type de location</p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">{rental.type}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Usage</p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">{rental.usage}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Dates</p>
                                <div className="mt-1 text-sm text-gray-900 dark:text-white">
                                    <p>Début: {new Date(rental.startDate).toLocaleDateString()}</p>
                                    {rental.endDate && (
                                        <p>Fin: {new Date(rental.endDate).toLocaleDateString()}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Tacite reconduction
                                </p>
                                <div className="mt-1 flex items-center">
                                    {rental.tacitRenewal ? (
                                        <HiOutlineCheck className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <HiOutlineX className="h-5 w-5 text-red-500" />
                                    )}
                                    <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                        {rental.tacitRenewal ? 'Oui' : 'Non'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Informations financières */}
                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                            Informations financières
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loyer</p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">{rental.rent}€</p>
                            </div>
                            {rental.charges > 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Charges</p>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {rental.charges}€ ({rental.chargeType})
                                    </p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Dépôt de garantie</p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">{rental.deposit}€</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Paiement</p>
                                <div className="mt-1 text-sm text-gray-900 dark:text-white">
                                    <p>Fréquence: {rental.paymentFrequency}</p>
                                    <p>Type: {rental.paymentType}</p>
                                    <p>Jour de paiement: {rental.paymentDay}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Révision de loyer */}
                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                            Révision de loyer
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Révision activée
                                </p>
                                <div className="mt-1 flex items-center">
                                    {rental.rentRevisionEnabled ? (
                                        <HiOutlineCheck className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <HiOutlineX className="h-5 w-5 text-red-500" />
                                    )}
                                    <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                        {rental.rentRevisionEnabled ? 'Oui' : 'Non'}
                                    </span>
                                </div>
                            </div>
                            {rental.rentRevisionEnabled && (
                                <>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Indice</p>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {rental.rentRevisionIndex}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Période</p>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {rental.rentRevisionPeriod} mois
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Encadrement des loyers */}
                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                            Encadrement des loyers
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Encadrement activé
                                </p>
                                <div className="mt-1 flex items-center">
                                    {rental.rentControlEnabled ? (
                                        <HiOutlineCheck className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <HiOutlineX className="h-5 w-5 text-red-500" />
                                    )}
                                    <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                        {rental.rentControlEnabled ? 'Oui' : 'Non'}
                                    </span>
                                </div>
                            </div>
                            {rental.rentControlEnabled && (
                                <>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Loyer de référence
                                        </p>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {rental.referenceRent}€
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            Loyer maximum
                                        </p>
                                        <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                            {rental.maxRent}€
                                        </p>
                                    </div>
                                    {rental.rentSupplement && rental.rentSupplement > 0 && (
                                        <>
                                            <div>
                                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                    Complément de loyer
                                                </p>
                                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                    {rental.rentSupplement}€
                                                </p>
                                            </div>
                                            {rental.rentSupplementJustification && (
                                                <div>
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                        Justification
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                        {rental.rentSupplementJustification}
                                                    </p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Travaux */}
                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                            Travaux
                        </h3>
                        <div className="space-y-6">
                            {/* Travaux propriétaire */}
                            {(rental.ownerWorkAmount > 0 || rental.ownerWorkDescription) && (
                                <div className="space-y-4">
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                                        Travaux réalisés par le propriétaire
                                    </h4>
                                    {rental.ownerWorkAmount > 0 && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Montant
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {rental.ownerWorkAmount}€
                                            </p>
                                        </div>
                                    )}
                                    {rental.ownerWorkDescription && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Description
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {rental.ownerWorkDescription}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Travaux locataire */}
                            {(rental.tenantWorkAmount > 0 || rental.tenantWorkDescription) && (
                                <div className="space-y-4">
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                                        Travaux à réaliser par le locataire
                                    </h4>
                                    {rental.tenantWorkAmount > 0 && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Montant
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {rental.tenantWorkAmount}€
                                            </p>
                                        </div>
                                    )}
                                    {rental.tenantWorkDescription && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Description
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {rental.tenantWorkDescription}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* État des lieux */}
                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                            État des lieux
                        </h3>
                        <div className="space-y-6">
                            {/* Entrée */}
                            {(rental.checkInDate || rental.checkInNotes) && (
                                <div className="space-y-4">
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                                        État des lieux d'entrée
                                    </h4>
                                    {rental.checkInDate && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Date
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {new Date(rental.checkInDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                    {rental.checkInNotes && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Notes
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {rental.checkInNotes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Sortie */}
                            {(rental.checkOutDate || rental.checkOutNotes) && (
                                <div className="space-y-4">
                                    <h4 className="text-md font-medium text-gray-900 dark:text-white">
                                        État des lieux de sortie
                                    </h4>
                                    {rental.checkOutDate && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Date
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {new Date(rental.checkOutDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    )}
                                    {rental.checkOutNotes && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                Notes
                                            </p>
                                            <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                                {rental.checkOutNotes}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quittances */}
                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                            Quittances
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Jour de facturation
                                </p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {rental.billingDay}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Titre du document
                                </p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {rental.documentTitle}
                                </p>
                            </div>
                            {rental.separateBillingAddress && rental.billingAddress && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Adresse de facturation
                                    </p>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {rental.billingAddress}
                                    </p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Options</p>
                                <div className="mt-1 space-y-2">
                                    <div className="flex items-center">
                                        {rental.automaticNumbering ? (
                                            <HiOutlineCheck className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <HiOutlineX className="h-5 w-5 text-red-500" />
                                        )}
                                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                            Numérotation automatique
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        {rental.includeNoticeSecondPage ? (
                                            <HiOutlineCheck className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <HiOutlineX className="h-5 w-5 text-red-500" />
                                        )}
                                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                            Inclure l'avis en deuxième page
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {rental.receiptText && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Texte de la quittance
                                    </p>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {rental.receiptText}
                                    </p>
                                </div>
                            )}
                            {rental.noticeText && (
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Texte de l'avis
                                    </p>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                        {rental.noticeText}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Autres réglages */}
                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                            Autres réglages
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Type de rapport de solde
                                </p>
                                <p className="mt-1 text-sm text-gray-900 dark:text-white">
                                    {rental.balanceReportType === 'manual' ? 'Manuel' : 'Automatique'}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Notifications</p>
                                <div className="mt-1 space-y-2">
                                    <div className="flex items-center">
                                        {rental.notifyOwner ? (
                                            <HiOutlineCheck className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <HiOutlineX className="h-5 w-5 text-red-500" />
                                        )}
                                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                            Notifier le propriétaire
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        {rental.notifyTenant ? (
                                            <HiOutlineCheck className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <HiOutlineX className="h-5 w-5 text-red-500" />
                                        )}
                                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                            Notifier le locataire
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        {rental.notifyContractEnd ? (
                                            <HiOutlineCheck className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <HiOutlineX className="h-5 w-5 text-red-500" />
                                        )}
                                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                            Notifier la fin du contrat
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Statut</p>
                                <div className="mt-1 flex items-center">
                                    {rental.isActive ? (
                                        <HiOutlineCheck className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <HiOutlineX className="h-5 w-5 text-red-500" />
                                    )}
                                    <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                        {rental.isActive ? 'Location active' : 'Location inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}