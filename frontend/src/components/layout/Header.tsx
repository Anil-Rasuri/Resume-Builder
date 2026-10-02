import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";

interface HeaderProps {
  onLoadSample: () => void;
  onReset: () => void;
  onDownload: () => void;
}

export default function Header({ onLoadSample, onReset, onDownload }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            aria-label="Back to home"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </Link>

          <span className="hidden h-6 w-px bg-slate-200 sm:block" aria-hidden="true" />

          <Link to="/" aria-label="Home">
            <Logo />
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={onLoadSample}
            className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 sm:block"
          >
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
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>
    </header>
  );
}