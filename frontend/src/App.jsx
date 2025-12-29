import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home";
import ServicesPage from "./pages/services";
import { initTallyFormTracking } from "./utils/analytics"; // import your helper

export default function App() {
useEffect(() => {
  const handleTallyEvent = (e) => {
    let data = e.data;

    // If it's a string, try to parse it
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch {
        // not JSON, ignore
      }
    }

    console.log("Listener caught:", data);

    if (data?.event === "Tally.FormSubmitted") {
      console.log("Dispatching GA4 form_completed event");
      if (typeof gtag === "function") {
        gtag("event", "form_completed", {
          module_name: data.payload.formName,
          page_url: window.location.href,
          respondent_id: data.payload.respondentId,
          created_at: data.payload.createdAt,
        });
      }
    }
  };

  window.addEventListener("message", handleTallyEvent);
  return () => window.removeEventListener("message", handleTallyEvent);
}, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </Router>
  );
}