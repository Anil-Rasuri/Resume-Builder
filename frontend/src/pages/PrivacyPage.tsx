import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { BRAND } from "@/constants/brand";

export default function PrivacyPage() {
  useDocumentTitle("Privacy Policy – Resume Builder");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: October 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Your resume data</h2>
            <p className="mt-2">
              Everything you type into the builder is saved only in your own
              browser (local storage) so you do not lose your work. It is not
              sent to or stored on our servers. Clearing your browser data or
              pressing Reset removes it.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">PDF files</h2>
            <p className="mt-2">
              PDFs are created on your device through your browser's print
              feature. We never receive a copy.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Analytics and cookies</h2>
            <p className="mt-2">
              We do not use advertising cookies. If we add privacy-friendly
              analytics in the future, this page will be updated.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
            <p className="mt-2">Questions? Email {BRAND.email}.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}