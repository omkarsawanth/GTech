/**
 * GTech Universal Career Ontology & Domain Registry
 * 15 Universal Professional Disciplines supporting all career trajectories.
 */

export const CAREER_CATEGORIES = [
  {
    id: 'technology',
    code: '01',
    name: 'Technology & Computing',
    description: 'Software systems, machine intelligence, distributed cloud infrastructure, and cybersecurity.',
    careers: [
      {
        id: 'software-engineer',
        title: 'Software Engineer',
        domain: 'technology',
        description: 'Designs, develops, and maintains resilient production codebases, distributed APIs, and scalable infrastructure.',
        salary: '$115,000 — $165,000',
        demand: '+38% 5-Yr Growth',
        experienceReq: '0-2 YRS FOUNDATIONS',
        manifesto: 'Designs, develops, and maintains resilient production codebases, distributed APIs, and scalable infrastructure.',
        evidenceType: 'Production Code & Distributed Artifacts',
        skills: [
          { name: 'Data Structures & Algorithms', required: 90, baseline: 55, category: 'Core CS', importance: 'Critical' },
          { name: 'System Design & Distributed Systems', required: 85, baseline: 35, category: 'Architecture', importance: 'Critical' },
          { name: 'Modern Languages (TypeScript/Go/Python)', required: 88, baseline: 65, category: 'Engineering', importance: 'High' },
          { name: 'Relational & Document Databases', required: 82, baseline: 45, category: 'Data', importance: 'High' },
          { name: 'CI/CD & Cloud Infrastructure', required: 78, baseline: 30, category: 'DevOps', importance: 'Medium' },
        ],
        knowledge: ['Computer Science Fundamentals', 'Distributed Protocols', 'Database ACID Semantics', 'Memory Safety & Concurrency'],
        education: ['B.S. Computer Science, Software Engineering, or equivalent practical rigor'],
        certifications: ['AWS Certified Solutions Architect', 'CKA Kubernetes Administrator'],
        licenses: [],
        experience: ['Software Engineering Internships', 'Open-Source Contributions', 'Distributed Systems Labs'],
        portfolio: ['Open-source GitHub Repositories', 'Technical RFC Architecture Docs', 'Interactive Production Systems'],
        projects: ['Idempotent payment webhook pipeline', 'Sub-50ms distributed cache broker'],
        practicalTraining: ['Test-driven development', 'Production incident post-mortems'],
        requiredEvidence: ['GitHub Repository with CI/CD', 'Live Deployed API', 'System Design Document'],
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
        domain: 'technology',
        description: 'Engineers model inference pipelines, fine-tunes open weights, builds vector spaces, and runs synthetic benchmarks.',
        salary: '$140,000 — $195,000',
        demand: '+142% YoY',
        experienceReq: '0-2 YRS FOUNDATIONS',
        manifesto: 'Engineers model inference pipelines, fine-tunes open weights, builds vector spaces, and runs synthetic benchmarks.',
        evidenceType: 'Inference Architectures & Benchmarks',
        skills: [
          { name: 'PyTorch & Neural Networks', required: 90, baseline: 40, category: 'Core ML', importance: 'Critical' },
          { name: 'LLM RAG Architectures', required: 92, baseline: 50, category: 'Inference', importance: 'Critical' },
          { name: 'Vector Databases & Similarity Search', required: 85, baseline: 35, category: 'Data', importance: 'High' },
          { name: 'Model Quantization & GPU Serving', required: 80, baseline: 25, category: 'Compute', importance: 'High' },
          { name: 'Evaluation Benchmarks & Guardrails', required: 84, baseline: 30, category: 'Ops', importance: 'Medium' },
        ],
        knowledge: ['Deep Learning Mathematics', 'Transformer Attention Mechanisms', 'RAG Retrieval Optimization', 'Quantization Kernels'],
        education: ['B.S. in CS, Artificial Intelligence, Mathematics, or Computational Sciences'],
        certifications: ['DeepLearning.AI Specialization', 'NVIDIA TensorRT Acceleration'],
        licenses: [],
        experience: ['AI Research Labs', 'Applied Model Serving Internships'],
        portfolio: ['Hugging Face Model Weights', 'Retrieval Benchmark Notebooks', 'Local LLM Applications'],
        projects: ['Hybrid sparse-dense retrieval engine', 'Quantized 4-bit edge inference server'],
        practicalTraining: ['GPU cluster profiling', 'Adversarial evaluation testing'],
        requiredEvidence: ['Inference Benchmark Report', 'Jupyter Research Notebook', 'Deployed RAG Assistant'],
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
        domain: 'technology',
        description: 'Protects enterprise networks, investigates vulnerabilities, audits compliance, and responds to zero-day incidents.',
        salary: '$110,000 — $155,000',
        demand: '+54% YoY',
        experienceReq: '0-2 YRS INFRASTRUCTURE',
        manifesto: 'Protects enterprise networks, investigates vulnerabilities, audits compliance, and responds to zero-day incidents.',
        evidenceType: 'Security Audits & Lab Scenarios',
        skills: [
          { name: 'Network Protocols & Packet Analysis', required: 90, baseline: 50, category: 'Networks', importance: 'Critical' },
          { name: 'Penetration Testing & Vulnerability Scans', required: 85, baseline: 30, category: 'Offense', importance: 'Critical' },
          { name: 'SIEM Monitoring & Incident Response', required: 88, baseline: 35, category: 'Defense', importance: 'High' },
          { name: 'Identity & Access Management (IAM)', required: 80, baseline: 45, category: 'Governance', importance: 'Medium' },
          { name: 'Scripting & Automation (Bash/Python)', required: 82, baseline: 60, category: 'Automation', importance: 'High' },
        ],
        knowledge: ['TCP/IP Network Stack', 'Zero-Trust Architecture', 'Cryptographic Primitives', 'MITRE ATT&CK Matrix'],
        education: ['B.S. Cybersecurity, Computer Networks, or Information Assurance'],
        certifications: ['CompTIA Security+', 'Certified Ethical Hacker (CEH)', 'CISSP Associate'],
        licenses: [],
        experience: ['SOC Monitoring Labs', 'Capture-the-Flag (CTF) Competitions'],
        portfolio: ['Penetration Test Writeups', 'Wireshark Packet Analysis Reports', 'Security Policy Frameworks'],
        projects: ['Automated SIEM alert correlation script', 'Zero-trust DMZ honeynet configuration'],
        practicalTraining: ['Live red/blue team simulations', 'Forensic memory dumping'],
        requiredEvidence: ['Threat Assessment Memo', 'Packet Inspection Walkthrough', 'Hardened Config Spec'],
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
    id: 'engineering',
    code: '02',
    name: 'Engineering & Hardware',
    description: 'Robotics, physical manufacturing, aerospace dynamics, and renewable energy systems.',
    careers: [
      {
        id: 'mechanical-engineer',
        title: 'Mechanical Design Engineer',
        domain: 'engineering',
        description: 'Designs mechanical assemblies, runs finite element stress analyses, and guides components from CAD drafting to CNC tooling.',
        salary: '$92,000 — $140,000',
        demand: '+21% Steady',
        experienceReq: '0-2 YRS CAD / HARDWARE',
        manifesto: 'Designs mechanical assemblies, runs finite element stress analyses, and guides components from CAD drafting to CNC tooling.',
        evidenceType: 'CAD Assemblies & FEA Simulation Reports',
        skills: [
          { name: '3D Parametric CAD (SolidWorks/Fusion)', required: 95, baseline: 60, category: 'CAD', importance: 'Critical' },
          { name: 'Finite Element Analysis (FEA) Stress Tests', required: 88, baseline: 35, category: 'Simulation', importance: 'Critical' },
          { name: 'Design for Manufacturability (DFM/DFA)', required: 90, baseline: 40, category: 'Manufacturing', importance: 'High' },
          { name: 'Thermodynamics & Fluid Dynamics', required: 85, baseline: 50, category: 'Physics', importance: 'High' },
          { name: 'Geometric Dimensioning & Tolerancing (GD&T)', required: 86, baseline: 30, category: 'Standards', importance: 'Medium' },
        ],
        knowledge: ['Statics & Dynamics Mechanics', 'Material Fatigue & Yield Strength', 'DFM/DFA Guidelines', 'Thermodynamics'],
        education: ['B.S. Mechanical Engineering or Aerospace Engineering (ABET accredited)'],
        certifications: ['CSWP Certified SolidWorks Professional', 'ASME Member'],
        licenses: ['FE / EIT (Engineer-in-Training)'],
        experience: ['Machine shop prototyping', 'Formula SAE / Robotics hardware team'],
        portfolio: ['Parametric CAD Assembly Packages', 'FEA Stress & Thermal Reports', 'Tolerance Stack-Up Spreadsheets'],
        projects: ['High-torque brushless actuator housing', 'Passive thermal heat sink for rugged IoT edge box'],
        practicalTraining: ['CNC mill setup', '3D printing material calibration'],
        requiredEvidence: ['Engineering Drawing Package', 'FEA Stress Report', 'Physical Prototype Test Log'],
        nextAction: {
          badge: 'RUN A FEA STRESS ANALYSIS',
          title: 'High-Torque Robotic Actuator Enclosure',
          type: 'CAD & Thermal Simulation Package',
          tags: ['SolidWorks', 'FEA Report', 'DFM Spec', 'Tolerance Stack'],
          description: 'Design a sealed robotic joint assembly in CAD with full tolerance stack analysis, thermal dissipation simulation, and factory-ready drawings.',
          impactDelta: '+32% Career Readiness'
        }
      },
      {
        id: 'robotics-engineer',
        title: 'Robotics & Automation Engineer',
        domain: 'engineering',
        description: 'Integrates kinematic controls, sensors, embedded microcontrollers, and actuators into automated robotic arms and AGVs.',
        salary: '$105,000 — $155,000',
        demand: '+41% YoY',
        experienceReq: '0-2 YRS EMBEDDED',
        manifesto: 'Integrates kinematic controls, sensors, embedded microcontrollers, and actuators into automated robotic arms and AGVs.',
        evidenceType: 'ROS Systems & Kinematic Controllers',
        skills: [
          { name: 'ROS / ROS2 Frameworks', required: 92, baseline: 40, category: 'Middleware', importance: 'Critical' },
          { name: 'Inverse Kinematics & Motion Planning', required: 88, baseline: 35, category: 'Control', importance: 'Critical' },
          { name: 'Embedded C++ & Microcontrollers', required: 90, baseline: 55, category: 'Firmware', importance: 'High' },
          { name: 'Sensor Fusion (LiDAR, IMU, Vision)', required: 85, baseline: 30, category: 'Perception', importance: 'High' },
          { name: 'Motor Drives & CAN Bus Protocols', required: 82, baseline: 40, category: 'Hardware', importance: 'Medium' },
        ],
        knowledge: ['Forward & Inverse Kinematics', 'State Estimation (Kalman Filters)', 'Real-Time Operating Systems (RTOS)', 'CAN Bus Protocols'],
        education: ['B.S. Robotics, Mechatronics, or Electrical Engineering'],
        certifications: ['ROS2 Developer Certificate', 'IEEE Robotics & Automation Society'],
        licenses: [],
        experience: ['Autonomous navigation testbed', 'Industrial robotic cell commissioning'],
        portfolio: ['ROS Navigation Stack Configurations', 'C++ Motor Control Repositories', 'Gazebo Simulation Worlds'],
        projects: ['6-DOF manipulator inverse kinematics solver in ROS2', 'SLAM autonomous cart mapping pipeline'],
        practicalTraining: ['Oscilloscope signal debugging', 'Safety PLC interlocking'],
        requiredEvidence: ['Gazebo Simulation Recording', 'C++ Control Loop Code', 'Kinematic Calibration Log'],
        nextAction: {
          badge: 'BUILD A ROS2 CONTROLLER',
          title: 'Autonomous Mobile Robot Nav2 Stack',
          type: 'Kinematics & Simulation Blueprint',
          tags: ['ROS2 Humble', 'Nav2', 'Gazebo', 'LiDAR SLAM'],
          description: 'Configure and test an autonomous differential drive robot navigating dynamic obstacles in Gazebo simulation with verified costmap tuning.',
          impactDelta: '+34% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'business',
    code: '03',
    name: 'Business & Strategy',
    description: 'Corporate growth, management consulting, operational scaling, and unit economics.',
    careers: [
      {
        id: 'management-consultant',
        title: 'Strategy & Management Consultant',
        domain: 'business',
        description: 'Deconstructs complex executive bottlenecks, models total addressable markets, and restructures operating procedures.',
        salary: '$110,000 — $160,000',
        demand: '+22% Steady',
        experienceReq: '0-2 YRS CASE RIGOR',
        manifesto: 'Deconstructs complex executive bottlenecks, models total addressable markets, and restructures operating procedures.',
        evidenceType: 'Case Solutions & Strategy Deliverables',
        skills: [
          { name: 'Hypothesis-Driven Problem Solving (MECE)', required: 94, baseline: 45, category: 'Frameworks', importance: 'Critical' },
          { name: 'Financial & Market Sizing Synthesis', required: 90, baseline: 50, category: 'Quant', importance: 'Critical' },
          { name: 'Executive Storyboarding & Slide Synthesis', required: 92, baseline: 60, category: 'Comms', importance: 'High' },
          { name: 'Organizational Change Management', required: 82, baseline: 30, category: 'Leadership', importance: 'Medium' },
          { name: 'Competitive Moat & Unit Economics Audits', required: 86, baseline: 40, category: 'Strategy', importance: 'High' },
        ],
        knowledge: ['MECE Framework', 'Porter Five Forces', 'CAC/LTV Economics', 'Post-Merger Integration Playbooks'],
        education: ['B.A./B.S. Business, Economics, Industrial Engineering, or Liberal Arts with analytical rigor'],
        certifications: ['Certified Management Consultant (CMC)', 'Wharton Executive Strategy'],
        licenses: [],
        experience: ['Case competition podiums', 'Corporate strategy internships'],
        portfolio: ['Executive Boardroom Slide Decks', 'TAM/SAM/SOM Market Sizing Models', 'Operating Model Blueprints'],
        projects: ['Cross-border market entry model for consumer tech', 'Supply chain consolidation 5-year NPV thesis'],
        practicalTraining: ['Mock client interviews', 'Sensitivity scenario stress-testing'],
        requiredEvidence: ['Executive Slide Deck', 'TAM & Payback Excel Model', 'Strategic Memo'],
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
    id: 'finance',
    code: '04',
    name: 'Finance & Markets',
    description: 'Capital markets, financial modelling, equity research, risk quantification, and treasury.',
    careers: [
      {
        id: 'financial-analyst',
        title: 'Financial Analyst',
        domain: 'finance',
        description: 'Analyzes financial statements, builds valuation models, evaluates revenue drivers, and advises executive resource allocation.',
        salary: '$95,000 — $140,000',
        demand: '+24% Steady Growth',
        experienceReq: '0-2 YRS QUANT / BIZ',
        manifesto: 'Analyzes financial statements, builds valuation models, evaluates revenue drivers, and advises executive resource allocation.',
        evidenceType: 'Financial Models & Investment Memos',
        skills: [
          { name: 'Discounted Cash Flow (DCF) & LBO', required: 92, baseline: 40, category: 'Modeling', importance: 'Critical' },
          { name: 'Advanced Excel & Financial Functions', required: 95, baseline: 65, category: 'Tools', importance: 'Critical' },
          { name: 'Accounting & Balance Sheet Analysis', required: 88, baseline: 50, category: 'Theory', importance: 'High' },
          { name: 'Data Visualization & Executive Pitching', required: 84, baseline: 55, category: 'Communication', importance: 'High' },
          { name: 'Market Forecasting & Macro Analysis', required: 80, baseline: 35, category: 'Markets', importance: 'Medium' },
        ],
        knowledge: ['GAAP & IFRS Accounting', 'Valuation Multiples & Comps', 'Debt Covenants & WACC', 'Treasury & Cash Flow Auditing'],
        education: ['B.S. Finance, Accounting, Economics, or Quantitative Business'],
        certifications: ['CFA Level 1 Passed', 'FMVA Financial Modeling Certification'],
        licenses: ['FINRA SIE (Securities Industry Essentials)'],
        experience: ['Investment banking or corporate fp&a internship', 'Student investment fund analyst'],
        portfolio: ['3-Statement Discounted Cash Flow Models', 'Public Equity Investment Theses', 'Sensitivity Tables'],
        projects: ['S&P 500 SaaS valuation teardown', 'Private equity buyout scenario matrix'],
        practicalTraining: ['Terminal data extraction (Bloomberg/FactSet)', 'Dynamic audit checks in Excel'],
        requiredEvidence: ['Dynamic 3-Statement Model', 'Written Investment Thesis', 'Tear Sheet Comps Table'],
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
        domain: 'finance',
        description: 'Constructs probabilistic exposure frameworks, audits credit default rates, and calibrates stress-test simulations for funds.',
        salary: '$105,000 — $160,000',
        demand: '+31% YoY',
        experienceReq: '0-2 YRS STATS / FINANCE',
        manifesto: 'Constructs probabilistic exposure frameworks, audits credit default rates, and calibrates stress-test simulations for funds.',
        evidenceType: 'Stress Tests & Statistical Notebooks',
        skills: [
          { name: 'Value at Risk (VaR) & Monte Carlo', required: 90, baseline: 35, category: 'Quant', importance: 'Critical' },
          { name: 'Python for Quantitative Finance', required: 88, baseline: 45, category: 'Programming', importance: 'Critical' },
          { name: 'Credit & Counterparty Risk Auditing', required: 85, baseline: 30, category: 'Risk', importance: 'High' },
          { name: 'Regulatory Standards (Basel III/Dodd-Frank)', required: 80, baseline: 20, category: 'Compliance', importance: 'Medium' },
          { name: 'Time-Series Econometrics', required: 86, baseline: 50, category: 'Statistics', importance: 'High' },
        ],
        knowledge: ['Stochastic Calculus', 'Value-at-Risk Frameworks', 'Liquidity Contagion Modeling', 'Basel III Capital Accords'],
        education: ['B.S./M.S. Financial Engineering, Statistics, or Quantitative Economics'],
        certifications: ['FRM (Financial Risk Manager)', 'CQF (Certificate in Quantitative Finance)'],
        licenses: [],
        experience: ['Market risk analyst intern', 'Quantitative fund simulation lab'],
        portfolio: ['Monte Carlo Simulation Jupyter Notebooks', 'Tail Risk Hedging Papers', 'Copula Distribution Models'],
        projects: ['Multi-asset portfolio VaR engine in Python', 'Credit default swap pricing simulation'],
        practicalTraining: ['High-frequency orderbook backtesting', 'Backtesting parameter recalibration'],
        requiredEvidence: ['Python Risk Engine Repository', 'Stress-Test Simulation Report', 'Regulatory Compliance Check'],
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
    id: 'healthcare',
    code: '05',
    name: 'Healthcare & Clinical',
    description: 'Patient diagnostics, clinical operations, biotechnology, and public health systems.',
    careers: [
      {
        id: 'healthcare-administrator',
        title: 'Healthcare Operations Lead',
        domain: 'healthcare',
        description: 'Coordinates hospital department capacity, ensures strict HIPAA/regulatory compliance, and minimizes patient admission wait times.',
        salary: '$90,000 — $135,000',
        demand: '+32% High Demand',
        experienceReq: '0-2 YRS CLINICAL / ADMIN',
        manifesto: 'Coordinates hospital department capacity, ensures strict HIPAA/regulatory compliance, and minimizes patient admission wait times.',
        evidenceType: 'Process Audits & Compliance Case Studies',
        skills: [
          { name: 'Hospital Operating Systems & EHR', required: 88, baseline: 45, category: 'Operations', importance: 'Critical' },
          { name: 'Healthcare Regulatory Compliance (HIPAA)', required: 94, baseline: 50, category: 'Law', importance: 'Critical' },
          { name: 'Patient Throughput & Capacity Modeling', required: 85, baseline: 30, category: 'Logistics', importance: 'High' },
          { name: 'Clinical Budgeting & Reimbursement (ICD-10)', required: 82, baseline: 25, category: 'Finance', importance: 'High' },
          { name: 'Emergency Crisis Preparedness Protocols', required: 80, baseline: 35, category: 'Safety', importance: 'Medium' },
        ],
        knowledge: ['HIPAA & HITECH Compliance', 'Epic/Cerner EHR Workflows', 'CMS Reimbursement Policies', 'Lean Healthcare Principles'],
        education: ['B.S./MHA in Health Administration, Public Health, or Nursing Informatics'],
        certifications: ['Certified Healthcare Financial Professional (CHFP)', 'Lean Six Sigma Green Belt'],
        licenses: [],
        experience: ['Hospital administrative residency', 'Clinical department scheduling coordination'],
        portfolio: ['Emergency Triage Flow Redesigns', 'HIPAA Privacy Audit Checklists', 'Departmental Operating Budgets'],
        projects: ['ICU bed allocation predictive model', 'Outpatient clinic check-in wait reduction plan'],
        practicalTraining: ['Clinical workflow shadowing', 'Mock regulatory audit inspection'],
        requiredEvidence: ['Throughput Bottleneck Study', 'HIPAA Policy Audit Document', 'Departmental Capacity Model'],
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
        domain: 'healthcare',
        description: 'Conducts laboratory assays, synthesizes genomic sequencing data, and documents verifiable preclinical trial experiments.',
        salary: '$85,000 — $130,000',
        demand: '+44% YoY',
        experienceReq: '0-2 YRS LAB / RESEARCH',
        manifesto: 'Conducts laboratory assays, synthesizes genomic sequencing data, and documents verifiable preclinical trial experiments.',
        evidenceType: 'Peer Reviews & Lab Notebook Protocols',
        skills: [
          { name: 'PCR, Gel Electrophoresis & Wet Lab Assays', required: 92, baseline: 60, category: 'Lab', importance: 'Critical' },
          { name: 'Bioinformatics Tools (BLAST, Biopython)', required: 86, baseline: 35, category: 'Data', importance: 'High' },
          { name: 'Statistical Experimental Design & ANOVA', required: 88, baseline: 50, category: 'Stats', importance: 'Critical' },
          { name: 'Good Laboratory Practices (GLP/GMP)', required: 90, baseline: 40, category: 'Standards', importance: 'High' },
          { name: 'Scientific Manuscript & Grant Writing', required: 80, baseline: 30, category: 'Comms', importance: 'Medium' },
        ],
        knowledge: ['Molecular Biology Assays', 'Next-Gen Sequencing (NGS)', 'GLP/GMP Regulatory Frameworks', 'Biosafety Protocols'],
        education: ['B.S. Molecular Biology, Biochemistry, Biotechnology, or Bioengineering'],
        certifications: ['Biosafety Level 2 (BSL-2) Certified', 'ASCP Molecular Biology Technologist'],
        licenses: [],
        experience: ['University academic wet lab', 'Preclinical assay screening team'],
        portfolio: ['Standard Operating Procedure (SOP) Documents', 'Statistical Power Calculations', 'Sequencing Pipeline Results'],
        projects: ['CRISPR off-target assay protocol validation', 'RNA-Seq differential gene expression pipeline'],
        practicalTraining: ['Aseptic cell culture technique', 'Pipette calibration and spectrophotometry'],
        requiredEvidence: ['Peer-Review Study Protocol', 'Clean Laboratory Notebook Log', 'Statistical ANOVA Breakdown'],
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
    id: 'design',
    code: '06',
    name: 'Design & Creative',
    description: 'Human-computer interaction, multi-brand identity, motion systems, and spatial interfaces.',
    careers: [
      {
        id: 'ux-designer',
        title: 'Product & UX Designer',
        domain: 'design',
        description: 'Synthesizes user behavioral friction into intuitive spatial navigation, coherent component tokens, and accessible workflows.',
        salary: '$95,000 — $145,000',
        demand: '+29% Growth',
        experienceReq: '0-2 YRS PORTFOLIO',
        manifesto: 'Synthesizes user behavioral friction into intuitive spatial navigation, coherent component tokens, and accessible workflows.',
        evidenceType: 'Case Studies & Interactive Prototypes',
        skills: [
          { name: 'User Research & Journey Synthesis', required: 90, baseline: 45, category: 'Research', importance: 'Critical' },
          { name: 'Design Tokens & Multi-Brand Systems', required: 88, baseline: 35, category: 'Systems', importance: 'Critical' },
          { name: 'Interactive Figma Prototyping', required: 94, baseline: 65, category: 'Execution', importance: 'High' },
          { name: 'Information Architecture & Microcopy', required: 82, baseline: 40, category: 'Structure', importance: 'High' },
          { name: 'Usability Testing & Quantitative Audits', required: 85, baseline: 30, category: 'Validation', importance: 'Medium' },
        ],
        knowledge: ['Cognitive Ergonomics', 'WCAG 2.1 AA Accessibility', 'Design Token Architecture', 'Information Hierarchy'],
        education: ['B.A./B.S. in Interaction Design, HCI, Graphic Design, or equivalent portfolio evidence'],
        certifications: ['Nielsen Norman Group UX Master', 'Interaction Design Foundation'],
        licenses: [],
        experience: ['Digital product agency apprenticeship', 'Freelance client web app case studies'],
        portfolio: ['Figma Design System Libraries', 'End-to-End User Journey Studies', 'Interactive Framer Prototypes'],
        projects: ['Enterprise SaaS dashboard design system', 'Mobile checkout flow friction reduction'],
        practicalTraining: ['Moderated user interview facilitation', 'Accessibility contrast auditing'],
        requiredEvidence: ['Interactive Figma / Framer Prototype', 'Full Research Case Study', 'Design System Token Spec'],
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
        domain: 'design',
        description: 'Guides brand narrative, aesthetic cohesion, photographic art direction, and cultural resonance across customer touchpoints.',
        salary: '$120,000 — $180,000',
        demand: '+18% Steady',
        experienceReq: '2-4 YRS LEADERSHIP',
        manifesto: 'Guides brand narrative, aesthetic cohesion, photographic art direction, and cultural resonance across customer touchpoints.',
        evidenceType: 'Brand Guidelines & Creative Campaigns',
        skills: [
          { name: 'Narrative Strategy & Positioning', required: 92, baseline: 50, category: 'Strategy', importance: 'Critical' },
          { name: 'Art Direction & Visual Composition', required: 95, baseline: 60, category: 'Creative', importance: 'Critical' },
          { name: 'Typography & Editorial Grid Systems', required: 90, baseline: 55, category: 'Craft', importance: 'High' },
          { name: 'Multi-Channel Campaign Architecture', required: 86, baseline: 40, category: 'Production', importance: 'High' },
          { name: 'Creative Team Direction & Critiques', required: 88, baseline: 35, category: 'Leadership', importance: 'Medium' },
        ],
        knowledge: ['Visual Semiotics', 'Editorial Grid Theory', 'Art Direction Leadership', 'Cross-Platform Brand Scaling'],
        education: ['B.F.A. Graphic Design, Visual Communication, or Advertising Art Direction'],
        certifications: ['AIGA Professional Member', 'D&AD Creative Direction Program'],
        licenses: [],
        experience: ['Brand identity studio lead', 'Art direction for published editorial magazines'],
        portfolio: ['Comprehensive Brand Guidelines Books', 'Editorial Campaign Lookbooks', 'Custom Type Specimens'],
        projects: ['Global rebrand for green mobility fleet', 'Omnichannel experiential product launch'],
        practicalTraining: ['Commercial photoshoots art direction', 'Press print quality proofing'],
        requiredEvidence: ['40-Page Brand Guidelines Book', 'Typography Specimen Poster', 'Campaign Manifesto'],
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
    id: 'media',
    code: '07',
    name: 'Media & Communication',
    description: 'Investigative journalism, narrative production, digital public relations, and editorial publishing.',
    careers: [
      {
        id: 'communications-strategist',
        title: 'Communications & Media Strategist',
        domain: 'media',
        description: 'Formulates multi-platform narrative messaging, manages press briefings, orchestrates crisis mitigation, and directs corporate editorial voice.',
        salary: '$85,000 — $135,000',
        demand: '+25% Growth',
        experienceReq: '0-2 YRS NARRATIVE / PR',
        manifesto: 'Formulates multi-platform narrative messaging, manages press briefings, orchestrates crisis mitigation, and directs corporate editorial voice.',
        evidenceType: 'Press Releases, Media Kits & Crisis Manuals',
        skills: [
          { name: 'Crisis Communication & Press Handoffs', required: 92, baseline: 45, category: 'Strategy', importance: 'Critical' },
          { name: 'Executive Speechwriting & Op-Ed Drafting', required: 90, baseline: 55, category: 'Writing', importance: 'Critical' },
          { name: 'Media Landscape & Journalist Outreach', required: 88, baseline: 50, category: 'Relations', importance: 'High' },
          { name: 'Narrative Framing & Message Testing', required: 86, baseline: 40, category: 'Craft', importance: 'High' },
          { name: 'Media Analytics & Sentiment Tracking', required: 80, baseline: 35, category: 'Data', importance: 'Medium' },
        ],
        knowledge: ['Media Relations Protocols', 'Crisis Communication Frameworks', 'AP Style Guide', 'Sentiment Analytics'],
        education: ['B.A. Communications, Journalism, Public Relations, or English'],
        certifications: ['PRSA Accredited in Public Relations (APR)', 'HubSpot Media Certified'],
        licenses: [],
        experience: ['Press office internship', 'University newspaper editor-in-chief'],
        portfolio: ['Crisis Playbooks with Scenario Responses', 'Global Product Launch Press Kits', 'Executive Thought Leadership Bylines'],
        projects: ['Brand cybersecurity incident press response protocol', 'Tier-1 tech publication placement campaign'],
        practicalTraining: ['On-camera spokesperson training', 'Embargoed press briefing execution'],
        requiredEvidence: ['Crisis Scenario Playbook', 'Published Op-Ed Byline', 'Target Media Pitch List'],
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
        domain: 'media',
        description: 'Analyzes public datasets, files Freedom of Information Act (FOIA) requests, verifies primary sources, and publishes high-impact accountability stories.',
        salary: '$75,000 — $120,000',
        demand: '+22% Steady',
        experienceReq: '0-2 YRS JOURNALISM / DATA',
        manifesto: 'Analyzes public datasets, files Freedom of Information Act (FOIA) requests, verifies primary sources, and publishes high-impact accountability stories.',
        evidenceType: 'Investigative Features & Data Repositories',
        skills: [
          { name: 'FOIA Filings & Public Records Extraction', required: 92, baseline: 50, category: 'Investigation', importance: 'Critical' },
          { name: 'Data Scraping & Analysis (Python/SQL)', required: 88, baseline: 40, category: 'Data', importance: 'Critical' },
          { name: 'Fact-Checking Rigor & Primary Sourcing', required: 95, baseline: 60, category: 'Ethics', importance: 'High' },
          { name: 'Longform Narrative & Visual Storytelling', required: 90, baseline: 55, category: 'Writing', importance: 'High' },
          { name: 'Information Security for Whistleblowers', required: 82, baseline: 30, category: 'Security', importance: 'Medium' },
        ],
        knowledge: ['FOIA Law & Public Records', 'Journalistic Ethics', 'Data Wrangling in Pandas', 'Digital Encryption (PGP/Signal)'],
        education: ['B.A./M.A. Journalism, Public Policy, or Data Journalism'],
        certifications: ['IRE (Investigative Reporters & Editors) Fellow', 'Columbia Data Journalism'],
        licenses: [],
        experience: ['Independent investigative reporting', 'Data journalism newsroom desk'],
        portfolio: ['Interactive Data Stories', 'Clean Public Datasets on GitHub', 'Multi-Source Investigative Features'],
        projects: ['Municipal contract procurement fraud analysis', 'Algorithmic bail sentencing bias investigation'],
        practicalTraining: ['Double-blind source verification', 'Public court document indexing'],
        requiredEvidence: ['Published Investigative Feature', 'Reproducible GitHub Data Repo', 'FOIA Log Timeline'],
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
    id: 'law',
    code: '08',
    name: 'Law & Policy',
    description: 'Corporate contracts, constitutional jurisprudence, regulatory privacy compliance, and statutory research.',
    careers: [
      {
        id: 'legal-analyst',
        title: 'Corporate Legal & Compliance Analyst',
        domain: 'law',
        description: 'Audits multi-party vendor contracts, analyzes global privacy regulations (GDPR/CCPA), and drafts institutional liability memos.',
        salary: '$90,000 — $140,000',
        demand: '+26% Growth',
        experienceReq: '0-2 YRS LEGAL RESEARCH',
        manifesto: 'Audits multi-party vendor contracts, analyzes global privacy regulations (GDPR/CCPA), and drafts institutional liability memos.',
        evidenceType: 'Legal Briefs & Contract Audits',
        skills: [
          { name: 'Contractual Redlining & Terms Analysis', required: 92, baseline: 40, category: 'Contracts', importance: 'Critical' },
          { name: 'Statutory Research (LexisNexis/Westlaw)', required: 88, baseline: 45, category: 'Research', importance: 'Critical' },
          { name: 'Regulatory Compliance Frameworks', required: 86, baseline: 35, category: 'Compliance', importance: 'High' },
          { name: 'Risk Mitigation & Structured Brief Writing', required: 90, baseline: 55, category: 'Writing', importance: 'High' },
          { name: 'Intellectual Property & Licensing Basics', required: 80, baseline: 30, category: 'IP', importance: 'Medium' },
        ],
        knowledge: ['Contract Doctrine', 'GDPR / CCPA Frameworks', 'Statutory Research Methodology', 'Litigation Discovery'],
        education: ['B.A. Pre-Law, Political Science, Legal Studies, or J.D. candidate'],
        certifications: ['CIPP/US Information Privacy Professional', 'ABA Paralegal Certificate'],
        licenses: ['State Bar Admission (if practicing attorney)'],
        experience: ['Law firm paralegal clerkship', 'Corporate legal department in-house externship'],
        portfolio: ['Redlined Master Services Agreements (MSAs)', 'Statutory Compliance Comparison Matrices', 'Legal Risk Memos'],
        projects: ['EU AI Act enterprise risk assessment memo', 'SaaS vendor data processing addendum (DPA) audit'],
        practicalTraining: ['Bluebook legal citation checking', 'Commercial contract negotiation simulation'],
        requiredEvidence: ['Formal Legal Memorandum', 'Redlined Contract Comparison Spec', 'Statutory Compliance Matrix'],
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
    code: '09',
    name: 'Education & Pedagogy',
    description: 'Instructional design, cognitive retention science, curriculum engineering, and educational leadership.',
    careers: [
      {
        id: 'instructional-designer',
        title: 'Curriculum & Learning Architect',
        domain: 'education',
        description: 'Architects learner retention pathways, evaluates mastery checkpoints, and designs multimodal digital instructional units.',
        salary: '$80,000 — $120,000',
        demand: '+28% Growth',
        experienceReq: '0-2 YRS PEDAGOGY',
        manifesto: 'Architects learner retention pathways, evaluates mastery checkpoints, and designs multimodal digital instructional units.',
        evidenceType: 'Curriculum Modules & Assessment Rubrics',
        skills: [
          { name: 'Adult Learning Theory & ADDIE Model', required: 92, baseline: 45, category: 'Theory', importance: 'Critical' },
          { name: 'Assessment & Rubric Design', required: 88, baseline: 50, category: 'Measurement', importance: 'Critical' },
          { name: 'Interactive E-Learning Authoring Tools', required: 86, baseline: 40, category: 'Tools', importance: 'High' },
          { name: 'Micro-Learning Cohort Sequencing', required: 84, baseline: 35, category: 'Structure', importance: 'High' },
          { name: 'Learner Analytics & Retention Auditing', required: 80, baseline: 25, category: 'Data', importance: 'Medium' },
        ],
        knowledge: ['Cognitive Load Theory', 'Bloom Taxonomy', 'ADDIE / Backward Design', 'Universal Design for Learning (UDL)'],
        education: ['B.A./M.Ed. in Instructional Design, Educational Psychology, or Pedagogy'],
        certifications: ['ATD Master Instructional Designer', 'Articulate Storyline Certified'],
        licenses: ['State Teaching Credential (where applicable)'],
        experience: ['Classroom teaching experience', 'EdTech course developer internship'],
        portfolio: ['Interactive SCORM Learning Modules', 'Rubric & Assessment Frameworks', 'Curriculum Scope & Sequence Charts'],
        projects: ['Executive data literacy 6-week curriculum', 'Adaptive diagnostic math assessment rubric'],
        practicalTraining: ['Formative assessment piloting', 'Learner retention cohort tracking'],
        requiredEvidence: ['Complete Course Unit Specification', 'Bloom Mastery Rubric', 'Interactive Module Preview'],
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
    id: 'science',
    code: '10',
    name: 'Science & Research',
    description: 'Empirical experimentation, computational modeling, environmental analysis, and scientific synthesis.',
    careers: [
      {
        id: 'environmental-scientist',
        title: 'Climate & Environmental Data Scientist',
        domain: 'science',
        description: 'Processes satellite telemetry, models climate resilience indices, and models atmospheric and watershed interventions for sustainable development.',
        salary: '$88,000 — $138,000',
        demand: '+39% YoY',
        experienceReq: '0-2 YRS SCIENTIFIC COMPUTING',
        manifesto: 'Processes satellite telemetry, models climate resilience indices, and models atmospheric and watershed interventions for sustainable development.',
        evidenceType: 'Geospatial Models & Environmental Impact Statements',
        skills: [
          { name: 'Geospatial Telemetry (Raster/Vector/QGIS)', required: 92, baseline: 50, category: 'Spatial', importance: 'Critical' },
          { name: 'Climate Modeling & Numerical Weather', required: 88, baseline: 35, category: 'Physics', importance: 'Critical' },
          { name: 'Python Scientific Stack (Xarray/Rasterio)', required: 90, baseline: 45, category: 'Computing', importance: 'High' },
          { name: 'Environmental Impact Assessment (EIA)', required: 84, baseline: 40, category: 'Regulation', importance: 'High' },
          { name: 'Statistical Time-Series & Anomaly Detection', required: 86, baseline: 50, category: 'Stats', importance: 'Medium' },
        ],
        knowledge: ['Earth Observation Satellites', 'Climate Feedback Loops', 'Hydrological Modeling', 'NEPA Compliance'],
        education: ['B.S./M.S. in Environmental Science, Earth & Atmospheric Sciences, or Ecology'],
        certifications: ['GISP Certified GIS Professional', 'QGIS Spatial Specialist'],
        licenses: [],
        experience: ['Environmental field sampling', 'Remote sensing research lab assistant'],
        portfolio: ['Google Earth Engine Satellite Pipelines', 'Spatial Heat Island Models', 'Watershed Pollutant Diffusion Notebooks'],
        projects: ['Urban canopy cooling index predictive map', 'Agricultural drought telemetry monitor'],
        practicalTraining: ['Field spectrometer data collection', 'Satellite raster cloud masking'],
        requiredEvidence: ['Geospatial Python Notebook', 'Environmental Impact Whitepaper', 'Cartographic Map Package'],
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
        domain: 'science',
        description: 'Formulates mathematical hypotheses, writes high-performance simulation algorithms, and discovers fundamental patterns in high-dimensional data.',
        salary: '$115,000 — $170,000',
        demand: '+34% YoY',
        experienceReq: '0-2 YRS RESEARCH LAB',
        manifesto: 'Formulates mathematical hypotheses, writes high-performance simulation algorithms, and discovers fundamental patterns in high-dimensional data.',
        evidenceType: 'Preprint Papers & Benchmark Code Repositories',
        skills: [
          { name: 'Advanced Mathematics & Numerical Analysis', required: 95, baseline: 60, category: 'Math', importance: 'Critical' },
          { name: 'Scientific Computing (Julia/C++/Python)', required: 92, baseline: 50, category: 'Code', importance: 'Critical' },
          { name: 'Bayesian Statistics & Uncertainty Modeling', required: 88, baseline: 40, category: 'Statistics', importance: 'High' },
          { name: 'Scientific Paper Writing (LaTeX)', required: 90, baseline: 55, category: 'Writing', importance: 'High' },
          { name: 'Algorithmic Profiling & Optimization', required: 85, baseline: 35, category: 'HPC', importance: 'Medium' },
        ],
        knowledge: ['Multivariate Probability', 'Convex Optimization Algorithms', 'Bayesian Inference', 'Scientific Peer Review'],
        education: ['B.S./Ph.D. Mathematics, Applied Physics, or Theoretical Computer Science'],
        certifications: ['SIAM Society Member', 'IEEE Signal Processing Society'],
        licenses: [],
        experience: ['University academic research laboratory', 'Co-authored conference proceedings'],
        portfolio: ['arXiv Preprints with Reproducible Code', 'Mathematical Proof Notebooks', 'Algorithm Profiling Reports'],
        projects: ['High-dimensional manifold embedding benchmark', 'Distributed Markov Chain Monte Carlo sampler'],
        practicalTraining: ['Peer review refutations', 'High-performance compute cluster benchmarking'],
        requiredEvidence: ['LaTeX Preprint Document', 'Reproducible Simulation Repo', 'Mathematical Proof Appendix'],
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
    id: 'architecture',
    code: '11',
    name: 'Architecture & Spatial Design',
    description: 'Building design, urban infrastructure, parametric modeling, and environmental construction.',
    careers: [
      {
        id: 'architectural-designer',
        title: 'Architectural Designer',
        domain: 'architecture',
        description: 'Translates spatial intent into structural BIM models, conducts daylighting and thermal envelope simulations, and drafts construction drawing sets.',
        salary: '$84,000 — $128,000',
        demand: '+19% Steady',
        experienceReq: '0-2 YRS STUDIO / BIM',
        manifesto: 'Translates spatial intent into structural BIM models, conducts daylighting and thermal envelope simulations, and drafts construction drawing sets.',
        evidenceType: 'BIM Models, Architectural Drawings & Renderings',
        skills: [
          { name: 'Building Information Modeling (Revit/ArchiCAD)', required: 94, baseline: 50, category: 'BIM', importance: 'Critical' },
          { name: 'Parametric Spatial Modeling (Rhino/Grasshopper)', required: 88, baseline: 35, category: 'Design', importance: 'High' },
          { name: 'Building Codes & Life Safety (IBC)', required: 86, baseline: 30, category: 'Codes', importance: 'Critical' },
          { name: 'Environmental Simulation (Daylighting/Energy)', required: 82, baseline: 25, category: 'Sustainability', importance: 'Medium' },
          { name: 'Construction Documentation & Detailing', required: 90, baseline: 40, category: 'Production', importance: 'High' },
        ],
        knowledge: ['International Building Code (IBC)', 'LEED Green Building Rating', 'Envelope Thermal Transfer', 'Structural Load Tracing'],
        education: ['B.Arch or M.Arch accredited degree (NAAB)'],
        certifications: ['LEED Green Associate', 'Autodesk Revit Certified Professional'],
        licenses: ['Architect Registration Examination (ARE in progress)'],
        experience: ['Architectural design firm intern', 'Design-build fabrication workshop'],
        portfolio: ['Full Construction Drawing Sets', 'Photorealistic Lumion/Enscape Renders', 'Parametric Facade Grasshopper Scripts'],
        projects: ['Net-zero multi-family residential building BIM package', 'Timber pavilion parametric acoustic canopy'],
        practicalTraining: ['Construction site walk-throughs', 'Consultant coordination reviews'],
        requiredEvidence: ['BIM Model Sheets (Floorplans, Sections)', 'Envelope Detail Axonometric', 'LEED Energy Simulation'],
        nextAction: {
          badge: 'DRAFT A BIM ARCHITECTURE SET',
          title: 'Sustainable Mixed-Use Urban Infill Project',
          type: 'BIM Specification & Drawing Package',
          tags: ['Revit BIM', 'IBC Code Review', 'Grasshopper Facade', 'LEED Gold Spec'],
          description: 'Model a complete 4-story cross-laminated timber infill building in Revit featuring passive solar shading details and complete egress schedules.',
          impactDelta: '+33% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'hospitality',
    code: '12',
    name: 'Hospitality & Operations',
    description: 'Hotel operations, culinary directorship, luxury guest experience, and food & beverage management.',
    careers: [
      {
        id: 'hospitality-operations-lead',
        title: 'Hospitality Operations Lead',
        domain: 'hospitality',
        description: 'Oversees luxury lodging property workflows, optimizes RevPAR and operational occupancy, audits guest satisfaction metrics, and guides service teams.',
        salary: '$76,000 — $118,000',
        demand: '+24% Growth',
        experienceReq: '0-2 YRS OPERATIONS',
        manifesto: 'Oversees luxury lodging property workflows, optimizes RevPAR and operational occupancy, audits guest satisfaction metrics, and guides service teams.',
        evidenceType: 'Property Audit Logs & Guest Experience Blueprints',
        skills: [
          { name: 'Property Management Systems (Opera/Cloudbeds)', required: 90, baseline: 45, category: 'Systems', importance: 'Critical' },
          { name: 'RevPAR, ADR & Revenue Management', required: 88, baseline: 35, category: 'Finance', importance: 'Critical' },
          { name: 'Service Quality Standards & Guest Recovery', required: 94, baseline: 60, category: 'Hospitality', importance: 'High' },
          { name: 'Labor Scheduling & Operational P&L', required: 86, baseline: 40, category: 'Operations', importance: 'High' },
          { name: 'Health, Sanitation & Food Safety (HACCP)', required: 88, baseline: 50, category: 'Compliance', importance: 'Medium' },
        ],
        knowledge: ['Hospitality Financial P&L', 'RevPAR Optimization Formulas', 'HACCP Safety Frameworks', 'Luxury Brand Service Standards'],
        education: ['B.S. Hospitality Management, Hotel Administration, or Business Operations'],
        certifications: ['Certified Hotel Administrator (CHA)', 'ServSafe Food Protection Manager'],
        licenses: [],
        experience: ['Boutique hotel front-of-house coordinator', 'Food and beverage shift manager'],
        portfolio: ['Property Operating Procedures (SOP) Manual', 'Revenue Optimization Models', 'Service Recovery Playbooks'],
        projects: ['120-key hotel RevPAR yield strategy playbook', 'Front desk check-in queue reduction model'],
        practicalTraining: ['Crisis guest resolution simulation', 'Inventory food-cost variance tracking'],
        requiredEvidence: ['Property RevPAR Financial Model', 'Operational SOP Handbook', 'Guest Satisfaction Scorecard'],
        nextAction: {
          badge: 'BUILD AN OPERATIONS PLAYBOOK',
          title: 'Boutique Hotel Yield & Service Audit',
          type: 'Property Operations Blueprint',
          tags: ['RevPAR Model', 'Labor Optimization', 'SOP Guide', 'Guest Recovery'],
          description: 'Structure an exhaustive 50-point guest journey audit for an independent boutique hotel, complete with room-tier yield management algorithms.',
          impactDelta: '+29% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'impact',
    code: '13',
    name: 'Public & Social Impact',
    description: 'Civic governance, non-profit leadership, urban policy research, and community sustainability.',
    careers: [
      {
        id: 'policy-analyst',
        title: 'Public Policy Analyst',
        domain: 'impact',
        description: 'Evaluates public legislative outcomes, measures demographic impacts, and authors actionable policy whitepapers for government agencies.',
        salary: '$82,000 — $125,000',
        demand: '+27% Growth',
        experienceReq: '0-2 YRS CIVIC / RESEARCH',
        manifesto: 'Evaluates public legislative outcomes, measures demographic impacts, and authors actionable policy whitepapers for government agencies.',
        evidenceType: 'Policy Whitepapers & Cost-Benefit Models',
        skills: [
          { name: 'Statistical Policy Modeling (R/Stata)', required: 88, baseline: 45, category: 'Quantitative', importance: 'Critical' },
          { name: 'Legislative Drafting & Policy Memos', required: 92, baseline: 60, category: 'Analysis', importance: 'Critical' },
          { name: 'Cost-Benefit & Fiscal Impact Audits', required: 85, baseline: 35, category: 'Economics', importance: 'High' },
          { name: 'Stakeholder & Civic Advocacy Strategy', required: 82, baseline: 50, category: 'Engagement', importance: 'Medium' },
          { name: 'Open Data & Geographic Information (GIS)', required: 80, baseline: 30, category: 'Spatial', importance: 'High' },
        ],
        knowledge: ['Administrative Rulemaking', 'Cost-Benefit Analysis', 'Census Demographics', 'Public Stakeholder Processes'],
        education: ['B.A./M.P.P. in Public Policy, Political Science, Economics, or Urban Affairs'],
        certifications: ['MPP Certified Practitioner', 'GIS for Public Policy'],
        licenses: [],
        experience: ['Legislative aide internship', 'Civic policy think-tank research assistant'],
        portfolio: ['Legislative Impact Analyses', 'Municipal Housing Policy Briefs', 'Stakeholder Testimony Drafts'],
        projects: ['Regional broadband equity subsidy assessment', 'Municipal zoning reform affordability model'],
        practicalTraining: ['Committee hearing testimony prep', 'Freedom of Information Act requests'],
        requiredEvidence: ['Fiscal Impact Model (R / Excel)', 'Legislative Policy Memo', 'Census Spatial Map'],
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
        domain: 'impact',
        description: 'Manages grant allocation frameworks, measures program intervention metrics, and aligns community stakeholders for measurable public good.',
        salary: '$78,000 — $118,000',
        demand: '+23% Steady',
        experienceReq: '0-2 YRS PROGRAM MGMT',
        manifesto: 'Manages grant allocation frameworks, measures program intervention metrics, and aligns community stakeholders for measurable public good.',
        evidenceType: 'Impact Evaluations & Grant Proposals',
        skills: [
          { name: 'Program Logic Models & Theory of Change', required: 90, baseline: 50, category: 'Strategy', importance: 'Critical' },
          { name: 'Grant Writing & Institutional Fundraising', required: 92, baseline: 45, category: 'Funding', importance: 'Critical' },
          { name: 'Outcome Measurement & KPI Auditing', required: 86, baseline: 40, category: 'Analytics', importance: 'High' },
          { name: 'Volunteer & Community Coalition Leadership', required: 88, baseline: 60, category: 'Leadership', importance: 'High' },
          { name: 'Nonprofit Financial Governance (990)', required: 80, baseline: 30, category: 'Finance', importance: 'Medium' },
        ],
        knowledge: ['Theory of Change Frameworks', 'Federal Grant Guidelines (2 CFR 200)', 'Monitoring & Evaluation (M&E)', 'Nonprofit Governance'],
        education: ['B.A. Social Work, Public Administration, Sociology, or Non-Profit Management'],
        certifications: ['PMD Pro Project Management for Development', 'Grant Writing Association Certified'],
        licenses: [],
        experience: ['Community program coordinator', 'Philanthropic foundation intern'],
        portfolio: ['Multi-Year Program Logic Models', 'Federal Grant Proposals ($1M+)', 'Quarterly Impact Scorecards'],
        projects: ['Youth workforce development outcome tracker', 'Community food security distribution logistics system'],
        practicalTraining: ['Community listening session facilitation', 'Grant compliance budget reconciliation'],
        requiredEvidence: ['Program Theory of Change Matrix', 'Grant Application Budget Narrative', 'Impact Assessment Scorecard'],
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
    id: 'entrepreneurship',
    code: '14',
    name: 'Entrepreneurship & Ventures',
    description: 'Venture building, startup operations, early-stage capital, and customer discovery.',
    careers: [
      {
        id: 'venture-builder',
        title: 'Venture Builder & Founder',
        domain: 'entrepreneurship',
        description: 'Validates customer demand, builds rapid prototypes, models initial unit economics, pitches angel investors, and scales early team velocity.',
        salary: '$90,000 — $160,000',
        demand: '+35% Founder Surge',
        experienceReq: '0-2 YRS FOUNDER / BUILD',
        manifesto: 'Validates customer demand, builds rapid prototypes, models initial unit economics, pitches angel investors, and scales early team velocity.',
        evidenceType: 'Pitch Decks, Cap Tables & Product Experiments',
        skills: [
          { name: 'Customer Discovery & Problem Validation', required: 94, baseline: 55, category: 'Discovery', importance: 'Critical' },
          { name: 'Rapid Prototyping & MVP Scoping', required: 90, baseline: 60, category: 'Execution', importance: 'Critical' },
          { name: 'Early-Stage Unit Economics & Runway', required: 88, baseline: 40, category: 'Finance', importance: 'High' },
          { name: 'Investor Pitching & Narrative Synthesis', required: 92, baseline: 50, category: 'Fundraising', importance: 'High' },
          { name: 'Go-to-Market (GTM) Distribution Engines', required: 86, baseline: 35, category: 'Growth', importance: 'Medium' },
        ],
        knowledge: ['Lean Startup Methodology', 'SAFE Agreements & Cap Table Math', 'Product-Market Fit Benchmarks', 'Viral & Organic Distribution Loops'],
        education: ['Any degree or proven independent founder execution track record'],
        certifications: ['Y Combinator Startup School Graduate'],
        licenses: [],
        experience: ['Previous startup founder or early hire (#1-10)', 'Product management venture lab'],
        portfolio: ['Investor Pitch Decks (Pre-Seed/Seed)', 'Cap Table Financial Models', 'Live MVP Product Links'],
        projects: ['B2B SaaS customer discovery interviews (50+ calls)', 'Zero-budget product launch on Product Hunt'],
        practicalTraining: ['Cold email conversion funnels', 'Investor Q&A stress drills'],
        requiredEvidence: ['12-Slide Investor Pitch Deck', 'Pro-Forma 24-Month Financial Model', 'Customer Letter of Intent (LOI)'],
        nextAction: {
          badge: 'CONSTRUCT A VENTURE SPECIFICATION',
          title: 'Seed-Stage Pitch Deck & Unit Economics',
          type: 'Investor Ready Package',
          tags: ['Problem Validation', 'Cap Table Math', 'TAM Bottom-Up', 'GTM Plan'],
          description: 'Construct a verified 12-slide investor deck for a novel vertical software venture complete with customer LOIs, unit economics, and 24-month hiring plan.',
          impactDelta: '+35% Career Readiness'
        }
      }
    ]
  },
  {
    id: 'trades',
    code: '15',
    name: 'Skilled Trades & Diagnostics',
    description: 'Precision machining, industrial automation, electrical systems, and building diagnostics.',
    careers: [
      {
        id: 'precision-machinist',
        title: 'Precision CNC Machinist & Toolmaker',
        domain: 'trades',
        description: 'Programs 5-axis CNC mills and lathes, reads complex engineering blueprints, calibrates micro-inch tooling offsets, and inspects tolerances with CMMs.',
        salary: '$72,000 — $112,000',
        demand: '+31% High Demand',
        experienceReq: '0-2 YRS APPRENTICESHIP',
        manifesto: 'Programs 5-axis CNC mills and lathes, reads complex engineering blueprints, calibrates micro-inch tooling offsets, and inspects tolerances with CMMs.',
        evidenceType: 'G-Code Programs, Setup Sheets & Inspection Reports',
        skills: [
          { name: 'CNC Programming (G-Code / Mastercam)', required: 95, baseline: 50, category: 'CAM', importance: 'Critical' },
          { name: 'Blueprint Reading & GD&T Standards', required: 92, baseline: 45, category: 'Inspection', importance: 'Critical' },
          { name: 'Precision Metrology (Micrometers / CMM)', required: 90, baseline: 40, category: 'Quality', importance: 'High' },
          { name: 'Feeds, Speeds & Metallurgy Physics', required: 88, baseline: 35, category: 'Tooling', importance: 'High' },
          { name: 'Machine Maintenance & Setup Rigidity', required: 84, baseline: 50, category: 'Operations', importance: 'Medium' },
        ],
        knowledge: ['G-Code & M-Code Syntaxes', 'ISO/ANSI GD&T Symbols', 'Tool Wear & Thermal Growth', 'Workholding Physics'],
        education: ['Associate Degree in Precision Machining or Formal Toolmaker Apprenticeship'],
        certifications: ['NIMS Machining Level 1 & 2', 'Mastercam Associate'],
        licenses: ['State Journeyman Machinist Card (where applicable)'],
        experience: ['Machine shop apprentice', 'Aerospace components prototype deburring'],
        portfolio: ['Mastercam Toolpath Simulation Files', 'First Article Inspection Reports (AS9102)', 'Complex Multi-Axis Setup Sheets'],
        projects: ['Aerospace titanium bracket 5-axis toolpath optimization', 'Medical-grade stainless steel bone screw setup'],
        practicalTraining: ['Dial indicator spindle alignment', 'Surface finish profilometer testing'],
        requiredEvidence: ['Mastercam CAM Program', 'Setup Sheet with Tooling List', 'AS9102 Quality Inspection Log'],
        nextAction: {
          badge: 'PROGRAM A CNC TOOLPATH',
          title: 'Aerospace Impeller 5-Axis Setup Package',
          type: 'Manufacturing Production Spec',
          tags: ['Mastercam', 'G-Code', 'Setup Sheet', 'GD&T Quality'],
          description: 'Generate and verify an optimized 5-axis milling program in Mastercam for an aerospace turbine component with full tool clearance simulation.',
          impactDelta: '+32% Career Readiness'
        }
      }
    ]
  }
];

/**
 * Flattened registry of all careers across all domains for O(1) lookup.
 */
export const ALL_CAREERS = CAREER_CATEGORIES.flatMap(cat => cat.careers);

/**
 * Lookup helper to find a career by ID across all 15 domains.
 */
export function getCareerById(careerId) {
  if (!careerId) return CAREER_CATEGORIES[0].careers[0];
  const found = ALL_CAREERS.find(c => c.id === careerId);
  return found || CAREER_CATEGORIES[0].careers[0];
}

/**
 * Returns all careers belonging to a domain code or ID.
 */
export function getCareersByDomain(domainId) {
  const cat = CAREER_CATEGORIES.find(c => c.id === domainId || c.code === domainId);
  return cat ? cat.careers : [];
}
