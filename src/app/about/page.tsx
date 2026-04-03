'use client';

import { useState } from 'react';
import SectionReveal from '@/components/SectionReveal';
import ContactPopup from '@/components/ContactPopup';

const industries = [
  {
    name: 'Real Estate',
    desc: 'IDX-integrated property sites, community pages, and lead-generating platforms that help agents close more deals.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
        />
      </svg>
    ),
  },
  {
    name: 'Law Firms',
    desc: 'Authoritative, trust-building websites that convey expertise and convert visitors into consultations.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
        />
      </svg>
    ),
  },
  {
    name: 'Healthcare',
    desc: 'HIPAA-conscious designs with patient portals, appointment booking, and clear medical information architecture.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
  },
  {
    name: 'Small Business',
    desc: 'Affordable, high-impact websites that level the playing field against bigger competitors and drive local growth.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.999 2.999 0 002.25-1.016 2.999 2.999 0 002.25 1.016m0 0a2.999 2.999 0 002.25-1.016A2.999 2.999 0 0012 9.349m0 0a2.999 2.999 0 002.25-1.016A2.999 2.999 0 0016.5 9.35m-1.5-7.098l-3-1.5-3 1.5-3-1.5v14.25l3-1.5 3 1.5 3-1.5 3 1.5V.75l-3 1.5z"
        />
      </svg>
    ),
  },
  {
    name: 'Non-Profits',
    desc: 'Mission-driven websites with donation integration, event management, and storytelling that inspires action.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
  {
    name: 'Finance',
    desc: 'Credibility-first websites for CPAs, lenders, and advisors with client portals, lead funnels, and compliance-ready design.',
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
        />
      </svg>
    ),
  },
];

const values = [
  {
    title: 'Craft Over Convention',
    desc: "We don't use templates. Every project is designed from scratch to reflect your unique brand and goals.",
  },
  {
    title: 'Transparency Always',
    desc: "No jargon, no hidden costs, no surprises. You'll know exactly what's happening at every stage.",
  },
  {
    title: 'Results That Compound',
    desc: "We build assets, not expenses. Your website should generate more value every month it's live.",
  },
  {
    title: 'Partnership, Not Vendor',
    desc: "We invest in your success long-term. When you grow, we grow — that's the relationship we want.",
  },
];

export default function AboutPage() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 mesh-bg noise overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <p className="text-sm uppercase tracking-widest text-accent-purple mb-4">
              About Us
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight mb-8">
              The Team Behind
              <br />
              Your{' '}
              <span className="font-serif italic gradient-text">
                Digital Success
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              We&apos;re Oceanview Web Co — a premium web design and digital
              marketing agency. We build digital experiences that grow
              businesses.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <p className="text-sm uppercase tracking-widest text-accent-purple mb-4">
                Our Story
              </p>
              <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-8">
                About
                <br />
                <span className="font-serif italic gradient-text text-4xl md:text-5xl tracking-tight">
                  Oceanview Web Co.
                </span>
              </h2>
              <div className="space-y-6 text-muted leading-relaxed">
                <p>
                  What started as a one-person freelance operation has evolved
                  into a full-service digital agency. Allen Larson Creative was
                  born out of a passion for helping small businesses compete
                  online — designing websites, crafting brands, and driving real
                  results through digital marketing.
                </p>
                <p>
                  As the client roster grew and the work deepened, it became
                  clear that the brand needed to evolve too. Oceanview Web Co.
                  represents everything we&apos;ve become: a team-driven agency
                  with a broader vision, deeper capabilities, and the same
                  relentless commitment to quality that started it all.
                </p>
                <p>
                  The name captures the spirit of the work — where clarity meets
                  ambition. We bring that same energy to everything we build:
                  clean design, open communication, and the kind of
                  craftsmanship that stands the test of time.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2} direction="right">
              <div className="relative flex items-center justify-center p-8">
                <img
                  src="/ovwc_fin.svg"
                  alt="Oceanview Web Co"
                  className="w-full max-w-sm mx-auto"
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <p className="text-sm uppercase tracking-widest text-accent-purple mb-4 text-center">
              What We Believe
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-center mb-20">
              Our{' '}
              <span className="font-serif italic gradient-text">Values</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <SectionReveal key={value.title} delay={i * 0.1}>
                <div className="bg-card border border-card-border rounded-2xl p-8 hover:border-accent-purple/30 transition-all duration-500">
                  <span className="text-sm text-accent-purple">0{i + 1}</span>
                  <h3 className="text-xl font-medium mt-3 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{value.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <p className="text-sm uppercase tracking-widest text-accent-purple mb-4 text-center">
              Who We Serve
            </p>
            <h2 className="text-4xl md:text-5xl font-medium text-center mb-6">
              Industries We{' '}
              <span className="font-serif italic gradient-text">
                Specialize
              </span>{' '}
              In
            </h2>
            <p className="text-muted text-center max-w-xl mx-auto mb-20">
              While we work with businesses of all kinds, these are the
              industries where we have the deepest expertise and the strongest
              track record.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <SectionReveal key={industry.name} delay={i * 0.1}>
                <div className="bg-card border border-card-border rounded-2xl p-8 hover:border-accent-purple/30 transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-pink/10 to-accent-purple/10 flex items-center justify-center mb-6 text-accent-purple group-hover:from-accent-pink/20 group-hover:to-accent-purple/20 transition-colors">
                    {industry.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{industry.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {industry.desc}
                  </p>
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
              Let&apos;s Build Something
              <br />
              <span className="font-serif italic gradient-text">
                Remarkable
              </span>
            </h2>
            <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
              Ready to work with a team that treats your business like their
              own? Let&apos;s talk.
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
