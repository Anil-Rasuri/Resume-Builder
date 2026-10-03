import { useEffect, useRef, useState, type ComponentType } from "react";
import { useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Header from "@/components/layout/Header";
import MobileTabs, { type MobileView } from "@/components/layout/MobileTabs";
import SectionTabs from "@/components/layout/SectionTabs";
import StepNav from "@/components/layout/StepNav";
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
  useDocumentTitle("Rezuvo - Create your resume");

  const { resume, templateId, setResume, setTemplate, reset } = useResumeStore();
  const [activeSection, setActiveSection] = useState<SectionId>("personal");
  const [mobileView, setMobileView] = useState<MobileView>("edit");
  const [zoom, setZoom] = useState(false);
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

  const changeSection = (id: SectionId) => {
    setActiveSection(id);
    if (!isDesktop) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changeView = (view: MobileView) => {
    setMobileView(view);
    window.scrollTo({ top: 0 });
  };

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

  const index = SECTIONS.findIndex((s) => s.id === activeSection);
  const section = SECTIONS[index] ?? SECTIONS[0];
  const prev = index > 0 ? SECTIONS[index - 1] : null;
  const next = index < SECTIONS.length - 1 ? SECTIONS[index + 1] : null;
  const ActiveForm = FORMS[activeSection];

  const showForm = isDesktop || mobileView === "edit";
  const showPreview = isDesktop || mobileView === "preview";

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50">
      <Header
        onLoadSample={loadSample}
        onReset={() => setResetOpen(true)}
        onDownload={handleDownload}
      />

      {/* grid-cols-1 gives the column a fixed width (minmax(0,1fr)).
          Without it, the long row of tabs stretched the page past the screen. */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-3 py-4 pb-28 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-2 lg:pb-6">
        {showForm && (
          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            {/* Phone-only toolbar (the header hides these buttons on small screens) */}
            <div className="mb-4 flex gap-2 sm:hidden">
              <button
                onClick={loadSample}
                className="h-9 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600"
              >
                Load sample
              </button>
              <button
                onClick={() => setResetOpen(true)}
                className="h-9 rounded-lg border border-slate-200 px-3 text-xs font-medium text-slate-600"
              >
                Reset
              </button>
            </div>

            <SectionTabs active={activeSection} onChange={changeSection} />
            <h2 className="mb-1 text-lg font-semibold text-slate-900">{section.title}</h2>
            <p className="mb-5 text-sm text-slate-500">{section.description}</p>
            <ActiveForm key={`${activeSection}-${formKey}`} />

            <StepNav
              prev={
                prev
                  ? { label: prev.label, onClick: () => changeSection(prev.id) }
                  : undefined
              }
              next={
                next
                  ? { label: `Next: ${next.label}`, onClick: () => changeSection(next.id) }
                  : !isDesktop
                    ? { label: "Preview resume", onClick: () => changeView("preview") }
                    : undefined
              }
            />
          </section>
        )}

        {showPreview && (
          <section className="min-w-0 space-y-3 sm:space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto">
            <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <h2 className="mb-2 text-sm font-semibold text-slate-900 sm:mb-3">Template</h2>
              <TemplatePicker value={templateId} onChange={setTemplate} />
            </div>

            <div className="min-w-0 rounded-xl bg-slate-200/70 p-2 sm:p-4">
              {/* Phone-only zoom control */}
              <div className="mb-2 flex items-center justify-between gap-3 px-1 lg:hidden">
                <p className="text-xs text-slate-600">
                  {zoom ? "Swipe sideways to read" : "Tap Zoom to read the text"}
                </p>
                <button
                  type="button"
                  onClick={() => setZoom((z) => !z)}
                  className="h-9 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700"
                >
                  {zoom ? "Fit page" : "Zoom"}
                </button>
              </div>

              <ResumePreview
                resume={resume}
                templateId={templateId}
                printRef={printRef}
                zoom={zoom && !isDesktop}
              />
            </div>
          </section>
        )}
      </main>

      <MobileTabs value={mobileView} onChange={changeView} />

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
