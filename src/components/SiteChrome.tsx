'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HIDDEN_ROUTES = ['/proposal/', '/admin/'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hide = HIDDEN_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <>
      {!hide && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hide && <Footer />}
    </>
  );
}
