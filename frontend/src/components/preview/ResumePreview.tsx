import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { TEMPLATES } from "@/components/templates";
import { useFitScale } from "@/hooks/useFitScale";
import type { Resume, TemplateId } from "@/types/resume";

const A4_WIDTH_PX = 794; // 210mm at 96dpi

interface ResumePreviewProps {
  resume: Resume;
  templateId: TemplateId;
  printRef: RefObject<HTMLDivElement | null>;
}

export default function ResumePreview({
  resume,
  templateId,
  printRef,
}: ResumePreviewProps) {
  const Template = TEMPLATES[templateId].component;
  const { containerRef, scale } = useFitScale(A4_WIDTH_PX);

  const sheetRef = useRef<HTMLDivElement>(null);
  const [sheetHeight, setSheetHeight] = useState(1123);

  // Track the real (unscaled) height so the scaled box takes the right space.
  useLayoutEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    const update = () => setSheetHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div style={{ height: sheetHeight * scale }}>
        <div
          ref={sheetRef}
          style={{
            width: A4_WIDTH_PX,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="min-h-[297mm] bg-white p-[14mm] shadow-lg ring-1 ring-slate-200"
        >
          <div ref={printRef}>
            <Template resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}