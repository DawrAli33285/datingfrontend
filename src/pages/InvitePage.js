import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import { BASE_URL } from '../components/baseurl';

export default function InvitePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [partnerName, setPartnerName] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [inviteLink, setInviteLink] = useState('');
  const [linkLoading, setLinkLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasPartner, setHasPartner] = useState(false);

  const tabs = ['Email', 'Link'];

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const handleSendInvitation = async () => {
    if (!partnerName.trim()) return showToast('Please enter your partner\'s name.');
    if (!partnerEmail.trim() || !/\S+@\S+\.\S+/.test(partnerEmail))
      return showToast('Please enter a valid email address.');

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      await axios.post(
        `${BASE_URL}/invitations/send`,
        { email: partnerEmail.trim(), firstName: partnerName.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast('Invitation sent!', 'success');
      setTimeout(() => navigate('/topics'), 1500);
    } catch (err) {
      console.log(err)
      console.log("ERROR")
      const status = err?.response?.status;
      if (status === 400) {
        showToast(err.response.data.message || 'Invalid request.');
      } else {
        showToast('Server error, please try again.');
      }
    } finally {
      setLoading(false);
    }
  };



  const senderName = JSON.parse(localStorage.getItem('user') || '{}')?.firstName || 'Your partner';
  const previewPartnerName = partnerName || 'Jordan';
  const previewPartnerEmail = partnerEmail || 'jordan@email.com';


  const handleGenerateLink = async () => {
    if (!partnerName.trim()) return showToast("Please enter your partner's name first.");
    try {
      setLinkLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${BASE_URL}/invitations/generateInviteLink`,
        { firstName: partnerName.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInviteLink(res.data.inviteLink);
    } catch (err) {
      const status = err?.response?.status;
      showToast(status === 400 ? err.response.data.message : 'Server error, please try again.');
    } finally {
      setLinkLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  useEffect(() => {
    const checkExistingPartner = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/invitations/check-partner`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHasPartner(res.data.hasPartner);
      } catch {
       
      }
    };
    checkExistingPartner();
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })}
      />

     
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
          <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F]">Step 4 of 4</div>
          <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F]">Invite your partner</div>
        </div>
      </div>

      <div className="px-5 py-5 flex flex-col gap-4 overflow-y-auto">

        <div className="bg-[#FBF2F4] border border-[#D4899A] rounded-[14px] px-4 py-4">
          <p className="text-[13px] text-[#7A5560] leading-[1.7]">
            Making a pact is an act of care, not distrust. You're saying:{' '}
            <em className="font-['Cormorant_Garamond'] text-[16px] text-[#6B2D3E]">
              "I want us both to be okay — even in the hard moments."
            </em>
          </p>
        </div>

  
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-[#B8999F] tracking-[0.04em]">Partner's name</span>
          <input
            type="text"
            placeholder="Jordan"
            value={partnerName}
            onChange={(e) => { setPartnerName(e.target.value); setInviteLink(''); setCopied(false); }}
            className="w-full h-12 bg-white border border-[rgba(107,45,62,0.13)] rounded-xl text-[15px] text-[#2A1A1F] px-3.5 outline-none focus:border-[#D4899A] placeholder:text-[#D9C8CC] transition-colors"
          />
        </div>

    
        <div className="flex flex-col gap-2">
          <span className="text-[11px] text-[#B8999F] tracking-[0.04em]">How to invite them</span>
          <div className="flex bg-[#F0E9E3] rounded-xl p-[3px] gap-0.5">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`flex-1 h-[38px] rounded-[8px] text-[13px] transition-all ${
                  activeTab === i
                    ? 'bg-white text-[#2A1A1F] font-medium shadow-sm'
                    : 'bg-transparent text-[#7A5560]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

       
        {activeTab === 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] text-[#B8999F] tracking-[0.04em]">
                {previewPartnerName}'s email
              </span>
              <input
                type="email"
                placeholder="jordan@email.com"
                value={partnerEmail}
                onChange={(e) => setPartnerEmail(e.target.value)}
                className="w-full h-12 bg-white border border-[rgba(107,45,62,0.13)] rounded-xl text-[15px] text-[#2A1A1F] px-3.5 outline-none focus:border-[#D4899A] placeholder:text-[#D9C8CC] transition-colors"
              />
            </div>

          
            <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-xl overflow-hidden">
              <div className="px-3.5 py-2.5 border-b border-[rgba(107,45,62,0.13)] flex justify-between items-center">
                <span className="text-[11px] text-[#B8999F]">Email preview</span>
              </div>
              <div className="px-3.5 py-3.5">
                <div className="text-[11.5px] text-[#B8999F] mb-1.5">
                  To: {previewPartnerEmail}
                </div>
                <div className="text-[13px] font-medium text-[#2A1A1F] mb-2">
                  {senderName} invited you to build your Pact together
                </div>
                <p className="text-[12.5px] text-[#7A5560] leading-[1.7]">
                  Hey {previewPartnerName},
                  <br /><br />
                  I found a way to put in writing what we want from each other — not a contract, more like a shared promise. It takes less than an hour together.
                  <br /><br />
                  I think it's worth it.
                </p>
                <p className="text-[14px] text-[#6B2D3E] mt-2.5 font-['Cormorant_Garamond'] italic">
                  — {senderName}
                </p>
              </div>
            </div>
          </div>
        )}

      
        {activeTab === 1 && (
          <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-xl p-3.5 flex flex-col gap-2.5">
            {!inviteLink ? (
              <button
                onClick={handleGenerateLink}
                disabled={linkLoading}
                className="w-full h-[42px] rounded-xl bg-[#F0E9E3] text-[13px] text-[#7A5560] hover:bg-[#EAE0D8] transition-colors disabled:opacity-60"
              >
                {linkLoading ? 'Generating...' : 'Generate invite link'}
              </button>
            ) : (
              <>
                <div className="bg-[#F0E9E3] rounded-[9px] px-3 py-2.5 font-mono text-[12px] text-[#7A5560] break-all">
                  {inviteLink}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="w-full h-[42px] rounded-xl border border-[rgba(107,45,62,0.13)] text-[13px] text-[#7A5560] hover:bg-[#F0E9E3] transition-colors"
                >
                  {copied ? '✓ Copied!' : 'Copy link'}
                </button>
              </>
            )}
          </div>
        )}

     
        <button
          onClick={activeTab === 0 ? handleSendInvitation : () => navigate('/topics')}
          disabled={loading}
          className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : activeTab === 0 ? 'Send invitation & continue →' : 'Continue →'}
        </button>
        {hasPartner && (
 <>
  <button
    onClick={() => navigate('/topics')}
    className="w-full h-[52px] rounded-[15px] border border-[rgba(107,45,62,0.13)] text-[#7A5560] text-[15px] font-medium hover:bg-[#F0E9E3] transition-colors"
  >
    Skip — I already have a partner →
  </button>
  <button
    onClick={() => navigate('/dashboard')}
    className="w-full h-[52px] rounded-[15px] border border-[rgba(107,45,62,0.13)] text-[#7A5560] text-[15px] font-medium hover:bg-[#F0E9E3] transition-colors"
  >
    Go to Dashboard →
  </button>
 </>
)}

       

      </div>

      <div className="h-[30px] flex justify-center items-center mt-auto">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}