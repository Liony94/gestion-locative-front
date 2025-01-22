export enum PropertyType {
    HOUSE = 'HOUSE',
    APARTMENT = 'APARTMENT',
    COMMERCIAL = 'COMMERCIAL',
    LAND = 'LAND',
    PARKING = 'PARKING',
    OTHER = 'OTHER'
}

export const PropertyTypeLabels: Record<PropertyType, string> = {
    [PropertyType.HOUSE]: 'Maison',
    [PropertyType.APARTMENT]: 'Appartement',
    [PropertyType.COMMERCIAL]: 'Local commercial',
    [PropertyType.LAND]: 'Terrain',
    [PropertyType.PARKING]: 'Parking',
    [PropertyType.OTHER]: 'Autre'
};

export enum BuildingType {
    COLLECTIVE = 'COLLECTIVE',
    INDIVIDUAL = 'INDIVIDUAL'
}

export enum BuildingLegalStatus {
    CONDOMINIUM = 'CONDOMINIUM',
    SINGLE_OWNER = 'SINGLE_OWNER'
}

export enum VisibilityStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}

export enum PropertyTaxRegime {
    PINEL_6_YEARS = 'PINEL_6_YEARS',
    PINEL_9_YEARS = 'PINEL_9_YEARS',
    PINEL_REHABILITATION = 'PINEL_REHABILITATION',
    CLASSIC_REAL_ESTATE_INCOME = 'CLASSIC_REAL_ESTATE_INCOME',
    CLASSIC_MICRO_REAL_ESTATE_INCOME = 'CLASSIC_MICRO_REAL_ESTATE_INCOME',
    BIC_REAL = 'BIC_REAL',
    BIC_MICRO = 'BIC_MICRO',
    // ... autres régimes fiscaux
}

export interface PropertyFormData {
    // Informations générales
    identifier: string;
    color?: string;
    type: PropertyType;

    // Adresse
    address: string;
    address2?: string;
    building?: string;
    staircase?: string;
    floor?: string;
    number?: string;
    city: string;
    zipCode: string;
    region?: string;
    country: string;

    // Informations locatives
    rentExcludingCharges: number;
    charges?: number;
    paymentFrequency?: string;

    // Description physique
    surface: number;
    numberOfRooms?: number;
    numberOfBedrooms?: number;
    numberOfBathrooms?: number;
    constructionDate?: Date;
    description?: string;
    privateNote?: string;

    // Informations complémentaires
    buildingType?: BuildingType;
    buildingLegalStatus?: BuildingLegalStatus;
    isFurnished: boolean;
    smokersAllowed: boolean;
    petsAllowed: boolean;

    // Équipements
    equipment?: string[];
    outdoorSpaces?: string[];
    buildingAmenities?: string[];
    securityFeatures?: string[];
    sportsFacilities?: string[];

    // Informations cadastrales
    lotNumber?: string;
    coownershipUnits?: string;
    cadastralReference?: string;

    // Informations financières
    acquisitionDate?: Date;
    acquisitionPrice?: number;
    acquisitionFees?: number;
    agencyFees?: number;
    currentValue?: number;

    // Informations fiscales
    taxRegime?: PropertyTaxRegime;
    siret?: string;
    activityStartDate?: Date;
    taxNumber?: string;
    housingTax?: number;
    propertyTax?: number;

    // Centre des impôts
    taxCenterName?: string;
    taxCenterAddress?: string;
    taxCenterAddress2?: string;
    taxCenterZipCode?: string;
    taxCenterCity?: string;
    taxNotes?: string;

    // Images et visibilité
    images?: string[];
    publicDescription?: string;
    internalRules?: string;
    propertyVisibility: VisibilityStatus;
    addressVisibility: VisibilityStatus;
    phoneVisibility: VisibilityStatus;
    isAvailableForRent: boolean;
}

export interface Tenant {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export const DEFAULT_PROPERTY_FORM_DATA: PropertyFormData = {
    identifier: '',
    type: PropertyType.APARTMENT,
    address: '',
    city: '',
    zipCode: '',
    country: 'France',
    rentExcludingCharges: 0,
    surface: 0,
    isFurnished: false,
    smokersAllowed: false,
    petsAllowed: false,
    propertyVisibility: VisibilityStatus.PRIVATE,
    addressVisibility: VisibilityStatus.PRIVATE,
    phoneVisibility: VisibilityStatus.PRIVATE,
    isAvailableForRent: true
};

export const propertyTypes = [
    'Maison',
    'Appartement',
    'Studio',
    'Loft',
    'Local commercial',
    'Terrain',
    'Autre'
] as const; 