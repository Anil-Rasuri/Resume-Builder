import type { ReactNode } from "react";
import type { Resume } from "@/types/resume";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h4 className="mb-2 font-semibold uppercase tracking-wide text-slate-900">
        {title}
      </h4>
      {children}
    </section>
  );
}

const dateRange = (start: string, end: string) =>
  [start, end].filter(Boolean).join(" – ");

export default function BasicPreview({ resume }: { resume: Resume }) {
  const {
    personal,
    experience,
    internships,
    education,
    projects,
    skills,
    certifications,
  } = resume;

  const contact = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin,
    personal.website,
  ]
    .filter(Boolean)
    .join(" · ");

  const hasSkills =
    skills.technical.length + skills.soft.length + skills.other.length > 0;

  return (
    <div className="space-y-4 rounded-lg border border-dashed border-slate-300 p-5 text-sm text-slate-700">
      <header>
        <h3 className="text-2xl font-bold text-slate-900">
          {personal.fullName || "Your Name"}
        </h3>
        {personal.jobTitle && <p className="text-blue-600">{personal.jobTitle}</p>}
        <p className="mt-1 text-slate-500">{contact || "email · phone · location"}</p>
        {personal.summary && <p className="mt-3 leading-relaxed">{personal.summary}</p>}
      </header>

      {education.length > 0 && (
        <Section title="Education">
          {education.map((e) => (
            <div key={e.id} className="mb-2">
              <p className="font-medium text-slate-900">
                {e.degree || "Degree"}
                {e.branch && ` in ${e.branch}`}
              </p>
              <p className="text-xs text-slate-500">
                {[e.school, dateRange(e.startDate, e.endDate), e.grade]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          ))}
        </Section>
      )}

      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map((e) => (
            <div key={e.id} className="mb-3">
              <p className="font-medium text-slate-900">
                {e.role || "Role"} · {e.company || "Company"}
              </p>
              <p className="text-xs text-slate-500">
                {dateRange(e.startDate, e.current ? "Present" : e.endDate)}
                {e.location ? ` · ${e.location}` : ""}
              </p>
              {e.bullets.length > 0 && (
                <ul className="mt-1 list-disc space-y-0.5 pl-5">
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {internships.length > 0 && (
        <Section title="Internships">
          {internships.map((i) => (
            <div key={i.id} className="mb-3">
              <p className="font-medium text-slate-900">
                {i.role || "Role"} · {i.company || "Company"}
              </p>
              <p className="text-xs text-slate-500">
                {dateRange(i.startDate, i.endDate)}
                {i.location ? ` · ${i.location}` : ""}
              </p>
              {i.bullets.length > 0 && (
                <ul className="mt-1 list-disc space-y-0.5 pl-5">
                  {i.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((p) => (
            <div key={p.id} className="mb-2">
              <p className="font-medium text-slate-900">
                {p.name || "Project"}
                {p.link && <span className="font-normal text-blue-600"> · {p.link}</span>}
              </p>
              {p.techStack && (
                <p className="text-xs text-slate-500">
                  <span className="font-medium">Tech stack:</span> {p.techStack}
                </p>
              )}
              {p.description && <p>{p.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {hasSkills && (
        <Section title="Skills">
          <div className="space-y-1">
            {skills.technical.length > 0 && (
              <p>
                <span className="font-medium text-slate-900">Technical: </span>
                {skills.technical.join(", ")}
              </p>
            )}
            {skills.soft.length > 0 && (
              <p>
                <span className="font-medium text-slate-900">Soft skills: </span>
                {skills.soft.join(", ")}
              </p>
            )}
            {skills.other.length > 0 && (
              <p>
                <span className="font-medium text-slate-900">Other: </span>
                {skills.other.join(", ")}
              </p>
            )}
          </div>
        </Section>
      )}

      {certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map((c) => (
            <div key={c.id} className="mb-2">
              <p className="font-medium text-slate-900">{c.name || "Certification"}</p>
              <p className="text-xs text-slate-500">
                {[c.issuer, c.date, c.link].filter(Boolean).join(" · ")}
              </p>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}