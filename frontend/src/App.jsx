import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Products from "./components/product";
import Features from "./components/features";
import ClientsLogos from "./components/clients";
import Index from "./components/displaydashboard";
import Comparison from "./components/comparison";
import Testimonials from "./components/testimonials";
import Pricing from "./components/pricing";
import Security from "./components/security";
import CTA from "./components/cta";
import Footer from "./components/footer";
import'./marketing.css';
import './index.css';


export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Products />
      {/* <Features /> */}
      <Index />
      <Comparison />
      <Testimonials />
      <Pricing />
      <ClientsLogos/>
      {/* <Security /> */}
      <CTA />
      <Footer />
    </>
  );
}