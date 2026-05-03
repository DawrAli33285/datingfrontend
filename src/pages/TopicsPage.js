import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../components/baseurl';

const initialTopics = [
  { id: 'fi', name: 'Fidelity', desc: 'Exclusivity, limits', icon: 'M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z', sel: true },
  { id: 'ho', name: 'Home', desc: 'Living, space, guests', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', sel: true },
  { id: 'mn', name: 'Money', desc: 'Who pays what', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6', sel: true },
  { id: 'fu', name: 'Future', desc: 'Kids, career, where', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', sel: false },
  { id: 'co', name: 'Conflict', desc: 'How to handle it', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', sel: false },
  { id: 'se', name: 'Separation', desc: 'If things end', icon: 'M18 6L6 18M6 6l12 12', sel: false },
];

const topicRoutes = {
  mn: '/chat/money',
  fi: '/chat/fidelity',
  ho: '/chat/home',
  fu: '/chat/future',
  co: '/chat/conflict',
  se: '/chat/separation',
};

export default function TopicsPage() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState(initialTopics);
  const [loading, setLoading] = useState(false);
  
  const [error, setError] = useState(null);


 useEffect(() => {
    const fetchPact = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${BASE_URL}/pact/review/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.selectedTopics?.length > 0) {
          setTopics(prev =>
            prev.map(t => ({ ...t, sel: data.selectedTopics.includes(t.id) }))
          );
        }
      } catch (err) {
        console.log('Could not load saved topics', err);
      }
    };
    fetchPact();
  }, []);

  const toggle = (id) => {
    const selected = topics.filter(t => t.sel);
    setTopics(topics.map(t => {
      if (t.id !== id) return t;
      if (t.sel && selected.length === 1) return t;
      return { ...t, sel: !t.sel };
    }));
  };



  const selectedCount = topics.filter(t => t.sel).length;

  const handleStart = async () => {
    const token = localStorage.getItem('token');
    const selectedTopics = topics.filter(t => t.sel).map(t => t.id);
  
    setLoading(true);
    setError(null);
  
    try {
      
      const res = await fetch(`${BASE_URL}/pact/topics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topics: selectedTopics }),
      });
  
      const data = await res.json();
      
      if (!res.ok) { setError(data.message || 'Something went wrong'); return; }
      localStorage.setItem('pactId', data.pactId); 
      const firstTopic = data.selectedTopics?.[0] || selectedTopics[0];
      navigate(topicRoutes[firstTopic] || '/dashboard');
      
    } catch (err) {
      console.log(err)
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };


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
          <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F]">
            What do you want to cover?
          </div>
          <div className="text-[12px] text-[#B8999F] mt-0.5">
            Pick at least one. Add more any time.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-5 pt-3.5 overflow-y-auto">
        {topics.map(({ id, name, desc, icon, sel }) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`rounded-[13px] p-3.5 text-left border transition-all ${
              sel
                ? 'bg-[#FBF2F4] border-[#6B2D3E]'
                : 'bg-white border-[rgba(107,45,62,0.13)]'
            }`}
          >
            <div className={`w-[30px] h-[30px] rounded-lg flex items-center justify-center mb-2 ${
              sel ? 'bg-[rgba(107,45,62,0.1)]' : 'bg-[#F0E9E3]'
            }`}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={sel ? '#6B2D3E' : '#7A5560'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={icon}/>
              </svg>
            </div>
            <div className={`text-[12.5px] font-medium ${sel ? 'text-[#6B2D3E]' : 'text-[#2A1A1F]'}`}>
              {name}
            </div>
            <div className="text-[11px] text-[#B8999F] mt-0.5">{desc}</div>
          </button>
        ))}
      </div>

      <div className="px-5 pt-3.5 pb-2">
      {error && (
  <div className="text-[12px] text-red-500 text-center mb-2">{error}</div>
)}
<button
  onClick={handleStart}
  disabled={loading}
  className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors disabled:opacity-60"
>
  {loading ? 'Saving...' : `Start with ${selectedCount} topic${selectedCount !== 1 ? 's' : ''}`}
</button>
        <div className="text-center mt-2.5 text-[12px] text-[#B8999F]">
          You'll cover one topic at a time, guided by Patto
        </div>
      </div>

      <div className="h-[30px] flex justify-center items-center">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}