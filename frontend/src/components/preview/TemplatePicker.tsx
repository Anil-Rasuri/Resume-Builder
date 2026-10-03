import { TEMPLATE_LIST } from "@/components/templates";
import type { Layout } from "@/components/templates/types";
import type { TemplateId } from "@/types/resume";

interface TemplatePickerProps {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
}

function Thumb({ layout, color }: { layout: Layout; color: string }) {
  const line = "h-1 rounded-sm bg-slate-300";
  const sidebar = (
    <div className="w-1/3 rounded-sm" style={{ background: color, opacity: 0.3 }} />
  );

  return (
    <div className="flex h-16 gap-1 rounded border border-slate-200 bg-white p-1.5">
      {layout === "side-left" && sidebar}
      <div className="flex flex-1 flex-col gap-1">
        <div className="h-1.5 w-2/3 rounded-sm" style={{ background: color }} />
        <div className={line} />
        <div className={`${line} w-5/6`} />
        <div className={line} />
        <div className={`${line} w-4/6`} />
      </div>
      {layout === "side-right" && sidebar}
    </div>
  );
}

/** Swipe row on phones, grid on larger screens. */
export default function TemplatePicker({ value, onChange }: TemplatePickerProps) {
  return (
    <div
      className="-mx-1 flex snap-x gap-2.5 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:py-0 xl:grid-cols-5"
      role="radiogroup"
      aria-label="Choose a template"
    >
      {TEMPLATE_LIST.map((t) => {
        const selected = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(t.id)}
            title={t.description}
            className={`w-28 shrink-0 snap-start rounded-lg border p-2 text-left transition sm:w-auto ${
              selected
                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <Thumb layout={t.layout} color={t.accent} />
            <p
              className={`mt-1.5 text-xs font-semibold ${
                selected ? "text-blue-700" : "text-slate-900"
              }`}
            >
              {t.name}
            </p>
          </button>
        );
      })}
    </div>
  );
}
