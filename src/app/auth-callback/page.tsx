'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getAuthStatus } from './action'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null)
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const configurationId = localStorage.getItem('configurationId')
    const storedRedirectUrl = localStorage.getItem('redirectUrl')
    if (configurationId) setConfigId(configurationId)
    if (storedRedirectUrl) setRedirectUrl(storedRedirectUrl)
  }, [])

  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  })

  if (data?.success) {
    // Clean up localStorage
    localStorage.removeItem('configurationId')
    localStorage.removeItem('redirectUrl')
    
    // Redirect to stored URL, or preview page with configId, or home
    if (redirectUrl) {
      router.push(redirectUrl)
    } else if (configId) {
      router.push(`/configure/preview?id=${configId}`)
    } else {
      router.push('/')
    }
  }

  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-500' />
        <h3 className='font-semibold text-xl'>Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}

export default Page