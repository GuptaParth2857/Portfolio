export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "leetcode" | "x";
};

export type ProjectTag = "AI" | "Full-Stack" | "3D" | "Hackathon" | "Python";

export type Project = {
  name: string;
  blurb: string;
  description: string;
  tags: ProjectTag[];
  tech: string[];
  image?: string;
  liveUrl?: string;
  repoUrl: string;
};

export const profile = {
  name: "Parth Gupta",
  initials: "PG",
  role: "Aspiring Software Engineer",
  subtitle:
    "B.Tech Computer Science Student · J.C. Bose University of Science & Technology, YMCA",
  location: "Faridabad, Haryana, India",
  email: "gupta.parth2857@gmail.com",
  university: "J.C. Bose University of Science & Technology, YMCA",
  resumeUrl: "/resume.pdf",
};

export const roles = [
  "Aspiring Software Engineer",
  "Full-Stack Developer",
  "AI Product Engineer",
  "Problem Solver",
];

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/GuptaParth2857", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/guptaparth2857/", icon: "linkedin" },
  { label: "LeetCode", href: "https://leetcode.com/u/ParthGupta2857/", icon: "leetcode" },
  { label: "X", href: "https://x.com/GuptaParth2857", icon: "x" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const marqueeItems = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C",
  "C++",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Three.js",
  "FastAPI",
  "LangChain",
  "Redis",
  "Git & GitHub",
];

export const terminalLines = [
  { prompt: "$", cmd: "whoami" },
  { prompt: ">", cmd: "parth_gupta | cse_student | developer" },
  { prompt: "$", cmd: "cat focus_2026.txt" },
  { prompt: ">", cmd: "shipping AI products with LLMs & diffusion models" },
  { prompt: ">", cmd: "building scalable full-stack web apps" },
  { prompt: ">", cmd: "sharpening DSA fundamentals" },
  { prompt: "$", cmd: "echo $goals" },
  { prompt: ">", cmd: 'open_to_internships → "hire me 🚀"' },
];

export const focusAreas = [
  "AI Product Engineering",
  "Full-Stack Web Development",
  "Generative AI & Machine Learning",
  "Scalable Backend Systems",
  "Open Source",
  "Data Structures & Algorithms",
];

export const stats = [
  { value: "2+", label: "Years of Experience" },
  { value: "6+", label: "AI Products Shipped" },
  { value: "1K+", label: "Users Reached" },
  { value: "4", label: "Production Apps" },
];

export type ExperienceSubProject = {
  name: string;
  tagline: string;
  bullets: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
  bullets: string[];
  projects?: ExperienceSubProject[];
  logo?: string;
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "PW (PhysicsWallah)",
    role: "Channel Partner Intern",
    period: "Aug 2026 — Present",
    summary:
      "Building PW's presence among student communities as a channel partner intern at one of India's largest edtech platforms.",
    bullets: [
      "Growing on-campus awareness of PW's learning programs and driving student onboarding",
      "Organizing outreach sessions and collaborating with the regional team on edtech campaigns",
      "Acting as the on-ground link between students and the platform's programs",
    ],
    tech: ["Community Building", "Outreach", "EdTech"],
    logo: "/images/logos/pw.png",
  },
  {
    company: "Google",
    role: "Student Campus Ambassador",
    period: "May 2026 — Present",
    summary:
      "Representing Google on campus and helping students discover Google's tools, resources, and career programs.",
    bullets: [
      "Raised awareness of Google products and student resources across campus communities",
      "Hosted info sessions and collaborated with student clubs to drive engagement",
      "Served as the peer liaison connecting students with Google's programs",
    ],
    tech: ["Public Speaking", "Community Building", "Events"],
    logo: "/images/logos/google.png",
  },
  {
    company: "GeeksforGeeks",
    role: "Campus Mantri",
    period: "May 2026 — Present",
    summary:
      "Spreading DSA and coding culture on campus as GeeksforGeeks' official campus representative.",
    bullets: [
      "Driving DSA learning and coding engagement among fellow students",
      "Organizing events and sharing GeeksforGeeks resources to grow student participation",
      "Acting as the on-campus point of contact for the GeeksforGeeks team",
    ],
    tech: ["DSA", "Community Building", "Events"],
    logo: "/images/logos/gfg.png",
  },
  {
    company: "Zenvyx",
    role: "Founder",
    period: "Apr 2026 — Present",
    summary:
      "Leading Zenvyx, a tech-focused team dedicated to building innovative digital solutions — managing projects, collaborating with team members, and shipping real-world applications spanning web development, AI-based ideas, and creative tech solutions.",
    bullets: [
      "Leading a tech team to build and deliver impactful digital products",
      "Managing projects end-to-end while keeping the team aligned on goals",
      "Shipping real-world applications across web development and AI-based ideas",
    ],
    tech: ["JavaScript", "Web Development", "AI", "Project Management"],
    logo: "/images/logos/zenvyx.png",
  },
  {
    company: "Life Insurance Corporation of India (LIC)",
    role: "Insurance Operation Assistant (Learning Experience)",
    period: "Apr 2025 — Aug 2025",
    summary:
      "Worked under the guidance of a licensed LIC agent to gain practical exposure in insurance operations.",
    bullets: [
      "Assisted in premium collections and updated payment records",
      "Helped customers with loan applications and policy surrender processes",
      "Learned different LIC policy types, documentation, and fieldwork basics",
      "Gained hands-on experience of the daily working of an LIC office",
    ],
    tech: ["Customer Service", "Problem Solving", "Documentation"],
    logo: "/images/logos/lic.png",
  },
];

export type SkillGroup = {
  title: string;
  icon: "code" | "layout" | "wrench";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    icon: "code",
    items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    title: "Web & Frameworks",
    icon: "layout",
    items: ["HTML/CSS", "React", "Next.js", "Node.js", "Express", "Tailwind CSS", "MedusaJS", "Framer Motion"],
  },
  {
    title: "AI & ML Stack",
    icon: "code",
    items: ["Gemini AI", "OpenAI", "Anthropic", "LangChain", "Stable Diffusion", "FastAPI", "Modal"],
  },
  {
    title: "Tools & Platforms",
    icon: "wrench",
    items: ["Git & GitHub", "VS Code", "Vercel", "Three.js", "Prisma", "Redis", "TurboRepo"],
  },
];

export const projects: Project[] = [
  {
    name: "ZyntraCare",
    blurb: "AI-powered healthcare platform",
    description:
      "A production-grade healthcare platform with a Gemini-powered symptom checker, live hospital bed tracking (SSE), emergency response system, and ambulance booking.",
    tags: ["AI", "Full-Stack"],
    tech: ["Next.js 16", "React 19", "TypeScript", "Gemini AI", "Prisma", "Zustand", "Three.js"],
    liveUrl: "https://zyntracare.vercel.app/",
    repoUrl: "https://github.com/GuptaParth2857/ZyntraCare",
  },
  {
    name: "VeloraGreen",
    blurb: "Carbon footprint awareness platform",
    description:
      "A 6-category CO₂ calculator with a 3D Earth visualization, gamified badges & challenges, and exportable PNG/PDF sustainability reports.",
    tags: ["Full-Stack", "3D"],
    tech: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS", "Zustand", "Recharts"],
    liveUrl: "https://veloragreen.vercel.app",
    repoUrl: "https://github.com/GuptaParth2857/VeloraGreen",
  },
  {
    name: "ZyniVerse",
    blurb: "Multi-route production platform",
    description:
      "A full-featured TypeScript platform with multiple product routes, API integration and production-ready architecture — deployed to a custom domain.",
    tags: ["Full-Stack"],
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "REST APIs"],
    image: "/images/projects/zyverse.png",
    liveUrl: "https://zyverse.in/",
    repoUrl: "https://github.com/GuptaParth2857/ZyniVerse",
  },
  {
    name: "SatdiumAi",
    blurb: "AI-assisted web experience",
    description:
      "An AI-focused web app exploring intelligent, interactive experiences — built and deployed with a modern TypeScript stack.",
    tags: ["AI"],
    tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    liveUrl: "https://stadiumai-brown.vercel.app",
    repoUrl: "https://github.com/GuptaParth2857/SatdiumAi",
  },
  {
    name: "Disha Hackathon",
    blurb: "Built in a live hackathon",
    description:
      "A JavaScript project built under the pressure of a live hackathon — rapid prototyping, teamwork, and shipping fast.",
    tags: ["Hackathon"],
    tech: ["JavaScript", "HTML/CSS"],
    repoUrl: "https://github.com/GuptaParth2857/disha-hackathon",
  },
  {
    name: "Grading System",
    blurb: "Python grade calculator",
    description:
      "A Python program that takes a student's marks out of 100 and returns the correct grade — one of my first explorations into logic & clean code.",
    tags: ["Python"],
    tech: ["Python"],
    repoUrl: "https://github.com/GuptaParth2857/Grading-System-",
  },
];

export const education = {
  school: "J.C. Bose University of Science & Technology, YMCA",
  degree: "B.Tech — Computer Science & Engineering",
  duration: "2025 — 2029",
  location: "Faridabad, Haryana, India",
  logo: "/images/logos/jcboseust.png",
  highlights: [
    "Building a strong foundation in Data Structures, Algorithms, and Software Engineering",
    "Hands-on with real projects: AI platforms, 3D web experiences, and hackathons",
    "Active in competitive programming and open-source learning",
  ],
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  status: "verified" | "in-progress";
};

export const certifications: Certification[] = [
  {
    title: "Build With TRAE Hackathon",
    issuer: "Certificate of Participation",
    year: "2026",
    status: "verified",
  },
  {
    title: "HackCraft 3.0",
    issuer: "Certificate of Participation",
    year: "2026",
    status: "verified",
  },
  {
    title: "HackIndia 2026 Hackathon",
    issuer: "Certificate of Participation",
    year: "2026",
    status: "verified",
  },
  {
    title: "Introduction to Programming Using HTML and CSS",
    issuer: "Meta · Coursera",
    year: "2025",
    status: "verified",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "Google Cloud",
    year: "2025",
    status: "verified",
  },
];