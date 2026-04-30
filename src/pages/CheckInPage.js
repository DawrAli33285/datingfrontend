import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../components/baseurl';
import BottomNav from '../components/Bottomnav';

export default function CheckInPage() {
  const navigate = useNavigate();

  const [phase, setPhase] = useState('loading'); 
  const [checkIn, setCheckIn] = useState(null);
  const [sections, setSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState({}); 
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem('token');
 
 
  useEffect(() => {
    const start = async () => {

      const pactMeRes = await fetch(`${BASE_URL}/pact/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!pactMeRes.ok) {
        setErrorMsg('No pact found. Please go back to your dashboard.');
        setPhase('error');
        return;
      }
      const pactMeData = await pactMeRes.json();
      const pactId = pactMeData.pactId;

      
      if (!pactId) {
        setErrorMsg('No pact found. Please go back to your dashboard.');
        setPhase('error');
        return;
      }
      try {
        const res = await axios.post(
          `${BASE_URL}/${pactId}/checkin`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCheckIn(res.data.checkIn);
        setSections(res.data.sections || []);
      
        const initial = {};
        (res.data.sections || []).forEach((s) => {
          initial[s.sectionIndex] = 'still_works';
        });
        setReviews(initial);
        setPhase('intro');
      } catch (err) {
        const msg = err?.response?.data?.message || 'Failed to start check-in.';
        
        if (err?.response?.data?.checkIn) {
          const existing = err.response.data.checkIn;
          setCheckIn(existing);
        
          setErrorMsg('A check-in is already in progress. Please complete it below.');
          setPhase('error');
        } else {
          setErrorMsg(msg);
          setPhase('error');
        }
      }
    };
    start();
  }, []);

  const currentSection = sections[currentIndex];

  const setStatus = (sectionIndex, status) => {
    setReviews((prev) => ({ ...prev, [sectionIndex]: status }));
  };

  const goNext = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleSubmit = async () => {
    if (!checkIn?._id) return;
    setSubmitting(true);
    try {
      const reviewsArr = Object.entries(reviews).map(([sectionIndex, status]) => ({
        sectionIndex: Number(sectionIndex),
        status,
      }));
      const res = await axios.post(
        `${BASE_URL}/checkin/${checkIn._id}/submit`,
        { reviews: reviewsArr },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCheckIn(res.data.checkIn);
      setPhase('done');
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || 'Failed to submit check-in.');
      setPhase('error');
    } finally {
      setSubmitting(false);
    }
  };

  const flaggedCount = Object.values(reviews).filter((s) => s === 'needs_chat').length;
  const isLast = currentIndex === sections.length - 1;

  if (phase === 'loading') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF8F4] gap-3">
        <div className="w-6 h-6 border-2 border-[#6B2D3E] border-t-transparent rounded-full animate-spin" />
        <p className="text-[13px] text-[#B8999F]">Starting your check-in…</p>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="flex-1 flex flex-col bg-[#FAF8F4]">
        <div className="px-5 pt-10 flex-1 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#F5E8EB] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[14px] text-[#2A1A1F] text-center font-medium">{errorMsg}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="h-[42px] px-6 rounded-[12px] bg-[#6B2D3E] text-[#FAF8F4] text-[13px] font-medium"
          >
            Back to dashboard
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (phase === 'intro') {
    return (
      <div className="flex-1 flex flex-col bg-[#FAF8F4]">
        <div className="px-5 pt-3.5 pb-3 bg-white border-b border-[rgba(107,45,62,0.13)]">
          <div className="font-['Cormorant_Garamond'] text-[13px] italic text-[#D4899A]">patto</div>
          <div className="font-['Cormorant_Garamond'] text-[24px] font-normal text-[#2A1A1F] mt-0.5">
            Annual check-in
          </div>
        </div>

        <div className="flex-1 px-5 py-6 flex flex-col gap-5">
          <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] px-4 py-5">
            <p className="text-[13.5px] text-[#2A1A1F] leading-[1.7] mb-2">
              You'll review each section of your pact together and mark whether it still works or needs a conversation.
            </p>
            <p className="text-[12.5px] text-[#7A5560] leading-[1.6]">
              Takes about 20 minutes. Do this together with your partner.
            </p>
          </div>

          <div className="bg-[#F0E9E3] rounded-[14px] px-4 py-4">
            <div className="text-[11px] tracking-[0.06em] uppercase text-[#B8999F] mb-2">Sections to review</div>
            {sections.map((s, i) => (
              <div key={i} className={`flex items-center gap-2 py-1.5 ${i < sections.length - 1 ? 'border-b border-[rgba(107,45,62,0.08)]' : ''}`}>
                <div className="w-[5px] h-[5px] rounded-full bg-[#D4899A] flex-shrink-0" />
                <span className="text-[13px] text-[#2A1A1F]">{s.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pb-4">
          <button
            onClick={() => setPhase('reviewing')}
            className="w-full h-[48px] rounded-[14px] bg-[#6B2D3E] text-[#FAF8F4] text-[14px] font-medium hover:bg-[#5A2535] transition-colors"
          >
            Begin review →
          </button>
        </div>

        <BottomNav />
        <div className="h-[30px] flex justify-center items-center flex-shrink-0">
          <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
        </div>
      </div>
    );
  }

 
  if (phase === 'reviewing' && currentSection) {
    const currentStatus = reviews[currentSection.sectionIndex] || 'still_works';

    return (
      <div className="flex-1 flex flex-col bg-[#FAF8F4]">
    
        <div className="px-5 pt-3.5 pb-3 bg-white border-b border-[rgba(107,45,62,0.13)] flex-shrink-0">
          <div className="flex justify-between items-center mb-3">
            <div className="font-['Cormorant_Garamond'] text-[13px] italic text-[#D4899A]">patto</div>
            <span className="text-[12px] text-[#B8999F]">
              {currentIndex + 1} of {sections.length}
            </span>
          </div>
    
          <div className="w-full h-1 bg-[#F0E9E3] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6B2D3E] rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 px-5 py-5 flex flex-col gap-4 overflow-y-auto">
      
          <div>
            <div className="text-[10.5px] font-medium tracking-[0.06em] text-[#B8999F] uppercase mb-1">
              §{currentSection.sectionIndex + 1}
            </div>
            <div className="font-['Cormorant_Garamond'] text-[26px] text-[#2A1A1F]">
              {currentSection.title}
            </div>
          </div>

        
          {currentSection.summary?.length > 0 && (
            <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] px-4 py-4">
              <div className="text-[10.5px] font-medium tracking-[0.06em] text-[#B8999F] uppercase mb-2.5">
                What you agreed
              </div>
              <div className="flex flex-col gap-2">
                {currentSection.summary.map((ans, i) => (
                  <div key={i} className="flex gap-2">
                    <div className="w-[3px] rounded-full bg-[#D4899A] flex-shrink-0 mt-1" />
                    <p className="text-[13px] text-[#2A1A1F] leading-[1.6]">{ans}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

         
          <div className="flex flex-col gap-2">
            <div className="text-[11px] tracking-[0.05em] uppercase text-[#B8999F] mb-1">
              Does this still work for both of you?
            </div>

            <button
              onClick={() => setStatus(currentSection.sectionIndex, 'still_works')}
              className={`w-full px-4 py-3.5 rounded-[13px] border text-left transition-all ${
                currentStatus === 'still_works'
                  ? 'bg-[#E8F5EE] border-[#0F6E56]'
                  : 'bg-white border-[rgba(107,45,62,0.13)] hover:bg-[#FAF8F4]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  currentStatus === 'still_works' ? 'border-[#0F6E56]' : 'border-[#D4899A]'
                }`}>
                  {currentStatus === 'still_works' && (
                    <div className="w-2 h-2 rounded-full bg-[#0F6E56]" />
                  )}
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#2A1A1F]">Still works ✓</div>
                  <div className="text-[11.5px] text-[#7A5560] mt-0.5">We're aligned on this</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setStatus(currentSection.sectionIndex, 'needs_chat')}
              className={`w-full px-4 py-3.5 rounded-[13px] border text-left transition-all ${
                currentStatus === 'needs_chat'
                  ? 'bg-[#FDF3F0] border-[#C4562A]'
                  : 'bg-white border-[rgba(107,45,62,0.13)] hover:bg-[#FAF8F4]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  currentStatus === 'needs_chat' ? 'border-[#C4562A]' : 'border-[#D4899A]'
                }`}>
                  {currentStatus === 'needs_chat' && (
                    <div className="w-2 h-2 rounded-full bg-[#C4562A]" />
                  )}
                </div>
                <div>
                  <div className="text-[13px] font-medium text-[#2A1A1F]">Needs a conversation</div>
                  <div className="text-[11.5px] text-[#7A5560] mt-0.5">Something has changed or feels off</div>
                </div>
              </div>
            </button>
          </div>
        </div>

       
        <div className="px-5 pb-4 flex gap-2 flex-shrink-0">
          {currentIndex > 0 && (
            <button
              onClick={goPrev}
              className="h-[48px] px-5 rounded-[14px] border border-[rgba(107,45,62,0.2)] text-[#6B2D3E] text-[13px] font-medium hover:bg-[#F5E8EB] transition-colors"
            >
              ← Back
            </button>
          )}
          {!isLast ? (
            <button
              onClick={goNext}
              className="flex-1 h-[48px] rounded-[14px] bg-[#6B2D3E] text-[#FAF8F4] text-[13px] font-medium hover:bg-[#5A2535] transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 h-[48px] rounded-[14px] bg-[#6B2D3E] text-[#FAF8F4] text-[13px] font-medium hover:bg-[#5A2535] transition-colors disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Complete check-in →'}
            </button>
          )}
        </div>

        <BottomNav />
        <div className="h-[30px] flex justify-center items-center flex-shrink-0">
          <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const flagged = checkIn?.flaggedSections || [];

    return (
      <div className="flex-1 flex flex-col bg-[#FAF8F4]">
        <div className="px-5 pt-3.5 pb-3 bg-white border-b border-[rgba(107,45,62,0.13)]">
          <div className="font-['Cormorant_Garamond'] text-[13px] italic text-[#D4899A]">patto</div>
          <div className="font-['Cormorant_Garamond'] text-[24px] font-normal text-[#2A1A1F] mt-0.5">
            Check-in complete
          </div>
        </div>

        <div className="flex-1 px-5 py-6 flex flex-col gap-4">
          <div className="bg-[#E8F5EE] border border-[#0F6E56] rounded-[14px] px-4 py-4 text-center">
            <div className="text-[28px] mb-1">✓</div>
            <div className="text-[14px] font-medium text-[#0F6E56]">
              Check-in #{checkIn?.checkInNumber} complete
            </div>
            <div className="text-[12.5px] text-[#2A6E56] mt-1">
              {sections.length - flaggedCount} section{sections.length - flaggedCount !== 1 ? 's' : ''} still working well
            </div>
          </div>

          {flagged.length > 0 && (
            <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] px-4 py-4">
              <div className="text-[10.5px] font-medium tracking-[0.06em] text-[#C4562A] uppercase mb-2.5">
                Flagged for conversation ({flagged.length})
              </div>
              {flagged.map((title, i) => (
                <div key={i} className={`flex items-center gap-2 py-1.5 ${i < flagged.length - 1 ? 'border-b border-[rgba(107,45,62,0.08)]' : ''}`}>
                  <div className="w-[5px] h-[5px] rounded-full bg-[#C4562A] flex-shrink-0" />
                  <span className="text-[13px] text-[#2A1A1F]">{title}</span>
                </div>
              ))}
              <p className="text-[12px] text-[#7A5560] mt-3 leading-[1.6]">
                Set aside time to revisit these together.
              </p>
            </div>
          )}

          {flagged.length === 0 && (
            <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] px-4 py-4 text-center">
              <p className="text-[13px] text-[#7A5560] leading-[1.6]">
                Everything is aligned. Your pact is solid. 🤍
              </p>
            </div>
          )}
        </div>

        <div className="px-5 pb-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full h-[48px] rounded-[14px] bg-[#6B2D3E] text-[#FAF8F4] text-[13px] font-medium hover:bg-[#5A2535] transition-colors"
          >
            Back to dashboard
          </button>
        </div>

        <BottomNav />
        <div className="h-[30px] flex justify-center items-center flex-shrink-0">
          <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
        </div>
      </div>
    );
  }

  return null;
}