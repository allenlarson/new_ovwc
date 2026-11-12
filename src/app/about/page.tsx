import type { Metadata } from 'next';
import AboutContent from './AboutContent';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Meet the team behind Oceanview Web Co., a Norfolk, VA web design agency with over 10 years of experience building high-converting websites for healthcare, real estate, law, and more.",
  path: '/about',
  ogDescription:
    "Over 10 years of experience building high-converting websites for businesses nationwide.",
});

export default function AboutPage() {
  return <AboutContent />;
}
