export type ProposalStatus = 'draft' | 'sent' | 'viewed' | 'signed' | 'declined'

export interface ServiceLine {
  name: string
  price: string
  description?: string
}

export interface TimelineMilestone {
  label: string
  task: string
}

export interface ProposalSection {
  title: string
  content: string // newline-separated lines; multi-line renders as bullet list, single block as paragraph
}

export interface Signature {
  name: string
  title: string
  signedAt: string
  ipAddress?: string
  imageBase64?: string
}

export interface Proposal {
  id: string
  slug: string
  status: ProposalStatus

  // Client info
  clientName: string
  clientEmail: string
  clientCompany?: string

  // Hero
  heroImageUrl?: string
  heroImageBase64?: string

  // Content
  overview: string
  sections: ProposalSection[] // flexible content sections after overview

  // Services
  services: ServiceLine[]

  // Timeline
  timelineEstimate: string
  milestones: TimelineMilestone[]

  // Next steps (freeform lines)
  nextSteps: string[]

  // Signature (set when signed)
  signature?: Signature

  // Meta
  validUntil?: string
  createdAt: string
  updatedAt: string
  sentAt?: string
  viewedAt?: string
}
