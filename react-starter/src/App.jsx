import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Products from "./components/product";
import Features from "./components/features";
import Dashboard from "./components/dashboard";
import Comparison from "./components/comparison";
import Testimonials from "./components/testimonials";
import Pricing from "./components/pricing";
import Security from "./components/security";
import CTA from "./components/cta";
import Footer from "./components/footer";
import './index.css';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Products />
      <Features />
      <Dashboard />
      <Comparison />
      <Testimonials />
      <Pricing />
      <Security />
      <CTA />
      <Footer />
    </>
  );
}