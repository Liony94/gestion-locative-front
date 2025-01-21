'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentStatus } from '@/types/enums';
import { formatPrice } from '@/lib/utils';
import { Payment } from '@/types/payment';
import { useMemo } from 'react';

interface PaymentStatisticsProps {
    payments: Payment[];
}

export default function PaymentStatistics({ payments }: PaymentStatisticsProps) {
    const stats = useMemo(() => {
        const statistics = {
            totalDue: 0,
            totalPaid: 0,
            totalPending: 0,
            totalLate: 0,
        };

        payments.forEach((payment) => {
            statistics.totalDue += payment.amount;

            if (payment.status === PaymentStatus.PAID) {
                statistics.totalPaid += payment.amount;
            } else if (payment.status === PaymentStatus.PENDING) {
                statistics.totalPending += payment.amount;
            } else if (payment.status === PaymentStatus.LATE) {
                statistics.totalLate += payment.amount;
            }
        });

        return statistics;
    }, [payments]);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total dû</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatPrice(stats.totalDue)}</div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total payé</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                        {formatPrice(stats.totalPaid)}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">En attente</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">
                        {formatPrice(stats.totalPending)}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">En retard</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                        {formatPrice(stats.totalLate)}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 