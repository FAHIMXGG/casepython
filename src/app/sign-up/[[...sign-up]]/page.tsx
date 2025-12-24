'use client';

import { useSignUp } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    code?: string;
    general?: string;
  }>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    code: '',
    general: '',
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  if (!signUp || !isLoaded) return null;

  // Handle submission of email and password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setIsLoading(true);

    try {
      // Create the sign-up attempt with first name, last name, username, email and password
      const result = await signUp.create({
        firstName,
        lastName,
        username,
        emailAddress,
        password,
      });

      // Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      setCodeSent(true);
      toast.success('Verification code sent! Check your email.');
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      if (err.errors && err.errors.length > 0) {
        const clerkErrors = err.errors;

        clerkErrors.forEach((error: any) => {
          switch (error.code) {
            case 'form_identifier_exists':
              setErrors((prev) => ({
                ...prev,
                email: 'Email address is already registered. Please sign in instead.',
              }));
              break;
            case 'form_first_name_missing':
            case 'form_first_name_invalid':
              setErrors((prev) => ({
                ...prev,
                firstName: 'First name is required and must be valid.',
              }));
              break;
            case 'form_last_name_missing':
            case 'form_last_name_invalid':
              setErrors((prev) => ({
                ...prev,
                lastName: 'Last name is required and must be valid.',
              }));
              break;
            case 'form_username_invalid':
            case 'form_username_invalid_length':
              setErrors((prev) => ({
                ...prev,
                username: 'Username is invalid or too short. Please choose a different username.',
              }));
              break;
            case 'form_username_exists':
              setErrors((prev) => ({
                ...prev,
                username: 'Username is already taken. Please choose a different username.',
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
                password: 'Password is too weak. Please choose a stronger password.',
              }));
              break;
            case 'form_param_format_invalid':
              if (error.meta?.paramName === 'username') {
                setErrors((prev) => ({
                  ...prev,
                  username: 'Username format is invalid.',
                }));
              } else {
                setErrors((prev) => ({
                  ...prev,
                  email: 'Please enter a valid email address.',
                }));
              }
              break;
            default:
              setErrors((prev) => ({
                ...prev,
                general: error.message || 'Failed to create account',
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

  // Handle code verification and complete sign-up
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setIsLoading(true);

    try {
      // Verify the email code
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        toast.success('Account created successfully!');
        router.push(redirectUrl);
      } else {
        setErrors({
          general: 'Verification incomplete. Please try again.',
        });
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      if (err.errors && err.errors.length > 0) {
        const clerkErrors = err.errors;

        clerkErrors.forEach((error: any) => {
          switch (error.code) {
            case 'form_code_incorrect':
              setErrors((prev) => ({
                ...prev,
                code: 'Invalid verification code. Please check and try again.',
              }));
              break;
            default:
              setErrors((prev) => ({
                ...prev,
                general: error.message || 'Failed to verify code',
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

  return (
    <div className="bg-background min-h-[calc(100vh-3.5rem-1px)] flex items-center justify-center py-12">
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Create your{' '}
            <span className="text-primary">CasePython</span> account
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign up to get started with custom phone cases
          </p>
        </div>

        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>
              {codeSent ? 'Verify your email' : 'Create your account'}
            </CardTitle>
            <CardDescription>
              {codeSent
                ? `Enter the verification code sent to ${emailAddress}`
                : 'Enter your information to create your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!codeSent ? (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        name="firstName"
                        placeholder="John"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      {errors.firstName && (
                        <div className="text-sm text-destructive">{errors.firstName}</div>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      {errors.lastName && (
                        <div className="text-sm text-destructive">{errors.lastName}</div>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2 mb-5">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="johndoe"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {errors.username && (
                      <div className="text-sm text-destructive">{errors.username}</div>
                    )}
                  </div>
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
                      <div className="text-sm text-destructive">{errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="grid gap-2 mb-3">
                  <Label htmlFor="password">Password</Label>
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <div className="text-sm text-destructive">{errors.password}</div>
                  )}
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Sending code...' : 'Continue'}
                </Button>

                {errors.general && (
                  <div className="mt-2 text-sm text-destructive text-center">
                    {errors.general}
                  </div>
                )}
              </form>
            ) : (
              <form onSubmit={handleVerifyCode}>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      type="text"
                      name="code"
                      placeholder="Enter 6-digit code"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      maxLength={6}
                    />
                    {errors.code && (
                      <div className="text-sm text-destructive">{errors.code}</div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Check your email for the verification code
                    </p>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? 'Verifying...' : 'Verify and Sign Up'}
                  </Button>

                  {errors.general && (
                    <div className="mt-2 text-sm text-destructive text-center">
                      {errors.general}
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={async () => {
                      try {
                        await signUp.prepareEmailAddressVerification({
                          strategy: 'email_code',
                        });
                        toast.success('New code sent! Check your email.');
                      } catch (err) {
                        toast.error('Failed to resend code');
                      }
                    }}
                    className="w-full"
                  >
                    Resend code
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setCodeSent(false);
                      setCode('');
                    }}
                    className="w-full"
                  >
                    Change email
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href={`/sign-in${redirectUrl !== '/' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`} className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
