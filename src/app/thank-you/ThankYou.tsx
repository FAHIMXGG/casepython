'use client'

import React from 'react';
import { getPaymentStatus } from './actions';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

const ThankYou = () => {
    const searchParams = useSearchParams()
    const orderId = searchParams.get('orderId') || ''
    const {data} = useQuery({
        queryKey: ['payment-status'],
        queryFn: async () => await getPaymentStatus({orderId}),
        retry: true,
        retryDelay: 500,
    })
    return (
        <div>
            
        </div>
    );
};

export default ThankYou;