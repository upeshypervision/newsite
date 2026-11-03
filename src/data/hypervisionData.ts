export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  fullOverview: string;
  technologies: string[];
  image: string;
  category: string;
  link?: string;
  github?: string;
  metrics?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  category: 'faculty' | 'executive' | 'technical' | 'design' | 'operations' | 'outreach';
  department?: string;
  image?: string;
  initials: string;
  linkedin?: string;
  github?: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'hackathon' | 'bootcamp' | 'symposium' | 'workshop' | 'outreach';
  date: string;
  month: string;
  day: string;
  year: string;
  location: string;
  teamsOrAttendees: string;
  description: string;
  isUpcoming?: boolean;
  link?: string;
  image: string;
  galleryImages?: string[];
}

export interface Sponsor {
  name: string;
  category: string;
  tier: string;
  description: string;
  logo: string;
}

export const HYPERVISION_INFO = {
  name: "UPES HyperVision",
  shortName: "HyperVision",
  motto: "Innovate. Collaborate. Elevate.",
  tagline: "Explore. Innovate. Learn. A forward-thinking technical club focused on innovation and engineering excellence.",
  officialMission: "Everything we built was rooted in a simple but powerful mission: to create a high-impact technical ecosystem where students didn't just learn, but evolved into industry-ready innovators through hands-on discovery and mentorship.",
  officialValues: "In every project and event, we lived by the values of integrity, inclusivity, and technical excellence—a commitment to not only innovate, but to elevate those around us.",
  establishedYear: "2011",
  university: "School of Computer Science (SoCS), UPES Dehradun",
  campus: "Bidholi Campus, Energy Acres, P.O. Bidholi via Prem Nagar, Dehradun, Uttarakhand 248007",
  email: "upes.hypervision@stu.upes.ac.in",
  socials: {
    linkedin: "https://www.linkedin.com/in/upeshypervision/",
    instagram: "https://www.instagram.com/upeshypervision/",
    github: "https://github.com/upes-hypervision",
    codeHustleLive: "https://code-hustle-11.vercel.app/"
  }
};

export const MILESTONES: Milestone[] = [
  {
    year: "2011",
    title: "The Beginning",
    description: "Hypervision was founded at the School of Computer Science (SoCS), UPES, to create a student-driven ecosystem where innovation translates into action.",
    tag: "Inception"
  },
  {
    year: "2012",
    title: "First Milestone",
    description: "Our inaugural hackathon united 60 students, setting the tone for collaborative and high-impact technical events at UPES.",
    tag: "First Hackathon"
  },
  {
    year: "2016",
    title: "National Collaborations",
    description: "Partnerships with institutions like NIT Kurukshetra and bodies like MeitY (Ministry of Electronics and Information Technology) expanded our reach beyond campus under the SwaYaan initiative.",
    tag: "National Reach"
  },
  {
    year: "2019",
    title: "Mentorship Ecosystem",
    description: "Initiatives such as Avritti and Code Connect transformed our alumni network into a continuous knowledge loop connecting current students to global leaders.",
    tag: "Knowledge Loop"
  },
  {
    year: "Present",
    title: "Present Day",
    description: "Hypervision evolved into a multidisciplinary technical community, delivering high-impact hackathons, hosting 330+ team SIH qualifiers, and leading deep-tech workshops.",
    tag: "Scale & Impact"
  }
];

export const STATISTICS = [
  { value: "100+", label: "Active Members", sublabel: "Passionate engineers & designers" },
  { value: "50+", label: "Projects Completed", sublabel: "Production software & avionics" },
  { value: "30+", label: "Events Organized", sublabel: "Hackathons, fests & bootcamps" },
  { value: "15+", label: "Industry Partners", sublabel: "Research bodies & corporations" },
  { value: "330+", label: "SIH Teams Arbitrated", sublabel: "National qualifier matrix" },
  { value: "2011", label: "Founded at UPES", sublabel: "15-year engineering legacy" },
];

export const CAPABILITIES = [
  {
    number: "01",
    title: "AI & Machine Learning",
    description: "Developing deep neural networks, vision transformers, on-device perception, and natural language processing pipelines for production environments.",
    technologies: ["PyTorch", "TensorRT", "Computer Vision", "Transformers"]
  },
  {
    number: "02",
    title: "Autonomous Robotics & Drone Tech",
    description: "Engineering autopilot firmware, flight navigation computers, and sensor payloads in synergy with national academic bodies like NIT Kurukshetra and MeitY.",
    technologies: ["ROS 2", "Embedded C++", "Lidar SLAM", "Pixhawk Avionics"]
  },
  {
    number: "03",
    title: "Distributed Web & Cloud Systems",
    description: "Architecting high-throughput submission engines, low-latency evaluation arbiters, and resilient microservices capable of handling hundreds of concurrent teams.",
    technologies: ["TypeScript", "Next.js", "WebSockets", "Docker", "PostgreSQL"]
  },
  {
    number: "04",
    title: "Cybersecurity & Systems Hardening",
    description: "Rigorous vulnerability research, secure code auditing, network penetration assessment, and defense architectures for university infrastructure.",
    technologies: ["Linux Kernels", "Packet Inspection", "Cryptography", "CTF Engines"]
  },
  {
    number: "05",
    title: "DevOps & Cloud Infrastructure",
    description: "Container orchestration, automated CI/CD deployment pipelines, telemetry monitoring, and high-availability server management for flagship hackathons.",
    technologies: ["Kubernetes", "Prometheus", "Terraform", "GitHub Actions"]
  },
  {
    number: "06",
    title: "Competitive Programming & Mentorship",
    description: "Fostering algorithmic mastery through Code Connect, algorithmic sprints, and preparing student teams for national research papers and SIH victories.",
    technologies: ["Advanced Graph Theory", "Dynamic Programming", "Algorithmic Arbiters"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "code-hustle-platform",
    number: "01",
    title: "Code Hustle Live Platform",
    subtitle: "Real-time Competition Evaluation Engine",
    description: "The official web platform powering UPES HyperVision's 24-hour flagship hackathons, featuring automated leaderboard updates, live judging rubric queues, and team submission pipelines.",
    fullOverview: "Built from scratch to support high-concurrency hackathon traffic, Code Hustle Live replaces manual spreadsheet judging with an automated matrix. Includes instantaneous code submission validation, anti-collision team pairing, and a public spectator leaderboard synchronized over WebSockets.",
    technologies: ["Next.js / React", "TypeScript", "Node.js", "WebSockets", "Tailwind CSS"],
    image: "/events/code_hustle.webp",
    category: "Web & Distributed Systems",
    link: "https://code-hustle-11.vercel.app/",
    github: "https://github.com/upes-hypervision",
    metrics: "24-hour real-time uptime · 300+ submissions tracked"
  },
  {
    id: "swayaan-drone-avionics",
    number: "02",
    title: "SwaYaan Autonomous Drone Module",
    subtitle: "Avionics & Optical Navigation Payload",
    description: "Collaborative research project conducted in partnership with NIT Kurukshetra and MeitY, delivering low-latency waypoint tracking and obstacle avoidance for unmanned aerial systems.",
    fullOverview: "Under the Ministry of Electronics and Information Technology (MeitY) SwaYaan initiative, student engineers designed custom optical flow and lidar fusion algorithms. The onboard companion computer executes real-time spatial mapping with zero cloud dependency.",
    technologies: ["Embedded C++", "ROS 2", "YOLOv8 Edge", "Pixhawk", "Lidar"],
    image: "/events/drone_tech.webp",
    category: "Robotics & Avionics",
    github: "https://github.com/upes-hypervision",
    metrics: "Sub-50ms obstacle avoidance · NIT Kurukshetra & MeitY verified"
  },
  {
    id: "sih-matrix-engine",
    number: "03",
    title: "Smart India Hackathon Matrix Engine",
    subtitle: "Multi-Jury Automated Arbitration System",
    description: "Custom evaluation system built to process, score, and rank 330+ participating student teams during the official UPES Internal Smart India Hackathon qualifier rounds.",
    fullOverview: "Designed specifically to solve jury bias, score variance, and synchronization lag during massive university qualifiers. Features normalized standard score weighting, multi-track jury assignments, and instant national shortlisting exports.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "React", "Docker"],
    image: "/events/sih_poster.webp",
    category: "Algorithmic Infrastructure",
    github: "https://github.com/upes-hypervision",
    metrics: "330+ teams arbitrated · 12 parallel jury panels"
  },
  {
    id: "edge-perception-suite",
    number: "04",
    title: "Pehchaan Tech & Career Engine",
    subtitle: "Job Battle & Pitch Matrix",
    description: "The digital registration, tournament scoring, and Dragons' Den evaluation platform built for HyperVision's flagship annual tech and career festival.",
    fullOverview: "Powers Pehchaan's dynamic multi-track tournament, bridging technical competitions, mock corporate placement battles, and founder pitch scoring for university-wide cohorts.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS"],
    image: "/events/pehchaan.webp",
    category: "Event Tech & Infrastructure",
    github: "https://github.com/upes-hypervision",
    metrics: "450+ attendees · Live tournament brackets"
  }
];

export const EVENTS: EventItem[] = [
  {
    id: "code-hustle-flagship",
    title: "Code Hustle 24-Hour Hackathon",
    subtitle: "Annual Flagship 24-Hour Software Marathon",
    category: "hackathon",
    date: "October 12, 2026",
    month: "OCT",
    day: "12",
    year: "2026",
    location: "MAC Auditorium, UPES Bidholi",
    teamsOrAttendees: "60+ Finalist Teams",
    description: "The premier 24-hour hackathon hosted by UPES Hypervision. Teams build intensive full-stack, AI, and cybersecurity prototypes evaluated continuously with live leaderboard ranking.",
    isUpcoming: true,
    link: "https://code-hustle-11.vercel.app/",
    image: "/events/code_hustle.webp",
    galleryImages: ["/events/code_hustle_1.webp", "/events/code_hustle_2.webp"]
  },
  {
    id: "sih-internal-round",
    title: "Internal Smart India Hackathon (UPES Round)",
    subtitle: "Official National Qualifier",
    category: "hackathon",
    date: "September 2025",
    month: "SEP",
    day: "20",
    year: "2025",
    location: "School of Computer Science, UPES",
    teamsOrAttendees: "330+ Competing Teams",
    description: "The Internal Smart India Hackathon organized by Hypervision serves as the official UPES round for the national-level Smart India Hackathon. With over 330 teams participating, participants brainstorm, develop prototypes, and present innovative solutions under time-bound conditions.",
    isUpcoming: false,
    image: "/events/sih_poster.webp",
    galleryImages: ["/events/sih_1.webp", "/events/sih_2.webp"]
  },
  {
    id: "drone-tech-bootcamp",
    title: "Drone Tech Bootcamp (With NIT Kurukshetra)",
    subtitle: "Under MeitY's SwaYaan Initiative",
    category: "bootcamp",
    date: "April 2025",
    month: "APR",
    day: "15",
    year: "2025",
    location: "Avionics Research Lab, UPES Bidholi",
    teamsOrAttendees: "120+ Student Engineers",
    description: "A multi-day hands-on technical program conducted in collaboration with NIT Kurukshetra under MeitY’s SwaYaan initiative. Participants receive practical exposure through hands-on drone flying sessions and dedicated hardware kits.",
    isUpcoming: false,
    image: "/events/drone_tech.webp",
    galleryImages: ["/events/drone_tech.webp"]
  },
  {
    id: "pehchaan-tech-fest",
    title: "Pehchaan - Annual Tech & Career Fest",
    subtitle: "Job Battle, Dragons' Den & Expert Panels",
    category: "symposium",
    date: "February 2025",
    month: "FEB",
    day: "28",
    year: "2025",
    location: "Auditorium Complex, UPES Dehradun",
    teamsOrAttendees: "450+ Attendees",
    description: "Pehchaan is Hypervision's annual tech and career fest blending technology, creativity, and professional exposure. Activities include Job Battle, Dragons’ Den, expert panel discussions, and competitive gaming.",
    isUpcoming: false,
    image: "/events/pehchaan.webp",
    galleryImages: ["/events/pehchaan_2.webp"]
  },
  {
    id: "avritti-connect",
    title: "Avritti - Alumni Connect",
    subtitle: "Career Mentorship & Industry Insights",
    category: "workshop",
    date: "November 2024",
    month: "NOV",
    day: "18",
    year: "2024",
    location: "School of Computer Science, UPES",
    teamsOrAttendees: "250+ Participants",
    description: "Avritti is Hypervision's alumni connect initiative aimed at strengthening the bond between current students and former members. Alumni share their professional journeys, industry experiences, and guidance on internships and placements.",
    isUpcoming: false,
    image: "/events/avritti_1.webp",
    galleryImages: ["/events/avritti_1.webp", "/events/avritti_2.webp"]
  },
  {
    id: "code-connect-series",
    title: "Code Connect & Code Arcade",
    subtitle: "Hands-on AI/ML, DSA & Software Tracks",
    category: "workshop",
    date: "August 2024",
    month: "AUG",
    day: "10",
    year: "2024",
    location: "Computer Labs 3 & 4, UPES Bidholi",
    teamsOrAttendees: "180+ Developers",
    description: "Code Connect and Code Arcade are learning-focused initiatives designed to enhance students’ technical and professional skills across Artificial Intelligence, Machine Learning, and Data Structures & Algorithms.",
    isUpcoming: false,
    image: "/events/code_connect.webp",
    galleryImages: ["/events/code_connect_1.webp"]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  // Faculty
  {
    name: "Dr. Virender Kadyan",
    role: "Faculty Advisor",
    category: "faculty",
    department: "School of Computer Science, UPES Dehradun",
    image: "/team/virender_kadyan.webp",
    initials: "VK",
    linkedin: "https://www.linkedin.com/in/virender-kadyan-b9bb161a4/"
  },
  {
    name: "Dr. Bhavana Kaushik",
    role: "Faculty Coordinator",
    category: "faculty",
    department: "School of Computer Science, UPES Dehradun",
    image: "/team/bhavana_kaushik.webp",
    initials: "BK",
    linkedin: "https://www.linkedin.com/in/bhavana-kaushik-1788b523/"
  },
  // Executive Leadership Apex
  {
    name: "Purva",
    role: "President",
    category: "executive",
    department: "Executive Board",
    image: "/team/purva.webp",
    initials: "PU",
    linkedin: "https://www.linkedin.com/in/purvamonga"
  },
  {
    name: "Priya Mehta",
    role: "Vice-President",
    category: "executive",
    department: "Executive Council",
    initials: "PM",
    linkedin: "https://www.linkedin.com/in/upeshypervision/"
  },
  {
    name: "Divyanshu Gaur",
    role: "General Secretary",
    category: "executive",
    department: "Organizational Affairs",
    image: "/team/divyanshu_gaur.webp",
    initials: "DG",
    linkedin: "https://www.linkedin.com/in/divyanshu-gaur-4a78b71b7"
  },
  {
    name: "Praanjal Jain",
    role: "Treasurer",
    category: "executive",
    department: "Finance & Resource Allocation",
    image: "/team/praanjal_jain.webp",
    initials: "PJ",
    linkedin: "https://www.linkedin.com/in/praanjal-jain-hyper29"
  },
  // Strategic Directorate & Advisory Tier
  {
    name: "Priyanshi Singhi",
    role: "Workflow Supervisor",
    category: "executive",
    department: "Operational Flow",
    image: "/team/priyanshi_singhi.webp",
    initials: "PS",
    linkedin: "https://www.linkedin.com/in/priyanshi-singhi-737425299/"
  },
  {
    name: "Pranav Nair",
    role: "Strategic Branding Head",
    category: "executive",
    department: "Brand Strategy & Positioning",
    image: "/team/pranav_r_nair.webp",
    initials: "PN",
    linkedin: "https://www.linkedin.com/in/pranav-r-nair-ba5621292"
  },
  {
    name: "Tanish Khandelwal",
    role: "Social Media Advisory",
    category: "design",
    department: "Growth & Engagement",
    image: "/team/tanish_khandelwal.webp",
    initials: "TK",
    linkedin: "https://www.linkedin.com/in/tanish-khandelwal-32687a278"
  },
  {
    name: "Yash Gupta",
    role: "Tech Visionary",
    category: "technical",
    department: "Technical Directorate",
    image: "/team/yash_gupta.webp",
    initials: "YG",
    github: "https://github.com/yashgupta13",
    linkedin: "https://www.linkedin.com/in/gupta-yash13"
  },
  // Functional Columns: Design, Technical, Editorial, Social Media
  {
    name: "Akshat Agarwal",
    role: "Design Head",
    category: "design",
    department: "Visual Systems & UI/UX",
    image: "/team/akshat_agarwal.webp",
    initials: "AA",
    linkedin: "https://www.linkedin.com/in/akshatagarwal2005"
  },
  {
    name: "Misha",
    role: "Associate Design Head",
    category: "design",
    department: "Brand Assets & Typography",
    image: "/team/misha.webp",
    initials: "MI",
    linkedin: "https://www.linkedin.com/in/misha-223815299"
  },
  {
    name: "Om Agarwal",
    role: "Technical Head",
    category: "technical",
    department: "Software & Systems Architecture",
    image: "/team/om_agarwal.webp",
    initials: "OA",
    github: "https://github.com/Omfalcon",
    linkedin: "https://www.linkedin.com/in/om-agarwal16805"
  },
  {
    name: "Siddhant Gupta",
    role: "Associate Technical Head",
    category: "technical",
    department: "Platform Engineering",
    image: "/team/siddhant_gupta.webp",
    initials: "SG",
    github: "https://github.com/DevSid300",
    linkedin: "https://www.linkedin.com/in/siddhant-gupta-a57439256"
  },
  {
    name: "Manan Arora",
    role: "Editorial Head",
    category: "design",
    department: "Publications & Content Architecture",
    image: "/team/manan_arora.webp",
    initials: "MA",
    linkedin: "https://www.linkedin.com/in/manan-arora-7913a62a7"
  },
  {
    name: "Jahanvi Sengar",
    role: "Associate Editorial Head",
    category: "design",
    department: "Publications & Content Writing",
    initials: "JS",
    linkedin: "https://www.linkedin.com/in/upeshypervision/"
  },
  {
    name: "Pramansh Praveen",
    role: "Social Media Manager",
    category: "design",
    department: "Public Outreach & Media",
    initials: "PP",
    linkedin: "https://www.linkedin.com/in/upeshypervision/"
  },
  {
    name: "Manasvi Soni",
    role: "Associate Social Media Manager",
    category: "design",
    department: "Public Communications",
    image: "/team/manasvi_soni.webp",
    initials: "MS",
    linkedin: "https://www.linkedin.com/in/manasvi-soni-272200290"
  },
  // Events Cluster
  {
    name: "Anshul Goel",
    role: "Events Head",
    category: "operations",
    department: "Flagship Hackathons & Competitions",
    image: "/team/anshul_goel.webp",
    initials: "AG",
    linkedin: "https://www.linkedin.com/in/goelanshul24"
  },
  {
    name: "Atharv Pandey",
    role: "Associate Events Head",
    category: "operations",
    department: "Hackathons & Logistics",
    image: "/team/atharv_pandey.webp",
    initials: "AP",
    linkedin: "https://www.linkedin.com/in/atharv26"
  },
  {
    name: "Disha Rastogi",
    role: "Associate Events Head",
    category: "operations",
    department: "Event Management",
    initials: "DR",
    linkedin: "https://www.linkedin.com/in/upeshypervision/"
  },
  // PR & Outreach Cluster
  {
    name: "Priyal Sharma",
    role: "PR Head",
    category: "outreach",
    department: "Institutional Relations",
    image: "/team/priyal_sharma.webp",
    initials: "PS",
    linkedin: "https://www.linkedin.com/in/priyal-sharma-461b46286"
  },
  {
    name: "Abhay Sachan",
    role: "Associate PR Head",
    category: "outreach",
    department: "Ecosystem Collaborations",
    image: "/team/abhay_sachan.webp",
    initials: "AS",
    linkedin: "https://www.linkedin.com/in/upeshypervision/"
  },
  {
    name: "Preksha Grover",
    role: "Associate PR Head",
    category: "outreach",
    department: "Sponsorship & External Outreach",
    image: "/team/preksha.webp",
    initials: "PG",
    linkedin: "https://www.linkedin.com/in/preksha-grover-a82305331"
  },
  // Operations Cluster
  {
    name: "Saksham Srivastava",
    role: "Operations Head",
    category: "operations",
    department: "Logistical Infrastructure",
    image: "/team/saksham_srivastava.webp",
    initials: "SS",
    linkedin: "https://www.linkedin.com/in/saksham-srivastava2005"
  },
  {
    name: "Harsh Kamboj",
    role: "Associate Operations Head",
    category: "operations",
    department: "Field Execution",
    image: "/team/harsh_kamboj.webp",
    initials: "HK",
    linkedin: "https://www.linkedin.com/in/harsh-kamboj-8124a1276"
  },
  {
    name: "Namami Pandey",
    role: "Associate Operations Head",
    category: "operations",
    department: "Resource Management",
    image: "/team/namami_pandey.webp",
    initials: "NP",
    linkedin: "https://www.linkedin.com/in/namami-pandey-39895a304"
  }
];

export const SPONSORS: Sponsor[] = [
  {
    name: "Decathlon",
    category: "Lifestyle Partner",
    tier: "Flagship Sponsor",
    description: "Official wellness and sports merchandise partner for Code Hustle and campus hackathons.",
    logo: "/sponsors/decathlon.webp"
  },
  {
    name: "GeeksforGeeks",
    category: "Coding Partner",
    tier: "Ecosystem Partner",
    description: "Algorithmic resources, online coding track awards, and tech practice platforms.",
    logo: "/sponsors/geeksforgeeks.webp"
  },
  {
    name: "NIT Kurukshetra",
    category: "Government & Academic Partner",
    tier: "Strategic Research",
    description: "Collaborative research and Drone Tech Bootcamp under MeitY's SwaYaan initiative.",
    logo: "/sponsors/nit_kurukshetra.webp"
  },
  {
    name: "W3Grads",
    category: "EdTech Partner",
    tier: "Educational Partner",
    description: "Industry-aligned technical curriculum, developer bootcamps, and career certifications.",
    logo: "/sponsors/w3grads.webp"
  },
  {
    name: "WICCI",
    category: "Industry Leadership Network",
    tier: "Outreach Partner",
    description: "Women’s Indian Chamber of Commerce and Industry networking and leadership tracks.",
    logo: "/sponsors/wicci.webp"
  },
  {
    name: "Runaway",
    category: "Creative Partner",
    tier: "Creative Partner",
    description: "Visual identity, creative media production, and immersive event branding.",
    logo: "/sponsors/runaway.webp"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "g1",
    title: "Code Hustle 24-Hour Hackathon",
    tag: "Flagship Hackathon",
    image: "/gallery/gallery_1.webp",
    description: "Students engineering nonstop through the night at MAC Auditorium, UPES Bidholi."
  },
  {
    id: "g2",
    title: "Smart India Hackathon Matrix Jury",
    tag: "National Qualifiers",
    image: "/gallery/gallery_2.webp",
    description: "Jury panels evaluating 330+ participating student teams for the national qualifier stage."
  },
  {
    id: "g3",
    title: "Pehchaan Dragons' Den & Keynotes",
    tag: "Tech Symposium",
    image: "/gallery/gallery_3.webp",
    description: "Student founders pitching innovative technology prototypes to university faculty and industry experts."
  },
  {
    id: "g4",
    title: "Drone Tech & Autonomous Flight Lab",
    tag: "Autonomous Research",
    image: "/gallery/gallery_4.webp",
    description: "Hands-on flight testing, avionics calibration, and waypoint navigation with NIT Kurukshetra & MeitY."
  },
  {
    id: "g5",
    title: "Code Hustle Midnight Sprint",
    tag: "Hackathon Floor",
    image: "/events/code_hustle_1.webp",
    description: "Intense software development sprints and peer collaboration during the 24-hour flagship marathon."
  },
  {
    id: "g6",
    title: "Smart India Hackathon Hall",
    tag: "SIH UPES Round",
    image: "/events/sih_1.webp",
    description: "Hundreds of student developers presenting hardware and software prototypes to multi-disciplinary juries."
  }
];
