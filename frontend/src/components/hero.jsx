import CalBookingButton from "./DemoBookingButton";

export default function Hero() {
  return (
    <section className="hero">
      <h1>The AI-Native Finance Operations</h1>
      <p className="hero-subtitle">
        Leave manual busywork in the past. All automated.<br />
        AI agents + certified accountants = strategic finance at scale.
      </p>
      <p className="hero-meta">
        Trusted by 20+ CEOs/Founders across India, UAE, US & Europe
      </p>

      <div className="cta-buttons">
        <CalBookingButton
          title="Get Started Free"
          className="btn-primary"
          module_name="Hero Section CTA" 
        />

        <button className="btn-secondary">Watch Demo (5 min)</button>
      </div>
    </section>
  );
}