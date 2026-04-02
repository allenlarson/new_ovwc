import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
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
  title: {
    default: 'Oceanview Web Co | Web Design & Digital Marketing | Virginia Beach, VA',
    template: '%s | Oceanview Web Co',
  },
  description:
    'Oceanview Web Co is a premium web design and digital marketing agency in Virginia Beach, VA. We build websites that turn visitors into clients for real estate, law firms, healthcare, and small businesses.',
  keywords: [
    'web design Virginia Beach',
    'digital marketing agency',
    'SEO services Virginia Beach',
    'website development',
    'logo design',
    'e-commerce development',
    'copywriting services',
  ],
  openGraph: {
    title: 'Oceanview Web Co | Web Design & Digital Marketing',
    description: 'We build websites that turn visitors into clients.',
    url: 'https://ovwc.net',
    siteName: 'Oceanview Web Co',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oceanview Web Co',
    description: 'We build websites that turn visitors into clients.',
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`} suppressHydrationWarning>
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
      </head>
      <body className="min-h-screen font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
