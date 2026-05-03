import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../components/baseurl';

export default function PartnerJoinPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [inviterName, setInviterName] = useState('Someone');
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setInvalid(true);
      setLoading(false);
      return;
    }

    const fetchInvitation = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/invitations/accept/${token}`);
        setInviterName(res.data.invitedByName);
      } catch {
        setInvalid(true);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitation();
  }, [token]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#FAF8F4]">
        <p className="text-[13px] text-[#B8999F]">Loading invitation...</p>
      </div>
    );
  }

  if (invalid) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF8F4] px-7 text-center">
        <div className="font-['Cormorant_Garamond'] text-[15px] italic text-[#D4899A] mb-4">patto</div>
        <h1 className="font-['Cormorant_Garamond'] text-[26px] text-[#2A1A1F] mb-3">This link has expired</h1>
        <p className="text-[13px] text-[#7A5560] leading-[1.7]">
          The invitation link is invalid or has expired. Ask your partner to send a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">
      <div className="flex-1 flex flex-col items-center justify-start px-7 pt-11 text-center">

        <div className="font-['Cormorant_Garamond'] text-[15px] italic text-[#D4899A] mb-6">
          patto
        </div>

        <svg width="160" height="72" viewBox="0 0 160 72" className="mb-5">
          <circle cx="58" cy="36" r="30" fill="none" stroke="#D4899A" strokeWidth="0.8"/>
          <circle cx="102" cy="36" r="30" fill="none" stroke="#D4899A" strokeWidth="0.8"/>
          <path
            d="M80 9.5Q96 18 96 36Q96 54 80 62.5Q64 54 64 36Q64 18 80 9.5Z"
            fill="rgba(107,45,62,0.07)"
          />
          <text x="42" y="39" fontFamily="'DM Sans',system-ui,sans-serif" fontSize="10" fill="#B8999F" textAnchor="middle">
            {inviterName}
          </text>
          <text x="118" y="39" fontFamily="'DM Sans',system-ui,sans-serif" fontSize="10" fill="#D4899A" textAnchor="middle" fontWeight="500">
            You
          </text>
          <text x="80" y="40" fontFamily="'Cormorant Garamond',Georgia,serif" fontSize="11" fontStyle="italic" fill="#6B2D3E" textAnchor="middle">
            us
          </text>
        </svg>

        <h1 className="font-['Cormorant_Garamond'] text-[30px] font-normal text-[#2A1A1F] leading-[1.15] mb-[10px]">
          {inviterName} invited you<br />to build your Patto.
        </h1>
        <p className="text-[13px] text-[#7A5560] leading-[1.7] mb-2">
          {inviterName} has already answered some questions. Now it's your turn to add your perspective —
          together, you'll create something that reflects both of you.
        </p>

        <div className="bg-[#FBF2F4] border border-[#D4899A] rounded-[13px] px-4 py-[14px] mt-2 text-left w-full">
          <p className="font-['Cormorant_Garamond'] text-[15px] italic text-[#6B2D3E] leading-[1.7]">
            "I want us both to be okay — even in the hard moments."
          </p>
          <p className="text-[11px] text-[#D4899A] mt-[6px]">— {inviterName}'s note to you</p>
        </div>

        <div className="mt-6 w-full flex flex-col gap-2">
          <button
            onClick={() => navigate(`/signup?token=${token}`)}
            className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors"
          >
            Create my account & join →
          </button>
          <button
            onClick={() => navigate(`/signin?token=${token}`)}
            className="w-full h-[42px] rounded-[15px] border border-[rgba(107,45,62,0.13)] bg-transparent text-[13px] text-[#7A5560] hover:bg-[#F0E9E3] transition-colors"
          >
            I already have an account
          </button>
        </div>

        <p className="text-[11px] text-[#B8999F] mt-[14px] leading-[1.6]">
          You'll review everything {inviterName} wrote before signing anything.
        </p>
      </div>

      <div className="h-[30px] flex justify-center items-center flex-shrink-0">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}