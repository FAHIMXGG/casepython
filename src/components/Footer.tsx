import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Mail, MessageSquare, Smartphone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className='bg-background border-t border-border'>
            <MaxWidthWrapper>
                <div className='py-12 md:py-16'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
                        {/* Company Info */}
                        <div className='space-y-4'>
                            <Link href='/' className='flex items-center font-semibold text-xl'>
                                case <span className='text-primary'>python</span>
                            </Link>
                            <p className='text-sm text-muted-foreground max-w-xs'>
                                Create custom high-quality phone cases with your favorite images. 
                                Premium protection with a 5-year print guarantee.
                            </p>
                            <div className='flex space-x-4 pt-2'>
                                <a
                                    href='https://www.facebook.com/FAHIMX007/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-muted-foreground hover:text-primary transition-colors'
                                    aria-label='Facebook'
                                >
                                    <Facebook className='h-5 w-5' />
                                </a>
                                <a
                                    href='https://x.com/fahim2259'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-muted-foreground hover:text-primary transition-colors'
                                    aria-label='X (Twitter)'
                                >
                                    <Twitter className='h-5 w-5' />
                                </a>
                                <a
                                    href='https://fahimx.vercel.app/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-muted-foreground hover:text-primary transition-colors'
                                    aria-label='Instagram'
                                >
                                    <Instagram className='h-5 w-5' />
                                </a>
                                <a
                                    href='https://www.youtube.com/@fahimx1426'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-muted-foreground hover:text-primary transition-colors'
                                    aria-label='YouTube'
                                >
                                    <Youtube className='h-5 w-5' />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className='space-y-4'>
                            <h3 className='font-semibold text-foreground'>Quick Links</h3>
                            <ul className='space-y-3'>
                                <li>
                                    <Link
                                        href='/'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/about'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/services'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/faq'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/configure/upload'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        Create Case
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Customer Support */}
                        <div className='space-y-4'>
                            <h3 className='font-semibold text-foreground'>Support</h3>
                            <ul className='space-y-3'>
                                <li>
                                    <Link
                                        href='/contact'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/dashboard/help-support'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/track'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        Track Order
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/services'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        Warranty Info
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href='/dashboard'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        My Account
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className='space-y-4'>
                            <h3 className='font-semibold text-foreground'>Get in Touch</h3>
                            <ul className='space-y-3'>
                                <li className='flex items-start gap-3'>
                                    <Mail className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                                    <a
                                        href='mailto:ahasanulhaquefahimx@gmail.com'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        ahasanulhaquefahimx@gmail.com
                                    </a>
                                </li>
                                <li className='flex items-start gap-3'>
                                    <MessageSquare className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                                    <Link
                                        href='/contact'
                                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                                    >
                                        Send us a message
                                    </Link>
                                </li>
                                <li className='flex items-start gap-3'>
                                    <Smartphone className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                                    <span className='text-sm text-muted-foreground'>
                                        Business Hours: Mon-Fri, 9AM-6PM EST
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='border-t border-border py-6'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                        <p className='text-sm text-muted-foreground text-center md:text-left'>
                            &copy; {currentYear} CasePython. All rights reserved.
                        </p>
                        <div className='flex flex-wrap items-center justify-center gap-6'>
                            <Link
                                href='/terms-of-service'
                                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href='/privacy-policy'
                                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href='/cookie-policy'
                                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                            >
                                Cookie Policy
                            </Link>
                            <Link
                                href='/services'
                                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                            >
                                Warranty
                            </Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    )
}

export default Footer