import { useNavigate } from 'react-router-dom';

export default function SplashPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FAF8F4]">

      <div className="flex-1 flex flex-col items-center justify-center gap-0 px-10">
        <div
          className="font-['Cormorant_Garamond'] text-[88px] italic text-[#6B2D3E] leading-none tracking-[-3px]"
          style={{ animation: 'fadein 1s ease both' }}
        >
          patto
        </div>

        <div
          className="text-[13px] text-[#B8999F] mt-3"
          style={{ animation: 'fadein 1s ease 0.6s both', opacity: 0 }}
        >
          Build the foundations of your relationship.
        </div>


        <div
          className="flex gap-1.5 mt-10"
          style={{ animation: 'fadein 0.5s ease 1.2s both', opacity: 0 }}
        >
          {[0, 0.2, 0.4].map((delay, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#D4899A]"
              style={{ animation: `pulse 1.2s ease ${delay}s infinite` }}
            />
          ))}
        </div>
      </div>


      <div
        className="px-7 pb-5"
        style={{ animation: 'fadein 0.5s ease 1.5s both', opacity: 0 }}
      >
        <button
          onClick={() => navigate('/welcome')}
          className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors"
        >
          Get started
        </button>
        <div className="text-center mt-3">
          <span className="text-[13px] text-[#7A5560]">
            Already have an account?{' '}
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

      <style>{`
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.4); opacity: 1; }
        }
      `}</style>
    </div>
  );
}