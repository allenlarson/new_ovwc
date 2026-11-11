'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ContactPopup from '@/components/ContactPopup';
import SiteFooter from '@/components/SiteFooter';
import WorkRibbon from '@/components/WorkRibbon';

const HERO_VIDEO = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8';

const stats = [
  { value: '50+', label: 'five-star Google reviews' },
  { value: '8+', label: 'years building for every industry' },
  { value: '4–6', label: 'weeks from kickoff to launch' },
  { value: '6', label: 'services under one roof' },
];

const services = [
  { title: 'Web Design', desc: 'Custom, responsive websites engineered to convert and built around your brand.' },
  { title: 'SEO', desc: 'Data-driven optimization that puts your business in front of the right audience.' },
  { title: 'Logo Design', desc: 'Memorable brand identities that tell your story at a glance.' },
  { title: 'Copywriting', desc: 'Conversion-focused words that speak to your audience and compel them to act.' },
  { title: 'E-Commerce', desc: 'Online stores built to scale, with checkout flows designed to maximize revenue.' },
  { title: 'Paid Ads', desc: 'Google and Meta campaigns that reach ready-to-buy customers.' },
];

const steps = [
  { title: 'Discovery', desc: 'Understanding your goals and your audience.' },
  { title: 'Strategy', desc: 'Sitemap, wireframes and content planning.' },
  { title: 'Design', desc: 'High-fidelity mockups for your review.' },
  { title: 'Development', desc: 'Built and tested on every device.' },
  { title: 'Launch', desc: 'Deployment, training and post-launch support.' },
];

const industries = [
  {
    title: 'Law Firms',
    desc: 'Authoritative sites that build immediate trust and drive qualified consultation requests.',
    clients: ['Waldo & Lyle', 'Grochow Law', 'KJT Trial Lawyers'],
  },
  {
    title: 'Home Services',
    desc: 'Local sites built around service areas, reviews and one-click scheduling.',
    clients: ['Wall To Wall', 'AKK Painting', 'Better View Windows'],
  },
  {
    title: 'Healthcare',
    desc: 'Patient education, provider locators and booking flows for clinics and national brands.',
    clients: ['Revance', 'miraDry', '1st Home Care of VA'],
  },
  {
    title: 'Real Estate',
    desc: 'Property search, community pages and lead capture that keep your pipeline full.',
    clients: ['Rick Barraza', 'San Clemente Properties', 'SBA Realty'],
  },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function Arrow() {
  return (
    <svg className="ov-arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export default function OceanContent() {
  const [popupOpen, setPopupOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const deepRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const endRef = useRef<HTMLElement>(null);

  // Hero video (HLS): native in Safari, hls.js elsewhere
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let destroy: (() => void) | undefined;
    let cancelled = false;
    const reveal = () => video.classList.add('is-playing');
    video.addEventListener('playing', reveal);

    // Prefer hls.js wherever it works; fall back to native HLS (iOS Safari)
    import('hls.js').then(({ default: Hls }) => {
      if (cancelled) return;
      if (Hls.isSupported()) {
        const hls = new Hls({ capLevelToPlayerSize: true });
        hls.loadSource(HERO_VIDEO);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.play().catch(() => {}));
        destroy = () => hls.destroy();
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = HERO_VIDEO;
      }
    });
    return () => {
      cancelled = true;
      video.removeEventListener('playing', reveal);
      destroy?.();
    };
  }, []);

  // Scroll-driven scene: crossfades and parallax
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = window.innerHeight;
      const y = window.scrollY;
      const toDeep = smoothstep(0.15 * h, h, y);
      const endTop = endRef.current?.offsetTop ?? Number.MAX_SAFE_INTEGER;
      const toEnd = smoothstep(endTop - 1.1 * h, endTop - 0.1 * h, y);
      const deep = toDeep * (1 - toEnd * 0.82);

      if (deepRef.current) deepRef.current.style.opacity = String(deep);
      if (plateRef.current) {
        plateRef.current.style.transform = `scale(${1 + 0.08 * toDeep * (1 - toEnd)})`;
      }

      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        if (deep > 0.98 && !video.paused) video.pause();
        else if (deep <= 0.98 && video.paused) video.play().catch(() => {});
      }

    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll('.ov-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Bubbles: rise on their own, faster while you scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    type Bubble = { x: number; y: number; r: number; v: number; phase: number; drift: number };
    let bubbles: Bubble[] = [];

    const seed = () => {
      const count = w < 700 ? 16 : 30;
      bubbles = Array.from({ length: count }, () => {
        const r = 4 + Math.pow(Math.random(), 2.2) * (w < 700 ? 34 : 54);
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r,
          v: 14 + Math.random() * 26 + r * 0.35,
          phase: Math.random() * Math.PI * 2,
          drift: 6 + Math.random() * 14,
        };
      });
    };
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const light = document.documentElement.classList.contains('light');
      const rim = light ? 'rgba(1, 121, 168, 0.4)' : 'rgba(150, 232, 246, 0.38)';
      const shine = light ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.55)';
      for (const b of bubbles) {
        const x = b.x + Math.sin(t * 0.6 + b.phase) * b.drift;
        const fill = ctx.createRadialGradient(x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, x, b.y, b.r);
        fill.addColorStop(0, light ? 'rgba(0, 186, 213, 0.08)' : 'rgba(0, 186, 213, 0.05)');
        fill.addColorStop(1, light ? 'rgba(0, 160, 200, 0.26)' : 'rgba(1, 121, 168, 0.3)');
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = rim;
        ctx.stroke();
        if (b.r > 7) {
          ctx.beginPath();
          ctx.arc(x, b.y, b.r * 0.68, -2.5, -1.7);
          ctx.lineWidth = Math.max(1, b.r * 0.1);
          ctx.lineCap = 'round';
          ctx.strokeStyle = shine;
          ctx.stroke();
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);
    if (reduced) {
      draw(0);
      return () => window.removeEventListener('resize', resize);
    }

    let raf = 0;
    let last = performance.now();
    let lastY = window.scrollY;
    let vel = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const y = window.scrollY;
      vel += ((y - lastY) / Math.max(dt, 0.001) - vel) * 0.1;
      lastY = y;
      const boost = Math.min(Math.abs(vel) / 700, 4);
      for (const b of bubbles) {
        b.y -= b.v * (1 + boost) * dt;
        if (b.y < -b.r - 20) {
          b.y = h + b.r + Math.random() * 60;
          b.x = Math.random() * w;
        }
      }
      draw(now / 1000);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const openPopup = () => setPopupOpen(true);

  return (
    <div className="ov-home" ref={rootRef}>
      {/* Fixed scene behind everything */}
      <div className="ov-scene" aria-hidden="true">
        <div className="ov-plate" ref={plateRef}>
          <video ref={videoRef} autoPlay loop muted playsInline />
          <div className="ov-tint" />
        </div>
        <div className="ov-deep" ref={deepRef} />
        <canvas className="ov-bubbles" ref={canvasRef} />
      </div>

      <div className="ov-main">
        {/* HERO */}
        <section className="ov-hero" id="top">
          <div className="ov-hero-copy">
            <p className="ov-eyebrow ov-in" style={{ animationDelay: '0.15s' }}>
              Web design &amp; digital marketing · Norfolk, VA
            </p>
            <h1 className="ov-h1">
              <span className="ov-line"><span style={{ animationDelay: '0.25s' }}>We build websites</span></span>
              <span className="ov-line"><span style={{ animationDelay: '0.37s' }}>that turn visitors</span></span>
              <span className="ov-line"><span style={{ animationDelay: '0.49s' }}>into <em>clients.</em></span></span>
            </h1>
            <p className="ov-sub ov-in" style={{ animationDelay: '0.7s' }}>
              Premium web design and digital marketing for businesses ready to grow. Your success is our craft.
            </p>
            <div className="ov-btns ov-in" style={{ animationDelay: '0.82s' }}>
              <button type="button" className="ov-btn ov-btn-fill" onClick={openPopup}>
                Start a Project <Arrow />
              </button>
              <a className="ov-btn ov-btn-glass" href="#work">View Our Work</a>
            </div>
          </div>
          <a className="ov-scrollcard ov-in" href="#studio" style={{ animationDelay: '0.95s' }}>
            <span>Scroll down<br />&amp; discover</span>
            <svg viewBox="0 0 22 22" aria-hidden="true"><path d="M11 3v15M5 12l6 6 6-6" /></svg>
          </a>
        </section>

        {/* STATEMENT + STATS */}
        <section className="ov-section ov-center" id="studio">
          <h2 className="ov-h2 ov-reveal">
            Design, SEO, copy and ads.{' '}
            <span className="ov-accent">Everything under <em>one roof.</em></span>
          </h2>
          <p className="ov-lede ov-reveal">
            No juggling vendors, no miscommunication. We measure success by your growth, not just deliverables.
          </p>
          <ul className="ov-stats ov-reveal">
            {stats.map((s) => (
              <li key={s.label}>
                <span className="ov-stat-num">{s.value}</span>
                <span className="ov-stat-label">{s.label}</span>
              </li>
            ))}
          </ul>

        </section>

        {/* RECENT WORK: scroll-driven ribbon of project screenshots */}
        <WorkRibbon />

        {/* SERVICES */}
        <section className="ov-section" id="services">
          <div className="ov-split">
            <h2 className="ov-h2 ov-reveal">
              Six services, one team, and a site that <span className="ov-accent">works as hard as <em>you do.</em></span>
            </h2>
            <p className="ov-lede ov-reveal">
              Every pixel, every word and every strategy is designed to move the needle for your business.
            </p>
          </div>
          <div className="ov-cards">
            {services.map((s, i) => (
              <article key={s.title} className={`ov-card ov-glass ov-reveal${i === 0 ? ' ov-card-lead' : ''}`} style={{ transitionDelay: `${(i % 3) * 0.08}s` }}>
                <span className="ov-card-index">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link href="/services" className="ov-link">Learn more <Arrow /></Link>
              </article>
            ))}
          </div>
          <ol className="ov-steps ov-reveal">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="ov-step-num">0{i + 1}</span>
                <span><strong>{s.title}</strong> {s.desc}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* INDUSTRIES */}
        <section className="ov-section ov-uses" id="industries">
          <div className="ov-uses-head">
            <h2 className="ov-h2 ov-reveal">Built for businesses <em>like yours.</em></h2>
            <p className="ov-lede ov-reveal">
              Over 8 years of building for these industries, so we start with what already works.
            </p>
          </div>
          <div className="ov-stairs">
            {industries.map((ind, i) => (
              <article key={ind.title} className="ov-role ov-glass ov-reveal" style={{ '--i': i, transitionDelay: `${i * 0.06}s` } as React.CSSProperties}>
                <span className="ov-tag">Industry</span>
                <h3>{ind.title}</h3>
                <p>{ind.desc}</p>
                <ul className="ov-chips">
                  {ind.clients.map((c) => <li key={c}>{c}</li>)}
                </ul>
                <Link href="/work" className="ov-link">See the work <Arrow /></Link>
              </article>
            ))}
          </div>
          <figure className="ov-quote ov-reveal">
            <blockquote>
              “Allen built us a real estate website that <em>actually generates leads.</em>”
            </blockquote>
            <figcaption><strong>Rick B.</strong> · 213 United Real Estate</figcaption>
          </figure>
        </section>

        {/* CTA + FOOTER */}
        <section className="ov-end" id="contact" ref={endRef}>
          <div className="ov-cta ov-glass ov-reveal">
            <h2>Your next website<br /><em>starts here.</em></h2>
            <p className="ov-lede">
              Tell us about your project. You&apos;ll get a clear plan and a transparent quote.
            </p>
            <div className="ov-btns">
              <button type="button" className="ov-btn ov-btn-fill" onClick={openPopup}>
                Start a Project <Arrow />
              </button>
              <Link className="ov-btn ov-btn-glass" href="/work">View Our Work</Link>
            </div>
            <p className="ov-note">Transparent quote · No hidden fees · Most sites live in 4–6 weeks</p>
          </div>

          <SiteFooter />
        </section>
      </div>

      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </div>
  );
}
