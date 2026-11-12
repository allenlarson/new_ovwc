import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

// Search engines and AI assistants (ChatGPT, Claude, Perplexity, Gemini) are all welcome on
// the public site; only the private admin area and API are off limits.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
