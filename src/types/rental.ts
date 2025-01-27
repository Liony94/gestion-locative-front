import { Property } from './property';
import { User } from './user';

// Enums
export enum RentalType {
    EMPTY_HOUSING = 'empty_housing',
    FURNISHED_HOUSING = 'furnished_housing',
    STUDENT_FURNISHED = 'student_furnished',
    MOBILITY_LEASE = 'mobility_lease',
    SEASONAL_RENTAL = 'seasonal_rental',
    PARKING_GARAGE = 'parking_garage',
    STORAGE = 'storage',
    MIXED_LEASE = 'mixed_lease',
    COMMERCIAL_LEASE = 'commercial_lease',
    PROFESSIONAL_LEASE = 'professional_lease',
    RURAL_LEASE = 'rural_lease',
    PRECARIOUS_LEASE = 'precarious_lease',
    CIVIL_LEASE = 'civil_lease',
    DOMICILIATION = 'domiciliation',
    COMPANY_HOUSING = 'company_housing',
    LOAN_FOR_USE = 'loan_for_use',
    OTHER = 'other'
}

export enum UsageType {
    MAIN_RESIDENCE = 'main_residence',
    SECONDARY_RESIDENCE = 'secondary_residence',
    PROFESSIONAL_ACTIVITY = 'professional_activity'
}

export enum PaymentFrequency {
    MONTHLY = 'monthly',
    QUARTERLY = 'quarterly',
    ANNUALLY = 'annually'
}

export enum PaymentType {
    IN_ADVANCE = 'in_advance',
    AT_TERM = 'at_term'
}

export enum ChargeType {
    PROVISION = 'provision',
    FIXED = 'fixed'
}

// Interfaces de base
export interface PropertySummary {
    id: number;
    identifier: string;
    address: string;
    city: string;
}

export interface TenantSummary {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

// Interface pour le formulaire
export interface RentalFormData {
    // Relations
    propertyId: number;
    tenantId: number;

    // Informations générales
    type: RentalType;
    usage: UsageType;
    startDate: string;
    endDate?: string;
    tacitRenewal: boolean;
    name?: string;
    description?: string;

    // Paiement
    paymentFrequency: PaymentFrequency;
    paymentType: PaymentType;
    paymentDay: number;
    rent: number;
    rentVatRate: number;
    charges: number;
    chargeType: ChargeType;
    chargesVatRate: number;
    deposit: number;
    housingBenefit: number;
    latePaymentFee: number;

    // Révision de loyer
    rentRevisionEnabled: boolean;
    rentRevisionIndex: string;
    rentRevisionPeriod: number;

    // Encadrement des loyers
    rentControlEnabled: boolean;
    referenceRent?: number;
    maxRent?: number;
    rentSupplement?: number;
    rentSupplementJustification?: string;

    // Travaux
    ownerWorkAmount: number;
    ownerWorkDescription?: string;
    tenantWorkAmount: number;
    tenantWorkDescription?: string;

    // Informations complémentaires
    specialConditions?: string;
    specialClauses?: string;
    comments?: string;

    // État des lieux
    checkInDate?: string;
    checkInNotes?: string;
    checkOutDate?: string;
    checkOutNotes?: string;

    // Quittances
    billingDay: number;
    separateBillingAddress: boolean;
    billingAddress?: string;
    documentTitle: string;
    automaticNumbering: boolean;
    includeNoticeSecondPage: boolean;
    receiptText?: string;
    noticeText?: string;

    // Autres réglages
    balanceReportType: string;
    notifyOwner: boolean;
    notifyTenant: boolean;
    notifyContractEnd: boolean;
    isActive: boolean;
}

// Interface pour la location
export interface Rental extends Omit<RentalFormData, 'propertyId' | 'tenantId'> {
    id: number;
    identifier: string;
    property: PropertySummary;
    tenant: TenantSummary;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
} 