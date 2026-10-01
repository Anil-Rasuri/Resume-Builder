import type { ReactNode } from "react";
import type { TemplateProps } from "@/components/templates/types";
import { contactItems, dateRange, hasAnySkills } from "@/lib/format";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-4">
      <h2 className="mb-2 border-b border-gray-800 pb-0.5 text-[12px] font-bold uppercase tracking-wider text-gray-900">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-1 list-disc space-y-0.5 pl-5">
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
      {right && <div className="shrink-0 text-[11px] text-gray-600">{right}</div>}
    </div>
  );
}

export default function ClassicTemplate({ resume }: TemplateProps) {
  const { personal, experience, internships, education, projects, skills, certifications } =
    resume;
  const contact = contactItems(personal);

  return (
    <div className="font-sans text-[12px] leading-snug text-gray-800">
      <header className="text-center">
        <h1 className="text-[26px] font-bold uppercase tracking-wide text-gray-900">
          {personal.fullName || "Your Name"}
        </h1>
        {personal.jobTitle && (
          <p className="mt-0.5 text-[13px] text-gray-700">{personal.jobTitle}</p>
        )}
        {contact.length > 0 && (
          <p className="mt-1 text-[11px] text-gray-600">{contact.join("  |  ")}</p>
        )}
      </header>

      {personal.summary && (
        <Section title="Summary">
          <p>{personal.summary}</p>
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((e) => (
            <div key={e.id} className="mb-2.5 break-inside-avoid">
              <Row
                left={<span className="font-semibold text-gray-900">{e.role}</span>}
                right={dateRange(e.startDate, e.current ? "Present" : e.endDate)}
              />
              <p className="italic text-gray-700">
                {[e.company, e.location].filter(Boolean).join(", ")}
              </p>
              <Bullets items={e.bullets} />
            </div>
          ))}
        </Section>
      )}

      {internships.length > 0 && (
        <Section title="Internships">
          {internships.map((i) => (
            <div key={i.id} className="mb-2.5 break-inside-avoid">
              <Row
                left={<span className="font-semibold text-gray-900">{i.role}</span>}
                right={dateRange(i.startDate, i.endDate)}
              />
              <p className="italic text-gray-700">
                {[i.company, i.location].filter(Boolean).join(", ")}
              </p>
              <Bullets items={i.bullets} />
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((p) => (
            <div key={p.id} className="mb-2.5 break-inside-avoid">
              <Row
                left={<span className="font-semibold text-gray-900">{p.name}</span>}
                right={p.link}
              />
              {p.techStack && (
                <p className="text-gray-700">
                  <span className="font-medium">Tech stack:</span> {p.techStack}
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
                  <span className="font-semibold text-gray-900">
                    {[e.degree, e.branch].filter(Boolean).join(" in ")}
                  </span>
                }
                right={dateRange(e.startDate, e.endDate)}
              />
              <p className="text-gray-700">
                {[e.school, e.grade].filter(Boolean).join("  |  ")}
              </p>
            </div>
          ))}
        </Section>
      )}

      {hasAnySkills(skills) && (
        <Section title="Skills">
          <div className="space-y-0.5">
            {skills.technical.length > 0 && (
              <p>
                <span className="font-semibold text-gray-900">Technical: </span>
                {skills.technical.join(", ")}
              </p>
            )}
            {skills.soft.length > 0 && (
              <p>
                <span className="font-semibold text-gray-900">Soft skills: </span>
                {skills.soft.join(", ")}
              </p>
            )}
            {skills.other.length > 0 && (
              <p>
                <span className="font-semibold text-gray-900">Other: </span>
                {skills.other.join(", ")}
              </p>
            )}
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
                    <span className="font-semibold text-gray-900">{c.name}</span>
                    {c.issuer && <span className="text-gray-700"> – {c.issuer}</span>}
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