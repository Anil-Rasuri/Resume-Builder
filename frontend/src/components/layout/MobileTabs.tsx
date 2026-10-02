export type MobileView = "edit" | "preview";

interface MobileTabsProps {
  value: MobileView;
  onChange: (view: MobileView) => void;
}

const TABS: { id: MobileView; label: string }[] = [
  { id: "edit", label: "Edit" },
  { id: "preview", label: "Preview" },
];

export default function MobileTabs({ value, onChange }: MobileTabsProps) {
  return (
    <nav
      aria-label="Switch between editing and preview"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white p-2 lg:hidden"
    >
      <div className="mx-auto flex max-w-md gap-1 rounded-lg bg-slate-100 p-1">
        {TABS.map((tab) => {
          const active = tab.id === value;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              aria-current={active ? "page" : undefined}
              className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
                active ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}