import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '@/app/auth/register/page';

interface JwtPayload {
    email: string;
    sub: number;
    role: string;
}

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}

interface AuthState {
    isAuthenticated: boolean;
    role: UserRole | null;
    isLoading: boolean;
    user: User | null;
}

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        role: null,
        isLoading: true,
        user: null
    });

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setAuthState({
                isAuthenticated: false,
                role: null,
                isLoading: false,
                user: null
            });
            return;
        }

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const roleFromToken = decoded.role.toLowerCase();
            let userRole: UserRole;

            switch (roleFromToken) {
                case 'owner':
                    userRole = UserRole.OWNER;
                    break;
                case 'tenant':
                    userRole = UserRole.TENANT;
                    break;
                default:
                    throw new Error(`Rôle invalide: ${roleFromToken}`);
            }

            // Récupérer les informations de l'utilisateur depuis l'API
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des informations utilisateur');
            }

            const userData = await response.json();

            setAuthState({
                isAuthenticated: true,
                role: userRole,
                isLoading: false,
                user: {
                    id: userData.id,
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    role: userRole
                }
            });
        } catch (error) {
            console.error('Erreur d\'authentification:', error);
            localStorage.removeItem('token');
            setAuthState({
                isAuthenticated: false,
                role: null,
                isLoading: false,
                user: null
            });
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (token: string) => {
        localStorage.setItem('token', token);
        await checkAuth();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({
            isAuthenticated: false,
            role: null,
            isLoading: false,
            user: null
        });
    };

    return { ...authState, login, logout };
}; 