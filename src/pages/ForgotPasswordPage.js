import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">

      <div className="px-5 py-[10px] flex items-center gap-3 bg-white border-b border-[rgba(107,45,62,0.13)] flex-shrink-0">
        <button
          onClick={() => navigate('/signin')}
          className="w-[34px] h-[34px] rounded-full border border-[rgba(107,45,62,0.13)] bg-[#FAF8F4] flex items-center justify-center hover:bg-[#F5E8EB] transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2A1A1F" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F]">
          Reset your password
        </div>
      </div>

      <div className="px-5 py-6 flex flex-col gap-4">

        <p className="text-[13px] text-[#7A5560] leading-[1.7]">
          Enter the email you signed up with. We'll send a reset link right away.
        </p>

        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-[#B8999F] tracking-[0.04em]">Email address</span>
          <input
            type="email"
            placeholder="you@email.com"
            className="w-full h-12 bg-white border border-[rgba(107,45,62,0.13)] rounded-xl text-[15px] text-[#2A1A1F] px-3.5 outline-none focus:border-[#D4899A] placeholder:text-[#D9C8CC] transition-colors"
          />
        </div>

        <button
          onClick={() => setSent(true)}
          className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors"
        >
          Send reset link
        </button>

        {sent && (
          <div className="bg-[#E8F5EE] border border-[#9FE1CB] rounded-xl px-4 py-3.5">
            <div className="text-[13px] font-medium text-[#0F6E56] mb-1.5">
              Check your inbox
            </div>
            <p className="text-[12.5px] text-[#1D9E75] leading-[1.6]">
              We sent a reset link to your email. It expires in 15 minutes.
            </p>
            <div className="mt-3">
              <span
                onClick={() => navigate('/signin')}
                className="text-[13px] text-[#0F6E56] underline underline-offset-[3px] cursor-pointer"
              >
                Back to sign in →
              </span>
            </div>
          </div>
        )}

      </div>

      <div className="h-[30px] flex justify-center items-center mt-auto">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}