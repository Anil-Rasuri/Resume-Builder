import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";

interface HeaderProps {
  onLoadSample: () => void;
  onReset: () => void;
  onDownload: () => void;
}

export default function Header({ onLoadSample, onReset, onDownload }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-6">
        <div className="flex min-w-0 items-center gap-1 sm:gap-4">
          <Link
            to="/"
            aria-label="Back to home"
            className="flex h-10 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </Link>

          <span className="hidden h-6 w-px bg-slate-200 sm:block" aria-hidden="true" />

          <Link to="/" aria-label="Home" className="min-w-0">
            <Logo />
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            onClick={onLoadSample}
            className="hidden items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 sm:flex"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Load sample
          </button>
          <button
            onClick={onReset}
            className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 sm:block"
          >
            Reset
          </button>
          <button
            onClick={onDownload}
            className="flex h-10 items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:px-4"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
            </svg>
            <span className="sm:hidden">PDF</span>
            <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
