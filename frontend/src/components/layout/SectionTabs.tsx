import { SECTIONS, type SectionId } from "@/constants/sections";

interface SectionTabsProps {
  active: SectionId;
  onChange: (id: SectionId) => void;
}

export default function SectionTabs({ active, onChange }: SectionTabsProps) {
  return (
    <nav
      aria-label="Resume sections"
      className="mb-5 flex gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1"
    >
      {SECTIONS.map((section) => {
        const isActive = section.id === active;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onChange(section.id)}
            aria-current={isActive ? "page" : undefined}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {section.label}
          </button>
        );
      })}
    </nav>
  );
}