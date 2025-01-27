export interface Rental {
    id: number;
    identifier: string;
    name: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    rent: number;
    charges?: number;
    deposit?: number;
    surface?: number;
    isFurnished?: boolean;
    furniture?: string[];
    propertyId: number;
    tenantId: number;
    property?: Property;
    tenant?: User;
    isActive?: boolean;
    checkInDate?: Date;
    checkInNotes?: string;
    checkOutDate?: Date;
    checkOutNotes?: string;
}

export interface RentalFormData {
    name: string;
    description?: string;
    startDate: string;
    endDate?: string;
    rent: number;
    charges?: number;
    deposit?: number;
    surface?: number;
    isFurnished: boolean;
    furniture?: string[];
    propertyId: number;
    tenantId: number;
}

export const DEFAULT_RENTAL_FORM_DATA: RentalFormData = {
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    rent: 0,
    isFurnished: false,
    propertyId: 0,
    tenantId: 0
}; 