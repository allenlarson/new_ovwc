import type { Metadata } from 'next';
import { DM_Sans, Instrument_Serif } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import './ocean.css';
import { ThemeProvider } from '@/context/ThemeContext';
import SiteChrome from '@/components/SiteChrome';
import { SITE_URL } from '@/lib/site';

const DESCRIPTION =
  'Oceanview Web Co is a web design and digital marketing agency in Norfolk, Virginia. We build websites that turn visitors into clients for real estate, law firms, healthcare, and small businesses in Hampton Roads and nationwide.';

// Structured business details for Google and AI search (who we are, where, what we do).
const businessSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: 'Oceanview Web Co.',
      alternateName: ['OVWC', 'Oceanview Web Company'],
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      image: `${SITE_URL}/og.png`,
      description: DESCRIPTION,
      email: 'hello@ovwc.net',
      telephone: '+19492347170',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Norfolk',
        addressRegion: 'VA',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Norfolk, VA' },
        { '@type': 'City', name: 'Virginia Beach, VA' },
        { '@type': 'City', name: 'Chesapeake, VA' },
        { '@type': 'City', name: 'Portsmouth, VA' },
        { '@type': 'City', name: 'Suffolk, VA' },
        { '@type': 'City', name: 'Hampton, VA' },
        { '@type': 'City', name: 'Newport News, VA' },
        { '@type': 'Country', name: 'United States' },
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      priceRange: '$$$',
      knowsAbout: [
        'Web design',
        'Website development',
        'Search engine optimization',
        'Local SEO',
        'Logo design',
        'Copywriting',
        'E-commerce development',
        'Google Ads',
        'Meta Ads',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Web design and marketing services',
        itemListElement: [
          ['Custom Web Design & Development', 'Custom, responsive websites built to convert visitors into clients. Business sites typically start at $3,000 and launch in 4–6 weeks.'],
          ['Search Engine Optimization', 'On-page, technical, and local SEO with keyword research, content strategy, and monthly reporting.'],
          ['Logo Design & Branding', 'Brand identities and logos designed from concept to final mark.'],
          ['Copywriting', 'Conversion-focused website copy written for your audience.'],
          ['E-Commerce Development', 'Online stores with secure payments, inventory management, shipping, and optimized checkout.'],
          ['Paid Advertising', 'Google and Meta ad campaigns built and managed for measurable ROI.'],
        ].map(([name, description]) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name, description, provider: { '@id': `${SITE_URL}/#business` } },
        })),
      },
      sameAs: ['https://www.facebook.com/OVWebCo/', 'https://www.instagram.com/ovwebco/'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Oceanview Web Co.',
      publisher: { '@id': `${SITE_URL}/#business` },
      inLanguage: 'en-US',
    },
  ],
};

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-ov-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Oceanview Web Co. | Web Design & Digital Marketing Agency in Norfolk, VA',
    template: '%s | Oceanview Web Co.',
  },
  description: DESCRIPTION,
  keywords: [
    'web design agency',
    'digital marketing agency',
    'SEO services',
    'website development',
    'logo design',
    'e-commerce development',
    'copywriting services',
  ],
  openGraph: {
    title: 'Oceanview Web Co. | Web Design & Digital Marketing',
    description: 'We build websites that turn visitors into clients.',
    images: [
      {
        url: '/og.png',
        alt: 'Oceanview Web Co. — We Build Websites That Turn Visitors Into Clients',
      },
    ],
    url: '/',
    siteName: 'Oceanview Web Co.',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oceanview Web Co.',
    description: 'We build websites that turn visitors into clients.',
    images: ['/og.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('ovwc-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessSchema),
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RGF5CXBQ37"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RGF5CXBQ37');
          `}
        </Script>
      </body>
    </html>
  );
}
