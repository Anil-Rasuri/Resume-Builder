import { Link } from "react-router-dom";
import { TEMPLATE_LIST } from "@/components/templates";

export default function TemplatesShowcase() {
  return (
    <section id="templates" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Pick a style that fits you
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Single-column templates are the safest for ATS. Sidebar templates look more designed.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {TEMPLATE_LIST.map((t) => (
            <Link
              key={t.id}
              to="/builder"
              className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
            >
              <div
                className="mb-3 h-2 w-12 rounded-full"
                style={{ background: t.accent }}
                aria-hidden="true"
              />
              <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                {t.name}
              </p>
              <p className="mt-1 text-xs text-slate-500">{t.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}