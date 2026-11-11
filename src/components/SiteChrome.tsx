'use client';

import { usePathname } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

const HIDDEN_ROUTES = ['/proposal/', '/admin/'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hide = HIDDEN_ROUTES.some((r) => pathname.startsWith(r));

  if (hide) return <main className="flex-1">{children}</main>;

  // The homepage places the footer itself, inside its closing section
  const isHome = pathname === '/';

  return (
    <div className="ov">
      <SiteHeader />
      <main className="ov-page">{children}</main>
      {!isHome && (
        <div className="ov-footer-wrap">
          <SiteFooter />
        </div>
      )}
    </div>
  );
}
