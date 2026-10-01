import { useRef, useState, type ComponentType } from "react";
import { useReactToPrint } from "react-to-print";
import Header from "@/components/layout/Header";
import SectionTabs from "@/components/layout/SectionTabs";
import PersonalForm from "@/components/form/PersonalForm";
import EducationForm from "@/components/form/EducationForm";
import ExperienceForm from "@/components/form/ExperienceForm";
import InternshipsForm from "@/components/form/InternshipsForm";
import ProjectsForm from "@/components/form/ProjectsForm";
import SkillsForm from "@/components/form/SkillsForm";
import CertificationsForm from "@/components/form/CertificationsForm";
import ResumePreview from "@/components/preview/ResumePreview";
import TemplatePicker from "@/components/preview/TemplatePicker";
import { SECTIONS, type SectionId } from "@/constants/sections";
import { sampleResume } from "@/constants/sampleResume";
import { PRINT_PAGE_STYLE } from "@/lib/print";
import { useResumeStore } from "@/store/resumeStore";

const FORMS: Record<SectionId, ComponentType> = {
  personal: PersonalForm,
  education: EducationForm,
  experience: ExperienceForm,
  internships: InternshipsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  certifications: CertificationsForm,
};

export default function BuilderPage() {
  const { resume, templateId, setResume, setTemplate, reset } = useResumeStore();
  const [activeSection, setActiveSection] = useState<SectionId>("personal");

  // Changing this key remounts the form so it re-reads values from the store.
  const [formKey, setFormKey] = useState(0);

  const printRef = useRef<HTMLDivElement>(null);
  const handleDownload = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resume.personal.fullName || "My"} - Resume`,
    pageStyle: PRINT_PAGE_STYLE,
  });

  const handleLoadSample = () => {
    setResume(sampleResume);
    setFormKey((k) => k + 1);
  };

  const handleReset = () => {
    reset();
    setFormKey((k) => k + 1);
  };

  const section = SECTIONS.find((s) => s.id === activeSection) ?? SECTIONS[0];
  const ActiveForm = FORMS[activeSection];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        onDownload={() => handleDownload()}
      />

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionTabs active={activeSection} onChange={setActiveSection} />
          <h2 className="mb-1 text-lg font-semibold text-slate-900">{section.title}</h2>
          <p className="mb-5 text-sm text-slate-500">{section.description}</p>
          <ActiveForm key={`${activeSection}-${formKey}`} />
        </section>

        <section className="space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">Template</h2>
            <TemplatePicker value={templateId} onChange={setTemplate} />
          </div>

          <div className="rounded-xl bg-slate-200/70 p-3 sm:p-4">
            <ResumePreview resume={resume} templateId={templateId} printRef={printRef} />
          </div>
        </section>
      </main>
    </div>
  );
}