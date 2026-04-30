import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toast from '../components/Toast';
import { BASE_URL } from '../components/baseurl';
import BottomNav from '../components/Bottomnav';
import SubscriptionPopup from '../components/SubscriptionPopup';

const pronounLabels = {
  'she/her': 'She / her',
  'he/him': 'He / him',
  'they/them': 'They / them',
  'prefer not to say': 'Prefer not to say',
};

const pronounOptions = ['she/her', 'he/him', 'they/them', 'prefer not to say'];

const RowLink = ({ icon, label, danger, onClick, right }) => (
  <button
    onClick={onClick}
    className="w-full px-[14px] py-3 flex justify-between items-center hover:bg-[#FAF8F4] transition-colors"
  >
    <div className="flex items-center gap-[10px]">
      {icon}
      <span className={`text-[14px] ${danger ? 'text-[#E24B4A]' : 'text-[#2A1A1F]'}`}>{label}</span>
    </div>
    {right || (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={danger ? '#E24B4A' : '#B8999F'} strokeWidth="2" strokeLinecap="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    )}
  </button>
);

// ─── Edit Profile Popup ───────────────────────────────────────────────────────
function EditProfilePopup({ user, onClose, onSaved }) {
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [email, setEmail] = useState(user.email || '');
  const [pronoun, setPronoun] = useState(user.pronoun || 'prefer not to say');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!firstName.trim()) return setError('First name is required.');
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return setError('Please enter a valid email.');

    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const res = await axios.patch(
        `${BASE_URL}/me`,
        { firstName: firstName.trim(), email: email.trim(), pronoun },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Sync localStorage
      const stored = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...stored, firstName: res.data.user.firstName }));

      onSaved(res.data.user);
      onClose();
    } catch (err) {
      setError('Server error, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={onClose}
    >
      {/* Sheet */}
      <div
        className="w-full max-w-md bg-white rounded-[24px] px-5 pt-5 pb-8 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-[rgba(107,45,62,0.13)] rounded-full mx-auto -mt-1 mb-1" />

        <div className="font-['Cormorant_Garamond'] text-[20px] text-[#2A1A1F]">Edit profile</div>

        {/* First name */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-[#B8999F] tracking-[0.04em]">First name</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full h-11 bg-[#FAF8F4] border border-[rgba(107,45,62,0.13)] rounded-xl text-[14px] text-[#2A1A1F] px-3.5 outline-none focus:border-[#D4899A] transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-[#B8999F] tracking-[0.04em]">Email address</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 bg-[#FAF8F4] border border-[rgba(107,45,62,0.13)] rounded-xl text-[14px] text-[#2A1A1F] px-3.5 outline-none focus:border-[#D4899A] transition-colors"
          />
        </div>

        {/* Pronoun */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-[#B8999F] tracking-[0.04em]">Pronouns</span>
          <div className="flex flex-wrap gap-2">
            {pronounOptions.map((p) => (
              <button
                key={p}
                onClick={() => setPronoun(p)}
                className={`px-3 py-1.5 rounded-full text-[12.5px] border transition-all ${
                  pronoun === p
                    ? 'bg-[#F5E8EB] border-[#6B2D3E] text-[#6B2D3E]'
                    : 'bg-white border-[rgba(107,45,62,0.13)] text-[#2A1A1F]'
                }`}
              >
                {pronounLabels[p]}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-[12px] text-[#E24B4A]">{error}</p>}

        <div className="flex gap-2.5 mt-1">
          <button
            onClick={onClose}
            className="flex-1 h-[46px] rounded-[13px] bg-[#F0E9E3] text-[#7A5560] text-[14px] font-medium hover:bg-[#E6DCD5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex-1 h-[46px] rounded-[13px] bg-[#6B2D3E] text-[#FAF8F4] text-[14px] font-medium hover:bg-[#5A2535] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AccountPage ─────────────────────────────────────────a─────────────────────
export default function AccountPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [pactTopics, setPactTopics] = useState([]);
  const [pactNames, setPactNames] = useState('');
  const [pactSignatures, setPactSignatures] = useState([]);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data.user);
  
        // Fetch pact data for PDF
        const pactRes = await axios.get(`${BASE_URL}/pact/review/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (pactRes.data) {
          setPactTopics(pactRes.data.topics || []);
          setPactNames(pactRes.data.names || '');
  
          const sigRes = await axios.get(`${BASE_URL}/pact/${pactRes.data.pactId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (sigRes.data) setPactSignatures(sigRes.data.signatures || []);
        }
      } catch {
        showToast('Server error, please try again.');
      }
    };
    fetchAccount();
  }, []);

  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // fail silently — clear local state regardless
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('pactId');
      localStorage.removeItem('isPartner');
      navigate('/signin');
    }
  };


  const initial = userData?.firstName?.[0]?.toUpperCase() || '?';


  const voteLabel = (status) => {
    if (status === 'agree') return '✅ Agrees';
    if (status === 'agree_with_change') return '🟡 Agrees with a small change';
    if (status === 'needs_talk') return "🔴 Let's talk about this first";
    return '—';
  };
  
  const formatSigDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const handleDownloadPDF = () => {
    if (!pactTopics.length) {
      showToast('No pact data to download yet.');
      return;
    }
  
    const lines = [];
    lines.push(`PATTO — ${pactNames}`);
    lines.push(`Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);
    lines.push('');
    lines.push('─────────────────────────────────────');
    lines.push('');
  
    pactTopics.forEach((topic, idx) => {
      lines.push(`${idx + 1}. ${topic.title.toUpperCase()}${topic.subtitle ? ` — ${topic.subtitle}` : ''}`);
      lines.push('');
  
      (topic.answers ?? []).forEach((qa, i) => {
        lines.push(`  Q${i + 1}: ${qa.question}`);
        lines.push(`  A:  ${qa.answer}`);
        lines.push('');
      });
  
      if (topic.partnerReview?.status) {
        lines.push(`  Partner review: ${voteLabel(topic.partnerReview.status)}`);
        lines.push('');
      }
  
      lines.push('─────────────────────────────────────');
      lines.push('');
    });
  
    if (pactSignatures.length) {
      lines.push('SIGNATURES');
      lines.push('');
      pactSignatures.forEach((sig) => {
        lines.push(`  ${sig.partnerName} — signed ${formatSigDate(sig.signedAt)}`);
      });
    }
  
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patto-${pactNames}.txt`.toLowerCase().replace(/\s/g, '-');
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })}
      />



      {showEditPopup && userData && (
        <EditProfilePopup
          user={userData}
          onClose={() => setShowEditPopup(false)}
          onSaved={(updated) => {
            setUserData((prev) => ({ ...prev, ...updated }));
            showToast('Profile updated!', 'success');
          }}
        />
      )}
      

      {/* Header */}
      <div className="px-5 pt-4 pb-3 bg-white border-b border-[rgba(107,45,62,0.13)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#F5E8EB] flex items-center justify-center font-['Cormorant_Garamond'] text-[20px] italic text-[#6B2D3E] flex-shrink-0">
            {initial}
          </div>
          <div>
            <div className="text-[15px] font-medium text-[#2A1A1F]">
              {userData?.firstName || '—'}
            </div>
            <div className="text-[12px] text-[#B8999F]">{userData?.email || '—'}</div>
          </div>
          <div className="ml-auto">
            <span className="inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-medium bg-[#E8F1FB] text-[#185FA5] border border-[#B5D4F4]">
              {userData?.isPremium ? 'Couple plan' : 'Free plan'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 py-3.5 flex flex-col gap-2 overflow-y-auto">

        {/* Pact */}
        <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F]">Your pact</div>
        <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] overflow-hidden divide-y divide-[rgba(107,45,62,0.13)]">
          <RowLink
            onClick={() => navigate('/review')}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A5560" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>}
            label="View pact"
          />
         <RowLink
  onClick={handleDownloadPDF}
  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A5560" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>}
  label="Download PDF"
/>
        </div>

      {/* Partner */}
<div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F] mt-1">Partner</div>
<div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] px-[14px] py-3 flex items-center gap-[10px]">
  <div className="w-9 h-9 rounded-full bg-[#F0E9E3] flex items-center justify-center font-['Cormorant_Garamond'] text-[16px] italic text-[#7A5560] flex-shrink-0">
    {pactNames
      ? pactNames.split(' & ').find(n => n !== userData?.firstName)?.[0]?.toUpperCase() || '?'
      : '?'}
  </div>
  <div>
    <div className="text-[14px] font-medium text-[#2A1A1F]">
      {pactNames
        ? pactNames.split(' & ').find(n => n !== userData?.firstName) || 'Partner'
        : 'No partner yet'}
    </div>
    <div className="text-[11px] text-[#B8999F]">
      {pactNames ? 'Your pact partner' : 'Invite them to join your pact'}
    </div>
  </div>
</div>

        {/* Plan */}
      
       {/* Plan */}
       <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F] mt-1">Plan</div>
        <div
          className={`bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] px-[14px] py-3 flex justify-between items-center ${!userData?.isPremium ? 'cursor-pointer hover:bg-[#FAF8F4] transition-colors' : ''}`}
          onClick={() => { if (!userData?.isPremium) setShowSubscriptionPopup(true); }}
        >
          <div>
            <div className="text-[14px] font-medium text-[#2A1A1F]">
              {userData?.isPremium ? 'Couple plan' : 'Free plan'}
            </div>
            <div className="text-[11px] text-[#B8999F]">
              {userData?.isPremium ? '€9 / month' : 'Upgrade to unlock all features'}
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-medium ${
            userData?.isPremium ? 'bg-[#E8F5EE] text-[#0F6E56]' : 'bg-[#F0E9E3] text-[#7A5560]'
          }`}>
            {userData?.isPremium ? 'Active' : 'Upgrade →'}
          </span>
        </div>

        {/* Preferences */}
        <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F] mt-1">Preferences</div>
        <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[14px] overflow-hidden divide-y divide-[rgba(107,45,62,0.13)]">
          <RowLink
            onClick={() => setShowEditPopup(true)}
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A5560" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
            label="Update profile"
          />
         
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full h-[44px] rounded-[13px] bg-[#F0E9E3] text-[#7A5560] text-[14px] font-medium hover:bg-[#E6DCD5] transition-colors mt-1"
        >
          Sign out
        </button>

        <div className="text-center text-[11px] text-[#B8999F] pb-2">
          Patto v1.0.0 · patto.app
        </div>
      </div>

      {/* Bottom nav */}
     <BottomNav/>

      <div className="h-[30px] flex justify-center items-center flex-shrink-0">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}