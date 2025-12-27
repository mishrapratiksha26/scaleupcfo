import { ArrowRight } from "lucide-react";

export function WaitlistButton() {
  return (
    <div className="flex justify-center mb-8">
      <a
        href="#tally-open=68eGbP&tally-layout=modal&tally-width=500&tally-emoji-animation=none&tally-auto-close=1000&tally-form-events-forwarding=1"
        className="btn-primary inline-flex items-center gap-2"
        style={{width: "100%", maxWidth: "300px",textAlign: "center"}}
      >
        <span>Join the waitlist →</span>
      </a>
    </div>
  );
}
