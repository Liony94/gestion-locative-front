'use client';

import { PaymentStatistics } from '@/types/payment';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpCircle, ArrowDownCircle, Clock, AlertCircle } from 'lucide-react';

interface PaymentStatisticsCardProps {
    statistics: PaymentStatistics;
}

export function PaymentStatisticsCard({ statistics }: PaymentStatisticsCardProps) {
    const stats = [
        {
            title: 'Total dû',
            value: formatPrice(statistics.totalDue),
            icon: ArrowUpCircle,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
            title: 'Total payé',
            value: formatPrice(statistics.totalPaid),
            icon: ArrowDownCircle,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-900/20'
        },
        {
            title: 'En attente',
            value: formatPrice(statistics.totalPending),
            icon: Clock,
            color: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20'
        },
        {
            title: 'En retard',
            value: formatPrice(statistics.totalLate),
            icon: AlertCircle,
            color: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-50 dark:bg-red-900/20'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <Card key={index} className="border-none shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                    <Icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
} 