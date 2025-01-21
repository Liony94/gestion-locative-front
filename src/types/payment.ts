import { PaymentStatus } from './enums';

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
    isActive: boolean;
    dayOfMonth: number;
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
    status: PaymentStatus;
    paymentMethod: 'BANK_TRANSFER' | 'CASH' | 'CHECK' | 'CREDIT_CARD' | null;
    transactionId: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    paymentSchedule?: PaymentSchedule;
}

export interface PaymentStatistics {
    totalDue: number;
    totalPaid: number;
    totalLate: number;
    totalPending: number;
    balance: number;
}

export interface RecordPaymentData {
    amount: number;
    paymentMethod: string;
    transactionId?: string;
    notes?: string;
} 