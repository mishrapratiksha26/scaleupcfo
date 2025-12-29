// src/components/CalBookingButton.jsx
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { trackExploreClick, trackDemoBooked } from "../utils/analytics";

// Global guard so we only attach the bookingSuccessful listener once
let bookingListenerAttached = false;

export default function CalBookingButton({
  title,             // text shown on the button
  paramName,         // GA4 context: which section/product this button belongs to
  planName,          // optional GA4 context: plan name
  className = "btn-primary",
  namespace = "30min",
  link = "ashish-jadhao-5s0pjh/30min",
}) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace });

      // Configure Cal.com UI
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      // Attach bookingSuccessful listener only once
      if (!bookingListenerAttached) {
        cal("on", {
          action: "bookingSuccessful",
          callback: (payload) => {
            // ✅ Only here do we log and send GA4
            console.log("[Booking Successful Event Fired]", payload);
            trackDemoBooked(paramName || title, payload, planName);
          },
        });
        bookingListenerAttached = true;
        console.log(`[Listener Attached] (waiting for bookingSuccessful events, namespace=${namespace})`);
      } else {
        console.log("[Listener Already Attached] bookingSuccessful — skipped re‑attach");
      }
    })();
  }, [namespace, paramName, planName, title]);

  return (
    <button
      className={className}
      data-cal-namespace={namespace}
      data-cal-link={link}
      data-cal-config='{"layout":"month_view"}'
      onClick={() => {
        console.log("[Click Event Triggered]", { paramName, planName, link });
        // ✅ Click event goes to GA4
        trackExploreClick(paramName || title, link, planName);
      }}
    >
      {title}
    </button>
  );
}