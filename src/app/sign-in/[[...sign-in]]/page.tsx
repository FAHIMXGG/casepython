'use client';

import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { OAuthStrategy } from '@clerk/types';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({
    email: '',
    password: '',
    general: '',
  });
  const router = useRouter();

  if (!signIn) return null;

  // Handle submission of the sign-up form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;
    setErrors({});

    setIsLoading(true);

    // Start the sign-up process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        toast.success('Login successful!');
        router.push('/');
      } else {
        // Handle other statuses like 'needs-second-factor', etc.
        toast.warning('Additional verification required');
        console.log('Sign-in status:', signInAttempt.status);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      if (err.errors && err.errors.length > 0) {
        const clerkErrors = err.errors;

        clerkErrors.forEach((error: any) => {
          switch (error.code) {
            case 'strategy_for_user_invalid':
              setErrors((prev) => ({
                ...prev,
                general:
                  'This account only supports Google Sign In. Please use the "Continue with Google" button.',
              }));
              break;
            case 'form_password_length_too_short':
              setErrors((prev) => ({
                ...prev,
                password: 'Passwords must be 8 characters or more.',
              }));
              break;
            case 'form_password_pwned':
              setErrors((prev) => ({
                ...prev,
                password: 'Password is too weak.',
              }));
              break;
            case 'form_identifier_exists':
              setErrors((prev) => ({
                ...prev,
                email: 'Email address is taken. Please try another.',
              }));
              break;
            default:
              setErrors((prev) => ({
                ...prev,
                general: error.message || 'Authentication failed',
              }));
          }
        });
      } else {
        setErrors({ general: 'An unexpected error occurred' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signInWith = async (strategy: OAuthStrategy) => {
    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: '/sign-up/sso-callback',
        redirectUrlComplete: '/',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err: any) => {
        // See https://clerk.com/docs/guides/development/custom-flows/error-handling
        // for more info on error handling
        console.log(err.errors);
        console.error(err, null, 2);
      });
  };

  const fillAdminCredentials = () => {
    setEmailAddress('silvia468@starmail.net');
    setPassword('casepass@12');
  };

  const fillUserCredentials = () => {
    setEmailAddress('ahasanulhaquefahim5@gmail.com');
    setPassword('casepass@12');
  };

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-3.5rem-1px)] flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24">
              <Image
                src="/snake-1.png"
                alt="CasePython logo"
                className="object-contain"
                fill
              />
            </div>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Welcome back to{' '}
            <span className="text-[#E4335A]">CasePython</span>
          </h1>
          <p className="text-sm text-gray-600">
            Sign in to continue to your account
          </p>
        </div>

        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 mb-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
                {errors.email && (
                  <div className="text-sm text-red-600">{errors.email}</div>
                )}
              </div>
            </div>

            <div className="grid gap-2 mb-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="text-sm text-red-600">{errors.password}</div>
              )}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Loading...' : 'Login'}
            </Button>

            {errors.general && (
              <div className="mt-2 text-sm text-red-600 text-center">
                {errors.general}
              </div>
            )}
          </form>

          <div className="flex flex-col mt-3 gap-3">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => signInWith('oauth_google')}
              >
                Continue with Google
              </Button>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={fillAdminCredentials}
              >
                Log in as admin
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={fillUserCredentials}
              >
                Login with user
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}

