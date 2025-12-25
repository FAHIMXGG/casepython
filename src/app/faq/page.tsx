import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "FAQ - Frequently Asked Questions | CasePython Help Center",
  description: "Find answers to common questions about custom phone cases, ordering, shipping, warranty, and more. Get help with your CasePython order.",
  image: "/thumbnail.png",
});

const faqs = [
  {
    category: "Ordering & Shipping",
    questions: [
      {
        q: "How do I create a custom phone case?",
        a: "Creating your custom phone case is easy! Simply click 'Create case' in the navigation, upload your favorite image, select your phone model and case color, and place your order. You'll be able to preview your design before checkout.",
      },
      {
        q: "What phone models do you support?",
        a: "We support a wide range of modern iPhone models. When you start creating your case, you'll see all available models to choose from. We're constantly adding support for new models.",
      },
      {
        q: "How long does shipping take?",
        a: "Once your order is placed and payment is confirmed, we typically process and ship orders within 2-3 business days. Shipping times vary by location, but most orders arrive within 5-7 business days after shipping.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to many countries worldwide. Shipping costs and delivery times vary by location. You'll see available shipping options and costs during checkout.",
      },
    ],
  },
  {
    category: "Product & Quality",
    questions: [
      {
        q: "What material are the cases made from?",
        a: "Our cases are made from high-quality silicone material with a scratch- and fingerprint-resistant coating. This ensures excellent protection for your device while maintaining a premium look and feel.",
      },
      {
        q: "Will the image fade over time?",
        a: "We use state-of-the-art printing technology to ensure vibrant, long-lasting images. All cases come with our 5-year print guarantee - if your image fades due to manufacturing defects, we'll replace it free of charge.",
      },
      {
        q: "Are the cases compatible with wireless charging?",
        a: "Yes! Our cases are fully compatible with wireless charging technology. You won't need to remove your case when charging wirelessly.",
      },
      {
        q: "How durable are the cases?",
        a: "Our cases are designed to provide excellent protection for your device. The high-quality silicone material and scratch-resistant coating help protect against everyday wear and tear, though they're not designed to be drop-proof cases.",
      },
    ],
  },
  {
    category: "Warranty & Returns",
    questions: [
      {
        q: "What does the 5-year warranty cover?",
        a: "Our 5-year print guarantee covers image fading, discoloration, and manufacturing defects. If your case experiences any of these issues within 5 years of purchase, we'll replace it free of charge. Physical damage from drops or normal wear and tear are not covered.",
      },
      {
        q: "How do I make a warranty claim?",
        a: "To make a warranty claim, contact our support team through the Contact page or your dashboard. Provide your order number and photos of the issue. Our team will review your claim within 2-3 business days and ship a replacement if approved.",
      },
      {
        q: "Can I return my case if I'm not satisfied?",
        a: "We want you to be completely satisfied with your purchase. If you're not happy with your case, please contact our support team within 30 days of delivery. We'll work with you to resolve any issues, including returns or exchanges when appropriate.",
      },
      {
        q: "What if I receive a defective case?",
        a: "If you receive a case with manufacturing defects, contact us immediately. We'll send a replacement at no cost to you. This is covered under our warranty policy.",
      },
    ],
  },
  {
    category: "Design & Customization",
    questions: [
      {
        q: "What image formats do you accept?",
        a: "We accept common image formats including JPG, PNG, and HEIC. For best results, we recommend using high-resolution images (at least 2000x2000 pixels) to ensure your design looks crisp and clear on your case.",
      },
      {
        q: "Can I use any image I want?",
        a: "You can upload any personal image you own or have rights to use. Please ensure you have permission to use the image and that it doesn't violate any copyrights or trademarks. We reserve the right to reject inappropriate content.",
      },
      {
        q: "How do I ensure my image looks good on the case?",
        a: "For best results, use a high-resolution image (2000x2000 pixels or larger) with good lighting and contrast. Our design tool allows you to preview your case before ordering, so you can adjust and see exactly how it will look.",
      },
      {
        q: "Can I customize the case color?",
        a: "Yes! When creating your case, you can choose from a variety of case colors to complement your design. The available colors will be shown during the customization process.",
      },
    ],
  },
  {
    category: "Account & Support",
    questions: [
      {
        q: "How do I track my order?",
        a: "You can track your order by logging into your dashboard. Once your order ships, you'll receive a tracking number via email. You can also visit the Track page to check your order status.",
      },
      {
        q: "How do I contact customer support?",
        a: "You can reach our support team through the Contact page, or by accessing the Help & Support section in your dashboard. We typically respond within 24 hours during business days.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "If you need to modify or cancel your order, please contact us as soon as possible. We can often accommodate changes if the order hasn't entered production yet. Contact support through your dashboard for the fastest response.",
      },
      {
        q: "Do I need an account to place an order?",
        a: "While you can browse without an account, you'll need to create an account to place an order. This allows you to track your orders, manage your account, and access customer support more easily.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="bg-background">
      <section className="dark:bg-[#171412]">
        <MaxWidthWrapper className="py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Frequently Asked <span className="bg-primary px-2 text-primary-foreground">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Find answers to common questions about our custom phone cases, ordering process, and warranty.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-[#F1F5F9] dark:bg-[#191817] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-4xl">
            <div className="space-y-12">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <details
                        key={faqIndex}
                        className="group rounded-lg border border-border bg-card p-6"
                      >
                        <summary className="flex items-center justify-between cursor-pointer list-none">
                          <h3 className="text-lg font-semibold text-foreground pr-4">
                            {faq.q}
                          </h3>
                          <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="dark:bg-[#171412] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find what you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className={buttonVariants({
                  size: "lg",
                })}
              >
                Contact Us
              </Link>
              <Link
                href="/dashboard/help-support"
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                })}
              >
                Visit Support Center
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

