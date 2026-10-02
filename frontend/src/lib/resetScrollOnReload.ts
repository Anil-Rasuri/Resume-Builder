/**
 * On a browser refresh of the landing page: forget the old scroll position
 * and drop "#section" from the URL, so the page opens at the hero.
 */
export function resetScrollOnReload() {
  if (!("scrollRestoration" in window.history)) return;

  // We control scrolling ourselves (see ScrollManager).
  window.history.scrollRestoration = "manual";

  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;

  if (nav?.type === "reload" && window.location.pathname === "/") {
    window.history.replaceState(null, "", "/" + window.location.search);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }
}