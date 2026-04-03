'use client';

import Link from 'next/link';
import Logo from './Logo';

const footerLinks = {
  Navigation: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/work', label: 'Work' },
    { href: '/contact', label: 'Contact' },
  ],
  Services: [
    { href: '/services#web-design', label: 'Web Design' },
    { href: '/services#seo', label: 'SEO' },
    { href: '/services#logo-design', label: 'Logo Design' },
    { href: '/services#copywriting', label: 'Copywriting' },
    { href: '/services#ecommerce', label: 'E-Commerce' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-card-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Premium web design and digital marketing for businesses that
              demand results.
            </p>
            <div className="flex gap-4">
              {/* Social icons */}
              {[
                {
                  label: 'Facebook',
                  path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
                },
                {
                  label: 'Instagram',
                  path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z',
                },
                {
                  label: 'LinkedIn',
                  path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z',
                },
              ].map(social => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full border border-card-border flex items-center justify-center hover:border-accent-pink hover:text-accent-pink transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={social.path}
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-accent-pink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li>Norfolk, VA</li>
              <li>
                <a
                  href="tel:9492347170"
                  className="hover:text-accent-pink transition-colors"
                >
                  (949) 234-7170
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@ovwc.net"
                  className="hover:text-accent-pink transition-colors"
                >
                  hello@ovwc.net
                </a>
              </li>
              <li>Mon - Fri, 9am - 5pm EST</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-card-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Oceanview Web Co. LLC. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted hover:text-accent-pink transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted hover:text-accent-pink transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap.xml"
              className="text-xs text-muted hover:text-accent-pink transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
