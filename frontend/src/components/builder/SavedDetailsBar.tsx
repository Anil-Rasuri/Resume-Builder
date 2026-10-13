import { useEffect, useState } from "react";

interface SavedDetailsBarProps {
  /** true when there is something in the form worth saving */
  canSave: boolean;
  /** true when the form is empty and saved details exist: show a gentle nudge */
  highlightFill: boolean;
  savedAt: string | null;
  onSave: () => void;
  onFill: () => void;
  onForget: () => void;
}

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

export default function SavedDetailsBar({
  canSave,
  highlightFill,
  savedAt,
  onSave,
  onFill,
  onForget,
}: SavedDetailsBarProps) {
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (!justSaved) return;
    const t = window.setTimeout(() => setJustSaved(false), 2200);
    return () => window.clearTimeout(t);
  }, [justSaved]);

  const handleSave = () => {
    onSave();
    setJustSaved(true);
  };

  return (
    <div
      className={`mb-5 rounded-xl border p-3 ${
        highlightFill ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-slate-50"
      }`}
    >
      {highlightFill && (
        <p className="mb-2 text-sm font-medium text-slate-800">
          Welcome back! Tap <strong>My details</strong> to fill in your saved information.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={!canSave}
          className={`h-10 rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
            justSaved
              ? "bg-green-600 text-white"
              : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
          }`}
        >
          {justSaved ? "Saved ✓" : "Save my details"}
        </button>

        <button
          type="button"
          onClick={onFill}
          disabled={!savedAt}
          className={`h-10 rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
            highlightFill
              ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
              : "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
          }`}
        >
          My details
        </button>

        {savedAt && (
          <button
            type="button"
            onClick={onForget}
            className="h-10 px-2 text-xs font-medium text-slate-500 underline-offset-2 hover:text-red-600 hover:underline"
          >
            Delete saved
          </button>
        )}
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {savedAt
          ? `Saved on this device · ${formatDate(savedAt)}. Only you can see it.`
          : "Save once, then fill the form with one tap next time. It stays on this device only."}
      </p>
    </div>
  );
}
