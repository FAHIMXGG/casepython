import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import PhoneD from "@/components/PhoneD";
import Reviews from "@/components/Reviews";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/Icons";
import { ArrowRight, Check, Star, Upload, Palette, Smartphone, Shield, Lock, Truck, Clock, HelpCircle, Zap, Award } from "lucide-react";
import Link from "next/link";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "CasePython - Custom Phone Cases | Create Your Unique Design",
  description: "Create custom high-quality phone cases with your favorite images. Premium silicone cases with 5-year print guarantee. Support for iPhone 12, 13, 14, and 15. Fast shipping and wireless charging compatible.",
  image: "/thumbnail.png",
});

export default function Home() {
  return (
    <div className="bg-background">
      <section className="dark:bg-[#171412]">
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <img src="/snake-1.png" className="w-full transition-opacity duration-300 ease-in-out" alt="" />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-foreground text-5xl md:text-6xl lg:text-7xl">Your Image on a <span className="bg-primary px-2 text-primary-foreground">Custom</span> Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap text-muted-foreground">
                Capture your favorite memories with your own, <span className="font-semibold text-foreground">one-of-one</span> phone case.
                CasePython allows you to protect your memories, not just your phone case.
              </p>
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2 font-semibold">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    High-quality, durable material
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    5 year print guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-primary" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>

              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-border transition-opacity duration-300 ease-in-out" src="/users/user-1.png" alt="" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-border transition-opacity duration-300 ease-in-out" src="/users/user-2.png" alt="" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-border transition-opacity duration-300 ease-in-out" src="/users/user-3.png" alt="" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-border transition-opacity duration-300 ease-in-out" src="/users/user-4.jpg" alt="" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-border object-cover transition-opacity duration-300 ease-in-out" src="/users/user-5.jpg" alt="" />
                </div>

                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <Star className="h-4 w-4 text-primary fill-primary" />
                    <Star className="h-4 w-4 text-primary fill-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    <span className="font-semibold text-foreground">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 xl:mt-16 2xl:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <img src="/your-image.png" className="absolute w-40 lg:w-52 xl:w-44 2xl:w-52 left-56 xl:left-44 2xl:left-56 -top-20 xl:-top-16 2xl:-top-20 select-none hidden sm:block lg:hidden xl:block dark:hidden transition-opacity duration-300 ease-in-out" alt="" />
              <img src="/your-image-dark.png" className="absolute w-40 lg:w-52 xl:w-44 2xl:w-52 left-56 xl:left-44 2xl:left-56 -top-20 xl:-top-16 2xl:-top-20 select-none hidden sm:dark:block lg:hidden xl:dark:block transition-opacity duration-300 ease-in-out" alt="" />
              <img src="/line.png" className="absolute w-20 -left-6 -bottom-6 select-none transition-opacity duration-300 ease-in-out" alt="" />
              <PhoneD className="w-64 xl:w-56 2xl:w-64" imgSrc="https://anuzia5kxh.ufs.sh/f/wl7CbeyNKgIu0y5Ptjz5x4Xe7T2MzawWQZA3Vg1SDnlhb9id" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#F1F5F9] dark:bg-[#191817] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              How It <span className="bg-primary px-2 text-primary-foreground">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Creating your custom phone case is simple and takes just a few minutes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Upload Your Image</h3>
              <p className="text-muted-foreground">
                Choose your favorite photo or design. We support JPG, PNG, and HEIC formats.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Palette className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Customize Your Case</h3>
              <p className="text-muted-foreground">
                Select your phone model, case color, and preview your design in real-time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Order & Receive</h3>
              <p className="text-muted-foreground">
                Complete your order and receive your custom case within 5-7 business days.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-[#F1F5F9] dark:bg-[#191817] py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-foreground transition-colors duration-300">
              What our <span className="relative px-2 ">Customers <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-primary transition-colors duration-300" /> </span> say
            </h2>
            <img src="/snake-2.png" className="w-24 order-0 lg:order-2 transition-opacity duration-300 ease-in-out" alt="" />
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-primary fill-primary transition-colors duration-300" />
                <Star className="h-5 w-5 text-primary fill-primary transition-colors duration-300" />
                <Star className="h-5 w-5 text-primary fill-primary transition-colors duration-300" />
                <Star className="h-5 w-5 text-primary fill-primary transition-colors duration-300" />
                <Star className="h-5 w-5 text-primary fill-primary transition-colors duration-300" />
              </div>
              <div className="text-lg leading-8 text-foreground transition-colors duration-300">
                <p className="transition-colors duration-300">
                  &quot; The case feels durable and O even got a compliment on the design. Had the case for two and a half months now and <span className="p-0.5 bg-foreground text-background transition-colors duration-300">the image is super clear</span>, on the case I had before, the image started fading into yellow-ish color after a couple weeks. Love it. &quot;
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img src="/users/user-1.png" alt="user" className="rounded-full h-12 object-cover transition-opacity duration-300 ease-in-out" />
                <div className="flex flex-col">
                  <p className="font-semibold text-foreground transition-colors duration-300">Jonathan</p>
                  <div className="flex gap-1.5 items-center text-muted-foreground transition-colors duration-300">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600 transition-colors duration-300" />
                    <p className="text-sm transition-colors duration-300">
                      Verified Purchase
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5 mb-2">
                <Star className="h-5 w-5 text-primary fill-primary transition-colors duration-300" />
                <Star className="h-5 w-5 text-primary fill-primary transition-colors duration-300" />
                <Star className="h-5 w-5 text-primary fill-primary transition-colors duration-300" />
                <Star className="h-5 w-5 text-primary fill-primary transition-colors duration-300" />
                <Star className="h-5 w-5 text-primary fill-primary transition-colors duration-300" />
              </div>
              <div className="text-lg leading-8 text-foreground transition-colors duration-300">
                <p className="transition-colors duration-300">
                  &quot; I usually keep my phone together with my keys in my pocket and that led to some pretty heavy scratchmarks on all of my last phone cases. This one, besides a barely noticeable scratch on the corner,<span className="p-0.5 bg-foreground text-background transition-colors duration-300">looks brand new after about half a year</span>. I dig it. &quot;
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <img src="/users/user-4.jpg" alt="user" className="rounded-full h-12 object-cover transition-opacity duration-300 ease-in-out" />
                <div className="flex flex-col">
                  <p className="font-semibold text-foreground transition-colors duration-300">Josh</p>
                  <div className="flex gap-1.5 items-center text-muted-foreground transition-colors duration-300">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600 transition-colors duration-300" />
                    <p className="text-sm transition-colors duration-300">
                      Verified Purchase
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      {/* Features Section */}
      <section className="dark:bg-[#171412] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Why Choose <span className="bg-primary px-2 text-primary-foreground">CasePython</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Premium quality and exceptional service for your custom phone case needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Premium Protection</h3>
              <p className="text-muted-foreground">
                High-quality silicone material with scratch-resistant coating protects your device from everyday wear.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">5 Year Warranty</h3>
              <p className="text-muted-foreground">
                Our comprehensive print guarantee ensures your image stays vibrant for years to come.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Wireless Charging</h3>
              <p className="text-muted-foreground">
                Fully compatible with wireless charging technology - no need to remove your case.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Vibrant Printing</h3>
              <p className="text-muted-foreground">
                State-of-the-art printing technology ensures crisp, clear images that last.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Multiple Models</h3>
              <p className="text-muted-foreground">
                Support for iPhone 12, 13, 14, and 15 models with more coming soon.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Easy Process</h3>
              <p className="text-muted-foreground">
                Simple three-step process from upload to delivery. Create your case in minutes.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="dark:bg-[#171412]">
        <MaxWidthWrapper className="py-24">
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center"  >
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-foreground">
                Upload your photo and get <span className="relative px-2 bg-primary text-primary-foreground">your own case  </span> now
              </h2>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <img src="/arrow.png" className="dark:hidden absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0 transition-opacity duration-300 ease-in-out" alt="" />
              <img src="/arrow-dark.png" className="hidden dark:block absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0 transition-opacity duration-300 ease-in-out" alt="" />
              <div className='relative h-80 md:h-full w-full md:justify-self-end max-w-sm rounded-xl bg-muted ring-inset ring-border lg:rounded-2xl'>
                <img
                  src='https://anuzia5kxh.ufs.sh/f/wl7CbeyNKgIu2hNkbz5HTjZwRvP7QmLMaV3W6duOp5fDYsSn'
                  className='rounded-md object-cover bg-card shadow-2xl ring-1 ring-border h-full w-full transition-opacity duration-300 ease-in-out'
                  alt=""
                />
              </div>

              <PhoneD className="w-60" imgSrc="https://anuzia5kxh.ufs.sh/f/wl7CbeyNKgIu2hNkbz5HTjZwRvP7QmLMaV3W6duOp5fDYsSn"/>
            </div>
          </div>
          <ul className='mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit'>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              High-quality silicone material
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              Scratch- and fingerprint resistant coating
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />
              Wireless charging compatible
            </li>
            <li className='w-fit'>
              <Check className='h-5 w-5 text-green-600 inline mr-1.5' />5 year
              print warranty
            </li>

            <div className='flex justify-center'>
              <Link
                className={buttonVariants({
                  size: 'lg',
                  className: 'mx-auto mt-8',
                })}
                href='/configure/upload'>
                Create your case now <ArrowRight className='h-4 w-4 ml-1.5' />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>

      {/* Supported Models Section */}
      <section className="bg-[#F1F5F9] dark:bg-[#191817] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Supported <span className="bg-primary px-2 text-primary-foreground">Models</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We support a wide range of modern iPhone models
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto px-6">
            <div className="rounded-lg border border-border bg-card p-6 text-center hover:shadow-lg transition-shadow">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">iPhone 15</h3>
              <p className="text-sm text-muted-foreground">Latest model</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center hover:shadow-lg transition-shadow">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">iPhone 14</h3>
              <p className="text-sm text-muted-foreground">Popular choice</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center hover:shadow-lg transition-shadow">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">iPhone 13</h3>
              <p className="text-sm text-muted-foreground">Widely used</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center hover:shadow-lg transition-shadow">
              <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">iPhone 12</h3>
              <p className="text-sm text-muted-foreground">Still supported</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              More models coming soon! Have a different device? <Link href="/contact" className="text-primary hover:underline">Contact us</Link>
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Trust & Security Section */}
      <section className="dark:bg-[#171412] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Shop with <span className="bg-primary px-2 text-primary-foreground">Confidence</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Your security and satisfaction are our top priorities
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure Payment</h3>
              <p className="text-sm text-muted-foreground">
                All transactions are encrypted and secure. We accept all major payment methods.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Fast Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Orders processed within 2-3 business days. Most orders arrive within 5-7 days.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Satisfaction Guarantee</h3>
              <p className="text-sm text-muted-foreground">
                30-day satisfaction guarantee. Not happy? Contact us and we'll make it right.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Our support team is here to help. Get assistance anytime through your dashboard.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* FAQ Preview Section */}
      <section className="bg-[#F1F5F9] dark:bg-[#191817] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Frequently Asked <span className="bg-primary px-2 text-primary-foreground">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick answers to common questions about our custom phone cases
            </p>
          </div>
          <div className="max-w-3xl mx-auto px-6 space-y-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    How long does shipping take?
                  </h3>
                  <p className="text-muted-foreground">
                    Orders are typically processed within 2-3 business days and arrive within 5-7 business days after shipping.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Will the image fade over time?
                  </h3>
                  <p className="text-muted-foreground">
                    We use state-of-the-art printing technology with a 5-year print guarantee. If your image fades due to manufacturing defects, we'll replace it free of charge.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Are the cases compatible with wireless charging?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! Our cases are fully compatible with wireless charging technology. You won't need to remove your case when charging wirelessly.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    What image formats do you accept?
                  </h3>
                  <p className="text-muted-foreground">
                    We accept JPG, PNG, and HEIC formats. For best results, use high-resolution images (at least 2000x2000 pixels).
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/faq"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
              })}
            >
              View All FAQs <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>

    </div>
  );
}
