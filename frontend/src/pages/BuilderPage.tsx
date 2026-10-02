import { useEffect, useRef, useState, type ComponentType } from "react";
import { useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Header from "@/components/layout/Header";
import MobileTabs, { type MobileView } from "@/components/layout/MobileTabs";
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
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { SECTIONS, type SectionId } from "@/constants/sections";
import { sampleResume } from "@/constants/sampleResume";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { PRINT_PAGE_STYLE } from "@/lib/print";
import { useResumeStore } from "@/store/resumeStore";

const FORMS: Record<SectionId, ComponentType> = {
  personal: PersonalForm,
  education: EducationForm,
  skills: SkillsForm,
  projects: ProjectsForm,
  experience: ExperienceForm,
  internships: InternshipsForm,
  certifications: CertificationsForm,
};

export default function BuilderPage() {
  useDocumentTitle("Rezuvo – Create your resume");

  const { resume, templateId, setResume, setTemplate, reset } = useResumeStore();
  const [activeSection, setActiveSection] = useState<SectionId>("personal");
  const [mobileView, setMobileView] = useState<MobileView>("edit");
  const [resetOpen, setResetOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Changing this key remounts the form so it re-reads values from the store.
  const [formKey, setFormKey] = useState(0);

  const printRef = useRef<HTMLDivElement>(null);
  const print = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${resume.personal.fullName || "My"} - Resume`,
    pageStyle: PRINT_PAGE_STYLE,
  });

  const loadSample = () => {
    setResume(sampleResume);
    setFormKey((k) => k + 1);
  };

  // "See an example" on the landing page links here with ?sample=1
  useEffect(() => {
    if (searchParams.get("sample") === "1") {
      loadSample();
      setSearchParams({}, { replace: true });
      if (!isDesktop) setMobileView("preview");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmReset = () => {
    reset();
    setFormKey((k) => k + 1);
    setResetOpen(false);
  };

  const handleDownload = () => {
    // On phones the preview may be hidden: show it first, then print.
    if (!isDesktop && mobileView !== "preview") {
      setMobileView("preview");
      window.setTimeout(() => print(), 400);
      return;
    }
    print();
  };

  const section = SECTIONS.find((s) => s.id === activeSection) ?? SECTIONS[0];
  const ActiveForm = FORMS[activeSection];

  const showForm = isDesktop || mobileView === "edit";
  const showPreview = isDesktop || mobileView === "preview";

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        onLoadSample={loadSample}
        onReset={() => setResetOpen(true)}
        onDownload={handleDownload}
      />

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 pb-24 sm:px-6 lg:grid-cols-2 lg:pb-6">
        {showForm && (
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            {/* Phone-only toolbar (the header hides these buttons on small screens) */}
            <div className="mb-4 flex gap-2 sm:hidden">
              <button
                onClick={loadSample}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                Load sample
              </button>
              <button
                onClick={() => setResetOpen(true)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600"
              >
                Reset
              </button>
            </div>

            <SectionTabs active={activeSection} onChange={setActiveSection} />
            <h2 className="mb-1 text-lg font-semibold text-slate-900">{section.title}</h2>
            <p className="mb-5 text-sm text-slate-500">{section.description}</p>
            <ActiveForm key={`${activeSection}-${formKey}`} />
          </section>
        )}

        {showPreview && (
          <section className="space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-sm font-semibold text-slate-900">Template</h2>
              <TemplatePicker value={templateId} onChange={setTemplate} />
            </div>

            <div className="rounded-xl bg-slate-200/70 p-3 sm:p-4">
              <ResumePreview resume={resume} templateId={templateId} printRef={printRef} />
            </div>
          </section>
        )}
      </main>

      <MobileTabs value={mobileView} onChange={setMobileView} />

      <ConfirmDialog
        open={resetOpen}
        title="Clear all resume data?"
        message="This removes everything you've entered, including education, projects and skills. This can't be undone."
        confirmLabel="Yes, clear everything"
        cancelLabel="Cancel"
        onConfirm={confirmReset}
        onCancel={() => setResetOpen(false)}
      />
    </div>
  );
}