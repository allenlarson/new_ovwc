import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Web design, SEO, logo design, copywriting, e-commerce, and paid advertising services from Oceanview Web Co. Everything you need to grow online.',
  openGraph: {
    title: 'Our Services | Oceanview Web Co',
    description:
      'Web design, SEO, logo design, copywriting, e-commerce, and paid ads — everything you need to grow online.',
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
