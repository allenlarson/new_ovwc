import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-dm-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ovwc.net'),
  title: {
    default: 'Oceanview Web Co. | Web Design & Digital Marketing Agency',
    template: '%s | Oceanview Web Co.',
  },
  description:
    'Oceanview Web Co is a premium web design and digital marketing agency. We build websites that turn visitors into clients for real estate, law firms, healthcare, and small businesses.',
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
    url: 'https://ovwc.net',
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
      className={`${dmSans.variable} ${dmSerif.variable}`}
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
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Oceanview Web Co.',
              url: 'https://ovwc.net',
              logo: 'https://ovwc.net/og.png',
              image: 'https://ovwc.net/og.png',
              description:
                'Oceanview Web Co is a premium web design and digital marketing agency. We build websites that turn visitors into clients for real estate, law firms, healthcare, and small businesses.',
              email: 'hello@ovwc.net',
              telephone: '+19492347170',
              areaServed: 'United States',
              priceRange: '$$$',
              serviceType: [
                'Web Design',
                'SEO',
                'Logo Design',
                'Copywriting',
                'E-Commerce Development',
                'Paid Advertising',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
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
