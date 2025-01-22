'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import { User } from '@/types/user';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/services/api';
import { toast } from 'sonner';
import { DocumentType } from '@/types/document';
import { Loader2, Upload } from 'lucide-react';

interface UploadDocumentModalProps {
    onClose: () => void;
    properties: Property[];
    tenants: User[];
    onUploadComplete: () => void;
}

const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
    { value: 'RENT_RECEIPT', label: 'Quittance de loyer' },
    { value: 'LEASE', label: 'Bail' },
    { value: 'INVENTORY', label: 'État des lieux' },
    { value: 'OTHER', label: 'Autre' }
];

export default function UploadDocumentModal({
    onClose,
    properties,
    tenants,
    onUploadComplete
}: UploadDocumentModalProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedProperty, setSelectedProperty] = useState('');
    const [selectedTenant, setSelectedTenant] = useState('');
    const [documentType, setDocumentType] = useState<DocumentType>('OTHER');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile || !selectedProperty || !documentType) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('propertyId', selectedProperty);
            formData.append('tenantId', selectedTenant);
            formData.append('type', documentType);
            formData.append('description', description);

            await api.post('/payments/receipts/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Document téléversé avec succès');
            onUploadComplete();
            onClose();
        } catch (error) {
            console.error('Erreur lors du téléversement:', error);
            toast.error('Erreur lors du téléversement du document');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Ajouter un document</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="file">Document</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Type de document</Label>
                        <Select
                            value={documentType}
                            onValueChange={(value) => setDocumentType(value as DocumentType)}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                                {DOCUMENT_TYPES.map((type) => (
                                    <SelectItem key={type.value} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="property">Propriété</Label>
                        <Select
                            value={selectedProperty}
                            onValueChange={setSelectedProperty}
                            required
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une propriété" />
                            </SelectTrigger>
                            <SelectContent>
                                {properties.map((property) => (
                                    <SelectItem key={property.id} value={property.id.toString()}>
                                        {property.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tenant">Locataire (optionnel)</Label>
                        <Select
                            value={selectedTenant}
                            onValueChange={setSelectedTenant}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un locataire" />
                            </SelectTrigger>
                            <SelectContent>
                                {tenants.map((tenant) => (
                                    <SelectItem key={tenant.id} value={tenant.id.toString()}>
                                        {tenant.firstName} {tenant.lastName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (optionnel)</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Ajouter une description..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Téléversement...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Téléverser
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
} 