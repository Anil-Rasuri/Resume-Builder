import { useLayoutEffect, type DependencyList, type RefObject } from "react";

interface AutoFitOptions {
  targetHeightPx: number;
  minFont: number;
  maxFont: number;
  maxGap: number;
}

/**
 * Finds the largest font size (then the largest section spacing) at which
 * the content still fits within targetHeightPx. Runs before paint, so the
 * user never sees the intermediate sizes.
 */
export function useAutoFit(
  ref: RefObject<HTMLElement | null>,
  deps: DependencyList,
  { targetHeightPx, minFont, maxFont, maxGap }: AutoFitOptions
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fits = () => el.scrollHeight <= targetHeightPx;

    // Binary search for the largest value in [min, max] that still fits.
    const search = (apply: (v: number) => void, min: number, max: number) => {
      apply(max);
      if (fits()) return max;
      let lo = min;
      let hi = max;
      for (let i = 0; i < 10; i++) {
        const mid = (lo + hi) / 2;
        apply(mid);
        if (fits()) lo = mid;
        else hi = mid;
      }
      apply(lo);
      return lo;
    };

    el.style.setProperty("--gap", "1");
    const font = search((v) => (el.style.fontSize = `${v}px`), minFont, maxFont);

    // Text is at max size and there is still room: spread the sections out.
    if (font >= maxFont) {
      search((v) => el.style.setProperty("--gap", String(v)), 1, maxGap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}