'use client';

import { useSignIn } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

export function SignInWithPasskeyButton() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const [isLoading, setIsLoading] = useState(false);

  const handlePasskeySignIn = async () => {
    if (!isLoaded || !signIn) {
      return;
    }

    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        strategy: 'passkey',
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        toast.success('Signed in with passkey!');
        window.location.href = '/';
      } else {
        toast.warning('Passkey sign-in incomplete');
      }
    } catch (err: any) {
      console.error('Passkey sign-in error:', err);
      if (err.errors && err.errors.length > 0) {
        const error = err.errors[0];
        toast.error(error.message || 'Failed to sign in with passkey');
      } else {
        toast.error('Failed to sign in with passkey');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handlePasskeySignIn}
      disabled={!isLoaded || isLoading}
      className="cursor-pointer"
    >
      {isLoading ? 'Loading...' : 'Sign in with Passkey'}
    </Button>
  );
}

