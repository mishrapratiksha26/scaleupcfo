// src/components/CalBookingButton.jsx
import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export default function CalBookingButton({
  title,
  className = "btn-primary",
  namespace = "30min",
  link = "ashish-jadhao-5s0pjh/30min",
}) {
  // Stable callback function
  const handleBooking = (payload) => {
    console.log("Booking confirmed:", payload);
    if (typeof gtag === "function") {
      gtag("event", "demo_booked", {
        module_name: title,
        page_url: window.location.href,
        scheduled_at: payload?.startTime,
        booking_id: payload?.uid,
      });
    }
  };

  useEffect(() => {
    let calInstance;

    (async function () {
      calInstance = await getCalApi({ namespace });

      calInstance("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });

      // Register listener once
      calInstance("on", {
        action: "bookingSuccessful",
        callback: handleBooking,
      });
    })();

    // ✅ Cleanup: remove listener when component unmounts
    return () => {
      if (calInstance) {
        calInstance("off", {
          action: "bookingSuccessful",
          callback: handleBooking,
        });
      }
    };
  }, [namespace, title]);

  return (
    <button
      className={className}
      data-cal-namespace={namespace}
      data-cal-link={link}
      data-cal-config='{"layout":"month_view"}'
      onClick={() => {
        if (typeof gtag === "function") {
          gtag("event", "explore_module_click", {
            module_name: title,
            page_url: window.location.href,
            timestamp: Date.now(),
          });
        }
      }}
    >
      {title}
    </button>
  );
}