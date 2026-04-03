'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutTemplate,
  Search,
  Palette,
  PenTool,
  ShoppingCart,
} from 'lucide-react';
import SectionReveal from '@/components/SectionReveal';
import ContactPopup from '@/components/ContactPopup';

/* ─── SERVICES DATA ─── */
const services = [
  {
    num: '01',
    icon: LayoutTemplate,
    title: 'WEB DESIGN',
    desc: 'Custom websites engineered to convert. We craft pixel-perfect, responsive experiences that capture your brand and drive measurable results.',
  },
  {
    num: '02',
    icon: Search,
    title: 'SEO',
    desc: 'Dominate search results with data-driven optimization strategies. We put your business in front of the right audience at the right time.',
  },
  {
    num: '03',
    icon: Palette,
    title: 'LOGO DESIGN',
    desc: 'Memorable brand identities that stand out in any market. From concept to final mark, we design logos that tell your story at a glance.',
  },
  {
    num: '04',
    icon: PenTool,
    title: 'COPYWRITING',
    desc: 'Words that sell. Our conversion-focused copy speaks directly to your audience and compels them to take action.',
  },
  {
    num: '05',
    icon: ShoppingCart,
    title: 'E-COMMERCE',
    desc: 'Online stores built to scale. Secure payment processing, intuitive product management, and checkout flows designed to maximize revenue.',
  },
];

/* ─── WHY CHOOSE US ─── */
const whyUs = [
  {
    num: '01',
    title: 'EXPERTISE',
    desc: "Over 8 years building digital experiences for businesses across every industry. We know what works because we've tested it all.",
  },
  {
    num: '02',
    title: 'FULL-SERVICE AGENCY',
    desc: 'Design, development, SEO, copy, branding — everything under one roof. No juggling vendors, no miscommunication.',
  },
  {
    num: '03',
    title: 'RESULTS-DRIVEN',
    desc: 'Every pixel, every word, every strategy is designed to move the needle. We measure success by your growth, not just deliverables.',
  },
  {
    num: '04',
    title: 'CLIENT-FIRST APPROACH',
    desc: "Your vision drives every decision. We listen, we collaborate, and we don't stop until you're thrilled with the outcome.",
  },
];

/* ─── TESTIMONIALS ─── */
const testimonials = [
  {
    quote:
      'Allen completely met the challenge and exceeded my expectations! He developed a creative, fun site that perfectly represents our brand. His attention to detail and responsiveness made the whole process seamless.',
    name: 'Becca E.',
    company: 'Eye Society Lashes',
    rating: 5,
  },
  {
    quote:
      'Working with Allen was an absolute pleasure. He understood our vision for Coworkle from day one and translated it into a website that our users love. The design is clean, modern, and incredibly intuitive.',
    name: 'Shadoe G.',
    company: 'Coworkle',
    rating: 5,
  },
  {
    quote:
      "Professional, creative, and incredibly efficient. Allen delivered a website that elevated our agency's digital presence. His understanding of modern design trends is unmatched.",
    name: 'Jason D.',
    company: 'TOM.agency',
    rating: 5,
  },
  {
    quote:
      'Allen built us a real estate website that actually generates leads. The IDX integration, community pages, and overall design have been instrumental in growing our business in Los Angeles.',
    name: 'Rick B.',
    company: '213 United Real Estate',
    rating: 5,
  },
  {
    quote:
      "Our new website has completely transformed how clients find and interact with our team. Allen's expertise in real estate web design is evident in every detail. Highly recommend.",
    name: 'Steve H.',
    company: 'Real Visions Realty Team',
    rating: 5,
  },
  {
    quote:
      'From the initial consultation to the final launch, Allen delivered an exceptional website for Golden Coast Loans. The site is fast, professional, and our loan applications have increased significantly.',
    name: 'Josh V.',
    company: 'Golden Coast Loans',
    rating: 5,
  },
];

/* ─── FAQ ─── */
const faqs = [
  {
    q: 'How much does a custom website cost?',
    a: 'Every project is unique, so pricing depends on your specific needs, features, and complexity. Our custom websites typically start at $3,000 for a standard business site and scale based on functionality like e-commerce, custom integrations, or advanced animations. We provide a detailed, transparent quote after our initial consultation — no hidden fees, no surprises.',
  },
  {
    q: 'How long does it take to build a website?',
    a: "Most standard business websites take 4–6 weeks from kickoff to launch. Larger projects with e-commerce, custom features, or complex integrations may take 8–12 weeks. We establish clear timelines upfront and keep you updated at every milestone so there are never any delays you don't expect.",
  },
  {
    q: 'Do you offer SEO services?',
    a: 'Absolutely. Search engine optimization is one of our core services. We offer both on-page SEO (built into every website we create) and ongoing SEO campaigns that include keyword research, content strategy, technical optimization, local SEO for Virginia Beach and beyond, and monthly performance reporting.',
  },
  {
    q: 'What industries do you specialize in?',
    a: "We have deep experience in real estate, law firms, healthcare, small business, and non-profit organizations. That said, our design and marketing strategies are adaptable — we've successfully delivered projects across dozens of industries because we take the time to understand each client's unique market.",
  },
  {
    q: 'Do you provide website maintenance and support?',
    a: 'Yes. We offer ongoing maintenance plans that include security updates, performance monitoring, content updates, backups, and priority support. A website is a living asset — we make sure yours stays fast, secure, and current long after launch.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: "Definitely. Many of our clients come to us with outdated websites that aren't performing. We'll audit your current site, identify what's working and what isn't, and rebuild it with modern design, better performance, and a conversion-focused strategy. We handle content migration, SEO preservation, and smooth redirects.",
  },
  {
    q: 'What is your web design process?',
    a: "Our process follows five phases: Discovery (understanding your goals and audience), Strategy (sitemap, wireframes, and content planning), Design (high-fidelity mockups for your review), Development (building and testing on all devices), and Launch (deployment, training, and post-launch support). You're involved at every step.",
  },
  {
    q: 'Do you build e-commerce websites?',
    a: "Yes. We build custom e-commerce solutions with secure payment processing, inventory management, shipping integration, and checkout flows optimized for conversion. Whether you're selling 10 products or 10,000, we'll build a store that scales with your business.",
  },
];

export default function Home() {
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
              Premium web design and digital marketing for businesses in
              Virginia Beach and beyond. Your growth is our craft.
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
            <span className="text-4xl font-medium gradient-text">100+</span>
            <span className="text-sm text-muted leading-tight">
              websites built
              <br />
              and counting
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <SectionReveal key={service.num} delay={i * 0.1}>
                <div className="group relative bg-card border border-card-border rounded-2xl p-8 h-full hover:border-accent-purple/30 transition-all duration-500 overflow-hidden">
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
                  <span className="text-sm text-muted">{service.num}</span>
                  <div className="my-4 group-hover:scale-110 transition-transform duration-500 origin-left">
                    <service.icon
                      className="w-12 h-12 stroke-[1.5]"
                      style={{ stroke: 'url(#icon-gradient)' }}
                    />
                  </div>
                  <h3 className="text-lg font-medium tracking-wide mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-medium gradient-text group-hover:gap-3 transition-all"
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
              From{' '}
              <span className="font-serif italic gradient-text">
                Virginia Beach
              </span>{' '}
              to the world.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-8 mb-20">
              <p className="text-muted leading-relaxed">
                Rooted in the coastal energy of Virginia Beach, Oceanview Web Co
                was built on the belief that exceptional design drives real
                business growth. We bring that same clarity and ambition to
                every project.
              </p>
              <p className="text-muted leading-relaxed">
                From local businesses on Atlantic Avenue to national brands, we
                deliver digital experiences that perform — combining strategy,
                design, and technology into results you can measure.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Stats */}
            <div className="space-y-10">
              {[
                {
                  value: '8+',
                  label: 'years',
                  detail: 'of experience in web design and digital marketing.',
                },
                {
                  value: '100+',
                  label: 'websites',
                  detail: 'built and launched for clients across the country.',
                },
                {
                  value: '100%',
                  label: 'client',
                  detail:
                    "satisfaction rate — we don't stop until you're thrilled.",
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
                      <span className="text-foreground font-medium">
                        {stat.label}
                      </span>{' '}
                      <span className="text-sm text-muted">{stat.detail}</span>
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>

            {/* Dotted map visual */}
            <SectionReveal delay={0.2} direction="right">
              <div className="relative flex items-center justify-center">
                <svg
                  className="w-full max-w-lg opacity-20"
                  viewBox="0 0 500 300"
                >
                  {Array.from({ length: 50 }).map((_, row) =>
                    Array.from({ length: 80 }).map((_, col) => {
                      const x = col * 6.25;
                      const y = row * 6;
                      const inShape =
                        (x > 50 &&
                          x < 180 &&
                          y > 30 &&
                          y < 150 &&
                          Math.sin(x * 0.1) * 30 + 90 > y) ||
                        (x > 220 && x < 310 && y > 30 && y < 120) ||
                        (x > 240 && x < 310 && y > 120 && y < 220) ||
                        (x > 300 && x < 450 && y > 40 && y < 160);
                      if (!inShape) return null;
                      return (
                        <circle
                          key={`${row}-${col}`}
                          cx={x}
                          cy={y}
                          r="1"
                          fill="currentColor"
                          opacity={0.35}
                        />
                      );
                    }),
                  )}
                  <circle cx="120" cy="85" r="4" fill="#4c1d95" opacity="0.8" />
                  <circle
                    cx="120"
                    cy="85"
                    r="8"
                    fill="none"
                    stroke="#4c1d95"
                    strokeWidth="0.5"
                    opacity="0.5"
                  />
                </svg>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ WHY CHOOSE US ════════════════════════════════ */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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

            {/* Abstract 3D visual */}
            <SectionReveal delay={0.3} direction="right">
              <div className="relative flex items-center justify-center lg:sticky lg:top-32">
                <svg className="w-full max-w-md" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient
                      id="whyGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#4c1d95" stopOpacity="0.6" />
                      <stop
                        offset="50%"
                        stopColor="#9d174d"
                        stopOpacity="0.4"
                      />
                      <stop
                        offset="100%"
                        stopColor="#4c1d95"
                        stopOpacity="0.2"
                      />
                    </linearGradient>
                  </defs>
                  {Array.from({ length: 40 }).map((_, i) => {
                    const angle = (i / 40) * Math.PI * 2;
                    const r = 120 + Math.sin(angle * 3) * 30;
                    const cx =
                      Math.round((200 + Math.cos(angle) * r * 0.5) * 100) / 100;
                    const cy =
                      Math.round((200 + Math.sin(angle) * r * 0.3) * 100) / 100;
                    const op =
                      Math.round((0.15 + (i / 40) * 0.3) * 1000) / 1000;
                    return (
                      <ellipse
                        key={i}
                        cx={cx}
                        cy={cy}
                        rx={80 - i * 1.2}
                        ry={40 - i * 0.6}
                        fill="none"
                        stroke="url(#whyGrad)"
                        strokeWidth="0.8"
                        opacity={op}
                        transform={`rotate(${i * 4.5} ${cx} ${cy})`}
                      />
                    );
                  })}
                </svg>
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

      {/* ════════════════════════════════ CTA BANNER ════════════════════════════════ */}
      <section className="py-32 px-6 relative overflow-hidden mesh-bg">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <SectionReveal>
            <h2 className="text-4xl md:text-6xl font-medium mb-6">
              Ready to Elevate Your
              <br />
              <span className="font-serif italic gradient-text">
                Digital Presence?
              </span>
            </h2>
            <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
              Let&apos;s build something remarkable together. Your next website
              is one conversation away.
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
