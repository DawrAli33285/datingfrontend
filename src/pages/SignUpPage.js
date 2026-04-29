import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import Toast from '../components/Toast';
import { BASE_URL } from '../components/baseurl';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('token'); // ← read token from URL

  const [showPassword, setShowPassword] = useState(false);
  const [termsChecked, setTermsChecked] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  // ── Navigate after register — skip /name if firstName already set ──────────
  const navigateAfterRegister = (user) => {
    navigate('/signin');
  };



  // ── Google sign-up ─────────────────────────────────────────────────────────
  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setGoogleLoading(true);

        const profileRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const { email: googleEmail, given_name: firstName } = profileRes.data;

        const res = await axios.post(`${BASE_URL}/google-auth`, {
          email: googleEmail,
          firstName,
          ...(inviteToken && { inviteToken }),
        });


        if (res.data.token && inviteToken) {
          localStorage.setItem('token', res.data.token);
        }
        showToast('Welcome! Account created with Google.', 'success');
        setTimeout(() => navigateAfterRegister(res.data.user), 1500);

      } catch (err) {
        const status = err?.response?.status;
        if (status === 400) {
          showToast('An account with this email already exists.');
        } else {
          showToast('Server error, please try again.');
        }
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => showToast('Server error, please try again.'),
  });

  // ── Email register ─────────────────────────────────────────────────────────
  const handleRegister = async () => {
    if (!email || !password) return showToast('Please fill in all fields.');
    if (!/\S+@\S+\.\S+/.test(email)) return showToast('Please enter a valid email address.');
    if (password.length < 8) return showToast('Password must be at least 8 characters.');
    if (!termsChecked) return showToast('Please agree to the Terms of Service and Privacy Policy.');

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/register`, {
        email,
        password,
        ...(inviteToken && { inviteToken }), // ← pass token if present
      });

      showToast('Account created! Welcome aboard.', 'success');
      setTimeout(() => navigateAfterRegister(res.data.user), 1500);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 400) {
        showToast('An account with this email already exists.');
      } else {
        showToast('Server error, please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: '' })}
      />

      {/* Header */}
      <div className="px-5 py-[10px] flex items-center gap-3 bg-white border-b border-[rgba(107,45,62,0.13)] flex-shrink-0">
        <button
          onClick={() => navigate('/welcome')}
          className="w-[34px] h-[34px] rounded-full border border-[rgba(107,45,62,0.13)] bg-[#FAF8F4] flex items-center justify-center hover:bg-[#F5E8EB] transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2A1A1F" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div>
          <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F]">Step 1 of 4</div>
          <div className="font-['Cormorant_Garamond'] text-[22px] font-normal text-[#2A1A1F]">Create your account</div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5 flex flex-col gap-3.5 overflow-y-auto">

        {/* Show invite context if token present */}
        {inviteToken && (
          <div className="bg-[#FBF2F4] border border-[#D4899A] rounded-[14px] px-4 py-3">
            <p className="text-[12.5px] text-[#7A5560] leading-[1.6]">
              You were invited to join a pact. Create your account to continue.
            </p>
          </div>
        )}

        {/* Google button */}
        <button
          onClick={() => {
            if (!termsChecked) return showToast('Please agree to the Terms of Service and Privacy Policy.');
            handleGoogleSignIn();
          }}
          disabled={googleLoading}
          className="flex items-center justify-center gap-2.5 w-full h-12 border border-[rgba(107,45,62,0.13)] rounded-xl bg-white px-4 text-[14px] text-[#2A1A1F] hover:bg-[#F0E9E3] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {googleLoading ? (
            <span className="text-[13px] text-[#B8999F]">Connecting to Google...</span>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2.5">
          <div className="flex-1 h-px bg-[rgba(107,45,62,0.13)]"/>
          <span className="text-[12px] text-[#B8999F]">or sign up with email</span>
          <div className="flex-1 h-px bg-[rgba(107,45,62,0.13)]"/>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-[#B8999F] tracking-[0.04em]">Email address</span>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 bg-white border border-[rgba(107,45,62,0.13)] rounded-xl text-[15px] text-[#2A1A1F] px-3.5 outline-none focus:border-[#D4899A] placeholder:text-[#D9C8CC] transition-colors"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] text-[#B8999F] tracking-[0.04em]">Password</span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-white border border-[rgba(107,45,62,0.13)] rounded-xl text-[15px] text-[#2A1A1F] px-3.5 pr-11 outline-none focus:border-[#D4899A] placeholder:text-[#D9C8CC] transition-colors"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B8999F]"
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2.5 py-0.5">
          <button
            onClick={() => setTermsChecked(!termsChecked)}
            className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
              termsChecked
                ? 'bg-[#6B2D3E] border-[#6B2D3E] border'
                : 'bg-white border border-[rgba(107,45,62,0.13)]'
            }`}
          >
            {termsChecked && (
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <polyline points="2,6 5,9 10,3"/>
              </svg>
            )}
          </button>
          <p className="text-[12px] text-[#7A5560] leading-[1.6]">
            I agree to the{' '}
            <span onClick={()=>{
              navigate('/terms-of-service')
            }} className="text-[#6B2D3E] underline underline-offset-[2px] cursor-pointer">Terms of Service</span>
            {' '}and{' '}
            <span onClick={()=>{
              navigate('/privacy-policy')
            }} className="text-[#6B2D3E] underline underline-offset-[2px] cursor-pointer">Privacy Policy</span>
          </p>
        </div>

        {/* Submit */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        {/* Privacy note */}
        <div className="bg-[#F0E9E3] rounded-xl px-3 py-2.5">
          <p className="text-[11.5px] text-[#7A5560] leading-[1.6]">
            <span className="font-medium text-[#2A1A1F]">Your data is yours.</span> We use
            end-to-end encryption. We never sell your data. You can delete everything at any time.
          </p>
        </div>
      </div>

      <div className="h-[30px] flex justify-center items-center mt-auto">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}