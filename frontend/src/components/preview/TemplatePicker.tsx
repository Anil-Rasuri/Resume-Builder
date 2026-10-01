import { TEMPLATE_LIST } from "@/components/templates";
import type { TemplateId } from "@/types/resume";

interface TemplatePickerProps {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
}

export default function TemplatePicker({ value, onChange }: TemplatePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Choose a template">
      {TEMPLATE_LIST.map((t) => {
        const selected = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(t.id)}
            className={`rounded-lg border p-3 text-left transition ${
              selected
                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <p className={`text-sm font-semibold ${selected ? "text-blue-700" : "text-slate-900"}`}>
              {t.name}
            </p>
            <p className="text-xs text-slate-500">{t.description}</p>
          </button>
        );
      })}
    </div>
  );
}