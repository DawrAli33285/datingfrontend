

/* ─── Design tokens ─────────────────────────────────────────────────────── */
const t = {
  rose: "#6B2D3E",
  roseH: "#5A2535",
  roseL: "#F5E8EB",
  roseLL: "#FBF2F4",
  roseM: "#D4899A",
  roseD: "#3D1A23",
  cream: "#FAF7F2",
  creamD: "#F0E9E0",
  creamDD: "#E4D8CC",
  tx: "#2A1A1F",
  tm: "#7A5560",
  tl: "#B89AA0",
  w: "#FFFFFF",
  teal: "#1D9E75",
  tealL: "#E8F5EE",
};

/* ─── Global styles injected once ──────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Instrument+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Instrument Sans', system-ui, sans-serif; background: #FAF7F2; color: #2A1A1F; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
    @keyframes floatphone { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes floatcard { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-8px) rotate(1deg)} }
    @keyframes dotpulse { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }
    .float-phone { animation: floatphone 6s ease-in-out infinite; }
    .float-card-1 { animation: floatcard 5s ease-in-out 1s infinite; }
    .float-card-2 { animation: floatcard 5s ease-in-out 2.5s infinite; }
    .dot-pulse-1 { animation: dotpulse .9s ease 0s infinite; }
    .dot-pulse-2 { animation: dotpulse .9s ease .15s infinite; }
    .dot-pulse-3 { animation: dotpulse .9s ease .3s infinite; }
    .pulse-dot { animation: pulse 2s ease infinite; }
    .step-card:hover { background: #FBF2F4 !important; }
    .topic-card:hover { background: rgba(255,255,255,.08) !important; }
    .tcard:hover { box-shadow: 0 8px 32px rgba(107,45,62,.08); }
    .opt-btn:hover { background: #FBF2F4 !important; border-color: #D4899A !important; color: #6B2D3E !important; }
    .sidebar-item:hover { background: #FBF2F4 !important; color: #6B2D3E !important; }
    .nav-link:hover { color: #6B2D3E !important; }
    .footer-link:hover { color: #FAF7F2 !important; }
    ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #E4D8CC; border-radius: 2px; }
  `}</style>
);

/* ─── Shared primitives ─────────────────────────────────────────────────── */
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Instrument Sans', system-ui, sans-serif" };

const BtnPrimary = ({ children, onClick, style = {} }) => {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...sans, padding: "14px 32px", background: hov ? t.roseH : t.rose, color: t.cream,
        border: "none", borderRadius: 28, fontSize: 15, fontWeight: 500, cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 8, letterSpacing: ".01em",
        transition: "all .18s", transform: hov ? "translateY(-1px)" : "none",
        boxShadow: hov ? "0 8px 24px rgba(107,45,62,.22)" : "none",
        textDecoration: "none", ...style,
      }}
    >
      {children}
    </button>
  );
};

const CheckIcon = ({ color = t.teal }) => (
  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <polyline points="2,6 5,9 10,3" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════════════════════════ */
const Nav = ({ setPage }) => (
  <nav style={{
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    padding: "0 48px", height: 64, display: "flex", alignItems: "center",
    justifyContent: "space-between", background: "rgba(250,247,242,.88)",
    backdropFilter: "blur(12px)", borderBottom: ".5px solid #E4D8CC",
  }}>
    <a href="#" onClick={() => setPage("landing")} style={{ ...serif, fontStyle: "italic", fontSize: 28, color: t.rose, letterSpacing: "-.5px", textDecoration: "none" }}><PattoIcon/></a>
    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
      {[["How it works", "#how"], ["Topics", "#topics"], ["Pricing", "#pricing"]].map(([label, href]) => (
        <a key={label} href={href} className="nav-link" style={{ ...sans, fontSize: 13, color: t.tm, textDecoration: "none", letterSpacing: ".02em", transition: "color .15s" }}>{label}</a>
      ))}
      
      <a href="#pricing" style={{
        ...sans, padding: "9px 22px", background: t.rose, color: t.cream,
        borderRadius: 24, fontSize: 13, fontWeight: 500, textDecoration: "none",
      }}>Start free</a>
    </div>
  </nav>
);

/* ═══════════════════════════════════════════════════════════════════════════
   LANDING — HERO
══════════════════════════════════════════════════════════════════════════ */
const Hero = ({ setPage }) => (
  <section id="hero" style={{
    minHeight: "100vh", padding: "120px 48px 80px",
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80,
    alignItems: "center", position: "relative", overflow: "hidden",
  }}>
    {/* bg */}
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(212,137,154,.12) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 20% 80%, rgba(107,45,62,.06) 0%, transparent 60%)",
    }} />

    {/* left */}
    <div>
      {/* eyebrow */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px 5px 8px",
        background: t.roseLL, border: `.5px solid ${t.roseM}`, borderRadius: 20,
        fontSize: 12, color: t.rose, letterSpacing: ".04em", marginBottom: 28,
      }}>
        <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: t.rose, display: "inline-block" }} />
        Now live — try free
      </div>

      <h1 style={{ ...serif, fontSize: "clamp(52px,5vw,76px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-1.5px", color: t.tx, marginBottom: 24 }}>
        Your relationship.<br />
        <em style={{ fontStyle: "italic", color: t.rose }}>Your rules.</em><br />
        Written together.
      </h1>

      <p style={{ ...sans, fontSize: 17, color: t.tm, lineHeight: 1.75, maxWidth: 460, marginBottom: 40 }}>
        Most relationships don't fail from lack of love — they fail from unspoken expectations. Patto helps couples put them in writing, guided by AI, in under 20 minutes.
      </p>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 52 }}>
        <BtnPrimary onClick={() => {window.location.href='/signup'}}>
          Start for free
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </BtnPrimary>
      
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {[
          [<svg key="s" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, "End-to-end encrypted"],
          [<svg key="t" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>, "~15 min to complete"],
          [<svg key="h" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>, "Not a legal contract"],
        ].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: t.tl }}>
            <span style={{ opacity: .7 }}>{icon}</span>{label}
          </div>
        ))}
      </div>
    </div>

    {/* right — phone */}
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* float cards */}
      <div className="float-card-1" style={{
        position: "absolute", top: "10%", right: -24, background: t.w, border: `.5px solid ${t.creamDD}`,
        borderRadius: 14, padding: "12px 16px", boxShadow: "0 8px 32px rgba(0,0,0,.08)",
      }}>
        <div style={{ fontSize: 10, color: t.tl, letterSpacing: ".04em", marginBottom: 4 }}>Pacts completed</div>
        <div style={{ ...serif, fontSize: 22, color: t.tx }}>2,400+</div>
        <div style={{ fontSize: 11, color: t.tm, marginTop: 2 }}>this month</div>
      </div>
      <div className="float-card-2" style={{
        position: "absolute", bottom: "12%", left: -36, background: t.w, border: `.5px solid ${t.creamDD}`,
        borderRadius: 14, padding: "12px 16px", boxShadow: "0 8px 32px rgba(0,0,0,.08)",
      }}>
        <div style={{ fontSize: 10, color: t.tl, letterSpacing: ".04em", marginBottom: 4 }}>Avg. completion</div>
        <div style={{ ...serif, fontSize: 22, color: t.teal }}>18 min</div>
        <div style={{ fontSize: 11, color: t.tm, marginTop: 2 }}>for both partners</div>
      </div>

      {/* phone */}
      <div className="float-phone" style={{ width: 320 }}>
        <div style={{
          width: 320, borderRadius: 40, border: "7px solid #1A0F13", overflow: "hidden",
          boxShadow: "0 40px 80px rgba(0,0,0,.22), 0 0 0 1px rgba(0,0,0,.4)", background: t.cream,
        }}>
          <div style={{ height: 40, background: t.cream, position: "relative" }}>
            <div style={{ width: 108, height: 30, background: "#1A0F13", borderRadius: "0 0 16px 16px", position: "absolute", left: "50%", transform: "translateX(-50%)" }} />
          </div>
          <div style={{ background: t.cream, padding: "14px 18px 20px" }}>
            <div style={{ ...serif, fontStyle: "italic", fontSize: 12, color: t.roseM, textAlign: "center", marginBottom: 14, letterSpacing: ".04em" }}>patto</div>
            <div style={{ ...serif, fontSize: 22, color: t.tx, textAlign: "center", marginBottom: 4 }}>Alex & Jordan</div>
            <div style={{ fontSize: 11, color: t.tl, textAlign: "center", marginBottom: 14 }}>April 2026 · Version 1</div>
            {[
              { label: "§1 · Money & finances", clauses: ["Fixed costs split proportionally to our incomes.", "Discretionary spending decided together, case by case."] },
              { label: "§2 · Fidelity & boundaries", clauses: ["Exclusive relationship, including online connections.", "If a line is crossed: real conversation within 48h."] },
            ].map(s => (
              <div key={s.label} style={{ background: t.w, border: `.5px solid rgba(107,45,62,.12)`, borderRadius: 12, padding: "10px 12px", marginBottom: 8 }}>
                <div style={{ fontSize: 9.5, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: t.tl, marginBottom: 6 }}>{s.label}</div>
                {s.clauses.map(c => (
                  <div key={c} style={{ fontSize: 11.5, color: t.tm, lineHeight: 1.55, marginBottom: 4, paddingLeft: 10, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: t.roseM, fontSize: 10 }}>—</span>{c}
                  </div>
                ))}
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
              <button style={{ ...sans, flex: 1, height: 38, borderRadius: 10, fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer", background: t.tealL, color: t.teal }}>✓ Alex agreed</button>
              <button style={{ ...sans, flex: 1, height: 38, borderRadius: 10, fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer", background: t.creamD, color: t.tm }}>Jordan agreed</button>
            </div>
          </div>
          <div style={{ height: 24, background: t.cream, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: 100, height: 4, background: t.tx, opacity: .08, borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   HOW IT WORKS
══════════════════════════════════════════════════════════════════════════ */
const HowItWorks = () => {
  const steps = [
    { num: "01", title: "You both sign up", body: "Create an account and invite your partner. Both of you are equal authors — no one leads, no one signs away.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.rose} strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg> },
    { num: "02", title: "AI guides the conversation", body: "Patto asks the questions you never thought to ask each other — about money, fidelity, home, and more.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.rose} strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg> },
    { num: "03", title: "Your pact is generated", body: "AI turns your answers into warm, clear clauses — not legal language. You review and edit everything before confirming.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.rose} strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
    { num: "04", title: "You both confirm", body: "One tap each. No signatures, no notaries. Your pact is live — and can be revisited any time life changes.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.rose} strokeWidth="1.5" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg> },
  ];
  return (
    <section id="how" style={{ padding: "100px 48px", background: t.cream }}>
      <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.roseM, marginBottom: 12, fontWeight: 500 }}>The process</div>
      <h2 style={{ ...serif, fontSize: "clamp(38px,4vw,54px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-.8px", color: t.tx, marginBottom: 16 }}>
        Four steps to a living <em style={{ color: t.rose }}>agreement</em>
      </h2>
      <p style={{ ...sans, fontSize: 16, color: t.tm, lineHeight: 1.7, maxWidth: 520, marginBottom: 64 }}>Guided by AI, built by you. Takes less than 20 minutes together — and can be updated any time.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}>
        {steps.map((s, i) => (
          <div key={s.num} className="step-card" style={{
            background: t.cream, padding: "32px 28px", border: `.5px solid ${t.creamDD}`, position: "relative", transition: "background .2s",
            borderRadius: i === 0 ? "20px 0 0 20px" : i === 3 ? "0 20px 20px 0" : 0,
          }}>
            <span style={{ ...serif, fontSize: 48, fontStyle: "italic", color: t.creamDD, lineHeight: 1, marginBottom: 20, display: "block" }}>{s.num}</span>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: t.roseLL, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{s.icon}</div>
            <h3 style={{ ...serif, fontSize: 20, color: t.tx, marginBottom: 8, fontWeight: 500 }}>{s.title}</h3>
            <p style={{ ...sans, fontSize: 13.5, color: t.tm, lineHeight: 1.65 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   TOPICS
══════════════════════════════════════════════════════════════════════════ */
const Topics = () => {
  const items = [
    { title: "Fidelity & boundaries", body: "What exclusivity means to both of you — and what happens if a line is crossed.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.roseM} strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg> },
    { title: "Home & living", body: "Space, guests, big decisions. What shared life actually looks like, day to day.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.roseM} strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg> },
    { title: "Money & finances", body: "Who pays what, how you split costs, what happens if incomes change significantly.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.roseM} strokeWidth="1.5" strokeLinecap="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg> },
    { title: "Future & plans", body: "Children, career moves, where to live. Conversations worth having before decisions are made.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.roseM} strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
    { title: "Conflict & repair", body: "How you both want to handle disagreements — before they become habits.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.roseM} strokeWidth="1.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },
    { title: "Annual check-in", body: "Life changes. Your pact should too. A guided yearly review keeps everything current.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.roseM} strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg> },
  ];
  const radii = ["20px 0 0 0", 0, "0 20px 0 0", "0 0 0 20px", 0, "0 0 20px 0"];
  return (
    <section id="topics" style={{ padding: "100px 48px", background: t.roseD, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 60% at 80% 30%, rgba(212,137,154,.1) 0%, transparent 60%)" }} />
      <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.roseM, marginBottom: 12, fontWeight: 500 }}>What you'll cover</div>
      <h2 style={{ ...serif, fontSize: "clamp(38px,4vw,54px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-.8px", color: t.cream, marginBottom: 16 }}>Every conversation <em style={{ color: t.roseM }}>that matters</em></h2>
      <p style={{ ...sans, fontSize: 16, color: "rgba(250,247,242,.6)", lineHeight: 1.7, maxWidth: 520, marginBottom: 64 }}>Start with three core topics. Add more as your relationship grows and evolves.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1 }}>
        {items.map((item, i) => (
          <div key={item.title} className="topic-card" style={{ padding: "36px 32px", background: "rgba(255,255,255,.04)", border: ".5px solid rgba(255,255,255,.08)", transition: "background .2s", borderRadius: radii[i] }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(212,137,154,.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{item.icon}</div>
            <h3 style={{ ...serif, fontSize: 22, color: t.cream, marginBottom: 8, fontWeight: 400 }}>{item.title}</h3>
            <p style={{ ...sans, fontSize: 13.5, color: "rgba(250,247,242,.5)", lineHeight: 1.65 }}>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════════════════════════════ */
const Testimonials = () => {
  const cards = [
    { init: "S", quote: <>We'd been together four years and there were things we'd <em style={{ fontStyle: "italic", color: t.rose }}>literally never discussed</em>. Patto made us talk about them in 20 minutes.</>, name: "Sarah & Tom", meta: "London · Cohabiting 2 years" },
    { init: "A", quote: <>I was nervous to bring it up. Turns out Jordan was too. <em style={{ fontStyle: "italic", color: t.rose }}>Having an app guide us</em> made it feel less like a confrontation and more like a date.</>, name: "Alex & Jordan", meta: "Sydney · Open relationship" },
    { init: "M", quote: <>We're not married, we don't want a prenup. <em style={{ fontStyle: "italic", color: t.rose }}>Patto was exactly what we needed</em> — something human, not legal.</>, name: "Marco & Chiara", meta: "Milan · Buying a flat together" },
  ];
  return (
    <section id="social-proof" style={{ padding: "100px 48px", background: t.cream }}>
      <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.roseM, marginBottom: 12, fontWeight: 500 }}>What couples say</div>
      <h2 style={{ ...serif, fontSize: "clamp(38px,4vw,54px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-.8px", color: t.tx }}>The conversation they'd<br /><em style={{ color: t.rose }}>never had</em></h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 56 }}>
        {cards.map(c => (
          <div key={c.name} className="tcard" style={{ background: t.w, border: `.5px solid ${t.creamDD}`, borderRadius: 20, padding: "28px 28px 24px", transition: "box-shadow .2s" }}>
            <div style={{ color: t.rose, fontSize: 14, marginBottom: 14, letterSpacing: 2 }}>★★★★★</div>
            <p style={{ ...serif, fontSize: 14.5, color: t.tx, lineHeight: 1.7, marginBottom: 20 }}>"{c.quote}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.roseLL, display: "flex", alignItems: "center", justifyContent: "center", ...serif, fontStyle: "italic", fontSize: 15, color: t.rose }}>{c.init}</div>
              <div>
                <div style={{ ...sans, fontSize: 13, fontWeight: 500, color: t.tx }}>{c.name}</div>
                <div style={{ ...sans, fontSize: 12, color: t.tl, marginTop: 1 }}>{c.meta}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   PRICING
══════════════════════════════════════════════════════════════════════════ */
const Pricing = ({ setPage }) => {
  const freeFeatures = ["One pact, 3 topics", "AI-generated pact text", "PDF export (watermarked)", "Both partners included"];
  const paidFeatures = ["Unlimited pacts & topics", "Clean PDF, no watermark", "Annual check-in feature", "Version history", "First month free with code PATTO"];
  return (
    <section id="pricing" style={{ padding: "100px 48px", background: t.creamD }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: t.roseM, marginBottom: 12, fontWeight: 500 }}>Simple pricing</div>
        <h2 style={{ ...serif, fontSize: "clamp(38px,4vw,54px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-.8px", color: t.tx, marginBottom: 16 }}>One plan. <em style={{ color: t.rose }}>One price.</em></h2>
        <p style={{ ...sans, fontSize: 16, color: t.tm, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>No tiers, no upsells, no legal complexity. Just clarity.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 800, margin: "56px auto 0" }}>
        {/* Free */}
        <div style={{ background: t.w, border: `.5px solid ${t.creamDD}`, borderRadius: 24, padding: 36 }}>
          <div style={{ ...sans, fontSize: 12, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: t.rose, marginBottom: 24 }}>Free</div>
          <div style={{ ...serif, fontSize: 48, color: t.tx, lineHeight: 1, marginBottom: 4 }}>$0</div>
          <div style={{ ...sans, fontSize: 14, color: t.tl, marginBottom: 20 }}>forever</div>
          <div style={{ height: .5, background: t.creamDD, margin: "20px 0" }} />
          {freeFeatures.map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: t.tm, marginBottom: 10 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: t.tealL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CheckIcon /></div>
              {f}
            </div>
          ))}
          <button onClick={() => window.location.href='/signup'} style={{ ...sans, display: "block", width: "100%", height: 50, marginTop: 28, borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: "pointer", border: "none", background: t.creamD, color: t.tx, transition: "all .18s" }}>Get started free</button>
        </div>
        {/* Paid */}
        <div style={{ background: t.rose, border: `.5px solid ${t.rose}`, borderRadius: 24, padding: 36 }}>
          <div style={{ ...sans, fontSize: 12, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: t.roseM, marginBottom: 24 }}>Couple Plan</div>
          <div style={{ ...serif, fontSize: 48, color: t.cream, lineHeight: 1, marginBottom: 4 }}>$14</div>
          <div style={{ ...sans, fontSize: 14, color: "rgba(250,247,242,.6)", marginBottom: 20 }}>per month · billed as a couple</div>
          <div style={{ height: .5, background: "rgba(255,255,255,.15)", margin: "20px 0" }} />
          {paidFeatures.map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "rgba(250,247,242,.8)", marginBottom: 10 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><CheckIcon color="rgba(250,247,242,.8)" /></div>
              {f}
            </div>
          ))}
          <button onClick={() => window.location.href='/signup'} style={{ ...sans, display: "block", width: "100%", height: 50, marginTop: 28, borderRadius: 14, fontSize: 14, fontWeight: 500, cursor: "pointer", border: "none", background: t.w, color: t.rose, transition: "all .18s" }}>Start free month →</button>
        </div>
      </div>
      <p style={{ ...sans, textAlign: "center", fontSize: 13, color: t.tl, marginTop: 24 }}>Cancel any time. No questions asked.</p>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   CTA BAND
══════════════════════════════════════════════════════════════════════════ */
const CtaBand = ({ setPage }) => (
  <section style={{ padding: "80px 48px", background: t.rose, textAlign: "center", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255,255,255,.05) 0%, transparent 60%)" }} />
    <h2 style={{ ...serif, fontSize: "clamp(36px,4vw,54px)", color: t.cream, letterSpacing: "-.8px", marginBottom: 16 }}>Start the conversation<br />you've been putting off.</h2>
    <p style={{ ...sans, fontSize: 16, color: "rgba(250,247,242,.7)", marginBottom: 36 }}>It takes 15 minutes. It might change everything.</p>
    <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center" }}>
      <button onClick={() => window.location.href='/signin'} style={{ ...sans, padding: "14px 36px", background: t.w, color: t.rose, border: "none", borderRadius: 28, fontSize: 15, fontWeight: 500, cursor: "pointer", transition: "all .18s" }}>Create your free account →</button>
      
    </div>
    <div style={{ ...sans, fontSize: 12.5, color: "rgba(250,247,242,.45)", marginTop: 20 }}>No credit card required · Free forever plan available · Trusted by 2,400+ couples</div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════════════════ */
const Footer = () => (
  <>
    <footer style={{ padding: "48px 48px 32px", background: t.roseD, display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48 }}>
      <div>
        <span style={{ ...serif, fontStyle: "italic", fontSize: 32, color: t.cream, display: "block", marginBottom: 12 }}><PattoIcon/></span>
        <p style={{ ...sans, fontSize: 13, color: "rgba(250,247,242,.45)", lineHeight: 1.7, maxWidth: 280 }}>A shared promise between two people who want to be honest with each other — today and in the future.</p>
      </div>
      {[
       
        { title: "Legal", links: [["Terms of Service", "/terms-of-service"], ["Privacy Policy", "/privacy-policy"], ["Cookie Policy", "/cookie-policy"]] },
      ].map(col => (
        <div key={col.title}>
          <h4 style={{ ...sans, fontSize: 11, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(250,247,242,.35)", marginBottom: 16 }}>{col.title}</h4>
          {col.links.map(([label, href]) => (
            <a key={label} href={href} className="footer-link" style={{ ...sans, display: "block", fontSize: 13, color: "rgba(250,247,242,.55)", textDecoration: "none", marginBottom: 10, transition: "color .15s" }}>{label}</a>
          ))}
        </div>
      ))}
    </footer>
    <div style={{ padding: "20px 48px", background: t.roseD, borderTop: ".5px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <p style={{ ...sans, fontSize: 12, color: "rgba(250,247,242,.3)" }}>© 2026 Traclin Pte Ltd · UEN 202113251D · Singapore</p>
      <div style={{ display: "flex", gap: 20 }}>
        {["Terms", "Privacy", "Cookies"].map(l => <a key={l} href="#" className="footer-link" style={{ ...sans, fontSize: 12, color: "rgba(250,247,242,.3)", textDecoration: "none" }}>{l}</a>)}
      </div>
    </div>
  </>
);

/* ═══════════════════════════════════════════════════════════════════════════
   APP SIDEBAR
══════════════════════════════════════════════════════════════════════════ */
const AppSidebar = ({ active, setPage }) => {
  const items = [
    { label: "Dashboard", page: "dashboard", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg> },
    { label: "Conversations", page: "conversation", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg> },
  ];
  return (
    <div style={{ background: t.cream, borderRight: `.5px solid ${t.creamDD}`, padding: "28px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ ...sans, fontSize: 10, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: t.tl, padding: "0 12px", marginBottom: 6 }}>Overview</div>
      {items.map(item => (
        <div key={item.page} className="sidebar-item" onClick={() => setPage(item.page)} style={{
          display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10,
          fontSize: 13.5, color: active === item.page ? t.rose : t.tm, cursor: "pointer",
          background: active === item.page ? t.roseLL : "transparent", fontWeight: active === item.page ? 500 : 400,
          transition: "all .12s",
        }}>
          {item.icon}{item.label}
        </div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════════════════
   CONVERSATION
══════════════════════════════════════════════════════════════════════════ */
const CLAUSES = [
  "Fixed costs (rent, bills, groceries) are split proportionally to our incomes.",
  "Discretionary spending is decided case by case, with no pressure on either partner.",
  "We revisit this arrangement every 12 months or after any significant income change.",
];

const Conversation = ({ setPage }) => {
  const [msgs, setMsgs] = useState([
    { role: "ai", text: "Hey Alex, hey Jordan! Let's talk about money. How do you handle shared costs right now?" },
    { role: "user", text: "We split 50/50 and take turns paying" },
    { role: "ai", text: "Got it. Are your incomes roughly equal, or is there a noticeable gap?" },
  ]);
  const [opts, setOpts] = useState(["Pretty similar", "One of us earns about 30–50% more", "A very significant difference", "It varies a lot — freelance or seasonal"]);
  const [step, setStep] = useState(1);
  const [clauses, setClauses] = useState([]);
  const [done, setDone] = useState(false);
  const msgsEndRef = { current: null };

  const QUESTIONS = [null, "If one of you had a big income change, how would you want to handle the split?", "Got it — I've added that to your pact. One more: would you want a regular review of this arrangement?"];
  const OPTIONS = [null, ["Adjust proportionally", "Figure it out case by case", "Whoever can, covers the other"], ["Yes, once a year", "Only if something changes significantly", "We'd prefer to decide when it comes up"]];

  const choose = (text) => {
    const nextMsgs = [...msgs, { role: "user", text }];
    const nextStep = step + 1;
    const nextClauses = clauses.length < CLAUSES.length ? [...clauses, CLAUSES[clauses.length]] : clauses;

    if (nextStep <= 3 && QUESTIONS[nextStep - 1]) {
      setTimeout(() => {
        setMsgs(m => [...m, { role: "ai", text: QUESTIONS[nextStep - 1] }]);
        setOpts(OPTIONS[nextStep - 1]);
      }, 400);
    } else if (nextStep > 3) {
      setTimeout(() => {
        setMsgs(m => [...m, { role: "ai", text: "Section complete ✓ Your money preferences have been saved. Head to Fidelity & boundaries next." }]);
        setOpts([]);
        setDone(true);
      }, 400);
    }
    setMsgs(nextMsgs);
    setClauses(nextClauses);
    setStep(nextStep);
  };

  const progress = Math.min(step / 3 * 100, 100);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gridTemplateRows: "64px 1fr", minHeight: "100vh" }}>
      {/* topbar */}
      <div style={{ gridColumn: "1/-1", background: t.w, borderBottom: `.5px solid ${t.creamDD}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
        <span style={{ ...serif, fontStyle: "italic", fontSize: 24, color: t.rose }}>patto</span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ ...sans, fontSize: 12, color: t.tl }}>Topic 1 of 3 · Money & finances</span>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: t.roseLL, display: "flex", alignItems: "center", justifyContent: "center", ...serif, fontStyle: "italic", fontSize: 15, color: t.rose }}>A</div>
        </div>
      </div>

      <AppSidebar active="conversation" setPage={setPage} />

      <div style={{ background: t.cream, padding: "24px 28px", overflowY: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, height: "calc(100vh - 64px - 48px)" }}>
          {/* chat */}
          <div style={{ background: t.w, border: `.5px solid ${t.creamDD}`, borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px 20px", borderBottom: `.5px solid ${t.creamDD}` }}>
              <h3 style={{ ...serif, fontSize: 18, color: t.tx, fontWeight: 400, marginBottom: 6 }}>Money & finances</h3>
              <div style={{ height: 3, background: t.creamD, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", background: t.rose, borderRadius: 2, width: `${progress}%`, transition: "width .4s ease" }} />
              </div>
            </div>
            <div style={{ flex: 1, padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
              {msgs.map((m, i) => m.role === "ai" ? (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: t.rose, display: "flex", alignItems: "center", justifyContent: "center", ...serif, fontStyle: "italic", fontSize: 13, color: t.cream, flexShrink: 0 }}>p</div>
                  <div style={{ background: t.cream, border: `.5px solid ${t.creamDD}`, borderRadius: "4px 14px 14px 14px", padding: "11px 14px", fontSize: 13.5, color: t.tx, lineHeight: 1.65, maxWidth: 420 }}>{m.text}</div>
                </div>
              ) : (
                <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ background: t.rose, color: t.cream, borderRadius: "14px 14px 4px 14px", padding: "11px 14px", fontSize: 13.5, maxWidth: 320, lineHeight: 1.5 }}>{m.text}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "16px 20px", borderTop: `.5px solid ${t.creamDD}`, display: "flex", flexDirection: "column", gap: 8 }}>
              {done ? (
                <button onClick={() => setPage("dashboard")} style={{ ...sans, padding: "13px 20px", background: t.rose, color: t.cream, border: "none", borderRadius: 11, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Back to dashboard →</button>
              ) : opts.map(o => (
                <button key={o} className="opt-btn" onClick={() => choose(o)} style={{ ...sans, padding: "11px 16px", background: t.cream, border: `.5px solid ${t.creamDD}`, borderRadius: 11, fontSize: 13, color: t.tx, cursor: "pointer", textAlign: "left", transition: "all .12s" }}>{o}</button>
              ))}
            </div>
          </div>

          {/* pact preview */}
          <div style={{ background: t.w, border: `.5px solid ${t.creamDD}`, borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "16px 20px", borderBottom: `.5px solid ${t.creamDD}`, textAlign: "center" }}>
              <div style={{ ...serif, fontStyle: "italic", fontSize: 12, color: t.roseM, marginBottom: 4 }}>patto</div>
              <div style={{ ...serif, fontSize: 18, color: t.tx }}>Alex & Jordan</div>
              <div style={{ ...sans, fontSize: 11, color: t.tl, marginTop: 3 }}>Draft · April 2026</div>
            </div>
            <div style={{ flex: 1, padding: "14px 16px", overflowY: "auto" }}>
              <div style={{ marginBottom: 14 }}>
                <div style={{ ...sans, fontSize: 10, fontWeight: 500, letterSpacing: ".05em", textTransform: "uppercase", color: t.tl, marginBottom: 8 }}>§1 · Money & finances</div>
                {clauses.length === 0 ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0" }}>
                    {[0, 1, 2].map(i => <div key={i} className={`dot-pulse-${i + 1}`} style={{ width: 6, height: 6, borderRadius: "50%", background: t.roseM }} />)}
                    <span style={{ ...sans, fontSize: 12, color: t.tl, marginLeft: 4 }}>Generating your pact...</span>
                  </div>
                ) : clauses.map(c => (
                  <div key={c} style={{ ...sans, fontSize: 12.5, color: t.tm, lineHeight: 1.6, paddingLeft: 12, marginBottom: 5, position: "relative" }}>
                    <span style={{ position: "absolute", left: 0, color: t.roseM, fontSize: 10 }}>—</span>{c}
                  </div>
                ))}
              </div>
              {["§2 · Fidelity & boundaries", "§3 · Home & living together"].map(s => (
                <div key={s} style={{ marginBottom: 14, opacity: .35 }}>
                  <div style={{ ...sans, fontSize: 10, fontWeight: 500, letterSpacing: ".05em", textTransform: "uppercase", color: t.tl, marginBottom: 8 }}>{s}</div>
                  <div style={{ ...sans, fontSize: 12, color: t.tl, fontStyle: "italic" }}>Complete this topic first</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 16px", borderTop: `.5px solid ${t.creamDD}` }}>
              <button style={{ ...sans, display: "block", width: "100%", height: 44, borderRadius: 11, fontSize: 13, fontWeight: 500, border: "none", background: t.rose, color: t.cream, opacity: done ? 1 : .4, cursor: done ? "pointer" : "default", transition: "opacity .3s" }}>Confirm pact →</button>
              <p style={{ ...sans, fontSize: 11, color: t.tl, textAlign: "center", marginTop: 8 }}>Complete all topics to confirm</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   DEMO NAV
══════════════════════════════════════════════════════════════════════════ */
const DemoNav = ({ page, setPage }) => (
  <div style={{
    position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
    display: "flex", gap: 4, zIndex: 200,
    background: "rgba(42,26,31,.88)", backdropFilter: "blur(12px)",
    borderRadius: 40, padding: 5, boxShadow: "0 8px 32px rgba(0,0,0,.3)",
  }}>
    {[["Landing", "landing"], ["Dashboard", "dashboard"], ["Conversation", "conversation"]].map(([label, id]) => (
      <button key={id} onClick={() => setPage(id)} style={{
        ...sans, padding: "7px 18px", borderRadius: 36, border: "none",
        fontSize: 12, cursor: "pointer", transition: "all .15s",
        background: page === id ? t.rose : "transparent",
        color: page === id ? t.cream : "rgba(250,247,242,.55)",
      }}>{label}</button>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════════════════ */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PattoIcon from "../components/PattoIcon";

function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(
    () => window.innerWidth >= breakpoint
  );

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isDesktop;
}

export default function SplashPage() {
  const isDesktop = useIsDesktop();

  return isDesktop ? <DesktopLanding /> : <MobileSplash />;
}
function DesktopLanding() {
  const [page, setPage] = useState("landing");
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyles />
      {page === "landing" && (
        <>
          <Nav setPage={setPage} />
          <Hero setPage={setPage} />
          <HowItWorks />
          <Topics />
          <Testimonials />
          <Pricing setPage={setPage} />
          <CtaBand setPage={setPage} />
          <Footer />
        </>
      )}
    </>
  );
}

function MobileSplash() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-10 gap-0">
        <h1
          className={`font-['Cormorant_Garamond'] italic text-[88px] leading-none tracking-[-3px] text-[#6B2D3E] transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          patto
        </h1>
        <p
          className={`text-[13px] text-[#B8999F] mt-4 transition-all duration-700 delay-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          Build the foundations of your relationship.
        </p>
        <div
          className={`flex gap-2 mt-10 transition-all duration-500 delay-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#D4899A]"
              style={{ animation: `pulseDot 1.2s ease ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
      <div
        className={`px-7 pb-8 flex flex-col gap-0 transition-all duration-500 delay-[1400ms] ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => navigate("/welcome")}
          className="w-full h-[52px] rounded-[15px] bg-[#6B2D3E] hover:bg-[#5A2535] text-[#FAF8F4] text-[15px] font-medium transition-colors duration-150"
        >
          Get started
        </button>
        <p className="text-center mt-3 text-[13px] text-[#7A5560]">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="text-[#6B2D3E] underline underline-offset-[3px] bg-transparent border-none cursor-pointer text-[13px]"
          >
            Sign in
          </button>
        </p>
      </div>
      <div className="flex justify-center items-center h-7 pb-1">
        <div className="w-32 h-1 rounded-full bg-[#2A1A1F] opacity-[0.07]" />
      </div>
      <style>{`
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.4); opacity: 1; }
        }
      `}</style>
    </div>
  );
}