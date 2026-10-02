import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tells you which section is currently on screen.
 * - The active section is the last one whose top has passed `offset` pixels from the top.
 * - At the very bottom of the page the last section is active
 *   (short last sections can never reach the top).
 * - `select(id)` marks a section active right away (used on click) and
 *   pauses scroll tracking until the smooth scroll finishes.
 */
export function useActiveSection(ids: string[], offset = 96) {
  const [active, setActive] = useState<string | null>(null);
  const locking = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const idsKey = ids.join("|");

  const compute = useCallback(() => {
    let current: string | null = null;
    let last: string | null = null;

    for (const id of idsKey.split("|")) {
      const el = document.getElementById(id);
      if (!el) continue;
      last = id;
      if (el.getBoundingClientRect().top <= offset) current = id;
    }

    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    setActive(atBottom && last ? last : current);
  }, [idsKey, offset]);

  const release = useCallback(() => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      locking.current = false;
      compute();
    }, 150);
  }, [compute]);

  useEffect(() => {
    const onScroll = () => {
      if (locking.current) release(); // still animating: keep waiting
      else compute();
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      window.clearTimeout(timer.current);
    };
  }, [compute, release]);

  const select = useCallback(
    (id: string) => {
      locking.current = true;
      setActive(id);
      release();
    },
    [release]
  );

  return { active, select };
}