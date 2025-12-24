'use client'
import type { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import Image from 'next/image'
import { buttonVariants } from './ui/button'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [redirectUrl, setRedirectUrl] = useState<string>('')

  useEffect(() => {
    // Get configuration ID from localStorage or current URL
    const configId = localStorage.getItem('configurationId') || searchParams.get('id')
    
    if (configId) {
      // Redirect back to preview page with the configuration ID
      setRedirectUrl(`/configure/preview?id=${configId}`)
    } else if (pathname) {
      // Fallback to current page
      setRedirectUrl(pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''))
    } else {
      setRedirectUrl('/')
    }
  }, [pathname, searchParams])

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[9999999] w-[90%] max-w-md p-4 sm:p-6 bg-card rounded-lg border-border'>
        <DialogHeader>
          <div className='relative mx-auto w-16 h-16 sm:w-24 sm:h-24 mb-2'>
            <Image
              src='/snake-1.png'
              alt='snake image'
              className='object-contain'
              fill
            />
          </div>
          <DialogTitle className='text-2xl sm:text-3xl text-center font-bold tracking-tight text-foreground'>
            Log in to continue
          </DialogTitle>
          <DialogDescription className='text-sm sm:text-base text-center py-2'>
            <span className='font-medium text-foreground'>
              Your configuration was saved!
            </span>{' '}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-6 sm:divide-x divide-border'>
          <Link 
            href={`/sign-in${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
            onClick={() => setIsOpen(false)}
            className={buttonVariants({ variant: 'default', className: 'w-full' })}
          >
            Sign In
          </Link>
          <Link 
            href={`/sign-up${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
            onClick={() => setIsOpen(false)}
            className={buttonVariants({ variant: 'default', className: 'w-full' })}
          >
            Sign up
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
