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
import { SignInButton, SignUpButton } from '@clerk/nextjs'

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[9999999] w-[90%] max-w-md p-4 sm:p-6 bg-white rounded-lg'>
        <DialogHeader>
          <div className='relative mx-auto w-16 h-16 sm:w-24 sm:h-24 mb-2'>
            <Image
              src='/snake-1.png'
              alt='snake image'
              className='object-contain'
              fill
            />
          </div>
          <DialogTitle className='text-2xl sm:text-3xl text-center font-bold tracking-tight text-gray-900'>
            Log in to continue
          </DialogTitle>
          <DialogDescription className='text-sm sm:text-base text-center py-2'>
            <span className='font-medium text-zinc-900'>
              Your configuration was saved!
            </span>{' '}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className='flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-6 sm:divide-x divide-gray-200'>
          <SignInButton>
            <button className={buttonVariants({ variant: 'default', className: 'w-full' })}>Sign In</button>
          </SignInButton>
          <SignUpButton>
            <button className={buttonVariants({ variant: 'default', className: 'w-full' })}>Sign up</button>
          </SignUpButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
