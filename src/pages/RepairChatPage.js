import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    q: "You flagged 'Home & living together'. Let's start simple — what feels off right now?",
    opts: [
      'The cleaning and tidying split',
      'How we use shared spaces',
      'Overnight guests',
      `Something bigger we haven't named yet`,
    ],
  },
  {
    q: `Has this come up in conversation before, or is this the first time it's on the table?`,
    opts: [
      `We've talked about it but not resolved it`,
      `We've argued about it`,
      'Never really spoken about it',
      'One of us avoids it',
    ],
  },
  {
    q: 'What outcome would feel right to both of you after today?',
    opts: [
      'A clear new rule we both agree to',
      'Just acknowledging it out loud',
      'A plan to revisit with more time',
      'A small first step, not a full fix',
    ],
  },
];

export default function RepairChatPage() {
  const navigate = useNavigate();
  const [step, setStep]     = useState(0);
  const [answers, setAnswers] = useState([]);

  const progress = step >= questions.length ? 100 : Math.round((step / questions.length) * 100);

  const choose = (optionIndex) => {
    setAnswers([...answers, optionIndex]);
    setStep(step + 1);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">
      <div className="px-5 pt-[10px] pb-[10px] bg-white border-b border-[rgba(107,45,62,0.13)] flex-shrink-0">
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={() => navigate(-1)}
            className="w-[34px] h-[34px] rounded-full border border-[rgba(107,45,62,0.13)] bg-[#FAF8F4] flex items-center justify-center hover:bg-[#F5E8EB] transition-colors flex-shrink-0"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2A1A1F" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F]">
            Check-in · Home & living together
          </div>
        </div>
        <div className="mt-2 bg-[#FEF3DC] rounded-[8px] px-3 py-1.5 text-[12px] text-[#854F0B]">
          You flagged this section as needing a conversation — Patto will guide you through it.
        </div>
        <div className="mt-2 h-[3px] bg-[#F0E9E3] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#6B2D3E] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex-1 px-[18px] py-4 flex flex-col gap-3 overflow-y-auto">
        {questions.map((q, i) => {
          if (i > step) return null;
          return (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-[#6B2D3E] flex items-center justify-center flex-shrink-0 font-['Cormorant_Garamond'] text-[13px] italic text-[#FAF8F4]">
                  p
                </div>
                <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[4px_13px_13px_13px] px-3 py-2.5 text-[13px] text-[#2A1A1F] leading-[1.65] max-w-[268px]">
                  {q.q}
                </div>
              </div>
              {answers[i] !== undefined && (
                <div className="flex justify-end">
                  <div className="bg-[#6B2D3E] text-[#FAF8F4] rounded-[13px_13px_4px_13px] px-3 py-2.5 text-[13px] leading-[1.5] max-w-[222px]">
                    {q.opts[answers[i]]}
                  </div>
                </div>
              )}
              {answers[i] === undefined && i === step && (
                <div className="flex flex-col gap-1.5 pl-[37px]">
                  {q.opts.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => choose(oi)}
                      className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[11px] px-3 py-2.5 text-[13px] text-[#2A1A1F] text-left leading-[1.5] hover:bg-[#FBF2F4] hover:border-[#D4899A] transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        {step >= questions.length && (
          <div className="bg-[#F5E8EB] border border-[#D4899A] rounded-[14px] p-4 text-center">
            <div className="text-[13px] font-medium text-[#6B2D3E] mb-1">Conversation noted</div>
            <p className="text-[12px] text-[#7A5560] leading-[1.6] mb-3">
              Your responses have been added to the check-in record. Would you like to update that section of the pact?
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate('/review')}
                className="w-full h-[42px] rounded-[11px] bg-[#6B2D3E] text-[#FAF8F4] text-[13px] font-medium hover:bg-[#5A2535] transition-colors"
              >
                Update that section →
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full h-[38px] rounded-[11px] border border-[rgba(107,45,62,0.13)] text-[13px] text-[#7A5560] hover:bg-[#F0E9E3] transition-colors"
              >
                Back to dashboard
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="h-[30px] flex justify-center items-center flex-shrink-0">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}