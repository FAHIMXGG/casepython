import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Check, Heart, Shield, Sparkles } from "lucide-react";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "About CasePython - Our Story & Mission | Custom Phone Cases",
  description: "Learn about CasePython's mission to create unique, high-quality custom phone cases. Discover our story, values, and commitment to protecting your memories with premium materials and exceptional service.",
  image: "/thumbnail.png",
});

export default function About() {
  return (
    <div className="bg-background">
      <section className="dark:bg-[#171412]">
        <MaxWidthWrapper className="py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              About <span className="bg-primary px-2 text-primary-foreground">CasePython</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              We're passionate about helping you protect your memories, not just your phone.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-[#F1F5F9] dark:bg-[#191817] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                CasePython was born from a simple idea: your phone case should be as unique as you are. 
                We believe that the device you carry with you every day deserves more than just protection—it 
                deserves to tell your story.
              </p>
              <p>
                Founded with a mission to combine high-quality protection with personal expression, we've 
                helped thousands of customers turn their favorite photos into durable, beautiful phone cases. 
                Every case we create is a one-of-a-kind piece that protects both your device and your memories.
              </p>
              <p>
                We're committed to using premium materials, state-of-the-art printing technology, and 
                providing exceptional customer service. Your satisfaction is our top priority, and we 
                stand behind every case with our comprehensive warranty.
              </p>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="dark:bg-[#171412] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              What Sets Us Apart
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Custom Design
                  </h3>
                  <p className="text-muted-foreground">
                    Every case is unique. Upload your favorite photo and create a one-of-a-kind phone case 
                    that reflects your personality and style.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Premium Quality
                  </h3>
                  <p className="text-muted-foreground">
                    High-quality silicone material with scratch-resistant coating ensures your case and 
                    image stay beautiful for years to come.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    5 Year Warranty
                  </h3>
                  <p className="text-muted-foreground">
                    We're so confident in our print quality that we offer a 5-year print guarantee. 
                    If your image fades, we'll replace it.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Customer First
                  </h3>
                  <p className="text-muted-foreground">
                    Your satisfaction is our priority. We're here to help you create the perfect case 
                    and provide support every step of the way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-[#F1F5F9] dark:bg-[#191817] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Join Our Community
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Over 1,250 happy customers trust CasePython to protect their devices and showcase their memories. 
              Join us and create your custom phone case today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/configure/upload"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
              >
                Create Your Case
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

