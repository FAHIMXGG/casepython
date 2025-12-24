"use client";

import { cn } from '@/lib/utils';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
    dark?: boolean; // Optional override prop
}

const Phone = ({ imgSrc, className, dark, ...props }: PhoneProps) => {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Use manual dark prop if provided, otherwise detect from theme
    const isDark = dark !== undefined 
        ? dark 
        : mounted && (resolvedTheme === "dark" || theme === "dark");

    const phoneTemplate = isDark 
        ? "/phone-template-dark.png"
        : "/phone-template-white-edges.png";

    return (
        <div className={cn('relative pointer-events-none z-50 overflow-hidden', className)} {...props}>
            <img 
                src={phoneTemplate}
                className='pointer-events-none z-50 select-none w-full h-full transition-opacity duration-300 ease-in-out'
                alt="" 
            />

            <div className='absolute -z-10 inset-0'>
                <img src={imgSrc} className='object-cover min-w-full min-h-full transition-opacity duration-300 ease-in-out' alt='overlaying phone image'/>
            </div>
        </div>
    );
};

export default Phone;