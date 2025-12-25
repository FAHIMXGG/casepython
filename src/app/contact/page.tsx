"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Mail, MessageSquare, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (you can replace this with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-background">
      <section className="dark:bg-[#171412]">
        <MaxWidthWrapper className="py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Get in <span className="bg-primary px-2 text-primary-foreground">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
              Have a question? We're here to help! Reach out to us and we'll respond as soon as possible.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="bg-[#F1F5F9] dark:bg-[#191817] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-6">
                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Email</h3>
                      <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  <a
                    href="mailto:support@casepython.com"
                    className="text-primary hover:underline"
                  >
                    ahasanulhaquefahimx@gmail.com
                  </a>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Support</h3>
                      <p className="text-sm text-muted-foreground">Get help with your order</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/help-support"
                    className="text-primary hover:underline"
                  >
                    Visit Support Center
                  </Link>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Business Hours</h3>
                      <p className="text-sm text-muted-foreground">Monday - Friday</p>
                    </div>
                  </div>
                  <p className="text-foreground">9:00 AM - 6:00 PM EST</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-border bg-card p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Send us a Message
                  </h2>

                  {submitted ? (
                    <div className="rounded-lg bg-primary/10 border border-primary/20 p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Send className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Thank you for contacting us. We'll get back to you as soon as possible.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="text-primary hover:underline text-sm"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-foreground mb-2"
                          >
                            Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-foreground mb-2"
                          >
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What's this about?"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us how we can help..."
                          rows={6}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={buttonVariants({
                          size: "lg",
                          className: "w-full",
                        })}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      <section className="dark:bg-[#171412] py-24">
        <MaxWidthWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Other Ways to Reach Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Order Support
                </h3>
                <p className="text-muted-foreground mb-4">
                  Need help with an existing order? Track your order or manage it from your dashboard.
                </p>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                  })}
                >
                  Go to Dashboard
                </Link>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Warranty Claims
                </h3>
                <p className="text-muted-foreground mb-4">
                  Have a warranty claim? Visit our services page to learn more about our warranty coverage.
                </p>
                <Link
                  href="/services"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                  })}
                >
                  View Warranty Info
                </Link>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}

