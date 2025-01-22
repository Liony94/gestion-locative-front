'use client';

import { useState, useEffect } from 'react';
import { Receipt, Document } from '@/types/document';
import { Property } from '@/types/property';
import { User } from '@/types/user';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload, Filter, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DocumentList from './components/DocumentList';
import UploadDocumentModal from './components/UploadDocumentModal';
import { toast } from 'sonner';

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Receipt[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [tenants, setTenants] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<number | 'all'>('all');
    const [selectedTenant, setSelectedTenant] = useState<number | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [documentType, setDocumentType] = useState<'all' | 'rent_receipts' | 'leases' | 'inventories' | 'others'>('all');

    const fetchDocuments = async () => {
        try {
            setIsLoading(true);
            const [receiptsResponse, propertiesResponse, tenantsResponse] = await Promise.all([
                api.get<Receipt[]>('/payments/receipts'),
                api.get<Property[]>('/properties'),
                api.get<User[]>('/user/role/tenant')
            ]);

            setDocuments(receiptsResponse.data);
            setProperties(propertiesResponse.data);
            setTenants(tenantsResponse.data);
        } catch (error) {
            console.error('Erreur lors du chargement des documents:', error);
            toast.error('Erreur lors du chargement des documents');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    // Filtrer les documents
    const filteredDocuments = documents.filter(doc => {
        if (selectedProperty !== 'all' && doc.property.id !== selectedProperty) return false;
        if (selectedTenant !== 'all' && doc.tenant.id !== selectedTenant) return false;
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            return (
                doc.fileName.toLowerCase().includes(searchLower) ||
                doc.month.toLowerCase().includes(searchLower) ||
                doc.year.toString().includes(searchLower)
            );
        }
        return true;
    });

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Documents
                </h1>
                <Button
                    onClick={() => setShowUploadModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Upload className="h-4 w-4 mr-2" />
                    Ajouter un document
                </Button>
            </div>

            <div className="space-y-4">
                <Tabs
                    defaultValue="all"
                    value={documentType}
                    onValueChange={(value) => setDocumentType(value as typeof documentType)}
                    className="w-full"
                >
                    <TabsList className="grid grid-cols-5 w-full max-w-4xl bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-xl">
                        <TabsTrigger value="all">Tous</TabsTrigger>
                        <TabsTrigger value="rent_receipts">Quittances</TabsTrigger>
                        <TabsTrigger value="leases">Baux</TabsTrigger>
                        <TabsTrigger value="inventories">États des lieux</TabsTrigger>
                        <TabsTrigger value="others">Autres</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex flex-wrap gap-4">
                    {/* Filtres */}
                    <div className="flex-1 min-w-[200px]">
                        <Select
                            value={selectedProperty.toString()}
                            onValueChange={(value) => setSelectedProperty(value === 'all' ? 'all' : parseInt(value))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filtrer par propriété" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes les propriétés</SelectItem>
                                {properties.map((property) => (
                                    <SelectItem key={property.id} value={property.id.toString()}>
                                        {property.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <Select
                            value={selectedTenant.toString()}
                            onValueChange={(value) => setSelectedTenant(value === 'all' ? 'all' : parseInt(value))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filtrer par locataire" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les locataires</SelectItem>
                                {tenants.map((tenant) => (
                                    <SelectItem key={tenant.id} value={tenant.id.toString()}>
                                        {tenant.firstName} {tenant.lastName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex-1 min-w-[200px]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>

                <DocumentList
                    documents={filteredDocuments}
                    isLoading={isLoading}
                    onRefresh={fetchDocuments}
                />
            </div>

            {showUploadModal && (
                <UploadDocumentModal
                    onClose={() => setShowUploadModal(false)}
                    properties={properties}
                    tenants={tenants}
                    onUploadComplete={fetchDocuments}
                />
            )}
        </div>
    );
} 