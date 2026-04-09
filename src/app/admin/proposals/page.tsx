import Link from 'next/link';
import { getAllProposals } from '@/lib/proposals';
import { Proposal } from '@/types/proposal';

const STATUS: Record<string, { bg: string; color: string; label: string }> = {
  draft:    { bg: '#f5f4f0', color: '#94918a', label: 'Draft' },
  sent:     { bg: '#eff6ff', color: '#2563eb', label: 'Sent' },
  viewed:   { bg: '#fef9ef', color: '#b45309', label: 'Viewed' },
  signed:   { bg: '#f0faf5', color: '#1e7a4a', label: 'Signed' },
  declined: { bg: '#fef2f2', color: '#c0392b', label: 'Declined' },
};

export default async function AdminProposalsPage() {
  const proposals = await getAllProposals();

  return (
    <div className="min-h-screen bg-[#f5f4f0] font-sans px-10 py-12">
      <div className="max-w-[900px] mx-auto">

        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#94918a] mb-1.5">OVWC Admin</p>
            <h1 className="text-[28px] font-normal text-[#0f172a] tracking-[-0.02em]">Proposals</h1>
          </div>
          <Link
            href="/admin/proposals/new"
            className="bg-[#0f172a] text-white px-5 py-2.5 rounded text-[13px] font-medium tracking-[0.01em] hover:bg-[#1e293b] transition-colors"
          >
            New proposal
          </Link>
        </div>

        {proposals.length === 0 ? (
          <div className="bg-white border border-[#ede9e0] rounded p-16 text-center">
            <p className="text-[15px] text-[#94918a] mb-5">No proposals yet.</p>
            <Link href="/admin/proposals/new" className="text-[14px] text-[#0f172a] font-medium">
              Create your first proposal →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {proposals.map((p) => <ProposalRow key={p.id} proposal={p} />)}
          </div>
        )}

      </div>
    </div>
  );
}

function ProposalRow({ proposal: p }: { proposal: Proposal }) {
  const s = STATUS[p.status] || STATUS.draft;
  const updated = new Date(p.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-white border border-[#ede9e0] rounded px-6 py-4 flex items-center gap-4">
      <div className="flex-1">
        <p className="text-[14px] font-medium text-[#0f172a] mb-0.5">{p.clientName || 'Untitled'}</p>
        <p className="text-[12px] text-[#94918a]">ovwc.net/proposal/{p.slug} · Updated {updated}</p>
      </div>
      <span
        className="text-[11px] font-medium px-2.5 py-0.5 rounded"
        style={{ background: s.bg, color: s.color }}
      >
        {s.label}
      </span>
      <div className="flex gap-2">
        <Link href={`/admin/proposals/${p.slug}/edit`} className="text-[12px] text-[#5a5650] border border-[#e0ddd6] px-3.5 py-1.5 rounded hover:bg-[#faf9f7] transition-colors">
          Edit
        </Link>
        <Link href={`/proposal/${p.slug}`} target="_blank" className="text-[12px] text-[#5a5650] border border-[#e0ddd6] px-3.5 py-1.5 rounded hover:bg-[#faf9f7] transition-colors">
          View ↗
        </Link>
      </div>
    </div>
  );
}
