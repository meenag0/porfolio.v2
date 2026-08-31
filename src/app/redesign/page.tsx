'use client';

import { useEffect, useState } from 'react';
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import Image from 'next/image';
import { Plus, Github, ExternalLink } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
});

type Theme = 'light' | 'dark';

function getTokens(theme: Theme): React.CSSProperties {
  if (theme === 'dark') {
    return {
      '--bg': '#121212',
      '--rail-bg': '#050505',
      '--ink': '#f2f1ed',
      '--muted': '#b8b4ab',
      '--muted-2': '#8f8b82',
      '--accent': '#ff6b45',
      '--line': '#2a2a28',
      '--rail-text': '#f2f1ed',
      '--rail-muted': '#6b6863',
    } as React.CSSProperties;
  }
  return {
    '--bg': '#f6f5f2',
    '--rail-bg': '#121212',
    '--ink': '#121212',
    '--muted': '#55524f',
    '--muted-2': '#6b6863',
    '--accent': '#ff4d1c',
    '--line': '#d8d5cf',
    '--rail-text': '#f6f5f2',
    '--rail-muted': '#a8a4ae',
  } as React.CSSProperties;
}

interface Project {
  title: string;
  description: string;
  tags: string;
  link?: string;
  github?: string;
  image: string;
}

const PROJECTS: Project[] = [
  {
    title: 'CodeDeck 💻',
    description:
      'An iOS application for interactive algorithm practice with flashcards, a custom code editor, and AI-powered solution validation.',
    tags: 'swift · swiftui · combine · sqlite · mvvm · async-await · ollama-llm · ios',
    github: 'https://github.com/meenag0/CodeDeck',
    image: '/images/codeDeck1.png',
  },
  {
    title: 'cine.fm 🎶',
    description: 'A web application using machine learning to generate playlists based on movie selections.',
    tags: 'python · machine-learning · spotify-api · nlp · transformers · pandas · numpy',
    link: 'https://cinefm.streamlit.app/',
    image: '/placeholders/project-cinefm.svg',
  },
  {
    title: 'EcoTrackr 🌱',
    description:
      'A cross-platform mobile app for tracking personal carbon footprint and promoting eco-conscious living.',
    tags: 'react-native · typescript · fastAPI · REST · python · node.js · expo',
    image: '/placeholders/project-ecotrackr.svg',
  },
  {
    title: '2Read [Rust] 📖',
    description:
      'A Rust-based web scraping application that generates a reading list pulling from my favourite publications.',
    tags: 'rust · javascript · web-scraping · heroku · actix · reqwest',
    image: '/images/toread.png',
  },
  {
    title: 'Flappy Bird 🐤',
    description: 'A browser-based recreation of the classic Flappy Bird game built with JavaScript and Phaser.',
    tags: 'javascript · phaser · html/css',
    image: '/placeholders/project-flappybird.svg',
  },
  {
    title: 'Price Predictor 🏠',
    description: 'Machine learning model for predicting housing prices using California housing dataset.',
    tags: 'python · scikit-learn · pandas · tensorflow · keras · matplotlib',
    image: '/placeholders/project-pricepredictor.svg',
  },
  {
    title: 'MNIST Classify ✍️',
    description: 'A machine learning classifier for recognizing handwritten digits using the MNIST dataset.',
    tags: 'python · pandas · sklearn · jupyter · matplotlib · numpy',
    image: '/placeholders/project-mnist.svg',
  },
  {
    title: 'Portfolio.v1 💻',
    description:
      'First iteration of my personal portfolio showcasing projects+experiences, built with Three.js and React.',
    tags: 'javascript · react · node.js · three.js · vite · spline',
    image: '/placeholders/project-portfoliov1.svg',
  },
  {
    title: 'Portfolio v2 💫',
    description: 'Latest version of personal website built with modern web technologies and animations.',
    tags: 'next.js · typescript · react · javascript · tailwind CSS',
    link: 'https://meenagopalakrishnan.com',
    image: '/placeholders/project-portfoliov2.svg',
  },
];

interface Experience {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  technologies: string;
  logo?: string;
}

const EXPERIENCE: Experience[] = [
  {
    title: 'Software Engineer',
    company: 'Northbridge Financial Corporation',
    period: 'May 2025 - Aug 2025',
    bullets: [
      'Developed a cloud-native resource analyzer in Go (client-go, Docker), exposing REST/gRPC APIs and a React/TypeScript dashboard for real-time monitoring of 20+ workloads',
      'Created Helm charts and Terraform modules for AKS, integrating ConfigMaps, RBAC, load balancers and CI/CD pipelines, automating end-to-end deployment for 10+ services',
      'Deployed 15+ containerized microservices using Helm charts and Ansible, showing scalable infra management',
    ],
    technologies: 'Go · Docker · Terraform · Helm · React · Typescript · Ansible · Kubernetes (AKS) · Argo-CD · CI/CD pipelines · ConfigMaps',
    logo: '/images/nbfc.png',
  },
  {
    title: 'Software Developer',
    company: 'Royal Bank of Canada (RBC)',
    period: 'Sept 2024 - Dec 2024',
    bullets: [
      'Chosen to present at SLT Showcase to senior leaders for outstanding performance',
      'Engineered resolution of 40+ critical incidents across AWS (EC2, Cloudformation, Lambda, S3, VPC) and Azure (AKS, Databricks, ACR, App Services), tackling infrastructure provisioning, enhancing serverless performance, etc.',
      'Optimized and managed critical cloud infrastructure supporting 20,000+ users across AWS/Azure, leveraging ACR/ECR, Kubernetes(AKS), Azure AD, AKV, Azure MI & AWS IAM.',
      'Onboarded enterprise applications across AWS and Azure by implementing Terraform, configuring network policies, and enforcing security compliance.',
    ],
    technologies: 'AWS · EC2 · CloudFormation · S3 · VPC · Azure · Kubernetes (AKS/EKS) · Databricks · Azure Container Registry (ACR) · Terraform · Azure AD · Azure Key Vault · Azure Managed Identity · AWS IAM · ECR',
    logo: '/images/rbc.png',
  },
  {
    title: 'Software Developer',
    company: 'Google Developer Group Waterloo',
    period: 'Sept 2024 - Present',
    bullets: [
      "Developed responsive events page for GDSC Waterloo's website using React, TypeScript and TanStack Router, serving 500+ student members.",
      'Built dynamic event card system with Tailwind CSS featuring dual viewing modes and real-time attendee tracking for Google and club events.',
      'Implemented filterable interface to showcase upcoming tech events and workshops, improving discoverability for 150+ monthly student attendees.',
    ],
    technologies: 'React · TypeScript · TanStack Router · Tailwind CSS · HTML · JavaScript · Git',
    logo: '/images/googledev.png',
  },
  {
    title: 'AI & Azure Engineer Intern',
    company: 'Microsoft WEA @UWaterloo',
    period: 'Jan 2023 - Apr 2023',
    bullets: [
      'Designed AI pipeline using Azure ML and Azure DB to generate financial recommendations.',
      'Refined stock and ETF performance prediction using advanced regression models, integrating personalized recommendations through content-based filtering for tailored insights.',
      'Led cross-functional team collaboration, improving productivity through communication & teamwork',
    ],
    technologies: 'Azure Machine Learning · Azure Database · Python · Regression Models · SQL',
    logo: '/images/uwaterloo.png',
  },
  {
    title: 'Lead Web Developer',
    company: 'The Fraser Post',
    period: 'Jan 2020 - Jun 2023',
    bullets: [
      'Managed and delivered a responsive website using React, HTML/CSS and JS following the SDLC',
      'Developed dynamic features using Microsoft Excel to manage content scheduling and tracking',
      'Led and collaborated with team to plan and organize tasks, integrate content and resolve issues',
    ],
    technologies: 'React · HTML · CSS · JavaScript · Microsoft Excel · Git · Project Management',
  },
];

const INTERESTS = [
  'End-to-End Development',
  'Cloud Computing',
  'Fintech',
  'Cryptography',
  'Machine Learning',
  'GUIs',
  'Generative AI',
  'Sustainability',
  'Music',
];

const TECH_STACK: { category: string; items: string[] }[] = [
  { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'C++', 'Rust', 'Dart', 'SQL', 'HTML', 'CSS', 'SASS'] },
  { category: 'Web & Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'Material UI', 'React Native', 'Expo', 'Flutter'] },
  { category: 'Backend & APIs', items: ['Node.js', 'FastAPI', 'REST API', 'Actix-Web', 'Express', 'Axios', 'Fetch API', 'Spotify API', 'Google API'] },
  { category: 'ML & Data Science', items: ['TensorFlow', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Keras', 'Hugging Face Transformers'] },
  { category: 'Cloud & DevOps', items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Google Cloud', 'Heroku'] },
  { category: 'Developer Tools', items: ['Git', 'VS Code', 'XCode', 'Jira', 'Firebase', 'Agile', 'Confluence', 'HCL', 'Excel', 'MS Word'] },
];

const NAV = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Connect', href: '#connect' },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function ExperienceRow({ exp }: { exp: Experience }) {
  const [expanded, setExpanded] = useState(false);
  const isCurrent = exp.period.toLowerCase().includes('present');

  return (
    <div
      className="grid sm:grid-cols-2 gap-4 sm:gap-6 py-6 cursor-pointer"
      style={{ borderTop: '1px solid var(--line)' }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded((v) => !v)}
    >
      <div>
        <div className="flex items-center gap-3">
          {exp.logo ? (
            <div
              className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center"
              style={{ backgroundColor: 'var(--line)' }}
            >
              <Image src={exp.logo} alt={exp.company} width={20} height={20} className="object-contain" />
            </div>
          ) : (
            <div
              className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center font-[var(--font-mono)] text-[0.6rem]"
              style={{ backgroundColor: 'var(--line)', color: 'var(--accent)' }}
            >
              {initials(exp.company)}
            </div>
          )}
          <div>
            <h3 className="font-[var(--font-display)] font-bold text-lg leading-tight">{exp.title}</h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              {exp.company}
            </p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <p className="font-[var(--font-mono)] text-xs" style={{ color: 'var(--muted-2)' }}>
            {exp.period}
          </p>
          {isCurrent && (
            <span className="flex items-center gap-1.5 font-[var(--font-mono)] text-[0.65rem] uppercase tracking-[0.08em]" style={{ color: 'var(--accent)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
              Current
            </span>
          )}
        </div>
      </div>
      <div>
        <div className="flex items-start justify-between gap-3">
          <p className="font-[var(--font-mono)] text-xs leading-relaxed" style={{ color: 'var(--muted-2)' }}>
            {exp.technologies}
          </p>
          <Plus
            className="w-3.5 h-3.5 shrink-0 mt-0.5 transition-transform duration-300"
            style={{ color: 'var(--muted-2)', transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
          />
        </div>
        <div
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-1.5 max-w-md pt-3">
              {exp.bullets.map((b, bi) => (
                <li key={bi} className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Photo {
  src: string;
  caption: string;
}

const PHOTOS: Photo[] = [
  { src: '/placeholders/life-1.svg', caption: 'hiking' },
  { src: '/placeholders/life-2.svg', caption: 'somewhere far from a laptop' },
  { src: '/placeholders/life-3.svg', caption: 'add a caption' },
  { src: '/placeholders/life-4.svg', caption: 'life, occasionally' },
];

function HeroPhotoPanel() {
  const [index, setIndex] = useState(0);
  const photo = PHOTOS[index];

  const go = (delta: number) => {
    setIndex((i) => (i + delta + PHOTOS.length) % PHOTOS.length);
  };

  return (
    <div className="rounded-md overflow-hidden border" style={{ borderColor: 'var(--line)' }}>
      <div
        className="relative h-[320px] sm:h-[380px] overflow-hidden"
        style={{
          backgroundImage:
            'repeating-conic-gradient(var(--line) 0% 25%, transparent 0% 50%) 50% / 16px 16px',
        }}
      >
        <Image key={photo.src} src={photo.src} alt={photo.caption} fill unoptimized className="object-cover" />
        <button
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg)', color: 'var(--ink)', opacity: 0.85 }}
        >
          ‹
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg)', color: 'var(--ink)', opacity: 0.85 }}
        >
          ›
        </button>
      </div>
      <div
        className="flex items-center justify-between px-5 py-4 border-t"
        style={{ borderColor: 'var(--line)', backgroundColor: 'var(--rail-bg)' }}
      >
        <span className="font-[var(--font-mono)] text-xs" style={{ color: 'var(--rail-muted)' }}>
          {photo.caption}
        </span>
        <div className="flex gap-1.5">
          {PHOTOS.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setIndex(i)}
              aria-label={`Go to photo ${i + 1}`}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: i === index ? 'var(--accent)' : 'var(--rail-muted)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RedesignPage() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = window.localStorage.getItem('redesign-theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      window.localStorage.setItem('redesign-theme', next);
      return next;
    });
  };

  const tokens = getTokens(theme);

  return (
    <>
      {/* the shared globals.css ships a purple mouse-follow glow and a boxed navbar —
          this redesign draft uses its own rail nav and palette, so switch both off here only */}
      <style jsx global>{`
        body::before {
          content: none;
        }
        body > nav {
          display: none !important;
        }
      `}</style>

      <main
        style={{ ...tokens, backgroundColor: 'var(--bg)', color: 'var(--ink)' }}
        className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen transition-colors duration-300`}
      >
        {/* Header */}
        <header
          className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-y-3 px-6 sm:px-12 py-5 transition-colors duration-300"
          style={{ backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--line)' }}
        >
          <a href="#top" className="font-[var(--font-display)] font-bold text-base" style={{ color: 'var(--ink)' }}>
            <span className="sm:hidden">MG</span>
            <span className="hidden sm:inline">meena gopalakrishnan</span>
          </a>
          <div className="flex items-center gap-4 sm:gap-9">
            <nav className="flex gap-4 sm:gap-7">
              {NAV.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  className="font-[var(--font-mono)] text-[0.65rem] sm:text-xs uppercase tracking-[0.1em] hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--muted-2)' }}
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        {/* Main */}
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          {/* Hero */}
          <section
            id="top"
            className="scroll-mt-24 pt-24 pb-16 sm:pt-32 sm:pb-20 grid lg:grid-cols-[3fr_2fr] gap-14 lg:gap-10 items-center"
          >
            <div>
              <p
                className="font-[var(--font-mono)] text-xs sm:text-sm tracking-wide"
                style={{ color: 'var(--accent)' }}
              >
                COMPUTER ENGINEERING @ UWATERLOO
              </p>
              <p className="mt-6 text-xl" style={{ color: 'var(--muted)' }}>
                Hello! I am
              </p>
              <h1 className="font-[var(--font-display)] font-extrabold leading-[0.88] tracking-tight text-[clamp(3.5rem,10vw,7rem)]">
                Meena.
              </h1>
              <p className="mt-3 font-[var(--font-mono)] text-sm sm:text-base" style={{ color: 'var(--muted-2)' }}>
                engineer ∙ developer ∙ creative
              </p>
              <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
                I strive to solve problems through computers and code. Previously, I have delved into full
                stack development, cloud computing, machine learning and computer systems, and am always
                looking for new technologies to tinker with. I enjoy integrating my love for science, art
                and music with my passion for coding to create cool and useful projects.
              </p>
              <div className="mt-10 flex items-center gap-8">
                <a
                  href="#connect"
                  className="font-[var(--font-mono)] text-sm pb-1"
                  style={{ borderBottom: '2px solid var(--ink)', color: 'var(--ink)' }}
                >
                  Get in touch
                </a>
                <a
                  href="#projects"
                  className="font-[var(--font-mono)] text-sm pb-1"
                  style={{ color: 'var(--muted-2)' }}
                >
                  View work
                </a>
              </div>
            </div>

            <HeroPhotoPanel />
          </section>

            {/* Work Experience */}
            <section id="work" className="max-w-5xl mx-auto scroll-mt-24 pt-16 pb-16 sm:pt-20 sm:pb-20" style={{ borderTop: '2px solid var(--ink)' }}>
              <div className="mb-8">
                <span
                  className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em]"
                  style={{ color: 'var(--muted-2)' }}
                >
                  Work Experience
                </span>
              </div>

              <div>
                {EXPERIENCE.map((exp) => (
                  <ExperienceRow key={exp.company} exp={exp} />
                ))}
              </div>
            </section>

            {/* Featured Projects */}
            <section id="projects" className="max-w-5xl mx-auto scroll-mt-24 pt-16 pb-16 sm:pt-20 sm:pb-20" style={{ borderTop: '2px solid var(--ink)' }}>
              <div className="flex items-baseline justify-between mb-8">
                <span
                  className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em]"
                  style={{ color: 'var(--muted-2)' }}
                >
                  Featured Projects
                </span>
                <span
                  className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em] hidden sm:block"
                  style={{ color: 'var(--muted-2)' }}
                >
                  {String(PROJECTS.length).padStart(2, '0')} projects
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
                {PROJECTS.map((p, i) => (
                  <div key={p.title} className="group">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-md">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-4 flex items-baseline gap-3">
                      <span className="font-[var(--font-mono)] text-xs" style={{ color: 'var(--accent)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-[var(--font-display)] font-bold text-xl sm:text-2xl">{p.title}</h3>
                    </div>
                    <p className="mt-2 text-sm max-w-md" style={{ color: 'var(--muted)' }}>
                      {p.description}
                    </p>
                    <p className="mt-3 font-[var(--font-mono)] text-xs" style={{ color: 'var(--muted-2)' }}>
                      {p.tags}
                    </p>
                    {(p.link || p.github) && (
                      <div className="mt-3 flex items-center gap-5">
                        {p.link && (
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-[var(--font-mono)] text-xs hover:opacity-70 transition-opacity"
                            style={{ color: 'var(--ink)' }}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Live Demo
                          </a>
                        )}
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-[var(--font-mono)] text-xs hover:opacity-70 transition-opacity"
                            style={{ color: 'var(--ink)' }}
                          >
                            <Github className="w-3.5 h-3.5" />
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Interested In */}
            <section className="max-w-5xl mx-auto pt-16 pb-16 sm:pt-20 sm:pb-20" style={{ borderTop: '2px solid var(--ink)' }}>
              <div className="mb-8">
                <span
                  className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em]"
                  style={{ color: 'var(--muted-2)' }}
                >
                  I&rsquo;m Interested In
                </span>
              </div>
              <p className="font-[var(--font-display)] font-medium text-2xl sm:text-3xl leading-snug max-w-3xl">
                {INTERESTS.map((item, i) => (
                  <span key={item}>
                    {item}
                    {i < INTERESTS.length - 1 && <span style={{ color: 'var(--accent)' }}> · </span>}
                  </span>
                ))}
              </p>
            </section>

            {/* Tech Stack */}
            <section className="max-w-5xl mx-auto pt-16 pb-16 sm:pt-20 sm:pb-20" style={{ borderTop: '2px solid var(--ink)' }}>
              <div className="mb-8">
                <span
                  className="font-[var(--font-mono)] text-xs uppercase tracking-[0.08em]"
                  style={{ color: 'var(--muted-2)' }}
                >
                  My Tech Stack
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                {TECH_STACK.map((group) => (
                  <div key={group.category}>
                    <h3 className="font-[var(--font-display)] font-bold text-lg">{group.category}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {group.items.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Connect */}
            <section id="connect" className="max-w-3xl mx-auto scroll-mt-24 pt-16 pb-20 sm:pt-20 sm:pb-24" style={{ borderTop: '2px solid var(--ink)' }}>
              <h2 className="font-[var(--font-display)] font-extrabold text-4xl sm:text-6xl tracking-tight">
                Let&rsquo;s Connect
              </h2>
              <p className="mt-4 max-w-md" style={{ color: 'var(--muted)' }}>
                Have a project in mind or just want to chat? I&rsquo;m always open to new opportunities and
                interesting conversations.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="mailto:m3gopala@uwaterloo.ca"
                  className="font-[var(--font-mono)] text-sm pb-1 w-fit"
                  style={{ borderBottom: '2px solid var(--ink)', color: 'var(--ink)' }}
                >
                  m3gopala@uwaterloo.ca
                </a>
                <a
                  href="https://github.com/meenag0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[var(--font-mono)] text-sm w-fit"
                  style={{ color: 'var(--muted-2)' }}
                >
                  github.com/meenag0
                </a>
                <a
                  href="https://linkedin.com/in/meenagopalakrishnan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[var(--font-mono)] text-sm w-fit"
                  style={{ color: 'var(--muted-2)' }}
                >
                  linkedin.com/in/meenagopalakrishnan
                </a>
              </div>
            </section>

          <footer className="max-w-5xl mx-auto pt-8 pb-10" style={{ borderTop: '1px solid var(--line)' }}>
            <p className="font-[var(--font-mono)] text-xs" style={{ color: 'var(--muted-2)' }}>
              © {new Date().getFullYear()} Meena Gopalakrishnan
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
