"use client";
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

const Provider = ({children}: {children: React.ReactNode}) => {
    return (
        <ThemeProvider 
            attribute="class" 
            defaultTheme="light" 
            enableSystem={false}
            storageKey="casepython-theme"
            disableTransitionOnChange={false}
        >
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ThemeProvider>
    );
};

export default Provider;