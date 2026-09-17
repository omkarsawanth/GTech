export const CAREER_CATEGORIES = [
  {
    id: 'technology',
    code: '01',
    name: 'Technology',
    description: 'Software systems, machine intelligence, cybersecurity, and digital infrastructure.',
    careers: [
      {
        id: 'software-engineer',
        title: 'Software Engineer',
        field: 'Systems Architecture & Engineering',
        salary: '$115,000 — $165,000',
        demand: '+38% 5-Yr Growth',
        experienceReq: '0-2 YRS FOUNDATIONS',
        manifesto: 'Designs, develops, and maintains resilient production codebases, distributed APIs, and scalable infrastructure.',
        evidenceType: 'Production Code & Artifacts',
        knowledge: ['Computer Science Fundamentals', 'Distributed Systems Protocols', 'Database ACID Semantics', 'Memory Safety & Concurrency'],
        certifications: ['AWS Certified Solutions Architect', 'CKA Kubernetes Administrator'],
        licenses: [],
        portfolio: ['Open-source GitHub Repositories', 'Technical Design Documents', 'Interactive Web Systems'],
        projects: ['Idempotent payment webhook pipeline', 'Sub-50ms distributed cache broker'],
        skills: [
          { name: 'Data Structures & Algorithms', required: 90, baseline: 55, category: 'Core CS' },
          { name: 'System Design & Distributed Systems', required: 85, baseline: 35, category: 'Architecture' },
          { name: 'Modern Languages (TypeScript/Go/Python)', required: 88, baseline: 65, category: 'Engineering' },
          { name: 'Relational & Document Databases', required: 82, baseline: 45, category: 'Data' },
          { name: 'CI/CD & Cloud Infrastructure', required: 78, baseline: 30, category: 'DevOps' },
        ],
        nextAction: {
          badge: 'BUILD A CAPSTONE SYSTEM',
          title: 'Distributed Event-Driven Service Mesh',
          type: 'Production Artifact',
          tags: ['Go / TypeScript', 'Docker', 'PostgreSQL', 'Redis'],
          description: 'Build an idempotent payment or webhook processing gateway with structured error recovery, retry queues, and sub-50ms latency.',
          impactDelta: '+28% Career Readiness'
        }
      },
      {
        id: 'ai-engineer',
        title: 'AI Engineer',
        field: 'Foundation Models & Applied Inference',
        salary: '$140,000 — $195,000',
        demand: '+142% YoY',
        experienceReq: '0-2 YRS FOUNDATIONS',
        manifesto: 'Engineers model inference pipelines, fine-tunes open weights, builds vector spaces, and runs synthetic benchmarks.',
        evidenceType: 'Inference Architectures & Benchmarks',
        knowledge: ['Deep Learning Mathematics', 'Transformer Attention Mechanisms', 'RAG Retrieval Optimization', 'Quantization Kernels'],
        certifications: ['DeepLearning.AI Specialization', 'NVIDIA TensorRT Acceleration'],
        licenses: [],
        portfolio: ['Hugging Face Model Weights', 'Retrieval Benchmark Notebooks', 'Local LLM Applications'],
        projects: ['Hybrid sparse-dense retrieval engine', 'Quantized 4-bit edge inference server'],
        skills: [
          { name: 'PyTorch & Neural Networks', required: 90, baseline: 40, category: 'Core ML' },
          { name: 'LLM RAG Architectures', required: 92, baseline: 50, category: 'Inference' },
          { name: 'Vector Databases & Similarity Search', required: 85, baseline: 35, category: 'Data' },
          { name: 'Model Quantization & GPU Serving', required: 80, baseline: 25, category: 'Compute' },
          { name: 'Evaluation Benchmarks & Guardrails', required: 84, baseline: 30, category: 'Ops' },
        ],
        nextAction: {
          badge: 'ENGINEER AN AI PIPELINE',
          title: 'Hybrid Multi-Modal Retrieval Core',
          type: 'Technical Blueprint',
          tags: ['Python', 'vLLM', 'Qdrant', 'FastAPI'],
          description: 'Deploy a local, streaming semantic search assistant with verified context reranking, latency profiling, and citation synthesis.',
          impactDelta: '+32% Career Readiness'
        }
      },
      {
        id: 'cybersecurity-analyst',
        title: 'Cybersecurity Specialist',
        field: 'Threat Intelligence & Defensive Operations',
        salary: '$110,000 — $155,000',
        demand: '+54% YoY',
        experienceReq: '0-2 YRS INFRASTRUCTURE',
        manifesto: 'Protects enterprise networks, investigates vulnerabilities, audits compliance, and responds to zero-day incidents.',
        evidenceType: 'Security Audits & Lab Scenarios',
        knowledge: ['TCP/IP Network Stack', 'Zero-Trust Architecture', 'Cryptographic Primitives', 'MITRE ATT&CK Matrix'],
        certifications: ['CompTIA Security+', 'Certified Ethical Hacker (CEH)', 'CISSP Associate'],
        licenses: [],
        portfolio: ['Penetration Test Writeups', 'Wireshark Packet Analysis Reports', 'Security Policy Frameworks'],
        projects: ['Automated SIEM alert correlation script', 'Zero-trust DMZ honeynet configuration'],
        skills: [
          { name: 'Network Protocols & Packet Analysis', required: 90, baseline: 50, category: 'Networks' },
          { name: 'Penetration Testing & Vulnerability Scans', required: 85, baseline: 30, category: 'Offense' },
          { name: 'SIEM Monitoring & Incident Response', required: 88, baseline: 35, category: 'Defense' },
          { name: 'Identity & Access Management (IAM)', required: 80, baseline: 45, category: 'Governance' },
          { name: 'Scripting & Automation (Bash/Python)', required: 82, baseline: 60, category: 'Automation' },
        ],
        nextAction: {
          badge: 'COMPLETE A THREAT LAB',
          title: 'Zero-Trust SOC Simulation Audit',
          type: 'Defensive Lab Case Study',
          tags: ['Wireshark', 'Splunk', 'Linux Security', 'Suricata'],
          description: 'Configure and document an isolated honey-net breach investigation with complete attack path timelines and remediation patches.',
          impactDelta: '+29% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'finance',
    code: '02',
    name: 'Finance & Markets',
    description: 'Capital markets, investment advisory, risk modeling, and corporate treasury.',
    careers: [
      {
        id: 'financial-analyst',
        title: 'Financial Analyst',
        field: 'Corporate Finance & Equity Research',
        salary: '$95,000 — $140,000',
        demand: '+24% Steady Growth',
        experienceReq: '0-2 YRS QUANT / BIZ',
        manifesto: 'Analyzes financial statements, builds valuation models, evaluates revenue drivers, and advises executive resource allocation.',
        evidenceType: 'Financial Models & Investment Memos',
        knowledge: ['GAAP & IFRS Standards', 'Corporate Valuation Theory', 'Capital Structure Optimization', 'Macroeconomic Indicators'],
        certifications: ['CFA Level 1 Candidate', 'FMVA Financial Modeling Certification'],
        licenses: ['FINRA SIE (Securities Industry Essentials)'],
        portfolio: ['3-Statement Discounted Cash Flow Models', 'Public Equity Investment Theses', 'Sensitivity Tables'],
        projects: ['S&P 500 SaaS valuation teardown', 'Private equity buyout scenario matrix'],
        skills: [
          { name: 'Discounted Cash Flow (DCF) & LBO', required: 92, baseline: 40, category: 'Modeling' },
          { name: 'Advanced Excel & Financial Functions', required: 95, baseline: 65, category: 'Tools' },
          { name: 'Accounting & Balance Sheet Analysis', required: 88, baseline: 50, category: 'Theory' },
          { name: 'Data Visualization & Executive Pitching', required: 84, baseline: 55, category: 'Communication' },
          { name: 'Market Forecasting & Macro Analysis', required: 80, baseline: 35, category: 'Markets' },
        ],
        nextAction: {
          badge: 'BUILD A FINANCIAL MODEL',
          title: 'Public Equity Valuation & LBO Thesis',
          type: 'Investment Memo & 3-Statement Model',
          tags: ['Dynamic DCF', 'Scenario Analysis', 'Excel Pro', 'Comps'],
          description: 'Construct an institutional-grade 3-statement model for an S&P 500 company with sensitivity tables, debt covenants, and written thesis.',
          impactDelta: '+34% Career Readiness'
        }
      },
      {
        id: 'risk-analyst',
        title: 'Risk & Quantitative Analyst',
        field: 'Portfolio Risk & Stress Testing',
        salary: '$105,000 — $160,000',
        demand: '+31% YoY',
        experienceReq: '0-2 YRS STATS / FINANCE',
        manifesto: 'Constructs probabilistic exposure frameworks, audits credit default rates, and calibrates stress-test simulations for funds.',
        evidenceType: 'Stress Tests & Statistical Notebooks',
        knowledge: ['Stochastic Calculus', 'Value-at-Risk Frameworks', 'Liquidity Contagion Modeling', 'Basel III Capital Accords'],
        certifications: ['FRM (Financial Risk Manager)', 'CQF (Certificate in Quantitative Finance)'],
        licenses: [],
        portfolio: ['Monte Carlo Simulation Jupyter Notebooks', 'Tail Risk Hedging Papers', 'Copula Distribution Models'],
        projects: ['Multi-asset portfolio VaR engine in Python', 'Credit default swap pricing simulation'],
        skills: [
          { name: 'Value at Risk (VaR) & Monte Carlo', required: 90, baseline: 35, category: 'Quant' },
          { name: 'Python for Quantitative Finance', required: 88, baseline: 45, category: 'Programming' },
          { name: 'Credit & Counterparty Risk Auditing', required: 85, baseline: 30, category: 'Risk' },
          { name: 'Regulatory Standards (Basel III/Dodd-Frank)', required: 80, baseline: 20, category: 'Compliance' },
          { name: 'Time-Series Econometrics', required: 86, baseline: 50, category: 'Statistics' },
        ],
        nextAction: {
          badge: 'SIMULATE A RISK PROTOCOL',
          title: 'Macro Tail-Risk Stress Test Framework',
          type: 'Quantitative Risk Study',
          tags: ['Python', 'Monte Carlo', 'Pandas', 'VaR'],
          description: 'Simulate liquidity contagion shocks across a multi-asset portfolio under 2008 and 2020 market volatility scenarios.',
          impactDelta: '+30% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'design',
    code: '03',
    name: 'Design & Creative',
    description: 'Digital interfaces, brand architecture, industrial artifacts, and spatial experiences.',
    careers: [
      {
        id: 'ux-designer',
        title: 'Product & UX Designer',
        field: 'Human-Computer Interaction & Systems Design',
        salary: '$95,000 — $145,000',
        demand: '+29% Growth',
        experienceReq: '0-2 YRS PORTFOLIO',
        manifesto: 'Synthesizes user behavioral friction into intuitive spatial navigation, coherent component tokens, and accessible workflows.',
        evidenceType: 'Case Studies & Interactive Prototypes',
        knowledge: ['Cognitive Ergonomics', 'WCAG 2.1 AA Accessibility', 'Design Systems Governance', 'Information Hierarchy'],
        certifications: ['Nielsen Norman Group UX Master', 'Interaction Design Foundation Certified'],
        licenses: [],
        portfolio: ['Figma Design System Libraries', 'End-to-End User Journey Studies', 'Interactive Framer Prototypes'],
        projects: ['Enterprise SaaS dashboard design system', 'Mobile checkout flow friction reduction'],
        skills: [
          { name: 'User Research & Journey Synthesis', required: 90, baseline: 45, category: 'Research' },
          { name: 'Design Tokens & Multi-Brand Systems', required: 88, baseline: 35, category: 'Systems' },
          { name: 'Interactive Figma Prototyping', required: 94, baseline: 65, category: 'Execution' },
          { name: 'Information Architecture & Microcopy', required: 82, baseline: 40, category: 'Structure' },
          { name: 'Usability Testing & Quantitative Audits', required: 85, baseline: 30, category: 'Validation' },
        ],
        nextAction: {
          badge: 'PUBLISH A DESIGN CASE STUDY',
          title: 'Complex Fintech Onboarding Redesign',
          type: 'End-to-End Case Study',
          tags: ['Figma Tokens', 'User Testing', 'WCAG 2.1 AA', 'Prototype'],
          description: 'Document the end-to-end research, low-fidelity tests, tokenized component spec, and verified 40% reduction in user cognitive load.',
          impactDelta: '+36% Career Readiness'
        }
      },
      {
        id: 'creative-director',
        title: 'Brand & Creative Director',
        field: 'Creative Strategy & Visual Direction',
        salary: '$120,000 — $180,000',
        demand: '+18% Steady',
        experienceReq: '2-4 YRS LEADERSHIP',
        manifesto: 'Guides brand narrative, aesthetic cohesion, photographic art direction, and cultural resonance across customer touchpoints.',
        evidenceType: 'Brand Guidelines & Creative Campaigns',
        knowledge: ['Visual Semiotics', 'Editorial Grid Theory', 'Art Direction Leadership', 'Cross-Platform Brand Scaling'],
        certifications: ['AIGA Professional Member', 'D&AD Creative Direction Program'],
        licenses: [],
        portfolio: ['Comprehensive Brand Guidelines Books', 'Editorial Campaign Lookbooks', 'Custom Type Specimens'],
        projects: ['Global rebrand for green mobility fleet', 'Omnichannel experiential product launch'],
        skills: [
          { name: 'Narrative Strategy & Positioning', required: 92, baseline: 50, category: 'Strategy' },
          { name: 'Art Direction & Visual Composition', required: 95, baseline: 60, category: 'Creative' },
          { name: 'Typography & Editorial Grid Systems', required: 90, baseline: 55, category: 'Craft' },
          { name: 'Multi-Channel Campaign Architecture', required: 86, baseline: 40, category: 'Production' },
          { name: 'Creative Team Direction & Critiques', required: 88, baseline: 35, category: 'Leadership' },
        ],
        nextAction: {
          badge: 'PRODUCE A BRAND MANIFESTO',
          title: 'Autonomous Mobility Brand Identity System',
          type: 'Brand Architecture Book',
          tags: ['Identity Specs', 'Spatial Grids', 'Motion Rules', 'Art Direction'],
          description: 'Craft an uncompromising 40-page digital brand guidelines system complete with custom type specimen, sound rules, and campaign launch manifesto.',
          impactDelta: '+27% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'healthcare',
    code: '04',
    name: 'Healthcare & Clinical',
    description: 'Patient diagnostics, public epidemiology, biotechnology, and medical administration.',
    careers: [
      {
        id: 'healthcare-administrator',
        title: 'Healthcare Operations Lead',
        field: 'Clinical Operations & Patient Quality',
        salary: '$90,000 — $135,000',
        demand: '+32% High Demand',
        experienceReq: '0-2 YRS CLINICAL / ADMIN',
        manifesto: 'Coordinates hospital department capacity, ensures strict HIPAA/regulatory compliance, and minimizes patient admission wait times.',
        evidenceType: 'Process Audits & Compliance Case Studies',
        knowledge: ['HIPAA & HITECH Compliance', 'Epic/Cerner EHR Workflows', 'CMS Reimbursement Policies', 'Lean Six Sigma Healthcare'],
        certifications: ['Certified Healthcare Financial Professional (CHFP)', 'Lean Six Sigma Green Belt'],
        licenses: [],
        portfolio: ['Emergency Triage Flow Redesigns', 'HIPAA Privacy Audit Checklists', 'Departmental Operating Budgets'],
        projects: ['ICU bed allocation predictive model', 'Outpatient clinic check-in wait reduction plan'],
        skills: [
          { name: 'Hospital Operating Systems & EHR', required: 88, baseline: 45, category: 'Operations' },
          { name: 'Healthcare Regulatory Compliance (HIPAA)', required: 94, baseline: 50, category: 'Law' },
          { name: 'Patient Throughput & Capacity Modeling', required: 85, baseline: 30, category: 'Logistics' },
          { name: 'Clinical Budgeting & Reimbursement (ICD-10)', required: 82, baseline: 25, category: 'Finance' },
          { name: 'Emergency Crisis Preparedness Protocols', required: 80, baseline: 35, category: 'Safety' },
        ],
        nextAction: {
          badge: 'DESIGN A CLINICAL WORKFLOW',
          title: 'Emergency Department Triage Flow Audit',
          type: 'Clinical Operations Blueprint',
          tags: ['Throughput Model', 'HIPAA Review', 'EHR Integration', 'Staff Allocation'],
          description: 'Model an optimized triage handoff protocol that reduces patient check-in bottleneck by 25 minutes while maintaining strict charting fidelity.',
          impactDelta: '+31% Career Readiness'
        }
      },
      {
        id: 'biotech-researcher',
        title: 'Biotechnology Research Associate',
        field: 'Genomics & Translational Therapeutics',
        salary: '$85,000 — $130,000',
        demand: '+44% YoY',
        experienceReq: '0-2 YRS LAB / RESEARCH',
        manifesto: 'Conducts laboratory assays, synthesizes genomic sequencing data, and documents verifiable preclinical trial experiments.',
        evidenceType: 'Peer Reviews & Lab Notebook Protocols',
        knowledge: ['Molecular Biology Assays', 'Next-Generation Sequencing Data Analysis', 'GLP/GMP Regulatory Frameworks', 'Bioethics & Biosafety'],
        certifications: ['Biosafety Level 2 (BSL-2) Certified', 'ASCP Molecular Biology Technologist'],
        licenses: [],
        portfolio: ['Standard Operating Procedure (SOP) Documents', 'Statistical Power Calculations', 'Sequencing Pipeline Results'],
        projects: ['CRISPR off-target assay protocol validation', 'RNA-Seq differential gene expression pipeline'],
        skills: [
          { name: 'PCR, Gel Electrophoresis & Wet Lab Assays', required: 92, baseline: 60, category: 'Lab' },
          { name: 'Bioinformatics Tools (BLAST, Biopython)', required: 86, baseline: 35, category: 'Data' },
          { name: 'Statistical Experimental Design & ANOVA', required: 88, baseline: 50, category: 'Stats' },
          { name: 'Good Laboratory Practices (GLP/GMP)', required: 90, baseline: 40, category: 'Standards' },
          { name: 'Scientific Manuscript & Grant Writing', required: 80, baseline: 30, category: 'Comms' },
        ],
        nextAction: {
          badge: 'PUBLISH A PROTOCOL REVIEW',
          title: 'Target Validation Assay Protocol Study',
          type: 'Preclinical Study Paper',
          tags: ['qPCR Protocol', 'Statistical Bounds', 'GLP Notebook', 'Sequence Analysis'],
          description: 'Complete a full experimental design and statistical power analysis for a simulated target inhibition assay following peer-review standards.',
          impactDelta: '+28% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'business',
    code: '05',
    name: 'Business & Strategy',
    description: 'Management consulting, go-to-market execution, operational scaling, and enterprise growth.',
    careers: [
      {
        id: 'management-consultant',
        title: 'Strategy & Management Consultant',
        field: 'Corporate Transformation & Market Entry',
        salary: '$110,000 — $160,000',
        demand: '+22% Steady',
        experienceReq: '0-2 YRS CASE RIGOR',
        manifesto: 'Deconstructs complex executive bottlenecks, models total addressable markets, and restructures operating procedures.',
        evidenceType: 'Case Solutions & Strategy Deliverables',
        knowledge: ['MECE Problem Structuring', 'Unit Economics & CAC/LTV Dynamics', 'Post-Merger Integration Playbooks', 'Supply Chain Economics'],
        certifications: ['CMC Certified Management Consultant', 'Wharton Strategy Specialization'],
        licenses: [],
        portfolio: ['Executive Boardroom Slide Decks', 'TAM/SAM/SOM Market Sizing Models', 'Operating Model Blueprints'],
        projects: ['Cross-border market entry model for consumer tech', 'Supply chain consolidation 5-year NPV thesis'],
        skills: [
          { name: 'Hypothesis-Driven Problem Solving (MECE)', required: 94, baseline: 45, category: 'Frameworks' },
          { name: 'Financial & Market Sizing Synthesis', required: 90, baseline: 50, category: 'Quant' },
          { name: 'Executive Storyboarding & Slide Synthesis', required: 92, baseline: 60, category: 'Comms' },
          { name: 'Organizational Change Management', required: 82, baseline: 30, category: 'Leadership' },
          { name: 'Competitive Moat & Unit Economics Audits', required: 86, baseline: 40, category: 'Strategy' },
        ],
        nextAction: {
          badge: 'SOLVE AN ENTERPRISE CASE',
          title: 'Market Entry & Supply Chain Restructuring',
          type: 'Consulting Deck & Strategic Model',
          tags: ['MECE Framework', 'TAM Modeling', 'Executive Deck', 'Capex Analysis'],
          description: 'Structure and present a 20-slide executive proposal assessing a multinational retailer’s $200M automation transition with NPV payback horizons.',
          impactDelta: '+33% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'law',
    code: '06',
    name: 'Law & Policy',
    description: 'Corporate jurisprudence, technology privacy regulation, constitutional advocacy, and contracts.',
    careers: [
      {
        id: 'legal-analyst',
        title: 'Corporate Legal & Compliance Analyst',
        field: 'Commercial Contracts & Regulatory Compliance',
        salary: '$90,000 — $140,000',
        demand: '+26% Growth',
        experienceReq: '0-2 YRS LEGAL RESEARCH',
        manifesto: 'Audits multi-party vendor contracts, analyzes global privacy regulations (GDPR/CCPA), and drafts institutional liability memos.',
        evidenceType: 'Legal Briefs & Contract Audits',
        knowledge: ['Commercial Contract Doctrine', 'GDPR & Cross-Border Data Transfers', 'Antitrust & Intellectual Property Law', 'Litigation Discovery Processes'],
        certifications: ['CIPP/US Information Privacy Professional', 'ABA Paralegal Certificate'],
        licenses: [],
        portfolio: ['Redlined Master Services Agreements (MSAs)', 'Statutory Compliance Comparison Matrices', 'Legal Risk Memos'],
        projects: ['EU AI Act enterprise risk assessment memo', 'SaaS vendor data processing addendum (DPA) audit'],
        skills: [
          { name: 'Contractual Redlining & Terms Analysis', required: 92, baseline: 40, category: 'Contracts' },
          { name: 'Statutory Research (LexisNexis/Westlaw)', required: 88, baseline: 45, category: 'Research' },
          { name: 'Regulatory Compliance Frameworks', required: 86, baseline: 35, category: 'Compliance' },
          { name: 'Risk Mitigation & Structured Brief Writing', required: 90, baseline: 55, category: 'Writing' },
          { name: 'Intellectual Property & Licensing Basics', required: 80, baseline: 30, category: 'IP' },
        ],
        nextAction: {
          badge: 'AUTHOR A LEGAL BRIEF',
          title: 'Cross-Border AI Data Sovereignty Audit',
          type: 'Structured Regulatory Memo',
          tags: ['Statutory Citations', 'Risk Assessment', 'Contract Clauses', 'Compliance'],
          description: 'Draft a 10-page commercial legal memorandum analyzing data transfer liability under EU AI Act provisions for cloud data processors.',
          impactDelta: '+31% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'education',
    code: '07',
    name: 'Education & Pedagogy',
    description: 'Curriculum architecture, instructional technology, higher learning, and cognitive development.',
    careers: [
      {
        id: 'instructional-designer',
        title: 'Curriculum & Learning Architect',
        field: 'Cognitive Science & Educational Design',
        salary: '$80,000 — $120,000',
        demand: '+28% Growth',
        experienceReq: '0-2 YRS PEDAGOGY',
        manifesto: 'Architects learner retention pathways, evaluates mastery checkpoints, and designs multimodal digital instructional units.',
        evidenceType: 'Curriculum Modules & Assessment Rubrics',
        knowledge: ['Cognitive Load Theory', 'Bloom’s Revised Taxonomy', 'ADDIE Instructional Framework', 'Universal Design for Learning (UDL)'],
        certifications: ['ATD Master Instructional Designer', 'Articulate Storyline Certified'],
        licenses: [],
        portfolio: ['Interactive SCORM Learning Modules', 'Rubric & Assessment Frameworks', 'Curriculum Scope & Sequence Charts'],
        projects: ['Executive data literacy 6-week curriculum', 'Adaptive diagnostic math assessment rubric'],
        skills: [
          { name: 'Adult Learning Theory & ADDIE Model', required: 92, baseline: 45, category: 'Theory' },
          { name: 'Assessment & Rubric Design', required: 88, baseline: 50, category: 'Measurement' },
          { name: 'Interactive E-Learning Authoring Tools', required: 86, baseline: 40, category: 'Tools' },
          { name: 'Micro-Learning Cohort Sequencing', required: 84, baseline: 35, category: 'Structure' },
          { name: 'Learner Analytics & Retention Auditing', required: 80, baseline: 25, category: 'Data' },
        ],
        nextAction: {
          badge: 'DESIGN A CURRICULUM MODULE',
          title: 'Blended Masterclass Cohort Curriculum',
          type: 'Instructional Architecture Unit',
          tags: ['Bloom Taxonomy', 'Rubric Guide', 'Asynchronous Labs', 'Analytics'],
          description: 'Design a complete 4-week modular course specification with formative quiz rubrics, project checkpoints, and student cognitive load bounds.',
          impactDelta: '+30% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'engineering',
    code: '08',
    name: 'Industrial & Mechanical',
    description: 'Robotics, physical manufacturing, aerospace dynamics, and renewable energy grids.',
    careers: [
      {
        id: 'mechanical-engineer',
        title: 'Mechanical Design Engineer',
        field: 'Physical Systems & Precision Manufacturing',
        salary: '$92,000 — $140,000',
        demand: '+21% Steady',
        experienceReq: '0-2 YRS CAD / HARDWARE',
        manifesto: 'Designs mechanical assemblies, runs finite element stress analyses, and guides components from CAD drafting to CNC tooling.',
        evidenceType: 'CAD Assemblies & FEA Simulation Reports',
        knowledge: ['Statics & Dynamics Mechanics', 'Material Fatigue & Yield Strength', 'DFM/DFA Manufacturing Guidelines', 'Thermodynamics & Heat Transfer'],
        certifications: ['CSWP (Certified SolidWorks Professional)', 'ASME Member'],
        licenses: ['FE / EIT (Engineer-in-Training)'],
        portfolio: ['Parametric CAD Assembly Packages', 'FEA Stress & Thermal Reports', 'Tolerance Stack-Up Spreadsheets'],
        projects: ['High-torque brushless actuator housing', 'Passive thermal heat sink for rugged IoT edge box'],
        skills: [
          { name: '3D Parametric CAD (SolidWorks/Fusion)', required: 95, baseline: 60, category: 'CAD' },
          { name: 'Finite Element Analysis (FEA) Stress Tests', required: 88, baseline: 35, category: 'Simulation' },
          { name: 'Design for Manufacturability (DFM/DFA)', required: 90, baseline: 40, category: 'Manufacturing' },
          { name: 'Thermodynamics & Fluid Dynamics', required: 85, baseline: 50, category: 'Physics' },
          { name: 'Geometric Dimensioning & Tolerancing (GD&T)', required: 86, baseline: 30, category: 'Standards' },
        ],
        nextAction: {
          badge: 'RUN A FEA STRESS ANALYSIS',
          title: 'High-Torque Robotic Actuator Enclosure',
          type: 'CAD & Thermal Simulation Package',
          tags: ['SolidWorks', 'FEA Report', 'DFM Spec', 'Tolerance Stack'],
          description: 'Design a sealed robotic joint assembly in CAD with full tolerance stack analysis, thermal dissipation simulation, and factory-ready drawings.',
          impactDelta: '+32% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'impact',
    code: '09',
    name: 'Public & Social Impact',
    description: 'Public policy, non-profit governance, urban infrastructure, and civic sustainability.',
    careers: [
      {
        id: 'policy-analyst',
        title: 'Public Policy Analyst',
        field: 'Civic Governance & Legislative Evaluation',
        salary: '$82,000 — $125,000',
        demand: '+27% Growth',
        experienceReq: '0-2 YRS CIVIC / RESEARCH',
        manifesto: 'Evaluates public legislative outcomes, measures demographic impacts, and authors actionable policy whitepapers for government agencies.',
        evidenceType: 'Policy Whitepapers & Cost-Benefit Models',
        knowledge: ['Administrative Law & Rulemaking', 'Cost-Benefit Analysis', 'Demographic Econometrics', 'Public Stakeholder Engagement'],
        certifications: ['MPP Certified Practitioner', 'GIS for Public Policy Certificate'],
        licenses: [],
        portfolio: ['Legislative Impact Analyses', 'Municipal Housing Policy Briefs', 'Stakeholder Testimony Drafts'],
        projects: ['Regional broadband equity subsidy assessment', 'Municipal zoning reform affordability model'],
        skills: [
          { name: 'Statistical Policy Modeling (R/Stata)', required: 88, baseline: 45, category: 'Quantitative' },
          { name: 'Legislative Drafting & Policy Memos', required: 92, baseline: 60, category: 'Analysis' },
          { name: 'Cost-Benefit & Fiscal Impact Audits', required: 85, baseline: 35, category: 'Economics' },
          { name: 'Stakeholder & Civic Advocacy Strategy', required: 82, baseline: 50, category: 'Engagement' },
          { name: 'Open Data & Geographic Information (GIS)', required: 80, baseline: 30, category: 'Spatial' },
        ],
        nextAction: {
          badge: 'AUTHOR A CIVIC WHITEPAPER',
          title: 'Metropolitan Clean Transit Equity Policy',
          type: 'Legislative Analysis & Economic Model',
          tags: ['Fiscal Impact', 'R Policy Model', 'Census GIS', 'Executive Brief'],
          description: 'Author a rigorous 15-page public policy paper assessing fare-free bus corridor expansion with municipal budget offset modeling.',
          impactDelta: '+31% Career Readiness'
        }
      },
      {
        id: 'social-impact-director',
        title: 'Non-Profit Program Lead',
        field: 'Civic Philanthropy & Community Outcomes',
        salary: '$78,000 — $118,000',
        demand: '+23% Steady',
        experienceReq: '0-2 YRS PROGRAM MGMT',
        manifesto: 'Manages grant allocation frameworks, measures program intervention metrics, and aligns community stakeholders for measurable public good.',
        evidenceType: 'Impact Evaluations & Grant Proposals',
        knowledge: ['Theory of Change Frameworks', 'Federal Grant Compliance (2 CFR 200)', 'Monitoring & Evaluation (M&E)', 'Community Coalition Building'],
        certifications: ['Project Management for Development (PMD Pro)', 'Grant Writing Association Certified'],
        licenses: [],
        portfolio: ['Multi-Year Program Logic Models', 'Federal Grant Proposals ($1M+)', 'Quarterly Impact Scorecards'],
        projects: ['Youth workforce development outcome tracker', 'Community food security distribution logistics system'],
        skills: [
          { name: 'Program Logic Models & Theory of Change', required: 90, baseline: 50, category: 'Strategy' },
          { name: 'Grant Writing & Institutional Fundraising', required: 92, baseline: 45, category: 'Funding' },
          { name: 'Outcome Measurement & KPI Auditing', required: 86, baseline: 40, category: 'Analytics' },
          { name: 'Volunteer & Community Coalition Leadership', required: 88, baseline: 60, category: 'Leadership' },
          { name: 'Nonprofit Financial Governance (990)', required: 80, baseline: 30, category: 'Finance' },
        ],
        nextAction: {
          badge: 'DRAFT A FUNDING PROPOSAL',
          title: 'Multi-Year Community Workforce Initiative',
          type: 'Institutional Grant Specification',
          tags: ['Logic Model', 'Budget Narrative', 'Intervention Metrics', 'Coalition MoUs'],
          description: 'Structure a comprehensive grant application package detailing milestone outcomes, participant retention safeguards, and cost per intervention.',
          impactDelta: '+29% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'media',
    code: '10',
    name: 'Media & Communications',
    description: 'Investigative journalism, narrative production, digital communications, and broadcast publishing.',
    careers: [
      {
        id: 'communications-strategist',
        title: 'Communications & Media Strategist',
        field: 'Reputation Architecture & Public Narrative',
        salary: '$85,000 — $135,000',
        demand: '+25% Growth',
        experienceReq: '0-2 YRS NARRATIVE / PR',
        manifesto: 'Formulates multi-platform narrative messaging, manages press briefings, orchestrates crisis mitigation, and directs corporate editorial voice.',
        evidenceType: 'Press Releases, Media Kits & Crisis Manuals',
        knowledge: ['Media Relations Protocols', 'Crisis Communication Frameworks', 'Editorial Style Guides (AP)', 'Audience Sentiment Modeling'],
        certifications: ['PRSA Accredited in Public Relations (APR)', 'HubSpot Content Marketing Certified'],
        licenses: [],
        portfolio: ['Crisis Playbooks with Scenario Responses', 'Global Product Launch Press Kits', 'Executive Thought Leadership Bylines'],
        projects: ['Brand cybersecurity incident press response protocol', 'Tier-1 tech publication placement campaign'],
        skills: [
          { name: 'Crisis Communication & Press Handoffs', required: 92, baseline: 45, category: 'Strategy' },
          { name: 'Executive Speechwriting & Op-Ed Drafting', required: 90, baseline: 55, category: 'Writing' },
          { name: 'Media Landscape & Journalist Outreach', required: 88, baseline: 50, category: 'Relations' },
          { name: 'Narrative Framing & Message Testing', required: 86, baseline: 40, category: 'Craft' },
          { name: 'Media Analytics & Sentiment Tracking', required: 80, baseline: 35, category: 'Data' },
        ],
        nextAction: {
          badge: 'EXECUTE A MEDIA ARCHITECTURE',
          title: 'High-Stakes Corporate Crisis Playbook',
          type: 'Strategic Communications Blueprint',
          tags: ['Press Briefing', 'Q&A Matrix', 'AP Style', 'Escalation Flow'],
          description: 'Draft an exhaustive crisis playbook covering reactive statements, press room staging, spokesperson talking points, and real-time social mitigation.',
          impactDelta: '+32% Career Readiness'
        }
      },
      {
        id: 'investigative-journalist',
        title: 'Investigative Data Journalist',
        field: 'Public Interest Research & Algorithmic Auditing',
        salary: '$75,000 — $120,000',
        demand: '+22% Steady',
        experienceReq: '0-2 YRS JOURNALISM / DATA',
        manifesto: 'Analyzes public datasets, files Freedom of Information Act (FOIA) requests, verifies primary sources, and publishes high-impact accountability stories.',
        evidenceType: 'Investigative Features & Data Repositories',
        knowledge: ['FOIA Law & Public Records Access', 'Journalistic Ethics & Fact Verification', 'Data Wrangling (Pandas/SQL)', 'Digital Source Protection & Encryption'],
        certifications: ['IRE (Investigative Reporters & Editors) Fellow', 'Columbia Data Journalism Certified'],
        licenses: [],
        portfolio: ['Interactive Data Stories', 'Clean Public Datasets on GitHub', 'Multi-Source Investigative Features'],
        projects: ['Municipal contract procurement fraud analysis', 'Algorithmic bail sentencing bias investigation'],
        skills: [
          { name: 'FOIA Filings & Public Records Extraction', required: 92, baseline: 50, category: 'Investigation' },
          { name: 'Data Scraping & Analysis (Python/SQL)', required: 88, baseline: 40, category: 'Data' },
          { name: 'Fact-Checking Rigor & Primary Sourcing', required: 95, baseline: 60, category: 'Ethics' },
          { name: 'Longform Narrative & Visual Storytelling', required: 90, baseline: 55, category: 'Writing' },
          { name: 'Information Security for Whistleblowers', required: 82, baseline: 30, category: 'Security' },
        ],
        nextAction: {
          badge: 'PUBLISH A DATA INVESTIGATION',
          title: 'Algorithmic Municipal Housing Bias Probe',
          type: 'Longform Investigative Package',
          tags: ['FOIA Records', 'Python Pipeline', 'Interactive D3', 'Audio Interviews'],
          description: 'Publish a reproducible investigative piece using scraped public eviction records, complete with a clean CSV dataset and verified methodology note.',
          impactDelta: '+35% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'science',
    code: '11',
    name: 'Science & Research',
    description: 'Environmental analysis, computational research, materials physics, and scientific synthesis.',
    careers: [
      {
        id: 'environmental-scientist',
        title: 'Climate & Environmental Data Scientist',
        field: 'Ecological Modeling & Remote Sensing',
        salary: '$88,000 — $138,000',
        demand: '+39% YoY',
        experienceReq: '0-2 YRS SCIENTIFIC COMPUTING',
        manifesto: 'Processes satellite telemetry, models climate resilience indices, and models atmospheric and watershed interventions for sustainable development.',
        evidenceType: 'Geospatial Models & Environmental Impact Statements',
        knowledge: ['Earth Observation Satellite Systems', 'Climate Feedback Dynamics', 'Hydrological Modeling', 'NEPA Compliance Regulations'],
        certifications: ['GISP Certified GIS Professional', 'QGIS Spatial Specialist'],
        licenses: [],
        portfolio: ['Google Earth Engine Satellite Pipelines', 'Spatial Heat Island Models', 'Watershed Pollutant Diffusion Notebooks'],
        projects: ['Urban canopy cooling index predictive map', 'Agricultural drought telemetry monitor'],
        skills: [
          { name: 'Geospatial Telemetry (Raster/Vector/QGIS)', required: 92, baseline: 50, category: 'Spatial' },
          { name: 'Climate Modeling & Numerical Weather', required: 88, baseline: 35, category: 'Physics' },
          { name: 'Python Scientific Stack (Xarray/Rasterio)', required: 90, baseline: 45, category: 'Computing' },
          { name: 'Environmental Impact Assessment (EIA)', required: 84, baseline: 40, category: 'Regulation' },
          { name: 'Statistical Time-Series & Anomaly Detection', required: 86, baseline: 50, category: 'Stats' },
        ],
        nextAction: {
          badge: 'MODEL A CLIMATE VECTOR',
          title: 'Coastal Storm Surge Vulnerability Index',
          type: 'Geospatial Predictive Package',
          tags: ['GEE Telemetry', 'Hydro Model', 'Xarray', 'Impact Whitepaper'],
          description: 'Construct a reproducible coastal flood model factoring in sea-level rise scenarios, spatial population density, and infrastructure risk layers.',
          impactDelta: '+33% Career Readiness'
        }
      },
      {
        id: 'research-scientist',
        title: 'Quantitative Research Scientist',
        field: 'Applied Mathematics & Computational Research',
        salary: '$115,000 — $170,000',
        demand: '+34% YoY',
        experienceReq: '0-2 YRS RESEARCH LAB',
        manifesto: 'Formulates mathematical hypotheses, writes high-performance simulation algorithms, and discovers fundamental patterns in high-dimensional data.',
        evidenceType: 'Preprint Papers & Benchmark Code Repositories',
        knowledge: ['Multivariate Probability', 'Numerical Optimization Algorithms', 'Bayesian Inference Frameworks', 'Peer Review Methodologies'],
        certifications: ['SIAM Society Member', 'IEEE Signal Processing Society'],
        licenses: [],
        portfolio: ['arXiv Preprints with Reproducible Code', 'Mathematical Proof Notebooks', 'Algorithm Profiling Reports'],
        projects: ['High-dimensional manifold embedding benchmark', 'Distributed Markov Chain Monte Carlo sampler'],
        skills: [
          { name: 'Advanced Mathematics & Numerical Analysis', required: 95, baseline: 60, category: 'Math' },
          { name: 'Scientific Computing (Julia/C++/Python)', required: 92, baseline: 50, category: 'Code' },
          { name: 'Bayesian Statistics & Uncertainty Modeling', required: 88, baseline: 40, category: 'Statistics' },
          { name: 'Scientific Paper Writing (LaTeX)', required: 90, baseline: 55, category: 'Writing' },
          { name: 'Algorithmic Profiling & Optimization', required: 85, baseline: 35, category: 'HPC' },
        ],
        nextAction: {
          badge: 'AUTHOR A RESEARCH SPECIFICATION',
          title: 'High-Dimensional Convex Optimization Study',
          type: 'Preprint Paper & Benchmark Repository',
          tags: ['LaTeX Proofs', 'Julia Core', 'Convergence Bounds', 'Benchmark Datasets'],
          description: 'Author a complete paper establishing mathematical convergence guarantees for an accelerated gradient descent variant with empirical validation.',
          impactDelta: '+36% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'arts',
    code: '12',
    name: 'Creative Arts & Culture',
    description: 'Visual art direction, audio engineering, spatial exhibition design, and cultural curation.',
    careers: [
      {
        id: 'audio-engineer',
        title: 'Audio Engineer & Sound Architect',
        field: 'Acoustic Engineering & Spatial Sound Design',
        salary: '$80,000 — $130,000',
        demand: '+26% Growth',
        experienceReq: '0-2 YRS AUDIO LAB / STUDIO',
        manifesto: 'Crafts immersive spatial audio soundscapes, designs bespoke synthesis patches, and calibrates multichannel acoustic balances.',
        evidenceType: 'Stem Mixes, Sound Design Reels & Game Audio Engines',
        knowledge: ['Psychoacoustics & Room Acoustics', 'Digital Signal Processing (DSP)', 'Spatial Audio (Dolby Atmos/Ambisonics)', 'Interactive Audio Middleware (Wwise/FMOD)'],
        certifications: ['Avid Pro Tools Certified Operator', 'Audinate Dante Level 2'],
        licenses: [],
        portfolio: ['Spatial Audio Interactive Reels', 'Bespoke Synthesizer Patch Libraries', 'Stem Mixing Master Packages'],
        projects: ['Dynamic game audio score integration in Unreal Engine', 'Dolby Atmos immersive multichannel spatial mix'],
        skills: [
          { name: 'Digital Audio Workstations (Pro Tools/Ableton)', required: 96, baseline: 65, category: 'Production' },
          { name: 'Spatial Audio & Binaural Sound (Dolby Atmos)', required: 88, baseline: 30, category: 'Acoustics' },
          { name: 'Interactive Audio Middleware (Wwise/FMOD)', required: 85, baseline: 25, category: 'Engines' },
          { name: 'Spectral Editing & Audio Restoration (iZotope)', required: 90, baseline: 45, category: 'Mastering' },
          { name: 'Acoustic Measurement & Room Calibration', required: 82, baseline: 35, category: 'Physics' },
        ],
        nextAction: {
          badge: 'PRODUCE A SPATIAL AUDIO SUITE',
          title: 'Interactive 3D Game Ambience Architecture',
          type: 'Spatial Sound System & Wwise Session',
          tags: ['Dolby Atmos', 'Wwise Integration', 'Stem Mixes', 'Dynamic DSP'],
          description: 'Design a reactive 5.1/Atmos ambient acoustic landscape with dynamic occlusion filters, Foley soundbeds, and interactive parameter triggers.',
          impactDelta: '+30% Career Readiness'
        }
      },
      {
        id: 'exhibition-curator',
        title: 'Exhibition & Cultural Experience Architect',
        field: 'Spatial Scenography & Cultural Programming',
        salary: '$75,000 — $115,000',
        demand: '+20% Steady',
        experienceReq: '0-2 YRS CURATORIAL / ARCH',
        manifesto: 'Curates public cultural exhibitions, designs visitor spatial journeys, commissions contemporary artists, and publishes exhibition catalog monographs.',
        evidenceType: 'Curatorial Proposals, Floor Plans & Exhibition Catalogs',
        knowledge: ['Art History & Critical Theory', 'Museum Conservation Standards', 'Spatial Scenography & Lighting Design', 'Institutional Grant Administration'],
        certifications: ['Curatorial Leadership Association Fellow', 'Vectorworks Spotlight Fundamentals'],
        licenses: [],
        portfolio: ['3D Exhibition Floorplans (Vectorworks/SketchUp)', 'Published Catalog Essays & Wall Didactics', 'Artist Commission Agreements'],
        projects: ['Contemporary interactive media arts biennial', 'Permanent historical artifact conservation gallery'],
        skills: [
          { name: 'Curatorial Narrative & Catalog Authorship', required: 92, baseline: 55, category: 'Narrative' },
          { name: 'Spatial Layout & Exhibition Lighting (CAD)', required: 88, baseline: 40, category: 'Spatial' },
          { name: 'Object Conservation & Handling Standards', required: 85, baseline: 45, category: 'Care' },
          { name: 'Artist Negotiation & Contract Management', required: 86, baseline: 50, category: 'Governance' },
          { name: 'Public Programming & Educational Tours', required: 82, baseline: 45, category: 'Public' },
        ],
        nextAction: {
          badge: 'CURATE AN EXHIBITION BRIEF',
          title: 'Immersive Technology & Society Biennial',
          type: 'Exhibition Specification & Floor Plan',
          tags: ['CAD Floorplan', 'Wall Didactics', 'Lighting Spec', 'Budget Book'],
          description: 'Deliver a complete 30-page curatorial package featuring an architectural floor plan, lighting plots, loan agreements, and theoretical essay.',
          impactDelta: '+28% Career Readiness'
        }
      }
    ]
  }
];
