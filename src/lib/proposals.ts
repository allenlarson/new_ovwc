import clientPromise from './mongodb';
import { Proposal } from '@/types/proposal';

const DB = 'ovwc';
const COL = 'proposals';

async function col() {
  const client = await clientPromise;
  return client.db(DB).collection<Proposal>(COL);
}

export async function getAllProposals(): Promise<Proposal[]> {
  const c = await col();
  return c.find({}, { projection: { _id: 0 } }).sort({ updatedAt: -1 }).toArray();
}

export async function getProposalBySlug(slug: string): Promise<Proposal | null> {
  const c = await col();
  return c.findOne({ slug }, { projection: { _id: 0 } });
}

export async function saveProposal(proposal: Proposal): Promise<void> {
  const c = await col();
  await c.replaceOne({ slug: proposal.slug }, proposal, { upsert: true });
}

export async function deleteProposal(slug: string): Promise<boolean> {
  const c = await col();
  const result = await c.deleteOne({ slug });
  return result.deletedCount > 0;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
