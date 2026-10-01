import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import ResumeDocument from "@/components/templates/ResumeDocument";
import { TEMPLATES } from "@/components/templates";
import { useAutoFit } from "@/hooks/useAutoFit";
import { useFitScale } from "@/hooks/useFitScale";
import {
  A4_WIDTH_PX,
  CONTENT_HEIGHT_PX,
  FILL_TARGET,
  PAGE_MARGIN_MM,
} from "@/lib/page";
import type { Resume, TemplateId } from "@/types/resume";

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
  const template = TEMPLATES[templateId] ?? TEMPLATES.classic;
  const { containerRef, scale } = useFitScale(A4_WIDTH_PX);

  const contentRef = useRef<HTMLDivElement>(null);

  // Pick the font size and spacing that fill ~94% of the printable area.
  useAutoFit(contentRef, [resume, templateId], {
    targetHeightPx: CONTENT_HEIGHT_PX * FILL_TARGET,
    minFont: 10.5,
    maxFont: 14.5,
    maxGap: 2.2,
  });

  const sheetRef = useRef<HTMLDivElement>(null);
  const [sheetHeight, setSheetHeight] = useState(1123);

  useLayoutEffect(() => {
    const el = sheetRef.current;
    if (!el) return;
    const update = () => setSheetHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const spacer = <div style={{ height: `${PAGE_MARGIN_MM}mm` }} />;

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
          className="shadow-lg ring-1 ring-slate-200"
        >
          {/* lang is required for automatic hyphenation in justified text */}
          <div ref={printRef} lang="en" className="print-sheet">
            <table className="print-table">
              <thead>
                <tr>
                  <td>{spacer}</td>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <td>{spacer}</td>
                </tr>
              </tfoot>
              <tbody>
                <tr>
                  <td className="print-cell">
                    <div ref={contentRef}>
                      <ResumeDocument resume={resume} template={template} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}