import type { ReactElement } from "react";

interface SampleBannerProps {
  /** true: the sample is on screen. false: the form is empty. */
  isSample: boolean;
  onLoadSample: () => void;
  onStartFresh: () => void;
}

const EyeIcon = (): ReactElement => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function SampleBanner({ isSample, onLoadSample, onStartFresh }: SampleBannerProps) {
  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
        isSample ? "border-amber-200 bg-amber-50" : "border-blue-200 bg-blue-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            isSample ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
          }`}
        >
          <EyeIcon />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {isSample ? "You're viewing a sample resume" : "Want to see how it will look?"}
          </p>
          <p className="mt-0.5 text-sm text-slate-600">
            {isSample
              ? "Edit any field to make it yours, or start again with a blank form."
              : "Load a sample resume to try the templates. You can clear it any time."}
          </p>
        </div>
      </div>

      {isSample ? (
        <button
          type="button"
          onClick={onStartFresh}
          className="h-11 shrink-0 rounded-lg border border-amber-300 bg-white px-4 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 sm:h-10"
        >
          Start with my own details
        </button>
      ) : (
        <button
          type="button"
          onClick={onLoadSample}
          className="h-11 shrink-0 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:h-10"
        >
          Load sample resume
        </button>
      )}
    </div>
  );
}
