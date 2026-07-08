import { useState, useRef, useEffect, useLayoutEffect } from "react";
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
const TOTAL_STEPS = 7; // main question + 5 branch questions + contact form
const CONTACT_STEP = 6;
const CONFETTI_COLORS = ["#10b981", "#34d399", "#fbbf24", "#f97316", "#60a5fa"];

// Lightweight input-modality tracker so option buttons can show a real
// focus-visible ring for keyboard users without one for mouse clicks.
let lastInputWasKeyboard = false;
if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Tab") lastInputWasKeyboard = true;
  });
  window.addEventListener("mousedown", () => {
    lastInputWasKeyboard = false;
  });
}

function QuizOptionButton({ selected, disabled, onClick, className, children }) {
  const [hovered, setHovered] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const active = (hovered || focusVisible) && !disabled;

  const background = selected ? "rgba(16,185,129,0.18)" : active ? "rgba(16,185,129,0.08)" : "#18181b";
  const borderColor = selected || active ? "#10b981" : "#27272a";
  const color = selected || active ? "#ffffff" : "#a1a1aa";
  const transform = selected ? "scale(0.98)" : active ? "translateY(-2px) scale(1.03)" : "translateY(0) scale(1)";
  const boxShadow = active && !selected ? "0 10px 24px rgba(16,185,129,0.18)" : "none";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => {
        if (lastInputWasKeyboard) setFocusVisible(true);
      }}
      onBlur={() => setFocusVisible(false)}
      className={className}
      style={{
        background,
        border: `1px solid ${borderColor}`,
        color,
        transform,
        boxShadow,
        outline: focusVisible ? "2px solid rgba(16,185,129,0.55)" : "none",
        outlineOffset: focusVisible ? 2 : 0,
        transition:
          "background-color 150ms ease, border-color 150ms ease, color 150ms ease, transform 150ms ease, box-shadow 150ms ease",
      }}
    >
      {children}
    </button>
  );
}

function ConfettiBurst() {
  const particles = useRef(
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      left: Math.random() * 100,
      delay: Math.random() * 150,
      duration: 900 + Math.random() * 500,
      drift: Math.round((Math.random() - 0.5) * 80),
      rotate: Math.round(Math.random() * 360),
      size: 6 + Math.random() * 5,
    }))
  ).current;

  return (
    <div className="confetti-burst" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            background: p.color,
            width: p.size,
            height: p.size * 0.4,
            animationDelay: `${p.delay}ms`,
            animationDuration: `${p.duration}ms`,
            "--confetti-drift": `${p.drift}px`,
            "--confetti-rotate": `${p.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}

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

  const [panelHeight, setPanelHeight] = useState(null);
  const inPanelRef = useRef(null);
  const staticPanelRef = useRef(null);

  const [showConfetti, setShowConfetti] = useState(false);
  const hasCelebratedContactRef = useRef(false);

  const [submitError, setSubmitError] = useState(null);
  // Synchronous guards (refs, not state) so a rapid double-click/double-submit
  // can never sneak past React's render-batching delay the way a purely
  // state-driven `disabled` check could.
  const busyRef = useRef(false);
  const submittingRef = useRef(false);

  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function schedule(fn, ms) {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }

  const busy = !!pendingValue || !!transitionState || animating;

  // Keep the panel's box height in sync with whichever step is currently
  // shown (or being transitioned to), so the card hugs its content instead
  // of reserving space for the tallest possible step.
  function measurePanel(ref) {
    if (ref.current) {
      const h = ref.current.offsetHeight;
      if (h) setPanelHeight(h);
    }
  }
  useLayoutEffect(() => {
    if (transitionState) measurePanel(inPanelRef);
    else measurePanel(staticPanelRef);
  }, [transitionState, step, completed]);
  useEffect(() => {
    function onResize() {
      if (transitionState) measurePanel(inPanelRef);
      else measurePanel(staticPanelRef);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [transitionState, step, completed]);

  // Celebrate arriving at the contact step exactly once per visit (not on
  // every re-render, and not again if the user goes back and forth).
  useEffect(() => {
    const isShowingContact = !transitionState && !completed && step === CONTACT_STEP;
    if (isShowingContact && !hasCelebratedContactRef.current) {
      hasCelebratedContactRef.current = true;
      if (!reducedMotion) {
        setShowConfetti(true);
        const t = setTimeout(() => setShowConfetti(false), 1800);
        return () => clearTimeout(t);
      }
    }
  }, [step, completed, transitionState, reducedMotion]);

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
        busyRef.current = false;
      }, slideDuration);
    } else {
      setAnimating(true);
      schedule(() => {
        settle();
        setAnimating(false);
        busyRef.current = false;
      }, FADE_MS);
    }
  }

  function selectMain(optionLabel) {
    if (busyRef.current || busy || completed) return;
    busyRef.current = true;
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
    if (busyRef.current || busy || completed) return;
    busyRef.current = true;
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
    if (busyRef.current || busy || completed || step === 0) return;
    busyRef.current = true;
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

  // Returns true once the request has actually gone out, false if the
  // network failed or the request timed out (treated as an error either
  // way — mode:"no-cors" means we can never read the real HTTP status).
  async function submitQuiz(finalPicks) {
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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    try {
      await fetch(SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      return true;
    } catch {
      return false;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async function handleContactSubmit(e) {
    e.preventDefault();
    if (busy || completed || submittingRef.current) return;
    const errs = {};
    if (!isWorkEmail(contact.email)) errs.email = "Please enter a valid work email address.";
    const digits = contact.phone.replace(/\D/g, "");
    if (digits.length !== 10) errs.phone = "Phone number must be exactly 10 digits.";
    if (Object.keys(errs).length) {
      setContactErrors(errs);
      return;
    }
    setContactErrors({});
    setSubmitError(null);
    submittingRef.current = true;
    setSubmitting(true);
    const ok = await submitQuiz(picks);
    submittingRef.current = false;
    setSubmitting(false);
    if (ok) {
      advance(null);
    } else {
      setSubmitError("Something went wrong. Please try again.");
    }
  }

  function panelStyle(role) {
    if (role === "static") return { transform: "translateX(0%)", opacity: 1 };

    const dir = transitionState?.direction === "backward" ? -1 : 1;

    if (role === "out") {
      const isContactPanel = transitionState?.fromStep === CONTACT_STEP;
      if (isContactPanel) {
        return reducedMotion
          ? { opacity: 0, transition: `opacity ${slideDuration}ms ease`, pointerEvents: "none" }
          : {
              transform: "scale(0.97)",
              opacity: 0,
              transition: `transform ${slideDuration}ms ease-out, opacity ${slideDuration}ms ease-out`,
              pointerEvents: "none",
            };
      }
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
    const isContactPanel = !transitionState?.isComplete && transitionState?.toStep === CONTACT_STEP;

    if (reducedMotion) {
      return { opacity: active ? 1 : 0, transition: `opacity ${slideDuration}ms ease` };
    }
    if (isContactPanel) {
      return active
        ? { transform: "scale(1)", opacity: 1, transition: `transform ${slideDuration}ms ease-out, opacity ${slideDuration}ms ease-out` }
        : { transform: "scale(0.97)", opacity: 0, transition: "none" };
    }
    return active
      ? { transform: "translateX(0%)", opacity: 1, transition: `transform ${slideDuration}ms ease-out, opacity ${slideDuration}ms ease-out` }
      : { transform: `translateX(${100 * dir}%)`, opacity: 0, transition: "none" };
  }

  function renderMain(interactive) {
    return (
      <div>
        <p className="text-white font-bold text-lg sm:text-xl leading-snug mb-3">
          {MAIN_QUESTION.text}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {MAIN_QUESTION.options.map((opt) => {
            const isPending = interactive && pendingValue === opt.label;
            return (
              <QuizOptionButton
                key={opt.label}
                selected={isPending}
                disabled={!interactive || busy}
                onClick={() => selectMain(opt.label)}
                className="flex items-center justify-center text-center rounded-xl px-3 py-3 sm:py-3.5 text-sm sm:text-base leading-snug disabled:cursor-default"
              >
                {opt.text}
              </QuizOptionButton>
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
              <QuizOptionButton
                key={idx}
                selected={isPending}
                disabled={!interactive || busy}
                onClick={() => selectBranch(idx)}
                className="w-full text-left rounded-xl px-4 py-3 text-sm disabled:cursor-default"
              >
                <span className="font-bold mr-2" style={{ color: isPending ? "#10b981" : "#52525b" }}>
                  {opt.label}
                </span>
                {opt.text}
              </QuizOptionButton>
            );
          })}
        </div>
      </div>
    );
  }

  function renderContact(interactive) {
    return (
      <div>
        <div className="relative mb-1">
          <p className="font-bold text-lg sm:text-xl leading-snug" style={{ color: "#3f3a34" }}>
            Great, you clearly know your firm's pain points. {reducedMotion && <span aria-hidden="true">🎉</span>}
          </p>
          {showConfetti && !reducedMotion && <ConfettiBurst />}
        </div>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "#7a6f62" }}>
          Just a few details and your free AI Readiness Guide is ready to download.
        </p>
        <form onSubmit={interactive ? handleContactSubmit : (e) => e.preventDefault()} className="flex flex-col gap-3">
          <div>
            <label className="text-xs mb-1 block" style={{ color: "#7a6f62" }}>Your Name</label>
            <input
              required
              type="text"
              disabled={!interactive || busy || submitting}
              placeholder="e.g. Priya Sharma"
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
              className="quiz-input-light w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              style={{ background: "#ffffff", border: "1px solid #c9b49b", color: "#3f3a34" }}
            />
          </div>

          <div>
            <label className="text-xs mb-1 block" style={{ color: "#7a6f62" }}>Name of Your Firm</label>
            <input
              required
              type="text"
              disabled={!interactive || busy || submitting}
              placeholder="e.g. Sharma & Associates"
              value={contact.firm}
              onChange={(e) => setContact({ ...contact, firm: e.target.value })}
              className="quiz-input-light w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              style={{ background: "#ffffff", border: "1px solid #c9b49b", color: "#3f3a34" }}
            />
          </div>

          <div>
            <label className="text-xs mb-1 block" style={{ color: "#7a6f62" }}>Work Email</label>
            <input
              required
              type="email"
              disabled={!interactive || busy || submitting}
              placeholder="e.g. priya@yourfirm.com"
              value={contact.email}
              onChange={(e) => {
                setContact({ ...contact, email: e.target.value });
                if (contactErrors.email) setContactErrors({ ...contactErrors, email: null });
              }}
              className="quiz-input-light w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              style={{ background: "#ffffff", border: contactErrors.email ? "1px solid #dc2626" : "1px solid #c9b49b", color: "#3f3a34" }}
            />
            {contactErrors.email && <p className="text-xs mt-1" style={{ color: "#dc2626" }}>{contactErrors.email}</p>}
          </div>

          <div>
            <label className="text-xs mb-1 block" style={{ color: "#7a6f62" }}>Phone Number</label>
            <div className="flex gap-2">
              <select
                disabled={!interactive || busy || submitting}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="quiz-input-light rounded-xl px-2 py-3 text-sm outline-none transition flex-shrink-0"
                style={{ background: "#ffffff", border: "1px solid #c9b49b", color: "#3f3a34", width: "110px" }}
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
                disabled={!interactive || busy || submitting}
                placeholder="10-digit number"
                value={contact.phone}
                maxLength={10}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setContact({ ...contact, phone: digits });
                  if (contactErrors.phone) setContactErrors({ ...contactErrors, phone: null });
                }}
                className="quiz-input-light flex-1 rounded-xl px-4 py-3 text-sm outline-none transition"
                style={{ background: "#ffffff", border: contactErrors.phone ? "1px solid #dc2626" : "1px solid #c9b49b", color: "#3f3a34" }}
              />
            </div>
            {contactErrors.phone && <p className="text-xs mt-1" style={{ color: "#dc2626" }}>{contactErrors.phone}</p>}
          </div>

          <button
            type="submit"
            disabled={!interactive || busy || submitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-black font-semibold py-3 rounded-xl transition text-sm mt-1 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <span
                  className="inline-block w-4 h-4 rounded-full border-2 animate-spin"
                  style={{ borderColor: "rgba(0,0,0,0.25)", borderTopColor: "#000000" }}
                  aria-hidden="true"
                />
                Getting your guide...
              </>
            ) : (
              "Get My Free Guide →"
            )}
          </button>
          {submitError && (
            <p className="text-xs text-center" style={{ color: "#c2410c" }} role="alert">
              {submitError}
            </p>
          )}
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

        <h3 className="text-lg font-bold text-white mb-2">Done. Here's your guide.</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-md mx-auto">
          Your answers show where to look first, and the guide shows you what to do about it.
        </p>

        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-emerald-500 hover:bg-emerald-400 text-black font-bold px-10 py-5 rounded-xl transition text-lg sm:text-xl shadow-lg shadow-emerald-500/30 mb-4"
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

        <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mx-auto mb-2">
          Don't worry, you don't have to figure this out alone. The guide walks you through your
          first steps, and we're here if you want to talk it through.
        </p>

        {result?.offer && (
          <div
            className="rounded-xl p-4 mt-5 text-left"
            style={{ background: "#1a0a00", border: "1px solid rgba(251,146,60,0.27)" }}
          >
            <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">🎁 Special Offer</p>
            <p className="text-sm text-zinc-300">
              Because of where your firm stands, we're offering a{" "}
              <strong className="text-white">3-month free subscription</strong> to Lekha AI, no
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
          Answer a few quick questions and get our free AI Readiness Guide. See where your firm's
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

  const themeStep = transitionState
    ? (transitionState.isComplete ? -1 : transitionState.toStep)
    : (completed ? -1 : step);
  const isContactStep = themeStep === CONTACT_STEP;
  const theme = isContactStep
    ? { cardBg: "#f1e6d9", cardBorder: "#d9c7ae", label: "#7a6f62", track: "#e4d5c1" }
    : { cardBg: "#18181b", cardBorder: "#27272a", label: "#71717a", track: "#27272a" };

  const questionArea = completed && !transitionState ? (
    renderResult({ animateIn: celebrate })
  ) : (
    <>
      {progressIndex > 1 && (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: theme.label }}>
              Step {Math.min(progressIndex, TOTAL_STEPS)} of {TOTAL_STEPS}
            </span>
            <span className="text-xs text-emerald-400 font-semibold">
              {Math.round((progressIndex / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="w-full h-1 rounded-full mb-6 overflow-hidden" style={{ background: theme.track }}>
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${(progressIndex / TOTAL_STEPS) * 100}%`, transition: "width 400ms ease" }}
            />
          </div>
        </>
      )}

      {isInline ? (
        <div
          className="relative overflow-hidden"
          style={{
            height: panelHeight != null ? panelHeight : "auto",
            transition: panelHeight != null ? `height ${slideDuration}ms ease` : "none",
          }}
        >
          {transitionState ? (
            <>
              <div className="absolute top-0 left-0 right-0" style={panelStyle("out")}>
                {transitionState.fromStep !== null ? renderStep(transitionState.fromStep, false) : null}
              </div>
              <div ref={inPanelRef} className="absolute top-0 left-0 right-0" style={panelStyle("in")}>
                {transitionState.isComplete ? renderResult({ animateIn: false }) : renderStep(transitionState.toStep, false)}
              </div>
            </>
          ) : (
            <div ref={staticPanelRef} className="absolute top-0 left-0 right-0" style={panelStyle("static")}>
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
      <div
        className="rounded-2xl border p-6 sm:p-10 transition-colors duration-300"
        style={{ background: theme.cardBg, borderColor: theme.cardBorder }}
      >
        {canGoBack && (
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-xs hover:text-emerald-400 transition mb-3"
            style={{ color: theme.label }}
          >
            ← Back
          </button>
        )}
        {questionArea}
      </div>
    </div>
  );
}
