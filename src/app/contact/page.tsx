import type { Metadata } from 'next';
import ContactContent from './ContactContent';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Oceanview Web Co in Norfolk, VA to start your next web project. We work with businesses nationwide, with a typical 4–6 week launch time.",
  path: '/contact',
  ogDescription:
    "Get in touch to start your next web project with Oceanview Web Co.",
});

export default function ContactPage() {
  return <ContactContent />;
}
