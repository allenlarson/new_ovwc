'use client';

import { useState, useRef, useEffect } from 'react';
import { Proposal } from '@/types/proposal';
import Image from 'next/image';

const TC_TEXT = `1. Services. OVWC Creative will provide the services outlined in this proposal for the agreed retainer. Services begin upon receipt of signed proposal and initial deposit.

2. Payment. Invoices are issued on the 1st of each month. Payment is due within 7 days. Late payments incur a 1.5% monthly fee. Services may be paused after 14 days of non-payment.

3. Revisions. Each cycle includes up to 2 rounds of revisions per deliverable. Additional revisions are billed at $75/hour.

4. Cancellation. Either party may cancel with 30 days written notice. Work completed through the notice period will be invoiced at the pro-rated rate.

5. Intellectual property. Upon full payment, all final deliverables become the property of the client. OVWC Creative retains the right to display work in its portfolio.

6. Confidentiality. Both parties agree to keep confidential any proprietary business information shared during the engagement.

7. Limitation of liability. OVWC Creative's liability shall not exceed the total fees paid in the 30 days preceding any claim.`;

export default function ProposalView({ proposal }: { proposal: Proposal }) {
  const [tcOpen, setTcOpen] = useState(false);
  const [sigName, setSigName] = useState('');
  const [sigTitle, setSigTitle] = useState('');
  const [isSigned, setIsSigned] = useState(proposal.status === 'signed');
  const [signing, setSigning] = useState(false);
  const [sigError, setSigError] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sigSectionRef = useRef<HTMLDivElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const hasDrawn = useRef(false);

  const total = proposal.services.reduce((sum, s) => {
    const n = parseFloat(s.price.replace(/[^0-9.]/g, ''));
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  useEffect(() => {
    if (isSigned) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [isSigned]);

  function getPos(e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) {
    const rect = canvas.getBoundingClientRect();
    const src = 'touches' in e ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    drawing.current = true;
    const pos = getPos(
      e.nativeEvent as MouseEvent | TouchEvent,
      canvasRef.current!,
    );
    lastPos.current = pos;
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!drawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pos = getPos(e.nativeEvent as MouseEvent | TouchEvent, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
    hasDrawn.current = true;
  }

  function stopDraw() {
    drawing.current = false;
  }

  function clearCanvas() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;
  }

  async function handleSign() {
    setSigError('');
    if (!sigName.trim()) {
      setSigError('Please enter your full name.');
      return;
    }
    if (!hasDrawn.current) {
      setSigError('Please draw your signature.');
      return;
    }
    setSigning(true);
    try {
      const res = await fetch(`/api/proposals/${proposal.slug}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: sigName.trim(), title: sigTitle.trim() }),
      });
      if (!res.ok) throw new Error('Failed');
      setIsSigned(true);
    } catch {
      setSigError('Something went wrong. Please try again.');
    } finally {
      setSigning(false);
    }
  }

  const heroSrc = proposal.heroImageBase64 || proposal.heroImageUrl || '';

  return (
    <div className="min-h-screen bg-[#f5f4f0] font-sans">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#e8e5de] flex items-center justify-between px-8 py-3">
        <span className="text-[13px] text-[#94918a] tracking-[0.01em]">
          {isSigned
            ? '✓ Proposal signed'
            : `Proposal for ${proposal.clientName}`}
        </span>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => window.print()}
            className="text-[12px] text-[#94918a] border border-[#e0ddd6] px-3.5 py-1.5 rounded hover:bg-[#faf9f7] transition-colors"
          >
            Print / PDF
          </button>
          {!isSigned && (
            <button
              type="button"
              onClick={() =>
                sigSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-[13px] font-medium text-white bg-[#0f172a] px-5 py-2 rounded tracking-[0.01em] hover:bg-[#1e293b] transition-colors"
            >
              Accept proposal
            </button>
          )}
        </div>
      </div>

      {/* Document */}
      <div className="max-w-[800px] mx-auto bg-white shadow-[0_2px_40px_rgba(0,0,0,0.07)]">
        {/* Hero */}
        <div className="relative h-[400px] overflow-hidden bg-[#0f172a]">
          {heroSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroSrc}
              alt=""
              className="w-full h-full object-cover opacity-45 block"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,23,42,0.2)] to-[rgba(15,23,42,0.75)] flex flex-col items-center justify-center text-center px-16 py-10">
            <Image
              src="/proposals/ov_logo_white.png"
              alt="OVWC"
              width={300}
              height={125}
              className="mb-[80px] max-w-[220px]"
            />
            <h1 className="text-[28px] font-normal text-white mb-2 leading-tight tracking-[-0.01em]">
              {proposal.clientName}
            </h1>
            <p className="text-[13px] text-white/60 font-light">
              Proposal presented by OVWC Creative
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-12 py-14 md:px-[72px]">
          {/* Overview */}
          {proposal.overview && (
            <section className="mb-12">
              <SectionTitle>Project overview</SectionTitle>
              <p className="text-[14px] leading-[1.85] text-[#4a4740]">
                {proposal.overview}
              </p>
            </section>
          )}

          {/* Objectives */}
          {proposal.objectives.length > 0 && (
            <section className="mb-12">
              <SectionTitle>Objectives</SectionTitle>
              <ul className="pl-5 space-y-1.5">
                {proposal.objectives.map((o, i) => (
                  <li
                    key={i}
                    className="text-[14px] leading-[1.85] text-[#4a4740]"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Deliverables */}
          {proposal.deliverables.length > 0 && (
            <section className="mb-12">
              <SectionTitle>What&apos;s included</SectionTitle>
              <ul className="pl-5 space-y-1.5">
                {proposal.deliverables.map((d, i) => (
                  <li
                    key={i}
                    className="text-[14px] leading-[1.85] text-[#4a4740]"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Timeline */}
          {proposal.milestones.length > 0 && (
            <section className="mb-12">
              <SectionTitle>Timeline</SectionTitle>
              <div className="border border-[#ede9e0] rounded overflow-hidden">
                <div className="bg-[#f9f8f5] px-6 py-3.5 border-b border-[#ede9e0] flex justify-between items-center">
                  <span className="text-[12px] text-[#94918a] uppercase tracking-[0.08em]">
                    Estimated timeline
                  </span>
                  <span className="text-[16px] font-medium text-[#0f172a]">
                    {proposal.timelineEstimate}
                  </span>
                </div>
                {proposal.milestones.map((m, i) => (
                  <div
                    key={i}
                    className={`px-6 py-3.5 flex gap-4 items-start ${i < proposal.milestones.length - 1 ? 'border-b border-[#f2efe8]' : ''}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-[7px] shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#b5b0a5] uppercase tracking-[0.08em] mb-0.5">
                        {m.label}
                      </p>
                      <p className="text-[14px] text-[#2d2a24]">{m.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Investment */}
          {proposal.services.length > 0 && (
            <section className="mb-12">
              <SectionTitle>Your investment</SectionTitle>
              <table className="w-full border-collapse">
                <tbody>
                  {proposal.services.map((s, i) => (
                    <tr key={i} className="border-b border-[#f2efe8]">
                      <td className="py-3 text-[14px] text-[#2d2a24]">
                        {s.name}
                        {s.description && (
                          <div className="text-[12px] text-[#94918a] mt-0.5">
                            {s.description}
                          </div>
                        )}
                      </td>
                      <td className="py-3 text-[14px] font-medium text-[#0f172a] text-right">
                        {s.price}
                      </td>
                    </tr>
                  ))}
                  {total > 0 && (
                    <tr>
                      <td className="pt-[18px] text-[15px] font-medium text-[#0f172a] border-t-[1.5px] border-[#e0ddd6]">
                        Total
                      </td>
                      <td className="pt-[18px] text-[15px] font-medium text-[#0f172a] text-right border-t-[1.5px] border-[#e0ddd6]">
                        ${total.toLocaleString()}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          )}

          {/* Next steps */}
          {proposal.nextSteps.length > 0 && (
            <section className="mb-12">
              <SectionTitle>Next steps</SectionTitle>
              <ol className="pl-5 space-y-2">
                {proposal.nextSteps.map((s, i) => (
                  <li
                    key={i}
                    className="text-[14px] leading-[1.85] text-[#4a4740]"
                  >
                    {s}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Terms & Conditions */}
          <section className="mb-12">
            <SectionTitle>Terms &amp; conditions</SectionTitle>
            <button
              type="button"
              onClick={() => setTcOpen(v => !v)}
              className={`w-full text-left bg-[#f9f8f5] border border-[#ede9e0] px-5 py-3.5 text-[13px] font-medium text-[#2d2a24] flex justify-between items-center cursor-pointer hover:bg-[#f2efe8] transition-colors ${tcOpen ? 'rounded-t' : 'rounded'}`}
            >
              <span>View terms &amp; conditions</span>
              <span
                className={`text-[10px] transition-transform duration-200 ${tcOpen ? 'rotate-180' : ''}`}
              >
                ▼
              </span>
            </button>
            {tcOpen && (
              <div className="border border-[#ede9e0] border-t-0 rounded-b px-6 py-5">
                {TC_TEXT.split('\n\n').map((para, i) => (
                  <p
                    key={i}
                    className="text-[13px] leading-[1.8] text-[#5a5650] mb-3.5 last:mb-0"
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}
          </section>

          {/* Signature */}
          <section ref={sigSectionRef} className="mb-4">
            <SectionTitle>Approve proposal</SectionTitle>

            {isSigned ? (
              <div className="bg-[#f0faf5] border border-[#a3d4b5] rounded p-8 text-center">
                <div className="text-[32px] text-[#1e7a4a] mb-3">✓</div>
                <p className="text-[15px] font-medium text-[#1e7a4a] mb-1.5">
                  Proposal accepted
                </p>
                <p className="text-[13px] text-[#5a8c6e] mb-5">
                  {proposal.signature
                    ? `Signed by ${proposal.signature.name} on ${new Date(proposal.signature.signedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
                    : 'Your signature has been recorded.'}
                </p>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-[#0f172a] text-white px-6 py-2.5 rounded text-[13px] font-medium hover:bg-[#1e293b] transition-colors"
                >
                  Download signed PDF
                </button>
              </div>
            ) : (
              <div className="bg-[#f9f8f5] border border-[#ede9e0] rounded p-8">
                <p className="text-[13px] text-[#94918a] mb-5 leading-relaxed">
                  To accept this proposal, enter your full name and draw your
                  signature below.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label
                      htmlFor="sig-name"
                      className="block text-[11px] font-medium text-[#94918a] uppercase tracking-[0.08em] mb-1.5"
                    >
                      Full name *
                    </label>
                    <input
                      id="sig-name"
                      value={sigName}
                      onChange={e => setSigName(e.target.value)}
                      placeholder="Jane Smith"
                      className="w-full px-3 py-2 border border-[#d8d4cc] rounded text-[13px] bg-white text-[#2d2a24] outline-none focus:border-[#0f172a] transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sig-title"
                      className="block text-[11px] font-medium text-[#94918a] uppercase tracking-[0.08em] mb-1.5"
                    >
                      Title / Company
                    </label>
                    <input
                      id="sig-title"
                      value={sigTitle}
                      onChange={e => setSigTitle(e.target.value)}
                      placeholder="CEO, Acme Co."
                      className="w-full px-3 py-2 border border-[#d8d4cc] rounded text-[13px] bg-white text-[#2d2a24] outline-none focus:border-[#0f172a] transition-colors"
                    />
                  </div>
                </div>

                <label className="block text-[11px] font-medium text-[#94918a] uppercase tracking-[0.08em] mb-1.5">
                  Signature *
                </label>
                <div className="relative mb-4">
                  <div className="border border-[#d8d4cc] rounded bg-white overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      className="block w-full h-[120px] cursor-crosshair touch-none"
                      onMouseDown={startDraw}
                      onMouseMove={draw}
                      onMouseUp={stopDraw}
                      onMouseLeave={stopDraw}
                      onTouchStart={startDraw}
                      onTouchMove={draw}
                      onTouchEnd={stopDraw}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={clearCanvas}
                    className="absolute top-2 right-2 text-[11px] text-[#94918a] border border-[#ddd] px-2.5 py-0.5 rounded bg-white hover:bg-[#f9f8f5] transition-colors"
                  >
                    Clear
                  </button>
                </div>

                {sigError && (
                  <p className="text-[13px] text-red-600 mb-3">{sigError}</p>
                )}

                <button
                  type="button"
                  onClick={handleSign}
                  disabled={signing}
                  className="w-full py-3.5 bg-[#0f172a] text-white rounded text-[14px] font-medium tracking-[0.01em] transition-colors disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#1e293b]"
                >
                  {signing ? 'Saving...' : 'Accept & sign proposal'}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      <div className="h-[60px]" />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[20px] font-normal text-[#0f172a] mb-4 pb-3 border-b border-[#ede9e0] tracking-[-0.01em]">
      {children}
    </h2>
  );
}
