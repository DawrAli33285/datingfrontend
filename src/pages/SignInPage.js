// src/pages/SignInPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { gapi } from 'gapi-script';
import Toast from '../components/Toast';
import { BASE_URL } from '../components/baseurl';
import { useGoogleLogin } from '@react-oauth/google';
import PattoIcon from '../components/PattoIcon';

const GOOGLE_CLIENT_ID = '90321078061-0170dr3h7mknf595o674b7ctu70av45u.apps.googleusercontent.com';

export default function SignInPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('token');

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };



  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setGoogleLoading(true);
  
        const profileRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
  
        const { email, given_name: firstName } = profileRes.data;
  
        const res = await axios.post(`${BASE_URL}/google-auth`, { email, firstName });
  
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
  
        const { firstName: fn, partnerMode, role } = res.data.user;
  
        let destination = '/name';
  
        if (role === 'partner') {
          localStorage.setItem('isPartner', 'true');
          destination = '/partner-review';
        } else if (fn && !partnerMode) {
          destination = '/together';
        } else if (partnerMode === 'together') {
          destination = '/dashboard';
        } else if (partnerMode === 'invite') {
          destination = '/invite';
        } else if (partnerMode === 'explore') {
          destination = '/dashboard';
        }
  
        showToast('Welcome back!', 'success');
        setTimeout(() => navigate(destination), 1500);
      } catch (err) {
        console.log(err);
        showToast('Server error, please try again.');
      } finally {
        setGoogleLoading(false);
      }
    },
    onError: () => {
      showToast('Server error, please try again.');
    },
  });



  // ── Email login ────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    if (!email || !password) return showToast('Please fill in all fields.');
    if (!/\S+@\S+\.\S+/.test(email)) return showToast('Please enter a valid email address.');
  
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/login`, { email, password });
  
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
  
      const { firstName: fn, partnerMode, role } = res.data.user
   
      let destination = '/name';
      if (role === 'partner') {
        localStorage.setItem('isPartner', 'true');
        destination = '/partner-review';
      } else if (fn && !partnerMode) {
        destination = '/together';
      } else if (partnerMode === 'together') {
        destination = '/dashboard';
      } else if (partnerMode === 'invite') {
        destination = '/invite';
      } else if (partnerMode === 'explore') {
        destination = '/dashboard';
      }
      showToast('Welcome back!', 'success');
      setTimeout(() => navigate(destination), 1500);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        showToast('Incorrect email or password.');
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

      <div className="flex-1 flex flex-col px-7 pt-10">

        <div className="font-['Cormorant_Garamond'] text-[15px] italic text-[#D4899A] mb-7">
         <PattoIcon/>
        </div>

        <h1 className="font-['Cormorant_Garamond'] text-[34px] font-normal text-[#2A1A1F] leading-[1.1] mb-7">
          Welcome back.
        </h1>

        <div className="flex flex-col gap-3">

          {/* Google */}
          <button onClick={() => handleGoogleSignIn()}
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

          <div className="flex items-center gap-2.5 my-1">
            <div className="flex-1 h-px bg-[rgba(107,45,62,0.13)]"/>
            <span className="text-[12px] text-[#B8999F]">or</span>
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
                placeholder="••••••••"
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

          <div className="text-right -mt-1">
            <span
              onClick={() => navigate('/forgot-password')}
              className="text-[12px] text-[#6B2D3E] underline underline-offset-[3px] cursor-pointer"
            >
              Forgot password?
            </span>
          </div>

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="text-center">
            <span className="text-[13px] text-[#7A5560]">
              No account?{' '}
              <span
                onClick={() => navigate('/signup')}
                className="text-[#6B2D3E] underline underline-offset-[3px] cursor-pointer"
              >
                Create one
              </span>
            </span>
          </div>

        </div>
      </div>

      <div className="h-[30px] flex justify-center items-center mt-auto">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}