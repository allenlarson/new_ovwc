import { NextRequest, NextResponse } from 'next/server';
import { getProposalBySlug, saveProposal } from '@/lib/proposals';
import { createWaveInvoice } from '@/lib/wave';

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proposal = await getProposalBySlug(slug);
  if (!proposal) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (proposal.status === 'signed') return NextResponse.json({ error: 'Already signed' }, { status: 400 });

  const body = await req.json();
  const now = new Date().toISOString();

  proposal.status = 'signed';
  proposal.updatedAt = now;
  proposal.signature = {
    name: body.name,
    title: body.title || '',
    signedAt: now,
    imageBase64: body.imageBase64 || '',
  };

  await saveProposal(proposal);

  // Auto-create Wave invoice (best-effort — don't fail the signing if Wave errors)
  try {
    const invoice = await createWaveInvoice(proposal);
    proposal.waveInvoiceId = invoice.id;
    proposal.waveInvoiceUrl = invoice.viewUrl;
    proposal.waveInvoiceNumber = invoice.invoiceNumber;
    await saveProposal(proposal);
    console.log(`[Wave] Invoice ${invoice.invoiceNumber} created for ${proposal.clientName}`);
  } catch (err) {
    console.error('[Wave] Failed to create invoice:', err);
  }

  return NextResponse.json(proposal);
}
