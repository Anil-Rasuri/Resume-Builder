import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-24">
        <p className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          ATS-friendly · No signup · PDF in one click
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Build a professional resume in minutes
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Fill in your details, pick one of 10 templates, watch the live preview
          and download a clean PDF that recruiters and applicant tracking
          systems can read.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/builder"
            className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
          >
            Build my resume
          </Link>
          <Link
            to="/builder?sample=1"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            See a sample resume
          </Link>
        </div>
      </div>
    </section>
  );
}
