const FEATURES = [
  {
    title: "10 professional templates",
    text: "Classic, modern, executive, minimal, sidebar layouts and more. Switch any time without retyping.",
  },
  {
    title: "Live preview",
    text: "See your resume update as you type, on a real A4 page.",
  },
  {
    title: "ATS-friendly PDF",
    text: "Real selectable text and standard headings, so applicant tracking systems read it correctly.",
  },
  {
    title: "Clickable links",
    text: "Email, phone, LinkedIn, GitHub and project links work inside the PDF.",
  },
  {
    title: "Fills the page nicely",
    text: "Text size and spacing adjust automatically so your resume looks balanced, not cramped or empty.",
  },
  {
    title: "No signup, private",
    text: "Your data stays in your browser. Nothing is uploaded or stored on our servers.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Everything you need, nothing you don't
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-base font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}