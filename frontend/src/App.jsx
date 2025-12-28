import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/home";
import ServicesPage from "./pages/services";
import { initTallyFormTracking } from "./utils/analytics"; // import your helper

export default function App() {
  useEffect(() => {
    // set up the listener once when App mounts
    const cleanup = initTallyFormTracking();
    return cleanup; // remove listener when App unmounts
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