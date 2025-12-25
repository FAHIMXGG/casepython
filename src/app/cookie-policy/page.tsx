import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Cookie Policy | CasePython",
  description: "Learn about how CasePython uses cookies and similar tracking technologies on our website. Understand your cookie preferences and how to manage them.",
  image: "/thumbnail.png",
});

export default function CookiePolicy() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-background">
      <section className="dark:bg-[#171412]">
        <MaxWidthWrapper className="py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Cookie <span className="bg-primary px-2 text-primary-foreground">Policy</span>
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
                <h2 className="text-2xl font-bold text-foreground mb-4">1. What Are Cookies?</h2>
                <p>
                  Cookies are small text files that are placed on your device when you visit a website. They are widely 
                  used to make websites work more efficiently and provide information to website owners. Cookies allow a 
                  website to recognize your device and store some information about your preferences or past actions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Cookies</h2>
                <p>
                  CasePython uses cookies and similar tracking technologies to enhance your experience on our website. 
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>To enable essential website functionality</li>
                  <li>To remember your preferences and settings</li>
                  <li>To analyze website traffic and usage patterns</li>
                  <li>To improve our website and services</li>
                  <li>To provide personalized content and advertisements</li>
                  <li>To maintain your shopping cart and session information</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-4">Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function properly. They enable core functionality such 
                  as security, network management, and accessibility. You cannot opt-out of these cookies as they are 
                  essential for the website to work.
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Session management and authentication</li>
                  <li>Shopping cart functionality</li>
                  <li>Security and fraud prevention</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Performance Cookies</h3>
                <p>
                  These cookies help us understand how visitors interact with our website by collecting and reporting 
                  information anonymously. This helps us improve the way our website works.
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Website analytics and usage statistics</li>
                  <li>Error tracking and performance monitoring</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Functionality Cookies</h3>
                <p>
                  These cookies allow the website to remember choices you make (such as your username, language, or region) 
                  and provide enhanced, personalized features.
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>User preferences and settings</li>
                  <li>Language and region selection</li>
                  <li>Remembering your login status</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Targeting/Advertising Cookies</h3>
                <p>
                  These cookies may be set through our site by our advertising partners. They may be used to build a 
                  profile of your interests and show you relevant advertisements on other sites.
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Personalized advertising</li>
                  <li>Social media integration</li>
                  <li>Marketing campaign tracking</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Third-Party Cookies</h2>
                <p>
                  In addition to our own cookies, we may also use various third-party cookies to report usage statistics 
                  of the website and deliver advertisements. These third parties may include:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Analytics providers (e.g., Google Analytics)</li>
                  <li>Payment processors</li>
                  <li>Social media platforms</li>
                  <li>Advertising networks</li>
                </ul>
                <p className="mt-4">
                  These third parties may use cookies to collect information about your online activities across different 
                  websites. We do not control these third-party cookies, and you should review their privacy policies.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Managing Your Cookie Preferences</h2>
                <p>
                  You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you 
                  can usually modify your browser settings to decline cookies if you prefer. However, this may prevent you 
                  from taking full advantage of our website.
                </p>
                <p className="mt-4">
                  You can manage cookies through your browser settings. Here are links to instructions for popular browsers:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Safari
                    </a>
                  </li>
                  <li>
                    <a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Do Not Track Signals</h2>
                <p>
                  Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not 
                  want to have your online activity tracked. Currently, there is no standard for how DNT signals should be 
                  interpreted. As a result, we do not currently respond to DNT browser signals.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Updates to This Cookie Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
                  operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
                  new policy on this page and updating the "Last updated" date.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
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

