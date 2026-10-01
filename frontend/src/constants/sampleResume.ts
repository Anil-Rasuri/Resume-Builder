import type { Resume } from "@/types/resume";

export const sampleResume: Resume = {
  personal: {
    fullName: "Ananya Reddy",
    jobTitle: "Full Stack Developer",
    email: "ananya@example.com",
    phone: "+91 98765 43210",
    location: "Hyderabad, India",
    linkedin: "linkedin.com/in/ananya",
    github: "github.com/ananya",
    website: "ananya.dev",
    summary:
      "Full stack developer with 3 years of experience building fast, accessible web apps with React and Python.",
  },
  experience: [
    {
      id: "exp-1",
      company: "TechNova Solutions",
      role: "Software Engineer",
      location: "Hyderabad",
      startDate: "Jun 2023",
      endDate: "",
      current: true,
      bullets: [
        "Built REST APIs with FastAPI serving 50k+ daily requests.",
        "Reduced page load time by 40% through code splitting and caching.",
      ],
    },
  ],
  internships: [
    {
      id: "int-1",
      company: "CodeCraft Labs",
      role: "Frontend Intern",
      location: "Remote",
      startDate: "Jan 2023",
      endDate: "Apr 2023",
      bullets: [
        "Built reusable React components used across 3 internal dashboards.",
        "Fixed 25+ UI bugs and improved Lighthouse score from 62 to 91.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "JNTU Hyderabad",
      degree: "B.Tech",
      branch: "Computer Science and Engineering",
      startDate: "2019",
      endDate: "2023",
      grade: "8.6 CGPA",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Expense Tracker",
      link: "github.com/ananya/expense-tracker",
      techStack: "React, TypeScript, FastAPI, PostgreSQL",
      description: "Full stack app to track daily spending with charts and monthly reports.",
    },
  ],
  skills: {
    technical: ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    soft: ["Communication", "Teamwork", "Problem Solving"],
    other: ["English", "Telugu", "Hindi"],
  },
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "Mar 2024",
      link: "",
    },
  ],
};