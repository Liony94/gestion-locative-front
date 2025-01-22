'use client';

import { Receipt } from '@/types/document';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import { Download, Eye, Trash2 } from 'lucide-react';
import { api } from '@/services/api';
import { toast } from 'sonner';

interface DocumentListProps {
    documents: Receipt[];
    isLoading: boolean;
    onRefresh: () => void;
}

export default function DocumentList({ documents, isLoading, onRefresh }: DocumentListProps) {
    const handleDownload = async (receipt: Receipt) => {
        try {
            const response = await api.get(`/payments/${receipt.payment.id}/receipt/owner`, {
                responseType: 'blob',
                headers: {
                    Accept: 'application/pdf'
                }
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', receipt.fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success('Document téléchargé avec succès');
        } catch (error) {
            console.error('Erreur lors du téléchargement:', error);
            toast.error('Erreur lors du téléchargement du document');
        }
    };

    const handlePreview = async (document: Receipt) => {
        try {
            const response = await api.get(`/payments/${document.payment.id}/receipt/owner/preview`, {
                responseType: 'blob',
                headers: {
                    Accept: 'application/pdf'
                }
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Erreur lors de la prévisualisation:', error);
            toast.error('Erreur lors de la prévisualisation du document');
        }
    };

    const handleDelete = async (document: Receipt) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
            return;
        }

        try {
            await api.delete(`/payments/receipts/${document.id}`);
            toast.success('Document supprimé avec succès');
            onRefresh();
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            toast.error('Erreur lors de la suppression du document');
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-3">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
        );
    }

    if (documents.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                    Aucun document trouvé
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-gray-200 dark:border-gray-700">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                        <TableHead>Nom du document</TableHead>
                        <TableHead>Propriété</TableHead>
                        <TableHead>Locataire</TableHead>
                        <TableHead>Date de création</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.map((doc) => (
                        <TableRow key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <TableCell className="font-medium">{doc.fileName}</TableCell>
                            <TableCell>{doc.property.title}</TableCell>
                            <TableCell>
                                {doc.tenant.firstName} {doc.tenant.lastName}
                            </TableCell>
                            <TableCell>{formatDate(doc.generatedAt)}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handlePreview(doc)}
                                        title="Prévisualiser"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDownload(doc)}
                                        title="Télécharger"
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(doc)}
                                        title="Supprimer"
                                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
} 