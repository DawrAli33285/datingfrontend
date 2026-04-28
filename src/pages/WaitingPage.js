import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../components/baseurl';

export default function WaitingPage() {
  const navigate = useNavigate();
  const [signatures, setSignatures] = useState([]);
  const [names, setNames] = useState({ partner1: 'Partner 1', partner2: 'Partner 2' });
  const [loading, setLoading] = useState(true);
  const [pactStatus, setPactStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem('token');
      const pactId = localStorage.getItem('pactId');

      try {
        const [pactRes, reviewRes] = await Promise.all([
          fetch(`${BASE_URL}/pact/${pactId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BASE_URL}/pact/review/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const pactData = await pactRes.json();
        const reviewData = await reviewRes.json();

        if (pactRes.ok) {
          setSignatures(pactData.signatures || []);
          setPactStatus(pactData.pact?.status);
        }

        if (reviewRes.ok) {
          const [p1, p2] = reviewData.names.split(' & ');
          setNames({ partner1: p1 || 'Partner 1', partner2: p2 || 'Partner 2' });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();

    // Poll every 10 seconds to check if partner signed
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const bothSigned = pactStatus === 'signed' || signatures.length >= 2;

  const getSignatureFor = (name) =>
    signatures.find((s) => s.partnerName?.toLowerCase() === name?.toLowerCase());

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    }) + ' · ' + new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit',
    });
  };

  const sig1 = getSignatureFor(names.partner1);
  const sig2 = getSignatureFor(names.partner2);

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">
      <div className="flex-1 flex flex-col items-center justify-center px-7 text-center">
        <div className="w-[72px] h-[72px] rounded-[20px] bg-[#F5E8EB] flex items-center justify-center mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="1.2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-[28px] font-normal text-[#2A1A1F] leading-[1.15] mb-2.5">
          {bothSigned
            ? 'Your pact is live!'
            : `Waiting for ${names.partner2}'s confirmation`}
        </h1>
        <p className="text-[13px] text-[#7A5560] leading-[1.75] mb-1.5">
          {bothSigned
            ? 'Both partners have confirmed. Your pact is now active.'
            : `You've confirmed your agreement. ${names.partner2} will get a notification to do the same from their device.`}
        </p>
        {!bothSigned && (
          <p className="text-[12px] text-[#B8999F] leading-[1.6]">
            We'll notify you the moment {names.partner2} confirms.
          </p>
        )}

        <div className="mt-7 w-full bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] p-4 text-left">
          <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F] mb-2.5">
            Status
          </div>
          {loading ? (
            <div className="text-[13px] text-[#B8999F]">Loading...</div>
          ) : (
            <div className="flex flex-col gap-3">
              {/* Partner 1 */}
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${sig1 ? 'bg-[#1D9E75]' : 'bg-[#6B2D3E]'}`}
                  style={!sig1 ? { animation: 'pulse2 2s ease infinite' } : {}}
                />
                <div>
                  <div className="text-[13px] text-[#2A1A1F]">
                    {sig1 ? `${names.partner1} confirmed` : `Waiting for ${names.partner1}`}
                  </div>
                  <div className="text-[11px] text-[#B8999F]">
                    {sig1 ? formatDate(sig1.signedAt) : 'Awaiting confirmation'}
                  </div>
                </div>
              </div>

              {/* Partner 2 */}
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${sig2 ? 'bg-[#1D9E75]' : 'bg-[#6B2D3E]'}`}
                  style={!sig2 ? { animation: 'pulse2 2s ease infinite' } : {}}
                />
                <div>
                  <div className={`text-[13px] ${sig2 ? 'text-[#2A1A1F]' : 'text-[#6B2D3E]'}`}>
                    {sig2 ? `${names.partner2} confirmed` : `Waiting for ${names.partner2}`}
                  </div>
                  <div className="text-[11px] text-[#B8999F]">
                    {sig2 ? formatDate(sig2.signedAt) : 'Invite sent · awaiting confirmation'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 w-full flex flex-col gap-2">
          {/* {!bothSigned && (
            <button className="w-full h-[42px] rounded-[12px] border border-[rgba(107,45,62,0.13)] text-[13px] text-[#7A5560] hover:bg-[#F0E9E3] transition-colors">
              Resend invitation
            </button>
          )} */}
          <button
            onClick={() => navigate('/complete')}
            disabled={!bothSigned}
            className={`w-full h-[42px] rounded-[12px] text-[13px] font-medium transition-colors ${
              bothSigned
                ? 'bg-[#6B2D3E] text-[#FAF8F4] hover:bg-[#5A2535]'
                : 'bg-[#6B2D3E] text-[#FAF8F4] opacity-35 cursor-not-allowed'
            }`}
          >
            {bothSigned ? `${names.partner2} signed! Continue →` : `Waiting for ${names.partner2}...`}
          </button>
        </div>
      </div>

      <div className="h-[30px] flex justify-center items-center flex-shrink-0">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>

      <style>{`
        @keyframes pulse2 {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}