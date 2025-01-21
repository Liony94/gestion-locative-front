'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/app/auth/register/page';

interface RouteGuardProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
}

export const RouteGuard = ({ children, allowedRoles }: RouteGuardProps) => {
    const { isAuthenticated, role, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                router.push('/auth/login');
                return;
            }

            if (role && !allowedRoles.includes(role)) {
                if (role === UserRole.TENANT) {
                    router.push('/dashboard/tenant');
                } else if (role === UserRole.OWNER) {
                    router.push('/dashboard');
                }
            }
        }
    }, [isAuthenticated, role, isLoading, router, allowedRoles]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!isAuthenticated || !role || !allowedRoles.includes(role)) {
        return null;
    }

    return <>{children}</>;
}; 