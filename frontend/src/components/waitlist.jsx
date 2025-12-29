export function WaitlistButton() {
  const openTallyForm = () => {
    if (typeof gtag === "function") {
      gtag("event", "explore_module_click", {
        module_name: "Join the waitlist",
        page_url: window.location.href,
        timestamp: Date.now(),
      });
    }

    // Open Tally modal programmatically
    if (window.Tally) {
      window.Tally.openPopup("68eGbP", {
        layout: "modal",
        width: 500,
        emojiAnimation: "none",
        autoClose: 1000,
        formEventsForwarding: true, // important!
      });
    }
  };

  return (
    <div className="flex justify-center mb-8">
      <button
        className="btn-primary inline-flex items-center gap-2"
        style={{ width: "100%", maxWidth: "300px", textAlign: "center" }}
        onClick={openTallyForm}
      >
        <span>Join the waitlist →</span>
      </button>
    </div>
  );
}