// Margins are built into the document (see ResumePreview), so the page has none.
export const PRINT_PAGE_STYLE = `
  @page { size: A4; margin: 0; }
  html, body { margin: 0; padding: 0; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
`;