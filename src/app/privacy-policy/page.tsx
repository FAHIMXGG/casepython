import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Privacy Policy | CasePython",
  description: "Read CasePython's Privacy Policy to understand how we collect, use, and protect your personal information when you use our custom phone case service.",
  image: "/thumbnail.png",
});

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-background">
      <section className="dark:bg-[#171412]">
        <MaxWidthWrapper className="py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Privacy <span className="bg-primary px-2 text-primary-foreground">Policy</span>
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
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p>
                  CasePython ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                  how we collect, use, disclose, and safeguard your information when you use our website and services.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Personal Information</h3>
                <p>We may collect the following personal information:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information (processed securely through third-party payment processors)</li>
                  <li>Account credentials and profile information</li>
                  <li>Order history and preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Images and Content</h3>
                <p>
                  We collect and store images you upload to create custom phone cases. These images are used solely for 
                  order fulfillment and are stored securely.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Automatically Collected Information</h3>
                <p>We may automatically collect certain information when you visit our website:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>IP address and browser type</li>
                  <li>Device information</li>
                  <li>Usage data and website interactions</li>
                  <li>Cookies and similar tracking technologies (see our Cookie Policy)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>To process and fulfill your orders</li>
                  <li>To communicate with you about your orders and account</li>
                  <li>To provide customer support and respond to inquiries</li>
                  <li>To improve our website and services</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To detect and prevent fraud</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
                <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>
                    <strong>Service Providers:</strong> We may share information with third-party service providers who 
                    perform services on our behalf (e.g., payment processing, shipping, email services)
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our 
                    rights and safety
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale, your information 
                    may be transferred
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> We may share information with your explicit consent
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information. 
                  However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute 
                  security.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Retention</h2>
                <p>
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                  policy, unless a longer retention period is required by law. Order information is typically retained 
                  for at least 7 years for accounting and legal purposes.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights and Choices</h2>
                <p>Depending on your location, you may have the following rights:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Access to your personal information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your information</li>
                  <li>Objection to processing of your information</li>
                  <li>Data portability</li>
                  <li>Withdrawal of consent</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Third-Party Services</h2>
                <p>
                  Our website may contain links to third-party websites or services. We are not responsible for the privacy 
                  practices of these third parties. We encourage you to read their privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
                  information from children. If you believe we have collected information from a child, please contact us 
                  immediately.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">10. International Data Transfers</h2>
                <p>
                  Your information may be transferred to and processed in countries other than your country of residence. 
                  These countries may have different data protection laws. By using our services, you consent to such transfers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by 
                  posting the new policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="mt-4">
                  Email:{" "}
                  <a href="mailto:ahasanulhaquefahimx@gmail.com" className="text-primary hover:underline">
                    ahasanulhaquefahimx@gmail.com
                  </a>
                </p>
                <p>
                  Or visit our{" "}
                  <a href="/contact" className="text-primary hover:underline">
                    Contact page
                  </a>
                </p>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

