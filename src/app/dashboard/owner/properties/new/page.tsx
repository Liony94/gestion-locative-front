'use client';

import { useRouter } from 'next/navigation';
import { PropertyForm } from './components/PropertyForm';
import { usePropertyForm } from './hooks/usePropertyForm';
import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import React from 'react';

export default function NewPropertyPage() {
    const router = useRouter();
    const {
        formData,
        loading,
        error,
        success,
        handleChange,
        handleArrayChange,
        handleSubmit,
        handleImageChange,
        previewUrls,
        cleanup,
        removeImage,
        createdPropertyData
    } = usePropertyForm();

    useEffect(() => {
        if (success && createdPropertyData) {
            setTimeout(() => {
                router.push('/dashboard/owner/properties');
            }, 1500);
        }
    }, [success, createdPropertyData, router]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <div className="p-6">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Ajouter un nouveau bien
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Remplissez les informations ci-dessous pour créer un nouveau bien immobilier
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md">
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-md">
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Le bien a été créé avec succès ! Redirection en cours...
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-6">
                        <PropertyForm
                            formData={formData}
                            onChange={handleChange}
                            onArrayChange={handleArrayChange}
                            onImageChange={handleImageChange}
                            previewUrls={previewUrls}
                            onRemoveImage={removeImage}
                        />

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Création en cours...' : 'Créer le bien'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 