import { faqs } from '@/data/faqs';
import { projects, industryOrder } from '@/data/projects';
import { SITE_URL } from '@/lib/site';

// llms.txt: a plain-text summary of the business for AI assistants (ChatGPT, Claude, Perplexity…).
// Built from the same data as the site so it never drifts out of date.
export const dynamic = 'force-static';

export function GET() {
  const industries = industryOrder.filter((i) => i !== 'All').join(', ');
  const work = projects
    .map((p) => `- ${p.title} (${p.industry}): ${p.desc}`)
    .join('\n');
  const faq = faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n');

  const body = `# Oceanview Web Co.

> Oceanview Web Co. (OVWC) is a web design and digital marketing agency based in Norfolk, Virginia. We build custom websites that turn visitors into clients for real estate, law firms, healthcare, and small businesses in Hampton Roads (Norfolk, Virginia Beach, Chesapeake, Portsmouth, Suffolk, Hampton, Newport News) and across the United States.

## Key facts
- Location: Norfolk, VA, USA. Serves Hampton Roads in person and clients nationwide remotely.
- Founder-led by Allen, with 10+ years of experience and 150+ websites built.
- Pricing: custom business websites typically start at $3,000; quotes are fixed and transparent.
- Timeline: most business websites launch in 4–6 weeks; larger builds take 8–12 weeks.
- Hours: Monday–Friday, 9:00 AM–5:00 PM Eastern.
- Contact: hello@ovwc.net, or the form at ${SITE_URL}/contact
- Social: https://www.facebook.com/OVWebCo/ · https://www.instagram.com/ovwebco/

## Services
- Custom web design & development: responsive, conversion-focused websites.
- Search engine optimization (SEO): on-page, technical, and local SEO, content strategy, monthly reporting.
- Logo design & branding.
- Copywriting: conversion-focused website copy.
- E-commerce development: secure payments, inventory, shipping, optimized checkout.
- Paid advertising: Google and Meta ad campaigns.
- Ongoing website maintenance and support plans.

## Industries
${industries}

## Pages
- [Home](${SITE_URL}/): overview, services, industries, FAQ
- [Services](${SITE_URL}/services): full service details
- [Work](${SITE_URL}/work): portfolio of client websites
- [About](${SITE_URL}/about): the team and approach
- [Contact](${SITE_URL}/contact): start a project

## Selected work
${work}

## Frequently asked questions
${faq}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
