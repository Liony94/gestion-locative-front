'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/app/auth/register/page';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export default function DashboardHeader() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const { isAuthenticated, role, isLoading, user, logout } = useAuth();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/auth/login');
    };

    const getInitials = () => {
        if (!user?.firstName || !user?.lastName) return '...';
        return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    };

    const getFullName = () => {
        if (!user?.firstName || !user?.lastName) return 'Chargement...';
        return `${user.firstName} ${user.lastName}`;
    };

    if (isLoading) {
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

    if (!isAuthenticated || !role) {
        return null;
    }

    return (
        <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/dashboard" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                ImmoGest 🏠
                            </Link>
                        </div>
                    </div>

                    {/* Actions et Profil */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Switcher */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                            aria-label="Toggle theme"
                        >
                            {mounted && (
                                theme === 'dark' ? (
                                    <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                ) : (
                                    <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                )
                            )}
                        </button>

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
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1" role="menu">
                                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                                            <div className="font-medium">{getFullName()}</div>
                                            <div className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{user?.email}</div>
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