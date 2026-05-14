// Lekha — site motion. Plain JS, no deps.
// 1) reveal-on-scroll  2) animated counters  3) timeline progression
//    4) pricing toggle  5) live agent ticker fill
(function () {
  "use strict";

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ───────────────────────── 1. Reveal-on-scroll ─────────────────────────
  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      revealItems.forEach(el => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      revealItems.forEach(el => io.observe(el));
    }
  }

  // ───────────────────────── 2. Animated counters ────────────────────────
  // Pattern: <span class="counter" data-counter="248" data-prefix="₹" data-suffix=" Cr">0</span>
  // Will count from 0 → target over ~1500ms once visible.
  const counters = document.querySelectorAll(".counter[data-counter]");
  function runCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const dur = parseInt(el.dataset.dur || "1400", 10);
    if (reduce) { el.textContent = prefix + target.toFixed(decimals) + suffix; return; }
    const start = performance.now();
    const isInt = decimals === 0;
    function frame(t) {
      const p = Math.min(1, (t - start) / dur);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - p, 3);
      const v = target * eased;
      el.textContent = prefix + (isInt ? Math.round(v).toLocaleString("en-IN") : v.toFixed(decimals)) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (counters.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            runCounter(e.target);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(el => io.observe(el));
    }
  }

  // ───────────────────────── 3. Timeline progression ─────────────────────
  // Days light up sequentially with a filling axis.
  const tl = document.querySelector(".timeline");
  if (tl) {
    const axisFill = tl.querySelector(".axis-fill");
    const days = tl.querySelectorAll(".day");
    function light() {
      days.forEach((d, i) => {
        setTimeout(() => d.classList.add("lit"), 250 + i * 320);
      });
      if (axisFill) {
        setTimeout(() => { axisFill.style.width = "calc(100% - 48px)"; }, 250);
      }
    }
    if (reduce) {
      days.forEach(d => d.classList.add("lit"));
      if (axisFill) axisFill.style.width = "calc(100% - 48px)";
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            light();
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      io.observe(tl);
    }
  }

  // ───────────────────────── 4. Pricing toggle ───────────────────────────
  const toggle = document.querySelector(".toggle");
  if (toggle) {
    const opts = toggle.querySelectorAll(".opt");
    const ind = toggle.querySelector(".indicator");
    function move(target) {
      if (!ind) return;
      const tRect = toggle.getBoundingClientRect();
      const oRect = target.getBoundingClientRect();
      ind.style.width = oRect.width + "px";
      ind.style.transform = `translateX(${oRect.left - tRect.left - 4}px)`;
    }
    function activate(target) {
      opts.forEach(o => o.classList.toggle("active", o === target));
      move(target);
      // Update displayed prices
      const period = target.dataset.period; // "monthly" or "annual"
      document.querySelectorAll("[data-price-monthly]").forEach(el => {
        const m = el.dataset.priceMonthly;
        const a = el.dataset.priceAnnual;
        el.textContent = period === "annual" ? a : m;
      });
      document.querySelectorAll("[data-billing-label]").forEach(el => {
        el.textContent = period === "annual" ? "/ mo, billed annually" : "/ month";
      });
    }
    const initial = toggle.querySelector(".opt.active") || opts[0];
    activate(initial);
    requestAnimationFrame(() => move(initial)); // recalc after fonts settle
    opts.forEach(o => o.addEventListener("click", () => activate(o)));
    window.addEventListener("resize", () => {
      const a = toggle.querySelector(".opt.active");
      if (a) move(a);
    });
  }

  // ───────────────────────── 5. Hero stat re-counter on scroll back ──────
  // Re-trigger counters in the stat-strip when it re-enters from below.
  const stripCounters = document.querySelectorAll(".stat-strip .counter");
  if (stripCounters.length && !reduce && "IntersectionObserver" in window) {
    const seen = new WeakSet();
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !seen.has(e.target)) {
          seen.add(e.target);
        }
      });
    }, { threshold: 0.4 });
    stripCounters.forEach(el => io.observe(el));
  }

  // ───────────────────────── 6. Hero — cursor spotlight ──────────────────
  const hero = document.querySelector(".hero");
  if (hero && !reduce) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      hero.style.setProperty("--mx", mx + "%");
      hero.style.setProperty("--my", my + "%");
    });
  }

  // ───────────────────────── 7. Click-spawn agent pills ──────────────────
  if (hero && !reduce) {
    const MESSAGES = [
      "₹2.4L matched ✓",
      "GST 2B reconciled",
      "194Q · classified",
      "194J · classified",
      "Vendor PAN verified",
      "Bank statement parsed",
      "Variance flagged ↗",
      "Audit trail logged",
      "₹38.2L ITC matched",
      "26AS pulled",
      "Razorpay netted",
      "Shopify payout matched",
      "Exception drafted",
      "Contra entry surfaced",
    ];
    hero.addEventListener("click", (e) => {
      // Don't spawn on interactive elements
      if (e.target.closest("a, button, input, .ticker, .live-close, .stat-strip")) return;
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const pill = document.createElement("div");
      pill.className = "spawn-pill";
      pill.style.left = x + "px";
      pill.style.top = y + "px";
      pill.textContent = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
      hero.appendChild(pill);
      setTimeout(() => pill.remove(), 1800);
    });

    // Esc clears all spawned pills
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hero.querySelectorAll(".spawn-pill").forEach((p) => p.remove());
      }
    });
  }

  // ───────────────────────── 8. Magnetic CTAs ────────────────────────────
  if (!reduce) {
    document.querySelectorAll(".btn-magnetic").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + (x * 0.18).toFixed(1) + "px," + (y * 0.30).toFixed(1) + "px)";
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  // ───────────────────────── 9. Live Close demo widget ───────────────────
  const lc = document.querySelector(".live-close");
  if (lc) {
    const btn = lc.querySelector(".lc-button");
    const tasks = Array.from(lc.querySelectorAll(".lc-task"));
    const bar = lc.querySelector(".lc-progress .bar");
    const labelEl = btn.querySelector(".lc-button-label");

    // Each task gets a 'starting' meta and final 'done' meta.
    const SCRIPT = [
      { start: "ingesting…",   done: "2,481 entries"   },
      { start: "matching…",    done: "82.4% auto",     confetti: ["GST 2B ✓", "Bank ✓", "Razorpay ✓"] },
      { start: "classifying…", done: "12 exceptions",  confetti: ["194Q", "194J", "194C"] },
      { start: "reviewing…",   done: "142 approved"    },
      { start: "delivering…",  done: "audit-ready ✓"   },
    ];

    function reset() {
      tasks.forEach((t) => {
        t.classList.remove("active", "done");
        const meta = t.querySelector(".meta");
        if (meta) meta.textContent = "queued";
      });
      bar.style.width = "0%";
    }

    function spawnConfetti(taskEl, badges) {
      if (reduce || !badges) return;
      const taskR = taskEl.getBoundingClientRect();
      const lcR = lc.getBoundingClientRect();
      badges.forEach((text, i) => {
        setTimeout(() => {
          const c = document.createElement("div");
          c.className = "lc-confetti";
          c.textContent = text;
          c.style.left = (taskR.left - lcR.left + 60 + i * 60) + "px";
          c.style.top  = (taskR.top  - lcR.top  + 10) + "px";
          lc.appendChild(c);
          setTimeout(() => c.remove(), 1500);
        }, i * 120);
      });
    }

    function run() {
      reset();
      btn.classList.remove("done");
      btn.classList.add("running");
      if (labelEl) labelEl.textContent = "Closing books…";

      let cursor = 0;
      const STEP_MS = 900;
      SCRIPT.forEach((s, i) => {
        // start step
        setTimeout(() => {
          tasks[i].classList.add("active");
          const meta = tasks[i].querySelector(".meta");
          if (meta) meta.textContent = s.start;
          if (s.confetti) spawnConfetti(tasks[i], s.confetti);
        }, cursor);
        // complete step
        setTimeout(() => {
          tasks[i].classList.remove("active");
          tasks[i].classList.add("done");
          const meta = tasks[i].querySelector(".meta");
          if (meta) meta.textContent = s.done;
          bar.style.width = ((i + 1) / SCRIPT.length * 100) + "%";
        }, cursor + STEP_MS);
        cursor += STEP_MS;
      });

      // Done state
      setTimeout(() => {
        btn.classList.remove("running");
        btn.classList.add("done");
        if (labelEl) labelEl.textContent = "Books closed · run again";
      }, cursor + 200);
    }

    btn.addEventListener("click", run);

    // Auto-play once on first view to advertise interactivity
    if (!reduce && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(run, 1400);
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.35 });
      io.observe(lc);
    }
  }
})();
