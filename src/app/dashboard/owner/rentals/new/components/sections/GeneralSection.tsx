import { RentalFormData, RentalType, UsageType, PaymentFrequency, PaymentType, ChargeType } from '@/types/rental';
import { Property } from '@/types/property';
import { User } from '@/types/user';

const RENTAL_TYPE_LABELS: Record<string, string> = {
    EMPTY_HOUSING: 'Logement vide',
    FURNISHED_HOUSING: 'Logement meublé',
    STUDENT_FURNISHED: 'Meublé étudiant',
    MOBILITY_LEASE: 'Bail mobilité',
    SEASONAL_RENTAL: 'Location saisonnière',
    PARKING_GARAGE: 'Parking/Garage',
    STORAGE: 'Local de stockage',
    MIXED_LEASE: 'Bail mixte',
    COMMERCIAL_LEASE: 'Bail commercial',
    PROFESSIONAL_LEASE: 'Bail professionnel',
    RURAL_LEASE: 'Bail rural',
    PRECARIOUS_LEASE: 'Bail précaire',
    CIVIL_LEASE: 'Bail civil',
    DOMICILIATION: 'Domiciliation',
    COMPANY_HOUSING: 'Logement de fonction',
    LOAN_FOR_USE: 'Prêt à usage',
    OTHER: 'Autre'
};

const USAGE_TYPE_LABELS: Record<string, string> = {
    MAIN_RESIDENCE: 'Résidence principale',
    SECONDARY_RESIDENCE: 'Résidence secondaire',
    PROFESSIONAL_ACTIVITY: 'Activité professionnelle'
};

interface GeneralSectionProps {
    formData: RentalFormData;
    onChange: (name: keyof RentalFormData, value: any) => void;
    properties: Property[];
    tenants: User[];
}

export default function GeneralSection({ formData, onChange, properties, tenants }: GeneralSectionProps) {
    const rentalTypes = Object.entries(RentalType).map(([key, value]) => ({
        value,
        label: RENTAL_TYPE_LABELS[key] || key
    }));

    const usageTypes = Object.entries(UsageType).map(([key, value]) => ({
        value,
        label: USAGE_TYPE_LABELS[key] || key
    }));

    return (
        <div className="space-y-6">
            {/* Bien loué */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Bien loué
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Bien *
                            </label>
                            <select
                                id="propertyId"
                                name="propertyId"
                                value={formData.propertyId}
                                onChange={(e) => onChange('propertyId', parseInt(e.target.value, 10))}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value={0}>Sélectionnez un bien</option>
                                {properties.map((property) => (
                                    <option key={property.id} value={property.id}>
                                        {property.identifier} - {property.address}, {property.city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Informations générales */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Informations générales
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Type de location */}
                        <div className="sm:col-span-2">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Type de location *
                            </label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={(e) => onChange('type', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                required
                            >
                                {rentalTypes.map(({ value, label }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Usage */}
                        <div className="sm:col-span-2">
                            <label htmlFor="usage" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Usage *
                            </label>
                            <select
                                id="usage"
                                name="usage"
                                value={formData.usage}
                                onChange={(e) => onChange('usage', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                required
                            >
                                {usageTypes.map(({ value, label }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Dates */}
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Début du bail *
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={formData.startDate}
                                onChange={(e) => onChange('startDate', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Fin du bail
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={formData.endDate || ''}
                                onChange={(e) => onChange('endDate', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        {/* Renouvellement tacite */}
                        <div className="sm:col-span-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="tacitRenewal"
                                    name="tacitRenewal"
                                    checked={formData.tacitRenewal}
                                    onChange={(e) => onChange('tacitRenewal', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="tacitRenewal" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                                    Renouvellement tacite
                                </label>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Le bail sera automatiquement renouvelé à son terme si cette option est activée
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Locataire */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Locataire
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label htmlFor="tenantId" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Locataire *
                            </label>
                            <select
                                id="tenantId"
                                name="tenantId"
                                value={formData.tenantId}
                                onChange={(e) => onChange('tenantId', parseInt(e.target.value, 10))}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                required
                            >
                                <option value={0}>Sélectionnez un locataire</option>
                                {tenants.map((tenant) => (
                                    <option key={tenant.id} value={tenant.id}>
                                        {tenant.firstName} {tenant.lastName} ({tenant.email})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Informations de paiement */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Informations de paiement
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {/* Loyer */}
                        <div>
                            <label htmlFor="rent" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Loyer (€) *
                            </label>
                            <input
                                type="number"
                                id="rent"
                                name="rent"
                                value={formData.rent}
                                onChange={(e) => onChange('rent', parseFloat(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Charges */}
                        <div>
                            <label htmlFor="charges" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Charges (€)
                            </label>
                            <input
                                type="number"
                                id="charges"
                                name="charges"
                                value={formData.charges}
                                onChange={(e) => onChange('charges', parseFloat(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Dépôt de garantie */}
                        <div>
                            <label htmlFor="deposit" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Dépôt de garantie (€) *
                            </label>
                            <input
                                type="number"
                                id="deposit"
                                name="deposit"
                                value={formData.deposit}
                                onChange={(e) => onChange('deposit', parseFloat(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Aide au logement */}
                        <div>
                            <label htmlFor="housingBenefit" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Aide au logement (€)
                            </label>
                            <input
                                type="number"
                                id="housingBenefit"
                                name="housingBenefit"
                                value={formData.housingBenefit}
                                onChange={(e) => onChange('housingBenefit', parseFloat(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        {/* Type de charges */}
                        <div>
                            <label htmlFor="chargeType" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Type de charges
                            </label>
                            <select
                                id="chargeType"
                                name="chargeType"
                                value={formData.chargeType}
                                onChange={(e) => onChange('chargeType', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            >
                                <option value={ChargeType.PROVISION}>Provision pour charges</option>
                                <option value={ChargeType.FIXED}>Forfait de charges</option>
                            </select>
                        </div>

                        {/* Fréquence de paiement */}
                        <div>
                            <label htmlFor="paymentFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Fréquence de paiement
                            </label>
                            <select
                                id="paymentFrequency"
                                name="paymentFrequency"
                                value={formData.paymentFrequency}
                                onChange={(e) => {
                                    console.log('Nouvelle fréquence sélectionnée:', e.target.value);
                                    onChange('paymentFrequency', e.target.value as PaymentFrequency);
                                }}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            >
                                <option value={PaymentFrequency.MONTHLY}>Mensuel</option>
                                <option value={PaymentFrequency.QUARTERLY}>Trimestriel</option>
                                <option value={PaymentFrequency.ANNUALLY}>Annuel</option>
                            </select>
                        </div>

                        {/* Type de paiement */}
                        <div>
                            <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Type de paiement
                            </label>
                            <select
                                id="paymentType"
                                name="paymentType"
                                value={formData.paymentType}
                                onChange={(e) => onChange('paymentType', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                            >
                                <option value={PaymentType.IN_ADVANCE}>Paiement à échoir</option>
                                <option value={PaymentType.AT_TERM}>Paiement à terme échu</option>
                            </select>
                        </div>

                        {/* Jour de paiement */}
                        <div>
                            <label htmlFor="paymentDay" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Jour de paiement
                            </label>
                            <input
                                type="number"
                                id="paymentDay"
                                name="paymentDay"
                                value={formData.paymentDay}
                                onChange={(e) => onChange('paymentDay', parseInt(e.target.value))}
                                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                min="1"
                                max="31"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Révision de loyer */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Révision de loyer
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="rentRevisionEnabled"
                                    name="rentRevisionEnabled"
                                    checked={formData.rentRevisionEnabled}
                                    onChange={(e) => onChange('rentRevisionEnabled', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="rentRevisionEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                                    Révision de loyer activée
                                </label>
                            </div>
                        </div>

                        {formData.rentRevisionEnabled && (
                            <>
                                <div>
                                    <label htmlFor="rentRevisionIndex" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Indice de révision
                                    </label>
                                    <input
                                        type="text"
                                        id="rentRevisionIndex"
                                        name="rentRevisionIndex"
                                        value={formData.rentRevisionIndex}
                                        onChange={(e) => onChange('rentRevisionIndex', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="rentRevisionPeriod" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Période de révision (mois)
                                    </label>
                                    <input
                                        type="number"
                                        id="rentRevisionPeriod"
                                        name="rentRevisionPeriod"
                                        value={formData.rentRevisionPeriod}
                                        onChange={(e) => onChange('rentRevisionPeriod', parseInt(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                        min="1"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Encadrement des loyers */}
            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                        Encadrement des loyers
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="rentControlEnabled"
                                    name="rentControlEnabled"
                                    checked={formData.rentControlEnabled}
                                    onChange={(e) => onChange('rentControlEnabled', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                                />
                                <label htmlFor="rentControlEnabled" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
                                    Encadrement des loyers activé
                                </label>
                            </div>
                        </div>

                        {formData.rentControlEnabled && (
                            <>
                                <div>
                                    <label htmlFor="referenceRent" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Loyer de référence (€)
                                    </label>
                                    <input
                                        type="number"
                                        id="referenceRent"
                                        name="referenceRent"
                                        value={formData.referenceRent || 0}
                                        onChange={(e) => onChange('referenceRent', parseFloat(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="maxRent" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Loyer maximum (€)
                                    </label>
                                    <input
                                        type="number"
                                        id="maxRent"
                                        name="maxRent"
                                        value={formData.maxRent || 0}
                                        onChange={(e) => onChange('maxRent', parseFloat(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="rentSupplement" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Complément de loyer (€)
                                    </label>
                                    <input
                                        type="number"
                                        id="rentSupplement"
                                        name="rentSupplement"
                                        value={formData.rentSupplement || 0}
                                        onChange={(e) => onChange('rentSupplement', parseFloat(e.target.value))}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="rentSupplementJustification" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Justification du complément
                                    </label>
                                    <textarea
                                        id="rentSupplementJustification"
                                        name="rentSupplementJustification"
                                        value={formData.rentSupplementJustification || ''}
                                        onChange={(e) => onChange('rentSupplementJustification', e.target.value)}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 