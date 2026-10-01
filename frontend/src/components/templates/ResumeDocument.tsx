import type { ReactNode } from "react";
import type { TemplateProps } from "@/components/templates/types";
import { contactItems, dateRange, hasAnySkills, type ContactItem } from "@/lib/format";
import { displayUrl, toHref } from "@/lib/links";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rt-section">
      <h2 className="rt-heading">{title}</h2>
      {children}
    </section>
  );
}

function ExtLink({ value }: { value: string }) {
  return (
    <a href={toHref(value)} target="_blank" rel="noopener noreferrer">
      {displayUrl(value)}
    </a>
  );
}

function Contact({ items, separator }: { items: ContactItem[]; separator: string }) {
  return (
    <p className="rt-contact">
      {items.map((c, i) => (
        <span key={i} className="rt-ci">
          {i > 0 && <span className="rt-sep">{separator}</span>}
          {c.href ? (
            <a href={c.href} target="_blank" rel="noopener noreferrer">
              {c.label}
            </a>
          ) : (
            c.label
          )}
        </span>
      ))}
    </p>
  );
}

interface ItemProps {
  title: string;
  meta?: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}

function Item({ title, meta, sub, children }: ItemProps) {
  return (
    <div className="rt-item">
      <div className="rt-row">
        <span className="rt-title">{title}</span>
        {meta && <span className="rt-meta">{meta}</span>}
      </div>
      {sub && <p className="rt-sub">{sub}</p>}
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="rt-list">
      {items.map((b, i) => (
        <li key={i} className="rt-text">
          {b}
        </li>
      ))}
    </ul>
  );
}

function SkillLine({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <p className="rt-skill rt-text">
      <b>{label}: </b>
      {items.join(", ")}
    </p>
  );
}

export default function ResumeDocument({ resume, template }: TemplateProps) {
  const { personal, experience, internships, education, projects, skills, certifications } =
    resume;
  const { id, layout, headerIn, separator, summaryTitle } = template;
  const contact = contactItems(personal);
  const isSingle = layout === "single";

  const header = (
    <header className="rt-header">
      <h1 className="rt-name">{personal.fullName || "Your Name"}</h1>
      {personal.jobTitle && <p className="rt-jobtitle">{personal.jobTitle}</p>}
      {isSingle && contact.length > 0 && <Contact items={contact} separator={separator} />}
    </header>
  );

  const summary = personal.summary ? (
    <Section title={summaryTitle}>
      <p className="rt-text">{personal.summary}</p>
    </Section>
  ) : null;

  const educationBlock =
    education.length > 0 ? (
      <Section title="Education">
        {education.map((e) => (
          <Item
            key={e.id}
            title={[e.degree, e.branch].filter(Boolean).join(" in ")}
            meta={dateRange(e.startDate, e.endDate)}
            sub={[e.school, e.grade].filter(Boolean).join(" | ")}
          />
        ))}
      </Section>
    ) : null;

  const skillsBlock = hasAnySkills(skills) ? (
    <Section title="Skills">
      <SkillLine label="Technical" items={skills.technical} />
      <SkillLine label="Soft skills" items={skills.soft} />
      <SkillLine label="Other" items={skills.other} />
    </Section>
  ) : null;

  const projectsBlock =
    projects.length > 0 ? (
      <Section title="Projects">
        {projects.map((p) => (
          <Item
            key={p.id}
            title={p.name}
            meta={p.link ? <ExtLink value={p.link} /> : undefined}
            sub={
              p.techStack ? (
                <>
                  <b>Tech stack:</b> {p.techStack}
                </>
              ) : undefined
            }
          >
            {p.description && <p className="rt-text">{p.description}</p>}
          </Item>
        ))}
      </Section>
    ) : null;

  const experienceBlock =
    experience.length > 0 ? (
      <Section title="Experience">
        {experience.map((e) => (
          <Item
            key={e.id}
            title={e.role}
            meta={dateRange(e.startDate, e.current ? "Present" : e.endDate)}
            sub={[e.company, e.location].filter(Boolean).join(", ")}
          >
            <Bullets items={e.bullets} />
          </Item>
        ))}
      </Section>
    ) : null;

  const internshipsBlock =
    internships.length > 0 ? (
      <Section title="Internships">
        {internships.map((i) => (
          <Item
            key={i.id}
            title={i.role}
            meta={dateRange(i.startDate, i.endDate)}
            sub={[i.company, i.location].filter(Boolean).join(", ")}
          >
            <Bullets items={i.bullets} />
          </Item>
        ))}
      </Section>
    ) : null;

  const certificationsBlock =
    certifications.length > 0 ? (
      <Section title="Certifications">
        {certifications.map((c) => (
          <Item
            key={c.id}
            title={[c.name, c.issuer].filter(Boolean).join(" – ")}
            meta={c.date}
            sub={c.link ? <ExtLink value={c.link} /> : undefined}
          />
        ))}
      </Section>
    ) : null;

  const className = `rt rt-${id}`;

  // Order: personal, summary, education, skills, projects, experience, internships, certifications
  if (isSingle) {
    return (
      <div className={className}>
        {header}
        {summary}
        {educationBlock}
        {skillsBlock}
        {projectsBlock}
        {experienceBlock}
        {internshipsBlock}
        {certificationsBlock}
      </div>
    );
  }

  const side = (
    <aside className="rt-side">
      {contact.length > 0 && (
        <Section title="Contact">
          <Contact items={contact} separator="" />
        </Section>
      )}
      {educationBlock}
      {skillsBlock}
      {certificationsBlock}
    </aside>
  );

  const main = (
    <div className="rt-main">
      {headerIn === "main" && header}
      {summary}
      {projectsBlock}
      {experienceBlock}
      {internshipsBlock}
    </div>
  );

  return (
    <div className={className}>
      {headerIn === "top" && header}
      <div className={`rt-cols ${layout === "side-left" ? "rt-left" : "rt-right"}`}>
        {layout === "side-left" ? (
          <>
            {side}
            {main}
          </>
        ) : (
          <>
            {main}
            {side}
          </>
        )}
      </div>
    </div>
  );
}