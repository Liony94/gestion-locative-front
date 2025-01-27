'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/app/auth/register/page';
import {
    HiOutlineHome,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineCash,
    HiOutlineKey,
    HiOutlineClipboardList,
    HiOutlineCreditCard,
    HiOutlineChartBar,
} from 'react-icons/hi';

const ownerNavigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: HiOutlineChartBar },
    { name: 'Propriétés', href: '/dashboard/owner/properties', icon: HiOutlineHome },
    { name: 'Locations', href: '/dashboard/owner/rentals', icon: HiOutlineKey },
    { name: 'Locataires', href: '/dashboard/owner/tenants', icon: HiOutlineUsers },
    { name: 'Documents', href: '/dashboard/owner/documents', icon: HiOutlineDocumentText },
    { name: 'Comptabilité', href: '/dashboard/owner/accounting', icon: HiOutlineCash },
];

const tenantNavigation = [
    { name: 'Tableau de bord', href: '/dashboard/tenant', icon: HiOutlineChartBar },
    { name: 'Documents', href: '/dashboard/tenant/documents', icon: HiOutlineDocumentText },
    { name: 'Paiements', href: '/dashboard/tenant/payments', icon: HiOutlineCreditCard },
    { name: 'État des lieux', href: '/dashboard/tenant/inventory', icon: HiOutlineClipboardList },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { role } = useAuth();

    const navigation = role === UserRole.OWNER ? ownerNavigation : tenantNavigation;

    return (
        <>
            {/* Overlay sombre pour mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/50 z-30 lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <nav className="space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-5 w-5 ${isActive
                                            ? 'text-blue-500 dark:text-blue-400'
                                            : 'text-gray-400 dark:text-gray-500'
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
} 