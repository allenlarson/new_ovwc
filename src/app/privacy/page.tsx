import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Oceanview Web Co — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <>
      <section className="relative pt-40 pb-20 px-6 mesh-bg noise overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-sm uppercase tracking-widest text-accent-purple mb-4">Legal</p>
          <h1 className="text-4xl md:text-6xl font-medium leading-tight tracking-tight mb-4">
            Privacy <span className="font-serif italic gradient-text">Policy</span>
          </h1>
          <p className="text-muted text-sm">Last updated: April 3, 2026</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto prose-custom space-y-10">

          <div>
            <h2 className="text-xl font-medium mb-3">1. Information We Collect</h2>
            <p className="text-muted leading-relaxed">
              When you use our website or contact us through our forms, we may collect personal information including your name, email address, phone number, company name, and any details you provide about your project. We also automatically collect certain technical data such as your IP address, browser type, and pages visited through standard web analytics.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">2. How We Use Your Information</h2>
            <p className="text-muted leading-relaxed">
              We use the information we collect to respond to your inquiries, provide our services, send project updates and proposals, improve our website and user experience, and communicate relevant information about our services. We will never sell your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">3. Cookies & Analytics</h2>
            <p className="text-muted leading-relaxed">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience and gather analytics data. This helps us understand how visitors interact with our site so we can improve it. You can control cookie preferences through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">4. Third-Party Services</h2>
            <p className="text-muted leading-relaxed">
              We may use third-party services for analytics, email delivery, and hosting. These services may have access to certain data necessary to perform their functions but are obligated not to use it for other purposes. Our website is hosted on Vercel and email services are provided by toSend.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">5. Data Security</h2>
            <p className="text-muted leading-relaxed">
              We take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. Our website uses HTTPS encryption for all data transmission. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">6. Your Rights</h2>
            <p className="text-muted leading-relaxed">
              You have the right to access, correct, or delete your personal information at any time. You may also opt out of any marketing communications we send. To exercise any of these rights, please contact us at hello@ovwc.net.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">7. Children&apos;s Privacy</h2>
            <p className="text-muted leading-relaxed">
              Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a child, we will take steps to delete it promptly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">8. Changes to This Policy</h2>
            <p className="text-muted leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-medium mb-3">9. Contact Us</h2>
            <p className="text-muted leading-relaxed">
              If you have any questions about this privacy policy or our data practices, please contact us at{' '}
              <a href="mailto:hello@ovwc.net" className="text-accent-pink hover:underline">hello@ovwc.net</a>.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
