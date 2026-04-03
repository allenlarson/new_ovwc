'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ContactPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactPopup({ open, onClose }: ContactPopupProps) {
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
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
        onClose();
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          >
            <div className="glass rounded-2xl p-8 w-full max-w-lg relative overflow-hidden">
              {/* Gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-pink to-transparent" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-foreground/5 transition-colors cursor-pointer"
                aria-label="Close popup"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium mb-2">Message Sent!</h3>
                  <p className="text-muted">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-medium mb-1">
                    Start a <span className="font-serif italic gradient-text">Project</span>
                  </h3>
                  <p className="text-muted text-sm mb-6">Tell us about your vision and we&apos;ll bring it to life.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Name *"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent-purple transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Email *"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent-purple transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent-purple transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent-purple transition-colors"
                      />
                    </div>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground text-sm focus:outline-none focus:border-accent-purple transition-colors"
                    >
                      <option value="">Select a Service</option>
                      <option value="web-design">Web Design</option>
                      <option value="seo">Search Engine Optimization</option>
                      <option value="logo-design">Logo Design</option>
                      <option value="copywriting">Copywriting</option>
                      <option value="ecommerce">E-Commerce</option>
                      <option value="paid-ads">Paid Advertising</option>
                    </select>
                    <textarea
                      placeholder="Tell us about your project *"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-card-border text-foreground placeholder:text-muted/60 text-sm focus:outline-none focus:border-accent-purple transition-colors resize-none"
                    />
                    {error && (
                      <p className="text-red-400 text-sm text-center">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-pink to-accent-purple text-white font-medium text-sm hover:shadow-lg hover:shadow-accent-purple/25 transition-all duration-300 hover:scale-[1.02] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {sending ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
