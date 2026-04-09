import { getProposalBySlug } from '@/lib/proposals'
import { notFound } from 'next/navigation'
import ProposalEditor from '@/components/proposal/ProposalEditor'

export default async function EditProposalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const proposal = getProposalBySlug(slug)
  if (!proposal) notFound()
  return <ProposalEditor initialData={proposal} />
}
