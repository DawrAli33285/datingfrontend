// src/pages/NamePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import { BASE_URL } from '../components/baseurl';

const genders = ['She / her', 'He / him', 'They / them', 'Prefer not to say'];
const pronounValues = ['she/her', 'he/him', 'they/them', 'prefer not to say'];

export default function NamePage() {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const handleContinue = async () => {
    if (!firstName.trim()) return showToast('Please enter your first name.');

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const res = await axios.patch(
        `${BASE_URL}/me`,
        {
          firstName: firstName.trim(),
          pronoun: pronounValues[selectedGender],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update stored user with new firstName
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...stored, firstName: res.data.user.firstName }));

      navigate('/together');
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
          onClick={() => navigate(-1)}
          className="w-[34px] h-[34px] rounded-full border border-[rgba(107,45,62,0.13)] bg-[#FAF8F4] flex items-center justify-center hover:bg-[#F5E8EB] transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2A1A1F" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F]">Step 2 of 4</div>
          <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F]">Nice to meet you</div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-6 flex flex-col gap-5">

        <p className="text-[13px] text-[#7A5560] leading-[1.65]">
          Patto addresses both of you by name — it makes the conversations feel more personal.
        </p>

        {/* First name input */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-[#B8999F] tracking-[0.04em]">Your first name</span>
          <input
            type="text"
            placeholder="Alex"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-12 bg-white border border-[rgba(107,45,62,0.13)] rounded-xl text-[15px] text-[#2A1A1F] px-3.5 outline-none focus:border-[#D4899A] placeholder:text-[#D9C8CC] transition-colors"
          />
        </div>

        <div className="bg-[#FBF2F4] border border-[#D4899A] rounded-[13px] px-4 py-3.5">
          <div className="text-[12px] font-medium text-[#6B2D3E] mb-1.5">A small thing that matters</div>
          <p className="text-[12.5px] text-[#7A5560] leading-[1.65]">
            We use your name — not "User 1" — because you're a person, not a slot in a form.
            Your partner will add their own name when they join.
          </p>
        </div>

        {/* Gender selector */}
        <div>
          <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F] mb-2.5">
            How do you identify?
          </div>
          <div className="flex flex-wrap gap-2">
            {genders.map((label, i) => (
              <button
                key={label}
                onClick={() => setSelectedGender(i)}
                className={`px-3.5 py-2 rounded-full text-[13px] border transition-all ${
                  selectedGender === i
                    ? 'bg-[#F5E8EB] border-[#6B2D3E] text-[#6B2D3E]'
                    : 'bg-white border-[rgba(107,45,62,0.13)] text-[#2A1A1F]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
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