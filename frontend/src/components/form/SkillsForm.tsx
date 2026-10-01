import SkillGroup from "@/components/form/SkillGroup";
import { skillSuggestions } from "@/constants/skillSuggestions";
import { useResumeStore } from "@/store/resumeStore";
import type { SkillCategory } from "@/types/resume";

const GROUPS: {
  key: SkillCategory;
  title: string;
  hint: string;
  placeholder: string;
}[] = [
  {
    key: "technical",
    title: "Technical skills",
    hint: "Languages, frameworks, tools and technologies.",
    placeholder: "e.g. React, Python, Docker",
  },
  {
    key: "soft",
    title: "Soft skills",
    hint: "Interpersonal and workplace skills.",
    placeholder: "e.g. Communication, Leadership",
  },
  {
    key: "other",
    title: "Other skills",
    hint: "Languages spoken, hobbies, volunteering and more.",
    placeholder: "e.g. English, Public Speaking",
  },
];

export default function SkillsForm() {
  const skills = useResumeStore((s) => s.resume.skills);
  const setSkills = useResumeStore((s) => s.setSkills);

  return (
    <div className="space-y-4">
      {GROUPS.map((group) => (
        <SkillGroup
          key={group.key}
          id={`skills-${group.key}`}
          title={group.title}
          hint={group.hint}
          placeholder={group.placeholder}
          skills={skills[group.key]}
          suggestions={skillSuggestions[group.key]}
          onChange={(next) => setSkills({ ...skills, [group.key]: next })}
        />
      ))}
      <p className="text-xs text-slate-400">
        Tip: press Enter or comma to add. You can paste several skills separated by commas.
      </p>
    </div>
  );
}