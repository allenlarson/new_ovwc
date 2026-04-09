import { NextRequest, NextResponse } from 'next/server';
import { getAllProposals, saveProposal, generateId, slugify } from '@/lib/proposals';
import { Proposal } from '@/types/proposal';

export async function GET() {
  try {
    const proposals = await getAllProposals();
    return NextResponse.json(proposals);
  } catch {
    return NextResponse.json({ error: 'Failed to load proposals' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const now = new Date().toISOString();
    const slug = body.slug || slugify(body.clientName || 'untitled') + '-' + new Date().getFullYear();

    const proposal: Proposal = {
      id: body.id || generateId(),
      slug,
      status: body.status || 'draft',
      clientName: body.clientName || '',
      clientEmail: body.clientEmail || '',
      clientCompany: body.clientCompany || '',
      heroImageUrl: body.heroImageUrl || '',
      heroImageBase64: body.heroImageBase64 || '',
      overview: body.overview || '',
      objectives: body.objectives || [],
      deliverables: body.deliverables || [],
      services: body.services || [],
      timelineEstimate: body.timelineEstimate || '',
      milestones: body.milestones || [],
      nextSteps: body.nextSteps || [],
      validUntil: body.validUntil || '',
      createdAt: body.createdAt || now,
      updatedAt: now,
      sentAt: body.sentAt,
      viewedAt: body.viewedAt,
      signature: body.signature,
    };

    await saveProposal(proposal);
    return NextResponse.json(proposal);
  } catch {
    return NextResponse.json({ error: 'Failed to save proposal' }, { status: 500 });
  }
}
