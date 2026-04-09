import { NextRequest, NextResponse } from 'next/server'
import { getProposalBySlug, saveProposal, deleteProposal } from '@/lib/proposals'
import { Proposal } from '@/types/proposal'

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const proposal = getProposalBySlug(slug)
  if (!proposal) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(proposal)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const existing = getProposalBySlug(slug)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json()
  const updated: Proposal = { ...existing, ...body, updatedAt: new Date().toISOString() }
  saveProposal(updated)
  return NextResponse.json(updated)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const deleted = deleteProposal(slug)
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ success: true })
}
