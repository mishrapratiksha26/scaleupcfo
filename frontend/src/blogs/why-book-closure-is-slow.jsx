export default function WhyBookClosureIsSlow() {
  return (
    <div className="blog-content">
      {/* ── PROBLEM ── */}
      <div className="section-label">
        <span className="pill pill-problem">The Problem</span>
        <hr />
      </div>

      <h2>The Month-End Close Is Breaking Finance Teams</h2>

      <p>
        Ask any accountant, CA, or CFO what happens at month-end and you'll hear the same story. The
        junior accountant opens three different systems. The senior reviews what the junior compiled.
        The manager consolidates across entities. The controller finally signs off — days later,
        exhausted.
      </p>
      <p>
        Most people assume this is just how it works. That closing books is inherently slow,
        inherently manual, inherently painful. It isn't. The slowness is a symptom, not the disease.
      </p>

      <div className="callout callout-warn">
        <p>
          <strong>The real problem:</strong> Your data lives in 10 different places — and none of
          those places talk to each other. Every layer you add to the close exists not because the
          work is complex, but because{" "}
          <strong>
            someone has to manually move data between systems that were never designed to work
            together.
          </strong>
        </p>
      </div>

      <h3>What a Typical Month-End Actually Looks Like</h3>
      <p>Here's what happens inside most finance teams when the month ends:</p>

      <ul className="chaos-list">
        <li>
          <span className="icon">📂</span> Junior opens the sales register from one system, the bank
          statement from another, the marketplace payout file from a third — all in different
          formats.
        </li>
        <li>
          <span className="icon">🔢</span> They spend hours manually matching entries — platform
          fees netted here, RTO details from someone else, numbers that never tie on the first pass.
        </li>
        <li>
          <span className="icon">📧</span> Emails go out to 30+ vendors asking for confirmations.
          Half don't reply before the deadline.
        </li>
        <li>
          <span className="icon">🔍</span> A senior CA reviews mismatches one by one — sometimes at
          11pm the night before the deadline.
        </li>
        <li>
          <span className="icon">📊</span> A manager consolidates across entities, building a
          summary no one fully trusts.
        </li>
        <li>
          <span className="icon">✍️</span> The controller finally sees a 2,000-line register and
          has to figure out what actually needs their attention.
        </li>
      </ul>

      <h3>Why So Many Layers Exist</h3>
      <p>
        Here is the uncomfortable truth: most of the layers in month-end close exist not because the
        work is hard, but because no single person has access to all the data sources at once.
      </p>

      <div className="flow">
        <div className="flow-node node-junior">
          <span className="role">Junior Accountant</span>
          Pulls data from 3+ systems, formats it, tries to match
        </div>
        <div className="flow-arrow">↓</div>
        <p className="flow-label">Hands off because they don't have context to resolve exceptions</p>
        <div className="flow-node node-senior">
          <span className="role">Senior Accountant</span>
          Reviews mismatches, chases missing documents
        </div>
        <div className="flow-arrow">↓</div>
        <p className="flow-label">Hands off because they can't approve entries</p>
        <div className="flow-node node-manager">
          <span className="role">Manager</span>
          Consolidates, formats for leadership
        </div>
        <div className="flow-arrow">↓</div>
        <p className="flow-label">Hands off after preparing a 2,000-line summary</p>
        <div className="flow-node node-controller">
          <span className="role">Controller / CA Partner</span>
          Reviews everything. Signs off. Days later.
        </div>
      </div>

      <p>
        Connect those systems to one place, and most of those handoffs disappear entirely. The
        layers don't dissolve because people leave. They dissolve because the reason for the layer —
        moving data between systems — no longer exists.
      </p>

      <div className="callout callout-warn">
        <p>
          <strong>The gap that hurts most:</strong> The distance between{" "}
          <em>"I know there's a mismatch"</em> and <em>"the mismatch is resolved"</em> is where
          errors hide, where audits get uncomfortable, and where partners burn out at 11pm every
          month.
        </p>
      </div>

      {/* ── SOLUTION ── */}
      <div className="section-label">
        <span className="pill pill-solution">The Solution</span>
        <hr />
      </div>

      <h2>Connect the Systems. Let the Agent Do the Pulling.</h2>

      <p>
        The future of book closure isn't about faster accountants. It's about removing the manual
        work entirely — and replacing it with agents that sit across Tally, the tax portal, the bank
        feed, and the sales data simultaneously.
      </p>
      <p>
        When your systems are connected to one place, something fundamental changes. The pulling, the
        matching, the formatting — it all happens automatically. What doesn't match gets flagged.
        What doesn't need a human never reaches one.
      </p>

      <h3>What an AI-Powered Close Actually Does</h3>
      <ul className="chaos-list">
        <li>
          <span className="icon">🔗</span>
          <span>
            <strong>Connects all your data sources</strong> — Tally, bank feeds, GST portal, sales
            register, marketplace payouts — into a single working view.
          </span>
        </li>
        <li>
          <span className="icon">⚡</span>
          <span>
            <strong>Matches transactions deterministically</strong> where rules are clear. No human
            needed for straightforward entries.
          </span>
        </li>
        <li>
          <span className="icon">🚨</span>
          <span>
            <strong>Flags genuine exceptions</strong> — the fee that looks off, the payout short by
            ₹4,000, the invoice with no matching receipt — and sends only those up.
          </span>
        </li>
        <li>
          <span className="icon">📨</span>
          <span>
            <strong>Drafts vendor confirmation emails</strong> automatically. Logs every decision
            with reasoning. Nothing moves without a human sign-off.
          </span>
        </li>
        <li>
          <span className="icon">👁️</span>
          <span>
            <strong>What reaches the controller</strong> is no longer a 2,000-line register. It's
            the 12 lines that actually need a human to look at.
          </span>
        </li>
      </ul>

      <div className="callout callout-blue">
        <p>
          <strong>The design principle that matters:</strong> AI suggests. The human verifies.
          Always. The system doesn't post a journal entry without your approval. A CA stays in
          control — they just stop doing the work that was never worth their time in the first place.
        </p>
      </div>

      <h3>Before vs. After: What Changes</h3>
      <div className="ba-grid">
        <div className="ba-card ba-before">
          <h4>❌ Before</h4>
          <ul>
            <li><span className="mark">→</span> 3 systems, 3 formats, manual matching</li>
            <li><span className="mark">→</span> 30+ vendor emails every cycle</li>
            <li><span className="mark">→</span> Senior CA reviewing mismatches at 11pm</li>
            <li><span className="mark">→</span> Controller sees 2,000-line register</li>
            <li><span className="mark">→</span> Close takes 5–7 days</li>
            <li><span className="mark">→</span> Errors discovered during audit</li>
          </ul>
        </div>
        <div className="ba-card ba-after">
          <h4>✅ After</h4>
          <ul>
            <li><span className="mark">→</span> All systems connected, matching automated</li>
            <li><span className="mark">→</span> Vendor confirmations drafted by AI</li>
            <li><span className="mark">→</span> Exceptions flagged with explanations</li>
            <li><span className="mark">→</span> Controller sees 12 lines that need attention</li>
            <li><span className="mark">→</span> Close takes hours, not days</li>
            <li><span className="mark">→</span> Errors caught before sign-off</li>
          </ul>
        </div>
      </div>

      {/* ── IMPACT ── */}
      <div className="section-label">
        <span className="pill pill-impact">The Impact</span>
        <hr />
      </div>

      <h2>What Happens When the Close Gets Faster</h2>
      <p>
        When the close compresses from days to hours, it isn't just a time saving. It changes what
        your finance team can do with themselves — and what your business can do with its numbers.
      </p>

      <div className="stat-row">
        <div className="stat-card">
          <span className="num">5–7x</span>
          <span className="desc">Faster book closure for teams using connected AI workflows</span>
        </div>
        <div className="stat-card">
          <span className="num">~12</span>
          <span className="desc">Lines that need human review, down from 2,000+ in a typical close</span>
        </div>
        <div className="stat-card">
          <span className="num">30 min</span>
          <span className="desc">Time for TDS and GST reconciliation that previously took 2–3 days</span>
        </div>
      </div>

      <h3>For the Controller and CA Partner</h3>
      <p>
        Instead of reviewing everything that happened, you see only what still needs attention. The
        close stops being a burden and starts being a briefing. You go from spending the last week of
        every month buried in spreadsheets to spending 90 minutes reviewing flagged exceptions and
        signing off.
      </p>

      <h3>For the Finance Team</h3>
      <p>
        The junior accountant stops being a data-moving machine. The senior stops working at 11pm.
        The manager stops consolidating manually. The work that was always going to be done by
        someone now gets done by an agent — and the team moves to higher-value work: analysis,
        advisory, judgment calls that actually require a human.
      </p>

      <h3>For the Founder or CFO</h3>
      <p>
        Books ready before investors ask. MIS reports that don't require a 3-day scramble. A
        real-time view of cash position that doesn't depend on someone logging into four bank portals
        every Monday morning. The close stops being the reason you can't make fast decisions.
      </p>

      <div className="callout callout-blue">
        <p>
          <strong>The question to ask your team today:</strong>{" "}
          <em>
            "Where are we losing time because our data is scattered across ten different places?"
          </em>{" "}
          That is exactly where AI agents create real, measurable value — with full control staying
          with your CA or CFO.
        </p>
      </div>

      {/* ── QUESTIONS ANSWERED ── */}
      <div className="section-label">
        <span className="pill pill-questions">Questions This Answers</span>
        <hr />
      </div>

      <h2>If You Found This Page Searching For…</h2>
      <p>This blog directly answers the following questions people search for:</p>

      <div className="q-grid">
        {[
          "Why does month-end book closure take so long?",
          "How to speed up month-end close?",
          "How to reduce month-end close time?",
          "Why is my accounting team slow at closing books?",
          "Month-end reporting process for startups",
          "Financial close software for CA firms",
          "Books not ready for investors / due diligence",
          "AI tools for book closure automation",
          "How to automate reconciliation",
          "AI agents for accounting and finance operations",
        ].map((q) => (
          <div className="q-item" key={q}>
            <span className="q-icon">Q</span>
            {q}
          </div>
        ))}
      </div>
    </div>
  );
}
