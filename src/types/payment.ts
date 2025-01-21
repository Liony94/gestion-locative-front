import { PaymentStatus } from './enums';
import { Property } from './property';
import { User } from './user';

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}

export interface Property {
    id: number;
    title: string;
    address: string;
    owner?: User;
}

export interface PaymentSchedule {
    id: number;
    startDate: string;
    endDate: string;
    monthlyAmount: number;
    dayOfMonth: number;
    isActive: boolean;
    property: Property;
    tenant: User;
    payments: Payment[];
}

export interface Payment {
    id: number;
    dueDate: string;
    amount: number;
    paidAmount: number | null;
    paidAt: string | null;
    status: 'PAID' | 'PENDING' | 'LATE';
    paymentMethod: 'BANK_TRANSFER' | 'CASH' | 'CHECK' | 'CREDIT_CARD' | null;
    transactionId: string | null;
    notes: string | null;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    paymentSchedule?: PaymentSchedule;
}

export interface PaymentStatistics {
    totalDue: number;
    totalPaid: number;
    totalPending: number;
    totalLate: number;
    balance: number;
}

export interface RecordPaymentData {
    amount: number;
    paymentMethod: 'BANK_TRANSFER' | 'CASH' | 'CHECK' | 'CREDIT_CARD';
    transactionId?: string;
    notes?: string;
} 