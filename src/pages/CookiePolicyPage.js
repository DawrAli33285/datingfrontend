import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Cookies = () => (
    <div className="flex flex-col gap-6">
      <InfoBox>
        <Row label="Effective date" value="April 28, 2026" />
        <Row label="Document" value="CP-001" />
        <Row label="Governing entity" value="Traclin Pte Ltd (UEN 202113251D)" />
        <Row label="Contact" value="hello@patto.pro" last />
      </InfoBox>
   
      <div className="bg-[#FBF2F4] border border-[rgba(107,45,62,0.2)] rounded-[12px] px-4 py-3 flex flex-col gap-1.5">
        <p className="text-[11px] font-medium tracking-[0.05em] uppercase text-[#6B2D3E] mb-1">Quick summary</p>
        {[
          'Patto uses minimal cookies — only what is strictly necessary to operate the Service.',
          'We do not use advertising or third-party tracking cookies.',
          'We do not sell or share cookie data with advertisers.',
          'You can manage cookies through your browser settings at any time.',
        ].map((item) => (
          <div key={item} className="flex gap-2 text-[12px] text-[#7A5560]">
            <span className="mt-0.5 flex-shrink-0">✦</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
   
      <Section n="1" title="What Are Cookies?">
        <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, improve user experience, and provide information to website owners. Similar technologies include local storage, session storage, and pixel tags — this policy covers all of these.</p>
      </Section>
   
      <Section n="2" title="Cookies We Use">
        <SubSection title="2.1 Strictly necessary cookies">
          <p className="mb-3">These cookies are essential for the Service to function and cannot be switched off.</p>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-[11.5px] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(107,45,62,0.13)]">
                  {['Cookie', 'Provider', 'Purpose', 'Duration'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 text-[#7A5560] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['sb-access-token', 'Supabase', 'Authenticates your session', '1 hour / logout'],
                  ['sb-refresh-token', 'Supabase', 'Renews session without re-login', '7 days'],
                  ['__stripe_mid', 'Stripe', 'Fraud prevention for payments', '1 year'],
                  ['__stripe_sid', 'Stripe', 'Stripe checkout session', '30 minutes'],
                  ['patto_cookie_consent', 'Patto', 'Stores consent preference', '1 year'],
                ].map(([name, provider, purpose, duration], i, arr) => (
                  <tr key={name} className={i < arr.length - 1 ? 'border-b border-[rgba(107,45,62,0.07)]' : ''}>
                    <td className="py-2 pr-3 text-[#2A1A1F] font-mono text-[10.5px] align-top">{name}</td>
                    <td className="py-2 pr-3 text-[#7A5560] align-top">{provider}</td>
                    <td className="py-2 pr-3 text-[#7A5560] align-top">{purpose}</td>
                    <td className="py-2 text-[#B8999F] align-top">{duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>
        <SubSection title="2.2 Analytics cookies (first-party only)">
          We use Vercel Analytics, a privacy-first analytics tool that does not use cookies and does not track users across websites. It collects aggregated, anonymous data about page views and performance. We do not use Google Analytics, Meta Pixel, or any other third-party advertising or tracking tools.
        </SubSection>
        <SubSection title="2.3 Cookies we do NOT use">
          <BulletList items={[
            'Advertising or retargeting cookies.',
            'Social media tracking pixels (Meta, TikTok, LinkedIn, etc.).',
            'Third-party analytics beyond Vercel Analytics.',
            'Any cookies that track you across third-party websites.',
          ]} />
        </SubSection>
      </Section>
   
      <Section n="3" title="Local Storage and Session Storage">
        <p className="mb-2">In addition to cookies, we use browser local storage and session storage for the following strictly necessary purposes:</p>
        <BulletList items={[
          'Storing your authentication state between page loads.',
          'Caching pact data locally for faster loading.',
          'Remembering your in-progress conversation answers to prevent data loss on page refresh.',
        ]} />
        <p className="text-[12px] text-[#B8999F] mt-2">This data is stored only on your device and is not transmitted to our servers unless you explicitly submit or save it.</p>
      </Section>
   
      <Section n="4" title="Managing and Disabling Cookies">
        <SubSection title="4.1 Browser settings">
          <p className="mb-3">You can control cookies through your browser settings. Please note that disabling strictly necessary cookies may affect your ability to use the Service.</p>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-[11.5px] border-collapse">
              <thead>
                <tr className="border-b border-[rgba(107,45,62,0.13)]">
                  <th className="text-left py-2 pr-4 text-[#7A5560] font-medium">Browser</th>
                  <th className="text-left py-2 text-[#7A5560] font-medium">Path</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Chrome', 'Settings > Privacy and Security > Cookies and other site data'],
                  ['Safari', 'Preferences > Privacy > Manage Website Data'],
                  ['Firefox', 'Settings > Privacy & Security > Cookies and Site Data'],
                  ['Edge', 'Settings > Cookies and site permissions > Cookies and data stored'],
                  ['Opera', 'Settings > Advanced > Privacy & security > Site Settings > Cookies'],
                ].map(([browser, path], i, arr) => (
                  <tr key={browser} className={i < arr.length - 1 ? 'border-b border-[rgba(107,45,62,0.07)]' : ''}>
                    <td className="py-2 pr-4 text-[#2A1A1F] font-medium align-top">{browser}</td>
                    <td className="py-2 text-[#7A5560] align-top text-[11px]">{path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SubSection>
        <SubSection title="4.2 Mobile devices">
          On mobile devices, you can manage cookies and data through your browser app's settings or through your device's privacy settings.
        </SubSection>
        <SubSection title="4.3 Opt-out of Vercel Analytics">
          Vercel Analytics respects the Do Not Track (DNT) browser signal. You can enable DNT in your browser settings to opt out of Vercel's aggregated analytics collection.
        </SubSection>
      </Section>
   
      <Section n="5" title="Cookie Consent">
        <p>When you first visit patto.app, we display a cookie consent notice. Strictly necessary cookies are set without your consent as they are essential for the Service to function. For any non-essential cookies we add in future, we will obtain your prior consent.</p>
      </Section>
   
      <Section n="6" title="Changes to This Policy">
        <p>We may update this Cookie Policy as we introduce new features or as technology and legal requirements change. We will notify you of any material changes via email or in-app notice.</p>
      </Section>
   
      <ContactBox />
    </div>
  );
   
  const Section = ({ n, title, children }) => (
    <div>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-[10px] font-medium tracking-[0.08em] text-[#D4899A] uppercase flex-shrink-0">{n}.</span>
        <h2 className="font-['Cormorant_Garamond'] text-[18px] text-[#2A1A1F]">{title}</h2>
      </div>
      <div className="text-[12.5px] text-[#7A5560] leading-[1.75]">{children}</div>
    </div>
  );
   
  const SubSection = ({ title, children }) => (
    <div className="mb-3 last:mb-0">
      <p className="text-[11.5px] font-medium text-[#2A1A1F] mb-1.5">{title}</p>
      <div className="text-[12.5px] text-[#7A5560] leading-[1.75]">{children}</div>
    </div>
  );
   
  const BulletList = ({ items }) => (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-[12.5px] text-[#7A5560]">
          <span className="text-[#D4899A] mt-0.5 flex-shrink-0">–</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
   
  const AlertBox = ({ title, children }) => (
    <div className="mt-3 bg-[#FEF3DC] border border-[#FAC775] rounded-[12px] px-4 py-3">
      <p className="text-[11px] font-medium tracking-[0.05em] uppercase text-[#854F0B] mb-1">{title}</p>
      <p className="text-[12.5px] text-[#854F0B] leading-[1.7]">{children}</p>
    </div>
  );
   
  const InfoBox = ({ children }) => (
    <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] overflow-hidden">
      {children}
    </div>
  );
   
  const Row = ({ label, value, last }) => (
    <div className={`flex justify-between gap-3 px-4 py-2.5 ${!last ? 'border-b border-[rgba(107,45,62,0.08)]' : ''}`}>
      <span className="text-[11px] text-[#B8999F]">{label}</span>
      <span className="text-[11.5px] text-[#2A1A1F] text-right">{value}</span>
    </div>
  );
   
  const ContactBox = () => (
    <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] p-4">
      <p className="text-[11px] font-medium tracking-[0.05em] uppercase text-[#B8999F] mb-3">Contact</p>
      <div className="flex flex-col gap-1">
        {[
          ['Company', 'Traclin Pte Ltd'],
          ['UEN', '202113251D'],
          ['Address', '68 Circular Road, #02-01, 049422, Singapore'],
          ['Email', 'hello@patto.pro'],
          ['Website', 'patto.app'],
        ].map(([label, value]) => (
          <div key={label} className="flex gap-2 text-[12px]">
            <span className="text-[#B8999F] w-16 flex-shrink-0">{label}</span>
            <span className="text-[#2A1A1F]">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
   
   function LegalPage() {
    const navigate = useNavigate ? useNavigate() : null;
    const [active, setActive] = useState('tos');
   
    const titles = {
      tos: 'Terms & Conditions',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
    };
   
    return (
      <div className="flex-1 flex flex-col bg-[#FAF8F4]">
     
        <div className="px-5 py-[10px] bg-white border-b border-[rgba(107,45,62,0.13)] flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            {navigate && (
              <button
                onClick={() => navigate(-1)}
                className="w-[34px] h-[34px] rounded-full border border-[rgba(107,45,62,0.13)] bg-[#FAF8F4] flex items-center justify-center hover:bg-[#F5E8EB] transition-colors flex-shrink-0"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2A1A1F" strokeWidth="2" strokeLinecap="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
            )}
            <div>
              <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F] mb-0.5">Legal</div>
              <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F]">
                {titles[active]}
              </div>
            </div>
          </div>
   
        
          <div className="flex gap-1.5 mt-1">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`px-3.5 py-1.5 rounded-[8px] text-[12px] font-medium transition-all ${
                  active === id
                    ? 'bg-[#6B2D3E] text-[#FAF8F4]'
                    : 'bg-[#F0E9F1] text-[#7A5560]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
   
       
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {active === 'tos' && <TOS />}
          {active === 'privacy' && <Privacy />}
          {active === 'cookies' && <Cookies />}
        </div>
   
       
        <div className="h-[30px] flex justify-center items-center flex-shrink-0">
          <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
        </div>
      </div>
    );
  }

  export default Cookies;