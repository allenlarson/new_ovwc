'use client';

import { useState } from 'react';
import SectionReveal from '@/components/SectionReveal';
import ContactPopup from '@/components/ContactPopup';

const projects = [
  {
    title: 'Rick Barraza Real Estate',
    industry: 'Real Estate',
    desc: 'A luxury real estate platform for the Los Angeles market featuring IDX integration, community pages, and a custom property search experience.',
    gradient: 'from-amber-500/20 to-orange-600/20',
    accent: 'bg-amber-500',
    image: '/work/yourschome.png',
  },
  {
    title: 'San Clemente Properties',
    industry: 'Real Estate',
    desc: "Premium real estate website for Southern California's most trusted team, with community guides, portfolio listings, and lead generation tools.",
    gradient: 'from-red-500/20 to-rose-600/20',
    accent: 'bg-red-500',
    image: '/work/yourschome.png',
  },
  {
    title: 'Xperience Rewards',
    industry: 'Healthcare',
    desc: 'A rewards and loyalty platform for a med-spa chain, featuring treatment options, point tracking, and a seamless booking experience.',
    gradient: 'from-violet-500/20 to-purple-600/20',
    accent: 'bg-violet-500',
    image: '/work/yourschome.png',
  },
  {
    title: 'miraDry',
    industry: 'Healthcare',
    desc: 'National brand website for an FDA-cleared medical treatment, featuring provider locator, treatment education, and patient testimonials.',
    gradient: 'from-blue-500/20 to-cyan-600/20',
    accent: 'bg-blue-500',
    image: '/work/miradry.png',
  },
  {
    title: 'Eye Society Lashes',
    industry: 'Small Business',
    desc: 'A creative, brand-forward website for a luxury lash studio that captures the fun, premium experience of the brand.',
    gradient: 'from-pink-500/20 to-rose-600/20',
    accent: 'bg-pink-500',
    image: '/work/yourschome.png',
  },
  {
    title: 'Golden Coast Loans',
    industry: 'Finance',
    desc: 'A professional lending website with application flows, rate calculators, and trust-building design that drives loan applications.',
    gradient: 'from-emerald-500/20 to-teal-600/20',
    accent: 'bg-emerald-500',
    image: '/work/yourschome.png',
  },
  {
    title: 'Stately Distribution',
    industry: 'Distribution',
    desc: 'Stately Distribution is a full-service, licensed and vertically integrated cannabis operator in California.',
    gradient: 'from-emerald-500/20 to-teal-600/20',
    accent: 'bg-emerald-500',
    image: '/work/stately.png',
  },
];

export default function WorkPage() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 mesh-bg noise overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionReveal>
            <p className="text-sm uppercase tracking-widest text-accent-purple mb-4">
              Portfolio
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight mb-8">
              Our <span className="font-serif italic gradient-text">Work</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
              Real projects, real results. Here&apos;s a look at some of the
              websites and brands we&apos;ve brought to life.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <SectionReveal key={project.title} delay={i * 0.1}>
                <div className="group relative bg-card border border-card-border rounded-2xl overflow-hidden hover:border-accent-purple/30 transition-all duration-500">
                  {/* Image or gradient placeholder */}
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute top-0 left-0 w-full group-hover:-translate-y-[75%]"
                        style={{ transition: 'translate 4s ease-in-out' }}
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl font-medium text-foreground/5 group-hover:text-foreground/10 transition-colors duration-500">
                            {project.title
                              .split(' ')
                              .map((w: string) => w[0])
                              .join('')}
                          </span>
                        </div>
                        <div className="absolute inset-0 opacity-5">
                          {Array.from({ length: 40 }).map((_, j) => (
                            <div
                              key={j}
                              className="h-px bg-foreground"
                              style={{ marginTop: `${j * 2.5}%` }}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    {/* Industry badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full glass text-xs font-medium">
                        {project.industry}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-2 h-2 rounded-full ${project.accent}`}
                      />
                      <h3 className="text-xl font-medium">{project.title}</h3>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
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
              Your Project Could Be{' '}
              <span className="font-serif italic gradient-text">Next</span>
            </h2>
            <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
              Let&apos;s create something you&apos;re proud to show off. Every
              great website starts with a conversation.
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
