import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiCss,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNumpy,
  SiPandas,
  SiPython,
  SiReact,
  SiScikitlearn,
} from "react-icons/si";
import { TbBrandDatabricks, TbBrandTabler, TbBracketsAngle, TbChartHistogram, TbPrompt, TbVectorBezier2 } from "react-icons/tb";

export type SkillItem = {
  name: string;
  category: string;
  accent: string;
  icon: IconType;
};

export type ProjectItem = {
  title: string;
  period: string;
  description: string;
  stack: string[];
  href: string;
  highlight: string;
  image: string;
};

export type ExperienceItem = {
  title: string;
  subtitle: string;
  period: string;
  points: string[];
};

export const heroStats = [
  { label: "Internships", value: "2" },
  { label: "Projects shipped", value: "3" },
  { label: "Certifications", value: "5" }
];

export const intro = {
  name: "Ankit Kumar",
  title: "Data Analyst | Developer",
  location: "Koderma, Jharkhand",
  email: "ankitkumar56083@gmail.com",
  phone: "+91 72095 98117",
  linkedin: "https://www.linkedin.com/in/ankit-kumar-s25/",
  github: "https://github.com/anku83",
  tagline:
    "I turn raw data, product ideas, and front-end execution into experiences that feel clear, useful, and alive.",
  summary:
    "A data analytics enthusiast with hands-on experience in Python, SQL, Power BI, Tableau, and modern front-end development. I enjoy shaping information into decisions, dashboards into stories, and interfaces into polished products."
};

export const aboutBullets = [
  "Data analytics enthusiast focused on turning scattered datasets into narratives that teams can act on.",
  "Comfortable across Python, SQL, Power BI, Tableau, and React-driven interfaces.",
  "Drawn to work that blends analytical depth, product thinking, and clean visual execution."
];

export const skills: SkillItem[] = [
  { name: "C++", category: "Language", accent: "from-[#151518] to-[#1A1A1D]", icon: SiCplusplus },
  { name: "Java", category: "Language", accent: "from-[#151518] to-[#1A1A1D]", icon: TbBracketsAngle },
  { name: "JavaScript", category: "Language", accent: "from-[#151518] to-[#1A1A1D]", icon: SiJavascript },
  { name: "Python", category: "Language", accent: "from-[#151518] to-[#1A1A1D]", icon: SiPython },
  { name: "HTML", category: "Language", accent: "from-[#151518] to-[#1A1A1D]", icon: SiHtml5 },
  { name: "CSS", category: "Language", accent: "from-[#151518] to-[#1A1A1D]", icon: SiCss },
  { name: "Excel", category: "Tool", accent: "from-[#151518] to-[#1A1A1D]", icon: TbChartHistogram },
  { name: "Power BI", category: "Tool", accent: "from-[#151518] to-[#1A1A1D]", icon: TbBrandDatabricks },
  { name: "Tableau", category: "Tool", accent: "from-[#151518] to-[#1A1A1D]", icon: TbBrandTabler },
  { name: "MySQL", category: "Tool", accent: "from-[#151518] to-[#1A1A1D]", icon: SiMysql },
  { name: "Pandas", category: "Library", accent: "from-[#151518] to-[#1A1A1D]", icon: SiPandas },
  { name: "NumPy", category: "Library", accent: "from-[#151518] to-[#1A1A1D]", icon: SiNumpy },
  { name: "Matplotlib", category: "Library", accent: "from-[#151518] to-[#1A1A1D]", icon: TbVectorBezier2 },
  { name: "React JS", category: "Framework", accent: "from-[#151518] to-[#1A1A1D]", icon: SiReact },
  { name: "Machine Learning", category: "Concept", accent: "from-[#151518] to-[#1A1A1D]", icon: SiScikitlearn },
  { name: "NLP", category: "Concept", accent: "from-[#151518] to-[#1A1A1D]", icon: TbPrompt },
  { name: "DSA", category: "Concept", accent: "from-[#151518] to-[#1A1A1D]", icon: SiGit }
];

export const projects: ProjectItem[] = [
  {
    title: "Stopwatch PWA",
    period: "May 2025 - June 2025",
    description:
      "A polished stopwatch and timer web app with lap tracking, session history, themes, offline support, and installable PWA behavior for daily use.",
    stack: ["HTML", "CSS", "JavaScript", "PWA"],
    href: "https://github.com/anku83/Watchy",
    highlight: "Performance-first utility experience",
    image: "/stopwatch-preview.svg"
  },
  {
    title: "Typing Speed Test",
    period: "Dec 2025 - Jan 2026",
    description:
      "An interactive typing trainer that measures WPM, accuracy, and errors in real time while giving immediate visual feedback on every keystroke.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive UI"],
    href: "https://github.com/anku83/typing-speed-test",
    highlight: "Real-time interaction design",
    image: "/typing-test-preview.svg"
  },
  {
    title: "Road Condition ML System",
    period: "Oct 2025 - Nov 2025",
    description:
      "A machine learning pipeline and lightweight backend that classifies road conditions from labeled data after cleaning, encoding, and model training.",
    stack: ["Python", "Machine Learning", "Flask/FastAPI"],
    href: "https://github.com/anku83/road-condition-classification-streamlit",
    highlight: "Applied ML with deployable prediction flow",
    image: "/road-classification-preview.svg"
  }
];

export const experience: ExperienceItem[] = [
  {
    title: "Deloitte (Virtual Internship)",
    subtitle: "Data Analytics",
    period: "April 2024",
    points: [
      "Cleaned and organized data using Excel, SQL, and Python to improve analysis readiness.",
      "Resolved errors and missing values to improve dataset accuracy and reliability.",
      "Built dashboards in Power BI and Tableau to communicate important findings clearly.",
      "Studied trends and patterns, then prepared insight summaries for business understanding."
    ]
  },
  {
    title: "LPU Summer Internship",
    subtitle: "Data Analytics Essentials",
    period: "June 2025 - July 2025",
    points: [
      "Worked hands-on with SQL, Python, Power BI, Tableau, and Excel across analytics exercises.",
      "Performed data cleaning, analysis, and visualization to extract practical insights.",
      "Created interactive dashboards and reports with a focus on clarity and usability.",
      "Used SQL for extraction and Python for introductory automation and analysis workflows."
    ]
  }
];

export const education = [
  {
    school: "Lovely Professional University, Punjab",
    detail: "B.Tech in Computer Science and Engineering",
    period: "2023 - 2027",
    metric: "CGPA 6.33",
    location: "Jalandhar, Punjab"
  },
  {
    school: "RLSY College",
    detail: "12th with Science",
    period: "2021 - 2022",
    metric: "70.4%",
    location: "Koderma, Jharkhand"
  },
  {
    school: "A +2 Uchch Vidyalaya",
    detail: "10th",
    period: "2019 - 2020",
    metric: "70.2%",
    location: "Koderma, Jharkhand"
  }
];

export const achievements = [
  "Oracle AI Foundation Certified",
  "Oracle Generative AI Certified",
  "Top 30 in CodeXtreme 2.0 Neo Codeathon",
  "Deloitte Data Analytics Certification",
  "LPU Data Analytics Essentials Certification"
];
