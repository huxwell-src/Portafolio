// English translations
import type { Translations } from "./es";

export const en: Translations = {
  lang: "en",
  nav: {
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    certifications: "Certifications",
    contact: "Contact",
    toggleTheme: "Toggle theme",
    toggleLang: "ES",
  },
  hero: {
    role: "Software Engineer · Backend · Data · Frontend",
    bio: "Software Engineer with experience in backend development, functional analysis, and process automation. A technical-analytical profile that adapts to different roles — from REST APIs to dashboards — always focused on quality and continuous improvement.",
    contact: "Quick contact",
  },
  projects: {
    sectionTitle: "Projects",
    sectionSubtitle: "Selected work",
    viewGithub: "GitHub",
    viewDemo: "Live demo",
    comingSoon: "Coming soon",
    statusDev: "In progress",
    statusDone: "Completed",
    categories: {
      backend: "Backend",
      frontend: "Frontend",
      data: "Data Analytics",
    },
    items: [
      {
        title: "Inventory Management API",
        description:
          "REST API with JWT authentication, full CRUD, validations and Swagger documentation. Designed to integrate with external systems.",
        stack: ["Python", "Django", "REST Framework", "MySQL", "JWT"],
        category: "backend",
        status: "dev",
        github: "#",
        demo: "#",
      },
      {
        title: "Personal Tracking Dashboard",
        description:
          "Web application to visualize personal metrics, consuming a custom API, with responsive design and dark mode.",
        stack: ["React", "Tailwind CSS", "Node.js", "Chart.js"],
        category: "frontend",
        status: "dev",
        github: "#",
        demo: "#",
      },
      {
        title: "Operational Data Analysis",
        description:
          "Extraction and transformation pipeline for operational data with visualization in an interactive dashboard for decision-making.",
        stack: ["Python", "Pandas", "Power BI", "SQL Server"],
        category: "data",
        status: "done",
        github: "#",
        demo: "#",
      },
    ],
  },
  experience: {
    sectionTitle: "Experience",
    sectionSubtitle: "Professional career",
    items: [
      {
        company: "Microsystem",
        role: "Backend Python/Django Developer",
        period: "Jun 2024 – Nov 2025",
        city: "Santiago, Chile",
        bullets: [
          "Backend module development with Python and Django",
          "Bidirectional SAP ↔ Salesforce integrations via REST APIs",
          "Sync control, log management, error handling, and duplicate prevention",
          "Internal process automation and technical documentation",
        ],
      },
      {
        company: "Latam Airlines",
        role: "Intern — On-Board Service Development",
        period: "May 2023 – Nov 2023",
        city: "Santiago, Chile",
        bullets: [
          "Internal app development with AppSheet, SQL, and Apps Script",
          "Data centralization across multiple areas with modeling and normalization",
          "Dashboard creation and automation of operational queries",
        ],
      },
      {
        company: "Taller Digital",
        role: "Intern — Front End Development",
        period: "Apr 2022 – Jun 2022",
        city: "Santiago, Chile",
        bullets: [
          "WordPress module and template development with HTML, CSS, JS, and PHP",
          "Visual and load optimization with UI/UX criteria",
          "Direct collaboration with design and UX team",
        ],
      },
      {
        company: "DuocUC",
        role: "Final Year Project",
        period: "2023",
        city: "Santiago, Chile",
        bullets: [
          "Integrated Web System: Django REST API + React + MySQL",
          "Relational database design and component-based frontend",
          "Complete client-server architecture",
        ],
      },
    ],
  },
  skills: {
    sectionTitle: "Skills",
    sectionSubtitle: "Technologies & tools",
    levels: {
      advanced: "Advanced",
      intermediate: "Intermediate",
      basic: "Basic",
    },
    categories: {
      languages: "Languages",
      frameworks: "Frameworks",
      databases: "Databases",
      tools: "Tools",
    },
  },
  certifications: {
    sectionTitle: "Certifications",
    sectionSubtitle: "Additional training",
    issuer: "DuocUC",
  },
  contact: {
    sectionTitle: "Let's talk",
    subtitle: "Open to opportunities, projects, and interesting conversations.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@email.com",
      messagePlaceholder: "Tell me about your project or proposal...",
    },
  },
  footer: {
    copy: "Designed and developed by Nicolás Sánchez Berríos",
    links: ["Projects", "Experience", "Skills", "Contact"],
  },
  meta: {
    title: "Nicolás Sánchez Berríos — Software Engineer",
    description:
      "Portfolio of Nicolás Sánchez Berríos. Software Engineer with experience in Python/Django backend, SAP↔Salesforce integrations, React, and data analytics.",
  },
};
