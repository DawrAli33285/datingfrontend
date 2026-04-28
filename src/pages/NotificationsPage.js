import { useNavigate } from 'react-router-dom';

const groups = [
  {
    label: 'Today',
    items: [
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
          </svg>
        ),
        iconBg: 'bg-[#F5E8EB]',
        title: 'Annual check-in available',
        body: `A year has passed since you and Jordan signed your pact. Time to see what's changed.`,
        time: 'Just now',
        unread: true,
        route: '/checkin',
      },
    ],
  },
  {
    label: 'Yesterday',
    items: [
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ),
        iconBg: 'bg-[#E8F5EE]',
        title: 'Jordan confirmed the pact',
        body: 'Your pact is now live. A PDF has been sent to both of you.',
        time: 'Yesterday · 4:12 PM',
        unread: false,
        route: '/dashboard',
      },
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
          </svg>
        ),
        iconBg: 'bg-[#E8F1FB]',
        title: 'Jordan joined Patto',
        body: 'Jordan accepted your invitation and created their account. They\'re reviewing the pact now.',
        time: 'Yesterday · 3:48 PM',
        unread: false,
        route: null,
      },
    ],
  },
  {
    label: 'Apr 22',
    items: [
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="1.5" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
        ),
        iconBg: 'bg-[#F5E8EB]',
        title: 'You signed your pact',
        body: 'Your signature is in. Waiting for Jordan to review and sign.',
        time: 'Apr 22 · 9:41 AM',
        unread: false,
        route: '/review',
      },
      {
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A5560" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        ),
        iconBg: 'bg-[#F0E9E3]',
        title: 'Invitation sent to Jordan',
        body: 'We sent a personalised invitation to jordan@email.com on your behalf.',
        time: 'Apr 22 · 9:25 AM',
        unread: false,
        route: null,
      },
    ],
  },
];

export default function NotificationsPage() {
  const navigate = useNavigate();

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
          Notifications
        </div>
      </div>
      <div className="flex-1 px-5 py-3.5 overflow-y-auto">
        {groups.map(({ label, items }) => (
          <div key={label}>
            <div className="text-[11px] tracking-[0.05em] text-[#B8999F] uppercase mb-2 mt-1">
              {label}
            </div>
            {items.map(({ icon, iconBg, title, body, time, unread, route }, i) => (
              <button
                key={i}
                onClick={() => route && navigate(route)}
                className="w-full flex gap-3 py-3.5 border-b border-[rgba(107,45,62,0.1)] text-left hover:bg-[#FAF8F4] transition-colors last:border-0"
              >
                <div className={`w-[38px] h-[38px] rounded-full ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[#2A1A1F] mb-[3px]">{title}</div>
                  <p className="text-[12px] text-[#7A5560] leading-[1.5]">{body}</p>
                  <div className="text-[11px] text-[#B8999F] mt-1">{time}</div>
                </div>
                {unread && (
                  <div className="w-2 h-2 rounded-full bg-[#6B2D3E] flex-shrink-0 mt-1" />
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-[rgba(107,45,62,0.13)] bg-white px-5 py-2.5 flex justify-around flex-shrink-0">
        <button onClick={() => navigate('/dashboard')} className="flex flex-col items-center gap-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8999F" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
          <span className="text-[10px] text-[#B8999F]">Home</span>
        </button>
        <button onClick={() => navigate('/review')} className="flex flex-col items-center gap-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8999F" strokeWidth="1.5" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          <span className="text-[10px] text-[#B8999F]">Pact</span>
        </button>
        
        <button onClick={() => navigate('/account')} className="flex flex-col items-center gap-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8999F" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
          <span className="text-[10px] text-[#B8999F]">Account</span>
        </button>
      </div>
      <div className="h-[30px] flex justify-center items-center flex-shrink-0">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}