import { db } from '@/db';
import { notFound } from 'next/navigation';
import React from 'react';
import DesignPreview from './DesignPreview';
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Preview Your Custom Phone Case | CasePython",
  description: "Preview your custom phone case design before ordering. Review your case and proceed to checkout to complete your order.",
  image: "/thumbnail.png",
});

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    }
}

const page = async ({searchParams}: PageProps) => {
   const {id} = searchParams

   if(!id || typeof id !== 'string') {
    return notFound()
   }

   const configuration = await db.configuration.findUnique({
     where: {id},
   })

   if(!configuration) {
    return notFound()
   }
   return <DesignPreview configuration={configuration}/>
};

export default page;