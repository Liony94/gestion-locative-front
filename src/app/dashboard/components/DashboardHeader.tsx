'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/app/auth/register/page';

const ownerNavigation = [
    { name: 'Tableau de bord', href: '/dashboard' },
    { name: 'Propriétés', href: '/dashboard/owner/properties' },
    { name: 'Locataires', href: '/dashboard/owner/tenants' },
    { name: 'Documents', href: '/dashboard/owner/documents' },
    { name: 'Comptabilité', href: '/dashboard/owner/accounting' },
];

const tenantNavigation = [
    { name: 'Tableau de bord', href: '/dashboard/tenant' },
    { name: 'Documents', href: '/dashboard/tenant/documents' },
    { name: 'Paiements', href: '/dashboard/tenant/payments' },
];

export default function DashboardHeader() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading, logout } = useAuth();

    const navigation = user?.role === UserRole.OWNER ? ownerNavigation : tenantNavigation;

    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    };

    // Obtenir les initiales de l'utilisateur
    const getInitials = () => {
        if (!user?.firstName || !user?.lastName) return '...';
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    };

    // Obtenir le nom complet de l'utilisateur
    const getFullName = () => {
        if (!user?.firstName || !user?.lastName) return 'Chargement...';
        return `${user.firstName} ${user.lastName}`;
    };

    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [loading, user, router]);

    if (loading) {
        return (
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    ImmoGest 🏠
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Logo et Navigation */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                ImmoGest 🏠
                            </span>
                        </div>
                        <nav className="hidden md:ml-8 md:flex md:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${pathname === item.href
                                        ? 'border-blue-500 text-gray-900 dark:text-white'
                                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Actions et Profil */}
                    <div className="flex items-center space-x-4">
                        {/* Bouton Nouveau - uniquement pour les propriétaires */}
                        {user?.role === UserRole.OWNER && (
                            <Link
                                href="/dashboard/owner/properties/new"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                + Nouveau bien
                            </Link>
                        )}

                        {/* Notifications */}
                        <button className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                            <span className="sr-only">Voir les notifications</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        {/* Profil */}
                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-3 focus:outline-none"
                            >
                                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                    {getInitials()}
                                </div>
                                <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {getFullName()}
                                </span>
                            </button>

                            {/* Menu profil */}
                            {isProfileOpen && user && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1" role="menu">
                                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                                            <div className="font-medium">{getFullName()}</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{user.email}</div>
                                        </div>
                                        <Link
                                            href="/dashboard/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            role="menuitem"
                                        >
                                            Mon profil
                                        </Link>
                                        <Link
                                            href="/dashboard/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            role="menuitem"
                                        >
                                            Paramètres
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                            role="menuitem"
                                        >
                                            Déconnexion
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
} 