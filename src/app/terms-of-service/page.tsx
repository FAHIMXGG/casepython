import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Terms of Service | CasePython",
  description: "Read CasePython's Terms of Service. Understand the terms and conditions for using our custom phone case service, ordering, and warranty policies.",
  image: "/thumbnail.png",
});

export default function TermsOfService() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-background">
      <section className="dark:bg-[#171412]">
        <MaxWidthWrapper className="py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Terms of <span className="bg-primary px-2 text-primary-foreground">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-[#F1F5F9] dark:bg-[#191817] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-4xl prose prose-slate dark:prose-invert max-w-none">
            <div className="space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing or using CasePython's website and services, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
                <p>
                  CasePython provides custom phone case design and manufacturing services. We allow customers to upload 
                  images and create personalized phone cases for various iPhone models. Our services include design tools, 
                  order processing, manufacturing, and shipping.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts</h2>
                <p>
                  To place an order, you must create an account. You are responsible for maintaining the confidentiality 
                  of your account credentials and for all activities that occur under your account. You agree to notify 
                  us immediately of any unauthorized use of your account.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Orders and Payment</h2>
                <p>
                  When you place an order, you are making an offer to purchase our products. We reserve the right to 
                  accept or reject any order. All prices are in USD and are subject to change without notice. Payment 
                  must be made in full before we begin processing your order.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Content and Intellectual Property</h2>
                <p>
                  You retain ownership of any images you upload. However, by uploading content, you grant CasePython a 
                  license to use, reproduce, and modify your images solely for the purpose of creating and fulfilling 
                  your order. You represent and warrant that you own or have the right to use all content you upload 
                  and that it does not infringe on any third-party rights.
                </p>
                <p className="mt-4">
                  We reserve the right to refuse to print any content that we deem inappropriate, offensive, or that 
                  violates any laws or third-party rights.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Product Warranty</h2>
                <p>
                  We offer a 5-year print guarantee covering image fading, discoloration, and manufacturing defects. 
                  This warranty does not cover physical damage from drops, normal wear and tear, or damage from improper use. 
                  For warranty claims, please contact our support team.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Returns and Refunds</h2>
                <p>
                  We want you to be satisfied with your purchase. If you are not satisfied, please contact us within 30 days 
                  of delivery. We will work with you to resolve any issues, including returns or exchanges when appropriate. 
                  Custom products may not be eligible for return unless there is a manufacturing defect.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Shipping</h2>
                <p>
                  Orders are typically processed within 2-3 business days and shipped within 5-7 business days. Shipping 
                  times may vary based on location and carrier. We are not responsible for delays caused by shipping carriers 
                  or customs.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Limitation of Liability</h2>
                <p>
                  CasePython shall not be liable for any indirect, incidental, special, or consequential damages arising 
                  from your use of our services. Our total liability shall not exceed the amount you paid for the product 
                  in question.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Indemnification</h2>
                <p>
                  You agree to indemnify and hold CasePython harmless from any claims, damages, or expenses arising from 
                  your use of our services, violation of these terms, or infringement of any rights of another.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately 
                  upon posting. Your continued use of our services after changes are posted constitutes acceptance of the 
                  modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Governing Law</h2>
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction 
                  in which CasePython operates, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">13. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at{" "}
                  <a href="mailto:ahasanulhaquefahimx@gmail.com" className="text-primary hover:underline">
                    ahasanulhaquefahimx@gmail.com
                  </a>{" "}
                  or through our{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    Contact page
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

