import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Tenant } from '../types';

export const useTenants = (currentStep: number) => {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

    useEffect(() => {
        if (currentStep === 2) {
            fetchTenants();
        }
    }, [currentStep]);

    const fetchTenants = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/role/tenant`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTenants(data);
            }
        } catch (err) {
            console.error('Erreur lors du chargement des locataires:', err);
        }
    };

    const searchTenants = debounce(async (query: string) => {
        if (!query) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/lastname/${query}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTenants(data);
            }
        } catch (err) {
            console.error('Erreur lors de la recherche des locataires:', err);
        }
    }, 300);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            searchTenants(query);
        } else {
            fetchTenants();
        }
    };

    return {
        tenants,
        searchQuery,
        selectedTenant,
        setSelectedTenant,
        handleSearchChange
    };
}; 