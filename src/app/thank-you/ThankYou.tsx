'use client'

import React from 'react';
import { getPaymentStatus } from './actions';
import { useQuery } from '@tanstack/react-query';

const ThankYou = () => {

    const {} = useQuery({
        queryKey: ['payment-status'],
        queryFn: async () => await getPaymentStatus(),
    })
    return (
        <div>
            
        </div>
    );
};

export default ThankYou;