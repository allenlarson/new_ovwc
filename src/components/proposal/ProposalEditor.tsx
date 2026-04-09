'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Proposal, ServiceLine, TimelineMilestone } from '@/types/proposal';

function makeSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + new Date().getFullYear();
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export default function ProposalEditor({ initialData }: { initialData?: Proposal }) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [clientName, setClientName] = useState(initialData?.clientName ?? '');
  const [clientEmail, setClientEmail] = useState(initialData?.clientEmail ?? '');
  const [clientCompany, setClientCompany] = useState(initialData?.clientCompany ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [overview, setOverview] = useState(initialData?.overview ?? '');
  const [objectives, setObjectives] = useState(initialData?.objectives.join('\n') ?? '');
  const [deliverables, setDeliverables] = useState(initialData?.deliverables.join('\n') ?? '');
  const [services, setServices] = useState<ServiceLine[]>(
    initialData?.services ?? [{ name: '', price: '', description: '' }]
  );
  const [timelineEstimate, setTimelineEstimate] = useState(initialData?.timelineEstimate ?? '');
  const [milestones, setMilestones] = useState<TimelineMilestone[]>(
    initialData?.milestones ?? [{ label: 'Step 1', task: '' }]
  );
  const [nextSteps, setNextSteps] = useState(initialData?.nextSteps.join('\n') ?? '');
  const [validUntil, setValidUntil] = useState(initialData?.validUntil ?? '');
  const [heroImageBase64, setHeroImageBase64] = useState(initialData?.heroImageBase64 ?? '');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [linkCopied, setLinkCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSlug = slug || makeSlug(clientName || 'untitled');
  const proposalUrl = `https://ovwc.net/proposal/${currentSlug}`;

  function handleClientNameChange(val: string) {
    setClientName(val);
    if (!isEdit && val.trim()) setSlug(makeSlug(val));
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setHeroImageBase64(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function buildPayload(status: 'draft' | 'sent'): Partial<Proposal> {
    const now = new Date().toISOString();
    return {
      id: initialData?.id ?? generateId(),
      slug: currentSlug,
      status,
      clientName,
      clientEmail,
      clientCompany,
      heroImageBase64,
      overview,
      objectives: objectives.split('\n').map((s) => s.trim()).filter(Boolean),
      deliverables: deliverables.split('\n').map((s) => s.trim()).filter(Boolean),
      services: services.filter((s) => s.name.trim()),
      timelineEstimate,
      milestones: milestones.filter((m) => m.task.trim()),
      nextSteps: nextSteps.split('\n').map((s) => s.trim()).filter(Boolean),
      validUntil,
      createdAt: initialData?.createdAt ?? now,
      updatedAt: now,
      sentAt: status === 'sent' ? now : initialData?.sentAt,
    };
  }

  async function save(status: 'draft' | 'sent') {
    setSaveStatus('saving');
    try {
      const res = await fetch(
        isEdit ? `/api/proposals/${initialData!.slug}` : '/api/proposals',
        {
          method: isEdit ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(buildPayload(status)),
        }
      );
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
      if (!isEdit) router.push(`/admin/proposals/${saved.slug}/edit`);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(proposalUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  function updateService(i: number, field: keyof ServiceLine, val: string) {
    setServices((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)));
  }
  function addService() { setServices((prev) => [...prev, { name: '', price: '', description: '' }]); }
  function removeService(i: number) { setServices((prev) => prev.filter((_, idx) => idx !== i)); }

  function updateMilestone(i: number, field: keyof TimelineMilestone, val: string) {
    setMilestones((prev) => prev.map((m, idx) => (idx === i ? { ...m, [field]: val } : m)));
  }
  function addMilestone() { setMilestones((prev) => [...prev, { label: `Step ${prev.length + 1}`, task: '' }]); }
  function removeMilestone(i: number) { setMilestones((prev) => prev.filter((_, idx) => idx !== i)); }

  return (
    <div className="min-h-screen bg-[#f5f4f0] font-sans">

      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#ede9e0] flex items-center justify-between px-8 h-14">
        <div className="flex items-center gap-4">
          <Link href="/admin/proposals" className="text-[13px] text-[#94918a] hover:text-[#2d2a24] transition-colors no-underline">
            ← All proposals
          </Link>
          <span className="text-[#e0ddd6]">|</span>
          <span className="text-[13px] text-[#2d2a24] font-medium">
            {isEdit ? `Editing: ${initialData?.clientName || 'Proposal'}` : 'New proposal'}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {saveStatus === 'saved' && <span className="text-[12px] text-[#1e7a4a]">✓ Saved</span>}
          {saveStatus === 'error' && <span className="text-[12px] text-red-600">Save failed</span>}
          <button type="button" onClick={() => save('draft')} disabled={saveStatus === 'saving'} className={secondaryBtn}>
            {saveStatus === 'saving' ? 'Saving...' : 'Save draft'}
          </button>
          <button type="button" onClick={copyLink} className={secondaryBtn}>
            {linkCopied ? '✓ Copied!' : 'Copy link'}
          </button>
          {isEdit && (
            <Link
              href={`/proposal/${currentSlug}`}
              target="_blank"
              className={secondaryBtn}
            >
              Preview ↗
            </Link>
          )}
          <button type="button" onClick={() => save('sent')} disabled={saveStatus === 'saving'} className={primaryBtn}>
            Save &amp; send
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[860px] mx-auto px-6 py-10">

        {/* Proposal URL strip */}
        <div className="bg-white border border-[#ede9e0] rounded px-5 py-3 flex items-center gap-3 mb-6">
          <span className="text-[11px] uppercase tracking-[0.08em] text-[#94918a] shrink-0">Proposal URL</span>
          <span className="text-[13px] text-[#2d2a24] font-mono flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {proposalUrl}
          </span>
          <button type="button" onClick={copyLink} className="text-[11px] text-[#5a5650] border border-[#d8d4cc] px-2.5 py-1 rounded bg-white hover:bg-[#faf9f7] transition-colors">
            {linkCopied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        {/* Client info */}
        <Card title="Client info">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Client / company name *" htmlFor="client-name">
              <input id="client-name" value={clientName} onChange={(e) => handleClientNameChange(e.target.value)} placeholder="Grochow Law" className={inputCls} />
            </Field>
            <Field label="Client email" htmlFor="client-email">
              <input id="client-email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@example.com" type="email" className={inputCls} />
            </Field>
            <Field label="Client company" htmlFor="client-company">
              <input id="client-company" value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} placeholder="Grochow Law LLC" className={inputCls} />
            </Field>
            <Field label="URL slug" htmlFor="client-slug">
              <input id="client-slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="grochow-law-2026" className={inputCls} />
            </Field>
            <Field label="Valid until" htmlFor="valid-until">
              <input id="valid-until" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} type="date" className={inputCls} />
            </Field>
          </div>
        </Card>

        {/* Hero photo */}
        <Card title="Hero photo">
          <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handlePhoto} />
          {heroImageBase64 ? (
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImageBase64} alt="Hero preview" className="w-full h-[180px] object-cover rounded block" />
              <div className="flex gap-2 mt-2.5">
                <button type="button" onClick={() => fileInputRef.current?.click()} className={secondaryBtn}>Change photo</button>
                <button type="button" onClick={() => setHeroImageBase64('')} className="text-[13px] text-red-600 border border-red-200 px-4 py-2 rounded bg-white hover:bg-red-50 transition-colors">Remove</button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-9 border-[1.5px] border-dashed border-[#d8d4cc] rounded bg-[#faf9f7] flex flex-col items-center gap-2 hover:bg-[#f2efe8] transition-colors cursor-pointer"
            >
              <span className="text-[22px] text-[#c9a84c]">↑</span>
              <span className="text-[13px] text-[#5a5650]">Click to upload hero image</span>
              <span className="text-[11px] text-[#94918a]">JPG or PNG · Displayed full-width at top of proposal</span>
            </button>
          )}
        </Card>

        {/* Project overview */}
        <Card title="Project overview">
          <Field label="Overview paragraph" htmlFor="overview">
            <textarea
              id="overview"
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Describe the project goals and what you'll deliver..."
              className={`${inputCls} min-h-[100px] resize-y`}
            />
          </Field>
          <Field label="Objectives (one per line)" htmlFor="objectives" className="mt-4">
            <textarea
              id="objectives"
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder={'Increase inbound inquiries\nImprove brand visibility\nBuild credibility with content'}
              className={`${inputCls} min-h-[90px] resize-y`}
            />
          </Field>
          <Field label="What's included / deliverables (one per line)" htmlFor="deliverables" className="mt-4">
            <textarea
              id="deliverables"
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              placeholder={'12 social posts/month\nMonthly strategy call\nAnalytics report'}
              className={`${inputCls} min-h-[90px] resize-y`}
            />
          </Field>
        </Card>

        {/* Services */}
        <Card title="Services & investment">
          <div className="flex flex-col gap-2 mb-3">
            {services.map((s, i) => (
              <div key={i} className="grid grid-cols-[2fr_1fr_auto] gap-2 items-center">
                <input
                  value={s.name}
                  onChange={(e) => updateService(i, 'name', e.target.value)}
                  placeholder="Service name"
                  aria-label="Service name"
                  className={inputCls}
                />
                <input
                  value={s.price}
                  onChange={(e) => updateService(i, 'price', e.target.value)}
                  placeholder="$1,200/mo"
                  aria-label="Price"
                  className={inputCls}
                />
                <button type="button" onClick={() => removeService(i)} aria-label="Remove service" className="text-[#c0b8ac] hover:text-red-500 text-[18px] leading-none px-1 transition-colors">×</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addService} className={addRowBtn}>+ Add line item</button>
        </Card>

        {/* Timeline */}
        <Card title="Timeline">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Estimated duration" htmlFor="timeline-estimate">
              <input id="timeline-estimate" value={timelineEstimate} onChange={(e) => setTimelineEstimate(e.target.value)} placeholder="4–6 weeks" className={inputCls} />
            </Field>
          </div>
          <div className="mt-4">
            <p className={fieldLabel}>Milestones</p>
            <div className="flex flex-col gap-2 mb-2.5">
              {milestones.map((m, i) => (
                <div key={i} className="grid grid-cols-[120px_1fr_auto] gap-2 items-center">
                  <input
                    value={m.label}
                    onChange={(e) => updateMilestone(i, 'label', e.target.value)}
                    placeholder="Step 1"
                    aria-label="Milestone label"
                    className={inputCls}
                  />
                  <input
                    value={m.task}
                    onChange={(e) => updateMilestone(i, 'task', e.target.value)}
                    placeholder="Deposit and signed contract"
                    aria-label="Milestone task"
                    className={inputCls}
                  />
                  <button type="button" onClick={() => removeMilestone(i)} aria-label="Remove milestone" className="text-[#c0b8ac] hover:text-red-500 text-[18px] leading-none px-1 transition-colors">×</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addMilestone} className={addRowBtn}>+ Add milestone</button>
          </div>
        </Card>

        {/* Next steps */}
        <Card title="Next steps">
          <Field label="Steps (one per line — numbers added automatically)" htmlFor="next-steps">
            <textarea
              id="next-steps"
              value={nextSteps}
              onChange={(e) => setNextSteps(e.target.value)}
              placeholder={'Review this proposal\nApprove and sign\nSubmit deposit to schedule kickoff'}
              className={`${inputCls} min-h-[90px] resize-y`}
            />
          </Field>
        </Card>

        {/* Bottom actions */}
        <div className="flex gap-2.5 justify-end pt-2">
          <button type="button" onClick={() => save('draft')} disabled={saveStatus === 'saving'} className={secondaryBtn}>
            {saveStatus === 'saving' ? 'Saving...' : 'Save draft'}
          </button>
          <button type="button" onClick={() => save('sent')} disabled={saveStatus === 'saving'} className={primaryBtn}>
            Save &amp; send
          </button>
        </div>

      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#ede9e0] rounded p-6 mb-4">
      <h3 className="text-[12px] font-medium text-[#94918a] uppercase tracking-[0.1em] mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className = '',
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={fieldLabel}>
        {label}
      </label>
      {children}
    </div>
  );
}

const fieldLabel = 'block text-[11px] font-medium text-[#94918a] uppercase tracking-[0.08em] mb-1.5';
const inputCls = 'w-full px-3 py-2 border border-[#d8d4cc] rounded text-[13px] bg-white text-[#2d2a24] outline-none focus:border-[#0f172a] transition-colors font-sans';
const primaryBtn = 'bg-[#0f172a] text-white border-none px-5 py-2 rounded text-[13px] font-medium cursor-pointer tracking-[0.01em] hover:bg-[#1e293b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
const secondaryBtn = 'bg-white text-[#5a5650] border border-[#d8d4cc] px-4 py-2 rounded text-[13px] cursor-pointer hover:bg-[#faf9f7] transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
const addRowBtn = 'bg-transparent border border-dashed border-[#d8d4cc] px-3.5 py-1.5 rounded text-[12px] text-[#94918a] cursor-pointer hover:bg-[#faf9f7] transition-colors';
