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
console.log("PACTDATA")
console.log(pactData)
        if (pactRes.ok) {
          const p1=pactData.partnerNames.partner1
          const p2=pactData.partnerNames.partner2
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
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Patto — ${names.partner1} & ${names.partner2}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 700px; margin: 60px auto; color: #2A1A1F; line-height: 1.7; padding: 0 40px; }
    h1 { font-size: 32px; font-weight: normal; text-align: center; margin-bottom: 4px; }
    .subtitle { text-align: center; color: #7A5560; font-size: 14px; margin-bottom: 6px; }
    .date { text-align: center; color: #B8999F; font-size: 12px; margin-bottom: 40px; }
    hr { border: none; border-top: 1px solid #e8ddd9; margin: 32px 0; }
    .topic-title { font-size: 18px; font-weight: bold; color: #6B2D3E; margin-bottom: 4px; }
    .topic-subtitle { font-size: 12px; color: #B8999F; margin-bottom: 16px; }
    .qa { margin-bottom: 14px; }
    .question { font-size: 13px; color: #7A5560; margin-bottom: 2px; }
    .answer { font-size: 14px; color: #2A1A1F; font-weight: bold; }
    .review { font-size: 12px; color: #888; margin-top: 12px; font-style: italic; }
    .signatures { margin-top: 40px; }
    .sig-block { display: flex; gap: 24px; }
    .sig-item { flex: 1; border-top: 1px solid #2A1A1F; padding-top: 8px; font-size: 13px; color: #2A1A1F; }
    .sig-name { font-weight: bold; }
    .sig-date { color: #B8999F; font-size: 11px; }
    .brand { text-align: center; font-style: italic; color: #D4899A; font-size: 13px; margin-bottom: 2px; }
  </style>
</head>
<body>
  <div class="brand">patto</div>
  <h1>${names.partner1} & ${names.partner2}</h1>
  <div class="subtitle">Relationship Agreement</div>
  <div class="date">Generated: ${date}</div>
  <hr/>

  ${topics.map((topic, idx) => `
    <div>
      <div class="topic-title">${idx + 1}. ${topic.title}</div>
      ${topic.subtitle ? `<div class="topic-subtitle">${topic.subtitle}</div>` : ''}
      ${topic.answers.map(qa => `
        <div class="qa">
          <div class="question">${qa.question}</div>
          <div class="answer">${qa.answer}</div>
        </div>
      `).join('')}
      ${topic.partnerReview?.status ? `<div class="review">${names.partner2}'s review: ${voteLabel(topic.partnerReview.status)}</div>` : ''}
    </div>
    <hr/>
  `).join('')}

  <div class="signatures">
    <div class="sig-block">
      ${signatures.map(sig => `
        <div class="sig-item">
          <div class="sig-name">${sig.partnerName}</div>
          <div class="sig-date">Signed ${formatDate(sig.signedAt)}</div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    if (win) {
      win.onload = () => {
        win.print();
        URL.revokeObjectURL(url);
      };
    }
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