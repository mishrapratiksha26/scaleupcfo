import { useState, useRef, useEffect } from "react";
import {
  isWorkEmail,
  COUNTRY_CODES,
  MAIN_QUESTION,
  BRANCHES,
  BRANCH_LABELS,
  getResult,
} from "../data/bmiQuizData";

const SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx17TFgwBM-Ze631x2WQJ8qUGox-k4IfNBcW7plKL3nn9Tkpv79_7_K3dNIK1UCpLQSXA/exec";

const TRACKED_PARAMS = ["ref", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

const HIGHLIGHT_MS = 150;
const SLIDE_MS = 380;
const FADE_MS = 220;
const REDUCED_MS = 150;
const PANEL_HEIGHT = 380;
const TOTAL_STEPS = 7; // main question + 5 branch questions + contact form

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function CircleProgress({ pct, color }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: 136, height: 136 }}>
      <svg width="136" height="136" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="68" cy="68" r={r} fill="none" stroke="#27272a" strokeWidth="10" />
        <circle
          cx="68" cy="68" r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-white">{pct}%</span>
        <span className="text-xs text-zinc-500 mt-0.5">score</span>
      </div>
    </div>
  );
}

export default function BmiQuiz({ mode, source, pdfHref, onClose, closing }) {
  const isInline = mode === "inline";
  const reducedMotion = usePrefersReducedMotion();
  const slideDuration = reducedMotion ? REDUCED_MS : SLIDE_MS;

  const [step, setStep] = useState(0);
  const [branch, setBranch] = useState(null);
  const [scores, setScores] = useState([]);
  const [picks, setPicks] = useState([]);
  const [result, setResult] = useState(null);

  const [countryCode, setCountryCode] = useState("+91");
  const [contact, setContact] = useState({ name: "", email: "", firm: "", phone: "" });
  const [contactErrors, setContactErrors] = useState({});

  const [pendingValue, setPendingValue] = useState(null); // highlight-before-advance
  const [transitionState, setTransitionState] = useState(null); // inline slide mechanic
  const [animating, setAnimating] = useState(false); // modal fade mechanic
  const [completed, setCompleted] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function schedule(fn, ms) {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }

  const busy = !!pendingValue || !!transitionState || animating;

  function advance(nextStep, direction = "forward", onSettle) {
    const isComplete = nextStep === null;

    function settle() {
      if (isComplete) {
        setCompleted(true);
        if (reducedMotion) {
          setCelebrate(true);
        } else {
          requestAnimationFrame(() => requestAnimationFrame(() => setCelebrate(true)));
        }
      } else {
        setStep(nextStep);
      }
      onSettle?.();
    }

    if (isInline) {
      setTransitionState({ fromStep: step, toStep: nextStep, isComplete, direction, enterPhase: "pre" });
      if (!reducedMotion) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setTransitionState((prev) => (prev ? { ...prev, enterPhase: "active" } : prev));
          });
        });
      } else {
        setTransitionState((prev) => (prev ? { ...prev, enterPhase: "active" } : prev));
      }
      schedule(() => {
        settle();
        setTransitionState(null);
      }, slideDuration);
    } else {
      setAnimating(true);
      schedule(() => {
        settle();
        setAnimating(false);
      }, FADE_MS);
    }
  }

  function selectMain(optionLabel) {
    if (busy || completed) return;
    setPendingValue(optionLabel);
    schedule(() => {
      setPendingValue(null);
      setBranch(optionLabel);
      setScores([]);
      setPicks([]);
      advance(1);
    }, HIGHLIGHT_MS);
  }

  function selectBranch(optIdx) {
    if (busy || completed) return;
    setPendingValue(optIdx);
    schedule(() => {
      setPendingValue(null);
      const points = optIdx + 1; // A=1 … D=4
      const q = BRANCHES[branch][step - 1];
      const newScores = [...scores, points];
      const newPicks = [...picks, { question: q.text, answer: q.options[optIdx].text }];
      setScores(newScores);
      setPicks(newPicks);
      if (step < 5) {
        advance(step + 1);
      } else {
        const total = newScores.reduce((a, b) => a + b, 0);
        setResult(getResult(total));
        advance(6);
      }
    }, HIGHLIGHT_MS);
  }

  function goBack() {
    if (busy || completed || step === 0) return;
    if (step === 1) {
      // Keep `branch` set until the transition settles — the outgoing panel
      // (still showing branch question 1) needs BRANCHES[branch] to render
      // while it slides out; clearing it early crashes that render.
      advance(0, "backward", () => setBranch(null));
      return;
    }
    setScores((s) => s.slice(0, -1));
    setPicks((p) => p.slice(0, -1));
    advance(step - 1, "backward");
  }

  async function submitQuiz(finalPicks) {
    setSubmitting(true);
    const payload = {
      ...contact,
      phone: countryCode + contact.phone,
      mainQuestion: MAIN_QUESTION.text,
      mainAnswer: MAIN_QUESTION.options.find((o) => o.label === branch)?.text || "",
      branch: BRANCH_LABELS[branch],
      score: result?.pct,
      bucket: result?.bucket,
      answers: finalPicks,
      source,
      pageUrl: window.location.href,
      timestamp: new Date().toISOString(),
    };

    if (source === "guide-page") {
      const params = new URLSearchParams(window.location.search);
      TRACKED_PARAMS.forEach((key) => {
        if (params.has(key)) payload[key] = params.get(key);
      });
    }

    try {
      await fetch(SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
      });
    } catch {
      /* fire-and-forget — no-cors response can't be read anyway */
    }
    setSubmitting(false);
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    if (busy || completed) return;
    const errs = {};
    if (!isWorkEmail(contact.email)) errs.email = "Please enter a valid work email address.";
    const digits = contact.phone.replace(/\D/g, "");
    if (digits.length !== 10) errs.phone = "Phone number must be exactly 10 digits.";
    if (Object.keys(errs).length) {
      setContactErrors(errs);
      return;
    }
    setContactErrors({});
    submitQuiz(picks);
    advance(null);
  }

  function panelStyle(role) {
    if (role === "static") return { transform: "translateX(0%)", opacity: 1 };

    const dir = transitionState?.direction === "backward" ? -1 : 1;
    if (role === "out") {
      return reducedMotion
        ? { opacity: 0, transition: `opacity ${slideDuration}ms ease`, pointerEvents: "none" }
        : {
            transform: `translateX(${-100 * dir}%)`,
            opacity: 0,
            transition: `transform ${slideDuration}ms ease-out, opacity ${slideDuration}ms ease-out`,
            pointerEvents: "none",
          };
    }
    const active = transitionState?.enterPhase === "active";
    if (reducedMotion) {
      return { opacity: active ? 1 : 0, transition: `opacity ${slideDuration}ms ease` };
    }
    return active
      ? { transform: "translateX(0%)", opacity: 1, transition: `transform ${slideDuration}ms ease-out, opacity ${slideDuration}ms ease-out` }
      : { transform: `translateX(${100 * dir}%)`, opacity: 0, transition: "none" };
  }

  function renderMain(interactive) {
    return (
      <div>
        <p className="text-white font-semibold text-base sm:text-lg leading-snug mb-5">
          {MAIN_QUESTION.text}
        </p>
        <div className="flex flex-col gap-3">
          {MAIN_QUESTION.options.map((opt) => {
            const isPending = interactive && pendingValue === opt.label;
            return (
              <button
                key={opt.label}
                type="button"
                disabled={!interactive || busy}
                onClick={() => selectMain(opt.label)}
                className="w-full text-left rounded-xl px-4 py-3 text-sm transition-all duration-150 hover:border-emerald-500 hover:text-white disabled:cursor-default"
                style={{
                  background: isPending ? "rgba(16,185,129,0.15)" : "#18181b",
                  border: isPending ? "1px solid #10b981" : "1px solid #27272a",
                  color: isPending ? "#fff" : "#a1a1aa",
                }}
              >
                <span className="font-bold mr-2" style={{ color: isPending ? "#10b981" : "#52525b" }}>
                  {opt.label}
                </span>
                {opt.text}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function renderBranchQ(stepIndex, interactive) {
    const q = BRANCHES[branch][stepIndex - 1];
    return (
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-500">Question {stepIndex} of 5</span>
        </div>
        <p className="text-white font-semibold text-base sm:text-lg leading-snug mb-5">{q.text}</p>
        <div className="flex flex-col gap-3">
          {q.options.map((opt, idx) => {
            const isPending = interactive && pendingValue === idx;
            return (
              <button
                key={idx}
                type="button"
                disabled={!interactive || busy}
                onClick={() => selectBranch(idx)}
                className="w-full text-left rounded-xl px-4 py-3 text-sm transition-all duration-150 hover:border-emerald-500 hover:text-white disabled:cursor-default"
                style={{
                  background: isPending ? "rgba(16,185,129,0.15)" : "#18181b",
                  border: isPending ? "1px solid #10b981" : "1px solid #27272a",
                  color: isPending ? "#fff" : "#a1a1aa",
                }}
              >
                <span className="font-bold mr-2" style={{ color: isPending ? "#10b981" : "#52525b" }}>
                  {opt.label}
                </span>
                {opt.text}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  function renderContact(interactive) {
    return (
      <div>
        <p className="text-white font-semibold text-base sm:text-lg leading-snug mb-5">
          Where should we send your results?
        </p>
        <form onSubmit={interactive ? handleContactSubmit : (e) => e.preventDefault()} className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-zinc-500 mb-1 block">Your Name</label>
            <input
              required
              type="text"
              disabled={!interactive || busy}
              placeholder="e.g. Priya Sharma"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition"
              style={{ background: "#18181b", border: "1px solid #27272a" }}
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 mb-1 block">Name of Your Firm</label>
            <input
              required
              type="text"
              disabled={!interactive || busy}
              placeholder="e.g. Sharma & Associates"
              value={contact.firm}
              onChange={(e) => setContact({ ...contact, firm: e.target.value })}
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition"
              style={{ background: "#18181b", border: "1px solid #27272a" }}
            />
          </div>

          <div>
            <label className="text-xs text-zinc-500 mb-1 block">Work Email</label>
            <input
              required
              type="email"
              disabled={!interactive || busy}
              placeholder="e.g. priya@yourfirm.com"
              value={contact.email}
              onChange={(e) => {
                setContact({ ...contact, email: e.target.value });
                if (contactErrors.email) setContactErrors({ ...contactErrors, email: null });
              }}
              className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition"
              style={{ background: "#18181b", border: contactErrors.email ? "1px solid #f87171" : "1px solid #27272a" }}
            />
            {contactErrors.email && <p className="text-red-400 text-xs mt-1">{contactErrors.email}</p>}
          </div>

          <div>
            <label className="text-xs text-zinc-500 mb-1 block">Phone Number</label>
            <div className="flex gap-2">
              <select
                disabled={!interactive || busy}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="rounded-xl px-2 py-3 text-sm text-white outline-none transition flex-shrink-0"
                style={{ background: "#18181b", border: "1px solid #27272a", width: "110px" }}
              >
                {COUNTRY_CODES.map((cc) => (
                  <option key={cc.c + cc.n} value={cc.c}>
                    {cc.f} {cc.c}
                  </option>
                ))}
              </select>
              <input
                required
                type="tel"
                disabled={!interactive || busy}
                placeholder="10-digit number"
                value={contact.phone}
                maxLength={10}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setContact({ ...contact, phone: digits });
                  if (contactErrors.phone) setContactErrors({ ...contactErrors, phone: null });
                }}
                className="flex-1 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition"
                style={{ background: "#18181b", border: contactErrors.phone ? "1px solid #f87171" : "1px solid #27272a" }}
              />
            </div>
            {contactErrors.phone && <p className="text-red-400 text-xs mt-1">{contactErrors.phone}</p>}
          </div>

          <button
            type="submit"
            disabled={!interactive || busy || submitting}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-xl transition text-sm mt-1"
          >
            {submitting ? "Processing…" : "Show My Results →"}
          </button>
        </form>
      </div>
    );
  }

  function renderStep(stepIndex, interactive) {
    if (stepIndex === 0) return renderMain(interactive);
    if (stepIndex >= 1 && stepIndex <= 5) return renderBranchQ(stepIndex, interactive);
    return renderContact(interactive);
  }

  function renderResult({ animateIn }) {
    return (
      <div className="text-center">
        {result && (
          <>
            <div className="flex justify-center mb-4">
              <CircleProgress pct={result.pct} color={result.color} />
            </div>
            <span
              className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ background: result.bgColor, color: result.color }}
            >
              {result.emoji} {result.bucket}
            </span>
            <h3 className="text-base font-semibold text-white leading-snug mb-2">{result.headline}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-5">{result.sub}</p>
          </>
        )}

        <h3 className="text-lg font-bold text-white mb-2">Done — here's your guide.</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-md mx-auto">
          Your answers show where to look first — the guide shows you what to do about it.
        </p>

        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-7 py-3 rounded-xl transition text-sm mb-2"
          style={
            reducedMotion
              ? undefined
              : {
                  transform: animateIn ? "scale(1)" : "scale(0.85)",
                  opacity: animateIn ? 1 : 0,
                  transition: "transform 320ms ease-out, opacity 320ms ease-out",
                }
          }
        >
          Download the AI Readiness Guide (PDF) →
        </a>

        {result?.offer && (
          <div
            className="rounded-xl p-4 mt-5 text-left"
            style={{ background: "#1a0a00", border: "1px solid rgba(251,146,60,0.27)" }}
          >
            <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">🎁 Special Offer</p>
            <p className="text-sm text-zinc-300">
              Because of where your firm stands, we're offering a{" "}
              <strong className="text-white">3-month free subscription</strong> to Lekha AI — no
              credit card required. Leave your details and we'll reach out personally.
            </p>
          </div>
        )}

        {mode === "modal" && (
          <button onClick={onClose} className="w-full text-zinc-600 hover:text-zinc-400 text-xs py-2 mt-4 transition">
            Close
          </button>
        )}
      </div>
    );
  }

  function renderHeader() {
    return (
      <div className={mode === "modal" ? "text-center mb-5" : "text-center mb-6"}>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Understand where you stand.</h2>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
          Answer a few quick questions and get our free AI Readiness Guide — see where your firm's
          hours really go, and how to scale your practice without disrupting it.
        </p>
        {step === 0 && !completed && (
          <p className="text-zinc-600 text-xs mt-3">Takes under a minute · Instant download at the end</p>
        )}
      </div>
    );
  }

  const progressIndex = transitionState
    ? transitionState.isComplete
      ? TOTAL_STEPS
      : transitionState.toStep + 1
    : step + 1;

  const questionArea = completed && !transitionState ? (
    renderResult({ animateIn: celebrate })
  ) : (
    <>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-zinc-500">
          Step {Math.min(progressIndex, TOTAL_STEPS)} of {TOTAL_STEPS}
        </span>
        <span className="text-xs text-emerald-400 font-semibold">
          {Math.round((progressIndex / TOTAL_STEPS) * 100)}%
        </span>
      </div>
      <div className="w-full h-1 bg-zinc-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full"
          style={{ width: `${(progressIndex / TOTAL_STEPS) * 100}%`, transition: "width 400ms ease" }}
        />
      </div>

      {isInline ? (
        <div className="relative overflow-hidden" style={{ height: PANEL_HEIGHT }}>
          {transitionState ? (
            <>
              <div className="absolute inset-0 overflow-y-auto" style={panelStyle("out")}>
                {transitionState.fromStep !== null ? renderStep(transitionState.fromStep, false) : null}
              </div>
              <div className="absolute inset-0 overflow-y-auto" style={panelStyle("in")}>
                {transitionState.isComplete ? renderResult({ animateIn: false }) : renderStep(transitionState.toStep, false)}
              </div>
            </>
          ) : (
            <div className="absolute inset-0 overflow-y-auto" style={panelStyle("static")}>
              {renderStep(step, true)}
            </div>
          )}
        </div>
      ) : (
        <div style={{ opacity: animating ? 0 : 1, transition: `opacity ${FADE_MS}ms` }}>
          {renderStep(step, true)}
        </div>
      )}
    </>
  );

  const canGoBack = !completed && step > 0;

  if (mode === "modal") {
    return (
      <div
        className="fixed inset-0 z-[2000] flex items-center justify-center px-4"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      >
        <div
          className="relative w-full max-w-lg rounded-2xl overflow-hidden"
          style={{
            background: "#0f0f0f",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            maxHeight: "92vh",
            overflowY: "auto",
            opacity: closing ? 0 : 1,
            transform: closing ? "scale(0.96)" : "scale(1)",
            transition: "opacity 0.3s, transform 0.3s",
          }}
        >
          <div style={{ height: "3px", background: "linear-gradient(90deg,#10b981,#34d399)", flexShrink: 0 }} />

          <div className="flex items-center justify-between px-7 pt-5 pb-0">
            {canGoBack ? (
              <button onClick={goBack} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-emerald-400 transition">
                ← Back
              </button>
            ) : <span />}
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition text-lg leading-none ml-auto" aria-label="Close">
              ✕
            </button>
          </div>

          <div className="px-7 pb-7 pt-4">
            {renderHeader()}
            {questionArea}
          </div>
        </div>
      </div>
    );
  }

  // inline mode
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8 md:gap-10 md:items-center">
      <div>{renderHeader()}</div>
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 sm:p-10">
        {canGoBack && (
          <button onClick={goBack} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-emerald-400 transition mb-3">
            ← Back
          </button>
        )}
        {questionArea}
      </div>
    </div>
  );
}
