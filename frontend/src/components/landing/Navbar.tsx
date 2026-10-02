import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { useActiveSection } from "@/hooks/useActiveSection";

const LINKS = [
  { id: "features", label: "Features" },
  { id: "templates", label: "Templates" },
  { id: "how-it-works", label: "How it works" },
];
const IDS = LINKS.map((l) => l.id);

export default function Navbar() {
  const { pathname, hash } = useLocation();
  const onLanding = pathname === "/";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { active, select } = useActiveSection(IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Opening /#templates directly (or from another page) scrolls to that section.
  useEffect(() => {
    if (!onLanding || !hash) return;
    const id = hash.slice(1);
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => window.clearTimeout(t);
  }, [onLanding, hash]);

  const goTo = (e: MouseEvent, id: string) => {
    setOpen(false);
    if (!onLanding) return; // normal link: opens the landing page at that section
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `/#${id}`);
    select(id);
  };

  const goHome = (e: MouseEvent) => {
    setOpen(false);
    if (!onLanding) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(null, "", "/");
  };

  const current = onLanding ? active : null;

  return (
    <header
      className={`sticky top-0 z-30 bg-white/90 backdrop-blur transition-shadow ${
        scrolled ? "shadow-md" : "border-b border-slate-200"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" aria-label="Home" onClick={goHome}>
          <Logo />
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((l) => {
            const isActive = current === l.id;
            return (
              <a
                key={l.id}
                href={`/#${l.id}`}
                onClick={(e) => goTo(e, l.id)}
                aria-current={isActive ? "location" : undefined}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/builder"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Build my resume
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden" aria-label="Mobile">
          {LINKS.map((l) => {
            const isActive = current === l.id;
            return (
              <a
                key={l.id}
                href={`/#${l.id}`}
                onClick={(e) => goTo(e, l.id)}
                aria-current={isActive ? "location" : undefined}
                className={`block rounded-lg px-3 py-3 text-base font-medium ${
                  isActive ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}