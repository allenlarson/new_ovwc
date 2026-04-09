import Link from 'next/link'
import { getAllProposals } from '@/lib/proposals'
import { Proposal } from '@/types/proposal'

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  draft:    { bg: '#f5f4f0', color: '#94918a', label: 'Draft' },
  sent:     { bg: '#eff6ff', color: '#2563eb', label: 'Sent' },
  viewed:   { bg: '#fef9ef', color: '#b45309', label: 'Viewed' },
  signed:   { bg: '#f0faf5', color: '#1e7a4a', label: 'Signed' },
  declined: { bg: '#fef2f2', color: '#c0392b', label: 'Declined' },
}

export default function AdminProposalsPage() {
  const proposals = getAllProposals()
  proposals.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())

  return (
    <div style={{ minHeight: '100vh', background: '#f5f4f0', fontFamily: "'DM Sans', sans-serif", padding: '48px 40px' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#94918a', marginBottom: 6 }}>
              OVWC Admin
            </p>
            <h1 style={{ fontSize: 28, fontWeight: 400, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
              Proposals
            </h1>
          </div>
          <Link
            href="/admin/proposals/new"
            style={{
              background: '#0f172a', color: 'white',
              padding: '10px 22px', borderRadius: 4,
              fontSize: 13, fontWeight: 500, textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            New proposal
          </Link>
        </div>

        {proposals.length === 0 ? (
          <div style={{
            background: 'white', border: '1px solid #ede9e0',
            borderRadius: 4, padding: '64px 40px', textAlign: 'center',
          }}>
            <p style={{ fontSize: 15, color: '#94918a', margin: '0 0 20px' }}>No proposals yet.</p>
            <Link href="/admin/proposals/new" style={{ fontSize: 14, color: '#0f172a', fontWeight: 500 }}>
              Create your first proposal →
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {proposals.map(p => <ProposalRow key={p.id} proposal={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function ProposalRow({ proposal: p }: { proposal: Proposal }) {
  const s = STATUS_COLORS[p.status] || STATUS_COLORS.draft
  const updated = new Date(p.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div style={{
      background: 'white', border: '1px solid #ede9e0', borderRadius: 4,
      padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16,
    }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: '#0f172a', margin: '0 0 3px' }}>
          {p.clientName || 'Untitled'}
        </p>
        <p style={{ fontSize: 12, color: '#94918a', margin: 0 }}>
          app.ovwc.net/proposal/{p.slug} · Updated {updated}
        </p>
      </div>
      <span style={{
        background: s.bg, color: s.color,
        padding: '3px 10px', borderRadius: 3, fontSize: 11, fontWeight: 500,
      }}>
        {s.label}
      </span>
      <div style={{ display: 'flex', gap: 8 }}>
        <Link
          href={`/admin/proposals/${p.slug}/edit`}
          style={{
            padding: '6px 14px', border: '1px solid #e0ddd6',
            borderRadius: 4, fontSize: 12, color: '#5a5650',
            textDecoration: 'none',
          }}
        >
          Edit
        </Link>
        <Link
          href={`/proposal/${p.slug}`}
          target="_blank"
          style={{
            padding: '6px 14px', border: '1px solid #e0ddd6',
            borderRadius: 4, fontSize: 12, color: '#5a5650',
            textDecoration: 'none',
          }}
        >
          View ↗
        </Link>
      </div>
    </div>
  )
}
