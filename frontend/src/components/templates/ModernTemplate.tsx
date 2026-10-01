import type { ReactNode } from "react";
import type { TemplateProps } from "@/components/templates/types";
import { contactItems, dateRange, hasAnySkills } from "@/lib/format";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="mb-2 border-b-2 border-indigo-100 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-700">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-1 list-disc space-y-0.5 pl-5 marker:text-indigo-400">
      {items.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  );
}

function Row({ left, right }: { left: ReactNode; right?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div>{left}</div>
      {right && (
        <div className="shrink-0 text-[11px] font-medium text-indigo-700">{right}</div>
      )}
    </div>
  );
}

function SkillLine({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <p>
      <span className="font-semibold text-slate-900">{label}: </span>
      {items.join(", ")}
    </p>
  );
}

export default function ModernTemplate({ resume }: TemplateProps) {
  const { personal, experience, internships, education, projects, skills, certifications } =
    resume;
  const contact = contactItems(personal);

  return (
    <div className="font-sans text-[12px] leading-snug text-slate-700">
      <header className="border-b-4 border-indigo-600 pb-3">
        <h1 className="text-[30px] font-extrabold leading-tight text-slate-900">
          {personal.fullName || "Your Name"}
        </h1>
        {personal.jobTitle && (
          <p className="text-[14px] font-medium text-indigo-700">{personal.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="mt-2 text-[11px] text-slate-600">{contact.join("   •   ")}</p>
        )}
      </header>

      {personal.summary && (
        <Section title="Profile">
          <p>{personal.summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((e) => (
            <div key={e.id} className="mb-3 break-inside-avoid">
              <Row
                left={<span className="font-bold text-slate-900">{e.role}</span>}
                right={dateRange(e.startDate, e.current ? "Present" : e.endDate)}
              />
              <p className="text-slate-600">
                {[e.company, e.location].filter(Boolean).join(" · ")}
              </p>
              <Bullets items={e.bullets} />
            </div>
          ))}
        </Section>
      )}

      {internships.length > 0 && (
        <Section title="Internships">
          {internships.map((i) => (
            <div key={i.id} className="mb-3 break-inside-avoid">
              <Row
                left={<span className="font-bold text-slate-900">{i.role}</span>}
                right={dateRange(i.startDate, i.endDate)}
              />
              <p className="text-slate-600">
                {[i.company, i.location].filter(Boolean).join(" · ")}
              </p>
              <Bullets items={i.bullets} />
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((p) => (
            <div key={p.id} className="mb-3 break-inside-avoid">
              <Row
                left={<span className="font-bold text-slate-900">{p.name}</span>}
                right={p.link}
              />
              {p.techStack && (
                <p className="text-slate-600">
                  <span className="font-semibold text-slate-800">Tech stack:</span>{" "}
                  {p.techStack}
                </p>
              )}
              {p.description && <p>{p.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education">
          {education.map((e) => (
            <div key={e.id} className="mb-2 break-inside-avoid">
              <Row
                left={
                  <span className="font-bold text-slate-900">
                    {[e.degree, e.branch].filter(Boolean).join(" in ")}
                  </span>
                }
                right={dateRange(e.startDate, e.endDate)}
              />
              <p className="text-slate-600">
                {[e.school, e.grade].filter(Boolean).join(" · ")}
              </p>
            </div>
          ))}
        </Section>
      )}

      {hasAnySkills(skills) && (
        <Section title="Skills">
          <div className="space-y-0.5">
            <SkillLine label="Technical" items={skills.technical} />
            <SkillLine label="Soft skills" items={skills.soft} />
            <SkillLine label="Other" items={skills.other} />
          </div>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map((c) => (
            <div key={c.id} className="mb-1.5 break-inside-avoid">
              <Row
                left={
                  <span>
                    <span className="font-bold text-slate-900">{c.name}</span>
                    {c.issuer && <span className="text-slate-600"> – {c.issuer}</span>}
                  </span>
                }
                right={c.date}
              />
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}