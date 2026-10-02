<div align="center">

<img src="frontend/public/logo.png" alt="Rezuvo logo" width="96" />

# Rezuvo

**A free, ATS-friendly resume builder.**
Fill in your details, pick a template, preview live, and download a clean PDF.

[Live demo](https://rezuvo.vercel.app)

</div>

---

## About

Rezuvo is a web app that helps people create professional resumes without signing up. You enter your details once, switch between 10 templates, watch the preview update as you type, and download a PDF with selectable text and clickable links.

Your data stays in your own browser. Nothing is uploaded to a server.

## Features

- **10 templates**: 7 single-column (best for ATS) and 3 two-column sidebar layouts
- **Live A4 preview** that updates as you type
- **PDF download** with real, selectable text
- **Clickable links** for email, phone, LinkedIn, GitHub, website, projects and certificates
- **Auto-fit layout**: font size and spacing adjust so the page looks balanced, about 90-95% full
- **Justified paragraphs** with hyphenation
- **Sections**: personal details, summary, education, skills (technical, soft, other), projects (with tech stack), experience, internships, certifications
- **Form validation** with clear error messages
- **Auto-save** in the browser, so work isn't lost on refresh
- **Responsive**: Edit and Preview tabs on phones, side-by-side on desktop
- **Landing page**, privacy page and 404 page, with SEO tags

## Tech stack

| Area | Tools |
|---|---|
| Framework | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| Forms and validation | React Hook Form, Zod |
| State | Zustand (persisted to local storage) |
| Routing | React Router |
| PDF | react-to-print (browser print to PDF) |
| Hosting | Vercel |

## Getting started

**Requirements:** Node.js 20 or newer, and npm.

```bash
# 1. Clone the repository
git clone https://github.com/Anil-Rasuri/Resume-Builder.git
cd Resume-Builder/frontend

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open http://localhost:5173 in your browser.

### Other commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |

## Project structure

```
frontend/
  public/                 logo, favicons, robots.txt, sitemap.xml
  src/
    components/
      form/               one form per resume section
      landing/            navbar, hero, features, footer
      layout/             builder header, tabs
      preview/            A4 preview and template picker
      templates/          template config, shared document, CSS themes
      ui/                 reusable inputs, logo, confirm dialog
    constants/            brand, sections, sample and empty resume
    hooks/                auto-fit, scroll highlight, media query
    lib/                  formatting, links, data mappers, page sizes
    pages/                Landing, Builder, Privacy, NotFound
    schemas/              Zod validation rules
    store/                Zustand store
    types/                TypeScript types
```

### Adding a new template

1. Add an id to `TemplateId` in `src/types/resume.ts`.
2. Add one entry to `TEMPLATE_LIST` in `src/components/templates/index.ts`.
3. Add a CSS block for `.rt-yourid` in `src/components/templates/resume.css`.

## Deployment

The frontend is deployed on [Vercel](https://vercel.com):

- **Root directory:** `frontend`
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

`frontend/vercel.json` rewrites all routes to `index.html` so pages like `/builder` work on refresh.

## Roadmap

- [ ] Custom domain and privacy-friendly analytics
- [ ] FastAPI backend with Google login
- [ ] Save and load resumes across devices
- [ ] One-click server-side PDF download
- [ ] More templates and a cover letter builder

## Built with Claude

This project was built with the help of [Claude](https://claude.ai), an AI assistant made by Anthropic. Claude helped with planning the architecture, writing and debugging code, and designing the templates. The ideas, decisions, testing and direction are my own.

## Author

**Anil Kumar Rasuri**

- GitHub: [@Anil-Rasuri](https://github.com/Anil-Rasuri)
- Email: [anilrasuri17@gmail.com](mailto:anilrasuri17@gmail.com)

## License

Copyright © 2026 Anil Kumar Rasuri. All rights reserved.

*If you want others to reuse the code, replace this section with an open-source license such as MIT.*
