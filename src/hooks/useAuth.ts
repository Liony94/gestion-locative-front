import { useState, useEffect } from 'react';

interface User {
    firstName: string;
    lastName: string;
    email: string;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log('Données utilisateur reçues:', userData);

                    // Vérification et transformation des données si nécessaire
                    const formattedUser = {
                        firstName: userData.first_name || userData.firstName,
                        lastName: userData.last_name || userData.lastName,
                        email: userData.email
                    };

                    console.log('Données utilisateur formatées:', formattedUser);
                    setUser(formattedUser);
                } else {
                    console.error('Erreur de réponse API:', response.status);
                    localStorage.removeItem('token');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données utilisateur:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return { user, loading, logout };
} 