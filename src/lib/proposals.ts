import fs from 'fs'
import path from 'path'
import { Proposal } from '@/types/proposal'

const DATA_DIR = path.join(process.cwd(), 'data', 'proposals')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

export function getAllProposals(): Proposal[] {
  ensureDir()
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'))
  return files
    .map(f => {
      try {
        return JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf-8')) as Proposal
      } catch {
        return null
      }
    })
    .filter(Boolean) as Proposal[]
}

export function getProposalBySlug(slug: string): Proposal | null {
  ensureDir()
  const filePath = path.join(DATA_DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Proposal
  } catch {
    return null
  }
}

export function saveProposal(proposal: Proposal): void {
  ensureDir()
  const filePath = path.join(DATA_DIR, `${proposal.slug}.json`)
  fs.writeFileSync(filePath, JSON.stringify(proposal, null, 2), 'utf-8')
}

export function deleteProposal(slug: string): boolean {
  ensureDir()
  const filePath = path.join(DATA_DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return false
  fs.unlinkSync(filePath)
  return true
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
