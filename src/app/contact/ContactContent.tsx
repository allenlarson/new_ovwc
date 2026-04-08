'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/SectionReveal';
import HeroSection from '@/components/HeroSection';

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send. Please try again.',
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <HeroSection
        tag="Get in Touch"
        heading={<>Let&apos;s <span className="font-serif italic gradient-text">Talk</span></>}
        subtext="Have a project in mind? We'd love to hear about it. Fill out the form below or reach out directly — either way, we'll get back to you within 24 hours."
      />

      {/* Contact Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info Sidebar */}
            <SectionReveal>
              <div className="space-y-10">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-accent-purple mb-4">
                    Location
                  </h3>
                  <p className="text-muted leading-relaxed">Norfolk, VA</p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-accent-purple mb-4">
                    Phone
                  </h3>
                  <a
                    href="tel:9492347170"
                    className="text-foreground hover:text-accent-pink transition-colors"
                  >
                    (949) 234-7170
                  </a>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-accent-purple mb-4">
                    Email
                  </h3>
                  <a
                    href="mailto:hello@ovwc.net"
                    className="text-foreground hover:text-accent-pink transition-colors"
                  >
                    hello@ovwc.net
                  </a>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-accent-purple mb-4">
                    Hours
                  </h3>
                  <p className="text-muted leading-relaxed">
                    Monday — Friday
                    <br />
                    9:00 AM — 5:00 PM EST
                  </p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-accent-purple mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    {[
                      {
                        label: 'Facebook',
                        path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
                      },
                      {
                        label: 'Instagram',
                        path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z',
                      },
                      {
                        label: 'LinkedIn',
                        path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z',
                      },
                    ].map(social => (
                      <a
                        key={social.label}
                        href="#"
                        aria-label={social.label}
                        className="w-10 h-10 rounded-full border border-card-border flex items-center justify-center hover:border-accent-pink hover:text-accent-pink transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={social.path}
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Contact Form */}
            <SectionReveal delay={0.2} className="lg:col-span-2">
              <div className="bg-card border border-card-border rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-pink to-transparent" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-medium mb-3">Message Sent!</h3>
                    <p className="text-muted text-lg mb-8">
                      Thanks for reaching out. We&apos;ll get back to you within
                      24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          service: '',
                          message: '',
                        });
                      }}
                      className="px-6 py-3 rounded-full border border-card-border hover:border-accent-purple/50 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-medium mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-muted mb-8">
                      Tell us about your project and we&apos;ll get back to you
                      with a custom proposal.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium mb-2"
                          >
                            Full Name *
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={e =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-purple transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium mb-2"
                          >
                            Email Address *
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-purple transition-colors"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium mb-2"
                          >
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-purple transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm font-medium mb-2"
                          >
                            Company Name
                          </label>
                          <input
                            id="company"
                            type="text"
                            value={formData.company}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                company: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-purple transition-colors"
                            placeholder="Your Company"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="service"
                          className="block text-sm font-medium mb-2"
                        >
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              service: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground focus:outline-none focus:border-accent-purple transition-colors"
                        >
                          <option value="" className="bg-background text-foreground">Select a service...</option>
                          <option value="web-design" className="bg-background text-foreground">Web Design & Development</option>
                          <option value="seo" className="bg-background text-foreground">Search Engine Optimization</option>
                          <option value="logo-design" className="bg-background text-foreground">Logo Design & Branding</option>
                          <option value="copywriting" className="bg-background text-foreground">Copywriting</option>
                          <option value="ecommerce" className="bg-background text-foreground">E-Commerce</option>
                          <option value="paid-ads" className="bg-background text-foreground">Paid Advertising</option>
                          <option value="multiple" className="bg-background text-foreground">Multiple Services</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-2"
                        >
                          Project Details *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-purple transition-colors resize-none"
                          placeholder="Tell us about your project, timeline, and budget..."
                        />
                      </div>
                      {error && (
                        <p className="text-red-400 text-sm text-center">
                          {error}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-pink to-accent-purple text-white font-medium text-lg hover:shadow-xl hover:shadow-accent-purple/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {sending ? 'Sending...' : 'Send Message'}
                      </button>
                      <p className="text-xs text-muted text-center">
                        We typically respond within 24 hours during business
                        days.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
