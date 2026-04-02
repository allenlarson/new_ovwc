'use client';

import { useState } from 'react';
import SectionReveal from '@/components/SectionReveal';
import ContactPopup from '@/components/ContactPopup';

const services = [
  {
    id: 'web-design',
    num: '01',
    title: 'Web Design & Development',
    subtitle: 'Your website is your hardest-working employee.',
    desc: 'We design and develop custom websites that don\'t just look stunning — they convert. Every site we build is crafted from scratch with your brand, your audience, and your goals at the center. No templates, no shortcuts, no compromises.',
    features: [
      'Custom responsive design for all devices',
      'Lightning-fast load times and Core Web Vitals optimization',
      'SEO-ready architecture and semantic HTML',
      'Content management system integration',
      'Conversion-focused layouts and user flows',
      'ADA accessibility compliance',
    ],
  },
  {
    id: 'seo',
    num: '02',
    title: 'Search Engine Optimization',
    subtitle: 'Be found by the people who need you most.',
    desc: 'Rankings aren\'t vanity metrics — they\'re revenue. Our SEO strategies are built on real data, constant testing, and a deep understanding of how Google evaluates your site. We focus on sustainable growth that compounds month after month.',
    features: [
      'Comprehensive SEO audits and competitive analysis',
      'Keyword research and content strategy',
      'On-page optimization and technical SEO',
      'Local SEO and Google Business Profile management',
      'Link building and domain authority growth',
      'Monthly reporting with actionable insights',
    ],
  },
  {
    id: 'logo-design',
    num: '03',
    title: 'Logo Design & Branding',
    subtitle: 'First impressions are made in milliseconds.',
    desc: 'Your logo is the cornerstone of your brand identity. We design marks that are distinctive, versatile, and timeless — logos that work at any size, on any surface, and in any context. From initial concepts to complete brand guidelines.',
    features: [
      'Multiple initial logo concepts and revisions',
      'Full vector files for print and digital use',
      'Brand color palette and typography selection',
      'Brand guidelines document',
      'Business card and stationery design',
      'Social media brand kit',
    ],
  },
  {
    id: 'copywriting',
    num: '04',
    title: 'Copywriting',
    subtitle: 'The right words change everything.',
    desc: 'Great design gets attention. Great copy gets action. Our copywriters craft messaging that speaks directly to your audience, communicates your value, and guides visitors toward conversion — all while sounding authentically you.',
    features: [
      'Website page copy and headlines',
      'SEO-optimized blog content and articles',
      'Email marketing campaigns',
      'Brand voice development and messaging frameworks',
      'Landing page copy for paid campaigns',
      'Social media content strategy',
    ],
  },
  {
    id: 'ecommerce',
    num: '05',
    title: 'E-Commerce',
    subtitle: 'Sell more. Stress less.',
    desc: 'We build online stores that are as enjoyable to manage as they are to shop. From product pages to checkout flows, every element is optimized for conversion, speed, and scalability. Your store should grow with you, not hold you back.',
    features: [
      'Custom e-commerce design and development',
      'Secure payment gateway integration',
      'Inventory and order management systems',
      'Product photography optimization',
      'Shipping and tax configuration',
      'Abandoned cart recovery and upsell flows',
    ],
  },
];

export default function ServicesPage() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 mesh-bg noise overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <p className="text-sm uppercase tracking-widest text-accent-purple mb-4">What We Do</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight mb-8">
              Our <span className="font-serif italic gradient-text">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              Everything your business needs to dominate online — under one roof. From first impression to final conversion, we&apos;ve got you covered.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {services.map((service, i) => (
            <SectionReveal key={service.id}>
              <div
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start py-20 ${
                  i !== services.length - 1 ? 'border-b border-card-border' : ''
                }`}
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="text-sm text-accent-purple">{service.num}</span>
                  <h2 className="text-4xl md:text-5xl font-medium mt-2 mb-4">{service.title}</h2>
                  <p className="text-xl text-muted font-serif italic mb-6">{service.subtitle}</p>
                  <p className="text-muted leading-relaxed mb-8">{service.desc}</p>
                  <button
                    onClick={() => setPopupOpen(true)}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-medium hover:shadow-lg hover:shadow-accent-purple/20 transition-all duration-300 hover:scale-105"
                  >
                    Get Started
                  </button>
                </div>

                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-card border border-card-border rounded-2xl p-8">
                    <h3 className="text-sm uppercase tracking-widest text-accent-purple mb-6">What&apos;s Included</h3>
                    <ul className="space-y-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <svg className="w-5 h-5 shrink-0 mt-0.5 text-accent-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span className="text-muted">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <p className="text-sm uppercase tracking-widest text-accent-purple mb-4 text-center">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-medium text-center mb-20">
              Our <span className="font-serif italic gradient-text">Process</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Discovery', desc: 'We learn your business, audience, goals, and competition inside and out.' },
              { step: '02', title: 'Strategy', desc: 'Sitemap, wireframes, content plan, and technical architecture — all mapped before a pixel is placed.' },
              { step: '03', title: 'Design', desc: 'High-fidelity mockups you\'ll review and refine until every detail is perfect.' },
              { step: '04', title: 'Develop', desc: 'Clean, performant code. Tested on every device and browser. Built to last.' },
              { step: '05', title: 'Launch', desc: 'Deployment, training, and ongoing support. We\'re with you long after go-live.' },
            ].map((phase, i) => (
              <SectionReveal key={phase.step} delay={i * 0.1}>
                <div className="text-center bg-card border border-card-border rounded-2xl p-6 h-full hover:border-accent-purple/30 transition-all duration-500">
                  <span className="text-3xl font-medium gradient-text">{phase.step}</span>
                  <h3 className="text-lg font-medium mt-3 mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{phase.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 mesh-bg">
        <div className="max-w-4xl mx-auto text-center">
          <SectionReveal>
            <h2 className="text-4xl md:text-6xl font-medium mb-6">
              Ready to Get <span className="font-serif italic gradient-text">Started?</span>
            </h2>
            <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
              Tell us about your project and we&apos;ll send you a custom proposal within 48 hours.
            </p>
            <button
              onClick={() => setPopupOpen(true)}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-medium text-lg hover:shadow-xl hover:shadow-accent-purple/20 transition-all duration-300 hover:scale-105"
            >
              Start a Project
            </button>
          </SectionReveal>
        </div>
      </section>

      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
