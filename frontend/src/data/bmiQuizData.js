// Shared data/logic for the BMI Quiz — used by components/BmiQuiz.jsx in both
// its modal (homepage popup) and inline (guide page) presentations.

/* ── PERSONAL EMAIL DOMAINS TO BLOCK ── */
export const PERSONAL_DOMAINS = [
  "gmail.com","yahoo.com","yahoo.co.in","yahoo.in","yahoo.co.uk","hotmail.com",
  "hotmail.co.in","hotmail.co.uk","outlook.com","outlook.in","live.com",
  "rediffmail.com","icloud.com","me.com","aol.com","protonmail.com","zoho.com",
  "ymail.com","inbox.com","mail.com","gmx.com","gmx.net","msn.com",
  "rocketmail.com","fastmail.com","tutanota.com","hushmail.com",
];

export function isWorkEmail(email) {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return !PERSONAL_DOMAINS.includes(domain);
}

/* ── COUNTRY CODES (comprehensive) ── */
export const COUNTRY_CODES = [
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
export const MAIN_QUESTION = {
  text: "What is your biggest challenge in your finance operations right now?",
  options: [
    { label: "A", text: "Manual data entry & Tally posting" },
    { label: "B", text: "Reconciliation errors & compliance (TDS/GST)" },
    { label: "C", text: "Reporting & real-time visibility" },
    { label: "D", text: "Team efficiency & workflow management" },
  ],
};

/* ── BRANCH QUESTIONS ── */
export const BRANCHES = {
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
        { label: "A", text: "Very difficult, knowledge is mostly in one person's head" },
        { label: "B", text: "Possible, but with delays and confusion" },
        { label: "C", text: "Manageable because processes are documented" },
        { label: "D", text: "Easy, workflows and data are standardised and automated" },
      ],
    },
  ],
  B: [
    {
      text: "How often do you find mismatches or errors in your books that are hard to trace?",
      options: [
        { label: "A", text: "Very often, it's a regular headache" },
        { label: "B", text: "Sometimes, maybe once or twice a month" },
        { label: "C", text: "Rarely, we catch them quickly" },
        { label: "D", text: "Almost never, our records are clean" },
      ],
    },
    {
      text: "How often do you reconcile your bank transactions?",
      options: [
        { label: "A", text: "Rarely, only when there's an issue" },
        { label: "B", text: "Monthly during closing" },
        { label: "C", text: "Weekly with manual effort" },
        { label: "D", text: "Automatically, it's always up to date" },
      ],
    },
    {
      text: "How often do you miss deadlines for GST, TDS, or other compliance filings?",
      options: [
        { label: "A", text: "Frequently, deadlines are stressful" },
        { label: "B", text: "Occasionally due to missing information" },
        { label: "C", text: "Rarely, we usually stay on track" },
        { label: "D", text: "Never, reminders and processes are automated" },
      ],
    },
    {
      text: "How easy is it to track the source of a transaction when someone asks for details?",
      options: [
        { label: "A", text: "Very difficult, we search through emails and files" },
        { label: "B", text: "Possible, but takes significant effort" },
        { label: "C", text: "Usually manageable within a few minutes" },
        { label: "D", text: "Instant, all supporting documents are linked" },
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
        { label: "B", text: "End of month, after closing" },
        { label: "C", text: "Weekly, after some manual work" },
        { label: "D", text: "Real-time, I can check anytime" },
      ],
    },
    {
      text: "How much visibility do you have into pending receivables?",
      options: [
        { label: "A", text: "Very little, we usually find out when cash is delayed" },
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
        { label: "D", text: "Rarely, most information is already available on dashboards" },
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
        { label: "D", text: "Automated workflows, no manual handling needed" },
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
        { label: "A", text: "Extremely high, multiple people work for several days" },
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

export const BRANCH_LABELS = {
  A: "Manual data entry & Tally posting",
  B: "Reconciliation errors & compliance",
  C: "Reporting & real-time visibility",
  D: "Team efficiency & workflow management",
};

/* ── SCORING ── */
export function getResult(score) {
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
