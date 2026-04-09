import { NextRequest, NextResponse } from 'next/server'
import { getProposalBySlug, saveProposal } from '@/lib/proposals'

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const proposal = getProposalBySlug(slug)
  if (!proposal) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (proposal.status === 'signed') return NextResponse.json({ error: 'Already signed' }, { status: 400 })

  const body = await req.json()
  const now = new Date().toISOString()

  proposal.status = 'signed'
  proposal.updatedAt = now
  proposal.signature = {
    name: body.name,
    title: body.title || '',
    signedAt: now,
  }

  saveProposal(proposal)
  return NextResponse.json(proposal)
}
