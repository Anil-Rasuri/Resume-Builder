import type { ReactElement } from "react";

export type MobileView = "edit" | "preview";

interface MobileTabsProps {
  value: MobileView;
  onChange: (view: MobileView) => void;
}

const EditIcon = (): ReactElement => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
);

const EyeIcon = (): ReactElement => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TABS: { id: MobileView; label: string; Icon: () => ReactElement }[] = [
  { id: "edit", label: "Edit", Icon: EditIcon },
  { id: "preview", label: "Preview", Icon: EyeIcon },
];

export default function MobileTabs({ value, onChange }: MobileTabsProps) {
  return (
    <nav
      aria-label="Switch between editing and preview"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden"
    >
      <div className="mx-auto flex max-w-md gap-1 rounded-xl bg-slate-100 p-1">
        {TABS.map(({ id, label, Icon }) => {
          const active = id === value;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-current={active ? "page" : undefined}
              className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${
                active ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"
              }`}
            >
              <Icon />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
