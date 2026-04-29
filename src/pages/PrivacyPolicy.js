import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// ─── Shared Legal UI Components ───────────────────────────────────────────────

export const InfoBox = ({ children }) => (
    <div className="rounded-xl border border-[#E8D5D8] bg-[#FDF6F7] divide-y divide-[#E8D5D8]">
      {children}
    </div>
  );
  
  export const Row = ({ label, value, last }) => (
    <div className="flex justify-between gap-4 px-4 py-3 text-sm">
      <span className="text-[#9B7280] font-medium">{label}</span>
      <span className="text-[#3D1F27] text-right">{value}</span>
    </div>
  );
  
  export const Section = ({ n, title, children }) => (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-semibold text-[#3D1F27]">{n}. {title}</h2>
      <div className="flex flex-col gap-2 text-sm text-[#5C3A44] leading-relaxed">
        {children}
      </div>
    </div>
  );
  
  export const SubSection = ({ title, children }) => (
    <div className="flex flex-col gap-1">
      <h3 className="text-sm font-semibold text-[#5C3A44]">{title}</h3>
      <div className="text-sm text-[#5C3A44] leading-relaxed">{children}</div>
    </div>
  );
  
  export const AlertBox = ({ title, children }) => (
    <div className="rounded-lg border border-[#F0C0C8] bg-[#FFF0F2] px-4 py-3 mt-2">
      <p className="text-sm font-semibold text-[#9B3A4A] mb-1">{title}</p>
      <p className="text-sm text-[#7A5560] leading-relaxed">{children}</p>
    </div>
  );
  
  export const BulletList = ({ items }) => (
    <ul className="flex flex-col gap-1.5 pl-4">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-[#5C3A44] leading-relaxed list-disc">{item}</li>
      ))}
    </ul>
  );
  
  export const ContactBox = () => (
    <div className="rounded-xl border border-[#E8D5D8] bg-[#FDF6F7] px-4 py-3 mt-2">
      <p className="text-sm text-[#5C3A44] leading-relaxed">
        For questions, contact us at{' '}
        <a href="mailto:hello@patto.pro" className="text-[#9B3A4A] font-medium underline">
          hello@patto.pro
        </a>.
      </p>
    </div>
  );
const Privacy = () => (
    <div className="flex flex-col gap-6">
      <InfoBox>
        <Row label="Effective date" value="April 28, 2026" />
        <Row label="Document" value="PP-001" />
        <Row label="Governing entity" value="Traclin Pte Ltd (UEN 202113251D)" />
        <Row label="Contact" value="hello@patto.pro" last />
      </InfoBox>
   
      <p className="text-[12.5px] text-[#7A5560] leading-[1.7]">
        Traclin Pte Ltd ("we", "us", "our") operates Patto at patto.app. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal data when you use our Service.
      </p>
   
      <div className="bg-[#E8F5EE] border border-[#9FE1CB] rounded-[12px] px-4 py-3 flex flex-col gap-1.5">
        <p className="text-[11px] font-medium tracking-[0.05em] uppercase text-[#0F6E56] mb-1">Summary</p>
        {[
          ['Account data (name, email)', 'to provide the Service'],
          ['Relationship answers', 'to generate your Pact, stored encrypted'],
          ['Payment data', 'processed by Stripe, we store only plan status'],
          ['Usage data', 'to improve the Service (no third-party tracking SDKs in v1)'],
        ].map(([what, why]) => (
          <div key={what} className="flex gap-2 text-[12px] text-[#0F6E56]">
            <span className="mt-0.5 flex-shrink-0">✦</span>
            <span><span className="font-medium">{what}</span> — {why}</span>
          </div>
        ))}
        <p className="text-[12px] font-medium text-[#0F6E56] mt-1">We never sell your personal data. Ever.</p>
      </div>
   
      <Section n="1" title="Data Controller">
        <p>The data controller responsible for your personal data is Traclin Pte Ltd, UEN 202113251D, 68 Circular Road, #02-01, 049422, Singapore. Contact: hello@patto.pro.</p>
      </Section>
   
      <Section n="2" title="Personal Data We Collect">
        <SubSection title="2.1 Data you provide directly">
          <BulletList items={[
            'Account information: first name, email address, password (hashed), pronouns (optional).',
            'Partner information: your partner\'s first name and (if you invite them) their email address.',
            'Relationship answers: your responses to the questions within the Service.',
            'Pact content: the AI-generated Pact text derived from your answers.',
            'Agreement confirmation: a record of when and how you confirmed your Pact.',
          ]} />
        </SubSection>
        <SubSection title="2.2 Data collected automatically">
          <BulletList items={[
            'Log data: IP address (hashed before storage), browser type, operating system, pages visited, and timestamps.',
            'Device data: device type, screen resolution, and language settings.',
            'Session data: authentication tokens and session identifiers.',
          ]} />
        </SubSection>
        <SubSection title="2.3 Data from third parties">
          <BulletList items={[
            'If you register via Google OAuth, we receive your name and email address from Google as permitted by your Google account settings.',
            'Payment metadata from Stripe: subscription status, plan type, and billing country. We do not store card details.',
          ]} />
        </SubSection>
      </Section>
   
      <Section n="3" title="How We Use Your Personal Data">
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-[11.5px] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(107,45,62,0.13)]">
                <th className="text-left py-2 pr-3 text-[#7A5560] font-medium">Purpose</th>
                <th className="text-left py-2 pr-3 text-[#7A5560] font-medium">Data used</th>
                <th className="text-left py-2 text-[#7A5560] font-medium">Legal basis</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Providing the Service', 'Account data, answers, pact content', 'Contract performance'],
                ['Processing payments', 'Email, plan status (via Stripe)', 'Contract performance'],
                ['Transactional emails', 'Email address', 'Contract performance'],
                ['Improving the Service', 'Usage data, log data', 'Legitimate interests'],
                ['Legal compliance', 'As required by law', 'Legal obligation'],
                ['Fraud prevention', 'Log data, IP hash', 'Legitimate interests'],
              ].map(([purpose, data, basis], i, arr) => (
                <tr key={purpose} className={i < arr.length - 1 ? 'border-b border-[rgba(107,45,62,0.07)]' : ''}>
                  <td className="py-2 pr-3 text-[#2A1A1F] align-top">{purpose}</td>
                  <td className="py-2 pr-3 text-[#7A5560] align-top">{data}</td>
                  <td className="py-2 text-[#B8999F] align-top">{basis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[12px] text-[#B8999F] mt-3">We do not use your relationship answers or Pact content for marketing, advertising, or sale to third parties.</p>
      </Section>
   
      <Section n="4" title="How We Share Your Personal Data">
        <p className="mb-3">We do not sell, rent, or trade your personal data. We share data only in the following limited circumstances:</p>
        <SubSection title="4.1 Service providers">
          <BulletList items={[
            'Supabase — database and authentication hosting.',
            'Anthropic, Inc. — AI generation (first names and anonymised answers only; your email is never sent).',
            'Stripe, Inc. — payment processing.',
            'Resend — transactional email delivery.',
            'Vercel — frontend hosting.',
          ]} />
        </SubSection>
        <SubSection title="4.2 Legal requirements">
          We may disclose your data if required by law, regulation, court order, or government authority, or to protect the rights, property, or safety of Traclin Pte Ltd, its users, or others.
        </SubSection>
        <SubSection title="4.3 Business transfers">
          In the event of a merger, acquisition, or sale of assets, your data may be transferred to the successor entity, subject to the same privacy protections.
        </SubSection>
      </Section>
   
      <Section n="5" title="International Data Transfers">
        <p>Traclin Pte Ltd is incorporated in Singapore. Our service providers operate infrastructure in various countries, including the United States and the European Union. Where data is transferred outside Singapore, we ensure appropriate safeguards are in place, including Standard Contractual Clauses or equivalent protections recognised under applicable law.</p>
      </Section>
   
      <Section n="6" title="Data Security">
        <BulletList items={[
          'All data is encrypted in transit using TLS 1.3.',
          'Data at rest is encrypted using AES-256 at the database level.',
          'Your relationship answers and Pact content are stored with row-level security — only you and your partner can access your data.',
          'IP addresses are hashed (SHA-256) before storage. Raw IP addresses are never persisted.',
          'We do not include your email address or other PII in requests to the Anthropic AI API.',
          'Access to production systems is restricted to authorised personnel only.',
        ]} />
        <p className="text-[12px] text-[#B8999F] mt-2">Despite these measures, no system is perfectly secure. We cannot guarantee absolute security and are not liable for breaches beyond our reasonable control.</p>
      </Section>
   
      <Section n="7" title="Data Retention">
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-[11.5px] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(107,45,62,0.13)]">
                <th className="text-left py-2 pr-4 text-[#7A5560] font-medium">Data type</th>
                <th className="text-left py-2 text-[#7A5560] font-medium">Retention period</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Account data', 'Duration of account + 30 days after deletion'],
                ['Relationship answers', 'Duration of account; deleted within 30 days of account deletion'],
                ['Pact content', 'Duration of account; deleted within 30 days of account deletion'],
                ['Log data', '12 months, then aggregated or deleted'],
                ['Payment records', 'As required by financial regulations (typically 7 years)'],
                ['Email delivery records', '90 days'],
              ].map(([type, period], i, arr) => (
                <tr key={type} className={i < arr.length - 1 ? 'border-b border-[rgba(107,45,62,0.07)]' : ''}>
                  <td className="py-2 pr-4 text-[#2A1A1F] align-top">{type}</td>
                  <td className="py-2 text-[#7A5560] align-top">{period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
   
      <Section n="8" title="Your Rights">
        <p className="mb-2">Depending on your jurisdiction, you may have the following rights:</p>
        <BulletList items={[
          'Right to access: request a copy of the personal data we hold about you.',
          'Right to rectification: request correction of inaccurate or incomplete data.',
          'Right to erasure ("right to be forgotten"): request deletion of your personal data.',
          'Right to restriction: request that we restrict processing of your data in certain circumstances.',
          'Right to data portability: receive your data in a structured, machine-readable format.',
          'Right to object: object to processing based on legitimate interests.',
          'Right to withdraw consent: where processing is based on consent, withdraw it at any time.',
        ]} />
        <p className="text-[12px] text-[#B8999F] mt-2">To exercise any of these rights, contact us at hello@patto.pro. We will respond within 30 days.</p>
      </Section>
   
      <Section n="9" title="Children's Privacy">
        <p>The Service is not directed at individuals under 18 years of age. We do not knowingly collect personal data from children. If we become aware that a child has provided us with personal data, we will delete it promptly.</p>
      </Section>
   
      <Section n="10" title="Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. We will notify you of material changes via email or prominent in-app notice at least 14 days before the changes take effect.</p>
      </Section>
   
      <ContactBox />
    </div>
  );

  export default Privacy;