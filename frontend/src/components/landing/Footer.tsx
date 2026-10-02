import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";
import { BRAND } from "@/constants/brand";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6">
        <div>
          <Logo size={28} />
          <p className="mt-2 max-w-xs text-sm text-slate-500">{BRAND.tagline}</p>
        </div>

        <div className="text-sm sm:text-right">
          <p className="font-semibold text-slate-900">Business enquiries</p>
          <a
            href={`mailto:${BRAND.email}`}
            className="mt-1 inline-block text-blue-600 hover:underline"
          >
            {BRAND.email}
          </a>
          <nav className="mt-3 flex gap-4 sm:justify-end">
            <Link to="/builder" className="text-slate-500 hover:text-slate-900">
              Builder
            </Link>
            <Link to="/privacy" className="text-slate-500 hover:text-slate-900">
              Privacy
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </div>
    </footer>
  );
}