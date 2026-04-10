import Link from 'next/link';
import { getAllProposals } from '@/lib/proposals';
import ProposalList from './ProposalList';

export default async function AdminProposalsPage() {
  const proposals = await getAllProposals();

  return (
    <div className="min-h-screen bg-[#f5f4f0] font-sans px-4 sm:px-10 py-8 sm:py-12">
      <div className="max-w-[900px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-[#94918a] mb-1.5">
              OVWC Admin
            </p>
            <h1 className="text-[28px] font-normal text-[#0f172a] tracking-[-0.02em]">
              Proposals
            </h1>
          </div>
          <Link
            href="/admin/proposals/new"
            className="bg-[#0f172a] text-white px-5 py-2.5 rounded text-[13px] font-medium tracking-[0.01em] hover:bg-[#1e293b] transition-colors"
          >
            New proposal
          </Link>
        </div>

        <ProposalList initialProposals={proposals} />
      </div>
    </div>
  );
}
