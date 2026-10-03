import { useEffect, useRef } from "react";
import { SECTIONS, type SectionId } from "@/constants/sections";

interface SectionTabsProps {
  active: SectionId;
  onChange: (id: SectionId) => void;
}

export default function SectionTabs({ active, onChange }: SectionTabsProps) {
  const refs = useRef<Partial<Record<SectionId, HTMLButtonElement | null>>>({});

  // Keep the active tab visible when moving with the Back / Next buttons.
  useEffect(() => {
    refs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  return (
    <nav
      aria-label="Resume sections"
      className="mb-5 flex max-w-full gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {SECTIONS.map((section, i) => {
        const isActive = section.id === active;
        return (
          <button
            key={section.id}
            ref={(el) => {
              refs.current[section.id] = el;
            }}
            type="button"
            onClick={() => onChange(section.id)}
            aria-current={isActive ? "page" : undefined}
            className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-white text-blue-700 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                isActive ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
              }`}
            >
              {i + 1}
            </span>
            {section.label}
          </button>
        );
      })}
    </nav>
  );
}
