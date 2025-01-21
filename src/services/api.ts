import { UserRole } from "@/app/auth/register/page";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    phone?: string;
    address?: string;
}

interface LoginResponse {
    access_token: string;
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    };
}

const getAuthToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

export const api = {
    get: async (endpoint: string) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/api${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Une erreur est survenue');
        }

        return response.json();
    },

    post: async (endpoint: string, data: any) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/api${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Une erreur est survenue');
        }

        return response.json();
    },

    put: async (endpoint: string, data: any) => {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/api${endpoint}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Une erreur est survenue');
        }

        return response.json();
    }
};

export const authApi = {
    login: async (credentials: { email: string; password: string; role: UserRole }) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                    role: credentials.role
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erreur lors de la connexion');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erreur de connexion:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Erreur lors de la connexion');
        }
    },

    register: async (data: RegisterData) => {
        const normalizedData = {
            ...data,
            role: data.role === UserRole.OWNER ? UserRole.OWNER : UserRole.TENANT
        };

        console.log('Données d\'inscription:', normalizedData);

        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(normalizedData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erreur lors de l\'inscription');
        }

        return response.json();
    },
}; 