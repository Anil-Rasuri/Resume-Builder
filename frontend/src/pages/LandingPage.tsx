import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Navbar from "@/components/landing/Navbar";
import TemplatesShowcase from "@/components/landing/TemplatesShowcase";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function LandingPage() {
  useDocumentTitle("Rezuvo – Free ATS-Friendly Resume Builder");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <TemplatesShowcase />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}