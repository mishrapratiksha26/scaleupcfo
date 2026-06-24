import { useState, useEffect } from "react";

const QUIZ_SEEN_KEY = "bmi_quiz_seen";

/* ── PERSONAL EMAIL DOMAINS TO BLOCK ── */
const PERSONAL_DOMAINS = [
  "gmail.com","yahoo.com","yahoo.co.in","yahoo.in","yahoo.co.uk","hotmail.com",
  "hotmail.co.in","hotmail.co.uk","outlook.com","outlook.in","live.com",
  "rediffmail.com","icloud.com","me.com","aol.com","protonmail.com","zoho.com",
  "ymail.com","inbox.com","mail.com","gmx.com","gmx.net","msn.com",
  "rocketmail.com","fastmail.com","tutanota.com","hushmail.com",
];

function isWorkEmail(email) {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !PERSONAL_DOMAINS.includes(domain);
}

/* ── COUNTRY CODES (comprehensive) ── */
const COUNTRY_CODES = [
  {c:"+91",f:"🇮🇳",n:"India"},{c:"+1",f:"🇺🇸",n:"USA/Canada"},{c:"+44",f:"🇬🇧",n:"UK"},
  {c:"+61",f:"🇦🇺",n:"Australia"},{c:"+971",f:"🇦🇪",n:"UAE"},{c:"+65",f:"🇸🇬",n:"Singapore"},
  {c:"+94",f:"🇱🇰",n:"Sri Lanka"},{c:"+977",f:"🇳🇵",n:"Nepal"},{c:"+880",f:"🇧🇩",n:"Bangladesh"},
  {c:"+92",f:"🇵🇰",n:"Pakistan"},{c:"+60",f:"🇲🇾",n:"Malaysia"},{c:"+63",f:"🇵🇭",n:"Philippines"},
  {c:"+66",f:"🇹🇭",n:"Thailand"},{c:"+62",f:"🇮🇩",n:"Indonesia"},{c:"+84",f:"🇻🇳",n:"Vietnam"},
  {c:"+82",f:"🇰🇷",n:"South Korea"},{c:"+81",f:"🇯🇵",n:"Japan"},{c:"+86",f:"🇨🇳",n:"China"},
  {c:"+852",f:"🇭🇰",n:"Hong Kong"},{c:"+886",f:"🇹🇼",n:"Taiwan"},{c:"+95",f:"🇲🇲",n:"Myanmar"},
  {c:"+855",f:"🇰🇭",n:"Cambodia"},{c:"+856",f:"🇱🇦",n:"Laos"},{c:"+673",f:"🇧🇳",n:"Brunei"},
  {c:"+960",f:"🇲🇻",n:"Maldives"},{c:"+975",f:"🇧🇹",n:"Bhutan"},{c:"+93",f:"🇦🇫",n:"Afghanistan"},
  {c:"+98",f:"🇮🇷",n:"Iran"},{c:"+964",f:"🇮🇶",n:"Iraq"},{c:"+966",f:"🇸🇦",n:"Saudi Arabia"},
  {c:"+968",f:"🇴🇲",n:"Oman"},{c:"+974",f:"🇶🇦",n:"Qatar"},{c:"+965",f:"🇰🇼",n:"Kuwait"},
  {c:"+973",f:"🇧🇭",n:"Bahrain"},{c:"+972",f:"🇮🇱",n:"Israel"},{c:"+962",f:"🇯🇴",n:"Jordan"},
  {c:"+961",f:"🇱🇧",n:"Lebanon"},{c:"+963",f:"🇸🇾",n:"Syria"},{c:"+90",f:"🇹🇷",n:"Turkey"},
  {c:"+7",f:"🇷🇺",n:"Russia"},{c:"+380",f:"🇺🇦",n:"Ukraine"},{c:"+48",f:"🇵🇱",n:"Poland"},
  {c:"+49",f:"🇩🇪",n:"Germany"},{c:"+33",f:"🇫🇷",n:"France"},{c:"+39",f:"🇮🇹",n:"Italy"},
  {c:"+34",f:"🇪🇸",n:"Spain"},{c:"+31",f:"🇳🇱",n:"Netherlands"},{c:"+32",f:"🇧🇪",n:"Belgium"},
  {c:"+41",f:"🇨🇭",n:"Switzerland"},{c:"+43",f:"🇦🇹",n:"Austria"},{c:"+46",f:"🇸🇪",n:"Sweden"},
  {c:"+47",f:"🇳🇴",n:"Norway"},{c:"+45",f:"🇩🇰",n:"Denmark"},{c:"+358",f:"🇫🇮",n:"Finland"},
  {c:"+353",f:"🇮🇪",n:"Ireland"},{c:"+351",f:"🇵🇹",n:"Portugal"},{c:"+30",f:"🇬🇷",n:"Greece"},
  {c:"+36",f:"🇭🇺",n:"Hungary"},{c:"+420",f:"🇨🇿",n:"Czech Republic"},{c:"+40",f:"🇷🇴",n:"Romania"},
  {c:"+27",f:"🇿🇦",n:"South Africa"},{c:"+234",f:"🇳🇬",n:"Nigeria"},{c:"+254",f:"🇰🇪",n:"Kenya"},
  {c:"+233",f:"🇬🇭",n:"Ghana"},{c:"+256",f:"🇺🇬",n:"Uganda"},{c:"+255",f:"🇹🇿",n:"Tanzania"},
  {c:"+251",f:"🇪🇹",n:"Ethiopia"},{c:"+212",f:"🇲🇦",n:"Morocco"},{c:"+213",f:"🇩🇿",n:"Algeria"},
  {c:"+20",f:"🇪🇬",n:"Egypt"},{c:"+216",f:"🇹🇳",n:"Tunisia"},{c:"+225",f:"🇨🇮",n:"Ivory Coast"},
  {c:"+55",f:"🇧🇷",n:"Brazil"},{c:"+52",f:"🇲🇽",n:"Mexico"},{c:"+54",f:"🇦🇷",n:"Argentina"},
  {c:"+56",f:"🇨🇱",n:"Chile"},{c:"+57",f:"🇨🇴",n:"Colombia"},{c:"+51",f:"🇵🇪",n:"Peru"},
  {c:"+58",f:"🇻🇪",n:"Venezuela"},{c:"+593",f:"🇪🇨",n:"Ecuador"},{c:"+64",f:"🇳🇿",n:"New Zealand"},
];

/* ── MAIN QUESTION ── */
const MAIN_QUESTION = {
  text: "What is your biggest challenge in your finance operations right now?",
  options: [
    { label: "A", text: "Manual data entry & Tally posting" },
    { label: "B", text: "Reconciliation errors & compliance (TDS/GST)" },
    { label: "C", text: "Reporting & real-time visibility" },
    { label: "D", text: "Team efficiency & workflow management" },
  ],
};

/* ── BRANCH QUESTIONS ── */
const BRANCHES = {
  A: [
    {
      text: "How does your team currently handle data entry into Tally?",
      options: [
        { label: "A", text: "Manually, entry by entry every day" },
        { label: "B", text: "We batch it weekly/monthly" },
        { label: "C", text: "We have some automation but it's inconsistent" },
        { label: "D", text: "It's fully automated and accurate" },
      ],
    },
    {
      text: "How do you currently maintain your books?",
      options: [
        { label: "A", text: "Excel sheets" },
        { label: "B", text: "Outsourced to an accountant" },
        { label: "C", text: "In-house finance team handling it manually" },
        { label: "D", text: "Automated accounting software" },
      ],
    },
    {
      text: "When a bank transaction occurs, how soon does it reflect in your accounting records?",
      options: [
        { label: "A", text: "Several days later after manual entry" },
        { label: "B", text: "During periodic bookkeeping updates" },
        { label: "C", text: "Within a day through imports" },
        { label: "D", text: "Automatically and almost instantly" },
      ],
    },
    {
      text: "How scalable is your current accounting process if transaction volume doubles?",
      options: [
        { label: "A", text: "We'd need to hire more people immediately" },
        { label: "B", text: "It would create significant operational strain" },
        { label: "C", text: "We could manage with some adjustments" },
        { label: "D", text: "The system can handle it with little additional effort" },
      ],
    },
    {
      text: "If your finance manager is unavailable tomorrow, how easily can someone else continue the work?",
      options: [
        { label: "A", text: "Very difficult — knowledge is mostly in one person's head" },
        { label: "B", text: "Possible, but with delays and confusion" },
        { label: "C", text: "Manageable because processes are documented" },
        { label: "D", text: "Easy — workflows and data are standardised and automated" },
      ],
    },
  ],
  B: [
    {
      text: "How often do you find mismatches or errors in your books that are hard to trace?",
      options: [
        { label: "A", text: "Very often — it's a regular headache" },
        { label: "B", text: "Sometimes — maybe once or twice a month" },
        { label: "C", text: "Rarely — we catch them quickly" },
        { label: "D", text: "Almost never — our records are clean" },
      ],
    },
    {
      text: "How often do you reconcile your bank transactions?",
      options: [
        { label: "A", text: "Rarely — only when there's an issue" },
        { label: "B", text: "Monthly during closing" },
        { label: "C", text: "Weekly with manual effort" },
        { label: "D", text: "Automatically — it's always up to date" },
      ],
    },
    {
      text: "How often do you miss deadlines for GST, TDS, or other compliance filings?",
      options: [
        { label: "A", text: "Frequently — deadlines are stressful" },
        { label: "B", text: "Occasionally due to missing information" },
        { label: "C", text: "Rarely — we usually stay on track" },
        { label: "D", text: "Never — reminders and processes are automated" },
      ],
    },
    {
      text: "How easy is it to track the source of a transaction when someone asks for details?",
      options: [
        { label: "A", text: "Very difficult — we search through emails and files" },
        { label: "B", text: "Possible, but takes significant effort" },
        { label: "C", text: "Usually manageable within a few minutes" },
        { label: "D", text: "Instant — all supporting documents are linked" },
      ],
    },
    {
      text: "How confident are you that no transactions are missed in your books?",
      options: [
        { label: "A", text: "Not very confident" },
        { label: "B", text: "Somewhat confident, but we double-check often" },
        { label: "C", text: "Mostly confident" },
        { label: "D", text: "Completely confident due to automated capture and reconciliation" },
      ],
    },
  ],
  C: [
    {
      text: "If an investor asks for financial reports today, how quickly can you provide them?",
      options: [
        { label: "A", text: "More than a week" },
        { label: "B", text: "2–7 days" },
        { label: "C", text: "Within 24 hours" },
        { label: "D", text: "Immediately" },
      ],
    },
    {
      text: "How quickly can you see your current cash position?",
      options: [
        { label: "A", text: "I don't know / can't easily check" },
        { label: "B", text: "End of month — after closing" },
        { label: "C", text: "Weekly, after some manual work" },
        { label: "D", text: "Real-time — I can check anytime" },
      ],
    },
    {
      text: "How much visibility do you have into pending receivables?",
      options: [
        { label: "A", text: "Very little — we usually find out when cash is delayed" },
        { label: "B", text: "We track it manually in Excel" },
        { label: "C", text: "We review reports periodically" },
        { label: "D", text: "We have real-time visibility and alerts" },
      ],
    },
    {
      text: "How often does management request ad hoc reports that require manual work?",
      options: [
        { label: "A", text: "Almost every week" },
        { label: "B", text: "A few times each month" },
        { label: "C", text: "Occasionally" },
        { label: "D", text: "Rarely — most information is already available on dashboards" },
      ],
    },
    {
      text: "How do you currently track profitability by client, project, or business unit?",
      options: [
        { label: "A", text: "We don't track it consistently" },
        { label: "B", text: "We calculate it manually when needed" },
        { label: "C", text: "We have reports but they require effort to generate" },
        { label: "D", text: "It's available on demand through dashboards" },
      ],
    },
  ],
  D: [
    {
      text: "How much of your team's time goes into repetitive, manual tasks (data entry, reconciliation, copy-pasting)?",
      options: [
        { label: "A", text: "More than 50% of the day" },
        { label: "B", text: "Around 30–50%" },
        { label: "C", text: "Around 10–30%" },
        { label: "D", text: "Less than 10%" },
      ],
    },
    {
      text: "How are invoices and expense documents handled?",
      options: [
        { label: "A", text: "Shared over Email & WhatsApp informally" },
        { label: "B", text: "Manual entry into the system" },
        { label: "C", text: "Uploaded into accounting software" },
        { label: "D", text: "Automated workflows — no manual handling needed" },
      ],
    },
    {
      text: "How do you handle approval workflows for expenses and payments?",
      options: [
        { label: "A", text: "Informally through calls, emails, or WhatsApp" },
        { label: "B", text: "Manual approval sheets and emails" },
        { label: "C", text: "Partially digitised workflow" },
        { label: "D", text: "Fully automated approval process with audit trails" },
      ],
    },
    {
      text: "How much effort is required to prepare month-end closing reports?",
      options: [
        { label: "A", text: "Extremely high — multiple people work for several days" },
        { label: "B", text: "Significant effort over a few days" },
        { label: "C", text: "A few hours of focused work" },
        { label: "D", text: "Mostly automated with minimal intervention" },
      ],
    },
    {
      text: "How prepared are you for a financial audit?",
      options: [
        { label: "A", text: "We scramble to gather documents every time" },
        { label: "B", text: "It takes considerable effort to prepare records" },
        { label: "C", text: "Most documents are organised and accessible" },
        { label: "D", text: "Audit-ready at all times with digital records and trails" },
      ],
    },
  ],
};

const BRANCH_LABELS = {
  A: "Manual data entry & Tally posting",
  B: "Reconciliation errors & compliance",
  C: "Reporting & real-time visibility",
  D: "Team efficiency & workflow management",
};

/* ── SCORING ── */
function getResult(score) {
  const pct = Math.round((score / 20) * 100);
  if (score <= 10) {
    return {
      pct,
      emoji: "🔴",
      bucket: "High Pain",
      color: "#fb923c",
      bgColor: "#431407",
      headline: "You're losing significant time and accuracy.",
      sub: "Your firm is spending hours on work that AI can do in minutes. Lekha AI is built exactly for where you are right now.",
      offer: true,
    };
  } else if (score <= 15) {
    return {
      pct,
      emoji: "🟡",
      bucket: "Room to Improve",
      color: "#fbbf24",
      bgColor: "#422006",
      headline: "You're close, but there's room to go faster and more accurate.",
      sub: "You've made progress, but manual bottlenecks are still slowing your team down. Lekha AI can close the gap.",
      offer: false,
    };
  } else {
    return {
      pct,
      emoji: "🟢",
      bucket: "Optimised",
      color: "#4ade80",
      bgColor: "#052e16",
      headline: "You're ahead of most firms.",
      sub: "You've built strong processes. Lekha AI can help you scale further and handle growing complexity without adding headcount.",
      offer: false,
    };
  }
}

/* ── CIRCULAR PROGRESS ── */
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

/* ── MAIN COMPONENT ── */
export default function QuizPopup() {
  const [visible, setVisible]       = useState(false);
  const [closing, setClosing]       = useState(false);
  // screens: welcome | main | quiz | result | form | done
  const [screen, setScreen]         = useState("welcome");
  const [branch, setBranch]         = useState(null);      // "A" | "B" | "C" | "D"
  const [current, setCurrent]       = useState(0);         // index in branch questions
  const [scores, setScores]         = useState([]);        // points per branch question
  const [animating, setAnimating]   = useState(false);
  const [result, setResult]         = useState(null);
  const [countryCode, setCountryCode] = useState("+91");
  const [form, setForm]             = useState({ name: "", email: "", firm: "", phone: "" });
  const [formError, setFormError]   = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(QUIZ_SEEN_KEY)) return;
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(QUIZ_SEEN_KEY, "1");
    }, 300);
  }

  /* auto-advance with brief animation */
  function advance(nextFn) {
    setAnimating(true);
    setTimeout(() => {
      nextFn();
      setAnimating(false);
    }, 220);
  }

  /* main question selected */
  function selectBranch(optLabel) {
    advance(() => {
      setBranch(optLabel);
      setCurrent(0);
      setScores([]);
      setScreen("quiz");
    });
  }

  /* branch question answered */
  function selectAnswer(optIdx) {
    const points = optIdx + 1; // A=1 … D=4
    const newScores = [...scores, points];

    advance(() => {
      const questions = BRANCHES[branch];
      if (current + 1 < questions.length) {
        setScores(newScores);
        setCurrent(current + 1);
      } else {
        // All branch questions done — store result, go to contact form first
        const total = newScores.reduce((a, b) => a + b, 0);
        setResult(getResult(total));
        setScreen("form");
      }
    });
  }

  /* go back one step */
  function goBack() {
    if (screen === "main") {
      setScreen("welcome");
    } else if (screen === "quiz") {
      if (current === 0) {
        setScreen("main");
        setBranch(null);
      } else {
        setCurrent(current - 1);
        setScores(scores.slice(0, -1));
      }
    } else if (screen === "form") {
      // go back to last branch question
      setCurrent(BRANCHES[branch].length - 1);
      setScores(scores.slice(0, -1));
      setScreen("quiz");
    }
  }

  /* form submit */
  async function submitForm(e) {
    e.preventDefault();
    const errs = {};
    if (!isWorkEmail(form.email)) errs.email = "Please enter a valid work email address.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length !== 10) errs.phone = "Phone number must be exactly 10 digits.";
    if (Object.keys(errs).length) { setFormError(errs); return; }

    setSubmitting(true);
    try {
      await fetch("/api/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: countryCode + form.phone,
          branch: BRANCH_LABELS[branch],
          score: result?.pct,
          bucket: result?.bucket,
        }),
      });
    } catch (_) { /* placeholder — fail silently */ }
    setSubmitting(false);
    setScreen("result"); // show score AFTER form
  }

  if (!visible) return null;

  const branchQuestions = branch ? BRANCHES[branch] : [];
  const totalQ = branchQuestions.length;
  const progress = screen === "quiz"
    ? Math.round((current / totalQ) * 100)
    : screen === "result" || screen === "form" || screen === "done" ? 100 : 0;

  const canGoBack = screen === "main" || screen === "quiz" || screen === "form";

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
        {/* Top accent bar */}
        <div style={{ height: "3px", background: "linear-gradient(90deg,#10b981,#34d399)", flexShrink: 0 }} />

        {/* Header row: back + close */}
        <div className="flex items-center justify-between px-7 pt-5 pb-0">
          {canGoBack ? (
            <button
              onClick={goBack}
              className="flex items-center gap-1 text-xs text-zinc-500 hover:text-emerald-400 transition"
            >
              ← Back
            </button>
          ) : <span />}
          <button
            onClick={close}
            className="text-zinc-500 hover:text-white transition text-lg leading-none ml-auto"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div
          className="px-7 pb-7 pt-4"
          style={{ opacity: animating ? 0 : 1, transition: "opacity 0.2s" }}
        >

          {/* ── WELCOME ── */}
          {screen === "welcome" && (
            <div className="text-center">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full mb-5">
                Business Matrix Index · Free Assessment
              </span>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-2 mb-5">
                <span className="text-base">🎁</span>
                <span className="text-emerald-300 text-sm font-semibold">100% Free — No credit card, no catch</span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-snug mb-3">
                Find out where your firm stands —<br />
                <span className="text-emerald-400">answer a few questions to know</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-7">
                A short personalised assessment based on your biggest challenge. No sign-up to start. See your score instantly.
              </p>
              <button
                onClick={() => setScreen("main")}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-xl transition text-sm"
              >
                Start the Assessment →
              </button>
              <p className="text-zinc-600 text-xs mt-3">Takes about 2 minutes · Completely free</p>
            </div>
          )}

          {/* ── MAIN QUESTION ── */}
          {screen === "main" && (
            <div>
              <p className="text-xs text-zinc-500 mb-4 uppercase tracking-widest font-semibold">
                Step 1 of 2 — Choose your focus area
              </p>
              <p className="text-white font-semibold text-base leading-snug mb-5">
                {MAIN_QUESTION.text}
              </p>
              <div className="flex flex-col gap-3">
                {MAIN_QUESTION.options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => selectBranch(opt.label)}
                    className="w-full text-left rounded-xl px-4 py-3 text-sm transition-all duration-150 hover:border-emerald-500 hover:text-white"
                    style={{
                      background: "#18181b",
                      border: "1px solid #27272a",
                      color: "#a1a1aa",
                    }}
                  >
                    <span className="font-bold mr-2" style={{ color: "#52525b" }}>{opt.label}</span>
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── BRANCH QUESTIONS ── */}
          {screen === "quiz" && branch && (
            <div>
              {/* Progress */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500">
                  Question {current + 1} of {totalQ}
                </span>
                <span className="text-xs text-emerald-400 font-semibold">{progress}%</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full mb-5 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-white font-semibold text-base leading-snug mb-5">
                {branchQuestions[current].text}
              </p>

              <div className="flex flex-col gap-3">
                {branchQuestions[current].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectAnswer(idx)}
                    className="w-full text-left rounded-xl px-4 py-3 text-sm transition-all duration-150 hover:border-emerald-500 hover:text-white"
                    style={{
                      background: "#18181b",
                      border: "1px solid #27272a",
                      color: "#a1a1aa",
                    }}
                  >
                    <span className="font-bold mr-2" style={{ color: "#52525b" }}>{opt.label}</span>
                    {opt.text}
                  </button>
                ))}
              </div>
              <p className="text-zinc-600 text-xs text-center mt-4">
                Tap an answer to continue
              </p>
            </div>
          )}

          {/* ── RESULT ── */}
          {screen === "result" && result && (
            <div className="text-center">
              <h2 className="text-lg font-bold text-white mb-5">Your Business Matrix Index</h2>

              <div className="flex justify-center mb-5">
                <CircleProgress pct={result.pct} color={result.color} />
              </div>

              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
                style={{ background: result.bgColor, color: result.color }}
              >
                {result.emoji} {result.bucket}
              </span>

              <h3 className="text-base font-semibold text-white leading-snug mb-3">
                {result.headline}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-5">{result.sub}</p>

              {result.offer && (
                <div
                  className="rounded-xl p-4 mb-5 text-left"
                  style={{ background: "#1a0a00", border: "1px solid rgba(251,146,60,0.27)" }}
                >
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
                    🎁 Special Offer
                  </p>
                  <p className="text-sm text-zinc-300">
                    Because of where your firm stands, we're offering a{" "}
                    <strong className="text-white">3-month free subscription</strong> to Lekha AI — no credit card required. Leave your details and we'll reach out personally.
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

          {/* ── CONTACT FORM (before result) ── */}
          {screen === "form" && (
            <div>
              <div className="text-center mb-6">
                <span className="text-3xl">🎯</span>
                <h2 className="text-xl font-bold text-white mt-2 mb-1">
                  One step away from your score
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Leave your details and we'll show you exactly where your firm stands.
                </p>
              </div>

              <form onSubmit={submitForm} className="flex flex-col gap-3">

                {/* Name */}
                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition"
                    style={{ background: "#18181b", border: "1px solid #27272a" }}
                  />
                </div>

                {/* Firm */}
                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Name of Your Firm</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Sharma & Associates"
                    value={form.firm}
                    onChange={(e) => setForm({ ...form, firm: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition"
                    style={{ background: "#18181b", border: "1px solid #27272a" }}
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Work Email</label>
                  <input
                    required
                    type="email"
                    placeholder="e.g. priya@yourfirm.com"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (formError.email) setFormError({ ...formError, email: null });
                    }}
                    className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition"
                    style={{
                      background: "#18181b",
                      border: formError.email ? "1px solid #f87171" : "1px solid #27272a",
                    }}
                  />
                  {formError.email && <p className="text-red-400 text-xs mt-1">{formError.email}</p>}
                </div>

                {/* Phone with country code */}
                <div>
                  <label className="text-xs text-zinc-500 mb-1 block">Phone Number</label>
                  <div className="flex gap-2">
                    <select
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
                      placeholder="10-digit number"
                      value={form.phone}
                      maxLength={10}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setForm({ ...form, phone: digits });
                        if (formError.phone) setFormError({ ...formError, phone: null });
                      }}
                      className="flex-1 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition"
                      style={{
                        background: "#18181b",
                        border: formError.phone ? "1px solid #f87171" : "1px solid #27272a",
                      }}
                    />
                  </div>
                  {formError.phone && <p className="text-red-400 text-xs mt-1">{formError.phone}</p>}
                  <p className="text-zinc-600 text-xs mt-1">{form.phone.length}/10 digits</p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 rounded-xl transition text-sm mt-1"
                >
                  {submitting ? "Processing…" : "Show My Score →"}
                </button>
              </form>
              <p className="text-zinc-600 text-xs text-center mt-3">
                No spam. Your data is safe with us.
              </p>
            </div>
          )}

          {/* ── DONE ── */}
          {screen === "done" && (
            <div className="text-center py-4">
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-white mb-3">You're all set!</h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                We've received your details. Our team will reach out personally within 24 hours with your full report.
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
