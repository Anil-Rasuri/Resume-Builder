const HAS_SCHEME = /^(https?:\/\/|mailto:|tel:)/i;

/** Turns "github.com/me" into a safe absolute URL. */
export const toHref = (value: string): string => {
  const v = value.trim();
  return HAS_SCHEME.test(v) ? v : `https://${v}`;
};

/** Cleaner text for showing a link on the resume. */
export const displayUrl = (value: string): string =>
  value
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "");