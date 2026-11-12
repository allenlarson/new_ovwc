import type { Metadata } from 'next';
import WorkContent from './WorkContent';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: "Our Work",
  description:
    "Browse 150+ websites we've built across healthcare, real estate, law, finance, and more. See how Oceanview Web Co delivers results.",
  path: '/work',
  ogDescription:
    "Browse our portfolio of 150+ websites built for businesses nationwide.",
});

export default function WorkPage() {
  return <WorkContent />;
}
