import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const isPartner = localStorage.getItem('isPartner') === 'true';

  const active = (path) => location.pathname === path;
  const iconColor = (path) => active(path) ? '#6B2D3E' : '#B8999F';
  const textClass = (path) =>
    `text-[10px] ${active(path) ? 'text-[#6B2D3E] font-medium' : 'text-[#B8999F]'}`;

  if (isPartner) {
    return (
      <div className="border-t border-[rgba(107,45,62,0.13)] bg-white px-5 py-2.5 flex justify-around flex-shrink-0">
     
        <button onClick={() => navigate('/partner-review')} className="flex flex-col items-center gap-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={iconColor('/partner-review')}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span className={textClass('/partner-review')}>Home</span>
        </button>

        <button onClick={() => navigate('/account')} className="flex flex-col items-center gap-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor('/account')} strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
          <span className={textClass('/account')}>Account</span>
        </button>
      </div>
    );
  }

  return (
    <div className="border-t border-[rgba(107,45,62,0.13)] bg-white px-5 py-2.5 flex justify-around flex-shrink-0">
      <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill={iconColor('/dashboard')}>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        <span className={textClass('/dashboard')}>Home</span>
      </button>

      <button onClick={() => navigate('/invite')} className="flex flex-col items-center gap-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor('/invite')} strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
        <span className={textClass('/invite')}>Invite</span>
      </button>

      <button onClick={() => navigate('/topics')} className="flex flex-col items-center gap-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor('/topics')} strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
        <span className={textClass('/topics')}>Chat</span>
      </button>

      <button onClick={() => navigate('/review')} className="flex flex-col items-center gap-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor('/review')} strokeWidth="1.5" strokeLinecap="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
        <span className={textClass('/review')}>Pact</span>
      </button>

      <button onClick={() => navigate('/account')} className="flex flex-col items-center gap-1">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor('/account')} strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="8" r="4"/>
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
        </svg>
        <span className={textClass('/account')}>Account</span>
      </button>
    </div>
  );
}