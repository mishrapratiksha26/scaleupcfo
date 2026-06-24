import { useState, useEffect } from "react";

const QUIZ_SEEN_KEY = "bmi_quiz_seen";

const questions = [
  {
    id: 1,
    text: "How long does your month-end book closure typically take?",
    options: [
      { label: "A", text: "More than 7 days — it's always a fire drill" },
      { label: "B", text: "5–7 days with a lot of manual effort" },
      { label: "C", text: "3–4 days — we've streamlined some parts" },
      { label: "D", text: "Under 2 days — mostly automated" },
    ],
  },
  {
    id: 2,
    text: "How does your team currently handle TDS reconciliation?",
    options: [
      { label: "A", text: "Fully manual — Excel, VLOOKUPs, lots of back-and-forth" },
      { label: "B", text: "Partially manual — some tools but still lots of checking" },
      { label: "C", text: "Mostly automated but we still review a lot of entries" },
      { label: "D", text: "Automated — we only review flagged exceptions" },
    ],
  },
  {
    id: 3,
    text: "How do you track your firm's cash position on a daily basis?",
    options: [
      { label: "A", text: "We don't — we check manually when needed" },
      { label: "B", text: "Someone logs into each bank portal separately" },
      { label: "C", text: "We have a dashboard but it's updated weekly" },
      { label: "D", text: "Real-time — all accounts consolidated automatically" },
    ],
  },
  {
    id: 4,
    text: "How much of your team's time goes into data entry and manual reconciliation?",
    options: [
      { label: "A", text: "60–70% — it's the bulk of what we do" },
      { label: "B", text: "40–60% — it's a lot but we manage" },
      { label: "C", text: "20–40% — we've automated the easy parts" },
      { label: "D", text: "Under 20% — our team focuses on analysis and advisory" },
    ],
  },
  {
    id: 5,
    text: "When an investor or auditor asks for financial data, how quickly can you deliver?",
    options: [
      { label: "A", text: "3–5 days — we need to compile everything from scratch" },
      { label: "B", text: "1–2 days — it takes some scrambling" },
      { label: "C", text: "Same day — if we start early enough" },
      { label: "D", text: "Within hours — everything is ready on demand" },
    ],
  },
];

function getResult(score) {
  if (score <= 10) {
    return {
      emoji: "🔴",
      bucket: "High Pain",
      range: "5–10",
      headline: "You're losing significant time and accuracy.",
      sub: "Your firm is spending hours on work that AI can do in minutes. Lekha AI is built exactly for where you are right now.",
      offer: true,
    };
  } else if (score <= 15) {
    return {
      emoji: "🟡",
      bucket: "Room to Improve",
      range: "11–15",
      headline: "You're close, but there's room to go faster and more accurate.",
      sub: "You've made progress, but manual bottlenecks are still slowing your team down. Lekha AI can close the gap.",
      offer: false,
    };
  } else {
    return {
      emoji: "🟢",
      bucket: "Optimised",
      range: "16–20",
      headline: "You're ahead of most firms.",
      sub: "You've built strong processes. Lekha AI can help you scale further and handle growing complexity without adding headcount.",
      offer: false,
    };
  }
}

export default function QuizPopup() {
  const [visible, setVisible] = useState(false);
  const [screen, setScreen] = useState("welcome"); // welcome | quiz | result | form | done
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", firm: "" });
  const [submitting, setSubmitting] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(QUIZ_SEEN_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  function close() {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(QUIZ_SEEN_KEY, "1");
    }, 300);
  }

  function startQuiz() {
    setScreen("quiz");
    setCurrent(0);
    setSelected(null);
  }

  function selectOption(idx) {
    setSelected(idx);
  }

  function nextQuestion() {
    if (selected === null) return;
    const points = selected + 1; // A=1 B=2 C=3 D=4
    const newAnswers = [...answers, points];
    setAnswers(newAnswers);
    setSelected(null);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const total = newAnswers.reduce((a, b) => a + b, 0);
      setScore(total);
      setScreen("result");
    }
  }

  async function submitForm(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, score, bucket: getResult(score).bucket }),
      });
    } catch (_) {
      // endpoint placeholder — fail silently
    }
    setSubmitting(false);
    setScreen("done");
  }

  if (!visible) return null;

  const result = screen === "result" || screen === "form" || screen === "done"
    ? getResult(score)
    : null;

  const progress = screen === "quiz"
    ? Math.round(((current) / questions.length) * 100)
    : screen === "result" || screen === "form" || screen === "done"
    ? 100
    : 0;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: "#0f0f0f",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
          opacity: closing ? 0 : 1,
          transform: closing ? "scale(0.96)" : "scale(1)",
          transition: "opacity 0.3s, transform 0.3s",
        }}
      >
        {/* Green accent top bar */}
        <div style={{ height: "3px", background: "linear-gradient(90deg,#10b981,#34d399)" }} />

        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="p-7 pt-6">

          {/* ── WELCOME ── */}
          {screen === "welcome" && (
            <div className="text-center">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full mb-5">
                Business Matrix Index · Free Assessment
              </span>
              <h2 className="text-2xl font-bold text-white leading-snug mb-3">
                Find out where your firm stands<br />
                <span className="text-emerald-400">in 60 seconds</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-7">
                5 quick questions. No sign-up required to start.<br />
                See how much of your team's time is being lost to manual finance work — and what it would look like if it weren't.
              </p>
              <button
                onClick={startQuiz}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-xl transition text-sm"
              >
                Start the Assessment →
              </button>
              <p className="text-zinc-600 text-xs mt-4">Takes about 60 seconds · No spam, ever</p>
            </div>
          )}

          {/* ── QUIZ ── */}
          {screen === "quiz" && (
            <div>
              {/* Progress */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500">Question {current + 1} of {questions.length}</span>
                <span className="text-xs text-emerald-400 font-semibold">{progress}%</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-white font-semibold text-base leading-snug mb-5">
                {questions[current].text}
              </p>

              <div className="flex flex-col gap-3 mb-6">
                {questions[current].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectOption(idx)}
                    className="w-full text-left rounded-xl px-4 py-3 text-sm transition-all duration-150"
                    style={{
                      background: selected === idx ? "rgba(16,185,129,0.15)" : "#18181b",
                      border: selected === idx
                        ? "1px solid #10b981"
                        : "1px solid #27272a",
                      color: selected === idx ? "#fff" : "#a1a1aa",
                    }}
                  >
                    <span
                      className="font-bold mr-2"
                      style={{ color: selected === idx ? "#10b981" : "#52525b" }}
                    >
                      {opt.label}
                    </span>
                    {opt.text}
                  </button>
                ))}
              </div>

              <button
                onClick={nextQuestion}
                disabled={selected === null}
                className="w-full py-3 rounded-xl font-semibold text-sm transition"
                style={{
                  background: selected !== null ? "#10b981" : "#27272a",
                  color: selected !== null ? "#000" : "#52525b",
                  cursor: selected !== null ? "pointer" : "not-allowed",
                }}
              >
                {current + 1 === questions.length ? "See My Results →" : "Next →"}
              </button>
            </div>
          )}

          {/* ── RESULT ── */}
          {screen === "result" && result && (
            <div className="text-center">
              <div className="text-4xl mb-3">{result.emoji}</div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
                style={{
                  background: result.bucket === "High Pain" ? "#431407" : result.bucket === "Room to Improve" ? "#422006" : "#052e16",
                  color: result.bucket === "High Pain" ? "#fb923c" : result.bucket === "Room to Improve" ? "#fbbf24" : "#4ade80",
                }}
              >
                {result.bucket} · Score {score}/20
              </span>
              <h2 className="text-xl font-bold text-white leading-snug mb-3">
                {result.headline}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5">{result.sub}</p>

              {result.offer && (
                <div className="rounded-xl p-4 mb-5 text-left"
                  style={{ background: "#1a0a00", border: "1px solid #fb923c44" }}>
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
                    🎁 Special Offer
                  </p>
                  <p className="text-sm text-zinc-300">
                    Because of where your firm stands, we're offering a{" "}
                    <strong className="text-white">3-month free subscription</strong> to Lekha AI — no credit card required.
                    Leave your details and we'll reach out personally.
                  </p>
                </div>
              )}

              <button
                onClick={() => setScreen("form")}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-xl transition text-sm mb-3"
              >
                Get My Full Report →
              </button>
              <button
                onClick={close}
                className="w-full text-zinc-600 hover:text-zinc-400 text-xs py-2 transition"
              >
                No thanks, close
              </button>
            </div>
          )}

          {/* ── CONTACT FORM ── */}
          {screen === "form" && (
            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                Almost there
              </h2>
              <p className="text-zinc-400 text-sm mb-5">
                Leave your details and we'll send you the full breakdown — plus reach out personally.
              </p>
              <form onSubmit={submitForm} className="flex flex-col gap-3">
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-500 transition"
                  style={{ background: "#18181b", border: "1px solid #27272a" }}
                />
                <input
                  required
                  type="email"
                  placeholder="Work email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-500 transition"
                  style={{ background: "#18181b", border: "1px solid #27272a" }}
                />
                <input
                  required
                  type="text"
                  placeholder="Firm name"
                  value={form.firm}
                  onChange={(e) => setForm({ ...form, firm: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-emerald-500 transition"
                  style={{ background: "#18181b", border: "1px solid #27272a" }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-xl transition text-sm mt-1"
                >
                  {submitting ? "Submitting…" : "Submit →"}
                </button>
              </form>
            </div>
          )}

          {/* ── DONE ── */}
          {screen === "done" && (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-white mb-3">You're all set!</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                We've received your details. Our team will reach out personally within 24 hours.
              </p>
              <button
                onClick={close}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-xl transition text-sm"
              >
                Back to the site
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
