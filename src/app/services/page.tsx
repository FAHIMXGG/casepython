import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Check, Shield, Smartphone, Zap, Palette, Award } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Services - Custom Phone Case Services & Warranty | CasePython",
  description: "Learn about CasePython's premium custom phone case services, 5-year print guarantee, warranty coverage, and what makes our cases special.",
  image: "/thumbnail.png",
});

export default function Services() {
  return (
    <div className="bg-background">
      <section className="dark:bg-[#171412]">
        <MaxWidthWrapper className="py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Our <span className="bg-primary px-2 text-primary-foreground">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Premium custom phone cases with comprehensive warranty protection
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-[#F1F5F9] dark:bg-[#191817] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Custom Design
                </h3>
                <p className="text-muted-foreground">
                  Upload any image and create a unique phone case that reflects your personal style. 
                  Our advanced printing technology ensures vibrant, long-lasting colors.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Multiple Models
                </h3>
                <p className="text-muted-foreground">
                  We support a wide range of modern iPhone models. Find the perfect fit for your device 
                  with our easy model selection process.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Wireless Charging
                </h3>
                <p className="text-muted-foreground">
                  Our cases are fully compatible with wireless charging technology. No need to remove 
                  your case when charging.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Durable Protection
                </h3>
                <p className="text-muted-foreground">
                  High-quality silicone material with scratch- and fingerprint-resistant coating provides 
                  excellent protection for your device.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Premium Quality
                </h3>
                <p className="text-muted-foreground">
                  We use only the highest quality materials and state-of-the-art printing technology to 
                  ensure your case looks great for years.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Easy Ordering
                </h3>
                <p className="text-muted-foreground">
                  Simple three-step process: upload your image, customize your case, and place your order. 
                  Fast shipping and secure checkout.
                </p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="dark:bg-[#171412] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg border border-border bg-card p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Warranty Information
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    5 Year Print Guarantee
                  </h3>
                  <p className="mb-4">
                    We're so confident in our print quality that we offer a comprehensive 5-year print guarantee. 
                    If your image fades, discolors, or becomes damaged due to manufacturing defects, we'll replace 
                    your case free of charge.
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Print fading or discoloration covered</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Manufacturing defects included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Free replacement within warranty period</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    What's Covered
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Image fading or color degradation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Print defects (blurriness, misalignment)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Material defects (cracking, peeling)</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    What's Not Covered
                  </h3>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>Physical damage from drops or impacts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>Damage from exposure to extreme temperatures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>Normal wear and tear (scratches from keys, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">•</span>
                      <span>Damage from improper use or modification</span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    How to Make a Warranty Claim
                  </h3>
                  <ol className="space-y-2 ml-4 list-decimal">
                    <li>Contact our support team through the <Link href="/contact" className="text-primary hover:underline">Contact page</Link> or your dashboard</li>
                    <li>Provide your order number and photos of the issue</li>
                    <li>Our team will review your claim within 2-3 business days</li>
                    <li>If approved, we'll ship a replacement case at no cost to you</li>
                  </ol>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  For questions about our warranty or to file a claim, please visit our{" "}
                  <Link href="/contact" className="text-primary hover:underline">Contact page</Link> or 
                  access support through your{" "}
                  <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link>.
                </p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-[#F1F5F9] dark:bg-[#191817] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Create Your Case?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start designing your custom phone case today with our easy-to-use design tool.
            </p>
            <Link
              href="/configure/upload"
              className={buttonVariants({
                size: "lg",
                className: "mx-auto",
              })}
            >
              Get Started
            </Link>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

