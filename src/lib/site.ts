import type { Metadata } from 'next';

// The one address search engines should treat as the real site (ovwc.net redirects here).
export const SITE_URL = 'https://www.ovwc.net';
export const SITE_NAME = 'Oceanview Web Co.';

const OG_IMAGE = {
  url: '/og.png',
  alt: 'Oceanview Web Co. — We Build Websites That Turn Visitors Into Clients',
};

// Per-page metadata with a canonical URL and the shared social image.
// (A page's openGraph replaces the layout's entirely, so the image has to be repeated here.)
export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle ?? `${title} | ${SITE_NAME}`,
      description: ogDescription ?? description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? `${title} | ${SITE_NAME}`,
      description: ogDescription ?? description,
      images: [OG_IMAGE.url],
    },
  };
}
