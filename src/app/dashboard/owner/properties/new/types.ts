export interface Tenant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface PropertyFormData {
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    zipCode: string;
    type: string;
    surface: number;
    users: number[];
    images: string[];
    [key: string]: string | number | number[] | string[];
}

export const propertyTypes = [
    'Maison',
    'Appartement',
    'Studio',
    'Loft',
    'Local commercial',
    'Terrain',
    'Autre'
] as const; 