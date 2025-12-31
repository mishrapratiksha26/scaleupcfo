import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Products from "../components/product";
import Index from "../components/displaydashboard";
import Comparison from "../components/comparison";
import Testimonials from "../components/testimonials";
import Pricing from "../components/pricing";
import ClientsLogos from "../components/clients";
import { WaitlistButton } from "../components/waitlist";
import CTA from "../components/cta";
import Footer from "../components/footer";
import '../marketing.css'
import '../index.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Testimonials />
      <Index />
      {/* <WaitlistButton /> */}
      <Products /> 
      <Comparison />
      
      <Pricing />
      <CTA />
      <Footer />
    </>
  );
}
