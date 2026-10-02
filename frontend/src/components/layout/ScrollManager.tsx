import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Opens every new page at the top, unless the link points to a #section. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // the navbar scrolls to the section itself
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}