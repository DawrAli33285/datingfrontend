  import { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import { BASE_URL } from '../components/baseurl';
  import BottomNav from '../components/Bottomnav';


  export default function DashboardPage() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
      const fetch = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`${BASE_URL}/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(res.data);
        } catch {
          // fail silently — page shows with empty state
        }
      };
      fetch();
    }, []);

    // Filter out topics already added to the pact
  
    const stats = [
      { value: String(data?.stats?.yearsActive ?? '—'), label: 'year active' },
      { value: String(data?.stats?.topicsCount ?? '—'), label: 'topics' },
      { value: String(data?.stats?.checkInsCount ?? '—'), label: 'check-ins' },
    ];

    const headingName = data?.myName && data?.partnerName
      ? `${data.myName} & ${data.partnerName}`
      : data?.myName || 'Your pact';

    return (
      <div className="flex-1 flex flex-col bg-[#FAF8F4]">

        {/* Header */}
        <div className="px-5 pt-3.5 pb-3 bg-white border-b border-[rgba(107,45,62,0.13)] flex-shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-['Cormorant_Garamond'] text-[13px] italic text-[#D4899A]">patto</div>
              <div className="font-['Cormorant_Garamond'] text-[24px] font-normal text-[#2A1A1F] mt-0.5">
                {headingName}
              </div>
            </div>
            <button
              onClick={() => navigate('/account')}
              className="w-[38px] h-[38px] rounded-full bg-[#F5E8EB] flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5 mt-3">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-[#F0E9E3] rounded-[10px] py-2 text-center">
                <div className="text-[17px] font-medium text-[#2A1A1F]">{value}</div>
                <div className="text-[10px] text-[#B8999F] mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 px-5 py-3.5 flex flex-col gap-2.5 overflow-y-auto">

          {/* Check-in banner */}
          {data?.checkInAvailable && (
            <div className="bg-[#F5E8EB] border border-[#D4899A] rounded-[14px] px-4 py-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
                <span className="text-[12px] font-medium text-[#6B2D3E]">Annual check-in available</span>
              </div>
              <p className="text-[12.5px] text-[#7A5560] leading-[1.6] mb-2.5">
                A year has passed. Your pact can evolve with you. Takes about 20 minutes.
              </p>
              <button
                onClick={() => navigate('/checkin')}
                className="w-full h-[42px] rounded-[12px] bg-[#6B2D3E] text-[#FAF8F4] text-[13px] font-medium hover:bg-[#5A2535] transition-colors"
              >
                Start check-in together →
              </button>
            </div>
          )}

          {/* Pact sections */}
          <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F] mt-1">Your pact</div>
          <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] overflow-hidden">
            {(data?.pactSections ?? []).length === 0 ? (
              <div className="px-3.5 py-4 text-[13px] text-[#B8999F] text-center">No sections yet</div>
            ) : (
              data.pactSections.map(({ id, title, sectionIndex, updatedAt }, i) => (
                <button
                  key={id}
                  onClick={() => navigate('/review')}
                  className={`w-full px-3.5 py-3 flex justify-between items-center text-left hover:bg-[#FAF8F4] transition-colors ${
                    i < data.pactSections.length - 1 ? 'border-b border-[rgba(107,45,62,0.13)]' : ''
                  }`}
                >
                  <div>
                    <div className="text-[10.5px] font-medium tracking-[0.04em] text-[#7A5560] uppercase mb-0.5">
                      §{sectionIndex + 1} · {title}
                    </div>
                    <div className="text-[12px] text-[#B8999F]">
                      Last updated {new Date(updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-medium bg-[#E8F5EE] text-[#0F6E56] flex-shrink-0">
                    Live
                  </span>
                </button>
              ))
            )}
          </div>

          {/* Add new topic */}
        
        </div>

        {/* Bottom nav */}
      <BottomNav/>

        <div className="h-[30px] flex justify-center items-center flex-shrink-0">
          <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
        </div>
      </div>
    );
  }