'use client';

import { useState } from 'react';
import SectionReveal from '@/components/SectionReveal';
import ContactPopup from '@/components/ContactPopup';

// Central color config — one source of truth per industry
const industryColors: Record<
  string,
  { bg: string; text: string; dot: string; border: string; shadow: string }
> = {
  Healthcare: {
    bg: 'rgba(139,92,246,0.15)',
    text: '#a78bfa',
    dot: '#8b5cf6',
    border: 'rgba(139,92,246,0.3)',
    shadow: 'rgba(139,92,246,0.25)',
  },
  'Real Estate': {
    bg: 'rgba(245,158,11,0.15)',
    text: '#fbbf24',
    dot: '#f59e0b',
    border: 'rgba(245,158,11,0.3)',
    shadow: 'rgba(245,158,11,0.25)',
  },
  'Small Business': {
    bg: 'rgba(236,72,153,0.15)',
    text: '#f472b6',
    dot: '#ec4899',
    border: 'rgba(236,72,153,0.3)',
    shadow: 'rgba(236,72,153,0.25)',
  },
  Finance: {
    bg: 'rgba(14,165,233,0.15)',
    text: '#38bdf8',
    dot: '#0ea5e9',
    border: 'rgba(14,165,233,0.3)',
    shadow: 'rgba(14,165,233,0.25)',
  },
  Distribution: {
    bg: 'rgba(16,185,129,0.15)',
    text: '#34d399',
    dot: '#10b981',
    border: 'rgba(16,185,129,0.3)',
    shadow: 'rgba(16,185,129,0.25)',
  },
  Technology: {
    bg: 'rgba(99,102,241,0.15)',
    text: '#818cf8',
    dot: '#6366f1',
    border: 'rgba(99,102,241,0.3)',
    shadow: 'rgba(99,102,241,0.25)',
  },
  Services: {
    bg: 'rgba(244,63,94,0.15)',
    text: '#fb7185',
    dot: '#f43f5e',
    border: 'rgba(244,63,94,0.3)',
    shadow: 'rgba(244,63,94,0.25)',
  },
  Law: {
    bg: 'rgba(234,88,12,0.15)',
    text: '#fb923c',
    dot: '#ea580c',
    border: 'rgba(234,88,12,0.3)',
    shadow: 'rgba(234,88,12,0.25)',
  },
};

const projects = [
  {
    title: 'RHA Collection',
    industry: 'Healthcare',
    desc: "Global brand site for Teoxane's line of resilient hyaluronic acid fillers, featuring treatment education, before-and-after galleries, and a provider locator.",
    image: '/work/rhacollection.webp',
  },
  {
    title: 'Revance Aesthetics',
    industry: 'Healthcare',
    desc: 'Brand and consumer website for a leading aesthetics company, highlighting DAXXIFY and RHA Collection with clinical resources, patient education, and injector tools.',
    image: '/work/revance.webp',
  },
  {
    title: 'Xperience Rewards',
    industry: 'Healthcare',
    desc: 'A rewards and loyalty platform for a med-spa chain, featuring treatment options, point tracking, and a seamless booking experience.',
    image: '/work/merzz.webp',
  },
  {
    title: 'miraDry',
    industry: 'Healthcare',
    desc: 'National brand website for an FDA-cleared medical treatment, featuring provider locator, treatment education, and patient testimonials.',
    image: '/work/miradry.png',
  },
  {
    title: 'Rick Barraza Real Estate',
    industry: 'Real Estate',
    desc: 'A luxury real estate platform for the Los Angeles market featuring IDX integration, community pages, and a custom property search experience.',
    image: '/work/united23.webp',
  },
  {
    title: 'San Clemente Properties',
    industry: 'Real Estate',
    desc: "Premium real estate website for Southern California's most trusted team, with community guides, portfolio listings, and lead generation tools.",
    image: '/work/yourschome.png',
  },
  {
    title: 'Eye Society Lashes',
    industry: 'Services',
    desc: 'A creative, brand-forward website for a luxury lash studio that captures the fun, premium experience of the brand.',
    image: '/work/eyesociety.webp',
  },
  {
    title: 'Confido CPA',
    industry: 'Finance',
    desc: 'A polished accounting firm website built to establish credibility and attract high-value clients, with service pages, team bios, and a streamlined consultation flow.',
    image: '/work/confidocpa.webp',
  },
  {
    title: 'Golden Coast Loans',
    industry: 'Finance',
    desc: 'A professional lending website with application flows, rate calculators, and trust-building design that drives loan applications.',
    image: '/work/goldencoast.webp',
  },
  {
    title: 'Stately Distribution',
    industry: 'Distribution',
    desc: 'Full-service brand site for a licensed and vertically integrated cannabis operator in California, featuring product lines, compliance info, and wholesale contact.',
    image: '/work/stately.png',
  },
  {
    title: 'May & Associates',
    industry: 'Finance',
    desc: 'A professional financial advisory website built to attract and convert high-net-worth clients, with service overviews, team credentials, and a seamless inquiry flow.',
    image: '/work/mayassociates.webp',
  },
  {
    title: 'Grochow Law',
    industry: 'Law',
    desc: 'A clean, authoritative law firm website designed to build immediate trust, highlight practice areas, and drive qualified consultation requests.',
    image: '/work/grochowlaw.webp',
  },
  {
    title: 'Prosper Homes & Investments',
    industry: 'Real Estate',
    desc: 'A results-driven real estate investment website featuring property listings, investor resources, and lead capture tools for buyers and sellers.',
    image: '/work/prosperhomes.webp',
  },
  {
    title: '8A Factoring',
    industry: 'Finance',
    desc: 'A focused financial services site for an invoice factoring company targeting small businesses, with clear product education and a fast application flow.',
    image: '/work/8afactoring.webp',
  },
  {
    title: 'Rivera Carbone PC',
    industry: 'Law',
    desc: 'Sophisticated law firm website for a professional corporation, showcasing litigation expertise, attorney profiles, and a trust-first client experience.',
    image: '/work/rcpc.webp',
  },
  {
    title: 'Nail Appeal',
    industry: 'Services',
    desc: 'A vibrant, on-brand website for a nail studio that showcases services, highlights nail art, and makes online booking effortless for returning and new clients.',
    image: '/work/nailappeal.webp',
  },
  {
    title: 'King Transactions',
    industry: 'Real Estate',
    desc: 'A streamlined real estate transaction coordination site built to attract agents and brokers, with service packages, process breakdowns, and easy onboarding.',
    image: '/work/kingtransactions.webp',
  },
  {
    title: '1st Home Care of VA',
    industry: 'Healthcare',
    desc: 'A compassionate, conversion-focused website for a Virginia home care agency, with service pages, caregiver info, and a simplified family inquiry process.',
    image: '/work/1sthomecare.webp',
  },
  {
    title: 'RYL Distribution',
    industry: 'Distribution',
    desc: 'A bold distribution company website featuring product catalog, territory coverage, and wholesale inquiry tools built to scale B2B relationships.',
    image: '/work/ryldistro.webp',
  },
  {
    title: "Christie's Cakes",
    industry: 'Services',
    desc: 'A stunning bakery website designed to showcase custom cake artistry, drive event bookings, and convert social media followers into paying clients.',
    image: '/work/christiescakes.webp',
  },
  {
    title: 'OhGuests',
    industry: 'Technology',
    desc: 'A modern SaaS platform website for a hospitality tech product, with feature highlights, pricing tiers, and an onboarding flow built to reduce friction.',
    image: '/work/ohguests.webp',
  },
  {
    title: 'TOM Agency',
    industry: 'Technology',
    desc: 'A sharp agency website for a tech-forward marketing firm, built to showcase services, attract enterprise clients, and position the brand as an industry leader.',
    image: '/work/tomagency.webp',
  },
  {
    title: 'Top Stone',
    industry: 'Services',
    desc: 'A polished website for a countertop and stone installation company, featuring material galleries, project showcases, and a quote request flow.',
    image: '/work/topstone.webp',
  },
  {
    title: 'KJT Trial Lawyers',
    industry: 'Law',
    desc: 'A bold, high-converting trial law website designed to establish authority, communicate case wins, and drive immediate contact from potential clients.',
    image: '/work/KJGTrialLawyers.webp',
  },
  {
    title: 'Trident Solar',
    industry: 'Services',
    desc: 'An energetic solar company website with educational content, savings calculators, and a lead generation system built to drive residential installations.',
    image: '/work/trident-solar.webp',
  },
  {
    title: 'Sweet as Love',
    industry: 'Services',
    desc: 'A whimsical, brand-forward website for a specialty dessert business, designed to delight visitors and convert them into loyal customers and event clients.',
    image: '/work/sweetaslove.webp',
  },
  {
    title: "Redd's Global Logistics",
    industry: 'Distribution',
    desc: 'A professional logistics and freight website built to establish credibility with enterprise clients, featuring service areas, capabilities, and a streamlined quote request.',
    image: '/work/reddgloballogistics.webp',
  },
  {
    title: 'SBA Realty',
    industry: 'Real Estate',
    desc: 'A clean, professional real estate brokerage site with agent profiles, property search, and neighborhood guides built to generate buyer and seller leads.',
    image: '/work/SBA-Realty.webp',
  },
  {
    title: 'Amethyst Decor',
    industry: 'Real Estate',
    desc: 'An elegant interior design and staging website showcasing before-and-after transformations, service packages, and a portfolio built to attract real estate clients.',
    image: '/work/amethystdecor.webp',
  },
  {
    title: 'Brand New Day Coaching',
    industry: 'Healthcare',
    desc: 'An uplifting health and wellness coaching website featuring program offerings, transformation stories, and a booking system that turns visitors into committed clients.',
    image: '/work/brandnewday.webp',
  },
  {
    title: 'Gold Coast Loans',
    industry: 'Finance',
    desc: 'A conversion-focused mortgage and lending website with loan product breakdowns, rate tools, and trust-building design that guides borrowers from inquiry to close.',
    image: '/work/goldencoast.webp',
  },
  {
    title: 'Cova Property Group',
    industry: 'Services',
    desc: 'A full-service property management website showcasing owner and tenant services, available units, and a seamless contact flow for landlords and investors.',
    image: '/work/covapg.webp',
  },
  {
    title: 'Shelf Life Distribution',
    industry: 'Distribution',
    desc: 'A clean B2B distribution site for a perishable goods operator, featuring product lines, cold chain capabilities, and a streamlined wholesale partnership inquiry.',
    image: '/work/shelf-life.webp',
  },
];

// Fixed order for the filter — includes Technology & Services even if no cards yet
const industryOrder = [
  'All',
  'Healthcare',
  'Real Estate',
  'Law',
  'Finance',
  'Distribution',
  'Technology',
  'Services',
];

export default function WorkPage() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter(p => p.industry === activeFilter);

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
