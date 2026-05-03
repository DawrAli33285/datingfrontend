import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../components/baseurl';

const optStyle = {
  neutral: 'bg-[#F0E9F1] border-[#C4A0B0] text-[#2A1A1F]',  // visually distinct when selected
  green:   'bg-[#E8F5EE] border-[#9FE1CB] text-[#0F6E56]',
  yellow:  'bg-[#FEF3DC] border-[#FAC775] text-[#854F0B]',
};


const opts = [
  { label: 'Agree — this works for me', style: 'green' },
  { label: 'Agree, with a small change',  style: 'yellow' },
  { label: "Let's talk about this first",  style: 'neutral' },
];
const voteToStatus = ['agree', 'agree_with_change', 'needs_talk'];


export default function PartnerReviewPage() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [pactId, setPactId] = useState(null);
  const [partnerName, setPartnerName] = useState('');
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noPactYet, setNoPactYet] = useState(false);


  useEffect(() => {
    const fetchPact = async () => {
      try {
        const token = localStorage.getItem('token'); // adjust if stored differently
        const res = await fetch(`${BASE_URL}/pact/review/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("RES")
        console.log(res.data)
        if (res.status === 404) {
          setNoPactYet(true);
          setLoading(false);
          return;
        }
        
        if (!res.ok) throw new Error('Failed to fetch pact');
        
        const data = await res.json();
        
        if (data.code === 'PACT_NOT_READY') {
          setNoPactYet(true);       // reuse the same waiting UI
          setPartnerName(data.partnerName);  // so you can personalise the message
          setLoading(false);  
          return;
        }
        
        setTopics(data.topics);
        setPactId(data.pactId);
        setPartnerName(data.names);

      } catch (err) {
        console.log("ERROR")
        console.log(err)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPact();
  }, []);

  const vote = (topicId, idx) => {
    const key = String(topicId);
    setVotes(v => ({ ...v, [key]: idx }));
  };


  const handleContinue = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const reviews = topics.map((topic) => ({
        topicId: topic.id,
        status: votes[String(topic.id)] != null ? voteToStatus[votes[String(topic.id)]] : null,
      }));

  
      const reviewRes = await fetch(`${BASE_URL}/${pactId}/partner-review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ reviews }),
      });
  
      if (!reviewRes.ok) {
        const err = await reviewRes.json();
        alert(err.message);
        return;
      }
  
      // ✅ Just navigate — signing happens on AgreePage
      navigate('/agree');
    } catch (err) {
      alert('Something went wrong. Please try again.');
    }
  };


  const allVoted = topics.length > 0 && topics.every((topic) => votes[String(topic.id)] != null);

  console.log(topics.map(t => ({ id: t.id, type: typeof t.id })));

  if (loading) return (
    <div className="flex-1 min-h-screen flex items-center justify-center bg-[#FAF8F4]">
      <p className="text-[#B8999F] text-sm">Loading pact…</p>
    </div>
  );

  if (error) return (
    <div className="flex-1 min-h-screen flex items-center justify-center bg-[#FAF8F4]">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );


  if (noPactYet) return (
    <div className="flex-1 min-h-screen flex flex-col items-center justify-center bg-[#FAF8F4] px-8 gap-4">
      <div className="w-12 h-12 rounded-full bg-[#F0E9F1] flex items-center justify-center text-2xl">
        ✦
      </div>
      <div className="text-center">
        <p className="font-['Cormorant_Garamond'] text-[22px] text-[#2A1A1F] mb-1">
          Not quite ready yet
        </p>
        <p className="text-[13px] text-[#B8999F] leading-relaxed">
          {partnerName
            ? `${partnerName} hasn't finished creating the pact yet.`
            : "Your partner hasn't finished creating the pact yet."}
          {" "}You'll be able to review and respond once they're done.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-5 py-2.5 rounded-[10px] border border-[rgba(107,45,62,0.2)] text-[13px] text-[#7A5560] bg-white"
      >
        Check again
      </button>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">
      <div className="px-5 py-[10px] bg-white border-b border-[rgba(107,45,62,0.13)] flex-shrink-0">
        <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F] mb-0.5">
          Reviewing pact by {partnerName}
        </div>
        <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F]">
          Your turn to respond
        </div>
      </div>

      <div className="flex-1 px-5 py-3.5 flex flex-col gap-2.5 overflow-y-auto">
        <div className="bg-[#E8F1FB] border border-[#B5D4F4] rounded-[12px] px-[14px] py-3">
          <p className="text-[12.5px] text-[#185FA5] leading-[1.65]">
            Below you'll see what your partner wrote — you can agree, add your perspective, or flag something to discuss.
          </p>
        </div>

        {topics.map((topic) => (
          <div key={topic.id} className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] overflow-hidden">
            <div className="px-[14px] py-[10px] border-b border-[rgba(107,45,62,0.13)]">
              <div className="text-[10.5px] font-medium tracking-[0.04em] text-[#7A5560] uppercase">
                {topic.title}
              </div>
              {topic.subtitle && (
                <div className="text-[10px] text-[#B8999F]">{topic.subtitle}</div>
              )}
            </div>

            <div className="px-[14px] py-3 flex flex-col gap-[10px]">
         
              {topic.answers.map((qa, i) => (
                <div key={i} className="bg-[#FBF2F4] rounded-[9px] px-3 py-[10px]">
                  <div className="text-[10px] tracking-[0.04em] text-[#D4899A] uppercase mb-1">
                    Q{i + 1}
                  </div>
                  <p className="text-[11px] text-[#B8999F] mb-1 leading-[1.5]">{qa.question}</p>
                  <p className="text-[12.5px] text-[#7A5560] leading-[1.6] font-medium">{qa.answer}</p>
                </div>
              ))}

           
              <div>
                <div className="text-[11px] text-[#B8999F] mb-[7px]">How does this feel to you?</div>
                <div className="flex flex-col gap-1.5">
                  {opts.map(({ label, style }, i) => {
const isSelected = votes[String(topic.id)] === i;
                    return (
                      <button
                        key={i}
                        onClick={() => vote(String(topic.id), i)}
                        className={`px-3 py-[10px] rounded-[9px] border text-[13px] text-left transition-all ${
                          isSelected ? optStyle[style] : 'bg-white border-[rgba(107,45,62,0.13)] text-[#2A1A1F]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}

{!allVoted && (
  <p className="text-center text-[11px] text-[#B8999F]">
    Please respond to all sections to continue.
  </p>
)}
<button
  onClick={handleContinue}
  disabled={!allVoted}
  className={`w-full h-[52px] rounded-[15px] text-[#FAF8F4] text-[15px] font-medium transition-colors mt-1 ${
    allVoted
      ? 'bg-[#6B2D3E] hover:bg-[#5A2535] opacity-100'
      : 'bg-[#6B2D3E] opacity-35 cursor-not-allowed'
  }`}
>
  Continue to sign →
</button>
      </div>

      <div className="h-[30px] flex justify-center items-center flex-shrink-0">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}