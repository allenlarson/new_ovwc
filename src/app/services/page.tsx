import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: "Web Design, SEO & Marketing Services",
  description:
    "Web design, SEO, logo design, copywriting, e-commerce, and paid advertising from Oceanview Web Co. in Norfolk, VA. Custom websites start at $3,000.",
  path: '/services',
  ogDescription:
    "Web design, SEO, logo design, copywriting, e-commerce, and paid ads — everything you need to grow online.",
});

export default function ServicesPage() {
  return <ServicesContent />;
}
