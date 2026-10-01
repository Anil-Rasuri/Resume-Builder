import { useLayoutEffect, useRef, useState } from "react";

export function useFitScale(designWidthPx: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () =>
      setScale(Math.min(1, el.clientWidth / designWidthPx));

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [designWidthPx]);

  return { containerRef, scale };
}