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
    { value: 15, suffix: '+', label: 'Certifications' },
  ],
};

// ----- Hero stats bar ---------------------------------------------
// Compact counters shown under the hero CTAs (count up on scroll into view).
export const heroStats = [
  { value: 10, suffix: '+', label: 'Projects Deployed' },
  { value: 10, suffix: '+', label: 'AWS Services' },
  { value: 15, suffix: '+', label: 'Certifications' },
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
    title: 'AgriSL — AI Farming Platform',
    year: '2026',
    bullets: [
      'Bilingual (Sinhala / English) platform with a GPT-4o chatbot and crop disease detection.',
      'Deployed on GCP: Compute Engine, Cloud SQL, and Cloud Storage.',
      'Docker + GitHub Actions CI/CD to GCP.',
      'Nginx, SSL/TLS, JWT auth, and RBAC (Farmer / Officer / Admin).',
    ],
    tags: ['GCP', 'Docker', 'Node.js', 'React', 'MySQL', 'OpenAI API', 'GitHub Actions'],
    github: 'https://github.com/Kaveera725',
    category: 'Machine Learning (ML)',
  },
  {
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

