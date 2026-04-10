'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Proposal } from '@/types/proposal';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9) + Math.random().toString(36).slice(2, 5);
}

function makeSlug(name: string) {
  return (
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') +
    '-' +
    new Date().getFullYear() +
    '-' +
    Math.random().toString(36).slice(2, 5)
  );
}

export default function ProposalRowActions({
  proposal: p,
  onDeleted,
}: {
  proposal: Proposal;
  onDeleted?: (slug: string) => void;
}) {
  const router = useRouter();
  const [duplicating, setDuplicating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDuplicate() {
    setDuplicating(true);
    try {
      const now = new Date().toISOString();
      const duplicate: Partial<Proposal> = {
        ...p,
        id: generateId(),
        slug: makeSlug(p.clientName || 'untitled'),
        status: 'draft',
        createdAt: now,
        updatedAt: now,
        sentAt: undefined,
        viewedAt: undefined,
        signature: undefined,
      };
      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicate),
      });
      if (!res.ok) throw new Error('Failed');
      const saved = await res.json();
      router.push(`/admin/proposals/${saved.slug}/edit`);
    } catch {
      alert('Failed to duplicate proposal. Please try again.');
      setDuplicating(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete proposal for "${p.clientName || 'Untitled'}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/proposals/${p.slug}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed');
      onDeleted?.(p.slug);
    } catch {
      alert('Failed to delete proposal. Please try again.');
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Link
        href={`/admin/proposals/${p.slug}/edit`}
        className="text-[12px] text-[#5a5650] border border-[#e0ddd6] px-3.5 py-1.5 rounded hover:bg-[#faf9f7] transition-colors"
      >
        Edit
      </Link>
      <button
        type="button"
        onClick={handleDuplicate}
        disabled={duplicating}
        className="text-[12px] text-[#5a5650] border border-[#e0ddd6] px-3.5 py-1.5 rounded hover:bg-[#faf9f7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {duplicating ? 'Copying…' : 'Duplicate'}
      </button>
      <Link
        href={`/proposal/${p.slug}`}
        target="_blank"
        className="text-[12px] text-[#5a5650] border border-[#e0ddd6] px-3.5 py-1.5 rounded hover:bg-[#faf9f7] transition-colors"
      >
        View ↗
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        aria-label="Delete proposal"
        className="w-7 h-7 flex items-center justify-center rounded border border-red-200 text-red-400 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-[14px] leading-none"
      >
        {deleting ? '…' : '×'}
      </button>
    </div>
  );
}
