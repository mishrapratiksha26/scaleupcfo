import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import Home from "./pages/home";
import ServicesPage from "./pages/services";
import About from "./pages/aboutus";
import AdminPage from "./pages/admin";
import PostPage from "./pages/post";
import BlogsPage from "./pages/blogs";
import BlogPostPage from "./pages/blogpost";
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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-native-services" element={<ServicesPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPostPage />} />
      </Routes>
    </Router>
  );
}