export type Lang = "en" | "es";

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface ProjectItem {
  title: string;
  tags: string[];
  description: string;
  impact: string;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    experience: string;
    projects: string;
    skills: string;
    about: string;
    contact: string;
  };
  hero: {
    badge: string;
    greeting: string;
    name: string;
    title: string;
    summary: string;
    ctaContact: string;
    ctaResume: string;
    resumeHref: string;
  };
  experience: {
    heading: string;
    kicker: string;
    items: ExperienceItem[];
  };
  projects: {
    heading: string;
    kicker: string;
    items: ProjectItem[];
  };
  skills: {
    heading: string;
    kicker: string;
    groups: SkillGroup[];
  };
  about: {
    heading: string;
    kicker: string;
    paragraphs: string[];
    education: string;
  };
  contact: {
    heading: string;
    kicker: string;
    text: string;
    emailLabel: string;
  };
  footer: {
    text: string;
  };
}

export const content: Record<Lang, SiteContent> = {
  en: {
    meta: {
      title: "Eduin Shaik — Full-Stack Engineer",
      description:
        "Full-Stack Engineer with 6+ years building scalable products across fintech, logistics, and e-commerce fulfillment.",
    },
    nav: {
      experience: "Experience",
      projects: "Highlights",
      skills: "Skills",
      about: "About",
      contact: "Contact",
    },
    hero: {
      badge: "Open to new opportunities",
      greeting: "Hey, I'm",
      name: "Eduin Shaik",
      title: "Full-Stack Engineer",
      summary:
        "6+ years of experience building scalable products across fintech, logistics, and e-commerce fulfillment. I like proposing and leading projects end-to-end, from technical design through delivery, and communicating clearly with stakeholders across engineering and the business.",
      ctaContact: "Get in touch",
      ctaResume: "Download resume",
      resumeHref: "/resume.pdf",
    },
    experience: {
      heading: "Work Experience",
      kicker: "Career",
      items: [
        {
          role: "Full-Stack Engineer",
          company: "Keep Technologies · Remote",
          period: "May 2025 – Present",
          location: "Remote",
          bullets: [
            "Led end-to-end automation of a manual third-party credit-report process that consumed ~120 hours/month, replacing manual downloads with a scheduled SFTP pipeline — taking the process from 100% manual to 0%.",
            "Architected a co-branded portal system (dual auth, subdomain routing, dynamic theming) flagged internally as the most promising go-to-market revenue initiative.",
            "Built a unified authentication server (NestJS + node-oidc-provider) powering login for web and mobile (React Native), supporting 10,000+ logins per day.",
            "Designed a legal-entity structure module supporting recursive business-ownership hierarchies and automated compliance reminders.",
            "Built a partner-referral attribution system supporting 50+ partners simultaneously, enabling partner-specific plans and historical reporting.",
          ],
        },
        {
          role: "Cloud Engineer / Full-Stack Developer",
          company: "Melonn SAS · Remote",
          period: "Sep 2023 – May 2025",
          location: "Remote",
          bullets: [
            "Led the redesign of the warehouse system's data model into a flexible hierarchical structure with an inventory service to track stock across every level.",
            "Took the operations team from processing products one by one to seconds — improving receiving speed by roughly 70–150%.",
            "Integrated the OpenAI (ChatGPT) API into the warehouse app to automatically verify user-entered codes during receiving.",
          ],
        },
        {
          role: "Full-Stack Developer",
          company: "Prevalentware SAS · Remote (Outsourcing)",
          period: "Mar 2022 – Sep 2023",
          location: "Remote",
          bullets: [
            "Built a company-wide internal time-tracking tool, adopted across the entire company for accurate client billing.",
            "Led a healthcare-domain workflow automation project (Decisions no-code platform) for a U.S.-based client over 5 months, owning technical design, implementation, and direct client communication.",
            "Developed stock control and reporting features for hardware/retail inventory management clients.",
          ],
        },
        {
          role: "Freelance – Full-Stack Developer",
          company: "Truckload Management Platform",
          period: "Oct 2020 – Dec 2021",
          location: "Remote",
          bullets: [
            "Developed the frontend with ReactJS and Bootstrap, built the backend with PHP and SQL, optimized MySQL databases, and collaborated directly with clients and stakeholders.",
          ],
        },
      ],
    },
    projects: {
      heading: "Highlighted Work",
      kicker: "Impact",
      items: [
        {
          title: "Credit-Report SFTP Automation",
          tags: ["Node.js", "SFTP", "Automation"],
          description:
            "Replaced a fully manual, 120 hours/month credit-report retrieval process with a scheduled pipeline that auto-requests, retrieves, and processes reports.",
          impact: "100% → 0% manual effort",
        },
        {
          title: "Co-Branded Partner Portal",
          tags: ["Next.js", "Multi-tenant", "Auth"],
          description:
            "Reusable foundation for partner-branded experiences: dual auth, subdomain routing, cookie/session management, and dynamic theming.",
          impact: "Top go-to-market revenue initiative",
        },
        {
          title: "Unified Authentication Server",
          tags: ["NestJS", "OIDC", "React Native"],
          description:
            "Single auth server powering login for both web and mobile apps, built with node-oidc-provider.",
          impact: "10,000+ logins / day",
        },
        {
          title: "Warehouse Data Model Redesign",
          tags: ["System Design", "Inventory", "AI"],
          description:
            "Flexible hierarchical data model with an inventory service across every level, plus OpenAI-assisted code verification during receiving.",
          impact: "70–150% faster receiving",
        },
      ],
    },
    skills: {
      heading: "Skills & Tools",
      kicker: "Toolbox",
      groups: [
        {
          name: "Languages & Frameworks",
          items: [
            "TypeScript",
            "JavaScript",
            "Node.js",
            "Express",
            "NestJS",
            "React",
            "React Native",
            "Next.js",
            "GraphQL",
            "tRPC",
            "PHP",
            "Python",
            "Java",
          ],
        },
        {
          name: "Frontend",
          items: [
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Bootstrap",
            "Chakra UI",
            "Zod",
            "Apollo Client",
            "React Hook Form",
            "Storybook",
          ],
        },
        {
          name: "Backend & Databases",
          items: [
            "PostgreSQL",
            "MySQL",
            "MongoDB",
            "Prisma ORM",
            "Sequelize ORM",
            "REST APIs",
            "OIDC / Auth",
            "Redis",
            "RabbitMQ",
          ],
        },
        {
          name: "Cloud & Infrastructure",
          items: [
            "AWS (Lambda, S3, ECS, AppConfig)",
            "Docker",
            "Serverless",
            "SFTP integrations",
            "Turborepo",
            "Temporal",
            "Statsig",
          ],
        },
        {
          name: "Testing & Observability",
          items: [
            "Jest",
            "Cypress",
            "Datadog",
            "Sentry",
            "Amplitude",
            "Segment",
            "LogRocket",
            "Metabase",
            "Snowflake",
          ],
        },
        {
          name: "AI-Assisted Development",
          items: [
            "Claude Code",
            "MCP",
            "Codex",
            "Cursor",
            "OpenAI API",
            "SKILL.md authoring",
          ],
        },
      ],
    },
    about: {
      heading: "About Me",
      kicker: "Who I am",
      paragraphs: [
        "I'm a Full-Stack Engineer based in Barranquilla, Colombia, with 6+ years of experience building products across fintech, logistics, and e-commerce fulfillment.",
        "I care about building and improving systems that people actually use — I enjoy owning projects end-to-end, from technical design through delivery, and staying close to the business impact of what I ship.",
        "Lately I've been deep into AI-assisted development: using tools like Claude Code, MCP, and Cursor to move faster without cutting corners, and authoring skills/automations that help teams work smarter.",
      ],
      education: "Systems Engineer · Universidad del Norte, Barranquilla (2017 – 2021)",
    },
    contact: {
      heading: "Let's talk",
      kicker: "Contact",
      text:
        "I'm open to new opportunities and interesting projects. The fastest way to reach me is email — I also hang out on LinkedIn and GitHub.",
      emailLabel: "Send an email",
    },
    footer: {
      text: "Built with Astro & Tailwind CSS. Deployed on GitHub Pages.",
    },
  },
  es: {
    meta: {
      title: "Eduin Shaik — Ingeniero Full-Stack",
      description:
        "Ingeniero Full-Stack con más de 6 años construyendo productos escalables en fintech, logística y e-commerce.",
    },
    nav: {
      experience: "Experiencia",
      projects: "Destacados",
      skills: "Habilidades",
      about: "Sobre mí",
      contact: "Contacto",
    },
    hero: {
      badge: "Disponible para nuevas oportunidades",
      greeting: "Hola, soy",
      name: "Eduin Shaik",
      title: "Ingeniero Full-Stack",
      summary:
        "6+ años de experiencia construyendo productos escalables en fintech, logística y fulfillment de e-commerce. Me gusta proponer y liderar proyectos end-to-end, desde el diseño técnico hasta la entrega, comunicándome con claridad con stakeholders de ingeniería y de negocio.",
      ctaContact: "Contáctame",
      ctaResume: "Descargar CV",
      resumeHref: "/resume-es.pdf",
    },
    experience: {
      heading: "Experiencia Laboral",
      kicker: "Trayectoria",
      items: [
        {
          role: "Ingeniero Full-Stack",
          company: "Keep Technologies · Remoto",
          period: "May 2025 – Presente",
          location: "Remoto",
          bullets: [
            "Lideré la automatización end-to-end de un proceso manual de solicitud de reportes de crédito con un tercero, que consumía ~120 horas/mes del equipo de Underwriting — reemplazando descargas manuales por un pipeline SFTP programado, llevando el proceso de 100% manual a 0%.",
            "Diseñé la arquitectura de un portal co-branded (dual auth, subdomain routing, theming dinámico) identificado internamente como el proyecto con mayor potencial de ingresos para el go-to-market.",
            "Construí un servidor de autenticación unificado (NestJS + node-oidc-provider) que soporta el login de la app web y la móvil (React Native), manejando más de 10,000 logins diarios.",
            "Diseñé un módulo de estructura legal con jerarquías recursivas de propiedad empresarial y recordatorios automáticos de compliance.",
            "Construí un sistema de atribución de referidos por partner con soporte para más de 50 partners simultáneamente, habilitando planes y reportes históricos por partner.",
          ],
        },
        {
          role: "Ingeniero Cloud / Desarrollador Full-Stack",
          company: "Melonn SAS · Remoto",
          period: "Sep 2023 – May 2025",
          location: "Remoto",
          bullets: [
            "Lideré el rediseño del modelo de datos del sistema de bodega hacia una estructura jerárquica flexible, con un servicio de inventario que rastrea stock en cada nivel.",
            "Llevé al equipo de operaciones de procesar productos uno por uno a hacerlo en segundos — mejorando la velocidad de recepción entre un 70–150%.",
            "Integré la API de OpenAI (ChatGPT) en la app de bodega para verificar automáticamente códigos ingresados por el usuario durante la recepción.",
          ],
        },
        {
          role: "Desarrollador Full-Stack",
          company: "Prevalentware SAS · Remoto (Outsourcing)",
          period: "Mar 2022 – Sep 2023",
          location: "Remoto",
          bullets: [
            "Construí una herramienta interna de time-tracking adoptada por toda la empresa para facturación precisa a clientes.",
            "Lideré un proyecto de automatización de workflows en el sector salud (plataforma no-code Decisions) para un cliente en EE. UU. durante 5 meses, a cargo del diseño técnico, la implementación y la comunicación directa con el cliente.",
            "Desarrollé funcionalidades de control de stock y reportería para clientes de inventario en retail/hardware.",
          ],
        },
        {
          role: "Freelance – Desarrollador Full-Stack",
          company: "Plataforma de Gestión de Fletes (Truckload)",
          period: "Oct 2020 – Dic 2021",
          location: "Remoto",
          bullets: [
            "Desarrollé el frontend con ReactJS y Bootstrap, el backend con PHP y SQL, optimicé bases de datos MySQL y colaboré directamente con clientes y stakeholders.",
          ],
        },
      ],
    },
    projects: {
      heading: "Trabajo Destacado",
      kicker: "Impacto",
      items: [
        {
          title: "Automatización SFTP de Reportes de Crédito",
          tags: ["Node.js", "SFTP", "Automatización"],
          description:
            "Reemplacé un proceso 100% manual (120 horas/mes) de obtención de reportes de crédito con un pipeline programado que solicita, descarga y procesa reportes automáticamente.",
          impact: "100% → 0% esfuerzo manual",
        },
        {
          title: "Portal Co-Branded para Partners",
          tags: ["Next.js", "Multi-tenant", "Auth"],
          description:
            "Base reutilizable para experiencias de marca compartida con partners: dual auth, subdomain routing, manejo de cookies/sesiones y theming dinámico.",
          impact: "Principal iniciativa de go-to-market",
        },
        {
          title: "Servidor de Autenticación Unificado",
          tags: ["NestJS", "OIDC", "React Native"],
          description:
            "Servidor de autenticación único que da soporte al login web y móvil, construido con node-oidc-provider.",
          impact: "10,000+ logins / día",
        },
        {
          title: "Rediseño del Modelo de Datos de Bodega",
          tags: ["Diseño de Sistemas", "Inventario", "IA"],
          description:
            "Modelo de datos jerárquico y flexible con un servicio de inventario en cada nivel, más verificación de códigos asistida por OpenAI durante la recepción.",
          impact: "70–150% más rápido en recepción",
        },
      ],
    },
    skills: {
      heading: "Habilidades y Herramientas",
      kicker: "Caja de herramientas",
      groups: [
        {
          name: "Lenguajes y Frameworks",
          items: [
            "TypeScript",
            "JavaScript",
            "Node.js",
            "Express",
            "NestJS",
            "React",
            "React Native",
            "Next.js",
            "GraphQL",
            "tRPC",
            "PHP",
            "Python",
            "Java",
          ],
        },
        {
          name: "Frontend",
          items: [
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Bootstrap",
            "Chakra UI",
            "Zod",
            "Apollo Client",
            "React Hook Form",
            "Storybook",
          ],
        },
        {
          name: "Backend y Bases de Datos",
          items: [
            "PostgreSQL",
            "MySQL",
            "MongoDB",
            "Prisma ORM",
            "Sequelize ORM",
            "REST APIs",
            "OIDC / Auth",
            "Redis",
            "RabbitMQ",
          ],
        },
        {
          name: "Cloud e Infraestructura",
          items: [
            "AWS (Lambda, S3, ECS, AppConfig)",
            "Docker",
            "Serverless",
            "Integraciones SFTP",
            "Turborepo",
            "Temporal",
            "Statsig",
          ],
        },
        {
          name: "Testing y Observabilidad",
          items: [
            "Jest",
            "Cypress",
            "Datadog",
            "Sentry",
            "Amplitude",
            "Segment",
            "LogRocket",
            "Metabase",
            "Snowflake",
          ],
        },
        {
          name: "Desarrollo Asistido por IA",
          items: [
            "Claude Code",
            "MCP",
            "Codex",
            "Cursor",
            "OpenAI API",
            "Autoría de SKILL.md",
          ],
        },
      ],
    },
    about: {
      heading: "Sobre Mí",
      kicker: "Quién soy",
      paragraphs: [
        "Soy Ingeniero Full-Stack radicado en Barranquilla, Colombia, con más de 6 años de experiencia construyendo productos en fintech, logística y e-commerce.",
        "Me importa construir y mejorar sistemas que la gente realmente usa — disfruto liderar proyectos end-to-end, desde el diseño técnico hasta la entrega, y mantenerme cerca del impacto de negocio de lo que construyo.",
        "Últimamente estoy metido de lleno en desarrollo asistido por IA: uso herramientas como Claude Code, MCP y Cursor para moverme más rápido sin sacrificar calidad, y escribo skills/automatizaciones que ayudan a los equipos a trabajar mejor.",
      ],
      education: "Ingeniero de Sistemas · Universidad del Norte, Barranquilla (2017 – 2021)",
    },
    contact: {
      heading: "Hablemos",
      kicker: "Contacto",
      text:
        "Estoy abierto a nuevas oportunidades y proyectos interesantes. La forma más rápida de contactarme es por correo — también estoy en LinkedIn y GitHub.",
      emailLabel: "Enviar un correo",
    },
    footer: {
      text: "Construido con Astro y Tailwind CSS. Desplegado en GitHub Pages.",
    },
  },
};

export const socials = {
  email: "eduinshaikc@gmail.com",
  linkedin: "https://linkedin.com/in/eduinsc",
  github: "https://github.com/eshaik",
};
