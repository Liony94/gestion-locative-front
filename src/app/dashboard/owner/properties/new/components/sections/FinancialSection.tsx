import React from 'react';
import { PropertyFormData } from '../../types';
import { HiOutlineCurrencyEuro, HiOutlineCalendar, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsBank2, BsFileEarmarkText, BsCashStack, BsBuilding } from 'react-icons/bs';
import { IoReceiptOutline } from 'react-icons/io5';
import { TbPigMoney, TbBuildingBank } from 'react-icons/tb';
import { FaRegBuilding, FaRegMoneyBillAlt, FaRegCreditCard } from 'react-icons/fa';
import { MdOutlinePayments, MdOutlineReceiptLong } from 'react-icons/md';
import { TbReceipt, TbReceiptTax } from 'react-icons/tb';

interface FinancialSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const FinancialSection = ({ formData, onChange }: FinancialSectionProps) => {
    const inputClasses = "block w-full pl-10 pr-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";
    const selectClasses = "block w-full pl-10 pr-3 py-2 text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200";
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
    const iconWrapperClasses = "absolute left-3 top-[2.1rem] text-gray-400 dark:text-gray-500 pointer-events-none";

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Loyer et charges
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Définissez les montants du loyer et des charges
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative">
                        <label htmlFor="rent" className={labelClasses}>
                            Loyer mensuel (€)
                        </label>
                        <div className={iconWrapperClasses}>
                            <HiOutlineCurrencyEuro size={20} />
                        </div>
                        <input
                            type="number"
                            id="rent"
                            name="rent"
                            value={formData.rent || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="800"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="charges" className={labelClasses}>
                            Charges mensuelles (€)
                        </label>
                        <div className={iconWrapperClasses}>
                            <BsCashStack size={20} />
                        </div>
                        <input
                            type="number"
                            id="charges"
                            name="charges"
                            value={formData.charges || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="100"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="paymentFrequency" className={labelClasses}>
                            Fréquence de paiement
                        </label>
                        <div className={iconWrapperClasses}>
                            <MdOutlinePayments size={20} />
                        </div>
                        <select
                            id="paymentFrequency"
                            name="paymentFrequency"
                            value={formData.paymentFrequency || ''}
                            onChange={onChange}
                            className={selectClasses}
                        >
                            <option value="">Sélectionnez une fréquence</option>
                            <option value="MONTHLY">Mensuel</option>
                            <option value="QUARTERLY">Trimestriel</option>
                            <option value="YEARLY">Annuel</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Informations d'acquisition
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Renseignez les détails de l'acquisition du bien
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative">
                        <label htmlFor="acquisitionDate" className={labelClasses}>
                            Date d'acquisition
                        </label>
                        <div className={iconWrapperClasses}>
                            <HiOutlineCalendar size={20} />
                        </div>
                        <input
                            type="date"
                            id="acquisitionDate"
                            name="acquisitionDate"
                            value={formData.acquisitionDate || ''}
                            onChange={onChange}
                            className={inputClasses}
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="acquisitionPrice" className={labelClasses}>
                            Prix d'acquisition (€)
                        </label>
                        <div className={iconWrapperClasses}>
                            <FaRegMoneyBillAlt size={20} />
                        </div>
                        <input
                            type="number"
                            id="acquisitionPrice"
                            name="acquisitionPrice"
                            value={formData.acquisitionPrice || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="200000"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="acquisitionFees" className={labelClasses}>
                            Frais d'acquisition (€)
                        </label>
                        <div className={iconWrapperClasses}>
                            <FaRegCreditCard size={20} />
                        </div>
                        <input
                            type="number"
                            id="acquisitionFees"
                            name="acquisitionFees"
                            value={formData.acquisitionFees || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="15000"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="agencyFees" className={labelClasses}>
                            Frais d'agence (€)
                        </label>
                        <div className={iconWrapperClasses}>
                            <BsBank2 size={20} />
                        </div>
                        <input
                            type="number"
                            id="agencyFees"
                            name="agencyFees"
                            value={formData.agencyFees || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="5000"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="currentValue" className={labelClasses}>
                            Valeur actuelle (€)
                        </label>
                        <div className={iconWrapperClasses}>
                            <BsBuilding size={20} />
                        </div>
                        <input
                            type="number"
                            id="currentValue"
                            name="currentValue"
                            value={formData.currentValue || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="250000"
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Informations fiscales
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Renseignez les informations fiscales du bien
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative">
                        <label htmlFor="taxRegime" className={labelClasses}>
                            Régime fiscal
                        </label>
                        <div className={iconWrapperClasses}>
                            <TbReceiptTax size={20} />
                        </div>
                        <select
                            id="taxRegime"
                            name="taxRegime"
                            value={formData.taxRegime || ''}
                            onChange={onChange}
                            className={selectClasses}
                        >
                            <option value="">Sélectionnez un régime</option>
                            <optgroup label="Régimes classiques">
                                <option value="CLASSIC_REAL_ESTATE_INCOME">Revenus fonciers - Régime réel</option>
                                <option value="CLASSIC_MICRO_REAL_ESTATE_INCOME">Revenus fonciers - Micro-foncier</option>
                                <option value="BIC_REAL">BIC - Régime réel</option>
                                <option value="BIC_MICRO">BIC - Micro-BIC</option>
                            </optgroup>
                            <optgroup label="Dispositifs Pinel">
                                <option value="PINEL_6_YEARS">Pinel 6 ans</option>
                                <option value="PINEL_9_YEARS">Pinel 9 ans</option>
                                <option value="PINEL_REHABILITATION">Pinel réhabilitation</option>
                            </optgroup>
                            <optgroup label="Dispositifs Besson">
                                <option value="BESSON_NEW">Besson neuf</option>
                                <option value="BESSON_OLD">Besson ancien</option>
                                <option value="BESSON_REHABILITATED">Besson réhabilité</option>
                            </optgroup>
                            <optgroup label="Dispositifs Robien">
                                <option value="ROBIEN_NEW">Robien neuf</option>
                                <option value="ROBIEN_RECENTERED">Robien recentré</option>
                                <option value="ROBIEN_RECENTERED_REHABILITATED">Robien recentré réhabilité</option>
                            </optgroup>
                            <optgroup label="Dispositifs Borloo">
                                <option value="BORLOO_NEW">Borloo neuf</option>
                                <option value="BORLOO_OLD">Borloo ancien</option>
                                <option value="BORLOO_REHABILITATED">Borloo réhabilité</option>
                            </optgroup>
                            <optgroup label="Dispositifs Scellier">
                                <option value="SCELLIER">Scellier</option>
                                <option value="SCELLIER_INTERMEDIATE">Scellier intermédiaire</option>
                                <option value="SCELLIER_REHABILITATION">Scellier réhabilitation</option>
                            </optgroup>
                            <optgroup label="Autres dispositifs">
                                <option value="DUFLOT_NEW">Duflot neuf</option>
                                <option value="DUFLOT_REHABILITATION">Duflot réhabilitation</option>
                                <option value="CENSI_BOUVARD">Censi-Bouvard</option>
                                <option value="HISTORICAL_MONUMENT">Monument historique</option>
                                <option value="MALRAUX">Malraux</option>
                                <option value="DENORMANDIE">Denormandie</option>
                            </optgroup>
                            <optgroup label="Structures juridiques">
                                <option value="SCI_IS">SCI à l'IS</option>
                                <option value="SCI_IR">SCI à l'IR</option>
                                <option value="SARL">SARL</option>
                                <option value="FAMILY_SARL">SARL familiale</option>
                                <option value="SAS">SAS</option>
                                <option value="OTHER_COMPANY">Autre société</option>
                            </optgroup>
                            <optgroup label="Autres">
                                <option value="DISMEMBERMENT">Démembrement</option>
                                <option value="ZRR">Zone de revitalisation rurale (ZRR)</option>
                                <option value="OTHER">Autre</option>
                            </optgroup>
                        </select>
                    </div>

                    <div className="relative">
                        <label htmlFor="siret" className={labelClasses}>
                            SIRET
                        </label>
                        <div className={iconWrapperClasses}>
                            <MdOutlineReceiptLong size={20} />
                        </div>
                        <input
                            type="text"
                            id="siret"
                            name="siret"
                            value={formData.siret || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="123 456 789 00012"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="activityStartDate" className={labelClasses}>
                            Date de début d'activité
                        </label>
                        <div className={iconWrapperClasses}>
                            <HiOutlineCalendar size={20} />
                        </div>
                        <input
                            type="date"
                            id="activityStartDate"
                            name="activityStartDate"
                            value={formData.activityStartDate || ''}
                            onChange={onChange}
                            className={inputClasses}
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="taxNumber" className={labelClasses}>
                            Numéro fiscal
                        </label>
                        <div className={iconWrapperClasses}>
                            <TbReceipt size={20} />
                        </div>
                        <input
                            type="text"
                            id="taxNumber"
                            name="taxNumber"
                            value={formData.taxNumber || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="FR 12 345 678 901"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="housingTax" className={labelClasses}>
                            Taxe d'habitation (€)
                        </label>
                        <div className={iconWrapperClasses}>
                            <TbReceiptTax size={20} />
                        </div>
                        <input
                            type="number"
                            id="housingTax"
                            name="housingTax"
                            value={formData.housingTax || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="800"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="propertyTax" className={labelClasses}>
                            Taxe foncière (€)
                        </label>
                        <div className={iconWrapperClasses}>
                            <TbReceiptTax size={20} />
                        </div>
                        <input
                            type="number"
                            id="propertyTax"
                            name="propertyTax"
                            value={formData.propertyTax || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="1200"
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}; 