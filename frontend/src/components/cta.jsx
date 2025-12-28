const GMEET_BOOKING_URL = "https://calendar.app.google/68pzDLFzNKqkoAgUA";
import { trackExploreClick } from "../utils/analytics";

export default function CTA() {
  return (
    <section className="cta-final">
      <div className="container">
        <h2>Stop Firefighting Finance. Start Running It.</h2>
        <p>14 days free. All modules. No credit card. Your data or sample data—your choice. Full access to everything ScaleupCFO can do.</p>
        <button
          className="btn-primary"
          style={{ width: "100%", maxWidth: "300px" }}
          onClick={() => trackExploreClick("", GMEET_BOOKING_URL)}
        >
          Schedule Demo →
        </button>
        <p style={{marginTop: "1.5rem", fontSize: "0.95rem", opacity: 0.85}}>
          Questions? Schedule a 20-minute demo with our CFO advisory team.
        </p>
      </div>
    </section>
  );
}
