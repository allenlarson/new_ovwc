'use client';

import { useState, useRef, useEffect } from 'react';
import { Proposal } from '@/types/proposal';
import Image from 'next/image';

const TC_TEXT = `1. Completion
Oceanview Web Co. and Client must work together to complete the project in a timely manner. Oceanview Web Co. agrees to work expeditiously to complete the project no later than the Agreed Launch Date.

2. Payment
Fees to Oceanview Web Co. are due in accordance with the listed pricing table in the proposal. Work will commence after receipt of a signed proposal and a non-refundable initial deposit of 50%. Fees for monthly services will be invoiced on the 1st business day of each calendar month and are due on a net-30 basis. A late payment fee of 1.5% per month will be applied to any outstanding balance not paid within the agreed terms. All payments will be made in US Dollars.

3. Revision During Execution
The Client may be charged additional fees if it decides to make changes to the agreed-upon project scope and objectives.

4. Legal & License
Oceanview Web Co. warrants that the functionality contained in this project will meet Client requirements and that the operation will be reasonably error-free. The entire risk as to the quality and performance of the project is with the Client. In no event will Oceanview Web Co. be liable to Client or any third party for any damages, including any lost profits, lost savings, or other incidental, consequential, or special damages arising out of the operation of or inability to operate the website, even if Oceanview Web Co. has been advised of the possibility of such damages. If any provision of this agreement shall be unlawful, void, or for any reason unenforceable, then that provision shall be deemed severable from this agreement and shall not affect the validity and enforceability of any remaining provisions.

5. Copyrights & Trademarks
The Client represents to Oceanview Web Co. and unconditionally guarantees that any elements furnished to Oceanview Web Co. for inclusion in the project are owned by the Client, or that the Client has permission from the rightful owner to use each of these elements, and will hold harmless, protect, and defend Oceanview Web Co. and its subcontractors from any claim or suit arising from the use of such elements furnished by the Client.

6. Copyright to Project
Oceanview Web Co. guarantees that all aspects of design and construction of the project will be disclosed to the Client upon completion, and full code, copyrights, and ownership will be the sole property of the Client. Oceanview Web Co. retains the right to display graphics and other design elements as examples of its work in its portfolio.

7. Confidentiality
Both parties agree to keep confidential any proprietary or sensitive business information shared during the engagement and to not disclose such information to any third party without prior written consent.

8. Sole Agreement
The agreement contained in this proposal constitutes the sole agreement between Oceanview Web Co. and the Client regarding this project. Any additional work not specified in this proposal must be authorized by a written change order. All prices specified will be honored for three (3) months after both parties sign this proposal. Continued services after that time will require a new agreement.

9. Termination
The Client may terminate this agreement at any time by providing written notice via email or certified mail to Oceanview Web Co. Oceanview Web Co. may cancel this agreement in the same manner if necessary. In the event that this agreement is canceled by either party, Oceanview Web Co. shall issue a final invoice for any unbilled time or materials. The Client agrees to pay the final invoice according to the terms of this agreement.

10. Conflict Resolution
This agreement shall be governed by the laws of Virginia, United States. Should any conflicts arise related to this agreement, the parties agree to seek a suitable resolution through a neutral arbitrator, whose ruling shall be considered final and binding on both parties.`;

export default function ProposalView({ proposal }: { proposal: Proposal }) {
  const [tcOpen, setTcOpen] = useState(false);
  const [sigName, setSigName] = useState('');
  const [sigTitle, setSigTitle] = useState('');
  const [isSigned, setIsSigned] = useState(proposal.status === 'signed');
  const [signing, setSigning] = useState(false);
  const [sigError, setSigError] = useState('');
  const [sigImage, setSigImage] = useState(proposal.signature?.imageBase64 ?? '');
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
    lastPos.current = getPos(
      e.nativeEvent as MouseEvent | TouchEvent,
      canvasRef.current!,
    );
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
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
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
      const imageBase64 = canvasRef.current?.toDataURL('image/png') ?? '';
      const res = await fetch(`/api/proposals/${proposal.slug}/sign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: sigName.trim(), title: sigTitle.trim(), imageBase64 }),
      });
      if (!res.ok) throw new Error('Failed');
      setSigImage(imageBase64);
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
      <div className="sticky top-0 z-50 bg-white border-b border-[#e8e5de] flex items-center justify-between gap-2 px-4 sm:px-8 py-3">
        <span className="text-[12px] sm:text-[13px] text-[#94918a] tracking-[0.01em] truncate min-w-0">
          {isSigned ? '✓ Signed' : `Proposal · ${proposal.clientName}`}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="hidden sm:block text-[12px] text-[#94918a] border border-[#e0ddd6] px-3.5 py-1.5 rounded hover:bg-[#faf9f7] transition-colors"
          >
            Print / PDF
          </button>
          {!isSigned && (
            <button
              type="button"
              onClick={() =>
                sigSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-[12px] sm:text-[13px] font-medium text-white bg-[#0f172a] px-3.5 sm:px-5 py-2 rounded tracking-[0.01em] hover:bg-[#1e293b] transition-colors whitespace-nowrap"
            >
              Accept proposal
            </button>
          )}
        </div>
      </div>

      {/* Document */}
      <div className="max-w-[800px] mx-auto bg-white shadow-[0_2px_40px_rgba(0,0,0,0.07)]">
        {/* Hero */}
        <div className="relative h-[280px] sm:h-[360px] overflow-hidden bg-[#0f172a]">
          {heroSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroSrc}
              alt=""
              className="w-full h-full object-cover opacity-45 block"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,23,42,0.2)] to-[rgba(15,23,42,0.75)] flex flex-col items-center justify-center text-center px-8 sm:px-16 py-8">
            <Image
              src="/proposals/ov_logo_white.png"
              alt="OVWC"
              width={300}
              height={125}
              className="mb-6 sm:mb-10 w-[140px] sm:w-[200px]"
            />
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-medium text-white mb-2 leading-tight tracking-[-0.01em]">
              {proposal.clientName}
            </h1>
            <p className="text-[12px] sm:text-[13px] text-white/60 font-light">
              Proposal presented by Oceanview Web Co.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-10 sm:px-10 md:px-16 lg:px-[72px]">
          {/* Overview */}
          {proposal.overview && (
            <section className="mb-10">
              <SectionTitle>Project Overview</SectionTitle>
              <p className="text-[14px] leading-[1.85] text-[#4a4740]">
                {proposal.overview}
              </p>
            </section>
          )}

          {/* Dynamic content sections */}
          {proposal.sections?.map((section, i) => {
            const lines = section.content
              .split('\n')
              .map(l => l.trim())
              .filter(Boolean);
            const isList = lines.length > 1;
            return (
              <section key={i} className="mb-10">
                <SectionTitle>{section.title}</SectionTitle>
                {isList ? (
                  <ul className="space-y-3">
                    {lines.map((line, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-[8px] shrink-0" />
                        <span className="text-[14px] leading-[1.85] text-[#4a4740]">{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[14px] leading-[1.85] text-[#4a4740]">
                    {lines[0]}
                  </p>
                )}
              </section>
            );
          })}

          {/* Legacy: objectives/deliverables for old proposals */}
          {!proposal.sections?.length &&
            (proposal as any).objectives?.length > 0 && (
              <section className="mb-10">
                <SectionTitle>Objectives</SectionTitle>
                <ul className="space-y-3">
                  {(proposal as any).objectives.map((o: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-[8px] shrink-0" />
                      <span className="text-[14px] leading-[1.85] text-[#4a4740]">{o}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          {!proposal.sections?.length &&
            (proposal as any).deliverables?.length > 0 && (
              <section className="mb-10">
                <SectionTitle>What&apos;s included</SectionTitle>
                <ul className="space-y-3">
                  {(proposal as any).deliverables.map((d: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] mt-[8px] shrink-0" />
                      <span className="text-[14px] leading-[1.85] text-[#4a4740]">{d}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

          {/* Timeline */}
          {(proposal.milestones.length > 0 || proposal.timelineEstimate) && (
            <section className="mb-10">
              <SectionTitle>Timeline</SectionTitle>
              <div className="border border-[#ede9e0] rounded overflow-hidden">
                <div className="bg-[#f9f8f5] px-4 sm:px-8 py-5 border-b border-[#ede9e0] flex justify-between items-center gap-4">
                  <span className="text-[18px] sm:text-[22px] font-medium text-[#0f172a] tracking-[-0.01em]">
                    Estimated Timeline:
                  </span>
                  <span className="text-[18px] sm:text-[22px] font-medium text-[#0f172a] tracking-[-0.01em] whitespace-nowrap">
                    {proposal.timelineEstimate}
                  </span>
                </div>
                {proposal.milestones.map((m, i) => (
                  <div
                    key={i}
                    className={`px-4 sm:px-8 py-4 ${i < proposal.milestones.length - 1 ? 'border-b border-[#ede9e0]' : ''} ${i % 2 === 1 ? 'bg-[#f9f8f5]' : 'bg-white'}`}
                  >
                    <p className="text-[10px] font-semibold text-[#94918a] uppercase tracking-[0.1em] mb-1">
                      {m.label}
                    </p>
                    <p className="text-[15px] font-medium text-[#0f172a]">{m.task}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Investment */}
          {proposal.services.length > 0 && (
            <section className="mb-10">
              <SectionTitle>Your investment</SectionTitle>
              <table className="w-full border-collapse">
                <tbody>
                  {proposal.services.map((s, i) => (
                    <tr key={i} className="border-b border-[#f2efe8]">
                      <td className="py-3 pr-4 text-[14px] text-[#2d2a24]">
                        {s.name}
                        {s.description && (
                          <div className="text-[12px] text-[#94918a] mt-0.5">
                            {s.description}
                          </div>
                        )}
                      </td>
                      <td className="py-3 text-[14px] font-medium text-[#0f172a] text-right whitespace-nowrap">
                        {s.price}
                      </td>
                    </tr>
                  ))}
                  {total > 0 && (
                    <tr>
                      <td className="pt-4 text-[15px] font-medium text-[#0f172a] border-t-[1.5px] border-[#e0ddd6]">
                        Total
                      </td>
                      <td className="pt-4 text-[15px] font-medium text-[#0f172a] text-right border-t-[1.5px] border-[#e0ddd6] whitespace-nowrap">
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
            <section className="mb-10">
              <SectionTitle>Next steps</SectionTitle>
              <ol className="space-y-3">
                {proposal.nextSteps.map((s, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#0f172a] text-white text-[10px] font-semibold flex items-center justify-center shrink-0 mt-[3px] leading-none">
                      {i + 1}
                    </span>
                    <span className="text-[14px] leading-[1.85] text-[#4a4740]">{s}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Terms & Conditions */}
          <section className="mb-10">
            <SectionTitle>Terms &amp; conditions</SectionTitle>
            <button
              type="button"
              onClick={() => setTcOpen(v => !v)}
              className={`w-full text-left bg-[#f9f8f5] border border-[#ede9e0] px-4 sm:px-5 py-3.5 text-[13px] font-medium text-[#2d2a24] flex justify-between items-center hover:bg-[#f2efe8] transition-colors ${tcOpen ? 'rounded-t' : 'rounded'}`}
            >
              <span>View terms &amp; conditions</span>
              <span
                className={`text-[10px] transition-transform duration-200 shrink-0 ml-2 ${tcOpen ? 'rotate-180' : ''}`}
              >
                ▼
              </span>
            </button>
            {tcOpen && (
              <div className="border border-[#ede9e0] border-t-0 rounded-b px-4 sm:px-6 py-5">
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
              <div className="bg-[#f0faf5] border border-[#a3d4b5] rounded p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#1e7a4a] flex items-center justify-center shrink-0">
                    <span className="text-white text-[14px] font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-medium text-[#1e7a4a]">Proposal accepted</p>
                    <p className="text-[12px] text-[#5a8c6e]">
                      {proposal.signature
                        ? `Signed by ${proposal.signature.name}${proposal.signature.title ? `, ${proposal.signature.title}` : ''} · ${new Date(proposal.signature.signedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`
                        : 'Your signature has been recorded.'}
                    </p>
                  </div>
                </div>

                {/* Signature image */}
                {sigImage && (
                  <div className="bg-white border border-[#a3d4b5] rounded p-4 mb-5">
                    <p className="text-[10px] font-semibold text-[#94918a] uppercase tracking-[0.1em] mb-2">Signature</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={sigImage} alt="Signature" className="max-h-[80px] w-auto" />
                    <div className="mt-2 pt-2 border-t border-[#e0ddd6]">
                      <p className="text-[13px] font-medium text-[#0f172a]">{proposal.signature?.name}</p>
                      {proposal.signature?.title && (
                        <p className="text-[12px] text-[#94918a]">{proposal.signature.title}</p>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-[#0f172a] text-white px-6 py-2.5 rounded text-[13px] font-medium hover:bg-[#1e293b] transition-colors"
                >
                  Download signed PDF
                </button>
              </div>
            ) : (
              <div className="bg-[#f9f8f5] border border-[#ede9e0] rounded p-5 sm:p-8">
                <p className="text-[13px] text-[#94918a] mb-5 leading-relaxed">
                  To accept this proposal, enter your full name and draw your
                  signature below.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
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
                      className="block w-full h-[100px] sm:h-[120px] cursor-crosshair touch-none"
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

      <div className="h-10 sm:h-[60px]" />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl sm:text-2xl font-medium text-[#0f172a] mb-4 pb-3 border-b border-[#ede9e0] tracking-[-0.01em] capitalize">
      {children}
    </h2>
  );
}
