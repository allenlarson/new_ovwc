'use client';

import { useState } from 'react';
import SectionReveal from '@/components/SectionReveal';
import ContactPopup from '@/components/ContactPopup';
import CTASection from '@/components/CTASection';
import HeroSection from '@/components/HeroSection';
import { industryColors, industryOrder, projects } from '@/data/projects';

export default function WorkContent() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter(p => p.industry === activeFilter);

  return (
    <>
      <HeroSection
        tag="Portfolio"
        heading={<>Our <span className="font-serif italic gradient-text">Work</span></>}
        subtext="Real projects, real results. Here's a look at some of the websites and brands we've brought to life."
      />

      {/* Portfolio Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <SectionReveal>
            <div className="mb-12">
              {/* Mobile: dropdown */}
              <div className="md:hidden">
                <select
                  value={activeFilter}
                  onChange={e => setActiveFilter(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-card-border bg-background text-foreground text-sm font-medium appearance-none focus:outline-none focus:border-accent-purple/50 transition-colors duration-200"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem',
                  }}
                >
                  {industryOrder.map(industry => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {/* Desktop: pill buttons */}
              <div className="hidden md:flex flex-wrap gap-2">
                {industryOrder.map(industry => {
                  const colors = industryColors[industry];
                  const isActive = activeFilter === industry;
                  const isAll = industry === 'All';

                  return (
                    <button
                      key={industry}
                      onClick={() => setActiveFilter(industry)}
                      className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                      style={
                        isActive
                          ? isAll
                            ? {
                                background:
                                  'linear-gradient(to right, var(--color-accent-pink), var(--color-accent-purple))',
                                color: '#fff',
                                boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
                              }
                            : {
                                background: colors.bg,
                                color: colors.text,
                                border: `1px solid ${colors.border}`,
                                boxShadow: `0 4px 20px ${colors.shadow}`,
                              }
                          : {
                              background: 'var(--glass-bg)',
                              border: '1px solid var(--glass-border)',
                              color: 'var(--muted)',
                            }
                      }
                    >
                      {!isAll && (
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: colors.dot }}
                        />
                      )}
                      {industry}
                    </button>
                  );
                })}
              </div>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((project, i) => {
              const colors =
                industryColors[project.industry] ?? industryColors['Services'];

              return (
                <SectionReveal key={project.title} delay={(i % 2) * 0.1}>
                  <div
                    className="group relative bg-card border border-card-border rounded-2xl overflow-hidden transition-all duration-500"
                    style={{ ['--hover-border' as string]: colors.border }}
                    onMouseEnter={e =>
                      (e.currentTarget.style.borderColor = colors.border)
                    }
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
                  >
                    {/* Image area */}
                    <div
                      className="aspect-[16/10] relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${colors.bg}, ${colors.bg.replace('0.15', '0.25')})`,
                      }}
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute top-0 left-0 w-full group-hover:-translate-y-[75%]"
                          style={{ transition: 'translate 4s ease-in-out' }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl font-medium opacity-10">
                            {project.title
                              .split(' ')
                              .map(w => w[0])
                              .join('')}
                          </span>
                        </div>
                      )}

                      {/* Industry badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: colors.bg,
                            color: colors.text,
                            border: `1px solid ${colors.border}`,
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          {project.industry}
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: colors.dot }}
                        />
                        <h3 className="text-xl font-medium">{project.title}</h3>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">
                        {project.desc}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading={<>Your Project Could Be <span className="font-serif italic gradient-text">Next</span></>}
        subtext="Let's create something you're proud to show off. Every great website starts with a conversation."
        onCtaClick={() => setPopupOpen(true)}
      />

      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
