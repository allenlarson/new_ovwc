import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Oceanview Web Co — the rules and guidelines governing use of our website and services.',
};

export default function TermsPage() {
  return (
    <>
      <section className="relative pt-40 pb-20 px-6 mesh-bg noise overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-sm uppercase tracking-widest text-accent-purple mb-4">Legal</p>
          <h1 className="text-4xl md:text-6xl font-medium leading-tight tracking-tight mb-4">
            Terms of <span className="font-serif italic gradient-text">Service</span>
          </h1>
          <p className="text-muted text-sm">Last updated: April 3, 2026</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto prose-custom space-y-10">

          <div>
            <h2 className="text-xl font-medium mb-3">1. Agreement to Terms</h2>
            <p className="text-muted leading-relaxed">
              By accessing or using the Oceanview Web Co website and services, you agree to be bound by these terms of service. If you do not agree to any part of these terms, you may not access or use our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">2. Services</h2>
            <p className="text-muted leading-relaxed">
              Oceanview Web Co provides web design, search engine optimization, logo design, copywriting, e-commerce development, and paid advertising services. The specific scope, deliverables, timeline, and pricing for each project will be outlined in a separate proposal or contract agreed upon by both parties before work begins.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">3. Intellectual Property</h2>
            <p className="text-muted leading-relaxed">
              Upon full payment, clients receive ownership of all final design files and custom code produced for their project. Oceanview Web Co retains the right to display completed work in our portfolio and marketing materials unless otherwise agreed upon in writing. All pre-existing tools, frameworks, and proprietary processes used in project delivery remain the property of Oceanview Web Co.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">4. Payment Terms</h2>
            <p className="text-muted leading-relaxed">
              Payment terms will be specified in each project proposal. Typically, a deposit is required before work begins, with the remaining balance due upon project completion or at agreed-upon milestones. Late payments may be subject to additional fees and may result in a pause on project work until the balance is settled.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">5. Client Responsibilities</h2>
            <p className="text-muted leading-relaxed">
              Clients are responsible for providing necessary content, brand assets, feedback, and approvals in a timely manner. Delays in providing required materials may affect project timelines. Clients are also responsible for ensuring they have the legal right to use any content, images, or materials they provide to us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">6. Revisions & Approvals</h2>
            <p className="text-muted leading-relaxed">
              Each project includes a defined number of revision rounds as outlined in the project proposal. Additional revisions beyond the agreed scope may incur extra charges. Final approval from the client is required before any website goes live or any deliverables are considered complete.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">7. Limitation of Liability</h2>
            <p className="text-muted leading-relaxed">
              Oceanview Web Co shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services or website. Our total liability for any claim shall not exceed the amount paid by the client for the specific service giving rise to the claim.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">8. Termination</h2>
            <p className="text-muted leading-relaxed">
              Either party may terminate a project with written notice. In the event of termination, the client is responsible for payment for all work completed up to the date of termination. Any deposits or milestone payments for work already completed are non-refundable.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">9. Website Use</h2>
            <p className="text-muted leading-relaxed">
              You may not use this website for any unlawful purpose or in any way that could damage, disable, or impair the site. You may not attempt to gain unauthorized access to any part of the website or its systems. All content on this website is protected by copyright and may not be reproduced without written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">10. Changes to Terms</h2>
            <p className="text-muted leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Continued use of our services after changes are posted constitutes acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">11. Contact Us</h2>
            <p className="text-muted leading-relaxed">
              If you have any questions about these terms, please contact us at{' '}
              <a href="mailto:hello@ovwc.net" className="text-accent-pink hover:underline">hello@ovwc.net</a>.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
