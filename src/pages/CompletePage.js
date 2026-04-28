import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../components/baseurl';

export default function CompletePage() {
  const navigate = useNavigate();
  const [names, setNames] = useState({ partner1: 'Partner 1', partner2: 'Partner 2' });
  const [signatures, setSignatures] = useState([]);
const [topics, setTopics] = useState([]);
const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const pactRes = await fetch(`${BASE_URL}/pact/review/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pactData = await pactRes.json();

        if (pactRes.ok) {
          const [p1, p2] = pactData.names.split(' & ');
          setNames({ partner1: p1 || 'Partner 1', partner2: p2 || 'Partner 2' });

          const sigRes = await fetch(`${BASE_URL}/pact/${pactData.pactId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const sigData = await sigRes.json();
          if (sigRes.ok) setSignatures(sigData.signatures || []);
          setTopics(pactData.topics || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSigFor = (name) =>
    signatures.find((s) => s.partnerName?.toLowerCase() === name?.toLowerCase());

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-[#FAF8F4]">
      <p className="text-[#B8999F] text-sm">Loading...</p>
    </div>
  );


  const voteLabel = (status) => {
    if (status === 'agree') return '✅ Agrees';
    if (status === 'agree_with_change') return '🟡 Agrees with a small change';
    if (status === 'needs_talk') return "🔴 Let's talk about this first";
    return '—';
  };
  
  const handleDownloadPDF = () => {
    const lines = [];
  
    lines.push(`PATTO — ${names.partner1} & ${names.partner2}`);
    lines.push(`Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);
    lines.push('');
    lines.push('─────────────────────────────────────');
    lines.push('');
  
    topics.forEach((topic, idx) => {
      lines.push(`${idx + 1}. ${topic.title.toUpperCase()}${topic.subtitle ? ` — ${topic.subtitle}` : ''}`);
      lines.push('');
  
      topic.answers.forEach((qa, i) => {
        lines.push(`  Q${i + 1}: ${qa.question}`);
        lines.push(`  A:  ${qa.answer}`);
        lines.push('');
      });
  
      if (topic.partnerReview?.status) {
        lines.push(`  ${names.partner2}'s review: ${voteLabel(topic.partnerReview.status)}`);
        lines.push('');
      }
  
      lines.push('─────────────────────────────────────');
      lines.push('');
    });
  
    lines.push('SIGNATURES');
    lines.push('');
    signatures.forEach((sig) => {
      lines.push(`  ${sig.partnerName} — signed ${formatDate(sig.signedAt)}`);
    });
  
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patto-${names.partner1}-${names.partner2}.txt`.toLowerCase().replace(/\s/g, '-');
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">
      <div className="flex-1 flex flex-col items-center justify-center px-7 text-center">
        <div className="w-[80px] h-[80px] rounded-[24px] bg-[#E8F5EE] flex items-center justify-center mb-5">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="1.2" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h1 className="font-['Cormorant_Garamond'] text-[32px] font-normal text-[#2A1A1F] leading-[1.15] mb-2.5">
          Your pact<br />is complete.
        </h1>
        <p className="text-[14px] text-[#7A5560] leading-[1.75] mb-1.5">
          {names.partner1} and {names.partner2} have both signed. Your pact is now live.
        </p>
        <p className="text-[12px] text-[#B8999F] leading-[1.6]">
          A PDF copy has been sent to both of you.
        </p>

        <div className="mt-6 w-full bg-white border border-[rgba(107,45,62,0.13)] rounded-[16px] p-4 text-left">
          <div className="font-['Cormorant_Garamond'] text-[12px] italic text-[#D4899A] tracking-[0.06em] text-center mb-2.5">
            patto
          </div>
          <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F] text-center mb-3">
            {names.partner1} & {names.partner2}
          </div>
          <div className="flex gap-2.5">
            {[names.partner1, names.partner2].map((name) => {
              const sig = getSigFor(name);
              return (
                <div key={name} className="flex-1 flex items-center gap-2 bg-[#E8F5EE] rounded-[10px] px-3 py-2.5">
                  <div className="w-[22px] h-[22px] rounded-full bg-[#1D9E75] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                      <polyline points="2,6 5,9 10,3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-[#0F6E56]">{name}</div>
                    <div className="text-[10px] text-[#1D9E75]">
                      Agreed · {sig ? formatDate(sig.signedAt) : '—'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 w-full flex flex-col gap-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors"
          >
            Go to your pact →
          </button>
          <button
  onClick={handleDownloadPDF}
  className="w-full h-[46px] rounded-[15px] border border-[#6B2D3E] text-[#6B2D3E] text-[14px] hover:bg-[#F5E8EB] transition-colors"
>
  Download PDF
</button>
        </div>
      </div>

      <div className="h-[30px] flex justify-center items-center flex-shrink-0">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}