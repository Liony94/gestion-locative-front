import { PropertyFormData } from '../../types';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BsBuilding, BsCardChecklist } from 'react-icons/bs';
import { FaRegAddressCard } from 'react-icons/fa';

interface CadastralSectionProps {
    formData: PropertyFormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const CadastralSection = ({ formData, onChange }: CadastralSectionProps) => {
    const inputClasses = "mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200 pl-10";
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
    const iconClasses = "absolute left-3 top-[38px] text-gray-400 dark:text-gray-500";

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="border-b dark:border-gray-700 pb-4 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Informations cadastrales
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Renseignez les informations cadastrales du bien
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="relative">
                        <label htmlFor="lotNumber" className={labelClasses}>
                            Numéro de lot
                        </label>
                        <BsCardChecklist className={iconClasses} size={20} />
                        <input
                            type="text"
                            id="lotNumber"
                            name="lotNumber"
                            value={formData.lotNumber || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="Ex: Lot 123"
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="coownershipUnits" className={labelClasses}>
                            Tantièmes de copropriété
                        </label>
                        <BsBuilding className={iconClasses} size={20} />
                        <input
                            type="text"
                            id="coownershipUnits"
                            name="coownershipUnits"
                            value={formData.coownershipUnits || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="Ex: 150/1000"
                        />
                    </div>

                    <div className="relative md:col-span-2">
                        <label htmlFor="cadastralReference" className={labelClasses}>
                            Référence cadastrale
                        </label>
                        <HiOutlineDocumentText className={iconClasses} size={20} />
                        <input
                            type="text"
                            id="cadastralReference"
                            name="cadastralReference"
                            value={formData.cadastralReference || ''}
                            onChange={onChange}
                            className={inputClasses}
                            placeholder="Ex: Section B 1234"
                        />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            La référence cadastrale est disponible sur votre acte de propriété ou sur cadastre.gouv.fr
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}; 