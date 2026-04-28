import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../components/baseurl';

export default function ReviewPactPage() {
  const navigate = useNavigate();
  const [pact, setPact] = useState(null);
  const [loading, setLoading] = useState(true);


  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  
  useEffect(() => {
    const fetchPact = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/pact/review/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("FETCH PACT")
        console.log(res.data)
        setPact(res.data);
      } catch {
        // fail silently
      } finally {
        setLoading(false);
      }
    };
    fetchPact();
  }, []);

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : '—';


      const voteLabel = (status) => {
        if (status === 'agree') return '✅ Agrees';
        if (status === 'agree_with_change') return '🟡 Agrees with a small change';
        if (status === 'needs_talk') return "🔴 Let's talk about this first";
        return '—';
      };
      
      const handleDownloadPDF = () => {
        const lines = [];
        const names = pact?.names || 'Your pact';
      
        lines.push(`PATTO — ${names}`);
        lines.push(`Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);
        lines.push('');
        lines.push('─────────────────────────────────────');
        lines.push('');
      
        (pact?.topics ?? []).forEach((topic, idx) => {
          lines.push(`${idx + 1}. ${topic.title.toUpperCase()}${topic.subtitle ? ` — ${topic.subtitle}` : ''}`);
          lines.push('');
      
          (topic.answers ?? []).forEach((qa, i) => {
            lines.push(`  Q${i + 1}: ${qa.question}`);
            lines.push(`  A:  ${qa.answer}`);
            lines.push('');
          });
      
          if (topic.partnerReview?.status) {
            lines.push(`  Partner review: ${voteLabel(topic.partnerReview.status)}`);
            lines.push('');
          }
      
          lines.push('─────────────────────────────────────');
          lines.push('');
        });
      
        const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `patto-${names}.txt`.toLowerCase().replace(/\s/g, '-');
        a.click();
        URL.revokeObjectURL(url);
      };
  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">

      {/* Header */}
      <div className="px-5 py-[10px] flex items-center gap-3 bg-white border-b border-[rgba(107,45,62,0.13)] flex-shrink-0">
        <button
          onClick={() => navigate(-1)}
          className="w-[34px] h-[34px] rounded-full border border-[rgba(107,45,62,0.13)] bg-[#FAF8F4] flex items-center justify-center hover:bg-[#F5E8EB] transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2A1A1F" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F]">Review your pact</div>
          <div className="text-[12px] text-[#B8999F] mt-0.5">Read through before signing</div>
        </div>
      </div>

      <div className="px-5 py-3.5 flex flex-col gap-2.5 overflow-y-auto">

        {/* Pact header card */}
        <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[16px] p-5 text-center">
          <div className="font-['Cormorant_Garamond'] text-[13px] italic text-[#D4899A] tracking-[0.06em] mb-2">
            patto
          </div>
          <div className="font-['Cormorant_Garamond'] text-[26px] font-normal text-[#2A1A1F] mb-1">
  {loading ? '...' : (pact?.names || 'Your pact')}
</div>
          <div className="text-[12px] text-[#B8999F]">
            {!loading && `${pact?.status === 'signed' ? 'Signed' : 'Draft'} · ${formatDate(pact?.createdAt)}`}
          </div>
          <div className="h-px bg-[rgba(107,45,62,0.13)] my-3.5"/>
          <p className="font-['Cormorant_Garamond'] text-[14px] text-[#7A5560] leading-[1.7] italic">
            This pact is not a legal contract. It is a voluntary, living agreement between two people
            who want to be good to each other — today and in the future.
          </p>
        </div>

        {/* Loading state */}
        {loading && (
  <div className="text-center text-[13px] text-[#B8999F] py-6">Loading your pact...</div>
)}

{!loading && (pact?.topics ?? []).length === 0 && (
  <div className="text-center text-[13px] text-[#B8999F] py-4">No sections yet</div>
)}


{!loading && (pact?.topics ?? []).map((topic, idx) => (
  <div key={topic.id} className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] overflow-hidden">
 <div className="px-3.5 py-2.5 border-b border-[rgba(107,45,62,0.13)] flex justify-between items-center">
  <div className="text-[10.5px] font-medium tracking-[0.04em] text-[#7A5560] uppercase">
    §{idx + 1} · {topic.title}{topic.subtitle ? ` · ${topic.subtitle}` : ''}
  </div>
  <button
    onClick={() => {
      const titleToRoute = {
        'Money & finances': '/chat/money',
        'Fidelity & boundaries': '/chat/fidelity',
        'Home & living together': '/chat/home',
        'Future': '/chat/future',
        'Conflict': '/chat/conflict',
        'Separation': '/chat/separation',
      };
      const route = titleToRoute[topic.title];
      if (route) navigate(route);
    }}
    className="w-[28px] h-[28px] rounded-full border border-[rgba(107,45,62,0.13)] bg-[#FAF8F4] flex items-center justify-center hover:bg-[#F5E8EB] transition-colors flex-shrink-0"
  >
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="2" strokeLinecap="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  </button>
</div>

    <div className="px-3.5 py-3 flex flex-col gap-3">
      {/* Q&A */}
      {(topic.answers ?? []).map((qa, i) => (
        <div key={i} className="flex flex-col gap-1">
          <p className="text-[11px] text-[#B8999F] leading-[1.5]">{qa.question}</p>
          <div className="flex gap-2">
            <div className="w-1 h-1 rounded-full bg-[#D4899A] flex-shrink-0 mt-[7px]"/>
            <p className="text-[12.5px] text-[#7A5560] leading-[1.6]">{qa.answer}</p>
          </div>
        </div>
      ))}

      {/* Partner review */}
      {topic.partnerReview?.status && (
        <div className={`mt-1 rounded-[9px] px-3 py-2 text-[11.5px] font-medium ${
          topic.partnerReview.status === 'agree'
            ? 'bg-[#E8F5EE] text-[#0F6E56]'
            : topic.partnerReview.status === 'agree_with_change'
            ? 'bg-[#FEF3DC] text-[#854F0B]'
            : 'bg-[#F0E9F1] text-[#2A1A1F]'
        }`}>
          Partner: {
            topic.partnerReview.status === 'agree' ? '✓ Agrees — this works for me' :
            topic.partnerReview.status === 'agree_with_change' ? '~ Agrees, with a small change' :
            "⚑ Let's talk about this first"
          }
        </div>
      )}
    </div>
  </div>
))}

        {/* Optional topics (completed only) */}
        {!loading && (pact?.optionalTopics ?? []).filter(t => t.isComplete).map(({ id, title, subtitle, answers }) => (
          <div key={id} className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] overflow-hidden">
            <div className="px-3.5 py-2.5 border-b border-[rgba(107,45,62,0.13)] flex justify-between items-center">
              <div className="text-[10.5px] font-medium tracking-[0.04em] text-[#7A5560] uppercase">
                {title}{subtitle ? ` · ${subtitle}` : ''}
              </div>
              <button
                onClick={() => navigate(`/chat/optional/${id}`)}
                className="text-[11px] text-[#6B2D3E] underline underline-offset-[2px]"
              >
                Edit
              </button>
            </div>
            <div className="px-3.5 py-3 flex flex-col gap-2">
              {(answers ?? []).map((a, i) => (
                <div key={i} className="flex gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#D4899A] flex-shrink-0 mt-[7px]"/>
                  <p className="text-[12.5px] text-[#7A5560] leading-[1.6]">{a.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sign button — hidden once signed */}
        {!loading && pact?.status !== 'signed' && (
          <button
            onClick={() => navigate('/agree')}
            className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors mt-1"
          >
            This looks right — sign →
          </button>
        )}

<div className="text-center pb-2">
  <span
    onClick={handleDownloadPDF}
    className="text-[12.5px] text-[#B8999F] cursor-pointer"
  >
    Download draft PDF
  </span>
</div>

      </div>

      <div className="h-[30px] flex justify-center items-center flex-shrink-0">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}