'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Proposal } from '@/types/proposal';
import ProposalRowActions from './ProposalRowActions';

const STATUS: Record<string, { bg: string; color: string; label: string }> = {
  draft:    { bg: '#f5f4f0', color: '#94918a', label: 'Draft' },
  sent:     { bg: '#eff6ff', color: '#2563eb', label: 'Sent' },
  viewed:   { bg: '#fef9ef', color: '#b45309', label: 'Viewed' },
  signed:   { bg: '#f0faf5', color: '#1e7a4a', label: 'Signed' },
  declined: { bg: '#fef2f2', color: '#c0392b', label: 'Declined' },
};

export default function ProposalList({ initialProposals }: { initialProposals: Proposal[] }) {
  const [proposals, setProposals] = useState(initialProposals);
  const [query, setQuery] = useState('');

  function handleDeleted(slug: string) {
    setProposals((prev) => prev.filter((p) => p.slug !== slug));
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return proposals;
    return proposals.filter(
      (p) =>
        p.clientName?.toLowerCase().includes(q) ||
        p.clientCompany?.toLowerCase().includes(q) ||
        p.clientEmail?.toLowerCase().includes(q) ||
        p.slug?.toLowerCase().includes(q),
    );
  }, [proposals, query]);

  return (
    <>
      {/* Search */}
      <div className="relative mb-4">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b5b0a5] text-[14px] pointer-events-none">
          ⌕
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, company, or email…"
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e0ddd6] rounded text-[13px] text-[#2d2a24] placeholder:text-[#b5b0a5] outline-none focus:border-[#0f172a] transition-colors"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b5b0a5] hover:text-[#5a5650] text-[16px] leading-none"
          >
            ×
          </button>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-[#ede9e0] rounded p-10 text-center">
          <p className="text-[14px] text-[#94918a]">
            {query ? `No proposals matching "${query}"` : 'No proposals yet.'}
          </p>
          {!query && (
            <Link href="/admin/proposals/new" className="text-[13px] text-[#0f172a] font-medium mt-3 inline-block">
              Create your first proposal →
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((p) => (
            <ProposalRow key={p.slug} proposal={p} onDeleted={handleDeleted} />
          ))}
        </div>
      )}

      {query && filtered.length > 0 && (
        <p className="text-[11px] text-[#94918a] mt-3 text-right">
          {filtered.length} of {proposals.length} proposals
        </p>
      )}
    </>
  );
}

function ProposalRow({ proposal: p, onDeleted }: { proposal: Proposal; onDeleted: (slug: string) => void }) {
  const s = STATUS[p.status] || STATUS.draft;
  const updated = new Date(p.updatedAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  return (
    <div className="bg-white border border-[#ede9e0] rounded px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-[#0f172a] mb-0.5">{p.clientName || 'Untitled'}</p>
        <p className="text-[12px] text-[#94918a] truncate">ovwc.net/proposal/{p.slug} · Updated {updated}</p>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="text-[11px] font-medium px-2.5 py-0.5 rounded shrink-0"
          style={{ background: s.bg, color: s.color }}
        >
          {s.label}
        </span>
        <ProposalRowActions proposal={p} onDeleted={onDeleted} />
      </div>
    </div>
  );
}
