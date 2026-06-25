export default function GapBetweenFindingAndFixingMismatch() {
  return (
    <div className="blog-content">

      {/* PROBLEM */}
      <div className="section-label">
        <span className="pill pill-problem">The Problem</span>
        <hr />
      </div>

      <h2>Knowing There's a Problem Is Not the Same as Fixing It</h2>

      <p>After five years in finance operations — working with accountants every month to close books, reconcile ledgers, and chase vendors for confirmations — one thing became very clear very fast.</p>

      <p>Knowing where things are stuck is the easy part. Fixing them is where everything breaks down.</p>

      <p>Every month-end, the team could point to the problem within an hour. A line in the bank statement that didn't match. A vendor payout that didn't tie. A GST entry that sat in the wrong period. The knowing was never the hard part.</p>

      <p>It was everything that came after.</p>

      {/* Gap Visual */}
      <div className="gap-visual">
        <div className="gap-row">
          <div className="gap-cell">
            <span className="gc-icon">🔍</span>
            <span className="gc-title">Mismatch Found</span>
            <span className="gc-desc">Junior flags an entry that doesn't tie. Takes 30 minutes.</span>
          </div>
          <div className="gap-cell gap-middle">
            <span className="gc-icon">⏳</span>
            <span className="gc-title">The Gap</span>
            <span className="gc-desc">Hours. Sometimes days. Emails, chases, waiting, confusion.</span>
          </div>
          <div className="gap-cell">
            <span className="gc-icon">✅</span>
            <span className="gc-title">Mismatch Resolved</span>
            <span className="gc-desc">Entry corrected, books updated, close can proceed.</span>
          </div>
        </div>
        <div className="gap-footer">
          <strong>This gap</strong> is where errors hide, audits get uncomfortable, and partners burn out at 11pm every month-end.
        </div>
      </div>

      <h3>What a Month-End Actually Looked Like</h3>
      <p>Here is what the close looked like inside most finance teams — and still does in most places today:</p>

      <div className="timeline">
        <div className="tl-item">
          <div className="tl-left"><div className="tl-dot"></div><div className="tl-line"></div></div>
          <div className="tl-body">
            <span className="tl-time">Day 1 — Morning</span>
            <h4>VLOOKUPs across 6 sheets</h4>
            <p>The junior pulls data from Tally, the bank portal, the GST dashboard, and the marketplace payout file. Different formats. No common key. Six sheets open at once, all manually cross-referenced.</p>
          </div>
        </div>
        <div className="tl-item">
          <div className="tl-left"><div className="tl-dot"></div><div className="tl-line"></div></div>
          <div className="tl-body">
            <span className="tl-time">Day 1 — Afternoon</span>
            <h4>Emails to 30+ vendors</h4>
            <p>Vendor confirmation requests go out. Half won't reply before the deadline. The ones that do reply send PDFs that have to be manually verified against the books.</p>
          </div>
        </div>
        <div className="tl-item">
          <div className="tl-left"><div className="tl-dot"></div><div className="tl-line"></div></div>
          <div className="tl-body">
            <span className="tl-time">Day 2 — All Day</span>
            <h4>Chasing the bank statement manually</h4>
            <p>A payment cleared on the 31st but shows in the books on the 1st. Three people spend two hours establishing this. The fix takes 4 minutes. The chase took 2 hours.</p>
          </div>
        </div>
        <div className="tl-item">
          <div className="tl-left"><div className="tl-dot"></div><div className="tl-line"></div></div>
          <div className="tl-body">
            <span className="tl-time">Day 3 — 11pm</span>
            <h4>Senior CA reviewing mismatches one by one</h4>
            <p>The senior sits with a list of 47 exceptions. Some are simple. Some need judgment. All of them are on one person's plate, the night before the deadline, because the system never separated the trivial from the critical.</p>
          </div>
        </div>
        <div className="tl-item">
          <div className="tl-left"><div className="tl-dot tl-dot-blue"></div><div className="tl-line"></div></div>
          <div className="tl-body">
            <span className="tl-time">Day 4 — Morning</span>
            <h4>Books finally closed. Exhausted team. Some errors still in there.</h4>
            <p>The close finished. But three mismatches were too ambiguous to resolve under deadline pressure, so they were carried forward. The auditor will find them in six months.</p>
          </div>
        </div>
      </div>

      <div className="callout">
        <p><strong>The pattern that repeats every month:</strong> The gap between finding a mismatch and fixing it is not a people problem. It's a <strong>systems problem</strong>. The data needed to resolve the exception lives in a different system from the one that flagged it — and someone has to manually bridge that gap every single time.</p>
      </div>

      <h3>What That Gap Actually Costs</h3>

      <ul className="chaos-list">
        <li><span className="icon">🕐</span><div><strong>Time:</strong> The average finance team spends more time resolving flagged exceptions than it does finding them. The finding is automated. The fixing is still manual.</div></li>
        <li><span className="icon">⚠️</span><div><strong>Errors:</strong> Exceptions resolved under deadline pressure get resolved wrong. The entry looks right. The underlying issue wasn't fully understood. The auditor finds it later.</div></li>
        <li><span className="icon">🔥</span><div><strong>Burnout:</strong> Senior CAs and controllers spend their most valuable hours doing work a well-built system should handle. That is expensive, unsustainable, and demoralising for the people doing it.</div></li>
        <li><span className="icon">📉</span><div><strong>Financial risk:</strong> Mismatches that aren't resolved cleanly create invisible exposure — in GST filings, in TDS compliance, in investor-facing MIS. What you can't see in time, you can't fix in time.</div></li>
      </ul>

      <div className="pull-quote">
        <p>The gap between "I know there's a mismatch" and "the mismatch is resolved" is where errors hide, audits get uncomfortable, and partners burn out.</p>
      </div>

      {/* SOLUTION */}
      <div className="section-label">
        <span className="pill pill-solution">The Solution</span>
        <hr />
      </div>

      <h2>An Agent That Doesn't Just Flag — It Works Through</h2>

      <p>The shift that changes everything is not faster humans. It's a system that doesn't stop at "here's what's wrong."</p>

      <p>Today, you can build agents that don't just flag exceptions — they work through them. Match transactions where rules are clear. Apply reasoning where they aren't. Draft the vendor email. Log every decision. And then surface only the ones that genuinely need a human call.</p>

      <p>The output is not "here's what's wrong." It's "here's what was handled, and here's what needs your judgment."</p>

      <div className="steps">
        <div className="step">
          <div className="step-left"><div className="step-num">1</div><div className="step-line"></div></div>
          <div className="step-body">
            <h4>Deterministic matching at scale</h4>
            <p>Where the rules are clear — same vendor, same amount, same period — the agent matches and closes those entries automatically. No human needed. No delay. Thousands of entries handled in minutes.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-left"><div className="step-num">2</div><div className="step-line"></div></div>
          <div className="step-body">
            <h4>AI reasoning where rules don't hold</h4>
            <p>Where entries are ambiguous — a timing difference, a partial payment, a reversal scenario — the agent applies reasoning to identify the most likely cause. It doesn't just flag. It explains: "Payout short by ₹4,000 — platform fee deducted at source. Check settlement report for fee line."</p>
          </div>
        </div>
        <div className="step">
          <div className="step-left"><div className="step-num">3</div><div className="step-line"></div></div>
          <div className="step-body">
            <h4>Vendor confirmations drafted automatically</h4>
            <p>Instead of manually emailing 30 vendors, the agent drafts confirmation requests for every open item — with the specific entry, the amount, and the discrepancy pre-populated. One review, one send.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-left"><div className="step-num">4</div><div className="step-line"></div></div>
          <div className="step-body">
            <h4>Every decision documented with reasoning</h4>
            <p>Not just what was matched — why it was matched. Not just what was flagged — what the flag means and what to do about it. The audit trail is built automatically, not reconstructed from memory later.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-left"><div className="step-num">5</div><div className="step-line"></div></div>
          <div className="step-body">
            <h4>Human sign-off on what actually needs it</h4>
            <p>The CA sees a clean exception list. Not 47 items. The 9 that genuinely require judgment. They review, they decide, they approve. The agent does not move without that sign-off. Control stays exactly where it should.</p>
          </div>
        </div>
      </div>

      <h3>What Changes Between Old and New</h3>

      <div className="ba-grid">
        <div className="ba-card ba-before">
          <h4>❌ Before</h4>
          <ul>
            <li><span className="mark">→</span>Mismatch flagged. Chase begins.</li>
            <li><span className="mark">→</span>Hours spent tracing the root cause manually</li>
            <li><span className="mark">→</span>30 vendor emails written by hand</li>
            <li><span className="mark">→</span>Senior reviews 47 exceptions at 11pm</li>
            <li><span className="mark">→</span>3 items carried forward unresolved</li>
            <li><span className="mark">→</span>No audit trail. Memory-based workings.</li>
          </ul>
        </div>
        <div className="ba-card ba-after">
          <h4>✅ After</h4>
          <ul>
            <li><span className="mark">→</span>Mismatch flagged with explanation and next step</li>
            <li><span className="mark">→</span>Root cause identified automatically</li>
            <li><span className="mark">→</span>Vendor emails drafted, reviewed, sent in minutes</li>
            <li><span className="mark">→</span>CA reviews 9 genuine exceptions in 30 minutes</li>
            <li><span className="mark">→</span>All items resolved before deadline</li>
            <li><span className="mark">→</span>Full audit trail with documented reasoning</li>
          </ul>
        </div>
      </div>

      <div className="callout callout-blue">
        <p><strong>The principle:</strong> The agent handles what has a right answer. The CA decides what requires judgment. <strong>Full autonomy in high-stakes accounting is never the goal.</strong> The goal is giving the CA only the decisions that actually need them.</p>
      </div>

      {/* IMPACT */}
      <div className="section-label">
        <span className="pill pill-impact">The Impact</span>
        <hr />
      </div>

      <h2>When the Gap Closes, Everything Changes</h2>

      <div className="stat-row">
        <div className="stat-card">
          <span className="stat-num">~80%</span>
          <span className="stat-desc">Of exceptions resolved automatically, without human intervention</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">11pm</span>
          <span className="stat-desc">No longer when your senior CA is reviewing mismatches</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">Zero</span>
          <span className="stat-desc">Exceptions carried forward unresolved to the next period</span>
        </div>
      </div>

      <h3>For the CA Partner and Controller</h3>
      <p>You stop being the person who reviews everything and start being the person who decides on what matters. That is not a small change — it is the difference between being buried in a close and being in control of one. Your evenings come back. Your judgment gets applied where it actually changes outcomes.</p>

      <h3>For the Finance Team</h3>
      <p>The junior stops chasing. The senior stops triaging. The work that consumed three days now surfaces only what needs a human in the loop — and that human spends 30 minutes, not 30 hours. The team can take on more clients, more complexity, more value-adding work — without more headcount.</p>

      <h3>For Audit and Compliance Readiness</h3>
      <p>Every reconciliation run produces a documented record of what was matched, what was flagged, what reasoning was applied, and what the CA approved. When an auditor asks for your workings, you do not reconstruct them from memory. You hand over the file. Clean. Complete. Timestamped.</p>

      <div className="callout callout-green">
        <p><strong>The real shift:</strong> When exceptions are resolved as they're found — not batched up until the night before the deadline — the close stops being a crisis and becomes a process. <strong>That is what it should have been all along.</strong></p>
      </div>

      {/* QUESTIONS */}
      <div className="section-label">
        <span className="pill pill-questions">Questions This Answers</span>
        <hr />
      </div>

      <h2>If You Found This Page Searching For…</h2>
      <p>This blog directly answers the following questions:</p>

      <div className="q-grid">
        <div className="q-item"><span className="q-icon">Q</span>Why does it take so long to resolve accounting mismatches?</div>
        <div className="q-item"><span className="q-icon">Q</span>How to reduce accounting errors in month-end close</div>
        <div className="q-item"><span className="q-icon">Q</span>How to fix reconciliation mismatches faster</div>
        <div className="q-item"><span className="q-icon">Q</span>How to automate reconciliation for CA firms</div>
        <div className="q-item"><span className="q-icon">Q</span>Why do books not close on time every month?</div>
        <div className="q-item"><span className="q-icon">Q</span>Books not ready for investors or due diligence</div>
        <div className="q-item"><span className="q-icon">Q</span>How to speed up month-end close for startups</div>
        <div className="q-item"><span className="q-icon">Q</span>AI tools for reconciliation and book closure</div>
        <div className="q-item"><span className="q-icon">Q</span>How to build an audit trail for reconciliation</div>
        <div className="q-item"><span className="q-icon">Q</span>Financial close software for CA firms India</div>
        <div className="q-item"><span className="q-icon">Q</span>How to stop errors from carrying forward in books</div>
      </div>

    </div>
  );
}
