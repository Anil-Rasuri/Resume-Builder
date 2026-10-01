// A4 page with 14mm margins on every printed page. Colours are kept in the PDF.
export const PRINT_PAGE_STYLE = `
  @page { size: A4; margin: 14mm; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
`;