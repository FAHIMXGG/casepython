"use client"
//2259
import Confetti from 'react-dom-confetti';
import React, { useEffect, useState } from 'react';
import { Configuration } from '@prisma/client';
import Phone from '@/components/Phone';
import { COLORS, FINISHES, MODELS } from '@/validators/option-validator';
import { cn, formatPrice } from '@/lib/utils';
import { ArrowRight, Check } from 'lucide-react';
import { BASE_PRICE, PRODUCT_PRICE } from '@/config/products';
import { div } from 'framer-motion/client';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { createCheckoutSession } from './action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import LoginModal from '@/components/LoginModal';
import { useUser } from '@clerk/nextjs';
import PhoneDeep from '@/components/PhoneDeep';
import { Input } from '@/components/ui/input';
import { validateCoupon } from './coupon-actions';
import { savePendingOrder } from './pending-order-actions';
import { X, Ticket } from 'lucide-react';

const DesignPreview = ({ configuration }: { configuration: Configuration }) => {
    const router = useRouter()
    const {id} = configuration
    const  {user}  = useUser();
    //console.log(user)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false)
    const [couponCode, setCouponCode] = useState<string>("")
    const [appliedCoupon, setAppliedCoupon] = useState<{
      code: string;
      discount: number;
      description?: string | null;
    } | null>(null)
    const [couponError, setCouponError] = useState<string>("")
    const [validatingCoupon, setValidatingCoupon] = useState<boolean>(false)

    const [showConfetti, setShowConfetti] = useState<boolean>(false)
    useEffect(() => setShowConfetti(true), [])

    // Save pending order when user visits the page
    useEffect(() => {
        if (user && id) {
            savePendingOrder(id).catch((error) => {
                console.error('Failed to save pending order:', error)
            })
        }
    }, [user, id])

    const { color, model, finish, material } = configuration
    const tw = COLORS.find((supportedColor) => supportedColor.value === color)?.tw
    const { label: modelLabel } = MODELS.options.find(({ value }) => value === model)!

    let totalPrice = BASE_PRICE
    if(material === 'polycarbonate')
        totalPrice += PRODUCT_PRICE.material.polycarbonate
    if(finish === 'textured')
        totalPrice += PRODUCT_PRICE.finish.textured

    // Calculate discount
    const discountAmount = appliedCoupon
      ? (totalPrice * appliedCoupon.discount) / 100
      : 0
    const finalPrice = totalPrice - discountAmount

    const {mutate: createPaymentSession} = useMutation({
        mutationKey: ["get-checkout-session"],
        mutationFn: createCheckoutSession,
        onSuccess: ({url}) => {
           if (url) router.push(url)
            else throw new Error('unable to create checkout session')
        },
        onError: () => {
           toast('something went wrong', {
           
                       description: (<p className="text-foreground font-bold text-center">
                           There was an error on our end. Please try again.
                       </p>),
                       style: { backgroundColor: "red", color: "white" }
                   })
        }
    })

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponError("Please enter a coupon code")
            return
        }

        setValidatingCoupon(true)
        setCouponError("")

        try {
            const result = await validateCoupon(couponCode, totalPrice / 100)
            
            if (result.valid && result.coupon) {
                setAppliedCoupon(result.coupon)
                setCouponCode("")
                toast.success(`Coupon "${result.coupon.code}" applied! ${result.coupon.discount}% off`)
            } else {
                setCouponError(result.error || "Invalid coupon code")
                toast.error(result.error || "Invalid coupon code")
            }
        } catch (error) {
            setCouponError("Error validating coupon")
            toast.error("Error validating coupon")
        } finally {
            setValidatingCoupon(false)
        }
    }

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null)
        setCouponCode("")
        setCouponError("")
        toast.success("Coupon removed")
    }

    const handleCheckout = () => {
        if (user) {
            createPaymentSession({
                configId: id,
                couponCode: appliedCoupon?.code,
            })
        }
        else {
            localStorage.setItem('configurationId', id)
            setIsLoginModalOpen(true)
        }
    }

    return (
        <div>
            <div aria-hidden='true' className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
                <Confetti active={showConfetti} config={{ elementCount: 250, spread: 90 }} />
            </div>

            <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen}/>

            <div className='mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
                <div className='md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
                    <PhoneDeep className={cn(`bg-${tw}`, 'max-w-[150px] md:max-w-full')} imgSrc={configuration.croppedImageUrl!} />
                </div>
                <div className='mt-6 sm:col-span-9 md:row-end-1'>
                    <h3 className='text-3xl font-bold tracking-tight text-foreground transition-colors duration-300'>Your {modelLabel} Case</h3>
                    <div className='mt-3 flex items-center gap-1.5 text-base'>
                        <Check className='h-4 w-4 text-green-500' />
                        In stock and ready to ship
                    </div>
                </div>
                <div className='sm:col-span-12 md:col-span-9 text-base'>
                    <div className='grid grid-cols-1 gap-y-8 border-t border-border py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10 transition-colors duration-300'>
                        <div>
                            <p className='font-medium text-foreground transition-colors duration-300'>Highlights</p>
                            <ol className='mt-3 text-muted-foreground list-disc list-inside transition-colors duration-300'>
                                <li>Wireless Charging compatible</li>
                                <li>Customizable design</li>
                                <li>Secure and protected</li>
                                <li>5-year print warranty</li>
                                <li>Scratch-and fingerprint resistant coating</li>
                                <li>100% satisfaction guaranteed</li>
                                <li>Available in various colors</li>
                            </ol>
                        </div>
                        <div>
                            <p className='font-medium text-foreground transition-colors duration-300'>Materials</p>
                            <ol className='mt-3 text-muted-foreground list-disc list-inside transition-colors duration-300'>
                                <li>High-quality, durable material</li>
                                <li>Modern iPhone models supported</li>
                                <li>Customizable stain-resistant coating</li>
                            </ol>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className='bg-muted/50 p-6 sm:rounded-lg sm:p-8 transition-colors duration-300'>
                            <div className='flow-root text-sm' >
                                <div className='flex items-center justify-between py-1 mt-2 '>
                                    <p className='text-muted-foreground transition-colors duration-300'>Base price</p>
                                    <p className='font-medium text-foreground transition-colors duration-300'>{formatPrice(BASE_PRICE / 100)}</p>
                                </div>
                                {finish === 'textured' ? (<div className='flex items-center justify-between py-1 mt-2 '>
                                    <p className='text-muted-foreground transition-colors duration-300'>Textured finish</p>
                                    <p className='font-medium text-foreground transition-colors duration-300'>{formatPrice(PRODUCT_PRICE.finish.textured / 100)}</p>
                                </div>) : null}
                                {material === 'polycarbonate' ? (<div className='flex items-center justify-between py-1 mt-2 '>
                                    <p className='text-muted-foreground transition-colors duration-300'>Soft polycarbonate material</p>
                                    <p className='font-medium text-foreground transition-colors duration-300'>{formatPrice(PRODUCT_PRICE.material.polycarbonate / 100)}</p>
                                </div>) : null}

                                {appliedCoupon ? (
                                    <div className='flex items-center justify-between py-1 mt-2'>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-muted-foreground transition-colors duration-300'>Discount ({appliedCoupon.code})</p>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className='h-4 w-4 p-0'
                                                onClick={handleRemoveCoupon}
                                            >
                                                <X className='h-3 w-3' />
                                            </Button>
                                        </div>
                                        <p className='font-medium text-green-600 dark:text-green-400 transition-colors duration-300'>
                                            -{formatPrice(discountAmount / 100)}
                                        </p>
                                    </div>
                                ) : null}

                                <div className='my-2 h-px bg-border transition-colors duration-300'/>
                                <div className='flex items-center justify-between py-2 '>
                                    <p className='font-semibold text-foreground transition-colors duration-300'>Order total</p>
                                    <p className='font-semibold text-foreground transition-colors duration-300'>{formatPrice(finalPrice / 100)}</p>
                                </div>
                            </div>

                            {/* Coupon Code Input */}
                            <div className='mt-4 pt-4 border-t border-border'>
                                {appliedCoupon ? (
                                    <div className='flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20'>
                                        <div className='flex items-center gap-2'>
                                            <Ticket className='h-4 w-4 text-green-600 dark:text-green-400' />
                                            <div>
                                                <p className='text-sm font-medium text-foreground'>{appliedCoupon.code}</p>
                                                {appliedCoupon.description && (
                                                    <p className='text-xs text-muted-foreground'>{appliedCoupon.description}</p>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleRemoveCoupon}
                                            className='h-8'
                                        >
                                            <X className='h-4 w-4' />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className='space-y-2'>
                                        <div className='flex gap-2'>
                                            <Input
                                                placeholder="Enter coupon code"
                                                value={couponCode}
                                                onChange={(e) => {
                                                    setCouponCode(e.target.value.toUpperCase())
                                                    setCouponError("")
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleApplyCoupon()
                                                    }
                                                }}
                                                className='flex-1'
                                            />
                                            <Button
                                                onClick={handleApplyCoupon}
                                                disabled={validatingCoupon || !couponCode.trim()}
                                                variant="outline"
                                            >
                                                {validatingCoupon ? "Applying..." : "Apply"}
                                            </Button>
                                        </div>
                                        {couponError && (
                                            <p className='text-sm text-red-600 dark:text-red-400'>{couponError}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='mt-8 flex justify-end pb-12'>
                            <Button onClick={() => handleCheckout()} className='px-4 sm:px-6 lg:px-8'>Check Out <ArrowRight className='h-4 w-4 ml-1.5 inline' /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesignPreview;