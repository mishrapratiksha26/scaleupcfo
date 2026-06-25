import { Link } from "react-router-dom";

export default function SalesReconciliationLayers() {
  return (
    <div className="blog-content">

      {/* PROBLEM */}
      <div className="section-label">
        <span className="pill pill-problem">The Problem</span>
        <hr />
      </div>

      <h2>Sales Reconciliation Isn't Hard. It's Just Spread Across Too Many Places.</h2>

      <p>Every business that sells — through a marketplace, a POS system, a direct channel, or all three — eventually faces the same monthly ordeal. Someone has to prove that what was sold matches what was paid, that what was paid matches what landed in the bank, and that everything in between — platform fees, COD settlements, RTOs, GST — is accounted for correctly.</p>

      <p>It sounds like a single task. It never is. Because the data needed to do it lives in at least three completely separate systems, each with its own format, its own timing, and its own logic.</p>

      <div className="three-systems">
        <div className="sys-box">
          <span className="sys-icon">🧾</span>
          <span className="sys-name">Sales Register</span>
          <span className="sys-desc">Orders placed, invoices raised, GST collected. Your source of truth for what was sold.</span>
        </div>
        <div className="sys-divider">
          <span>≠</span>
          <small>Never ties</small>
        </div>
        <div className="sys-box">
          <span className="sys-icon">🏦</span>
          <span className="sys-name">Bank Statement</span>
          <span className="sys-desc">What actually landed in your account. Net of fees, timing differences, and adjustments.</span>
        </div>
        <div className="sys-divider">
          <span>≠</span>
          <small>Never ties</small>
        </div>
        <div className="sys-box">
          <span className="sys-icon">📦</span>
          <span className="sys-name">Marketplace Payout</span>
          <span className="sys-desc">Platform fee netted, COD settlements batched, RTOs deducted — in their format, on their timeline.</span>
        </div>
        <div className="three-footer">These three systems never match on the first pass. Someone always has to sit in the middle and make sense of them.</div>
      </div>

      <h3>Why So Many People End Up Involved</h3>

      <p>The layers in sales reconciliation are not about hierarchy or complexity of judgment. They exist for a much more mundane reason: no one person has access to all the data sources at once, and no system was ever built to hold all of them together.</p>

      <p>So the work gets sliced. The junior handles the raw data pull and the first-pass matching. The senior handles what didn't tie. The manager handles the summary and consolidation. The controller handles the sign-off. Each layer exists not because the work at that layer is inherently theirs — but because the system forces it.</p>

      <div className="layer-stack">
        <div className="ls-item">
          <div className="ls-num">1</div>
          <div className="ls-body">
            <strong>Junior Accountant</strong>
            <span>Opens sales register, bank statement, marketplace payout. Three formats, three exports. Tries to match manually. Numbers never tie on the first pass.</span>
          </div>
          <span className="ls-exists ls-reason">Data pull</span>
        </div>
        <div className="ls-item">
          <div className="ls-num">2</div>
          <div className="ls-body">
            <strong>Senior Accountant</strong>
            <span>Reviews what didn't match. Chases the RTO details from someone else. Validates the platform fee netted in the payout. Reformats for the controller.</span>
          </div>
          <span className="ls-exists ls-reason">Gap bridging</span>
        </div>
        <div className="ls-item">
          <div className="ls-num">3</div>
          <div className="ls-body">
            <strong>Manager</strong>
            <span>Consolidates across channels and entities. Builds a presentable summary. Ensures the format is right for the controller's review.</span>
          </div>
          <span className="ls-exists ls-reason">Consolidation</span>
        </div>
        <div className="ls-item">
          <div className="ls-num">4</div>
          <div className="ls-body">
            <strong>Controller / CA Partner</strong>
            <span>Checks the summary. Signs off on the period. Often still sees the full 2,000-line register instead of just the exceptions.</span>
          </div>
          <span className="ls-exists ls-reason">Sign-off</span>
        </div>
      </div>

      <div className="callout">
        <p><strong>The uncomfortable truth:</strong> Layers 1, 2, and 3 exist almost entirely because <strong>no system connects all the data sources</strong>. They are not value-adding layers of review. They are human middleware — people doing the job that software should be doing.</p>
      </div>

      <h3>Where It Goes Wrong — Every Single Month</h3>

      <p>The places where sales reconciliation breaks down are remarkably consistent. It's never random. It's always the same friction points, recurring like clockwork:</p>

      <div className="wrong-grid">
        <div className="wrong-card">
          <span className="wc-tag">Problem 1</span>
          <h4>Platform fees netted inside payouts</h4>
          <p>The marketplace deducts its fee before paying out. Your books show the gross sale. The bank shows the net. Someone has to manually split and account for the difference — every order, every settlement cycle.</p>
        </div>
        <div className="wrong-card">
          <span className="wc-tag">Problem 2</span>
          <h4>RTOs that need validation from someone else</h4>
          <p>An order was returned. The marketplace reversed the payout. But the return needs to be validated against the original invoice, the logistics partner, and the GST credit note. Three systems, one confirmation needed.</p>
        </div>
        <div className="wrong-card">
          <span className="wc-tag">Problem 3</span>
          <h4>COD settlements batched and delayed</h4>
          <p>Cash-on-delivery settlements arrive days after the order. The sale is in the register for Day 1. The cash hits the bank on Day 5. The period they fall in depends on which system you look at first.</p>
        </div>
        <div className="wrong-card">
          <span className="wc-tag">Problem 4</span>
          <h4>GST on marketplace fees not captured</h4>
          <p>The platform charges GST on its commission. That GST is your input tax credit — but it's buried inside a payout report in a format that doesn't match your books, and it's easy to miss entirely.</p>
        </div>
        <div className="wrong-card">
          <span className="wc-tag">Problem 5</span>
          <h4>Multi-channel sales don't consolidate cleanly</h4>
          <p>Selling on two marketplaces and a website? Each has its own payout cycle, its own fee structure, its own settlement format. Consolidating them into one view is a manual exercise every single month.</p>
        </div>
        <div className="wrong-card">
          <span className="wc-tag">Problem 6</span>
          <h4>The numbers never tie on the first pass</h4>
          <p>It's not a sign something is wrong — it's just how these systems work. But "never ties first pass" means someone always has to investigate, even when everything is actually fine. That investigation takes hours.</p>
        </div>
      </div>

      <div className="pull-quote">
        <p>The layers don't exist because the work is hard. They exist because no one has all the data in one place.</p>
      </div>

      {/* SOLUTION */}
      <div className="section-label">
        <span className="pill pill-solution">The Solution</span>
        <hr />
      </div>

      <h2>Connect the Systems. The Layers Dissolve On Their Own.</h2>

      <p>The fix is not to hire better accountants or build more complex spreadsheets. The fix is to stop treating this as a human coordination problem and start treating it as a data connectivity problem — because that is what it actually is.</p>

      <p>When all three systems — sales register, bank statement, marketplace payout — are connected to a single reconciliation layer, the dynamic changes completely. The pulling, the formatting, the matching — it all happens automatically. What ties gets closed. What doesn't tie gets flagged with a specific, explained exception. What reaches the controller is no longer the full register. It's the twelve lines that actually need a human decision.</p>

      <div className="steps">
        <div className="step">
          <div className="step-left"><div className="step-num">1</div><div className="step-line"></div></div>
          <div className="step-body">
            <h4>All three data sources connected in one place</h4>
            <p>Sales register, bank statement, and marketplace payout file — all ingested automatically, regardless of format. No manual exports. No copy-paste between tabs. The agent reads them all and holds the full picture.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-left"><div className="step-num">2</div><div className="step-line"></div></div>
          <div className="step-body">
            <h4>Platform fees split and accounted for automatically</h4>
            <p>The agent understands that gross sale ≠ net payout. It identifies the fee component, accounts for GST on commission, and reconciles what landed in the bank against what the books expected — without anyone doing it manually.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-left"><div className="step-num">3</div><div className="step-line"></div></div>
          <div className="step-body">
            <h4>COD and RTO entries matched across systems</h4>
            <p>COD settlements are matched to the original orders regardless of the timing gap. RTOs are validated against the original invoice and the payout reversal. The entries that span multiple systems get resolved — not just flagged.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-left"><div className="step-num">4</div><div className="step-line"></div></div>
          <div className="step-body">
            <h4>Genuine exceptions surfaced with explanations</h4>
            <p>Not "these 47 entries didn't match." But: "Payout short by ₹3,200 — cross-check platform fee rate applied on order #10482. Expected 3%, settlement applied 5%." The exception tells the CA exactly what to look at and why.</p>
          </div>
        </div>
        <div className="step">
          <div className="step-left"><div className="step-num">5</div><div className="step-line"></div></div>
          <div className="step-body">
            <h4>Controller sees only what needs a decision</h4>
            <p>The 2,000-line register becomes 12 lines. The CA reviews the exceptions, applies judgment where needed, and approves. The agent does not post entries or close the period without that sign-off. Control stays with the CA. The manual work doesn't.</p>
          </div>
        </div>
      </div>

      <h3>What Changes Between Old and New</h3>

      <div className="ba-grid">
        <div className="ba-card ba-before">
          <h4>❌ Before</h4>
          <ul>
            <li><span className="mark">→</span>3 exports, 3 formats, 1 junior doing VLOOKUPs</li>
            <li><span className="mark">→</span>Platform fees reconciled manually every cycle</li>
            <li><span className="mark">→</span>RTO validation chased across 2 teams</li>
            <li><span className="mark">→</span>COD entries matched by hand across days</li>
            <li><span className="mark">→</span>Controller reviews 2,000-line register</li>
            <li><span className="mark">→</span>4 people, 3–5 days, same errors recurring</li>
          </ul>
        </div>
        <div className="ba-card ba-after">
          <h4>✅ After</h4>
          <ul>
            <li><span className="mark">→</span>All sources ingested and matched automatically</li>
            <li><span className="mark">→</span>Platform fees split and accounted for by the agent</li>
            <li><span className="mark">→</span>RTOs validated across systems in minutes</li>
            <li><span className="mark">→</span>COD matched regardless of timing gap</li>
            <li><span className="mark">→</span>Controller reviews 12 flagged exceptions</li>
            <li><span className="mark">→</span>1 review session, same day, clean output</li>
          </ul>
        </div>
      </div>

      <h3>What Happens to the Layers</h3>
      <p>The layers do not disappear because people leave. They disappear because the reason for each layer — bridging disconnected systems manually — no longer exists.</p>

      <div className="layer-stack">
        <div className="ls-item">
          <div className="ls-num">1</div>
          <div className="ls-body">
            <strong>Junior Accountant</strong>
            <span>No longer pulls and formats data manually. Reviews agent output, handles vendor communication, works on higher-value tasks.</span>
          </div>
          <span className="ls-exists ls-dissolve">Elevated</span>
        </div>
        <div className="ls-item">
          <div className="ls-num">2</div>
          <div className="ls-body">
            <strong>Senior Accountant</strong>
            <span>No longer chases RTOs and validates fee splits manually. Reviews flagged exceptions with full context already provided.</span>
          </div>
          <span className="ls-exists ls-dissolve">Elevated</span>
        </div>
        <div className="ls-item">
          <div className="ls-num">3</div>
          <div className="ls-body">
            <strong>Manager</strong>
            <span>No longer consolidates manually. Consolidated view is always available. Focus shifts to analysis and advisory — not assembly.</span>
          </div>
          <span className="ls-exists ls-dissolve">Elevated</span>
        </div>
        <div className="ls-item">
          <div className="ls-num">4</div>
          <div className="ls-body">
            <strong>Controller / CA Partner</strong>
            <span>Sees only what genuinely needs a decision. Signs off in one focused session instead of reviewing everything. Time freed for client-facing and advisory work.</span>
          </div>
          <span className="ls-exists ls-dissolve">Elevated</span>
        </div>
      </div>

      <div className="callout callout-blue">
        <p><strong>The shift that matters:</strong> The team doesn't shrink — it moves up. <strong>Every person in the chain starts doing the work that actually requires them</strong>, instead of the work that exists only because the systems weren't connected.</p>
      </div>

      {/* IMPACT */}
      <div className="section-label">
        <span className="pill pill-impact">The Impact</span>
        <hr />
      </div>

      <h2>What Removing the Layers Actually Delivers</h2>

      <div className="stat-row">
        <div className="stat-card">
          <span className="stat-num">3–5x</span>
          <span className="stat-desc">Faster sales reconciliation cycle — hours instead of days</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">~12</span>
          <span className="stat-desc">Exceptions reaching the controller, down from 2,000+ entries</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">100%</span>
          <span className="stat-desc">Platform fees, COD, and RTO entries accounted for — none missed</span>
        </div>
      </div>

      <ul className="chaos-list">
        <li><span className="icon">📈</span><div><strong>For e-commerce and marketplace businesses:</strong> Every channel reconciled in one cycle. Platform fees, COD settlements, RTO reversals — all handled. No more month-end where three channels mean three separate reconciliation exercises.</div></li>
        <li><span className="icon">🏢</span><div><strong>For CA firms:</strong> Sales reconciliation for a client that used to take two days now takes two hours. That is more clients served, better margins, and a team that stops dreading month-end.</div></li>
        <li><span className="icon">🚀</span><div><strong>For startup finance teams:</strong> The founder or CFO gets accurate, reconciled sales numbers without waiting for a three-day process. MIS reports are ready when investors ask — not 48 hours later.</div></li>
        <li><span className="icon">🔍</span><div><strong>For audit and compliance:</strong> Every reconciliation produces a documented trail — what was matched, what was flagged, what was decided. The GST input credit on platform fees is captured, not missed. Audit readiness is built in, not reconstructed later.</div></li>
      </ul>

      <div className="callout callout-green">
        <p><strong>The compounding effect:</strong> When sales reconciliation is clean, everything downstream gets cleaner too. GST filings are accurate. Cash flow forecasts are based on real numbers. The P&L reflects what actually happened. <strong>One connected reconciliation layer fixes errors that currently cascade across your entire finance function.</strong></p>
      </div>

      {/* QUESTIONS */}
      <div className="section-label">
        <span className="pill pill-questions">Questions This Answers</span>
        <hr />
      </div>

      <h2>If You Found This Page Searching For…</h2>
      <p>This blog directly answers the following questions:</p>

      <div className="q-grid">
        <div className="q-item"><span className="q-icon">Q</span>Why does sales reconciliation take so long?</div>
        <div className="q-item"><span className="q-icon">Q</span>How to automate sales reconciliation for e-commerce</div>
        <div className="q-item"><span className="q-icon">Q</span>COD reconciliation process — how to do it faster</div>
        <div className="q-item"><span className="q-icon">Q</span>How to reconcile marketplace payouts with books</div>
        <div className="q-item"><span className="q-icon">Q</span>Sales to cash process automation for startups</div>
        <div className="q-item"><span className="q-icon">Q</span>How to account for platform fees in reconciliation</div>
        <div className="q-item"><span className="q-icon">Q</span>How to automate reconciliation across multiple channels</div>
        <div className="q-item"><span className="q-icon">Q</span>AI tools for sales reconciliation in India</div>
        <div className="q-item"><span className="q-icon">Q</span>How to reduce month-end close time for e-commerce</div>
        <div className="q-item"><span className="q-icon">Q</span>Books not matching bank statement — how to fix</div>
        <div className="q-item"><span className="q-icon">Q</span>RTO reconciliation process for marketplace sellers</div>
        <div className="q-item"><span className="q-icon">Q</span>Best finance software for startups selling on marketplaces</div>
      </div>

      {/* SERIES BOX */}
      <div className="series-box">
        <h4>📚 More from the ScaleupCFO Finance Operations Series</h4>
        <div className="series-links">
          <Link to="/blogs/why-book-closure-is-slow"><span className="sl-dot"></span>Why Month-End Book Closure Takes So Long — It's Not Your Team</Link>
          <Link to="/blogs/tds-reconciliation-10-minutes"><span className="sl-dot"></span>TDS Reconciliation in 10 Minutes: What That Actually Looks Like</Link>
          <Link to="/blogs/gap-between-finding-and-fixing-mismatch"><span className="sl-dot"></span>You Found the Mismatch. Now What?</Link>
          <Link to="/blogs/cfo-cash-position-real-time"><span className="sl-dot"></span>"What's Our Cash Position Right Now?" — Why Your CFO Doesn't Have a Real Answer</Link>
        </div>
      </div>

    </div>
  );
}
