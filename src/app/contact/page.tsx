import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Oceanview Web Co to start your next web project. Available nationwide with a typical 4-6 week launch time.',
  openGraph: {
    title: 'Contact Us | Oceanview Web Co',
    description:
      'Get in touch to start your next web project with Oceanview Web Co.',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
