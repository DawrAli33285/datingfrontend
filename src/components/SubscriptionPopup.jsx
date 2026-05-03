import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../components/baseurl';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '14px',
      color: '#2A1A1F',
      fontFamily: 'system-ui, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': { color: '#B8999F' },
    },
    invalid: { color: '#C4562A', iconColor: '#C4562A' },
  },
};

export default function SubscriptionPopup({ onClose, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [alreadyPremium, setAlreadyPremium] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const [error, setError] = useState('');
const [promoOpen, setPromoOpen] = useState(false);
const [promoCode, setPromoCode] = useState('');
const [promoStatus, setPromoStatus] = useState(null);
const [promoMessage, setPromoMessage] = useState('');
const [discount, setDiscount] = useState(0);


  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const checkPremium = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data?.isPremium) setAlreadyPremium(true);
      } catch {
      
      } finally {
        setChecking(false);
      }
    };
    checkPremium();
  }, []);

  const handleSubscribe = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error: stripeError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      await axios.post(
        `${BASE_URL}/create-subscription`,
        {
          email,
          amount: 14,
          currency: 'usd',
          interval: 'month',
          planName: 'Premium',
          paymentMethod: paymentMethod.id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    console.log(JSON.stringify(promoCode.trim().toUpperCase()));
    if (promoCode.trim().toUpperCase() !== 'PATTO') {
      setDiscount(0);
      setPromoStatus('invalid');
      setPromoMessage('Invalid promo code.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${BASE_URL}/promo/validate`,
        { code: 'PATTO' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSuccess?.();
      onClose();
      
    } catch (err) {
      setDiscount(0);
      setPromoStatus('invalid');
      setPromoMessage(err?.response?.data?.message || 'Invalid promo code.');
    }
  };
  

  const finalAmount = discount > 0
  ? parseFloat((14 * (1 - discount / 100)).toFixed(2))
  : 14;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      
      />

<div className="relative w-full max-w-md bg-[#FAF8F4] rounded-[28px] px-6 pt-5 pb-8 shadow-2xl max-h-[90vh] overflow-y-auto">
       

        {checking ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="w-6 h-6 border-2 border-[#6B2D3E] border-t-transparent rounded-full animate-spin" />
            <p className="text-[13px] text-[#B8999F]">Checking your account…</p>
          </div>

        ) : alreadyPremium ? (
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5EE] flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="font-['Cormorant_Garamond'] text-[26px] text-[#2A1A1F] leading-tight">
              You're already Premium
            </div>
            <p className="text-[13px] text-[#B8999F] leading-[1.6]">
              Your pact is fully unlocked. All features are available to you.
            </p>
            <button
              onClick={onClose}
              className="w-full h-[48px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[14px] font-medium hover:bg-[#5A2535] transition-colors"
            >
              Got it
            </button>
          </div>

        ) : (
          <>
            <div className="w-12 h-12 rounded-2xl bg-[#6B2D3E] flex items-center justify-center mx-auto mb-4">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FAF8F4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20h20M4 20l2-10 6 5 6-5 2 10" />
              </svg>
            </div>

            <div className="font-['Cormorant_Garamond'] text-[26px] text-center text-[#2A1A1F] leading-tight mb-1">
              Unlock your full pact
            </div>
            <p className="text-[13px] text-[#B8999F] text-center leading-[1.6] mb-5">
              You've answered a couple of questions. To save your pact and finish all topics, upgrade to Patto Premium.
            </p>

            <div className="bg-white border border-[rgba(107,45,62,0.1)] rounded-[16px] p-4 mb-5 flex flex-col gap-2.5">
              {[
                'All topics — money, fidelity, home & more',
                'AI-guided conversations with Patto',
                'Legally-styled pact PDF for both partners',
                'Unlimited check-ins & conflict repair',
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-[rgba(107,45,62,0.1)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] text-[#2A1A1F] leading-[1.5]">{f}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-medium text-[#6B2D3E] uppercase tracking-wider mb-2">
                Card details
              </label>
              <div className="bg-white border border-[rgba(107,45,62,0.2)] rounded-[12px] px-4 py-3.5 focus-within:border-[#6B2D3E] focus-within:ring-1 focus-within:ring-[rgba(107,45,62,0.2)] transition-all">
                <CardElement
                  options={CARD_ELEMENT_OPTIONS}
                  onChange={(e) => {
                    setCardReady(e.complete);
                    setError(e.error ? e.error.message : '');
                  }}
                />
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#B8999F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[11px] text-[#B8999F]">Secured by Stripe · 256-bit SSL</span>
              </div>
            </div>
            
            <div className="mb-4">
              <button
                onClick={() => setPromoOpen(p => !p)}
                className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#6B2D3E]"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
                Have a promo code?
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B2D3E" strokeWidth="2" strokeLinecap="round"
                  className={`transition-transform ${promoOpen ? 'rotate-180' : ''}`}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>

              {promoOpen && (
                <div className="mt-2.5 flex items-center gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => {
                      setPromoCode(e.target.value.toUpperCase());
                      setPromoStatus(null);
                      setPromoMessage('');
                      setDiscount(0);
                    }}
                    placeholder="Enter code"
                    className="flex-1 h-[40px] rounded-[10px] border border-[rgba(107,45,62,0.25)] bg-white px-3 text-[13px] text-[#2A1A1F] placeholder:text-[#B8999F] uppercase tracking-wider focus:outline-none focus:border-[#6B2D3E]"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="h-[40px] px-4 rounded-[10px] bg-[#6B2D3E] text-[#FAF8F4] text-[13px] font-medium hover:bg-[#5A2535] transition-colors whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              )}

              {promoMessage && (
                <p className={`text-[12px] mt-1.5 ${promoStatus === 'valid' ? 'text-[#0F6E56]' : 'text-[#C4562A]'}`}>
                  {promoMessage}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-[#FDF3F0] border border-[#C4562A] rounded-[12px] px-4 py-3 mb-4">
                <p className="text-[12.5px] text-[#C4562A]">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubscribe}
              disabled={loading || !stripe || !cardReady}
              className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] text-[#FAF8F4] text-[15px] font-medium hover:bg-[#5A2535] transition-colors flex items-center justify-center gap-2 mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Get Premium</span>
                  <span className="bg-[rgba(255,255,255,0.15)] rounded-lg px-2 py-0.5 text-[13px]">$14 / month</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-[#B8999F] text-center leading-[1.5]">
              Cancel anytime. No hidden fees.
            </p>
          </>
        )}
      </div>
    </div>
  );
}