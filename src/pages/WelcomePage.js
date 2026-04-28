// src/pages/WelcomePage.jsx
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="1.5" strokeLinecap="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
      title: 'Built for two',
      desc: 'Both partners are equal authors of the pact.',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      ),
      title: 'Guided by AI',
      desc: `Questions you'd never think to ask each other.`,
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: 'Not a contract',
      desc: 'A shared promise — warm, human, and revisable.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#FAF8F4]">

      <div className="flex-1 flex flex-col px-7 pt-12">
    
        <div className="font-['Cormorant_Garamond'] text-[15px] italic text-[#D4899A] mb-6">
          patto
        </div>


        <h1 className="font-['Cormorant_Garamond'] text-[38px] font-normal text-[#2A1A1F] leading-[1.1] mb-4">
          Clarity is<br />an act of love.
        </h1>


        <p className="text-[14px] text-[#7A5560] leading-[1.75] mb-8">
          Most relationships struggle not from lack of care — but from unspoken
          expectations. Patto helps you write them down, together.
        </p>


        <div className="flex flex-col gap-3">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-[#F5E8EB] flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <div>
                <div className="text-[13px] font-medium text-[#2A1A1F]">{title}</div>
                <div className="text-[12px] text-[#7A5560] mt-0.5 leading-[1.5]">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="px-7 pb-5 pt-7">
        <button
          onClick={() => navigate('/signup')}
          className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors"
        >
          Create your account
        </button>
        <div className="text-center mt-3">
          <span className="text-[13px] text-[#7A5560]">
            Have an account?{' '}
            <span
              onClick={() => navigate('/signin')}
              className="text-[#6B2D3E] underline underline-offset-[3px] cursor-pointer"
            >
              Sign in
            </span>
          </span>
        </div>
      </div>

  
      <div className="h-[30px] flex justify-center items-center">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}