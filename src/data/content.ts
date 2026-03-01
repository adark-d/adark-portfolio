import { PersonalInfo, Experience, Award, TechRadar, Project, CareerStage } from '@/types'

/* ─── Personal Info ─────────────────────────────────────────────────── */

export const personalInfo: PersonalInfo = {
  name: 'Dave',
  fullName: 'David Adarkwah',
  role: 'AI & Data Engineer',
  location: 'London, UK',
  heritage: 'Ghanaian',
  email: 'davidwyse48@gmail.com',
  github: 'https://github.com/adark-d',
  linkedin: 'https://www.linkedin.com/in/d-adark/',
  cv: '/david-cv.pdf',
  calendly: 'https://calendly.com/d-adark/30min',
  tagline: 'From raw data to autonomous action. I build the infrastructure in between.',
  subTagline:
    'I build fault-tolerant data pipelines, production MLOps platforms, and multi-agent systems that bridge the gap between chaotic data and autonomous action.',
  philosophy:
    "From my roots in Ghana to building planetary-scale systems in London, my operating philosophy has remained constant: the best architecture brings order to chaos. I don't just train models. I build the infrastructure that allows intelligence to exist reliably in production. Today, I apply this philosophy at Bloomberg to build global climate data utilities.",
}

/* ─── Experience ────────────────────────────────────────────────────── */

export const experience: Experience[] = [
  {
    type: 'work',
    title: 'Senior Engineer, NZDPU',
    org: 'Bloomberg LP',
    date: '2023 — Present',
    desc: 'Engineering high-throughput, fault-tolerant data pipelines processing 14M+ global climate data points annually. Architected and deployed a suite of autonomous AI agents (Gemini, LangChain) for RAG-driven data quality investigation and automated QA, slashing operational latency by 75%.',
    tags: ['Python', 'Go', 'Agentic AI', 'RAG', 'PySpark', 'Airflow'],
  },
  {
    type: 'work',
    title: 'Founder & Lead Architect',
    org: 'Residia',
    date: '2024 — Present',
    desc: "Building the trust infrastructure for property transactions in emerging markets. Architecting a secure escrow, verified offering, and AI-driven matching platform to eliminate fraud and friction in Ghana's GHS 12B rental market.",
    tags: ['Proptech', 'Founder', 'Escrow Tech', 'AI Matching'],
  },
  {
    type: 'edu',
    title: 'MS Computer Science (ML/AI)',
    org: 'Georgia Tech',
    date: '2024 — Expected 2028',
    desc: 'Specializing in Machine Learning and Deep Learning. Bridging the gap between classical data engineering and frontier AI research by training neural networks, implementing reinforcement learning algorithms, and focusing on scalable AI architectures.',
    tags: ['Python', 'Deep Learning', 'PyTorch', 'RL', 'Algorithms'],
  },
  {
    type: 'work',
    title: 'Senior Data Scientist',
    org: 'Consolidated Bank Ghana',
    date: '2021 — 2023',
    desc: 'Architected a real-time credit scoring inference engine that reduced 5-day manual reviews to 2-minute automated decisions. Deployed production NLP pipelines for semantic incident triage, routing 400+ monthly enterprise issues with 96.5% accuracy.',
    tags: ['Python', 'NLP', 'Machine Learning', 'Prefect', 'SQL Server'],
  },
  {
    type: 'work',
    title: 'Lead Data & ML Engineer',
    org: 'CrownCity & Dataware Tech',
    date: '2021 — 2023',
    desc: 'Owned the end-to-end MLOps lifecycle for 5+ enterprise AI platforms. Designed and deployed scalable inference APIs on AWS and integrated MLflow for rigorous model registry, experiment tracking, and drift monitoring.',
    tags: ['Python', 'MLOps', 'AWS', 'Docker', 'FastAPI'],
  },
  {
    type: 'edu',
    title: 'BSc Biomedical Engineering',
    org: 'KNUST',
    date: '2014 — 2018',
    desc: 'Graduated with First Class Honours. Built a rigorous foundation in quantitative modelling, statistical analysis, and algorithmic problem solving.',
    tags: ['Python', 'Quantitative Modelling', 'Statistical Analysis'],
  },
]

/* ─── Career Evolution ──────────────────────────────────────────────── */

export const careerEvolution: CareerStage[] = [
  {
    phase: '01',
    role: 'Data Scientist',
    org: 'Consolidated Bank Ghana',
    period: '2021 — 2023',
    focus: 'Extracting signal from noise.',
    description:
      'Started at the raw data layer. Architected real-time credit scoring inference engines that reduced 5-day manual reviews to 2-minute automated decisions. Mastered classical ML, NLP, and statistical rigour.',
    iconName: 'Database',
  },
  {
    phase: '02',
    role: 'Lead Data & ML Engineer',
    org: 'CrownCity & Dataware Tech',
    period: '2021 — 2023',
    focus: 'Scaling the infrastructure.',
    description:
      'A great model is useless if it cannot be served reliably. Shifted focus to the infrastructure layer — owning the end-to-end MLOps lifecycle. Built scalable inference APIs on AWS and designed enterprise data pipelines.',
    iconName: 'Cpu',
  },
  {
    phase: '03',
    role: 'Senior AI & Data Engineer',
    org: 'Bloomberg LP',
    period: '2023 — Present',
    focus: 'Global fault-tolerance.',
    description:
      'Operating at planetary scale. Engineering high-throughput pipelines processing 14M+ global climate data points annually. Architecting autonomous AI agents for RAG-driven data quality investigation.',
    iconName: 'Network',
  },
  {
    phase: '04',
    role: 'Founder & Architect',
    org: 'Residia / Frontier AI',
    period: '2024 — Future',
    focus: 'Autonomous Systems & Trust.',
    description:
      "Fusing deep infrastructure knowledge with frontier AI. Building Residia's AI-driven escrow trust layer for emerging markets, whilst pursuing advanced ML/AI systems research at Georgia Tech.",
    iconName: 'BrainCircuit',
  },
]

/* ─── Awards & Recognition ──────────────────────────────────────────── */

export const awards: Award[] = [
  {
    title: 'Zindi Hackathon Winner',
    category: 'Predictive Modelling',
    date: '09/2021',
    desc: 'Ranked 1st overall. Engineered the best-performing insurance claim prediction model utilizing highly optimized XGBoost ensembles.',
  },
  {
    title: 'Zindi Hackathon Runner-up',
    category: 'Cybersecurity ML',
    date: '05/2023',
    desc: 'Ranked 2nd globally. Architected a robust cryptojacking detection classifier achieving top-tier F1 scores on unseen test data.',
  },
  {
    title: 'Keynote Tech Speaker',
    category: 'Knowledge Distribution',
    date: '2021 & 2022',
    desc: 'Delivered technical deep-dives on MLOps, scalable data pipelines, and intelligent systems to audiences of 500+ engineers.',
  },
  {
    title: 'AWS DeepRacer Finalist',
    category: 'Reinforcement Learning',
    date: '11/2023',
    desc: 'Trained an autonomous racing agent using PPO, placing top 1% in the London regional summit.',
  },
  {
    title: 'Outstanding Contributor',
    category: 'Open Source ML',
    date: '02/2024',
    desc: 'Recognized for core contributions to LLM orchestration frameworks, specifically around multi-agent routing.',
  },
]

/* ─── Tech Radar ────────────────────────────────────────────────────── */

export const techRadar: TechRadar = {
  adopt: [
    { name: 'Python / Go', desc: 'Core backend & orchestration' },
    { name: 'PySpark & Airflow', desc: 'Distributed processing' },
    { name: 'AWS / GCP', desc: 'Cloud infrastructure' },
    { name: 'FastAPI', desc: 'High-performance APIs' },
  ],
  trial: [
    { name: 'LangGraph', desc: 'Agentic workflows' },
    { name: 'Ollama', desc: 'Local LLM inference' },
    { name: 'Chroma / Vector DBs', desc: 'Semantic retrieval' },
  ],
  assess: [
    { name: 'Multi-Agent Swarms', desc: 'Autonomous task delegation' },
    { name: 'RLHF Pipelines', desc: 'Custom model alignment' },
  ],
}

/* ─── Selected Works ────────────────────────────────────────────────── */

export const selectedWorks: Project[] = [
  {
    id: '01',
    title: 'NyamekoBench',
    type: 'System',
    category: 'AI Research',
    year: '2024',
    description:
      'A pioneering LLM benchmarking framework evaluating models on African legal, financial, and cultural contexts.',
    stack: ['Python', 'GCP', 'LLM Orchestration'],
    image:
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop',
    details: {
      problem:
        'Standard LLM benchmarks are dominated by Western-context tasks. Models scoring 90%+ completely fail when asked about Ghanaian property law or West African economic data.',
      architecture: [
        {
          label: 'Eval Harness',
          desc: 'Custom Python framework inspired by EleutherAI, supporting multi-model parallel evaluation.',
        },
        {
          label: 'LLM Orchestration',
          desc: 'Routes prompts across local Ollama models, Claude, GPT-4, and Gemini seamlessly.',
        },
      ],
    },
  },
  {
    id: '02',
    title: 'Residia Infrastructure',
    type: 'System',
    category: 'Proptech Escrow',
    year: '2024',
    description:
      'An AI-driven platform combining secure escrow, verified offerings, and smart matching.',
    stack: ['React', 'FastAPI', 'Ollama', 'Escrow'],
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    details: {
      problem:
        "Ghana's rental market is a GHS 12B ecosystem plagued by trust issues. Tenants lose millions annually to fake listings, while landlords face extended vacancies.",
      architecture: [
        {
          label: 'Core AI Engine',
          desc: 'Dual-LLM orchestration using local Ollama models for offline/cost-sensitive tasks, switching to Cloud models for complex matching.',
        },
        {
          label: 'Trust Layer',
          desc: 'Secure escrow infrastructure holding advance payments to protect both parties.',
        },
      ],
    },
  },
  {
    id: '03',
    title: 'InferenceGateway',
    type: 'System',
    category: 'AI Infrastructure',
    year: '2023',
    description: 'High-throughput, unified LLM API gateway engineered in Go with semantic caching.',
    stack: ['Go', 'Redis', 'AWS ECS'],
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    details: {
      problem:
        'Production AI applications cannot be tied to a single LLM provider due to rate limits, downtime, and cost variability.',
      architecture: [
        {
          label: 'Concurrency Layer',
          desc: 'Built entirely in Go, leveraging goroutines for concurrent provider health checks and extremely low-latency routing.',
        },
        {
          label: 'Semantic Caching',
          desc: 'Redis integration that caches semantically similar prompts to bypass redundant, expensive API calls.',
        },
      ],
    },
  },
  {
    id: '04',
    title: 'ModelForge',
    type: 'System',
    category: 'MLOps',
    year: '2023',
    description: 'Service-oriented experiment tracking and model registry platform.',
    stack: ['Python', 'PostgreSQL', 'S3'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    details: {
      problem:
        'Tracking what was tried, what worked, what was deployed, and why becomes unmanageable without infrastructure.',
      architecture: [
        {
          label: 'Backend Service',
          desc: 'Clean FastAPI implementation with SQLAlchemy ORM and robust database migration strategies.',
        },
        {
          label: 'Artefact Storage',
          desc: 'AWS S3 integration utilizing presigned URL patterns for highly secure model weight uploads/downloads.',
        },
      ],
    },
  },
  {
    id: '05',
    title: 'Architecting for Fault Tolerance',
    type: 'Article',
    category: 'Data Engineering',
    year: '2023',
    description:
      'A deep dive into how we process 14M+ data points at Bloomberg with zero downtime.',
    stack: ['Publication', 'System Design'],
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop',
    details: {
      problem:
        'Exploring the nuances of distributed systems at planetary scale and how to build self-healing pipelines.',
      architecture: [],
    },
  },
]
