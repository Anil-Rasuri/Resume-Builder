const MM_TO_PX = 96 / 25.4;

export const PAGE_MARGIN_MM = 12;
export const A4_WIDTH_PX = 794; // 210mm at 96dpi
export const A4_HEIGHT_MM = 297;

// Printable height inside the margins.
export const CONTENT_HEIGHT_PX = (A4_HEIGHT_MM - 2 * PAGE_MARGIN_MM) * MM_TO_PX;

// How full the page should be (0.94 = 94%).
export const FILL_TARGET = 0.94;