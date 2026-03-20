// Traducciones en español
export const es = {
  lang: "es",
  nav: {
    projects: "Proyectos",
    experience: "Experiencia",
    skills: "Skills",
    certifications: "Certificaciones",
    contact: "Contacto",
    toggleTheme: "Cambiar tema",
    toggleLang: "EN",
  },
  hero: {
    role: "Ingeniero en Informática · Backend · Data · Frontend",
    bio: "Ingeniero en Informática con experiencia en desarrollo backend, análisis funcional y automatización de procesos. Perfil técnico-analítico que se adapta a distintos roles — desde API REST hasta dashboards — siempre orientado a la calidad y la mejora continua.",
    contact: "Contacto rápido",
  },
  projects: {
    sectionTitle: "Proyectos",
    sectionSubtitle: "Trabajo seleccionado",
    viewGithub: "GitHub",
    viewDemo: "Ver demo",
    comingSoon: "Próximamente",
    statusDev: "En desarrollo",
    statusDone: "Completado",
    categories: {
      backend: "Backend",
      frontend: "Frontend",
      data: "Data Analytics",
    },
    items: [
      {
        title: "API de Gestión de Inventario",
        description:
          "API REST con autenticación JWT, CRUD completo, validaciones y documentación con Swagger. Diseñada para integrarse con sistemas externos.",
        stack: ["Python", "Django", "REST Framework", "MySQL", "JWT"],
        category: "backend",
        status: "dev",
        github: "#",
        demo: "#",
      },
      {
        title: "Dashboard de Seguimiento Personal",
        description:
          "Aplicación web para visualizar métricas personales con consumo de API propia, diseño responsivo y modo oscuro.",
        stack: ["React", "Tailwind CSS", "Node.js", "Chart.js"],
        category: "frontend",
        status: "dev",
        github: "#",
        demo: "#",
      },
      {
        title: "Análisis de Datos Operacionales",
        description:
          "Pipeline de extracción y transformación de datos operacionales con visualización en dashboard interactivo para toma de decisiones.",
        stack: ["Python", "Pandas", "Power BI", "SQL Server"],
        category: "data",
        status: "done",
        github: "#",
        demo: "#",
      },
    ],
  },
  experience: {
    sectionTitle: "Experiencia",
    sectionSubtitle: "Carrera profesional",
    items: [
      {
        company: "Microsystem",
        role: "Desarrollador Backend Python/Django",
        period: "Jun 2024 – Nov 2025",
        city: "Santiago, Chile",
        bullets: [
          "Desarrollo de módulos backend con Python y Django",
          "Integraciones bidireccionales SAP ↔ Salesforce via APIs REST",
          "Control de sincronización, gestión de logs y prevención de duplicidades",
          "Automatización de procesos internos y documentación técnica",
        ],
      },
      {
        company: "Latam Airlines",
        role: "Practicante — Desarrollo Servicio A Bordo",
        period: "May 2023 – Nov 2023",
        city: "Santiago, Chile",
        bullets: [
          "Desarrollo de aplicación interna con AppSheet, SQL y Apps Script",
          "Centralización de datos de múltiples áreas con modelado y normalización",
          "Creación de dashboards y automatización de consultas operativas",
        ],
      },
      {
        company: "Taller Digital",
        role: "Practicante — Desarrollo Front End",
        period: "Abr 2022 – Jun 2022",
        city: "Santiago, Chile",
        bullets: [
          "Construcción de módulos y plantillas WordPress con HTML, CSS, JS y PHP",
          "Optimización visual y de carga con criterios UI/UX",
          "Trabajo directo con equipo de diseño y UX",
        ],
      },
      {
        company: "DuocUC",
        role: "Proyecto de Título",
        period: "2023",
        city: "Santiago, Chile",
        bullets: [
          "Sistema Web Integrado: API REST Django + React + MySQL",
          "Diseño de base de datos relacional y frontend por componentes",
          "Arquitectura cliente-servidor completa",
        ],
      },
    ],
  },
  skills: {
    sectionTitle: "Skills",
    sectionSubtitle: "Tecnologías y herramientas",
    levels: {
      advanced: "Avanzado",
      intermediate: "Intermedio",
      basic: "Básico",
    },
    categories: {
      languages: "Lenguajes",
      frameworks: "Frameworks",
      databases: "Bases de datos",
      tools: "Herramientas",
    },
  },
  certifications: {
    sectionTitle: "Certificaciones",
    sectionSubtitle: "Formación adicional",
    issuer: "DuocUC",
  },
  contact: {
    sectionTitle: "¿Hablamos?",
    subtitle: "Abierto a oportunidades, proyectos y conversaciones interesantes.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    form: {
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      send: "Enviar mensaje",
      namePlaceholder: "Tu nombre",
      emailPlaceholder: "tu@email.com",
      messagePlaceholder: "Cuéntame de tu proyecto o propuesta...",
    },
  },
  footer: {
    copy: "Diseñado y desarrollado por Nicolás Sánchez Berríos",
    links: ["Proyectos", "Experiencia", "Skills", "Contacto"],
  },
  meta: {
    title: "Nicolás Sánchez Berríos — Ingeniero en Informática",
    description:
      "Portfolio de Nicolás Sánchez Berríos. Ingeniero en Informática con experiencia en backend Python/Django, integraciones SAP↔Salesforce, React y análisis de datos.",
  },
};

export type Translations = typeof es;
