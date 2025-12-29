// src/utils/analytics.js

// Dedup sets and counters
const seenClicks = new Set();
const seenBookings = new Set();
let clickFireCount = 0;
let bookingFireCount = 0;

/**
 * Track a CTA click (button pressed before opening booking).
 * Deduplicates per unique (paramName + planName + bookingUrl) combo.
 */
export const trackExploreClick = (paramName, bookingUrl, planName) => {
  const key = `${paramName}|${planName || ""}|${bookingUrl}`;

  // Increment counter for visibility
  clickFireCount++;
  console.log(`[Explore Click Attempt] Count=${clickFireCount}, Key=${key}`);

  if (seenClicks.has(key)) {
    console.log(`[Duplicate Click Skipped] Key=${key}`);
    return;
  }
  seenClicks.add(key);

  if (typeof gtag === "function") {
    const eventData = {
      // carry section context
      param_name: paramName,
      page_url: window.location.href,
      timestamp: Date.now(),
    };
    if (planName) eventData.plan_name = planName;

    console.log("[Explore Click Fired]", eventData);
    gtag("event", "explore_module_click", eventData);
  }
};

/**
 * Track a successful booking (Cal.com bookingSuccessful payload).
 * Deduplicates by booking_id (payload.uid).
 */
export const trackDemoBooked = (paramName, payload, planName) => {
  const bookingId = payload?.uid || `no-uid-${Date.now()}`;

  // Increment counter for visibility
  bookingFireCount++;
  console.log(
    `[Demo Booked Attempt] Count=${bookingFireCount}, BookingID=${bookingId}, Param=${paramName}`
  );

  if (seenBookings.has(bookingId)) {
    console.log(`[Duplicate Booking Skipped] BookingID=${bookingId}`);
    return;
  }
  seenBookings.add(bookingId);

  if (typeof gtag === "function") {
    const eventData = {
      // carry section context
      param_name: paramName,
      page_url: window.location.href,
      scheduled_at: payload?.startTime,
      booking_id: bookingId,
      timestamp: Date.now(),
    };
    if (planName) eventData.plan_name = planName;

    console.log("[Demo Booked Fired]", eventData);
    gtag("event", "demo_booked", eventData);
  }
};

/**
 * Optional: reset dedup sets (e.g., on route change or new session).
 */
export const resetAnalyticsDedup = () => {
  seenClicks.clear();
  seenBookings.clear();
  console.log("[Analytics Dedup Reset]");
};

// / NEW: listen for Tally form submission events
export const initTallyFormTracking = () => {
  const handleTallyEvent = (e) => {
    console.log("Message received:", e.data);
    if (e.data?.event === "Tally.FormSubmitted") {
      console.log("Dispatching GA4 form_completed event");

      if (typeof gtag === "function") {
        gtag("event", "form_completed", {
          module_name: "Join the waitlist",
          page_url: window.location.href,
          timestamp: Date.now(),
        });
      }
    }
  };

  window.addEventListener("message", handleTallyEvent);

  // optional cleanup if you call this inside a React effect
  return () => window.removeEventListener("message", handleTallyEvent);
};
