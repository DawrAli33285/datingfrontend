import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// ─── Helper Components ────────────────────────────────────────────────────────

const InfoBox = ({ children }) => (
  <div className="rounded-xl border border-[#E8D5D8] bg-[#FDF6F7] divide-y divide-[#E8D5D8]">
    {children}
  </div>
);

const Row = ({ label, value, last }) => (
  <div className={`flex justify-between gap-4 px-4 py-3 text-sm ${last ? '' : ''}`}>
    <span className="text-[#9B7280] font-medium">{label}</span>
    <span className="text-[#3D1F27] text-right">{value}</span>
  </div>
);

const Section = ({ n, title, children }) => (
  <div className="flex flex-col gap-3">
    <h2 className="text-base font-semibold text-[#3D1F27]">{n}. {title}</h2>
    <div className="flex flex-col gap-2 text-sm text-[#5C3A44] leading-relaxed">
      {children}
    </div>
  </div>
);

const SubSection = ({ title, children }) => (
  <div className="flex flex-col gap-1">
    <h3 className="text-sm font-semibold text-[#5C3A44]">{title}</h3>
    <div className="text-sm text-[#5C3A44] leading-relaxed">{children}</div>
  </div>
);

const AlertBox = ({ title, children }) => (
  <div className="rounded-lg border border-[#F0C0C8] bg-[#FFF0F2] px-4 py-3 mt-2">
    <p className="text-sm font-semibold text-[#9B3A4A] mb-1">{title}</p>
    <p className="text-sm text-[#7A5560] leading-relaxed">{children}</p>
  </div>
);

const BulletList = ({ items }) => (
  <ul className="flex flex-col gap-1.5 pl-4">
    {items.map((item, i) => (
      <li key={i} className="text-sm text-[#5C3A44] leading-relaxed list-disc">{item}</li>
    ))}
  </ul>
);

const ContactBox = () => (
  <div className="rounded-xl border border-[#E8D5D8] bg-[#FDF6F7] px-4 py-3 mt-2">
    <p className="text-sm text-[#5C3A44] leading-relaxed">
      For questions about these Terms, contact us at{' '}
      <a href="mailto:hello@patto.pro" className="text-[#9B3A4A] font-medium underline">
        hello@patto.pro
      </a>.
    </p>
  </div>
);

const tabs = [
  { id: 'tos', label: 'Terms' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'cookies', label: 'Cookies' },
];

 
// ─── Terms & Conditions ───────────────────────────────────────────────────────
const TOS = () => (
  <div className="flex flex-col gap-6">
    <InfoBox>
      <Row label="Effective date" value="April 28, 2026" />
      <Row label="Document" value="TC-001" />
      <Row label="Governing entity" value="Traclin Pte Ltd (UEN 202113251D)" />
      <Row label="Registered address" value="68 Circular Road, #02-01, 049422, Singapore" />
      <Row label="Contact" value="hello@patto.pro" last />
    </InfoBox>
 
    <Section n="1" title="Acceptance of Terms">
      <p>By accessing or using Patto (available at patto.app), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you must not use the Service. These Terms constitute a legally binding agreement between you and Traclin Pte Ltd.</p>
      <p className="mt-2">If you are accessing the Service on behalf of another person, you represent that you have authority to bind that person to these Terms.</p>
    </Section>
 
    <Section n="2" title="Description of Service">
      <p>Patto is a web-based application that guides couples through structured conversations about shared expectations, values, and agreements relating to their relationship. The output is a co-authored document ("Pact") reflecting the voluntary, mutual understanding of both users.</p>
      <AlertBox title="Important limitation">
        Patto is not a legal service. Pacts generated through the Service are not legal contracts, are not enforceable in any court of law, and do not constitute legal advice. Nothing in the Service creates an attorney-client relationship. For legally binding agreements, consult a qualified legal professional.
      </AlertBox>
    </Section>
 
    <Section n="3" title="Eligibility">
      <BulletList items={[
        'You must be at least 18 years of age to use the Service.',
        'You must have the legal capacity to enter into binding contracts in your jurisdiction.',
        'The Service is not available in jurisdictions where it is prohibited by applicable law.',
        'You must provide accurate, current, and complete information when creating an account.',
      ]} />
    </Section>
 
    <Section n="4" title="Account Registration">
      <SubSection title="4.1 Account creation">
        To access most features of Patto, you must register for an account. You may register using Google OAuth or an email address and password. You are responsible for maintaining the confidentiality of your account credentials.
      </SubSection>
      <SubSection title="4.2 Account security">
        <BulletList items={[
          'You are solely responsible for all activity that occurs under your account.',
          'You must notify us immediately at hello@patto.pro if you suspect any unauthorised access to your account.',
          'We are not liable for any loss or damage arising from your failure to maintain account security.',
        ]} />
      </SubSection>
      <SubSection title="4.3 Account termination">
        You may delete your account at any time through the account settings. We may suspend or terminate your account if we reasonably believe you have violated these Terms, with or without prior notice.
      </SubSection>
    </Section>
 
    <Section n="5" title="Couple Plan Subscription">
      <SubSection title="5.1 Billing">
        The Couple Plan is priced as stated on the pricing page at the time of subscription. Fees are billed monthly in advance. All prices are exclusive of applicable taxes, which will be added where required by law.
      </SubSection>
      <SubSection title="5.2 Payment processing">
        Payments are processed by Stripe, Inc. By providing payment information, you authorise us to charge your payment method for the subscription fee. Payment information is handled by Stripe and subject to Stripe's terms and privacy policy.
      </SubSection>
      <SubSection title="5.3 Promotional codes">
        Promotional codes (including codes offering a free trial period) are subject to the specific terms stated at the time of redemption. At the end of any promotional period, your subscription will automatically renew at the standard rate unless cancelled.
      </SubSection>
      <SubSection title="5.4 Cancellation">
        You may cancel your subscription at any time through your account settings or by contacting us at hello@patto.pro. Cancellation takes effect at the end of the current billing period. No refunds are issued for partial periods.
      </SubSection>
      <SubSection title="5.5 Price changes">
        We reserve the right to change subscription prices. We will provide at least 30 days' notice of any price change via email or in-app notification. Continued use of the Service after a price change constitutes acceptance of the new price.
      </SubSection>
    </Section>
 
    <Section n="6" title="AI-Generated Content">
      <SubSection title="6.1 Nature of AI content">
        Patto uses artificial intelligence (provided by Anthropic, Inc.) to generate Pact text based on answers provided by users. The AI-generated content is derived from your inputs and reflects the information you provide.
      </SubSection>
      <SubSection title="6.2 Accuracy and reliance">
        <BulletList items={[
          'AI-generated Pact text may not accurately reflect the nuances of your intentions. You should review all generated content carefully before confirming your Pact.',
          'We make no warranty that AI-generated content is accurate, complete, or suitable for any particular purpose.',
          'You should not rely on Pact content as a substitute for professional legal, financial, or relationship advice.',
        ]} />
      </SubSection>
      <SubSection title="6.3 Editing and confirmation">
        Both partners must actively confirm their agreement to the Pact by tapping the agreement button. This confirmation represents a voluntary personal commitment, not a legal signature.
      </SubSection>
    </Section>
 
    <Section n="7" title="User Responsibilities">
      <p className="mb-2">You agree not to:</p>
      <BulletList items={[
        'Use the Service for any unlawful purpose or in violation of applicable law.',
        'Provide false, misleading, or fraudulent information.',
        'Attempt to gain unauthorised access to any part of the Service or its infrastructure.',
        'Reverse engineer, decompile, or disassemble any part of the Service.',
        'Use the Service to harass, harm, or threaten any person.',
        'Transmit viruses, malware, or other harmful code.',
        'Scrape, crawl, or extract data from the Service without our express written consent.',
        'Use the Service in a manner that could damage, disable, or impair the Service.',
      ]} />
    </Section>
 
    <Section n="8" title="Intellectual Property">
      <SubSection title="8.1 Our rights">
        Patto, including its design, code, branding, and all content created by us, is owned by Traclin Pte Ltd and protected by applicable intellectual property laws. You receive a limited, non-exclusive, non-transferable licence to use the Service in accordance with these Terms.
      </SubSection>
      <SubSection title="8.2 Your content">
        You retain ownership of the answers and information you input into the Service. By using the Service, you grant us a limited licence to process and use your inputs solely for the purpose of providing the Service to you.
      </SubSection>
      <SubSection title="8.3 Restrictions">
        You may not copy, modify, distribute, sell, or lease any part of the Service or its content, nor may you reverse engineer or attempt to extract the source code of the Service.
      </SubSection>
    </Section>
 
    <Section n="9" title="Disclaimers and Limitation of Liability">
      <SubSection title="9.1 Disclaimer of warranties">
        <p className="text-[12px] font-mono text-[#7A5560] leading-relaxed">
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, TRACLIN PTE LTD DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
      </SubSection>
      <SubSection title="9.2 Limitation of liability">
        <p className="text-[12px] font-mono text-[#7A5560] leading-relaxed">
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, TRACLIN PTE LTD AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF, OR INABILITY TO USE, THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE GREATER OF (A) THE TOTAL AMOUNT PAID BY YOU IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) USD 100.
        </p>
      </SubSection>
      <SubSection title="9.3 Essential basis">
        The limitations in this section reflect a fair allocation of risk and form an essential basis of the bargain between you and us. The Service would not be provided without these limitations.
      </SubSection>
    </Section>
 
    <Section n="10" title="Indemnification">
      <p>You agree to indemnify, defend, and hold harmless Traclin Pte Ltd and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, or your violation of any rights of a third party.</p>
    </Section>
 
    <Section n="11" title="Governing Law and Dispute Resolution">
      <SubSection title="11.1 Governing law">
        These Terms are governed by and construed in accordance with the laws of Singapore, without regard to conflict of law principles.
      </SubSection>
      <SubSection title="11.2 Dispute resolution">
        Any dispute arising out of or in connection with these Terms shall first be attempted to be resolved through good-faith negotiation. If the dispute is not resolved within 30 days, it shall be referred to and finally resolved by arbitration administered by the Singapore International Arbitration Centre (SIAC) in accordance with its rules.
      </SubSection>
      <SubSection title="11.3 Jurisdiction">
        You irrevocably submit to the non-exclusive jurisdiction of the courts of Singapore for any matters not subject to arbitration.
      </SubSection>
    </Section>
 
    <Section n="12" title="Changes to Terms">
      <p>We reserve the right to modify these Terms at any time. We will notify you of material changes via email or prominent in-app notice at least 14 days before the changes take effect. Your continued use of the Service after that date constitutes your acceptance of the updated Terms.</p>
    </Section>
 
    <Section n="13" title="General Provisions">
      <SubSection title="13.1 Severability">If any provision of these Terms is found to be invalid or unenforceable, that provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will continue in full force and effect.</SubSection>
      <SubSection title="13.2 Entire agreement">These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and us regarding the Service.</SubSection>
      <SubSection title="13.3 Waiver">Our failure to enforce any right or provision of these Terms will not be considered a waiver of that right or provision.</SubSection>
      <SubSection title="13.4 Assignment">You may not assign your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations without restriction.</SubSection>
      <SubSection title="13.5 Force majeure">We will not be liable for any failure to perform our obligations where such failure results from circumstances beyond our reasonable control.</SubSection>
    </Section>
 
    <ContactBox />
  </div>
);

export default TOS;