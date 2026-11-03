/**
 * Single source of truth for every string on the page, in EN / ES / PT.
 *
 * - Language-neutral data (links, tech names, dates as numbers) lives in SITE.
 * - Everything a visitor reads lives in DICTIONARY[lang].
 * - TypeScript enforces that ES and PT have exactly the same shape as EN,
 *   so a missing translation is a build error, not a silent fallback.
 * - ES and PT are written natively, not translated word by word.
 */

export const LOCALES = ["en", "es", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { label: string; short: string; og: string; path: string }> = {
  en: { label: "English", short: "EN", og: "en_US", path: "/" },
  es: { label: "Español", short: "ES", og: "es_ES", path: "/es/" },
  pt: { label: "Português", short: "PT", og: "pt_BR", path: "/pt/" },
};

export const SITE = {
  name: "Matheus Fabio Antelo",
  avatar: "/assets/avatar.jpg",
  careerStart: { year: 2022, month: 10 },
  languageCount: 4,
  companyCount: 4,
  url: "https://fabioantelomath.github.io/landingPage",
  email: "matheusf.antelo@gmail.com",
  github: "https://github.com/FabioAnteloMath",
  linkedin: "https://www.linkedin.com/in/matheusfabio/",
  whatsapp: "https://wa.me/5511963187136",
  certifications: [
    "AWS Certified Cloud Practitioner",
    "IBM Containers & Kubernetes Essentials",
    "Linux Fundamentals",
    "FIAP Cloud Fundamentals",
    "FIAP Administration & Solution Architect",
  ],
  projects: [
    {
      id: "edgebench",
      title: "edge-llm-benchmark",
      href: "https://github.com/FabioAnteloMath/edge-llm-benchmark",
      tech: ["Python", "Ollama", "llama.cpp", "Plotly"],
    },
    {
      id: "multiagent",
      title: "multiagent-rag",
      href: "https://github.com/FabioAnteloMath/multiagent-rag",
      tech: ["Python", "RAG"],
    },
    {
      id: "discord",
      title: "discord-task-bot",
      href: "https://github.com/FabioAnteloMath/discord-task-bot",
      tech: ["Python", "Discord API"],
    },
    {
      id: "pets",
      title: "GetaPets",
      href: "https://github.com/FabioAnteloMath/GetaPets",
      tech: ["JavaScript"],
    },
    {
      id: "todo",
      title: "Todo-List",
      href: "https://github.com/FabioAnteloMath/Todo-List",
      tech: ["HTML", "CSS", "JavaScript"],
    },
  ],
  skills: {
    ai: ["IBM watsonx", "watsonx Orchestrate", "Watson Assistant", "RAG", "Multi-Agent Systems", "MCP", "LLM Integration", "Prompt Engineering", "n8n", "Ollama", "LangChain", "Hugging Face"],
    dev: ["Python", "TypeScript", "Node.js", "NestJS", "React", "Next.js", "FastAPI", "REST APIs", "Microservices", "PostgreSQL", "Redis"],
    cloud: ["AWS", "GCP", "IBM Cloud", "Kubernetes", "OpenShift", "Docker", "CI/CD", "Linux", "Git"],
  },
} as const;

export type ProjectId = (typeof SITE.projects)[number]["id"];

const en = {
  meta: {
    title: "Matheus Fabio Antelo — AI Engineer",
    description: "AI Engineer building multi-agent systems, RAG pipelines and enterprise integrations.",
  },
  nav: {
    skip: "Skip to content",
    cv: "CV",
    theme: "Toggle theme",
    language: "Language",
    work: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
  },
  intro: {
    role: "AI Engineer",
    roles: ["AI Engineer", "Automation Architect", "Conversational AI"],
    stats: { years: "years in AI", companies: "companies", languages: "languages in my assistants", certs: "certifications" },
    cta: { projects: "See my work", email: "Say hello" },
    status: "Open to work · Moving to Spain",
    summary: [
      "I build multi-agent systems and RAG pipelines for large companies.",
      "Since 2022 I've worked on conversational AI: first with IBM Watson Assistant, now with watsonx Orchestrate and MCP.",
    ],
    email: "Email",
  },
  work: {
    title: "Experience",
    jobs: [
      {
        company: "CXP",
        role: "AI Engineer",
        period: "Jan 2026 – Present",
        bullets: [
          "Design and build multi-agent architectures on IBM watsonx Orchestrate, using MCP.",
          "Develop orchestration services in NestJS and TypeScript for enterprise environments.",
          "Implement RAG with Python and vector databases so agents retrieve knowledge more accurately.",
        ],
      },
      {
        company: "BRF (Sadia)",
        role: "Senior Full Stack AI Developer · IBM Watson Assistant",
        period: "May 2025 – Dec 2025",
        bullets: [
          "Built RAG architectures on foundation models and vector databases.",
          "Integrated corporate APIs and Salesforce to automate processes and personalize the experience.",
          "Delivered multilingual assistants in English, Spanish, Portuguese and Arabic.",
          "Tuned the speed and accuracy of the assistants.",
        ],
      },
      {
        company: "ONNI.IA",
        role: "Full Stack AI Developer · IBM Watson Assistant",
        period: "Feb 2024 – Apr 2025",
        bullets: [
          "Built corporate chatbots with IBM Watson Assistant and generative AI.",
          "Set up omnichannel integrations for customer support and business automation.",
          "Designed the conversation flows.",
        ],
      },
      {
        company: "Reach",
        role: "Full Stack AI Developer · IBM Watson Assistant",
        period: "Oct 2022 – Feb 2024",
        bullets: [
          "Built REST APIs and microservices to integrate corporate systems.",
          "Helped migrate monolithic applications to modern architectures.",
        ],
      },
    ],
  },
  projects: {
    title: "Projects",
    source: "Source on GitHub",
    featured: "Featured",
    items: {
      edgebench:
        "Benchmark for open-weight LLMs on everyday hardware. It measures speed (time to first token, tokens/s, RAM) and quality (MMLU, IFEval, HumanEval) and generates a standalone HTML report. It runs locally with Ollama or llama.cpp, so it costs nothing in API calls.",
      multiagent: "Multi-agent system with RAG: specialized agents retrieve context to answer questions.",
      discord: "Discord bot that manages tasks and sends notifications.",
      pets: "Pet adoption platform that connects adopters and NGOs, with registration and search.",
      todo: "To-do web app: create, edit and complete tasks.",
    } satisfies Record<ProjectId, string>,
    benchmark:
      "On a CPU-only laptop with 16 GB of RAM: qwen2.5:1.5b at 9.98 tok/s, phi3:mini with a 259 ms time to first token, llama3.2:1b at 9.20 tok/s.",
  },
  skills: {
    title: "Skills",
    groups: { ai: "AI & automation", dev: "Development", cloud: "Cloud & infrastructure" },
  },
  education: {
    title: "Education",
    degree: "BSc in Software Engineering",
    school: "AMPLI · São Paulo, Brazil",
    period: "2022 – Present",
    certsTitle: "Certifications",
  },
  contact: {
    title: "Contact",
    cta: "Let's talk",
    body: "I'm open to new roles and planning a move to Spain. Email is the quickest way to reach me.",
  },
  footer: "Built with Next.js and Tailwind CSS.",
  notFound: {
    title: "Page not found",
    body: "This address doesn't exist.",
    back: "Back to home",
  },
};

/** The dictionary type every language must satisfy (derived from EN). */
export type Dictionary = Shape<typeof en>;

/** Deep shape-check helper: values may differ, keys and array lengths must not. */
type Shape<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Shape<U>[]
    : { [K in keyof T]: Shape<T[K]> };

const es: Dictionary = {
  meta: {
    title: "Matheus Fabio Antelo — Ingeniero de IA",
    description: "Ingeniero de IA. Construyo sistemas multiagente, pipelines de RAG e integraciones empresariales.",
  },
  nav: {
    skip: "Saltar al contenido",
    cv: "CV",
    theme: "Cambiar tema",
    language: "Idioma",
    work: "Experiencia",
    projects: "Proyectos",
    skills: "Habilidades",
    contact: "Contacto",
  },
  intro: {
    role: "Ingeniero de IA",
    roles: ["Ingeniero de IA", "Arquitecto de Automatización", "IA conversacional"],
    stats: { years: "años en IA", companies: "empresas", languages: "idiomas en mis asistentes", certs: "certificaciones" },
    cta: { projects: "Ver mi trabajo", email: "Escríbeme" },
    status: "Disponible · Mudanza a España",
    summary: [
      "Construyo sistemas multiagente y pipelines de RAG para grandes empresas.",
      "Desde 2022 trabajo en IA conversacional: primero con IBM Watson Assistant y ahora con watsonx Orchestrate y MCP.",
    ],
    email: "Email",
  },
  work: {
    title: "Experiencia",
    jobs: [
      {
        company: "CXP",
        role: "Ingeniero de IA",
        period: "ene 2026 – actualidad",
        bullets: [
          "Diseño e implemento arquitecturas multiagente en IBM watsonx Orchestrate, con MCP.",
          "Desarrollo servicios de orquestación en NestJS y TypeScript para entornos empresariales.",
          "Implemento RAG con Python y bases de datos vectoriales para que los agentes recuperen conocimiento con más precisión.",
        ],
      },
      {
        company: "BRF (Sadia)",
        role: "Desarrollador Full Stack de IA sénior · IBM Watson Assistant",
        period: "may 2025 – dic 2025",
        bullets: [
          "Construí arquitecturas RAG sobre modelos fundacionales y bases de datos vectoriales.",
          "Integré APIs corporativas y Salesforce para automatizar procesos y personalizar la experiencia.",
          "Entregué asistentes multilingües en español, portugués, inglés y árabe.",
          "Mejoré el rendimiento y la precisión de los asistentes.",
        ],
      },
      {
        company: "ONNI.IA",
        role: "Desarrollador Full Stack de IA · IBM Watson Assistant",
        period: "feb 2024 – abr 2025",
        bullets: [
          "Construí chatbots corporativos con IBM Watson Assistant e IA generativa.",
          "Hice integraciones omnicanal para atención al cliente y automatización empresarial.",
          "Diseñé los flujos de conversación.",
        ],
      },
      {
        company: "Reach",
        role: "Desarrollador Full Stack de IA · IBM Watson Assistant",
        period: "oct 2022 – feb 2024",
        bullets: [
          "Creé APIs REST y microservicios para integrar sistemas corporativos.",
          "Participé en la migración de aplicaciones monolíticas a arquitecturas modernas.",
        ],
      },
    ],
  },
  projects: {
    title: "Proyectos",
    source: "Código en GitHub",
    featured: "Destacado",
    items: {
      edgebench:
        "Benchmark de LLMs open-weight en hardware corriente. Mide velocidad (tiempo hasta el primer token, tokens/s, RAM) y calidad (MMLU, IFEval, HumanEval) y genera un informe HTML autónomo. Funciona en local con Ollama o llama.cpp, sin gastar nada en APIs.",
      multiagent: "Sistema multiagente con RAG: agentes especializados recuperan contexto para responder preguntas.",
      discord: "Bot de Discord que gestiona tareas y envía notificaciones.",
      pets: "Plataforma de adopción de mascotas que conecta adoptantes y ONG, con registro y búsqueda.",
      todo: "App web de lista de tareas: crear, editar y completar.",
    },
    benchmark:
      "En un portátil solo con CPU y 16 GB de RAM: qwen2.5:1.5b a 9,98 tok/s, phi3:mini con 259 ms hasta el primer token y llama3.2:1b a 9,20 tok/s.",
  },
  skills: {
    title: "Habilidades",
    groups: { ai: "IA y automatización", dev: "Desarrollo", cloud: "Cloud e infraestructura" },
  },
  education: {
    title: "Formación",
    degree: "Grado en Ingeniería de Software",
    school: "AMPLI · São Paulo, Brasil",
    period: "2022 – actualidad",
    certsTitle: "Certificaciones",
  },
  contact: {
    title: "Contacto",
    cta: "Hablemos",
    body: "Estoy abierto a nuevas oportunidades y planeo mudarme a España. Lo más rápido es escribirme por email.",
  },
  footer: "Hecho con Next.js y Tailwind CSS.",
  notFound: {
    title: "Página no encontrada",
    body: "Esta dirección no existe.",
    back: "Volver al inicio",
  },
};

const pt: Dictionary = {
  meta: {
    title: "Matheus Fabio Antelo — Engenheiro de IA",
    description: "Engenheiro de IA. Construo sistemas multiagente, pipelines de RAG e integrações corporativas.",
  },
  nav: {
    skip: "Ir para o conteúdo",
    cv: "CV",
    theme: "Alternar tema",
    language: "Idioma",
    work: "Experiência",
    projects: "Projetos",
    skills: "Habilidades",
    contact: "Contato",
  },
  intro: {
    role: "Engenheiro de IA",
    roles: ["Engenheiro de IA", "Arquiteto de Automação", "IA conversacional"],
    stats: { years: "anos em IA", companies: "empresas", languages: "idiomas nos meus assistentes", certs: "certificações" },
    cta: { projects: "Ver meu trabalho", email: "Fale comigo" },
    status: "Aberto a propostas · Mudança para a Espanha",
    summary: [
      "Construo sistemas multiagente e pipelines de RAG para grandes empresas.",
      "Desde 2022 trabalho com IA conversacional: primeiro no IBM Watson Assistant, hoje no watsonx Orchestrate com MCP.",
    ],
    email: "E-mail",
  },
  work: {
    title: "Experiência",
    jobs: [
      {
        company: "CXP",
        role: "Engenheiro de IA",
        period: "jan 2026 – atual",
        bullets: [
          "Projeto e implemento arquiteturas multiagente no IBM watsonx Orchestrate, usando MCP.",
          "Desenvolvo serviços de orquestração em NestJS e TypeScript para ambientes corporativos.",
          "Implemento RAG com Python e bancos vetoriais para os agentes recuperarem conhecimento com mais precisão.",
        ],
      },
      {
        company: "BRF (Sadia)",
        role: "Desenvolvedor Full Stack de IA sênior · IBM Watson Assistant",
        period: "mai 2025 – dez 2025",
        bullets: [
          "Construí arquiteturas RAG com modelos de fundação e bancos vetoriais.",
          "Integrei APIs corporativas e o Salesforce para automatizar processos e personalizar a experiência.",
          "Entreguei assistentes multilíngues em português, inglês, espanhol e árabe.",
          "Ajustei o desempenho e a precisão dos assistentes.",
        ],
      },
      {
        company: "ONNI.IA",
        role: "Desenvolvedor Full Stack de IA · IBM Watson Assistant",
        period: "fev 2024 – abr 2025",
        bullets: [
          "Construí chatbots corporativos com IBM Watson Assistant e IA generativa.",
          "Fiz integrações omnichannel para atendimento ao cliente e automação empresarial.",
          "Desenhei os fluxos de conversa.",
        ],
      },
      {
        company: "Reach",
        role: "Desenvolvedor Full Stack de IA · IBM Watson Assistant",
        period: "out 2022 – fev 2024",
        bullets: [
          "Criei APIs REST e microsserviços para integrar sistemas corporativos.",
          "Participei da migração de aplicações monolíticas para arquiteturas modernas.",
        ],
      },
    ],
  },
  projects: {
    title: "Projetos",
    source: "Código no GitHub",
    featured: "Destaque",
    items: {
      edgebench:
        "Benchmark de LLMs open-weight em hardware comum. Mede velocidade (tempo até o primeiro token, tokens/s, RAM) e qualidade (MMLU, IFEval, HumanEval) e gera um relatório HTML independente. Roda local, com Ollama ou llama.cpp, sem gastar nada com API.",
      multiagent: "Sistema multiagente com RAG: agentes especializados buscam contexto para responder perguntas.",
      discord: "Bot do Discord que gerencia tarefas e envia notificações.",
      pets: "Plataforma de adoção de pets que conecta adotantes e ONGs, com cadastro e busca.",
      todo: "App web de lista de tarefas: criar, editar e concluir.",
    },
    benchmark:
      "Num notebook só com CPU e 16 GB de RAM: qwen2.5:1.5b a 9,98 tok/s, phi3:mini com 259 ms até o primeiro token e llama3.2:1b a 9,20 tok/s.",
  },
  skills: {
    title: "Habilidades",
    groups: { ai: "IA e automação", dev: "Desenvolvimento", cloud: "Cloud e infraestrutura" },
  },
  education: {
    title: "Formação",
    degree: "Bacharelado em Engenharia de Software",
    school: "AMPLI · São Paulo, Brasil",
    period: "2022 – atual",
    certsTitle: "Certificações",
  },
  contact: {
    title: "Contato",
    cta: "Vamos conversar",
    body: "Estou aberto a novas oportunidades e planejando me mudar para a Espanha. O jeito mais rápido de falar comigo é por e-mail.",
  },
  footer: "Feito com Next.js e Tailwind CSS.",
  notFound: {
    title: "Página não encontrada",
    body: "Este endereço não existe.",
    back: "Voltar ao início",
  },
};

export const DICTIONARY: Record<Locale, Dictionary> = { en, es, pt };

export function getDictionary(locale: Locale) {
  return DICTIONARY[locale];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Full years since the first professional role (Oct 2022), computed at build time. */
export function yearsOfExperience(now = new Date()) {
  const { year, month } = SITE.careerStart;
  const months = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return Math.max(1, Math.floor(months / 12));
}
