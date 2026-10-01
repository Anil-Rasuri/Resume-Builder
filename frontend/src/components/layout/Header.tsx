interface HeaderProps {
  onLoadSample: () => void;
  onReset: () => void;
  onDownload: () => void;
}

export default function Header({ onLoadSample, onReset, onDownload }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            R
          </div>
          <span className="text-lg font-semibold text-slate-900">Resume Builder</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={onLoadSample}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Load sample
          </button>
          <button
            onClick={onReset}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Reset
          </button>
          <button
            onClick={onDownload}
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Download PDF
          </button>
        </div>
      </div>
    </header>
  );
}