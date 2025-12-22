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
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    code?: string;
    password?: string;
    general?: string;
  }>({
    email: '',
    code: '',
    password: '',
    general: '',
  });
  const router = useRouter();

  if (!signIn || !isLoaded) return null;

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setIsLoading(true);

    try {
      // Create a password reset attempt
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: emailAddress,
      });

      setEmailSent(true);
      toast.success('Password reset code sent! Check your inbox.');
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      if (err.errors && err.errors.length > 0) {
        const clerkErrors = err.errors;

        clerkErrors.forEach((error: any) => {
          switch (error.code) {
            case 'form_identifier_not_found':
              setErrors((prev) => ({
                ...prev,
                email: 'No account found with this email address.',
              }));
              break;
            case 'form_param_format_invalid':
              setErrors((prev) => ({
                ...prev,
                email: 'Please enter a valid email address.',
              }));
              break;
            default:
              setErrors((prev) => ({
                ...prev,
                general: error.message || 'Failed to send reset code',
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setIsLoading(true);

    try {
      // Reset the user's password
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword,
      });

      if (result?.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast.success('Password reset successful!');
        router.push('/');
      } else {
        setErrors({ general: 'Failed to reset password. Please try again.' });
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
                code: 'Invalid reset code. Please check and try again.',
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
            default:
              setErrors((prev) => ({
                ...prev,
                general: error.message || 'Failed to reset password',
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
            Reset your password
          </h1>
          <p className="text-sm text-gray-600">
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>
              {emailSent ? 'Reset your password' : 'Forgot password?'}
            </CardTitle>
            <CardDescription>
              {emailSent
                ? `Enter the code sent to ${emailAddress} and your new password`
                : "Enter your email address and we'll send you a reset code"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              <form onSubmit={handleSendCode}>
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

                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? 'Sending...' : 'Send reset code'}
                </Button>

                {errors.general && (
                  <div className="mt-2 text-sm text-red-600 text-center">
                    {errors.general}
                  </div>
                )}
              </form>
            ) : (
              <form onSubmit={handleResetPassword}>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="code">Reset Code</Label>
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
                      <div className="text-sm text-red-600">{errors.code}</div>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        placeholder="Enter new password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                      <div className="text-sm text-red-600">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? 'Resetting...' : 'Reset password'}
                  </Button>

                  {errors.general && (
                    <div className="mt-2 text-sm text-red-600 text-center">
                      {errors.general}
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEmailSent(false);
                      setCode('');
                      setNewPassword('');
                    }}
                    className="w-full"
                  >
                    Use different email
                  </Button>
                </div>
              </form>
            )}

            <div className="mt-4 text-center text-sm">
              Remember your password?{' '}
              <Link href="/sign-in" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

