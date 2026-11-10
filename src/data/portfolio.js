// ============================================================
//  All portfolio content lives here as plain, serializable data.
//  Components import from this single source of truth.
// ============================================================

export const personal = {
  name: 'Anushad Kaveera',
  title: 'DevOps Engineer',
  location: 'Colombo, Sri Lanka',
  phone: '+94 77 488 7617',
  phoneHref: 'tel:+94774887617',
  email: 'anushadk726@gmail.com',
  linkedin: 'https://linkedin.com/in/anushad-kaveera',
  github: 'https://github.com/Kaveera725',
  motto: 'Automate everything. Secure everything. Scale everything.',
  cv: '/Anushad Kaveera - Intern Devops Engineer.pdf',
};

// ----- Navigation -------------------------------------------------
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'pipeline',   label: 'Pipeline'   },
  { id: 'projects',   label: 'Projects'   },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

// ----- Hero terminal lines ----------------------------------------
// `type: cmd` renders a green "$" prompt, `type: out` renders a cyan "→".
// `textClass` colours the typed output; `pause` is the ms delay before the
// next line begins typing.
export const terminalLines = [
  { type: 'cmd', prefix: '$', text: 'whoami', textClass: 'text-slate-100', pause: 250 },
  {
    type: 'out',
    prefix: '→',
    text: 'Anushad Kaveera — DevOps Engineer',
    textClass: 'text-accent font-semibold',
    pause: 500,
  },
  { type: 'cmd', prefix: '$', text: 'cat skills.txt', textClass: 'text-slate-100', pause: 250 },
  {
    type: 'out',
    prefix: '→',
    text: 'Docker | Kubernetes | Terraform | AWS | CI/CD | Linux',
    textClass: 'text-slate-300',
    pause: 500,
  },
  {
    type: 'cmd',
    prefix: '$',
    text: 'systemctl status career',
    textClass: 'text-slate-100',
    pause: 250,
  },
  {
    type: 'out',
    prefix: '→',
    text: '● Junior DevOps Engineer @ StackNet — Active ✓',
    textClass: 'text-terminal-green',
    pause: 500,
  },
  { type: 'cmd', prefix: '$', text: 'echo $MOTTO', textClass: 'text-slate-100', pause: 250 },
  {
    type: 'out',
    prefix: '→',
    text: '"Automate everything. Secure everything. Scale everything."',
    textClass: 'text-accent italic',
    pause: 600,
  },
];

// ----- About ------------------------------------------------------
export const about = {
  paragraphs: [
    "I'm a Computer Science graduate from the University of Colombo School of Computing (UCSC), 2023–2026, and a Junior DevOps Engineer at StackNet (Pvt) Ltd, where I independently plan, provision, and deliver production-grade cloud workloads on AWS — from Terraform-managed infrastructure to containerized microservices on EKS and ECS.",
    'I live in the space between development and operations — building CI/CD pipelines, provisioning cloud infrastructure as code, containerizing workloads, and wiring up observability so systems ship faster and stay healthy.',
    "I'm passionate about cloud infrastructure, automation, and reliability engineering: removing toil, hardening security, and designing systems that scale gracefully under load.",
  ],
  stats: [
    { value: 10, suffix: '+', label: 'Projects Deployed' },
    { value: 10, suffix: '+', label: 'AWS Services Used' },
    { value: 20, suffix: '+', label: 'Certifications' },
  ],
};

// ----- Hero stats bar ---------------------------------------------
// Compact counters shown under the hero CTAs (count up on scroll into view).
export const heroStats = [
  { value: 10, suffix: '+', label: 'Projects Deployed' },
  { value: 10, suffix: '+', label: 'AWS Services' },
  { value: 20, suffix: '+', label: 'Certifications' },
];

// ----- Skills -----------------------------------------------------
// `icon` strings map to lucide-react components in Skills.jsx.
export const skillCategories = [
  {
    name: 'Linux & Scripting',
    icon: 'Terminal',
    accent: 'cyan',
    items: [
      { name: 'Ubuntu Server', icon: 'Server' },
      { name: 'Bash', icon: 'SquareTerminal' },
      { name: 'Log Analysis', icon: 'FileSearch' },
    ],
  },
  {
    name: 'Web Servers',
    icon: 'Globe',
    accent: 'cyan',
    items: [
      { name: 'Nginx', icon: 'Network' },
      { name: 'PHP-FPM', icon: 'Code' },
      { name: 'SSL / TLS', icon: 'Lock' },
      { name: 'Cloudflare DNS', icon: 'Cloud' },
    ],
  },
  {
    name: 'Infrastructure as Code',
    icon: 'Layers',
    accent: 'purple',
    items: [{ name: 'Terraform', icon: 'Boxes' }],
  },
  {
    name: 'Containers',
    icon: 'Container',
    accent: 'purple',
    items: [
      { name: 'Docker', icon: 'Container' },
      { name: 'Docker Compose', icon: 'Boxes' },
      { name: 'Kubernetes', icon: 'Hexagon' },
    ],
  },
  {
    name: 'CI / CD',
    icon: 'Workflow',
    accent: 'cyan',
    items: [
      { name: 'GitHub Actions', icon: 'GitBranch' },
      { name: 'Jenkins', icon: 'Cog' },
    ],
  },
  {
    name: 'Cloud',
    icon: 'CloudCog',
    accent: 'purple',
    items: [
      { name: 'AWS — EC2 · ECR · EKS · Fargate', icon: 'Cloud' },
      { name: 'GCP — Compute Engine · Cloud SQL', icon: 'Cloud' },
    ],
  },
  {
    name: 'Monitoring',
    icon: 'Activity',
    accent: 'cyan',
    items: [
      { name: 'Prometheus', icon: 'Flame' },
      { name: 'Grafana', icon: 'LineChart' },
    ],
  },
  {
    name: 'Databases',
    icon: 'Database',
    accent: 'cyan',
    items: [
      { name: 'MySQL', icon: 'Database' },
      { name: 'MongoDB', icon: 'Leaf' },
      { name: 'PostgreSQL', icon: 'Database' },
    ],
  },
  {
    name: 'Networking',
    icon: 'Network',
    accent: 'purple',
    items: [
      { name: 'DNS', icon: 'Globe' },
      { name: 'Firewalls', icon: 'ShieldCheck' },
      { name: 'Load Balancing', icon: 'Scale' },
      { name: 'TCP / IP', icon: 'Share2' },
    ],
  },
  {
    name: 'Version Control',
    icon: 'GitBranch',
    accent: 'cyan',
    items: [
      { name: 'Git', icon: 'GitBranch' },
      { name: 'GitHub', icon: 'Github' },
    ],
  },
  {
    name: 'Languages',
    icon: 'Code2',
    accent: 'cyan',
    items: [
      { name: 'JavaScript', icon: 'Braces' },
      { name: 'Python', icon: 'FileCode2' },
      { name: 'Go', icon: 'FileCode' },
      { name: 'Java', icon: 'Coffee' },
      { name: 'PHP', icon: 'Code' },
      { name: 'C', icon: 'Binary' },
    ],
  },
];

// ----- Experience -------------------------------------------------
export const experience = [
  {
    company: 'StackNet (Pvt) Ltd',
    role: 'Junior DevOps Engineer',
    period: '2026 – Present',
    location: 'Colombo, Sri Lanka',
    current: true,
    bullets: [
      'Independently planned, provisioned, and delivered 10+ production deployments end-to-end — covering infrastructure design, containerisation, CI/CD pipeline setup, database configuration, and live monitoring.',
      'Orchestrate microservices workloads on Amazon EKS, managing Kubernetes deployments, services, and rolling updates across production clusters.',
      'Deploy containerized applications on Amazon ECS with Application Load Balancer (ALB) for high-availability traffic distribution and zero-downtime releases.',
      'Provision and manage Amazon RDS (MySQL/PostgreSQL) and DynamoDB NoSQL databases, including parameter groups, backups, and read replicas for production reliability.',
      'Design and provision scalable, fault-tolerant AWS cloud infrastructure using Terraform (IaC) — VPCs, subnets, security groups, IAM roles, and managed services fully codified.',
      'Build and maintain CI/CD pipelines (GitHub Actions / Jenkins) to automate build, test, image push to ECR, and blue-green deployments to EKS and ECS clusters.',
      'Manage the end-to-end AWS infrastructure for StackNet, ensuring high availability, security compliance, and cost-optimised resource utilisation across all cloud workloads.',
    ],
    tags: [
      'AWS',
      'EKS',
      'ECS',
      'Kubernetes',
      'Terraform',
      'IaC',
      'Microservices',
      'ALB',
      'RDS',
      'DynamoDB',
      'ECR',
      'Docker',
      'CI/CD',
      'GitHub Actions',
    ],
  },
  {
    company: 'StackNet (Pvt) Ltd',
    role: 'DevOps Engineering Intern',
    period: '2025 – 2026',
    location: 'Colombo, Sri Lanka',
    current: false,
    bullets: [
      'Successfully completed the DevOps Engineering internship program.',
      'Managed Linux server administration (Ubuntu) including service management, log analysis, and Bash scripting for automation.',
      'Built and maintained CI/CD pipelines using GitHub Actions and Jenkins, automating build, test, and deployment workflows for containerized applications.',
      'Containerized applications using Docker and managed multi-container deployments with Docker Compose.',
      'Provisioned AWS cloud infrastructure using Terraform (EC2, VPC, security groups, IAM roles).',
      'Configured Nginx as a reverse proxy with SSL/TLS and Cloudflare DNS management.',
      'Implemented Prometheus + Grafana monitoring dashboards for system observability and alerting.',
      'Performed network troubleshooting: DNS, firewall rules, and port configuration.',
      'Collaborated with dev teams to optimize MySQL and MongoDB queries.',
    ],
    tags: [
      'GitHub Actions',
      'Jenkins',
      'Docker',
      'Terraform',
      'AWS',
      'Nginx',
      'Prometheus',
      'Grafana',
      'MySQL',
      'MongoDB',
    ],
  },
];

// ----- Projects ---------------------------------------------------
export const projects = [
  {
    id: 'cloud-native-platform',
    title: 'Cloud-Native Web Application Platform',
    year: '2026',
    bullets: [
      'Full-stack React + Node.js + MongoDB on AWS EC2 behind an Nginx reverse proxy.',
      'Docker containerization with a GitHub Actions CI/CD pipeline.',
      'Terraform IaC for EC2, VPC, IAM, and security groups.',
      'Cloudflare DNS and port management (80, 443, 22, 27017).',
      'Prometheus + Grafana real-time monitoring.',
    ],
    tags: ['AWS', 'Docker', 'Terraform', 'Nginx', 'GitHub Actions', 'Prometheus'],
    github: 'https://github.com/Kaveera725',
    featured: true,
    category: 'Cloud & IaC',
  },
  {
    id: 'argo-cd',
    title: 'GitOps-Based Kubernetes Deployment with Argo CD',
    year: '2026',
    bullets: [
      'GitOps workflows using Argo CD for automated Kubernetes deployments.',
      'Automated sync, self-healing, and drift detection for containerized workloads.',
      'Prometheus + Grafana cluster observability stack.',
    ],
    tags: ['Kubernetes', 'Argo CD', 'GitOps', 'Prometheus', 'Grafana'],
    github: 'https://github.com/Kaveera725',
    featured: true,
    category: 'Containers',
  },
  {
    id: 'hotel-menu-manager',
    title: 'Hotel Menu Manager',
    year: '2025',
    bullets: [
      'Full-stack Gin (Go) + React + PostgreSQL, fully Dockerized.',
      'GitHub Actions CI/CD to AWS EC2 with PostgreSQL on Linux.',
      'Nginx, SSL/TLS, and production networking.',
    ],
    tags: ['Go', 'Gin', 'React', 'Docker', 'PostgreSQL', 'GitHub Actions', 'AWS'],
    github: 'https://github.com/Kaveera725',
    category: 'Containers',
  },
  {
    id: 'agrisl',
    title: 'AgriSL — Bilingual AI Agricultural Platform',
    year: '2026',
    bullets: [
      'Bilingual (Sinhala / English) AI platform overcoming agricultural knowledge barriers for rural Sri Lankan farmers.',
      'Three-stage disease pipeline: PlantNet plant ID, custom TensorFlow.js MobileNetV2 classifier, and GPT-4o Vision bilingual diagnosis.',
      'AI chatbot delivering real-time agronomic guidance tailored to user-selected crop and administrative district in Sinhala & English.',
      'Multi-role RBAC architecture (Farmer, Verified Agricultural Officer, Admin) with document upload and admin credential verification.',
      'Production security: JWT with rotating refresh tokens, token revocation, bcrypt hashing, Helmet, express-rate-limit, and Nginx reverse proxy.',
      'End-to-end full-stack: React 18, Vite, Material UI, Node.js Express (MVC), MySQL 8, Multer, PM2, with AWS deployment architecture.',
    ],
    tags: [
      'React 18',
      'Node.js',
      'Express',
      'MySQL 8',
      'TensorFlow.js',
      'GPT-4o Vision',
      'MobileNetV2',
      'JWT & RBAC',
      'Nginx',
      'AWS Ready',
    ],
    github: 'https://github.com/Kaveera725',
    featured: true,
    category: 'Machine Learning (ML)',
    details: {
      tagline: 'Bridging agricultural language barriers in Sri Lanka with multimodal AI, computer vision, and expert advisory workflows.',
      problem:
        'Most farming research and agricultural advisory in Sri Lanka is published exclusively in English, which fewer than a quarter of rural farmers read comfortably. When facing crop disease outbreaks, farmers lack rapid access to reliable diagnostic tools and treatment protocols in Sinhala, leading to widespread harvest loss and hazardous pesticide misuse.',
      solution:
        'AgriSL unites three critical tools in one responsive bilingual (Sinhala / English) platform: an interactive district- and crop-aware AI chatbot, a three-stage computer vision plant disease diagnostic pipeline, and an open expert advisory portal where verified agricultural officers publish peer-reviewed agronomic guidance accessible to all without sign-up.',
      myRole:
        'Designed and developed the entire system end-to-end: relational database schema, Express.js REST API (MVC architecture), React 18 frontend with Material UI, JWT authentication with rotating refresh tokens, multi-stage AI/ML inference pipeline, and the MobileNetV2 transfer learning workflow in Python on Google Colab.',
      keyFeatures: [
        {
          title: 'Three-Stage Disease Diagnostic Pipeline',
          desc: 'Combines PlantNet species identification, a custom TensorFlow.js MobileNetV2 model trained on the PlantVillage dataset, and GPT-4o Vision for final diagnostic synthesis. Generates cause, severity rating, immediate remediation, exact chemical/organic dosages, common mistakes to avoid, and officer consultation criteria in Sinhala and English.',
        },
        {
          title: 'District & Crop-Tailored AI Chatbot',
          desc: 'Enables farmers to select their cultivated crop and administrative district to ask questions in Sinhala or English, receiving real-time agronomic advice tuned to regional soil types, microclimates, and seasonal pests.',
        },
        {
          title: 'Verified Expert Advisory Portal',
          desc: 'Agricultural officers author and publish bilingual research-backed articles that anyone can read publicly without registration, complete with reader feedback ratings and article bookmarking.',
        },
        {
          title: 'Multi-Role Role-Based Access Control (RBAC)',
          desc: 'Tailored portals and dedicated dashboards for Farmers, Agricultural Officers, and Platform Administrators, each with role-specific views and permission boundaries.',
        },
        {
          title: 'Officer Credential Verification Workflow',
          desc: 'Agricultural officers must upload official identification documents at registration; administrators review documents and approve or reject applications with written reason feedback before publishing rights activate.',
        },
        {
          title: 'Enterprise-Grade Authentication & Hardening',
          desc: 'Short-lived JWT access tokens with rotating refresh tokens and token revocation, bcrypt password hashing, express-rate-limit protection against brute-force attacks, Helmet security headers, and Multer file upload sanitization.',
        },
      ],
      techStack: [
        { area: 'Frontend', tools: 'React 18, Vite, Material UI, React Router, Axios, TailwindCSS' },
        { area: 'Backend', tools: 'Node.js, Express (MVC), Multer, bcryptjs, Helmet, express-rate-limit' },
        { area: 'Database', tools: 'MySQL 8 (Relational Schema, Foreign Key Constraints, Indexed Queries)' },
        { area: 'AI & Machine Learning', tools: 'TensorFlow.js (MobileNetV2), GPT-4o Vision API, PlantNet API, Chatbot LLM' },
        { area: 'Authentication & Security', tools: 'JWT (Access + Rotating Refresh Tokens), Token Revocation Store, RBAC' },
        { area: 'Cloud & Infrastructure', tools: 'Deployment guide prepared for AWS (EC2, RDS, S3), Nginx Reverse Proxy, PM2' },
        { area: 'Engineering & Training', tools: 'Python, Google Colab (MobileNetV2 on PlantVillage), Git, GitHub' },
      ],
      challenges: [
        {
          title: 'Sinhala Language Output Quality',
          desc: 'Achieving grammatically coherent, technically accurate Sinhala agricultural advice required rigorous prompt engineering, temperature calibration, and strict structured JSON schemas to eliminate hallucinations.',
        },
        {
          title: 'ML Model & LLM Discrepancy Arbitration',
          desc: 'Architected robust arbitration logic for edge cases where the local MobileNetV2 classifier and multimodal vision LLM disagree, accompanied by graceful fallback paths when offline model weights are unavailable.',
        },
        {
          title: 'Silent Refresh-Token Rotation & Security',
          desc: 'Engineered silent access token renewal using rotating refresh tokens and one-time revocation to provide a seamless user session while safeguarding against token theft and replay exploits.',
        },
        {
          title: 'Resource-Constrained Model Deployment',
          desc: 'Kept heavy training checkpoints, large image datasets, and secrets out of version control, streamlining TensorFlow.js model artifacts for smooth inference on standard cloud hosting.',
        },
      ],
    },
  },
  {
    id: 'tourmateai',
    title: 'TourMateAI — AI Travel Planner',
    year: '2026',
    bullets: [
      'An AI-powered web app for Sri Lankan tourists combining personalized recommendations, a travel chatbot, and landmark image recognition.',
      'React frontend integrated with a Flask backend, MySQL database, and Firebase authentication.',
      'Features weather-aware itinerary planning using OpenWeather API and interactive navigation via Google Maps API.',
      'Developed with a parallel-track decoupled architecture utilizing a mock-supported shared API contract to prevent blocker states.',
    ],
    tags: ['React', 'Flask', 'MySQL', 'Firebase', 'Google Maps API', 'OpenWeather API', 'Python', 'AI/ML'],
    github: 'https://github.com/Kaveera725',
    category: 'Machine Learning (ML)',
  },
  {
    id: 'dhcp-dns',
    title: 'DHCP & DNS Server Infrastructure',
    year: '2025',
    bullets: [
      'ISC DHCP + BIND9 DNS on Ubuntu Server.',
      'Firewall management, port security, and network troubleshooting.',
    ],
    tags: ['Ubuntu', 'Linux', 'BIND9', 'DHCP', 'Networking'],
    github: 'https://github.com/Kaveera725',
    category: 'Networking',
  },
  {
    id: 'realtime-chat',
    title: 'Real-Time ChatApp',
    year: '2024',
    bullets: ['Real-time messaging with authentication and dynamic rooms.'],
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'TailwindCSS'],
    github: 'https://github.com/Kaveera725',
    category: 'Full-Stack',
  },
];

// ----- Certifications --------------------------------------------
export const certifications = [
  { issuer: 'Linux Foundation', title: 'Introduction to Kubernetes',                              code: 'LFS158',   image: '/certs/linux-foundation/lfs158.png'   },
  { issuer: 'Linux Foundation', title: 'Introduction to DevOps and SRE',                          code: 'LFS162',   image: '/certs/linux-foundation/lfs162.png'   },
  { issuer: 'Linux Foundation', title: 'Introduction to DevSecOps for Managers',                  code: 'LFS180',   image: '/certs/linux-foundation/lfs180.png'   },
  { issuer: 'Linux Foundation', title: 'Introduction to Serverless on Kubernetes',                 code: 'LFS157',   image: '/certs/linux-foundation/lfs157.png'   },
  { issuer: 'Linux Foundation', title: 'Automating Supply Chain Security: SBOMs and Signatures',   code: 'LFEL1007', image: '/certs/linux-foundation/lfel1007.png' },
  { issuer: 'Linux Foundation', title: 'Introduction to AI/ML Toolkits with Kubeflow',              code: 'LFS209',   image: '/certs/linux-foundation/lfs209.png'   },
  { issuer: 'AWS', title: 'Getting Started with DevOps on AWS',  image: null },
  { issuer: 'AWS', title: 'Amazon EKS Primer',                   image: '/certs/aws/eks.png'        },
  { issuer: 'AWS', title: 'AWS Fargate Overview',                image: '/certs/aws/fargate.png'    },
  { issuer: 'AWS', title: 'Introduction to Containers',          image: '/certs/aws/containers.png' },
  { issuer: 'AWS', title: 'Introduction to Cloud 101',           image: null },
  { issuer: 'Cisco', title: 'Introduction to Cybersecurity',     image: '/certs/cisco/cybersecurity.jpeg' },
];

// ----- Education --------------------------------------------------
export const education = [
  {
    institution: 'University of Colombo School of Computing (UCSC)',
    shortInstitution: 'University of Colombo',
    qualification: 'BSc in Computer Science',
    degreeType: "Bachelor's Degree",
    period: '2023 – 2026',
    status: 'Graduated',
    location: 'Colombo, Sri Lanka',
    featured: true,
  },
  {
    institution: 'Saralankara National College',
    shortInstitution: 'Saralankara National College',
    qualification: 'G.C.E. Advanced Level (A/L) — Physical Science (1A, 2B)',
    degreeType: 'Secondary Education',
    period: '2018 – 2021',
    status: 'Completed',
    location: 'Galle, Sri Lanka',
    featured: false,
  },
];

