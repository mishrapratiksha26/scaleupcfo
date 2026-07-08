import { Helmet } from "react-helmet-async";
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
import PostsGrid from "../components/PostsGrid";
import Footer from "../components/footer";
import '../marketing.css'
import '../index.css';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>AI Bookkeeping for Indian Founders — Books Closed by Day 5 | ScaleupCFO</title>
        <meta
          name="description"
          content="AI-native bookkeeping for Indian D2C and mid-market companies. Books closed by day 5. CA reviewer sign-off. 50–80% lower cost than top-20 CA firms."
        />
        <link rel="canonical" href="https://scaleupcfo.in/" />
        <meta property="og:title" content="AI Bookkeeping for Indian Founders — Books Closed by Day 5 | ScaleupCFO" />
        <meta
          property="og:description"
          content="AI agents do the work. Chartered Accountants sign off. Books closed by day 5. From ₹2,499/mo."
        />
        <meta property="og:url" content="https://scaleupcfo.in/" />
      </Helmet>
      <Navbar />
      <Hero />
      <Testimonials />
      <Index />
      {/* <WaitlistButton /> */}
      <Products /> 
      <Comparison />
      
      <Pricing />
      <PostsGrid limit={6} heading="Insights from the founder" />
      <CTA />
      <Footer />
    </>
  );
}
