import type { Metadata } from 'next';
import WorkContent from './WorkContent';

export const metadata: Metadata = {
  title: 'Our Work',
  description:
    'Browse 150+ websites we\'ve built across healthcare, real estate, law, finance, and more. See how Oceanview Web Co delivers results.',
  openGraph: {
    title: 'Our Work | Oceanview Web Co',
    description:
      'Browse our portfolio of 150+ websites built for businesses nationwide.',
  },
};

export default function WorkPage() {
  return <WorkContent />;
}
