import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../components/baseurl';

export default function PartnerPactReviewPage() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [names, setNames] = useState('');
  const [status, setStatus] = useState('');
  const [createdAt, setCreatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pactId, setPactId] = useState(null);

  useEffect(() => {
    const fetchPact = async () => {
      try {
        const token = localStorage.getItem('token');

        const [reviewRes, pactRes] = await Promise.all([
          fetch(`${BASE_URL}/pact/review/me`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${BASE_URL}/pact/me`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        if (!reviewRes.ok) throw new Error('Failed to fetch pact');
        const data = await reviewRes.json();
        setTopics(data.topics || []);
        setNames(data.names || '');
        setStatus(data.status || '');
        setCreatedAt(data.createdAt);

        if (pactRes.ok) {
          const pactData = await pactRes.json();
          setPactId(pactData.pactId);
        }
      } catch (err) {
        setError(err.message);
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

  const reviewBadge = (status) => {
    if (status === 'agree') return { label: '✓ Agrees — this works for me', bg: 'bg-[#E8F5EE]', text: 'text-[#0F6E56]' };
    if (status === 'agree_with_change') return { label: '~ Agrees, with a small change', bg: 'bg-[#FEF3DC]', text: 'text-[#854F0B]' };
    if (status === 'needs_talk') return { label: "⚑ Let's talk about this first", bg: 'bg-[#F0E9F1]', text: 'text-[#2A1A1F]' };
    return null;
  };

  if (loading) return (
    <div className="flex-1 flex items-center justify-center bg-[#FAF8F4]">
      <p className="text-[#B8999F] text-sm">Loading pact…</p>
    </div>
  );

  if (error) return (
    <div className="flex-1 flex items-center justify-center bg-[#FAF8F4]">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">
    
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
          <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F]">Our pact</div>
          <div className="text-[12px] text-[#B8999F] mt-0.5">Your shared agreement</div>
        </div>
      </div>

      <div className="px-5 py-3.5 flex flex-col gap-2.5 overflow-y-auto">
      
        <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[16px] p-5 text-center">
          <div className="font-['Cormorant_Garamond'] text-[13px] italic text-[#D4899A] tracking-[0.06em] mb-2">
            patto
          </div>
          <div className="font-['Cormorant_Garamond'] text-[26px] font-normal text-[#2A1A1F] mb-1">
            {names || 'Your pact'}
          </div>
          <div className="text-[12px] text-[#B8999F]">
            {`${status === 'signed' ? 'Signed' : 'Draft'} · ${formatDate(createdAt)}`}
          </div>
          <div className="h-px bg-[rgba(107,45,62,0.13)] my-3.5"/>
          <p className="font-['Cormorant_Garamond'] text-[25px] text-[#7A5560] leading-[1.7] italic">
            This pact is not a legal contract. It is a voluntary, living agreement between two people
            who want to be good to each other — today and in the future.
          </p>
        </div>

        {topics.length === 0 && (
          <div className="text-center text-[13px] text-[#B8999F] py-4">No sections yet</div>
        )}

        {topics.map((topic, idx) => {
          const badge = reviewBadge(topic.partnerReview?.status);
          return (
            <div key={topic.id} className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] overflow-hidden">
              <div className="px-3.5 py-2.5 border-b border-[rgba(107,45,62,0.13)]">
                <div className="text-[10.5px] font-medium tracking-[0.04em] text-[#7A5560] uppercase">
                  §{idx + 1} · {topic.title}{topic.subtitle ? ` · ${topic.subtitle}` : ''}
                </div>
              </div>

              <div className="px-3.5 py-3 flex flex-col gap-3">
              
                {(topic.answers ?? []).map((qa, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <p className="text-[11px] text-[#B8999F] leading-[1.5]">{qa.question}</p>
                    <div className="flex gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#D4899A] flex-shrink-0 mt-[7px]"/>
                      <p className="text-[12.5px] text-[#7A5560] leading-[1.6]">{qa.answer}</p>
                    </div>
                  </div>
                ))}

               
              {badge && (
                  <div className="flex flex-col gap-1.5">
                    <div className={`mt-1 rounded-[9px] px-3 py-2 text-[11.5px] font-medium ${badge.bg} ${badge.text}`}>
                      Your review: {badge.label}
                    </div>
                    <button
                      onClick={async () => {
                        const newStatus = window.prompt('Change review to: agree, agree_with_change, or needs_talk');
                        if (!newStatus) return;
                        const token = localStorage.getItem('token');
                        const res = await fetch(`${BASE_URL}/${pactId}/partner-review`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                          body: JSON.stringify({ topicId: topic.id, status: newStatus }),
                        });
                        if (res.ok) {
                          setTopics(prev => prev.map(t =>
                            t.id === topic.id ? { ...t, partnerReview: { status: newStatus } } : t
                          ));
                        }
                      }}
                      className="text-[11px] text-[#B8999F] underline underline-offset-2 text-left hover:text-[#7A5560] transition-colors"
                    >
                      Edit review
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="h-4" />
      </div>

      <div className="h-[30px] flex justify-center items-center flex-shrink-0">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}