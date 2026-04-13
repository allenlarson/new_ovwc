import { NextRequest, NextResponse } from 'next/server';
import { getProposalBySlug, saveProposal } from '@/lib/proposals';
import { createWaveInvoice } from '@/lib/wave';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proposal = await getProposalBySlug(slug);
  if (!proposal) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (proposal.waveInvoiceId) {
    return NextResponse.json({ error: 'Invoice already exists', invoiceUrl: proposal.waveInvoiceUrl }, { status: 400 });
  }

  try {
    const invoice = await createWaveInvoice(proposal);
    proposal.waveInvoiceId = invoice.id;
    proposal.waveInvoiceUrl = invoice.viewUrl;
    proposal.waveInvoiceNumber = invoice.invoiceNumber;
    await saveProposal(proposal);
    return NextResponse.json({ success: true, invoiceUrl: invoice.viewUrl, invoiceNumber: invoice.invoiceNumber });
  } catch (err) {
    console.error('[Wave] Manual invoice creation failed:', err);
    return NextResponse.json({ error: 'Failed to create invoice in Wave' }, { status: 500 });
  }
}
