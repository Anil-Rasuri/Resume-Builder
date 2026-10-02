const STEPS = [
  { n: "1", title: "Enter your details", text: "Personal info, education, skills, projects and experience." },
  { n: "2", title: "Choose a template", text: "Preview your resume in 10 different styles." },
  { n: "3", title: "Download your PDF", text: "One click, ready to send to employers." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          How it works
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white">
                {s.n}
              </div>
              <h3 className="mt-3 text-base font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}