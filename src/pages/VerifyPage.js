// src/pages/VerifyPage.jsx
import { useNavigate } from 'react-router-dom';

export default function VerifyPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">


      <div className="flex-1 flex flex-col items-center justify-center px-7 text-center">


        <div className="w-[72px] h-[72px] rounded-[20px] bg-[#F5E8EB] flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="1.2" strokeLinecap="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </div>

   
        <h1 className="font-['Cormorant_Garamond'] text-[30px] font-normal text-[#2A1A1F] mb-3">
          Check your inbox
        </h1>


        <p className="text-[14px] text-[#7A5560] leading-[1.75] mb-2">
          We sent a verification link to{' '}
          <span className="font-medium text-[#2A1A1F]">you@email.com</span>
        </p>
        <p className="text-[13px] text-[#B8999F] leading-[1.6]">
          Check your spam folder if you don't see it.
        </p>

 
        <div className="mt-9 w-full flex flex-col gap-2.5">
          <button
            onClick={() => navigate('/name')}
            className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors"
          >
            I've verified my email
          </button>
          <button className="w-full h-[46px] rounded-[15px] border border-[rgba(107,45,62,0.13)] bg-transparent text-[14px] text-[#7A5560] hover:bg-[#F0E9E3] transition-colors">
            Resend email
          </button>
        </div>


        <div className="mt-5 w-full">
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#FEF3DC] rounded-xl">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#854F0B" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
            <p className="text-[12px] text-[#854F0B] leading-[1.5]">
              Patto never sends marketing emails unless you opt in.
            </p>
          </div>
        </div>
      </div>

      <div className="h-[30px] flex justify-center items-center">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}