import { notFound } from 'next/navigation';
import { getProposalBySlug, saveProposal } from '@/lib/proposals';
import ProposalView from '@/components/proposal/ProposalView';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProposalPage({ params }: Props) {
  const { slug } = await params;
  const proposal = await getProposalBySlug(slug);
  if (!proposal) notFound();

  if (proposal.status === 'sent' && !proposal.viewedAt) {
    proposal.viewedAt = new Date().toISOString();
    proposal.status = 'viewed';
    await saveProposal(proposal);
  }

  return <ProposalView proposal={proposal} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const proposal = await getProposalBySlug(slug);
  if (!proposal) return { title: 'Proposal Not Found' };
  return {
    title: `Proposal for ${proposal.clientName} | OVWC`,
    description: `Review and sign your proposal from Oceanview Web Co.`,
  };
}
