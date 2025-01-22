import { UserRole } from "@/app/auth/register/page";
import axios, { AxiosRequestConfig } from 'axios';

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

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Fonction générique pour les requêtes GET
const get = async <T>(url: string, config?: AxiosRequestConfig) => {
    try {
        const response = await api.get<T>(url, config);
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        throw error;
    }
};

// Fonction spécifique pour les requêtes GET avec réponse de type blob
const getBlob = async (url: string) => {
    try {
        const response = await api.get(url, {
            responseType: 'blob',
            headers: {
                Accept: 'application/pdf',
            },
        });
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        throw error;
    }
};

// Autres méthodes HTTP...
const post = async <T>(url: string, data?: any) => {
    try {
        const response = await api.post<T>(url, data);
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        throw error;
    }
};

const put = async <T>(url: string, data?: any) => {
    try {
        const response = await api.put<T>(url, data);
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        throw error;
    }
};

const del = async <T>(url: string) => {
    try {
        const response = await api.delete<T>(url);
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        throw error;
    }
};

export { api, get, post, put, del, getBlob };

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