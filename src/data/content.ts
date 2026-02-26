import { PersonalInfo, Experience, Award, TechRadar, Project } from '@/types'

export const personalInfo: PersonalInfo = {
  name: 'Dave',
  fullName: 'David Adarkwah',
  role: 'Senior AI & Data Engineer',
  location: 'London, UK',
  heritage: 'Ghanaian',
  email: 'davidwyse48@gmail.com',
  github: 'https://github.com/adark-d',
  linkedin: 'https://www.linkedin.com/in/d-adark/',
  cv: '/david-cv.pdf',
  calendly: 'https://calendly.com/d-adark/30min',
  tagline: 'I engineer the foundation for applied intelligence.',
  subTagline:
    'Bridging the gap between chaotic data and autonomous systems through fault-tolerant pipelines, production MLOps, and multi-agent LLM orchestration.',
  philosophy:
    "From my roots in Ghana to building systems in London, I have always believed that raw data is just noise until you engineer it into something meaningful. The best architecture brings order to chaos and drives real world action. Today, I am applying this exact philosophy at Bloomberg to build global climate infrastructure, deepening my AI expertise at Georgia Tech, and building Residia—the trust infrastructure for Africa's real estate market.",
}

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

export const awards: Award[] = [
  {
    title: 'Zindi Hackathon Winner',
    date: '09/2021',
    desc: 'Best-performing insurance claim prediction model using XGBoost.',
  },
  {
    title: 'Zindi Hackathon Runner-up',
    date: '05/2023',
    desc: 'Cryptojacking detection classifier, 3rd best F1 Score.',
  },
  {
    title: 'Conference Speaker',
    date: '2021 & 2022',
    desc: 'Delivered technical talks on data engineering and machine learning.',
  },
]

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

export const selectedWorks: Project[] = [
  {
    id: '01',
    title: 'NyamekoBench',
    category: 'AI Research & Evaluation',
    description:
      'A pioneering LLM benchmarking framework designed to evaluate models on African legal, financial, and cultural contexts. Bridging the gap in AI equity.',
    stack: ['Python', 'GCP', 'LLM Orchestration'],
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    details: {
      problem:
        'Standard LLM benchmarks (like MMLU) are dominated by Western-context tasks. Models scoring 90%+ completely fail when asked about Ghanaian property law, West African economic data, or Twi-English code-switching. This benchmark gap prevents equitable AI deployment.',
      architecture: [
        {
          label: 'Evaluation Harness',
          desc: 'Custom Python framework inspired by EleutherAI, supporting multi-model parallel evaluation.',
        },
        {
          label: 'LLM Orchestration',
          desc: 'Routes prompts across local Ollama models, Claude, GPT-4, and Gemini seamlessly.',
        },
        {
          label: 'Dataset Curation',
          desc: 'Hand-curated task sets blending existing African NLP datasets with original localized queries.',
        },
      ],
      impact:
        'Publishing as a public leaderboard and arXiv preprint. Acts as a core portfolio signal to frontier AI labs regarding my commitment to responsible, localized AI research.',
      githubUrl: '#',
      liveUrl: '#',
    },
  },
  {
    id: '02',
    title: 'Residia',
    category: 'Proptech Venture · Founder',
    description:
      "The most trusted way to transact property. An AI-driven platform combining secure escrow, verified offerings, and smart matching to solve a GHS 2.9B annual pain point in Ghana's rental ecosystem.",
    stack: ['React', 'FastAPI', 'Ollama', 'Escrow Infrastructure'],
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    details: {
      problem:
        "Ghana's rental market is a GHS 12B ecosystem plagued by trust issues. Tenants lose millions annually to fake listings and vanished agents, while landlords face extended vacancies and property damage. The fundamental issue isn't technology—it's trust. The market suffers GHS 2.94B in quantified annual pain.",
      architecture: [
        {
          label: 'Core AI Engine',
          desc: 'Dual-LLM orchestration using local Ollama models for offline/cost-sensitive tasks, switching to Cloud models for complex matching.',
        },
        {
          label: 'Trust & Financial Layer',
          desc: 'Secure escrow infrastructure holding advance payments (which average 12-24 months in Ghana) to protect both parties.',
        },
        {
          label: 'Data Pipeline',
          desc: 'Ensemble ML valuation models (XGBoost) running real-time anomaly detection to flag suspiciously priced or predatory listings.',
        },
        {
          label: 'Frontend',
          desc: "React + Tailwind mobile-first interface designed for Ghana's high smartphone penetration urban demographic.",
        },
      ],
      impact:
        'Currently in MVP engineering phase. Validated via deep stakeholder interviews. Building the rails that make every property deal safe, verified, and reliable before expanding into property sales and regional markets.',
      githubUrl: '#',
      liveUrl: '#',
    },
  },
  {
    id: '03',
    title: 'InferenceGateway',
    category: 'AI Infrastructure',
    description:
      'A high-throughput, unified LLM API gateway engineered in Go. Features intelligent routing across major providers, semantic caching, and strict cost controls.',
    stack: ['Go', 'Redis', 'AWS ECS'],
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    details: {
      problem:
        'Production AI applications cannot be tied to a single LLM provider due to rate limits, downtime, and cost variability. Every enterprise team building on multiple LLMs reinvents the unified API routing wheel.',
      architecture: [
        {
          label: 'Concurrency Layer',
          desc: 'Built entirely in Go, leveraging goroutines for concurrent provider health checks and extremely low-latency routing.',
        },
        {
          label: 'Semantic Caching',
          desc: 'Redis integration that caches semantically similar prompts to bypass redundant, expensive API calls.',
        },
        {
          label: 'Fallback Chains',
          desc: 'Automatic failover handling from Cloud LLMs to local instances to guarantee uptime.',
        },
      ],
      impact:
        'Demonstrates production AI architecture at scale. Solves a major infrastructure pain point that separates pure model-trainers from Staff-level AI Engineers.',
      githubUrl: '#',
      liveUrl: '#',
    },
  },
  {
    id: '04',
    title: 'ModelForge',
    category: 'MLOps Platform',
    description:
      'A lean, service-oriented experiment tracking and model registry platform. Designed for teams needing robust MLOps without the overhead of massive enterprise tools.',
    stack: ['Python', 'FastAPI', 'PostgreSQL'],
    image:
      'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=1200&auto=format&fit=crop',
    details: {
      problem:
        'Tracking what was tried, what worked, what was deployed, and why becomes unmanageable without infrastructure. Existing enterprise tools are often too complex to self-host cleanly for agile teams.',
      architecture: [
        {
          label: 'Backend Service',
          desc: 'Clean FastAPI implementation with SQLAlchemy ORM and robust database migration strategies.',
        },
        {
          label: 'Artefact Storage',
          desc: 'AWS S3 integration utilizing presigned URL patterns for highly secure model weight uploads/downloads.',
        },
        {
          label: 'Integration',
          desc: 'Features an MLflow tracking client compatibility layer so existing code can point seamlessly at ModelForge.',
        },
      ],
      impact:
        'Serves as the foundational registry layer for a broader MLOps trilogy, demonstrating deep systems-level thinking for AI deployments.',
      githubUrl: '#',
      liveUrl: '#',
    },
  },
]
