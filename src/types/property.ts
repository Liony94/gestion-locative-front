import { User } from './user';

export interface Tenant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    role: 'OWNER' | 'TENANT' | 'ADMIN';
}

export interface Owner {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    companyName?: string;
    siret?: string;
}

export interface Property {
    id: number;
    identifier: string;
    description?: string;
    rentExcludingCharges: number;
    charges?: number;
    address: string;
    address2?: string;
    city: string;
    zipCode: string;
    country: string;
    type: string;
    surface: number;
    numberOfRooms?: number;
    numberOfBedrooms?: number;
    numberOfBathrooms?: number;
    isFurnished: boolean;
    smokersAllowed: boolean;
    petsAllowed: boolean;
    images: string[];
    publicDescription?: string;
    privateNote?: string;
    isAvailableForRent: boolean;
    propertyVisibility: string;
    addressVisibility: string;
    phoneVisibility: string;
    tenants?: Tenant[];
    owner?: Owner;
} 