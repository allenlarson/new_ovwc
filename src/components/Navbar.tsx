'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useTheme } from '@/context/ThemeContext';
import ContactPopup from './ContactPopup';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

function ThemeIcon({ theme }: { theme: string }) {
  return theme === 'dark' ? (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );
}

function NavLinks({ pathname }: { pathname: string }) {
  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm tracking-wide transition-colors hover:text-accent-pink ${
            pathname === link.href ? 'text-accent-pink' : 'text-foreground/70'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY < 100) {
            setVisible(false);
          } else if (currentY < lastScrollY.current - 5) {
            setVisible(true);
          } else if (currentY > lastScrollY.current + 5) {
            setVisible(false);
          }
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Initial header — absolute, only lives at the top of the page */}
      <header className="absolute top-0 left-0 right-0 z-40 px-6 py-5 flex items-center justify-between">
        {/* Logo — left */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Logo className="h-12 w-auto" />
        </Link>

        {/* Nav — truly centered via absolute positioning */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          <NavLinks pathname={pathname} />
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
            aria-label="Toggle theme"
          >
            <ThemeIcon theme={theme} />
          </button>
          <button
            onClick={() => setPopupOpen(true)}
            className="hidden md:block px-5 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white hover:shadow-lg hover:shadow-accent-purple/25 transition-all duration-300 hover:scale-105"
          >
            Start a Project
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          </button>
        </div>
      </header>

      {/* Sticky glassmorphism header — appears on scroll up */}
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 right-0 z-50 glass"
          >
            <div className="relative max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
              {/* Logo — left */}
              <Link href="/" className="flex items-center gap-3 shrink-0">
                <Logo className="h-7 w-auto" />
              </Link>

              {/* Nav — truly centered via absolute positioning */}
              <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
                <NavLinks pathname={pathname} />
              </nav>

              {/* Right side */}
              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
                  aria-label="Toggle theme"
                >
                  <ThemeIcon theme={theme} />
                </button>
                <button
                  onClick={() => setPopupOpen(true)}
                  className="hidden md:block px-5 py-2.5 text-sm font-medium rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white hover:shadow-lg hover:shadow-accent-purple/25 transition-all duration-300 hover:scale-105"
                >
                  Start a Project
                </button>
                <button
                  onClick={() => setMobileOpen(true)}
                  className="md:hidden p-2"
                  aria-label="Open menu"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 p-2"
              aria-label="Close menu"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-3xl font-medium transition-colors hover:text-accent-pink ${
                      pathname === link.href ? 'gradient-text' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => { setMobileOpen(false); setPopupOpen(true); }}
                className="mt-4 w-full px-8 py-4 text-lg font-medium rounded-full bg-gradient-to-r from-accent-pink to-accent-purple text-white"
              >
                Start a Project
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactPopup open={popupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
}
