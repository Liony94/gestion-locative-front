export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address?: string;
    role?: 'OWNER' | 'TENANT' | 'ADMIN';
    guarantorName?: string;
    guarantorPhone?: string;
} 