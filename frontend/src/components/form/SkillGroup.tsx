import { useState, type KeyboardEvent } from "react";

interface SkillGroupProps {
  id: string;
  title: string;
  hint: string;
  placeholder: string;
  skills: string[];
  suggestions: string[];
  onChange: (skills: string[]) => void;
}

export default function SkillGroup({
  id,
  title,
  hint,
  placeholder,
  skills,
  suggestions,
  onChange,
}: SkillGroupProps) {
  const [draft, setDraft] = useState("");

  const addSkills = (raw: string) => {
    const incoming = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (incoming.length === 0) return;

    const seen = new Set(skills.map((s) => s.toLowerCase()));
    const merged = [...skills];
    for (const skill of incoming) {
      if (!seen.has(skill.toLowerCase())) {
        merged.push(skill);
        seen.add(skill.toLowerCase());
      }
    }
    onChange(merged);
    setDraft("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkills(draft);
    } else if (e.key === "Backspace" && draft === "" && skills.length > 0) {
      onChange(skills.slice(0, -1));
    }
  };

  const available = suggestions.filter(
    (s) => !skills.some((existing) => existing.toLowerCase() === s.toLowerCase())
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
      <div className="mb-3">
        <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
          {title}
        </label>
        <p className="text-xs text-slate-500">{hint}</p>
      </div>

      <div className="flex gap-2">
        <input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <button
          type="button"
          onClick={() => addSkills(draft)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {skills.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="flex items-center gap-1.5 rounded-full bg-blue-50 py-1 pl-3 pr-2 text-sm text-blue-700"
            >
              {skill}
              <button
                type="button"
                onClick={() => onChange(skills.filter((s) => s !== skill))}
                aria-label={`Remove ${skill}`}
                className="flex h-5 w-5 items-center justify-center rounded-full text-blue-500 transition hover:bg-blue-100"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {available.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {available.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addSkills(s)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}