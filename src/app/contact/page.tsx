'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/SectionReveal';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 mesh-bg noise overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <p className="text-sm uppercase tracking-widest text-accent-purple mb-4">Get in Touch</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight mb-8">
              Let&apos;s <span className="font-serif italic gradient-text">Talk</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              Have a project in mind? We&apos;d love to hear about it. Fill out the form below or reach out directly — either way, we&apos;ll get back to you within 24 hours.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info Sidebar */}
            <SectionReveal>
              <div className="space-y-10">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-accent-purple mb-4">Office</h3>
                  <p className="text-muted leading-relaxed">
                    Virginia Beach, VA 23462
                  </p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-accent-purple mb-4">Phone</h3>
                  <a href="tel:9492347170" className="text-foreground hover:text-accent-pink transition-colors">
                    (949) 234-7170
                  </a>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-accent-purple mb-4">Email</h3>
                  <a href="mailto:hello@ovwc.net" className="text-foreground hover:text-accent-pink transition-colors">
                    hello@ovwc.net
                  </a>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-accent-purple mb-4">Hours</h3>
                  <p className="text-muted leading-relaxed">
                    Monday — Friday
                    <br />
                    9:00 AM — 5:00 PM EST
                  </p>
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-accent-purple mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {['Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-10 h-10 rounded-full border border-card-border flex items-center justify-center hover:border-accent-pink hover:text-accent-pink transition-colors text-sm"
                      >
                        {social[0]}
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
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-medium mb-3">Message Sent!</h3>
                    <p className="text-muted text-lg mb-8">
                      Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
                      }}
                      className="px-6 py-3 rounded-full border border-card-border hover:border-accent-purple/50 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-2xl font-medium mb-2">Send Us a Message</h2>
                    <p className="text-muted mb-8">Tell us about your project and we&apos;ll get back to you with a custom proposal.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name *</label>
                          <input
                            id="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-purple transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-purple transition-colors"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                          <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-purple transition-colors"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium mb-2">Company Name</label>
                          <input
                            id="company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-purple transition-colors"
                            placeholder="Your Company"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium mb-2">Service Interested In</label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground focus:outline-none focus:border-accent-purple transition-colors"
                        >
                          <option value="">Select a service...</option>
                          <option value="web-design">Web Design & Development</option>
                          <option value="seo">Search Engine Optimization</option>
                          <option value="logo-design">Logo Design & Branding</option>
                          <option value="copywriting">Copywriting</option>
                          <option value="ecommerce">E-Commerce</option>
                          <option value="multiple">Multiple Services</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">Project Details *</label>
                        <textarea
                          id="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent-purple transition-colors resize-none"
                          placeholder="Tell us about your project, timeline, and budget..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-4 rounded-lg bg-gradient-to-r from-accent-pink to-accent-purple text-white font-medium text-lg hover:shadow-xl hover:shadow-accent-purple/20 transition-all duration-300 hover:scale-[1.02]"
                      >
                        Send Message
                      </button>
                      <p className="text-xs text-muted text-center">
                        We typically respond within 24 hours during business days.
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
