import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet the team behind Oceanview Web Co. Over 10 years of experience building high-converting websites for healthcare, real estate, law, and more.',
  openGraph: {
    title: 'About Us | Oceanview Web Co',
    description:
      'Over 10 years of experience building high-converting websites for businesses nationwide.',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
