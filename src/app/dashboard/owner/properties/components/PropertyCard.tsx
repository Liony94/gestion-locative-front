'use client';

import Link from 'next/link';

interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    zipCode: string;
    type: string;
    surface: number;
    images: string[];
}

interface PropertyCardProps {
    property: Property;
}

const createSlug = (title: string): string => {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
        .replace(/[^a-z0-9]+/g, '-')     // Remplace les caractères spéciaux par des tirets
        .replace(/^-+|-+$/g, '');        // Supprime les tirets au début et à la fin
};

export default function PropertyCard({ property }: PropertyCardProps) {
    // Image par défaut si aucune image n'est fournie
    const defaultImage = 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80';
    const slug = `${property.id}-${createSlug(property.title)}`;

    const getMainImage = () => {
        if (!property.images || property.images.length === 0) {
            console.log('Pas d\'images disponibles');
            return defaultImage;
        }

        const firstImage = property.images[0];
        console.log('URL stockée:', firstImage);

        // Si l'URL est déjà complète (commence par http ou https)
        if (firstImage.startsWith('http')) {
            console.log('URL complète:', firstImage);
            return firstImage;
        }

        // Construction de l'URL finale
        const finalUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${firstImage}`;
        console.log('URL finale:', finalUrl, 'BACKEND_URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
        return finalUrl;
    };

    const mainImage = getMainImage();

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement;
        console.error('Erreur de chargement de l\'image:', target.src);
        target.src = defaultImage;
        // Essayons de charger l'image directement pour voir l'erreur
        fetch(target.src)
            .then(response => {
                if (!response.ok) {
                    console.error('Erreur de chargement:', response.status, response.statusText);
                }
            })
            .catch(error => console.error('Erreur réseau:', error));
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Image de la propriété */}
            <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
                <img
                    src={mainImage}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                />
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {property.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {property.address}, {property.zipCode} {property.city}
                        </p>
                    </div>
                    <span className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 rounded-full">
                        {property.type}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {property.surface} m²
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {property.price} €/mois
                    </div>
                </div>

                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {property.description}
                </p>

                <div className="mt-6 flex justify-end space-x-3">
                    <Link
                        href={`/dashboard/owner/properties/${slug}`}
                        className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        Détails
                    </Link>
                    <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    );
} 