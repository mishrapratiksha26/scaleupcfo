export const trackExploreClick = (moduleName, bookingUrl, planName) => {
  if (typeof gtag === "function") {
    const eventData = {
      module_name: moduleName,
      page_url: window.location.href,
      session_id: crypto.randomUUID(), // or reuse stored session ID
      timestamp: Date.now(),
    };

    // Only add plan_name if provided
    if (planName) {
      eventData.plan_name = planName;
    }

    gtag("event", "explore_module_click", eventData);
  }

  // Redirect to Calendly
  window.location.href = bookingUrl;
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
