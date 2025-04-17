'use client';

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAuthStatus } from "./action";

const page = () => {
    const [configID, setConfigID] = useState<string | null>(null)

    useEffect(() => {
        const configurationId = localStorage.getItem('configurationId')
        if (configurationId) setConfigID(configurationId)
    }, [])

    const {} = useQuery({
        queryKey: ['auth-callback'],
        queryFn: async () => await getAuthStatus(),
        retry: true,
        retryDelay: 500
    })
    return (
        <div>
            
        </div>
    );
};

export default page;