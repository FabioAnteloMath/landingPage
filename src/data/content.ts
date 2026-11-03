/**
 * Single source of truth for every string on the page, in EN / ES / PT.
 *
 * - Language-neutral data (links, tech names, dates as numbers) lives in SITE.
 * - Everything a visitor reads lives in DICTIONARY[lang].
 * - TypeScript enforces that ES and PT have exactly the same shape as EN,
 *   so a missing translation is a build error, not a silent fallback.
 */

export const LOCALES = ["en", "es", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { label: string; short: string; flag: string; og: string; path: string }> = {
  en: { label: "English", short: "EN", flag: "🇺🇸", og: "en_US", path: "/" },
  es: { label: "Español", short: "ES", flag: "🇪🇸", og: "es_ES", path: "/es/" },
  pt: { label: "Português", short: "PT", flag: "🇧🇷", og: "pt_BR", path: "/pt/" },
};

export const SITE = {
  name: "Matheus Fabio Antelo",
  firstName: "Matheus",
  initials: "MA",
  url: "https://fabioantelomath.github.io/landingPage",
  avatar: "/assets/avatar.jpg",
  email: "matheusf.antelo@gmail.com",
  github: "https://github.com/FabioAnteloMath",
  githubUser: "FabioAnteloMath",
  linkedin: "https://www.linkedin.com/in/matheusfabio/",
  whatsapp: "https://wa.me/5511963187136",
  careerStart: { year: 2022, month: 10 },
  companies: ["CXP", "BRF (Sadia)", "ONNI.IA", "Reach"],
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
      tech: ["Python", "Ollama", "llama.cpp", "Plotly", "Benchmarking"],
      featured: true,
    },
    {
      id: "multiagent",
      title: "multiagent-rag",
      href: "https://github.com/FabioAnteloMath/multiagent-rag",
      tech: ["Python", "RAG", "Multi-Agent"],
    },
    {
      id: "discord",
      title: "discord-task-bot",
      href: "https://github.com/FabioAnteloMath/discord-task-bot",
      tech: ["Python", "Discord API", "Automation"],
    },
    {
      id: "pets",
      title: "GetaPets",
      href: "https://github.com/FabioAnteloMath/GetaPets",
      tech: ["JavaScript", "Full-Stack", "API"],
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
    title: "Matheus Fabio Antelo — AI Engineer & Automation Architect",
    description:
      "AI Engineer & Automation Architect. Building intelligent systems with LLMs, multi-agent orchestration, RAG, and enterprise integrations.",
  },
  nav: {
    home: "Home",
    about: "About",
    work: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    cv: "Download CV",
    theme: "Toggle theme",
    language: "Language",
    github: "GitHub",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    email: "Email",
  },
  hero: {
    status: "Open to opportunities · Relocation to Spain",
    greeting: "Hi, I'm Matheus",
    roles: ["AI Engineer", "Automation Architect", "Multi-Agent Builder", "Conversational AI Dev"],
    tagline:
      "I turn LLM research into production systems — multi-agent orchestration, RAG pipelines and enterprise integrations that actually ship.",
    ctaProjects: "View projects",
    ctaCv: "Download CV",
    ctaContact: "Get in touch",
  },
  stats: {
    years: "years shipping AI in production",
    companies: "companies, from startups to BRF (Sadia)",
    languages: "languages served by my assistants",
    certs: "cloud & infra certifications",
  },
  about: {
    title: "About",
    body: [
      "I'm an **AI Engineer** and **Automation Architect** focused on deploying high-impact, autonomous systems. I specialize in LLMs, RAG and Agentic AI, turning experimental research into reliable, enterprise-ready software.",
      "Today I design multi-agent architectures on **IBM watsonx Orchestrate** using the **MCP** protocol, backed by NestJS services and Python RAG pipelines. Before that I led conversational AI for large companies in four languages — EN, ES, PT and Arabic.",
    ],
  },
  work: {
    title: "Work Experience",
    present: "Present",
    jobs: [
      {
        company: "CXP",
        title: "AI Engineer",
        period: "Jan 2026 – Present",
        bullets: [
          "Designed and implemented multi-agent architectures on IBM watsonx Orchestrate using the MCP protocol.",
          "Built orchestration services with NestJS and TypeScript for enterprise environments.",
          "Implemented RAG solutions with Python and vector databases for advanced knowledge retrieval.",
        ],
      },
      {
        company: "BRF (Sadia)",
        title: "Senior Full Stack AI Developer — IBM Watson Assistant",
        period: "May 2025 – Dec 2025",
        bullets: [
          "Built RAG architectures integrated with foundation models and vector databases.",
          "Integrated corporate APIs and Salesforce for process automation and experience personalization.",
          "Developed multilingual conversational solutions (EN, ES, PT, AR).",
          "Optimized performance and accuracy of intelligent assistants.",
        ],
      },
      {
        company: "ONNI.IA",
        title: "Full Stack AI Developer — IBM Watson Assistant",
        period: "Feb 2024 – Apr 2025",
        bullets: [
          "Built advanced corporate chatbots with IBM Watson Assistant and Generative AI.",
          "Implemented omnichannel integrations for customer support and enterprise automation.",
          "Designed conversational flows.",
        ],
      },
      {
        company: "Reach",
        title: "Full Stack AI Developer — IBM Watson Assistant",
        period: "Oct 2022 – Feb 2024",
        bullets: [
          "Built RESTful APIs and microservices for corporate system integration.",
          "Migrated monolithic applications to modern architectures.",
        ],
      },
    ],
  },
  education: {
    title: "Education",
    school: "AMPLI",
    degree: "B.Sc. Software Engineering · São Paulo, Brazil",
    period: "2022 – Present",
    certsTitle: "Certifications",
  },
  skills: {
    badge: "Skills",
    title: "The stack behind the agents",
    subtitle: "Drag the sphere — it's the toolbox I reach for every week.",
    groups: { ai: "AI & Automation", dev: "Full-Stack Development", cloud: "Cloud & Infrastructure" },
  },
  architecture: {
    badge: "How I build",
    title: "Anatomy of an agent system",
    subtitle:
      "Every channel lands on one orchestrator. It plans, retrieves context, calls tools over MCP and answers through the model that fits the job.",
    channels: "Channels",
    orchestrator: "Orchestrator",
    nodes: { web: "Web widget", whatsapp: "WhatsApp", slack: "Chat apps", llm: "LLM", rag: "Vector DB · RAG", tools: "Tools · MCP", crm: "CRM · Salesforce" },
  },
  projects: {
    badge: "My Projects",
    title: "Things I've built",
    subtitle: "Open-source work across benchmarking, agents, automation and full-stack apps.",
    repo: "Source",
    featured: "Featured",
    terminalCaption: "Real numbers from a CPU-only laptop run (16 GB RAM, q4_K_M).",
    items: {
      edgebench:
        "Benchmark suite for open-weight LLMs on consumer hardware. Measures performance (TTFT, tokens/s, RAM) and quality (MMLU, IFEval, HumanEval) and ships a self-contained HTML report. Zero API cost — runs entirely on local inference via Ollama or llama.cpp.",
      multiagent:
        "Multi-agent system with RAG for search and generation of contextualized answers. Orchestrates specialized agents over augmented retrieval.",
      discord:
        "Task bot for Discord with workflow automation. Manages tasks, notifications and integration with communication channels.",
      pets: "Pet adoption and management platform. Registration, search and matching between adopters and NGOs.",
      todo: "Web to-do app with an intuitive interface: create, edit and complete tasks.",
    } satisfies Record<ProjectId, string>,
  },
  github: {
    badge: "Open Source",
    title: "GitHub activity",
    note: "Live data from the GitHub API. Updates every few hours.",
    fallback: "Stats are temporarily unavailable — see the profile on GitHub.",
  },
  highlights: {
    badge: "Highlights",
    title: "What I've shipped",
    subtitle: "The kind of problems I've been trusted with.",
    items: [
      {
        tag: "AI Orchestration",
        title: "Enterprise AI Orchestration",
        desc: "Architected multi-agent systems on IBM watsonx and event-driven automation pipelines (n8n), scaling operational efficiency across business units.",
      },
      {
        tag: "Conversational AI",
        title: "Global Conversational Systems",
        desc: "Designed multilingual NLU architectures (English & Arabic) and advanced GenAI/RAG pipelines, improving intent recognition and dialogue fluidity.",
      },
      {
        tag: "Full-Stack",
        title: "Full-Stack & Real-Time Integration",
        desc: "Engineered robust backend services and embeddable React widgets with real-time streaming and CRM integrations (Salesforce).",
      },
      {
        tag: "Infrastructure",
        title: "Scalable Multi-Cloud Infrastructure",
        desc: "Deployed high-availability multi-cloud architectures (AWS, GCP, IBM Cloud, OpenShift/Kubernetes) for intensive AI workloads.",
      },
    ],
  },
  contact: {
    badge: "Contact",
    title: "Let's build something together",
    body: "Whether it's a complex AI workflow, a production-grade LLM integration or a conversational system — I'm always up for a good challenge.",
    cta: "Send an email",
    or: "or reach me on",
  },
  footer: {
    rights: "Built with Next.js, Tailwind CSS & Magic UI.",
  },
  notFound: {
    title: "Page not found",
    body: "This route doesn't exist — maybe the agent hallucinated it.",
    back: "Back home",
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
    title: "Matheus Fabio Antelo — Ingeniero de IA y Arquitecto de Automatización",
    description:
      "Ingeniero de IA y Arquitecto de Automatización. Construyo sistemas inteligentes con LLMs, orquestación multi-agente, RAG e integraciones empresariales.",
  },
  nav: {
    home: "Inicio",
    about: "Sobre mí",
    work: "Experiencia",
    projects: "Proyectos",
    skills: "Habilidades",
    contact: "Contacto",
    cv: "Descargar CV",
    theme: "Cambiar tema",
    language: "Idioma",
    github: "GitHub",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    email: "Email",
  },
  hero: {
    status: "Disponible · Reubicación a España",
    greeting: "Hola, soy Matheus",
    roles: ["Ingeniero de IA", "Arquitecto de Automatización", "Constructor Multi-Agente", "Dev de IA Conversacional"],
    tagline:
      "Convierto investigación en LLMs en sistemas de producción — orquestación multi-agente, pipelines RAG e integraciones empresariales que realmente llegan a producción.",
    ctaProjects: "Ver proyectos",
    ctaCv: "Descargar CV",
    ctaContact: "Contáctame",
  },
  stats: {
    years: "años llevando IA a producción",
    companies: "empresas, de startups a BRF (Sadia)",
    languages: "idiomas atendidos por mis asistentes",
    certs: "certificaciones de cloud e infraestructura",
  },
  about: {
    title: "Sobre mí",
    body: [
      "Soy **Ingeniero de IA** y **Arquitecto de Automatización**, enfocado en desplegar sistemas autónomos de alto impacto. Me especializo en LLMs, RAG y Agentic AI, convirtiendo investigación experimental en software confiable y listo para la empresa.",
      "Hoy diseño arquitecturas multi-agente en **IBM watsonx Orchestrate** con el protocolo **MCP**, respaldadas por servicios NestJS y pipelines RAG en Python. Antes lideré proyectos de IA conversacional para grandes empresas en cuatro idiomas — EN, ES, PT y árabe.",
    ],
  },
  work: {
    title: "Experiencia profesional",
    present: "Actualidad",
    jobs: [
      {
        company: "CXP",
        title: "AI Engineer",
        period: "Ene 2026 – Actualidad",
        bullets: [
          "Diseño e implementación de arquitecturas multiagente utilizando IBM watsonx Orchestrate y protocolo MCP.",
          "Desarrollo de servicios de orquestación con NestJS y TypeScript para entornos empresariales.",
          "Implementación de soluciones RAG con Python y bases de datos vectoriales para recuperación avanzada de conocimiento.",
        ],
      },
      {
        company: "BRF (Sadia)",
        title: "Senior Full Stack AI Developer — IBM Watson Assistant",
        period: "May 2025 – Dic 2025",
        bullets: [
          "Desarrollo de arquitecturas RAG integradas con modelos fundacionales y bases de datos vectoriales.",
          "Integración de APIs corporativas y Salesforce para automatización de procesos y personalización de experiencias.",
          "Desarrollo de soluciones conversacionales multilingües (EN, ES, PT, AR).",
          "Optimización del rendimiento y precisión de asistentes inteligentes.",
        ],
      },
      {
        company: "ONNI.IA",
        title: "Full Stack AI Developer — IBM Watson Assistant",
        period: "Feb 2024 – Abr 2025",
        bullets: [
          "Desarrollo de chatbots corporativos avanzados utilizando IBM Watson Assistant e IA Generativa.",
          "Implementación de integraciones omnicanal para atención al cliente y automatización empresarial.",
          "Diseño de flujos conversacionales.",
        ],
      },
      {
        company: "Reach",
        title: "Full Stack AI Developer — IBM Watson Assistant",
        period: "Oct 2022 – Feb 2024",
        bullets: [
          "Desarrollo de APIs RESTful y microservicios para integración de sistemas corporativos.",
          "Participación en migración de aplicaciones monolíticas hacia arquitecturas modernas.",
        ],
      },
    ],
  },
  education: {
    title: "Formación",
    school: "AMPLI",
    degree: "Grado en Ingeniería de Software · São Paulo, Brasil",
    period: "2022 – Actualidad",
    certsTitle: "Certificaciones",
  },
  skills: {
    badge: "Habilidades",
    title: "El stack detrás de los agentes",
    subtitle: "Arrastra la esfera — es la caja de herramientas que uso cada semana.",
    groups: { ai: "IA y Automatización", dev: "Desarrollo Full-Stack", cloud: "Cloud e Infraestructura" },
  },
  architecture: {
    badge: "Cómo construyo",
    title: "Anatomía de un sistema de agentes",
    subtitle:
      "Todos los canales llegan a un único orquestador. Planifica, recupera contexto, llama herramientas vía MCP y responde con el modelo adecuado para cada tarea.",
    channels: "Canales",
    orchestrator: "Orquestador",
    nodes: { web: "Widget web", whatsapp: "WhatsApp", slack: "Apps de chat", llm: "LLM", rag: "Vector DB · RAG", tools: "Herramientas · MCP", crm: "CRM · Salesforce" },
  },
  projects: {
    badge: "Mis proyectos",
    title: "Cosas que he construido",
    subtitle: "Trabajo open source en benchmarking, agentes, automatización y apps full-stack.",
    repo: "Código",
    featured: "Destacado",
    terminalCaption: "Números reales de una ejecución en portátil solo-CPU (16 GB RAM, q4_K_M).",
    items: {
      edgebench:
        "Suite de benchmarking para LLMs open-weight en hardware de consumo. Mide rendimiento (TTFT, tokens/s, RAM) y calidad (MMLU, IFEval, HumanEval) y genera un informe HTML autocontenido. Sin coste de API — funciona con inferencia local vía Ollama o llama.cpp.",
      multiagent:
        "Sistema multi-agente con RAG para búsqueda y generación de respuestas contextualizadas. Orquesta agentes especializados con retrieval aumentado.",
      discord:
        "Bot de tareas para Discord con automatización de flujos. Gestiona tareas, notificaciones e integración con canales de comunicación.",
      pets: "Plataforma de adopción y gestión de mascotas. Registro, búsqueda y conexión entre adoptantes y ONGs.",
      todo: "App web de lista de tareas con interfaz intuitiva: crear, editar y completar tareas.",
    },
  },
  github: {
    badge: "Open Source",
    title: "Actividad en GitHub",
    note: "Datos en vivo desde la API de GitHub. Se actualiza cada pocas horas.",
    fallback: "Las estadísticas no están disponibles ahora — mira el perfil en GitHub.",
  },
  highlights: {
    badge: "Highlights",
    title: "Lo que he entregado",
    subtitle: "El tipo de problemas que me han confiado.",
    items: [
      {
        tag: "Orquestación de IA",
        title: "Orquestación de IA empresarial",
        desc: "Diseñé sistemas multi-agente en IBM watsonx y pipelines de automatización orientados a eventos (n8n), escalando la eficiencia operativa en las unidades de negocio.",
      },
      {
        tag: "IA conversacional",
        title: "Sistemas conversacionales globales",
        desc: "Diseñé arquitecturas NLU multilingües (inglés y árabe) y pipelines avanzados de GenAI/RAG, mejorando el reconocimiento de intenciones y la fluidez del diálogo.",
      },
      {
        tag: "Full-Stack",
        title: "Full-Stack e integración en tiempo real",
        desc: "Desarrollé servicios backend robustos y widgets embebibles en React con streaming en tiempo real e integraciones con CRM (Salesforce).",
      },
      {
        tag: "Infraestructura",
        title: "Infraestructura multi-cloud escalable",
        desc: "Desplegué arquitecturas multi-cloud de alta disponibilidad (AWS, GCP, IBM Cloud, OpenShift/Kubernetes) para cargas de trabajo intensivas de IA.",
      },
    ],
  },
  contact: {
    badge: "Contacto",
    title: "Construyamos algo juntos",
    body: "Sea un workflow complejo de IA, una integración de LLM en producción o un sistema conversacional — siempre estoy listo para un buen reto.",
    cta: "Enviar un email",
    or: "o escríbeme por",
  },
  footer: {
    rights: "Hecho con Next.js, Tailwind CSS y Magic UI.",
  },
  notFound: {
    title: "Página no encontrada",
    body: "Esta ruta no existe — quizá el agente la alucinó.",
    back: "Volver al inicio",
  },
};

const pt: Dictionary = {
  meta: {
    title: "Matheus Fabio Antelo — Engenheiro de IA e Arquiteto de Automação",
    description:
      "Engenheiro de IA e Arquiteto de Automação. Construo sistemas inteligentes com LLMs, orquestração multi-agente, RAG e integrações corporativas.",
  },
  nav: {
    home: "Início",
    about: "Sobre",
    work: "Experiência",
    projects: "Projetos",
    skills: "Habilidades",
    contact: "Contato",
    cv: "Baixar CV",
    theme: "Alternar tema",
    language: "Idioma",
    github: "GitHub",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    email: "E-mail",
  },
  hero: {
    status: "Aberto a oportunidades · Mudança para a Espanha",
    greeting: "Olá, eu sou o Matheus",
    roles: ["Engenheiro de IA", "Arquiteto de Automação", "Construtor Multi-Agente", "Dev de IA Conversacional"],
    tagline:
      "Transformo pesquisa em LLMs em sistemas de produção — orquestração multi-agente, pipelines RAG e integrações corporativas que realmente vão ao ar.",
    ctaProjects: "Ver projetos",
    ctaCv: "Baixar CV",
    ctaContact: "Fale comigo",
  },
  stats: {
    years: "anos colocando IA em produção",
    companies: "empresas, de startups à BRF (Sadia)",
    languages: "idiomas atendidos pelos meus assistentes",
    certs: "certificações de cloud e infraestrutura",
  },
  about: {
    title: "Sobre",
    body: [
      "Sou **Engenheiro de IA** e **Arquiteto de Automação**, focado em implantar sistemas autônomos de alto impacto. Sou especialista em LLMs, RAG e Agentic AI, transformando pesquisa experimental em software confiável e pronto para empresas.",
      "Hoje desenho arquiteturas multi-agente no **IBM watsonx Orchestrate** com o protocolo **MCP**, sustentadas por serviços NestJS e pipelines RAG em Python. Antes, liderei projetos de IA conversacional para grandes empresas em quatro idiomas — EN, ES, PT e árabe.",
    ],
  },
  work: {
    title: "Experiência profissional",
    present: "Atual",
    jobs: [
      {
        company: "CXP",
        title: "Engenheiro de IA",
        period: "Jan 2026 – Atual",
        bullets: [
          "Desenho e implementação de arquiteturas multiagente usando IBM watsonx Orchestrate e protocolo MCP.",
          "Desenvolvimento de serviços de orquestração com NestJS e TypeScript para ambientes corporativos.",
          "Implementação de soluções RAG com Python e bancos de dados vetoriais para recuperação avançada de conhecimento.",
        ],
      },
      {
        company: "BRF (Sadia)",
        title: "Desenvolvedor Full Stack IA Sênior — IBM Watson Assistant",
        period: "Mai 2025 – Dez 2025",
        bullets: [
          "Desenvolvimento de arquiteturas RAG integradas com modelos fundacionais e bancos vetoriais.",
          "Integração de APIs corporativas e Salesforce para automação de processos e personalização de experiências.",
          "Desenvolvimento de soluções conversacionais multilíngues (EN, ES, PT, AR).",
          "Otimização de desempenho e precisão de assistentes inteligentes.",
        ],
      },
      {
        company: "ONNI.IA",
        title: "Desenvolvedor Full Stack IA — IBM Watson Assistant",
        period: "Fev 2024 – Abr 2025",
        bullets: [
          "Desenvolvimento de chatbots corporativos avançados usando IBM Watson Assistant e IA Generativa.",
          "Implementação de integrações omnichannel para atendimento ao cliente e automação empresarial.",
          "Design de fluxos conversacionais.",
        ],
      },
      {
        company: "Reach",
        title: "Desenvolvedor Full Stack IA — IBM Watson Assistant",
        period: "Out 2022 – Fev 2024",
        bullets: [
          "Desenvolvimento de APIs RESTful e microsserviços para integração de sistemas corporativos.",
          "Participação na migração de aplicações monolíticas para arquiteturas modernas.",
        ],
      },
    ],
  },
  education: {
    title: "Formação",
    school: "AMPLI",
    degree: "Bacharelado em Engenharia de Software · São Paulo, Brasil",
    period: "2022 – Atual",
    certsTitle: "Certificações",
  },
  skills: {
    badge: "Habilidades",
    title: "A stack por trás dos agentes",
    subtitle: "Arraste a esfera — é a caixa de ferramentas que uso toda semana.",
    groups: { ai: "IA e Automação", dev: "Desenvolvimento Full-Stack", cloud: "Cloud e Infraestrutura" },
  },
  architecture: {
    badge: "Como eu construo",
    title: "Anatomia de um sistema de agentes",
    subtitle:
      "Todos os canais chegam a um único orquestrador. Ele planeja, recupera contexto, chama ferramentas via MCP e responde com o modelo certo para cada tarefa.",
    channels: "Canais",
    orchestrator: "Orquestrador",
    nodes: { web: "Widget web", whatsapp: "WhatsApp", slack: "Apps de chat", llm: "LLM", rag: "Vector DB · RAG", tools: "Ferramentas · MCP", crm: "CRM · Salesforce" },
  },
  projects: {
    badge: "Meus projetos",
    title: "Coisas que construí",
    subtitle: "Trabalho open source em benchmarking, agentes, automação e apps full-stack.",
    repo: "Código",
    featured: "Destaque",
    terminalCaption: "Números reais de uma execução em notebook só-CPU (16 GB RAM, q4_K_M).",
    items: {
      edgebench:
        "Suite de benchmark para LLMs open-weight em hardware de consumo. Mede desempenho (TTFT, tokens/s, RAM) e qualidade (MMLU, IFEval, HumanEval) e gera um relatório HTML autocontido. Custo zero de API — roda inteiramente em inferência local via Ollama ou llama.cpp.",
      multiagent:
        "Sistema multi-agente com RAG para busca e geração de respostas contextualizadas. Orquestra agentes especializados com retrieval aumentado.",
      discord:
        "Bot de tarefas para Discord com automação de fluxos. Gerencia tarefas, notificações e integração com canais de comunicação.",
      pets: "Plataforma de adoção e gestão de pets. Cadastro, busca e conexão entre adotantes e ONGs.",
      todo: "App web de lista de tarefas com interface intuitiva: criar, editar e concluir tarefas.",
    },
  },
  github: {
    badge: "Open Source",
    title: "Atividade no GitHub",
    note: "Dados em tempo real da API do GitHub. Atualizado a cada poucas horas.",
    fallback: "Estatísticas indisponíveis no momento — veja o perfil no GitHub.",
  },
  highlights: {
    badge: "Destaques",
    title: "O que já entreguei",
    subtitle: "O tipo de problema que me confiaram.",
    items: [
      {
        tag: "Orquestração de IA",
        title: "Orquestração de IA empresarial",
        desc: "Arquitetei sistemas multi-agente no IBM watsonx e pipelines de automação orientados a eventos (n8n), escalando a eficiência operacional entre unidades de negócio.",
      },
      {
        tag: "IA conversacional",
        title: "Sistemas conversacionais globais",
        desc: "Projetei arquiteturas NLU multilíngues (inglês e árabe) e pipelines avançados de GenAI/RAG, melhorando o reconhecimento de intenções e a fluidez do diálogo.",
      },
      {
        tag: "Full-Stack",
        title: "Full-Stack e integração em tempo real",
        desc: "Construí serviços backend robustos e widgets React embarcáveis com streaming em tempo real e integrações com CRM (Salesforce).",
      },
      {
        tag: "Infraestrutura",
        title: "Infraestrutura multi-cloud escalável",
        desc: "Implantei arquiteturas multi-cloud de alta disponibilidade (AWS, GCP, IBM Cloud, OpenShift/Kubernetes) para cargas de trabalho intensivas de IA.",
      },
    ],
  },
  contact: {
    badge: "Contato",
    title: "Vamos construir algo juntos",
    body: "Seja um workflow complexo de IA, uma integração de LLM em produção ou um sistema conversacional — estou sempre pronto para um bom desafio.",
    cta: "Enviar um e-mail",
    or: "ou fale comigo pelo",
  },
  footer: {
    rights: "Feito com Next.js, Tailwind CSS e Magic UI.",
  },
  notFound: {
    title: "Página não encontrada",
    body: "Esta rota não existe — talvez o agente tenha alucinado.",
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

/** Prefix an absolute public path with the GitHub Pages base path. */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
