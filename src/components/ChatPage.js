import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BASE_URL } from './baseurl';
import SubscriptionPopup from './SubscriptionPopup';

const TOPIC_ROUTES = {
  mn: '/chat/money',
  fi: '/chat/fidelity',
  ho: '/chat/home',
  fu: '/chat/future',
  co: '/chat/conflict',
  se: '/chat/separation',
};

const TOPIC_LABELS = {
  mn: 'Money & finances',
  fi: 'Fidelity & boundaries',
  ho: 'Home & living together',
  fu: 'Future plans',
  co: 'Conflict & repair',
  se: 'Separation',
};

export default function ChatPage({ label, backRoute, topicId }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get('edit_topic') === 'true';

  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [questionError, setQuestionError] = useState(null);

  const [step, setStep] = useState(0);
  const [isPremium, setIsPremium] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [showPaywall, setShowPaywall] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [nextRoute, setNextRoute] = useState('/review');
  const paywallShown = useRef(false);

  const progress = questions.length === 0 ? 0 : step >= questions.length ? 100 : Math.round((step / questions.length) * 100);

  // ── Fetch AI questions on mount ──────────────────────────────────────────
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoadingQuestions(true);
      setQuestionError(null);
      try {
        const prompt = `You are Patto, a warm relationship assistant helping couples build a relationship agreement.

Generate exactly 3 questions for the topic: "${TOPIC_LABELS[topicId]}".

Each question should feel like a natural conversation between partners — warm, direct, not clinical.
Each question must have exactly 4 short answer options (max 10 words each).

Respond ONLY with valid JSON in this exact format, no markdown, no explanation:
[
  {
    "q": "Question text here",
    "opts": ["Option 1", "Option 2", "Option 3", "Option 4"]
  },
  {
    "q": "Question text here",
    "opts": ["Option 1", "Option 2", "Option 3", "Option 4"]
  },
  {
    "q": "Question text here",
    "opts": ["Option 1", "Option 2", "Option 3", "Option 4"]
  }
]`;

        const res = await fetch('https://api.x.ai/v1/responses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_XAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'grok-3-mini',
            input: prompt,
          }),
        });

        if (!res.ok) throw new Error('Failed to fetch questions');

        const data = await res.json();
        // xAI responses API returns output array
        const text = data.output
          ?.filter(b => b.type === 'message')
          ?.flatMap(b => b.content)
          ?.filter(c => c.type === 'output_text')
          ?.map(c => c.text)
          ?.join('') ?? '';

        const parsed = JSON.parse(text.trim());
        setQuestions(parsed);
      } catch (err) {
        console.error(err);
        setQuestionError('Could not load questions. Please try again.');
      } finally {
        setLoadingQuestions(false);
      }
    };

    fetchQuestions();
  }, [topicId]);

  // ── Fetch next route ─────────────────────────────────────────────────────
  useEffect(() => {
    const fetchPactAndUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const userRes = await fetch(`${BASE_URL}/account`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setIsPremium(userData.user?.isPremium ?? false);

        if (isEditing) {
          setNextRoute('/review');
          return;
        }

        const pactRes = await fetch(`${BASE_URL}/pact/review/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pactData = await pactRes.json();

        if (pactRes.ok && pactData.selectedTopics) {
          const topics = pactData.selectedTopics;
          const currentIndex = topics.indexOf(topicId);
          const nextTopicId = topics[currentIndex + 1];
          setNextRoute(nextTopicId ? TOPIC_ROUTES[nextTopicId] : '/review');
        }
      } catch (err) {
        console.log('Could not fetch data', err);
      }
    };
    fetchPactAndUser();
  }, [topicId, isEditing]);

  // ── Save answers when all done ───────────────────────────────────────────
  useEffect(() => {
    if (questions.length === 0 || answers.length !== questions.length) return;

    const saveAnswers = async () => {
      const token = localStorage.getItem('token');
      const pactId = localStorage.getItem('pactId');

      if (!pactId) { setSaveError('No pact found. Please restart.'); return; }

      setSaving(true);
      setSaveError(null);

      try {
        const payload = {
          topicId,
          answers: questions.map((q, i) => ({
            question: q.q,
            answer: q.opts[answers[i]],
          })),
        };

        const res = await fetch(`${BASE_URL}/${pactId}/section`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) setSaveError(data.message || 'Failed to save answers');
      } catch (err) {
        setSaveError('Network error. Answers may not be saved.');
      } finally {
        setSaving(false);
      }
    };

    saveAnswers();
  }, [answers, questions]);

  const choose = (optionIndex) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    setStep(step + 1);
    if (!isPremium && newAnswers.length === 2 && !paywallShown.current) {
      paywallShown.current = true;
      setShowPaywall(true);
    }
  };

  // ── Loading state ────────────────────────────────────────────────────────
  if (loadingQuestions) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF8F4] gap-3">
        <div className="w-7 h-7 rounded-full bg-[#6B2D3E] flex items-center justify-center font-['Cormorant_Garamond'] text-[13px] italic text-[#FAF8F4] animate-pulse">
          p
        </div>
        <p className="text-[13px] text-[#B8999F]">Patto is preparing your questions…</p>
      </div>
    );
  }

  if (questionError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF8F4] gap-3 px-8 text-center">
        <p className="text-[13px] text-[#B8999F]">{questionError}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#6B2D3E] text-[#FAF8F4] rounded-[10px] px-4 py-2 text-[13px]"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F4]">
      {showPaywall && <SubscriptionPopup onClose={() => setShowPaywall(false)} />}

      {/* Header */}
      <div className="px-5 pt-[10px] pb-[10px] bg-white border-b border-[rgba(107,45,62,0.13)] flex-shrink-0">
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={() => navigate(-1)}
            className="w-[34px] h-[34px] rounded-full border border-[rgba(107,45,62,0.13)] bg-[#FAF8F4] flex items-center justify-center hover:bg-[#F5E8EB] transition-colors flex-shrink-0"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2A1A1F" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <div className="flex-1">
            <div className="text-[10px] tracking-[0.06em] uppercase text-[#B8999F]">{label}</div>
          </div>
        </div>
        <div className="mt-2 h-[3px] bg-[#F0E9E3] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#6B2D3E] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 px-[18px] py-4 flex flex-col gap-3 overflow-y-auto">
        {questions.map((q, i) => {
          if (i > step) return null;
          return (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-[#6B2D3E] flex items-center justify-center flex-shrink-0 font-['Cormorant_Garamond'] text-[13px] italic text-[#FAF8F4]">
                  p
                </div>
                <div className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[4px_13px_13px_13px] px-3 py-2.5 text-[13px] text-[#2A1A1F] leading-[1.65] max-w-[268px]">
                  {q.q}
                </div>
              </div>

              {answers[i] !== undefined && (
                <div className="flex justify-end">
                  <div className="bg-[#6B2D3E] text-[#FAF8F4] rounded-[13px_13px_4px_13px] px-3 py-2.5 text-[13px] leading-[1.5] max-w-[222px]">
                    {q.opts[answers[i]]}
                  </div>
                </div>
              )}

              {answers[i] === undefined && i === step && (
                <div className="flex flex-col gap-1.5 pl-[37px]">
                  {q.opts.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => choose(oi)}
                      className="bg-white border border-[rgba(107,45,62,0.13)] rounded-[11px] px-3 py-2.5 text-[13px] text-[#2A1A1F] text-left leading-[1.5] hover:bg-[#FBF2F4] hover:border-[#D4899A] transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {step >= questions.length && questions.length > 0 && (
          <div className="bg-[#E8F5EE] border border-[#9FE1CB] rounded-[14px] p-4 text-center">
            <div className="text-[13px] font-medium text-[#0F6E56] mb-1">Section complete</div>
            <p className="text-[12px] text-[#1D9E75] leading-[1.6] mb-3">
              {saving ? 'Saving your answers…' : saveError ? saveError : 'Your answers have been saved to your pact.'}
            </p>
            <button
              onClick={() => navigate(nextRoute)}
              disabled={saving}
              className="inline-block bg-[#0F6E56] text-white rounded-[10px] px-4 py-2 text-[13px] font-medium hover:bg-[#0a5a45] transition-colors disabled:opacity-60"
            >
              {nextRoute === '/review' ? 'Review the pact →' : 'Next topic →'}
            </button>
          </div>
        )}
      </div>

      <div className="h-[30px] flex justify-center items-center flex-shrink-0">
        <div className="w-[126px] h-1 bg-black opacity-[0.07] rounded-sm" />
      </div>
    </div>
  );
}