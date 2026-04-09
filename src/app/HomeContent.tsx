'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionReveal from '@/components/SectionReveal';
import ContactPopup from '@/components/ContactPopup';
import CTASection from '@/components/CTASection';
import { services } from '@/data/services';
import { whyUs } from '@/data/whyUs';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';

export default function HomeContent() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  return (
    <>
      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-bg noise">
        {/* Abstract 3D mesh lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute top-1/4 -right-20 w-[800px] h-[800px] opacity-[0.07]"
            viewBox="0 0 800 800"
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <ellipse
                key={i}
                cx="400"
                cy="400"
                rx={100 + i * 20}
                ry={60 + i * 12}
                fill="none"
                stroke="url(#heroGrad)"
                strokeWidth="0.5"
                transform={`rotate(${i * 9} 400 400)`}
              />
            ))}
            <defs>
              <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9d174d" />
                <stop offset="100%" stopColor="#4c1d95" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className="absolute -bottom-40 -left-40 w-[600px] h-[600px] opacity-[0.05]"
            viewBox="0 0 600 600"
          >
            {Array.from({ length: 15 }).map((_, i) => (
              <circle
                key={i}
                cx="300"
                cy="300"
                r={50 + i * 25}
                fill="none"
                stroke="url(#heroGrad2)"
                strokeWidth="0.5"
              />
            ))}
            <defs>
              <linearGradient
                id="heroGrad2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4c1d95" />
                <stop offset="100%" stopColor="#9d174d" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[0.95] tracking-tight mb-8">
              We Build Websites
              <br />
              That Turn Visitors
              <br />
              Into{' '}
              <span className="font-serif italic gradient-text">Clients</span>
            </h1>
            <p className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed text-muted">
              Premium web design and digital marketing for businesses ready to
              grow. Your success is our craft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setPopupOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white font-medium hover:shadow-xl hover:shadow-accent-purple/20 transition-all duration-300 hover:scale-105"
              >
                Start a Project
              </button>
              <Link
                href="/work"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full border border-card-border text-foreground font-medium hover:border-accent-purple hover:text-white hover:bg-accent-purple/20 hover:shadow-lg hover:shadow-accent-purple/20 transition-all duration-300 gradient-border"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>

          {/* Bottom stat */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-24 flex items-center gap-3"
          >
            <span className="text-7xl font-extrabold gradient-text">50+</span>
            <span className="text-sm text-muted leading-tight">
              5 Star Google
              <br />
              Reviews
            </span>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════ SERVICES ════════════════════════════════ */}
      <section className="py-32 px-6 relative" id="services">
        {/* SVG gradient definition for icons */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient
              id="icon-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="var(--color-accent-pink)" />
              <stop offset="100%" stopColor="var(--color-accent-purple)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <h2 className="text-4xl md:text-6xl font-medium text-center mb-20 tracking-tight">
              Our
              <span className="font-serif italic gradient-text"> Services</span>
            </h2>
          </SectionReveal>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Central gradient burst */}
            <div
              className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <div
                className="w-[480px] h-[480px] rounded-full blur-[120px] opacity-25"
                style={{
                  background:
                    'radial-gradient(circle, #ec4899 0%, #9d174d 30%, #4c1d95 60%, transparent 80%)',
                }}
              />
            </div>

            {services.map((service, i) => (
              <SectionReveal key={service.num} delay={i * 0.1}>
                <div className="group relative z-10 bg-card border border-card-border rounded-2xl p-8 h-full transition-all duration-500 overflow-hidden
                  hover:border-accent-pink/60
                  hover:shadow-[0_0_40px_-8px_rgba(236,72,153,0.45)]">
                  {/* Hover gradient fill */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(157,23,77,0.18) 0%, rgba(76,29,149,0.18) 100%)' }}
                  />
                  {/* Abstract wave top */}
                  <div className="absolute top-0 left-0 right-0 h-32 overflow-hidden opacity-30">
                    <svg
                      className="w-full"
                      viewBox="0 0 400 100"
                      preserveAspectRatio="none"
                    >
                      {Array.from({ length: 8 }).map((_, j) => (
                        <path
                          key={j}
                          d={`M0,${50 + j * 5} Q100,${20 + j * 8} 200,${50 + j * 3} T400,${40 + j * 6}`}
                          fill="none"
                          stroke="rgba(139,92,246,0.15)"
                          strokeWidth="0.5"
                        />
                      ))}
                    </svg>
                  </div>
                  <span className="relative text-sm text-muted">{service.num}</span>
                  <div className="relative my-4 group-hover:scale-110 transition-transform duration-500 origin-left">
                    <service.icon
                      className="w-12 h-12 stroke-[1.5]"
                      style={{ stroke: 'url(#icon-gradient)' }}
                    />
                  </div>
                  <h3 className="relative text-lg font-medium tracking-wide mb-3">
                    {service.title}
                  </h3>
                  <p className="relative text-sm text-muted leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <Link
                    href="/services"
                    className="relative inline-flex items-center gap-2 text-sm font-medium gradient-text group-hover:gap-3 transition-all"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ STATS ════════════════════════════════ */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6">
              Built for{' '}
              <span className="font-serif italic gradient-text">
                Businesses
              </span>{' '}
              that mean it.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-8 mb-20">
              <p className="text-muted leading-relaxed">
                We started with a simple idea: great design should do more than
                look good — it should work. Every site we build is engineered to
                attract, engage, and convert.
              </p>
              <p className="text-muted leading-relaxed">
                From solo operators to multi-location brands, we deliver digital
                experiences that perform — pairing sharp design with strategy
                that moves the needle.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-[3fr_5fr] gap-12 items-center">
            {/* Stats */}
            <div className="space-y-10">
              {[
                {
                  value: '10+',
                  label: 'Years',
                  detail: 'of Experience',
                },
                {
                  value: '150+',
                  label: 'Websites',
                  detail: 'Built & Launched',
                },
                {
                  value: '100%',
                  label: 'Client',
                  detail: 'Satisfaction Rate',
                },
              ].map((stat, i) => (
                <SectionReveal
                  key={stat.value}
                  delay={i * 0.15}
                  direction="left"
                >
                  <div className="border-b border-card-border pb-8">
                    <span className="text-5xl md:text-7xl font-bold gradient-text tracking-tight">
                      {stat.value}
                    </span>
                    <p className="mt-2 text-muted">
                      <span className="text-foreground text-xl  font-medium">
                        {stat.label}
                      </span>{' '}
                      <span className="text-xl text-muted">{stat.detail}</span>
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>

            {/* Visual */}
            <SectionReveal delay={0.2} direction="right">
              <div className="relative flex items-center justify-center py-8 px-6">

                {/* Glow */}
                <div className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
                  style={{ background: 'radial-gradient(circle, #9d174d, #4c1d95)' }} />

                {/* Main browser card */}
                <div className="relative w-full glass rounded-2xl overflow-hidden border border-card-border shadow-2xl">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-5 py-4 border-b border-card-border bg-foreground/5">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                    <div className="ml-3 flex-1 rounded-full bg-foreground/10 h-5 px-3 flex items-center">
                      <div className="w-32 h-2 rounded-full bg-foreground/20" />
                    </div>
                  </div>
                  {/* Screen content */}
                  <div className="p-7 space-y-4">
                    <div className="h-36 rounded-xl bg-gradient-to-br from-accent-pink/20 to-accent-purple/20 border border-card-border flex items-center justify-center">
                      <div className="text-3xl font-serif italic gradient-text">Your Brand Here</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {['Home', 'About', 'Services'].map(l => (
                        <div key={l} className="h-9 rounded-lg bg-foreground/5 border border-card-border flex items-center justify-center">
                          <span className="text-sm text-muted">{l}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2.5">
                      {[100, 75, 88].map((w, i) => (
                        <div key={i} className="h-2.5 rounded-full bg-foreground/5" style={{ width: `${w}%` }} />
                      ))}
                    </div>
                    <div className="h-10 rounded-xl w-1/2 mx-auto"
                      style={{ background: 'linear-gradient(to right, #9d174d, #4c1d95)' }} />
                  </div>
                </div>

                {/* Floating badge — top right */}
                <div className="absolute -top-2 right-4 glass rounded-xl px-4 py-2.5 border border-card-border shadow-lg flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium">Live & Converting</span>
                </div>

                {/* Floating badge — bottom left */}
                <div className="absolute -bottom-2 left-4 glass rounded-xl px-4 py-2.5 border border-card-border shadow-lg flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <div>
                    <p className="text-sm font-medium leading-none">4–6 Weeks</p>
                    <p className="text-sm text-muted leading-none mt-1">Avg. Launch Time</p>
                  </div>
                </div>

              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ WHY CHOOSE US ════════════════════════════════ */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionReveal>
                <h2 className="text-5xl md:text-7xl font-medium leading-[0.95] mb-16">
                  Why
                  <br />
                  <span className="font-serif italic gradient-text">
                    Choose Us
                  </span>
                </h2>
              </SectionReveal>

              <div className="space-y-0">
                {whyUs.map((item, i) => (
                  <SectionReveal key={item.num} delay={i * 0.1}>
                    <div className="border-t border-card-border py-8 group">
                      <div className="flex items-start gap-6">
                        <div className="shrink-0">
                          <span className="text-sm text-accent-purple">
                            {item.num}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium tracking-wide mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>

            {/* Process visual */}
            <SectionReveal delay={0.3} direction="right">
              <div className="relative flex flex-col items-center justify-center gap-0 py-4">

                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #9d174d, #4c1d95)' }} />

                {/* Step cards */}
                {[
                  {
                    step: '01',
                    title: 'Discovery & Strategy',
                    desc: 'We learn your business, audience, and goals before a single pixel is placed.',
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.25 48.25 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                      </svg>
                    ),
                  },
                  {
                    step: '02',
                    title: 'Design & Build',
                    desc: 'Pixel-perfect design paired with clean, performant code built to convert.',
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                      </svg>
                    ),
                  },
                  {
                    step: '03',
                    title: 'Launch & Grow',
                    desc: 'We don\'t disappear after launch — we optimize, track, and help you scale.',
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <div key={item.step} className="w-full max-w-sm">
                    <div className="glass border border-card-border rounded-2xl p-5 flex items-start gap-4 hover:border-accent-purple/40 transition-all duration-300 relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at top left, rgba(157,23,77,0.08), transparent 70%)' }} />
                      <div className="shrink-0 flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, rgba(157,23,77,0.2), rgba(76,29,149,0.2))', border: '1px solid rgba(157,23,77,0.3)' }}>
                          <div style={{ color: '#a78bfa' }}>{item.icon}</div>
                        </div>
                        <span className="text-xs text-accent-purple font-medium">{item.step}</span>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{item.title}</h4>
                        <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    {/* Connector line — flush between cards */}
                    {i < 2 && (
                      <div className="flex justify-start pl-[2.3rem]">
                        <div className="w-px h-6"
                          style={{ background: 'linear-gradient(to bottom, #9d174d, #4c1d95)' }} />
                      </div>
                    )}
                  </div>
                ))}

                {/* Bottom result badge */}
                <div className="glass border border-card-border rounded-2xl px-6 py-4 w-full max-w-sm flex items-center justify-between"
                  style={{ borderColor: 'rgba(157,23,77,0.3)', background: 'linear-gradient(135deg, rgba(157,23,77,0.08), rgba(76,29,149,0.08))' }}>
                  <div>
                    <p className="text-xs text-muted">Average result</p>
                    <p className="font-medium gradient-text">+200% More Leads</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ TESTIMONIALS ════════════════════════════════ */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <SectionReveal>
            <h2 className="text-4xl md:text-5xl font-medium text-center mb-4">
              What Our{' '}
              <span className="font-serif italic gradient-text">Clients</span>{' '}
              Say
            </h2>
            <p className="text-muted text-center mb-16 max-w-lg mx-auto">
              Don&apos;t just take our word for it — hear from the businesses
              we&apos;ve helped grow.
            </p>
          </SectionReveal>

          <div className="relative max-w-3xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-card-border rounded-2xl p-10 md:p-12 text-center"
            >
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({
                  length: testimonials[currentTestimonial].rating,
                }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-lg md:text-xl leading-relaxed mb-8 text-foreground/90">
                &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
              </blockquote>

              <div>
                <p className="font-semibold gradient-text text-lg">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-sm text-muted">
                  {testimonials[currentTestimonial].company}
                </p>
              </div>
            </motion.div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() =>
                  setCurrentTestimonial(prev =>
                    prev === 0 ? testimonials.length - 1 : prev - 1,
                  )
                }
                className="w-12 h-12 rounded-full border border-card-border flex items-center justify-center hover:border-accent-pink hover:text-accent-pink transition-colors"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentTestimonial
                        ? 'w-8 bg-gradient-to-r from-accent-pink to-accent-purple'
                        : 'w-2 bg-card-border hover:bg-foreground/30'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentTestimonial(prev =>
                    prev === testimonials.length - 1 ? 0 : prev + 1,
                  )
                }
                className="w-12 h-12 rounded-full border border-card-border flex items-center justify-center hover:border-accent-pink hover:text-accent-pink transition-colors"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ FAQ ════════════════════════════════ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
      <section className="py-32 px-6 relative" id="faq">
        <div className="max-w-3xl mx-auto">
          <SectionReveal>
            <h2 className="text-4xl md:text-5xl font-medium text-center mb-4">
              Frequently Asked{' '}
              <span className="font-serif italic gradient-text">Questions</span>
            </h2>
            <p className="text-muted text-center mb-16 max-w-lg mx-auto">
              Everything you need to know before starting your project with us.
            </p>
          </SectionReveal>

          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="border-b border-card-border">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full py-6 flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="text-lg font-medium pr-8 group-hover:text-accent-pink transition-colors">
                      {faq.q}
                    </span>
                    <svg
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 text-muted ${
                        activeFaq === i ? 'rotate-45 text-accent-pink' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                  <div
                    className="accordion-content"
                    style={{
                      maxHeight: activeFaq === i ? '300px' : '0px',
                      opacity: activeFaq === i ? 1 : 0,
                    }}
                  >
                    <p className="pb-6 text-muted leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={<>Ready to Elevate Your<br /><span className="font-serif italic gradient-text">Digital Presence?</span></>}
        subtext="Let's build something remarkable together. Your next website is one conversation away."
        onCtaClick={() => setPopupOpen(true)}
      />

      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
