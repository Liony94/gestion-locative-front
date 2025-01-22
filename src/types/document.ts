import { Payment } from './payment';
import { Property } from './property';
import { User } from './user';

export interface Receipt {
    id: number;
    fileName: string;
    month: string;
    year: number;
    payment: Payment;
    property: Property;
    owner: User;
    tenant: User;
    amount: number;
    paymentDate: Date;
    generatedAt: Date;
}

export type DocumentType = 'RENT_RECEIPT' | 'LEASE' | 'INVENTORY' | 'OTHER';

export interface Document {
    id: number;
    type: DocumentType;
    fileName: string;
    property: Property;
    owner: User;
    tenant?: User;
    createdAt: Date;
    updatedAt: Date;
    metadata?: {
        month?: string;
        year?: number;
        amount?: number;
        category?: string;
        description?: string;
    };
} 