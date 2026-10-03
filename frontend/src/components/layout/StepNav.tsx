interface StepAction {
  label: string;
  onClick: () => void;
}

interface StepNavProps {
  prev?: StepAction;
  next?: StepAction;
}

/**
 * Back / Next buttons. On phones the bar sticks just above the Edit/Preview
 * bar, so the Next button is always visible while you fill in a form.
 */
export default function StepNav({ prev, next }: StepNavProps) {
  return (
    <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-10 -mx-4 mt-8 flex items-center justify-between gap-3 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:border-slate-100 lg:bg-transparent lg:px-0 lg:pb-0 lg:backdrop-blur-none">
      {prev ? (
        <button
          type="button"
          onClick={prev.onClick}
          className="flex h-11 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <span aria-hidden="true">←</span> {prev.label}
        </button>
      ) : (
        <span />
      )}

      {next && (
        <button
          type="button"
          onClick={next.onClick}
          className="flex h-11 items-center gap-1.5 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          {next.label} <span aria-hidden="true">→</span>
        </button>
      )}
    </div>
  );
}
