import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import { BASE_URL } from '../components/baseurl';

const modes = [

  {
    id: 1,
    value: 'invite',
    destination: '/invite',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A5560" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Invite my partner first',
    desc: "Send an invitation — they'll create their own account and join the pact when ready.",
  },

];

export default function TogetherPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const handleContinue = async () => {
    const chosen = modes[selected];
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      await axios.patch(
        `${BASE_URL}/partner-mode`,
        { partnerMode: chosen.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Keep localStorage in sync
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...stored, partnerMode: chosen.value }));

      navigate(chosen.destination);
    } catch (err) {
      showToast('Server error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })}
      />

      {/* Header */}
      <div className="px-5 py-[10px] flex items-center gap-3 bg-white border-b border-[rgba(107,45,62,0.13)] flex-shrink-0">
        <button
          onClick={() => navigate('/name')}
          className="w-[34px] h-[34px] rounded-full border border-[rgba(107,45,62,0.13)] bg-[#FAF8F4] flex items-center justify-center hover:bg-[#F5E8EB] transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2A1A1F" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F]">Step 3 of 4</div>
          <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F]">One more thing</div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5 flex flex-col gap-4">

        <p className="text-[13px] text-[#7A5560] leading-[1.65]">
          Is your partner here with you right now, or would you like to invite them?
        </p>

        <div className="flex flex-col gap-2.5">
          {modes.map(({ id, icon, title, desc }) => {
            const isSelected = selected === id;
            return (
              <button
                key={id}
                onClick={() => setSelected(id)}
                className={`w-full rounded-[13px] p-4 text-left border transition-all ${
                  isSelected
                    ? 'bg-[#FBF2F4] border-[#6B2D3E]'
                    : 'bg-white border-[rgba(107,45,62,0.13)]'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className={`w-9 h-9 rounded-[9px] flex items-center justify-center ${
                    isSelected ? 'bg-[#F5E8EB]' : 'bg-[#F0E9E3]'
                  }`}>
                    {icon}
                  </div>
                  <div className={`text-[14px] font-medium ${isSelected ? 'text-[#6B2D3E]' : 'text-[#2A1A1F]'}`}>
                    {title}
                  </div>
                </div>
                <p className="text-[12.5px] text-[#7A5560] leading-[1.6] pl-[46px]">
                  {desc}
                </p>
              </button>
            );
          })}
        </div>

        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>
      </div>

      <div className="h-[30px] flex justify-center items-center mt-auto">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}