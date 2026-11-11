import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="ov-footer">
      <div className="ov-footer-grid">
        <div className="ov-footer-brand">
          <span className="ov-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Just_OV_Colored.svg" alt="" width={46} height={30} />
            <span>Oceanview Web Co.</span>
          </span>
          <p>Premium web design and digital marketing for businesses that demand results.</p>
        </div>
        <nav aria-label="Footer navigation">
          <h4>Navigation</h4>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/work">Work</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <nav aria-label="Services">
          <h4>Services</h4>
          <Link href="/services#web-design">Web Design</Link>
          <Link href="/services#seo">SEO</Link>
          <Link href="/services#logo-design">Logo Design</Link>
          <Link href="/services#copywriting">Copywriting</Link>
          <Link href="/services#ecommerce">E-Commerce</Link>
        </nav>
        <div className="ov-footer-contact">
          <h4>Contact</h4>
          <span>Norfolk, VA</span>
          <a href="mailto:hello@ovwc.net">hello@ovwc.net</a>
          <span>Mon – Fri, 9am – 5pm EST</span>
          <a href="https://www.facebook.com/OVWebCo/" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com/ovwebco/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className="ov-legal">
        <span>© {new Date().getFullYear()} Oceanview Web Co. LLC. All rights reserved.</span>
        <span>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </span>
      </div>
      <p className="ov-wordmark" aria-hidden="true">Oceanview</p>
    </footer>
  );
}
