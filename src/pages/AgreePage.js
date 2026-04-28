import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../components/baseurl';

export default function AgreePage() {
  const navigate = useNavigate();
  const [myAgreed, setMyAgreed] = useState(false);
  const [partnerAgreed, setPartnerAgreed] = useState(false);
  const [names, setNames] = useState({ partner1: 'Partner 1', partner2: 'Partner 2' });
  const [createdAt, setCreatedAt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mySlot, setMySlot] = useState(null); // 'partner1' or 'partner2'

  const bothAgreed = myAgreed && partnerAgreed;

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
  
      try {
        // 1. Get current user
        const userRes = await fetch(`${BASE_URL}/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        const currentUser = userData.user;
  
        // 2. Get pact (also gives us pactId)
        const pactRes = await fetch(`${BASE_URL}/pact/review/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pactData = await pactRes.json();
  
        if (pactRes.ok) {
          const [p1, p2] = pactData.names.split(' & ');
          setNames({ partner1: p1 || 'Partner 1', partner2: p2 || 'Partner 2' });
          setCreatedAt(pactData.createdAt);
  
          if (currentUser.firstName === p1) {
            setMySlot('partner1');
          } else {
            setMySlot('partner2');
          }
  
          // ✅ Use pactId from API, not localStorage
          const resolvedPactId = pactData.pactId;
  
          // 3. Check signatures
          const sigRes = await fetch(`${BASE_URL}/pact/${resolvedPactId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const sigData = await sigRes.json();
  
          if (sigRes.ok && sigData.signatures) {
            // Only show partner as agreed if both signed
            if (sigData.signatures.length >= 2) setPartnerAgreed(true);
          }

        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  const handleSign = async () => {
    console.log('mySlot:', mySlot);
  console.log('names:', names);


    const token = localStorage.getItem('token');
  
    if (myAgreed) {
      if(localStorage.getItem('isPartner') === 'true'){
        navigate('/partner-pact');
       }else{

         navigate('/waiting');
       }
     
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      // Get pactId from API
      const pactRes = await fetch(`${BASE_URL}/pact/review/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const pactData = await pactRes.json();
      const resolvedPactId = pactData.pactId;
  
      const res = await fetch(`${BASE_URL}/${resolvedPactId}/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ partnerName: mySlot === 'partner1' ? names.partner1 : names.partner2 }),
      });
  
      const data = await res.json();
      console.log("DATA")
      console.log(data)
      if (!res.ok) {
        if (data.message === 'You have already signed this pact') {
         if(localStorage.getItem('isPartner') === 'true'){
          navigate('/partner-pact');
         }else{

           navigate('/waiting');
         }
          return;
        }
        setError(data.message || 'Something went wrong');
        return;
      }
      if(localStorage.getItem('isPartner') === 'true'){
        navigate('/partner-pact');
       }else{

         navigate('/waiting');
       }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  const AgreeBox = ({ name, agreed, onToggle, isMe }) => (
    <button
      onClick={isMe ? onToggle : undefined}
      className={`w-full flex items-center gap-3.5 rounded-[14px] p-4 border transition-all text-left ${
        agreed
          ? 'bg-[#F5E8EB] border-[#6B2D3E]'
          : 'bg-white border-[rgba(107,45,62,0.13)]'
      } ${!isMe ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
        agreed ? 'bg-[#6B2D3E]' : 'border-[1.5px] border-[rgba(107,45,62,0.25)] bg-transparent'
      }`}>
        {agreed && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <polyline points="2,6 5,9 10,3"/>
          </svg>
        )}
      </div>
      <div>
        <div className={`text-[14px] font-medium ${agreed ? 'text-[#6B2D3E]' : 'text-[#2A1A1F]'}`}>
          {name} agrees
        </div>
        <div className={`text-[12px] mt-0.5 ${agreed ? 'text-[#D4899A]' : 'text-[#B8999F]'}`}>
          {isMe ? 'This pact reflects my genuine intentions.' : 'Waiting for their confirmation.'}
        </div>
      </div>
      {!isMe && (
        <div className="ml-auto text-[11px] text-[#B8999F] italic">their device</div>
      )}
    </button>
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
        <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F]">
          One last step
        </div>
      </div>

      <div className="flex-1 px-6 py-7 flex flex-col gap-5 overflow-y-auto">
        <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[16px] p-5 text-center">
          <div className="font-['Cormorant_Garamond'] text-[13px] italic text-[#D4899A] tracking-[0.06em] mb-2.5">
            patto
          </div>
          <div className="font-['Cormorant_Garamond'] text-[24px] font-normal text-[#2A1A1F] mb-1">
            {names.partner1} & {names.partner2}
          </div>
          <div className="text-[12px] text-[#B8999F] mb-3.5">{formattedDate}</div>
          <div className="h-px bg-[rgba(107,45,62,0.13)] mb-3.5"/>
          <p className="text-[12.5px] text-[#7A5560] leading-[1.75] italic font-['Cormorant_Garamond'] text-[14px]">
            This is not a legal contract. It is a living agreement — voluntary, revisable,
            and written by two people who choose to be honest with each other.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <AgreeBox
            name={names.partner1}
            agreed={mySlot === 'partner1' ? myAgreed : partnerAgreed}
            onToggle={() => setMyAgreed(!myAgreed)}
            isMe={mySlot === 'partner1'}
          />
          <AgreeBox
            name={names.partner2}
            agreed={mySlot === 'partner2' ? myAgreed : partnerAgreed}
            onToggle={() => setMyAgreed(!myAgreed)}
            isMe={mySlot === 'partner2'}
          />
        </div>

        <p className={`text-center text-[12px] leading-[1.6] ${myAgreed ? 'text-[#0F6E56]' : 'text-[#B8999F]'}`}>
          {myAgreed
            ? "You've agreed. Your partner will confirm from their device."
            : 'Tap your name to confirm your agreement.'}
        </p>

        {error && (
          <div className="text-[12px] text-red-500 text-center">{error}</div>
        )}

        <button
          onClick={handleSign}
          disabled={!myAgreed || loading}
          className={`w-full h-[52px] rounded-[15px] text-[#FAF8F4] text-[15px] font-medium transition-all ${
            myAgreed && !loading
              ? 'bg-[#6B2D3E] hover:bg-[#5A2535] opacity-100'
              : 'bg-[#6B2D3E] opacity-35 cursor-not-allowed'
          }`}
        >
          {loading ? 'Signing...' : 'Make it ours →'}
        </button>

        <div className="bg-[#F0E9E3] rounded-[10px] px-3.5 py-2.5">
          <p className="text-[11.5px] text-[#7A5560] leading-[1.6]">
            {names.partner2} will confirm their agreement from their own device when they join.
          </p>
        </div>
      </div>

      <div className="h-[30px] flex justify-center items-center flex-shrink-0">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}