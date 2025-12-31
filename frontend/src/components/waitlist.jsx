export function WaitlistButton({ className = "" }) {
  const openTallyForm = () => {
    if (typeof gtag === "function") {
      gtag("event", "explore_module_click", {
        module_name: "Join the waitlist",
        page_url: window.location.href,
        timestamp: Date.now(),
      });
    }

    if (window.Tally) {
      window.Tally.openPopup("68eGbP", {
        layout: "modal",
        width: 500,
        emojiAnimation: "none",
        autoClose: 1000,
        formEventsForwarding: true,
      });
    }
  };

  return (
    <div className="flex justify-center mb-8">
      <button
        className={`inline-flex items-center gap-2 justify-center text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-amber-500/30 ${className}`}
        style={{ width: "100%", maxWidth: "300px", textAlign: "center" }}
        onClick={openTallyForm}
      >
        <span>Join the waitlist →</span>
      </button>
    </div>
  );
}