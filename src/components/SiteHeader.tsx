'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ContactPopup from '@/components/ContactPopup';
import { useTheme } from '@/context/ThemeContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { toggleTheme } = useTheme();
  const [popupOpen, setPopupOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Solid backdrop once the page has scrolled (the homepage waits until the hero is mostly gone)
  useEffect(() => {
    const onScroll = () => {
      const limit = pathname === '/' ? window.innerHeight * 0.5 : 24;
      setScrolled(window.scrollY > limit);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Mobile / tablet menu: lock page scroll while open, close on Escape or when resized to desktop
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onDesktop);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onDesktop);
    };
  }, [menuOpen]);

  const openPopup = () => {
    setMenuOpen(false);
    setPopupOpen(true);
  };

  return (
    <>
      <header className={scrolled ? 'ov-nav is-scrolled' : 'ov-nav'}>
        <Link href="/" className="ov-logo" aria-label="Oceanview Web Co. home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Just_OV_Colored.svg" alt="" width={52} height={34} />
          <span>Oceanview Web Co.</span>
        </Link>
        <nav className="ov-menu" aria-label="Main">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} aria-current={l.href === pathname ? 'page' : undefined}>{l.label}</Link>
          ))}
        </nav>
        <div className="ov-nav-right">
          <button type="button" className="ov-theme" onClick={toggleTheme} aria-label="Switch between light and dark mode">
            <svg className="ov-sun" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
            </svg>
            <svg className="ov-moon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
            </svg>
          </button>
          <button type="button" className="ov-pill" onClick={openPopup}>Start a Project</button>
          <button
            type="button"
            className="ov-burger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="ov-drawer"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </header>

      <div className={menuOpen ? 'ov-drawer is-open' : 'ov-drawer'} id="ov-drawer" inert={!menuOpen}>
        <nav aria-label="Mobile">
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.href === pathname ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: `${0.05 + i * 0.05}s` }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ov-drawer-foot">
          <button type="button" className="ov-btn ov-btn-fill" onClick={openPopup}>Start a Project</button>
          <a href="mailto:hello@ovwc.net">hello@ovwc.net</a>
        </div>
      </div>

      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
