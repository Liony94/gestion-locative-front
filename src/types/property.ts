import { User } from './user';

export interface Property {
    id: number;
    title: string;
    address: string;
    owner: User;
    description?: string;
    type: string;
    area: number;
    bedrooms: number;
    bathrooms: number;
    rent: number;
    deposit: number;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
} 