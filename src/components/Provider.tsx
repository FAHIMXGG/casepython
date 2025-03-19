"use client";
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

const Provider = () => {
    return <QueryClientProvider client={queryClient}></QueryClientProvider>;
};

export default Provider;