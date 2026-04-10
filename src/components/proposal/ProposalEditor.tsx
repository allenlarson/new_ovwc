'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Proposal, ServiceLine, TimelineMilestone, ProposalSection } from '@/types/proposal';

const DEFAULT_MILESTONES: TimelineMilestone[] = [
  { label: 'Scope Item:', task: 'Deposit and Signed Contract' },
  { label: 'Scope Item:', task: 'Wire Framing' },
  { label: 'Scope Item:', task: 'Collect all Assets & Development' },
  { label: 'Scope Item:', task: 'Deploy Staging Site for Client' },
  { label: 'Scope Item:', task: 'Final Testing' },
  { label: 'Scope Item:', task: 'Final Client Sign off and Payment' },
  { label: 'Scope Item:', task: 'Deploy Site & Final Testing' },
];

const DEFAULT_TIMELINE = '3–5 weeks';

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
  const [sections, setSections] = useState<ProposalSection[]>(
    initialData?.sections ?? []
  );
  const [services, setServices] = useState<ServiceLine[]>(
    initialData?.services ?? [{ name: '', price: '', description: '' }]
  );
  const [timelineEstimate, setTimelineEstimate] = useState(initialData?.timelineEstimate ?? DEFAULT_TIMELINE);
  const [milestones, setMilestones] = useState<TimelineMilestone[]>(
    initialData?.milestones?.length ? initialData.milestones : DEFAULT_MILESTONES
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
      sections: sections.filter((s) => s.title.trim() || s.content.trim()),
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

  // Section helpers
  function addSection() {
    setSections((prev) => [...prev, { title: '', content: '' }]);
  }
  function updateSection(i: number, field: keyof ProposalSection, val: string) {
    setSections((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)));
  }
  function removeSection(i: number) {
    setSections((prev) => prev.filter((_, idx) => idx !== i));
  }
  function moveSectionUp(i: number) {
    if (i === 0) return;
    setSections((prev) => {
      const next = [...prev];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      return next;
    });
  }
  function moveSectionDown(i: number) {
    setSections((prev) => {
      if (i === prev.length - 1) return prev;
      const next = [...prev];
      [next[i], next[i + 1]] = [next[i + 1], next[i]];
      return next;
    });
  }

  // Service helpers
  function updateService(i: number, field: keyof ServiceLine, val: string) {
    setServices((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)));
  }
  function addService() { setServices((prev) => [...prev, { name: '', price: '', description: '' }]); }
  function removeService(i: number) { setServices((prev) => prev.filter((_, idx) => idx !== i)); }

  // Milestone helpers
  function updateMilestone(i: number, field: keyof TimelineMilestone, val: string) {
    setMilestones((prev) => prev.map((m, idx) => (idx === i ? { ...m, [field]: val } : m)));
  }
  function addMilestone() { setMilestones((prev) => [...prev, { label: 'Scope Item:', task: '' }]); }
  function removeMilestone(i: number) { setMilestones((prev) => prev.filter((_, idx) => idx !== i)); }

  return (
    <div className="min-h-screen bg-[#f5f4f0] font-sans">

      {/* Sticky top bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-[#ede9e0] flex items-center justify-between px-4 sm:px-8 h-14 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/admin/proposals" className="text-[13px] text-[#94918a] hover:text-[#2d2a24] transition-colors no-underline shrink-0">
            ← <span className="hidden sm:inline">All proposals</span>
          </Link>
          <span className="hidden sm:inline text-[#e0ddd6]">|</span>
          <span className="hidden sm:inline text-[13px] text-[#2d2a24] font-medium truncate">
            {isEdit ? `Editing: ${initialData?.clientName || 'Proposal'}` : 'New proposal'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {saveStatus === 'saved' && <span className="text-[12px] text-[#1e7a4a]">✓ Saved</span>}
          {saveStatus === 'error' && <span className="text-[12px] text-red-600">Failed</span>}
          <button type="button" onClick={() => save('draft')} disabled={saveStatus === 'saving'} className={secondaryBtn}>
            {saveStatus === 'saving' ? 'Saving…' : 'Save draft'}
          </button>
          <button type="button" onClick={copyLink} className={`${secondaryBtn} hidden sm:inline-flex`}>
            {linkCopied ? '✓ Copied!' : 'Copy link'}
          </button>
          {isEdit && (
            <Link href={`/proposal/${currentSlug}`} target="_blank" className={`${secondaryBtn} hidden sm:inline-flex`}>
              Preview ↗
            </Link>
          )}
          <button type="button" onClick={() => save('sent')} disabled={saveStatus === 'saving'} className={primaryBtn}>
            Save &amp; send
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Proposal URL strip */}
        <div className="bg-white border border-[#ede9e0] rounded px-5 py-3 flex items-center gap-3 mb-6">
          <span className="text-[11px] uppercase tracking-[0.08em] text-[#94918a] shrink-0">Proposal URL</span>
          <span className="text-[13px] text-[#2d2a24] font-mono flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{proposalUrl}</span>
          <button type="button" onClick={copyLink} className="text-[11px] text-[#5a5650] border border-[#d8d4cc] px-2.5 py-1 rounded bg-white hover:bg-[#faf9f7] transition-colors">
            {linkCopied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        {/* Client info */}
        <Card title="Client info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        {/* Project overview — always present */}
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
        </Card>

        {/* Dynamic content sections */}
        {sections.map((section, i) => (
          <div key={i} className="bg-white border border-[#ede9e0] rounded p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {/* Reorder buttons */}
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveSectionUp(i)}
                    disabled={i === 0}
                    aria-label="Move section up"
                    className="text-[10px] text-[#c0b8ac] hover:text-[#5a5650] disabled:opacity-30 leading-none px-1"
                  >▲</button>
                  <button
                    type="button"
                    onClick={() => moveSectionDown(i)}
                    disabled={i === sections.length - 1}
                    aria-label="Move section down"
                    className="text-[10px] text-[#c0b8ac] hover:text-[#5a5650] disabled:opacity-30 leading-none px-1"
                  >▼</button>
                </div>
                <span className="text-[11px] font-medium text-[#94918a] uppercase tracking-[0.1em]">
                  Section {i + 1}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeSection(i)}
                aria-label="Remove section"
                className="text-[12px] text-[#c0b8ac] hover:text-red-500 transition-colors"
              >
                Remove
              </button>
            </div>

            <Field label="Section title" htmlFor={`section-title-${i}`} className="mb-3">
              <input
                id={`section-title-${i}`}
                value={section.title}
                onChange={(e) => updateSection(i, 'title', e.target.value)}
                placeholder="e.g. What's Included, Objectives, Why Us..."
                className={inputCls}
              />
            </Field>
            <Field label="Content (one item per line = bullet list; single block = paragraph)" htmlFor={`section-content-${i}`}>
              <textarea
                id={`section-content-${i}`}
                value={section.content}
                onChange={(e) => updateSection(i, 'content', e.target.value)}
                placeholder={'12 social posts per month\nMonthly strategy call\nAnalytics report'}
                className={`${inputCls} min-h-[100px] resize-y`}
              />
            </Field>
          </div>
        ))}

        {/* Add section button */}
        <button
          type="button"
          onClick={addSection}
          className="w-full mb-4 py-3.5 border-[1.5px] border-dashed border-[#d8d4cc] rounded text-[13px] text-[#94918a] hover:bg-white hover:text-[#2d2a24] hover:border-[#b0aaa0] transition-colors"
        >
          + Add content section
        </button>

        {/* Services */}
        <Card title="Services & investment">
          <div className="flex flex-col gap-2 mb-3">
            {services.map((s, i) => (
              <div key={i} className="group flex items-start gap-3 bg-[#faf9f7] border border-[#ede9e0] rounded-lg px-3.5 py-3 hover:border-[#d0ccc4] transition-colors">
                {/* Row number */}
                <span className="shrink-0 w-5 h-5 mt-[7px] rounded-full bg-white border border-[#d8d4cc] text-[10px] font-semibold text-[#94918a] flex items-center justify-center leading-none">
                  {i + 1}
                </span>
                {/* Inputs */}
                <div className="flex-1 flex flex-wrap gap-2 sm:grid sm:grid-cols-[2fr_1fr]">
                  <input value={s.name} onChange={(e) => updateService(i, 'name', e.target.value)} placeholder="Service name" aria-label="Service name" className={`${inputCls} w-full sm:w-auto`} />
                  <div className="flex gap-2 items-center w-full sm:w-auto">
                    <input value={s.price} onChange={(e) => updateService(i, 'price', e.target.value)} placeholder="$1,200/mo" aria-label="Price" className={`${inputCls} flex-1`} />
                  </div>
                </div>
                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removeService(i)}
                  aria-label="Remove service"
                  className="shrink-0 mt-[6px] w-5 h-5 rounded flex items-center justify-center text-[#c0b8ac] hover:text-red-500 hover:bg-red-50 transition-colors text-[14px] leading-none"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addService} className={addRowBtn}>+ Add line item</button>
        </Card>

        {/* Timeline */}
        <Card title="Timeline">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Estimated duration" htmlFor="timeline-estimate">
              <input id="timeline-estimate" value={timelineEstimate} onChange={(e) => setTimelineEstimate(e.target.value)} placeholder="4–6 weeks" className={inputCls} />
            </Field>
          </div>
          <div className="mt-4">
            <p className={fieldLabel}>Milestones</p>
            <div className="flex flex-col gap-2 mb-2.5">
              {milestones.map((m, i) => (
                <div key={i} className="group flex items-start gap-3 bg-[#faf9f7] border border-[#ede9e0] rounded-lg px-3.5 py-3 hover:border-[#d0ccc4] transition-colors">
                  {/* Step number */}
                  <span className="shrink-0 w-5 h-5 mt-[7px] rounded-full bg-white border border-[#d8d4cc] text-[10px] font-semibold text-[#94918a] flex items-center justify-center leading-none">
                    {i + 1}
                  </span>
                  {/* Inputs */}
                  <div className="flex-1 flex flex-wrap gap-2 sm:grid sm:grid-cols-[110px_1fr]">
                    <input value={m.label} onChange={(e) => updateMilestone(i, 'label', e.target.value)} placeholder="Scope Item:" aria-label="Milestone label" className={`${inputCls} w-[110px] sm:w-auto shrink-0`} />
                    <input value={m.task} onChange={(e) => updateMilestone(i, 'task', e.target.value)} placeholder="Deposit and signed contract" aria-label="Milestone task" className={`${inputCls} flex-1 sm:flex-none sm:w-auto`} />
                  </div>
                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeMilestone(i)}
                    aria-label="Remove milestone"
                    className="shrink-0 mt-[6px] w-5 h-5 rounded flex items-center justify-center text-[#c0b8ac] hover:text-red-500 hover:bg-red-50 transition-colors text-[14px] leading-none"
                  >
                    ×
                  </button>
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
      <h3 className="text-[12px] font-medium text-[#94918a] uppercase tracking-[0.1em] mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, htmlFor, children, className = '' }: {
  label: string; htmlFor?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

const fieldLabel = 'block text-[11px] font-medium text-[#94918a] uppercase tracking-[0.08em] mb-1.5';
const inputCls = 'w-full px-3 py-2 border border-[#d8d4cc] rounded text-[13px] bg-white text-[#2d2a24] outline-none focus:border-[#0f172a] transition-colors font-sans';
const primaryBtn = 'bg-[#0f172a] text-white border-none px-5 py-2 rounded text-[13px] font-medium cursor-pointer tracking-[0.01em] hover:bg-[#1e293b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
const secondaryBtn = 'bg-white text-[#5a5650] border border-[#d8d4cc] px-4 py-2 rounded text-[13px] cursor-pointer hover:bg-[#faf9f7] transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
const addRowBtn = 'bg-transparent border border-dashed border-[#d8d4cc] px-3.5 py-1.5 rounded text-[12px] text-[#94918a] cursor-pointer hover:bg-[#faf9f7] transition-colors';
