'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Space_Grotesk, Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import Image from 'next/image';
import { Github, ExternalLink, ArrowRight, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

/* Space Grotesk: a proportional cut of Space Mono, so it keeps that family's
   idiosyncratic details while staying readable at text sizes. It shares a lineage with
   JetBrains Mono's engineered feel, which is why the two sit together well here. Its
   variable axis tops out at 700, so headings use font-bold — asking for 800 would clamp
   or trigger a synthesised bold. */
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
});

/* The caption under the print, set rather than handwritten. Every handwriting face
   tried here read as costume — a marker, then a looping script — and none of them
   sat with the mono and the grotesk around them. Instrument Serif is the serif cut of
   the Instrument Sans already carrying the body copy, so the caption belongs to the
   page's own type instead of importing a fifth voice. Italic, because a caption is an
   aside. */
const caption = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-caption',
});


type Theme = 'light' | 'dark';

/* Flat backgrounds, not gradients. A vertical gradient changes luminance down the
   page, so the same token measured 4.47:1 at the top of light mode and 2.58:1 at the
   bottom — a WCAG fail that moved depending on where the text sat. Flat means contrast
   is a fixed, provable number. Measured ratios against --bg:
     dark   ink 18.0  muted 11.3  muted-2 7.7  accent 8.2  shimmer 12.2
     light  ink 15.5  muted  8.1  muted-2 5.0  accent 5.1                     */
function getTokens(theme: Theme): React.CSSProperties {
  if (theme === 'dark') {
    return {
      '--bg': '#000314',
      '--surface': '#0a1435',
      '--card-line': 'rgba(234,241,247,0.24)',
      '--header-bg': 'rgba(0,3,20,0.78)',
      '--rail-bg': '#00020c',
      '--ink': '#eaf1f7',
      '--muted': '#b2c3d2',
      '--muted-2': '#8ea1b3',
      '--accent': '#ff8055',
      '--shimmer-hi': '#8ff0c8',
      /* The whole falloff in one token. Five stops approximating an exponential
         decay rather than a straight ramp: half the peak is gone by 22% of the
         radius and 97% of it by 70%, so there is no distance at which the light
         has an edge. Every stop carries the same rgb and only alpha moves, which
         is what keeps the hue from sliding as it fades. */
      '--glow-stops':
        'rgba(95,216,245,0.07) 0%, rgba(95,216,245,0.038) 22%, rgba(95,216,245,0.018) 45%, rgba(95,216,245,0.006) 70%, rgba(95,216,245,0) 100%',
      '--paper': '#e9e6de',
      '--paper-ink': '#2a2f33',
      '--static-blend': 'screen',
      '--static-opacity': '0.10',
      '--line': 'rgba(234,241,247,0.16)',
      '--rail-text': '#eaf1f7',
      '--rail-muted': '#8ea1b3',
    } as React.CSSProperties;
  }
  return {
    '--bg': '#e9eef3',
    '--surface': '#f7f9fc',
    '--card-line': 'rgba(12,23,34,0.22)',
    '--header-bg': 'rgba(233,238,243,0.80)',
    '--rail-bg': '#0c1722',
    '--ink': '#0c1722',
    '--muted': '#3a4756',
    '--muted-2': '#586675',
    '--accent': '#b8330a',
    '--shimmer-hi': '#0a8a63',
    '--glow-stops':
      'rgba(10,109,136,0.038) 0%, rgba(10,109,136,0.021) 22%, rgba(10,109,136,0.010) 45%, rgba(10,109,136,0.003) 70%, rgba(10,109,136,0) 100%',
    '--paper': '#fcfbf7',
    '--paper-ink': '#2a2f33',
    '--static-blend': 'multiply',
    '--static-opacity': '0.05',
    '--line': 'rgba(12,23,34,0.18)',
    '--rail-text': '#e9eef3',
    '--rail-muted': '#586675',
  } as React.CSSProperties;
}

interface Project {
  title: string;
  description: string;
  tags: string;
  link?: string;
  github?: string;
  image: string;
  /* An optional screen recording, shown in place of the still at the top of the case
     study. The overlay only mounts when it is opened, so the clip costs nothing until
     someone asks for it. */
  video?: string;
  poster?: string;
  /* Hard numbers for the Specs block. Falls back to the tags line when absent. */
  specs?: string[];
  /* One sentence on why it exists. The Demo and Specs blocks above already show what
     it does, so this only has to cover the part they cannot. */
  about?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Limit Order Book & Matching Engine',
    link: 'https://meenag0.github.io/limit-order-booking/',
    github: 'https://github.com/meenag0/limit-order-booking',
    description:
      'A low-latency limit order book in C++ with price-time priority matching, sustaining 25M+ operations per second.',
    tags: 'c++ · stl · google-benchmark · cmake · linux-perf · lock-free · systems',
    image: '/images/orderbook.jpg',
    video: '/videos/orderbook-demo.mp4',
    poster: '/videos/orderbook-poster.jpg',
    specs: [
      '25M+ operations per second sustained',
      'Throughput flat across 16x book depth',
      'O(1) cancellation through intrusive lists',
      'Lock-free SPSC ring buffer decoupling ingest from matching',
      'Zero heap allocation on the matching hot path',
      'Measured with Google Benchmark and Linux perf',
    ],
    about:
      "A limit order book and matching engine written in C++, where orders are matched by price first and then by time. It handles around 25 million operations per second, and the throughput holds steady even as the book gets deeper, because nothing is allocated on the heap while matching runs and incoming orders arrive through a lock-free queue.",
  },
  {
    title: 'CodeDeck',
    description:
      'A LeetCode-style iOS app with a built-in code editor, a flashcard system, and real-time solution validation across 100+ DSA problems.',
    tags: 'swift · swiftui · sqlite · mvvm · combine · async-await · ollama · ios',
    github: 'https://github.com/meenag0/CodeDeck',
    image: '/images/codeDeck1.png',
    video: '/videos/codedeck-demo.mp4',
    poster: '/videos/codedeck-poster.jpg',
    about:
      "An iOS app that puts a code editor, flashcards, and solution checking in one place, so practicing DSA problems doesn't mean juggling three different tabs. It checks your answers with an Ollama model running locally on the phone, which means it works without a connection, and it keeps your progress across more than 100 problems in SQLite.",
  },
  {
    title: 'cine.fm',
    description:
      'A playlist generator that reads a movie and finds the songs that match it, using NLP models and content-based filtering.',
    tags: 'python · transformers · pandas · scikit-learn · numpy · spotify-api · genius-api',
    link: 'https://cinefm.streamlit.app/',
    image: '/images/cinefm.jpg',
    about:
      "You pick a movie and cine.fm builds a playlist to match it. It runs the film's description and a catalogue of song lyrics through the same Hugging Face transformer models, then finds the closest matches using KNN and cosine similarity, pulling the tracks from Spotify and the lyrics from Genius.",
  },
  {
    title: 'EcoTrackr',
    github: 'https://github.com/meenag0/EcoTrackr-Backend',
    description:
      'A cross-platform mobile app for tracking personal carbon footprint and promoting eco-conscious living.',
    tags: 'react-native · typescript · fastAPI · REST · python · node.js · expo',
    image: '/placeholders/project-ecotrackr.svg',
    about:
      "A cross-platform mobile app for tracking your personal carbon footprint, built with React Native and backed by a FastAPI service. Most of the work went into finding emissions factors that were reliable enough to actually show someone.",
  },
  {
    title: '2Read',
    github: 'https://github.com/meenag0/rust-web-scraper',
    description:
      'A Rust-based web scraping application that generates a reading list pulling from my favourite publications.',
    tags: 'rust · javascript · web-scraping · heroku · actix · reqwest',
    image: '/images/toread.png',
    about:
      "A web scraper written in Rust that checks a handful of publications I follow and assembles a reading list for the week. It runs on Heroku using Actix and reqwest, and I built it mainly as a way to learn the language properly.",
  },
];

interface Experience {
  title: string;
  company: string;
  period: string;
  bullets: string[];
  technologies: string;
  logo?: string;
  caseStudy?: string[];
  highlights?: string[];
}

const EXPERIENCE: Experience[] = [
  {
    title: 'Software Development Engineer Intern',
    company: 'Amazon',
    period: 'May 2026 - Aug 2026',
    bullets: [
      'Owned an end-to-end automation pipeline (Python, TypeScript/Node, Docker) in production that cut a manual ML model-certification workflow from 2 to 3 months down to under a week',
      'Engineered a statistical evaluation engine (Python, SageMaker Pipelines) validating models for RCT fidelity across 40+ metrics, dispatching concurrent experiments to Numba-JIT kernels',
      'Delivered a 15-endpoint production REST API (TypeScript/Node) and a React dashboard letting scientists run and review analyses, with optimistic concurrency control on writes',
    ],
    technologies: 'Python · TypeScript · Node.js · React · AWS Lambda · DynamoDB · SageMaker Pipelines · Docker · CI/CD · REST',
    logo: '/images/amazon.svg',
    highlights: [
      'Made ML model certification 90% faster, 3 months to under a week',
      'Built it end to end: data pipeline, evaluation engine, 15-endpoint REST API, React dashboard, CI/CD',
      'Built the evaluation system with 40+ metrics for ML models guiding millions in marketing spend',
    ],
    caseStudy: [
      'Certifying an ML model took two to three months, and most of that was people running the same checks by hand and waiting on each other. I owned the pipeline that replaced it, written in Python and TypeScript and shipped to production in Docker, and it brought the whole thing down to under a week.',
      'The part that makes it trustworthy is the evaluation engine. It validates models for RCT fidelity across 40+ metrics through SageMaker Pipelines, dispatching experiments concurrently to Numba-JIT kernels so the statistics stay fast enough to run on every model rather than a sampled few. Scientists reach it through a 15-endpoint REST API and a React dashboard where they can run analyses and read the results themselves. Writes use optimistic concurrency control, so two people reviewing the same model at once cannot quietly overwrite each other.',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'Royal Bank of Canada (RBC)',
    period: 'Jan 2026 - Apr 2026',
    bullets: [
      'Built a production MCP server (FastMCP, Python) exposing 10+ tools across 3 enterprise APIs for client, account and investment data, letting LLM agents surface real-time financial data',
      'Engineered a Pydantic-based parser architecture with async client abstractions across 5 enterprise services',
      'Enabled secure adoption across 12+ teams by building role-based access control per tool',
    ],
    technologies: 'Python · FastMCP · Pydantic · asyncio · REST · LLM agents · RBAC',
    logo: '/images/rbc.png',
    highlights: [
      'Shipped a production MCP server giving LLM agents live financial data',
      'Exposed 15+ tools across 3 enterprise APIs',
      'Cleared 12+ teams to adopt it with per-tool access control',
      "Selected for RBC's senior leadership showcase for top talent",
    ],
    caseStudy: [
      'An LLM is only useful inside a bank if it can reach real data, and that data sits behind enterprise APIs that were never designed for an agent to call. I built a production MCP server in Python with FastMCP exposing 10+ tools across three of them, covering client, account and investment data, so an agent can ask for real financial information instead of guessing at it.',
      'Underneath sits a Pydantic-based parser architecture with async client abstractions across 5 enterprise services, so every response comes back validated and typed rather than whatever shape the upstream happened to send. The piece that made it adoptable was access control. Permissions are enforced per tool rather than per server, so a team only ever sees the tools it is cleared for, and that is what let 12+ teams pick it up.',
    ],
  },
  {
    title: 'Site Reliability Engineer',
    company: 'Northbridge Financial Corporation',
    period: 'May 2025 - Aug 2025',
    bullets: [
      'Developed a cloud-native resource analyzer in Go (client-go, Docker), exposing gRPC APIs and a React/TypeScript dashboard for real-time monitoring of 20+ workloads',
      'Provisioned 10+ Kubernetes clusters on AKS with Terraform, integrating ConfigMaps, RBAC, load balancers and CI/CD pipelines',
      'Deployed 15+ containerized microservices using Helm charts and Ansible, showing scalable infra management',
    ],
    technologies: 'Go · Docker · Terraform · Helm · React · Typescript · Ansible · Kubernetes (AKS) · Argo-CD · CI/CD pipelines · ConfigMaps',
    logo: '/images/nbfc.png',
    highlights: [
      'Built a Go service and dashboard for 20+ Kubernetes workloads',
      'Provisioned 10+ AKS clusters with Terraform and CI/CD',
      'Moved 15+ microservices onto Helm and Ansible',
    ],
    caseStudy: [
      'Northbridge needed real visibility into their Kubernetes workloads. Engineers were largely guessing at resource usage across the cluster. I built a cloud-native analyzer in Go using client-go to talk directly to the Kubernetes API, exposed it through REST and gRPC, and paired it with a React/TypeScript dashboard so the team could watch 20+ workloads in real time instead of guessing.',
      "Then I turned to how new services got onto AKS in the first place, writing Helm charts and Terraform modules that folded in ConfigMaps, RBAC, and load balancing, and wiring it into CI/CD so deploying a service went from a manual process to something that just ran. By the end of the internship that work had provisioned 10+ Kubernetes clusters, with 15+ containerized microservices running through Helm and Ansible instead of being managed by hand.",
    ],
  },
  {
    title: 'Software Developer',
    company: 'Royal Bank of Canada (RBC)',
    period: 'Sept 2024 - Dec 2024',
    bullets: [
      'Chosen to present at SLT Showcase to senior leaders for outstanding performance',
      'Engineered resolution of 90+ critical incidents and requests across AWS (EC2, Cloudformation, Lambda, S3, VPC) and Azure (AKS, Databricks, ACR, App Services), tackling infrastructure provisioning, enhancing serverless performance, etc.',
      'Optimized and managed critical cloud infrastructure supporting 20,000+ users across AWS/Azure, leveraging ACR/ECR, Kubernetes(AKS), Azure AD, AKV, Azure MI & AWS IAM.',
      'Onboarded enterprise applications across AWS and Azure by implementing Terraform, configuring network policies, and enforcing security compliance.',
    ],
    technologies: 'AWS · EC2 · CloudFormation · S3 · VPC · Azure · Kubernetes (AKS/EKS) · Databricks · Azure Container Registry (ACR) · Terraform · Azure AD · Azure Key Vault · Azure Managed Identity · AWS IAM · ECR',
    logo: '/images/rbc.png',
    highlights: [
      'Resolved 90+ critical incidents across AWS and Azure',
      'Kept cloud infrastructure for 20,000+ users running',
      "Selected for RBC's senior leadership showcase for top talent",
    ],
    caseStudy: [
      'At RBC I sat at the intersection of two cloud ecosystems, AWS and Azure, supporting infrastructure that 20,000+ users relied on daily. The work split two ways: reactive incident response, resolving 90+ critical issues and requests across services like EC2, Lambda, CloudFormation, AKS, and Databricks, often under pressure to restore serverless performance or fix a provisioning problem before it grew.',
      'The other half was prevention: onboarding new enterprise applications onto the platform with Terraform, writing network policies, and enforcing security compliance from day one instead of retrofitting it later. That work was well-received enough that I was chosen to present it at RBC’s SLT Showcase, in front of senior leadership.',
    ],
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
    highlights: [
      'Built the events hub for 500+ student members',
      'Added real-time attendee tracking',
      'Improved discoverability for 150+ monthly attendees',
    ],
    caseStudy: [
      "GDG Waterloo's events were scattered across different channels, making it hard for 500+ student members to find what was actually happening. I built a responsive events page in React, TypeScript, and TanStack Router as a single source of truth, then layered in a dynamic event card system with two viewing modes and real-time attendee tracking so organizers could see who was showing up as it happened.",
      'The last piece was discoverability: a filterable interface for browsing upcoming tech events and workshops, which made it noticeably easier for the 150+ students attending monthly to find the right event.',
    ],
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
    highlights: [
      'Designed an AI pipeline on Azure ML for financial recommendations',
      'Improved stock and ETF prediction with regression models',
      'Added content-based filtering for personalized results',
    ],
    caseStudy: [
      'This role was about turning raw financial data into something a person could actually act on. I designed an AI pipeline on Azure ML and Azure DB that generated financial recommendations, then refined the underlying stock and ETF performance predictions using regression models, layering in content-based filtering so the recommendations felt personalized rather than generic.',
      'Most of the technical work happened alongside a cross-functional team, which meant as much of the job was communicating trade-offs clearly as it was building the models themselves.',
    ],
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
    highlights: [
      'Led the site end to end for 3+ years',
      'Built scheduling tools the editorial team ran without code',
      'Owned planning, integration and fixes as team lead',
    ],
    caseStudy: [
      'I led development of The Fraser Post’s website end to end in React, HTML, CSS, and JavaScript, built and shipped following a proper SDLC rather than ad hoc changes. Content scheduling was its own problem, so I built tracking features around Microsoft Excel so the editorial side could plan and manage what went live without needing to touch code.',
      'Over three years I also ended up leading the team itself, planning tasks, integrating content, and being the person who resolved issues when something broke.',
    ],
  },
];

const INTERESTS = [
  'Infrastructure',
  'Agentic Workflows',
  'End-to-End Development',
  'Post-Quantum Cryptography',
  'MLOps',
  'Compilers',
  'Literature',
  'Sustainability',
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

/* Figures get set in the accent colour. Two rules, because the extremes are both bad:
   requiring a trailing "+" left rows whose impact is a percentage almost entirely grey,
   and matching every numeral lit up "1 week" and "2 reviewers" until the row was noise.
   So: anything carrying a scale marker (+, %, x, K/M/B), or any number of two digits or
   more. Single digits stay plain. Only experience highlights run through it. */
const STAT_PATTERN = /\d[\d,]*(?:\.\d+)?(?:[KMB])?(?:\+|%|x)|\d{2,}[\d,]*/g;

function withStatEmphasis(text: string) {
  const parts = text.split(STAT_PATTERN);
  const matches = text.match(STAT_PATTERN) ?? [];
  const nodes: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    if (part) nodes.push(part);
    if (matches[i]) {
      nodes.push(
        <span key={i} className="font-[family-name:var(--font-display)] font-bold" style={{ color: 'var(--accent)' }}>
          {matches[i]}
        </span>
      );
    }
  });
  return nodes;
}

interface CaseStudyLinkItem {
  label: string;
  href: string;
  icon: 'external' | 'github';
}

/* A labelled block inside the project overlay. The rule plus mono label is the same
   device the ruled rows use elsewhere on the page, so the overlay does not introduce
   a second visual language for headings. */
function OverlaySection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 pt-6" style={{ borderTop: '1px solid var(--line)' }}>
      <h3
        className="font-[family-name:var(--font-mono)] text-[0.84rem] uppercase tracking-[0.14em] mb-5"
        style={{ color: 'var(--accent)' }}
      >
        {label}
      </h3>
      {children}
    </section>
  );
}

function CaseStudyOverlay({
  eyebrow,
  title,
  meta,
  image,
  video,
  poster,
  specs,
  about,
  tags,
  links,
  onClose,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
  image?: string;
  video?: string;
  poster?: string;
  specs?: string[];
  about?: string;
  tags?: string;
  links?: CaseStudyLinkItem[];
  onClose: () => void;
}) {
  /* Every close routes through history.back(), which fires popstate, which calls onClose.
     One close path, and the cleanup never touches history.

     That matters because React StrictMode runs effects mount -> cleanup -> mount in
     development. An earlier version called history.back() from the cleanup; the popstate
     it fired landed after the second mount had attached its listener, so the overlay shut
     itself the instant it opened. */
  const requestClose = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
    };
    const onPop = () => onClose();

    /* The overlay is component state, not a route, so without an entry to pop the browser
       back button (and the edge-swipe gesture on phones) would leave the site entirely. */
    window.history.pushState({ overlay: true }, '');
    window.addEventListener('popstate', onPop);
    window.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('popstate', onPop);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, requestClose]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: 'var(--bg)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      {/* Labelled, and on the left where a back control is expected. An unlabelled X
          floating in the far corner was easy to miss once the content had scrolled. */}
      <button
        onClick={requestClose}
        aria-label="Close and go back"
        className="fixed top-5 left-5 sm:top-8 sm:left-10 z-10 flex items-center gap-2 pl-3 pr-4 py-2 rounded-full font-[family-name:var(--font-mono)] text-[0.82rem] transition-opacity hover:opacity-80"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--card-line)',
          color: 'var(--ink)',
        }}
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      <div className="max-w-3xl mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <span
          className="font-[family-name:var(--font-mono)] text-[0.9rem] uppercase tracking-[0.12em]"
          style={{ color: 'var(--accent)' }}
        >
          {eyebrow}
        </span>
        <h2 className="mt-3 font-[family-name:var(--font-display)] font-bold text-4xl sm:text-6xl tracking-tight">
          {title}
        </h2>
        {meta && (
          <p className="mt-3 text-lg" style={{ color: 'var(--muted)' }}>
            {meta}
          </p>
        )}

        {/* Demo, then Specs, then the reasoning. Seeing the thing run first means the
            numbers underneath it have something to attach to. */}
        <OverlaySection label="Demo">
          {video ? (
            /* No fixed aspect box: the still is cropped to 16/10, but cropping a screen
               recording cuts off the thing it is meant to show, so the clip keeps its
               own dimensions. Muted and looping because it has no audio track. */
            <video
              src={video}
              poster={poster}
              controls
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="mx-auto max-w-full max-h-[75vh] rounded-md"
            />
          ) : (
            image && (
              <div className="relative aspect-[16/10] rounded-md overflow-hidden">
                <Image src={image} alt={title} fill unoptimized className="object-cover" />
              </div>
            )
          )}
        </OverlaySection>

        <OverlaySection label="Specs">
          {specs && specs.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {specs.map((spec, i) => (
                <li key={i} className="flex items-baseline gap-3">
                  <span
                    className="font-[family-name:var(--font-mono)] text-[0.85rem] shrink-0"
                    style={{ color: 'var(--muted-2)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {withStatEmphasis(spec)}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          {tags && (
            <p
              className="mt-5 font-[family-name:var(--font-mono)] text-[0.96rem] leading-relaxed"
              style={{ color: 'var(--muted-2)' }}
            >
              {tags}
            </p>
          )}
        </OverlaySection>

        {about && (
          <OverlaySection label="About">
            <p className="max-w-2xl text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--muted)' }}>
              {about}
            </p>
          </OverlaySection>
        )}

        {links && links.length > 0 && (
          <div className="mt-6 flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[0.99rem] pb-1"
                style={{ borderBottom: '2px solid var(--ink)', color: 'var(--ink)' }}
              >
                {l.icon === 'github' ? <Github className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceRow({ exp }: { exp: Experience }) {
  const [expanded, setExpanded] = useState(false);
  const isCurrent = exp.period.toLowerCase().includes('present');
  const highlights = exp.highlights ?? exp.bullets;

  return (
    <div
      className="py-8 cursor-pointer"
      style={{ borderTop: '1px solid var(--line)' }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-3">
          {/* The mark on its own. It used to sit at 22px inside a 36px grey disc, so the
              logo was both small and fighting a chip that read as heavier than it did.
              No background now, and the mark gets the full 40px. */}
          {exp.logo ? (
            <div className="w-10 h-10 shrink-0 flex items-center justify-center">
              <Image
                src={exp.logo}
                alt={exp.company}
                width={40}
                height={40}
                className="max-w-full max-h-full w-auto h-auto object-contain"
              />
            </div>
          ) : (
            <div
              className="w-10 h-10 shrink-0 flex items-center justify-center font-[family-name:var(--font-mono)] text-lg tracking-tight"
              style={{ color: 'var(--accent)' }}
            >
              {initials(exp.company)}
            </div>
          )}
          <div>
            <h3 className="font-[family-name:var(--font-display)] font-bold text-xl leading-tight">{exp.title}</h3>
            <p className="text-[1.05rem]" style={{ color: 'var(--muted)' }}>
              {exp.company}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <p className="font-[family-name:var(--font-mono)] text-[0.96rem]" style={{ color: 'var(--muted-2)' }}>
                {exp.period}
              </p>
              {isCurrent && (
                <span
                  className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[0.84rem] uppercase tracking-[0.1em]"
                  style={{ color: 'var(--accent)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                  Current
                </span>
              )}
            </div>
          </div>
        </div>

        <Plus
          className="w-3.5 h-3.5 shrink-0 mt-1 transition-transform duration-300"
          style={{ color: 'var(--muted-2)', transform: expanded ? 'rotate(45deg)' : 'rotate(0deg)' }}
        />
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="pt-6 flex flex-col gap-3 max-w-2xl">
            {highlights.map((h, hi) => (
              <div key={hi} className="flex items-baseline gap-3">
                <span className="font-[family-name:var(--font-mono)] text-[0.9rem] shrink-0" style={{ color: 'var(--muted-2)' }}>
                  {String(hi + 1).padStart(2, '0')}
                </span>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {withStatEmphasis(h)}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 font-[family-name:var(--font-mono)] text-[0.96rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
            {exp.technologies}
          </p>
        </div>
      </div>
    </div>
  );
}

/* One rhythm for every project: a ruled row with an index, the detail, and a thumbnail.
   Matches the ruled rows already used by Work Experience and Interests, and scales to
   any number of projects without needing a second tier. Projects that have a written
   case study get an extra link that opens the overlay. */
function ProjectRow({ project: p, index: i }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const hasCaseStudy = Boolean(p.about);

  return (
    <div
      className="group grid gap-5 sm:grid-cols-[auto_1fr_15rem] sm:gap-8 items-start py-9"
      style={{ borderTop: '1px solid var(--line)' }}
    >
      <span
        className="hidden sm:block font-[family-name:var(--font-mono)] text-[0.9rem] pt-1"
        style={{ color: 'var(--muted-2)' }}
      >
        {String(i + 1).padStart(2, '0')}
      </span>

      {/* thumbnail first on mobile, last on desktop */}
      <div className="sm:hidden relative aspect-[16/10] w-full overflow-hidden rounded-md">
        <Image src={p.image} alt={p.title} fill unoptimized className="object-cover" />
      </div>

      <div>
        <h3 className="font-[family-name:var(--font-display)] font-bold text-xl sm:text-2xl">{p.title}</h3>
        <p className="mt-2.5 max-w-[54ch] text-[1.05rem] leading-relaxed" style={{ color: 'var(--muted)' }}>
          {p.description}
        </p>
        <p
          className="mt-3 max-w-[54ch] font-[family-name:var(--font-mono)] text-[0.88rem] leading-relaxed"
          style={{ color: 'var(--muted-2)' }}
        >
          {p.tags}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          {hasCaseStudy && (
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[0.99rem] pb-0.5"
              style={{ color: 'var(--ink)', borderBottom: '1px solid var(--ink)' }}
            >
              View
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[0.99rem] hover:opacity-70 transition-opacity"
              style={{ color: 'var(--ink)' }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live demo
            </a>
          )}
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[0.99rem] hover:opacity-70 transition-opacity"
              style={{ color: 'var(--ink)' }}
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          )}
        </div>
      </div>

      <div className="hidden sm:block relative aspect-[16/10] w-full overflow-hidden rounded-md">
        <Image
          src={p.image}
          alt={p.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {open && (
        <CaseStudyOverlay
          eyebrow="Project"
          title={p.title}
          image={p.image}
          video={p.video}
          poster={p.poster}
          specs={p.specs}
          about={p.about ?? p.description}
          tags={p.tags}
          links={[
            ...(p.link ? [{ label: 'Live Demo', href: p.link, icon: 'external' as const }] : []),
            ...(p.github ? [{ label: 'GitHub', href: p.github, icon: 'github' as const }] : []),
          ]}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

interface Photo {
  src: string;
  caption: string;
}

/* Real photos, resized so the short edge is ~820px — the card crops to 4:5, so the
   short edge is the one that has to be big enough to fill it. */
const PHOTOS: Photo[] = [
  { src: '/images/life/iceland-horse.jpg', caption: 'horseriding in lava fields!' },
  { src: '/images/life/puppy-closeup.jpg', caption: 'my buddy from puppy yoga' },
  { src: '/images/life/above-the-clouds.jpg', caption: 'window seat view :)' },
  { src: '/images/life/seafood-boil.jpg', caption: 'some very yummy seafood boil' },
  { src: '/images/life/glacier-crevasse.jpg', caption: 'glacier hiking in iceland' },
  { src: '/images/life/cat-sprawled.jpg', caption: 'silly lil kitty' },
  { src: '/images/life/medieval-times.jpg', caption: 'medieval times!' },
  { src: '/images/life/forest.jpg', caption: 'hiking deep cove quarry in the rain' },
  { src: '/images/life/glacier-ash.jpg', caption: 'more of iceland!' },
];

/* A 35mm frame rather than a card. Deliberately not the default photo-slider chrome
   (rounded corners, backdrop blur, translucent fill, floating circular buttons) — that
   soft-UI language is exactly what reads as generic now. Instead: zero radius, a hard
   1px rule, sprocket perforations down both edges, and mono annotation like a contact
   sheet. It also matches what the page already speaks: mono labels, numbered rows, grain. */
/* The paper-fibre texture. This lives here rather than in the stylesheet below on
   purpose: styled-jsx runs the CSS through its own parser, and the `//` in the
   xmlns URL inside a data: URI is read as the start of a line comment — which
   silently swallows every rule after it in the block. As a React inline style it
   never reaches that parser. The slashes are encoded as a second line of defence. */
const PAPER_FIBRE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http:%2F%2Fwww.w3.org%2F2000%2Fsvg' width='160' height='160'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'%2F%3E%3CfeColorMatrix type='saturate' values='0'%2F%3E%3C%2Ffilter%3E%3Crect width='160' height='160' filter='url(%23f)'%2F%3E%3C%2Fsvg%3E\")";

/* A polaroid, with the thing a polaroid actually does: each new frame develops in.
   The image starts blown-out and low-contrast and resolves over ~1.5s, which is a real
   behaviour rather than an effect stuck on top. Each print also sits at its own slight
   angle, derived from the index so it is stable across renders rather than jittering. */
function PhotoCard() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (dir: number) => setIndex((i) => (i + dir + PHOTOS.length) % PHOTOS.length);
  const photo = PHOTOS[index];

  /* `index` is in the deps on purpose. Without it the timer keeps running against
     whatever schedule it started on, so clicking an arrow 4s into the 4.2s cycle
     advanced one frame on the click and another 200ms later on the tick — the
     two-at-a-time skip. Depending on the index tears the interval down and starts a
     fresh one on every advance, manual or automatic, so a click always buys a full
     interval before the next auto-advance. */
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % PHOTOS.length), 4200);
    return () => window.clearInterval(id);
  }, [paused, index]);

  /* deterministic per-photo tilt: -2.2deg .. +2.2deg */
  const tilt = (((index * 37) % 45) - 22) / 10;

  return (
    <div
      /* The perspective lives on the parent, so the print is a sheet sitting in space
         rather than a rectangle with a fake gradient on it. Without this the rotateX
         and rotateY below are orthographic and read as a squash, not a tilt. */
      className="relative w-full max-w-[23rem] px-9 lg:ml-auto"
      style={{ perspective: '1400px', perspectiveOrigin: '50% 40%' }}
      /* Pausing lives out here rather than on the print, because the arrows are
         siblings of the print, not children of it — parked on an arrow you were
         hovering nothing that paused anything. onFocus/onBlur bubble in React, so
         this covers tabbing to the arrows too. */
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="polaroid"
        /* everything else about the paper is in the .polaroid rule; only the
           per-photo tilt is dynamic, so it goes through as a variable */
        style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
      >
        <span className="polaroid-fibre" aria-hidden="true" style={{ backgroundImage: PAPER_FIBRE }} />
        {/* 5:6, between the true Polaroid square and full portrait. A square cut 44% off
              the nine-sixteenths shots; this takes ~33% while keeping the card shorter. */}
          <div className="relative aspect-[5/6] overflow-hidden" style={{ backgroundColor: '#c9c6bf' }}>
          {/* keyed on src so the develop animation restarts for each frame */}
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.caption}
            fill
            unoptimized
            draggable={false}
            priority={index === 0}
            className="object-cover develop"
          />
          {/* Instant film character: a soft vignette, a faint warm cast in the
              highlights, and the window recessed below the paper surface. An inset
              shadow on the parent would render beneath the image, hence an overlay. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(115% 115% at 50% 42%, rgba(255,246,222,0.10) 0%, rgba(0,0,0,0) 52%, rgba(20,14,6,0.24) 100%)',
              boxShadow:
                'inset 0 0 0 1px rgba(0,0,0,0.22), inset 0 3px 9px rgba(0,0,0,0.32), inset 0 -1px 4px rgba(0,0,0,0.16)',
            }}
          />
          {/* The specular band, on the window only. The image area of a real print is
              glossy; the paper frame around it is matte, and running the highlight
              across both washed straight over the caption. */}
          <span className="polaroid-gloss" aria-hidden="true" />
        </div>

        <div className="flex items-end justify-between gap-2 pt-2.5 pb-0.5 min-h-[2.7rem]">
          <p className="polaroid-caption">{photo.caption}</p>
        </div>
      </div>

      {/* Bare chevrons flanking the print. The boxed pair with a counter between them
          was three objects competing under one photo; this leaves the frame as the only
          thing on screen. */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous photo"
        className="absolute left-0 top-[42%] -translate-y-1/2 p-1 transition-opacity hover:opacity-100"
        style={{ color: 'var(--muted-2)', opacity: 0.65 }}
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next photo"
        className="absolute right-0 top-[42%] -translate-y-1/2 p-1 transition-opacity hover:opacity-100"
        style={{ color: 'var(--muted-2)', opacity: 0.65 }}
      >
        <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
      </button>
    </div>
  );
}

const Emph = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium" style={{ color: 'var(--ink)' }}>
    {children}
  </span>
);

/* The page background: a flat colour, a soft light that follows the pointer, and
   static. No gradient — a vertical gradient shifts luminance down the page and makes
   text contrast a moving target rather than a fixed ratio. */
function PageBackground({ glowRef }: { glowRef: React.MutableRefObject<HTMLDivElement | null> }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg)' }} />

      {/* Illumination. Unlike the grid, this has no hard edges — it is a smooth falloff,
          and its peak alpha was chosen so that even at the centre of the light every
          text token still clears WCAG AA against the lifted background. */}
      <div ref={glowRef} className="cursor-glow" />

      <div className="static-layer">
        <svg className="w-full h-full">
          <filter id="page-static">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0.45" />
            <feComponentTransfer>
              <feFuncR type="linear" slope="2.1" intercept="-0.55" />
              <feFuncG type="linear" slope="2.1" intercept="-0.55" />
              <feFuncB type="linear" slope="2.1" intercept="-0.55" />
            </feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#page-static)" />
        </svg>
      </div>
    </div>
  );
}

/* Film grain over the whole page — the texture from the reference, done in SVG
   so it costs nothing to ship and never loads in. */
function GrainOverlay() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-30"
      aria-hidden="true"
      style={{ opacity: 0.14, mixBlendMode: 'overlay' }}
    >
      <filter id="grain-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  );
}

export default function RedesignPage() {
  const [theme, setTheme] = useState<Theme>('light');
  const [scrolled, setScrolled] = useState(false);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem('redesign-theme') as Theme | null;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);



  /* Pointer position goes straight into CSS custom properties on a rAF. Through React
     state this would re-render the page on every mouse move; the radial-gradient reads
     the variables itself, so only one layer repaints. */
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      frame = 0;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = '1';
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      el.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Tracks only whether the header has left the hero, on a rAF so the listener isn't
     doing work on every scroll event. setPastHero is a no-op re-render when the boolean
     hasn't flipped, so this stays cheap. */
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      /* Glass kicks in the moment the page moves. Gating this on the hero's height
         meant the whole first screen scrolled under a bare header. */
      setScrolled(window.scrollY > 8);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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
        /* The print itself. A polaroid is a stiff plastic-backed sheet about a
           millimetre thick, so it gets three things a flat div does not: a visible
           cut edge, a lit top and shaded bottom face, and a specular band that moves
           when the sheet turns. It rests turned slightly away from the viewer and
           comes square-on and forward under the pointer. */
        .polaroid {
          position: relative;
          padding: 0.7rem 0.7rem 0.55rem;
          border-radius: 4px;
          background-color: var(--paper);
          /* not flat stock: a broad off-axis sheen across the sheet, warm where the
             light falls and faintly cool in the shadowed corner */
          background-image: linear-gradient(
            148deg,
            rgba(255, 255, 255, 0.92) 0%,
            rgba(255, 253, 246, 0.34) 18%,
            rgba(0, 0, 0, 0.012) 46%,
            rgba(255, 255, 255, 0.42) 68%,
            rgba(24, 20, 12, 0.05) 100%
          );
          transform: rotate(var(--tilt, 0deg)) rotateX(4deg) rotateY(-5deg);
          box-shadow:
            /* the two faces of the sheet: top and left catch light, bottom and
               right fall away */
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            inset 1px 0 0 rgba(255, 255, 255, 0.6),
            inset -1px 0 0 rgba(38, 30, 18, 0.055),
            inset 0 -1px 0 rgba(38, 30, 18, 0.1),
            /* the cut edge, then the paper thickness stacked under it — negative
               spread keeps each slab tucked inside the one above so it reads as a
               rounded edge rather than a stripe */
            0 0 0 1px rgba(122, 110, 88, 0.16),
            0 2px 0 -0.5px rgba(206, 199, 183, 0.92),
            0 3px 0 -1px rgba(168, 159, 141, 0.6),
            0 4px 0 -2px rgba(132, 123, 105, 0.35),
            /* contact shadow first, then the room */
            0 5px 8px -4px rgba(28, 20, 8, 0.3),
            0 16px 26px -12px rgba(28, 20, 8, 0.34),
            0 40px 64px -26px rgba(18, 12, 4, 0.42);
          transition:
            transform 700ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .polaroid:hover {
          transform: rotate(0deg) rotateX(0deg) rotateY(0deg) scale(1.02);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.98),
            inset 1px 0 0 rgba(255, 255, 255, 0.65),
            inset -1px 0 0 rgba(38, 30, 18, 0.05),
            inset 0 -1px 0 rgba(38, 30, 18, 0.09),
            0 0 0 1px rgba(122, 110, 88, 0.14),
            0 2px 0 -0.5px rgba(206, 199, 183, 0.92),
            0 3px 0 -1px rgba(168, 159, 141, 0.6),
            0 4px 0 -2px rgba(132, 123, 105, 0.35),
            /* lifted off the surface: the contact shadow softens and everything
               below it spreads */
            0 10px 16px -8px rgba(28, 20, 8, 0.26),
            0 28px 44px -16px rgba(28, 20, 8, 0.3),
            0 64px 90px -30px rgba(18, 12, 4, 0.44);
        }

        /* Paper fibre. Under the photo and the caption, so it sits in the stock
           rather than on top of the image. */
        .polaroid-fibre {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0.055;
          mix-blend-mode: multiply;
          /* background-image comes in inline, as PAPER_FIBRE — see the note there */
        }

        /* The highlight travelling across the sheet as it turns. */
        .polaroid-gloss {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(
            112deg,
            rgba(255, 255, 255, 0) 26%,
            rgba(255, 255, 255, 0.5) 42%,
            rgba(255, 255, 255, 0.12) 52%,
            rgba(255, 255, 255, 0) 66%
          );
          opacity: 0.3;
          transform: translateX(-14%);
          transition:
            transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 900ms ease;
        }
        .polaroid:hover .polaroid-gloss {
          transform: translateX(16%);
          opacity: 0.45;
        }

        /* Instrument Serif runs large on the body and has a tall x-height, so it needs
           less size than the sans it sits under, not more. The ink stays a warm-leaning
           near-black rather than the page's cool grey — it is printed on paper here,
           not on the background. */
        .polaroid-caption {
          position: relative;
          z-index: 1;
          font-family: var(--font-caption), Georgia, 'Times New Roman', serif;
          font-style: italic;
          font-size: 1.02rem;
          line-height: 1.35;
          letter-spacing: 0.006em;
          color: #2b2620;
          opacity: 0.86;
        }
        /* what a polaroid does: blown out and flat, then it resolves */
        .develop {
          animation: develop 950ms cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        @keyframes develop {
          0% {
            opacity: 0.25;
            filter: brightness(1.9) contrast(0.25) saturate(0.2) sepia(0.35);
          }
          45% {
            opacity: 0.85;
            filter: brightness(1.25) contrast(0.7) saturate(0.7) sepia(0.15);
          }
          100% {
            opacity: 1;
            filter: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .develop {
            animation: none;
          }
          .polaroid,
          .polaroid:hover {
            transform: rotate(var(--tilt, 0deg));
          }
          .polaroid-gloss,
          .polaroid:hover .polaroid-gloss {
            transform: none;
            transition: none;
          }
        }

        .cursor-glow {
          --mx: 50%;
          --my: 40%;
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 700ms ease;
          /* Stops live in --glow-stops so the curve can be shaped per theme. Note it
             never fades to the transparent keyword: that is rgba(0,0,0,0), so a ramp
             toward it passes through a dirty grey and leaves a visible rim. */
          background: radial-gradient(220px circle at var(--mx) var(--my), var(--glow-stops));
        }

        .static-layer {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          /* overlay is near-invisible on a very dark ground: it behaves like multiply
             where the backdrop is dark, so the brightest speckle only reached #162a48
             on this navy. screen adds light instead (and multiply subtracts it on the
             light theme), which is what makes the grain actually show. */
          opacity: var(--static-opacity);
          mix-blend-mode: var(--static-blend);
          will-change: transform;
          animation: static-jitter 0.5s steps(1) infinite;
        }
        @keyframes static-jitter {
          0% {
            transform: translate(0, 0);
          }
          12.5% {
            transform: translate(-3%, 2%);
          }
          25% {
            transform: translate(2%, -4%);
          }
          37.5% {
            transform: translate(-4%, -2%);
          }
          50% {
            transform: translate(3%, 3%);
          }
          62.5% {
            transform: translate(-2%, 4%);
          }
          75% {
            transform: translate(4%, -3%);
          }
          87.5% {
            transform: translate(-3%, -4%);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        /* A gleam sweeping through the company names. The gradient is painted into
           the glyphs with background-clip:text and only its position animates, so this
           stays on the compositor instead of repainting text every frame. The highlight
           is --shimmer-hi, an aqua pulled from the water palette. It has to be saturated
           rather than just brighter than --ink: in dark mode --ink is already near-white,
           so a white highlight had nothing to travel through and read as no effect. */
        /* The company names sit at --muted and are lit by a band crossing them, with a
           glow blooming behind the letters in sync. Starting from --muted rather than
           --ink matters: ink is #eaf1f7, so a bright peak against it was only 0.13
           luminance apart and read as nothing. From muted the swing is ~5x that.

           background-clip:text forces color:transparent, which kills text-shadow, so the
           glow has to be a pseudo-element behind the word rather than a shadow on it. */
        .shimmer {
          position: relative;
          font-weight: 600;
          background-image: linear-gradient(
            20deg,
            var(--muted) 0%,
            var(--muted) 32%,
            var(--shimmer-hi) 50%,
            var(--muted) 68%,
            var(--muted) 100%
          );
          background-size: 260% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer-sweep 4s ease-in-out infinite;
        }
        .shimmer::after {
          content: '';
          position: absolute;
          inset: -0.35em -0.5em;
          border-radius: 0.4em;
          pointer-events: none;
          background: radial-gradient(
            closest-side,
            color-mix(in srgb, var(--shimmer-hi) 42%, transparent),
            transparent 75%
          );
          opacity: 0;
          animation: shimmer-glow 4s ease-in-out infinite;
        }
        .shimmer-delayed,
        .shimmer-delayed::after {
          animation-delay: 1.6s;
        }
        /* crosses over half the cycle, so it reads as near-continuous rather than a rare flash */
        @keyframes shimmer-sweep {
          0% {
            background-position: 150% 0;
          }
          52% {
            background-position: -50% 0;
          }
          100% {
            background-position: -50% 0;
          }
        }
        @keyframes shimmer-glow {
          0%,
          6% {
            opacity: 0;
          }
          26% {
            opacity: 1;
          }
          52%,
          100% {
            opacity: 0;
          }
        }

        .scroll-cue {
          display: inline-block;
          animation: scroll-cue-bob 2s ease-in-out infinite;
        }
        @keyframes scroll-cue-bob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(4px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-cue,
          .cursor-glow,
          .static-layer {
            animation: none;
          }
          .shimmer {
            animation: none;
            background-image: none;
            color: var(--ink);
          }
          .shimmer::after {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>

      <main
        style={{ ...tokens, backgroundColor: 'var(--bg)', color: 'var(--ink)' }}
        className={`${display.variable} ${body.variable} ${mono.variable} ${caption.variable} min-h-screen transition-colors duration-300`}
      >
        <PageBackground glowRef={glowRef} />
        <GrainOverlay />

        {/* Header — transparent over the hero, glass once past it. Colors come from the
            theme tokens throughout now that there's no video to sit on. */}
        <header
          className="sticky top-0 z-20 relative flex flex-wrap items-center justify-between gap-y-3 px-6 sm:px-12 py-6 transition-colors duration-500"
          style={{
            /* Glass rather than a solid fill — the gradient stays visible through the
               bar, and the blur is what keeps the nav legible over scrolling content. */
            backgroundColor: scrolled ? 'var(--header-bg)' : 'transparent',
            backdropFilter: scrolled ? 'blur(16px) saturate(1.15)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.15)' : 'none',
          }}
        >
          <a
            href="#top"
            className="font-[family-name:var(--font-display)] font-bold text-base sm:text-lg whitespace-nowrap transition-colors duration-500"
            style={{ color: 'var(--ink)' }}
          >
            <span className="sm:hidden">meena g.</span>
            <span className="hidden sm:inline">meena gopalakrishnan</span>
          </a>
          <div className="flex items-center gap-5 sm:gap-10">
            <nav className="flex gap-5 sm:gap-10">
              {NAV.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  className="font-[family-name:var(--font-mono)] text-[0.65rem] sm:text-xs uppercase tracking-[0.1em] hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--muted-2)' }}
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <ThemeToggle
              theme={theme}
              onToggle={toggleTheme}
              color="var(--muted-2)"
            />
          </div>

          {/* Inset rule, matching the reference — it stops at the content padding
              rather than running full-bleed the way a plain border-bottom would. */}
          <div
            className="absolute bottom-0 left-6 right-6 sm:left-12 sm:right-12 h-px transition-colors duration-500"
            style={{ backgroundColor: 'var(--line)' }}
          />
        </header>

        {/* Main */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12">
          {/* Hero — sits directly on the gradient, so its type uses the theme tokens. */}
          <section
            id="top"
            className="scroll-mt-24 relative min-h-[calc(100svh_-_5rem)] grid lg:grid-cols-[1.15fr_0.85fr] gap-10 sm:gap-12 lg:gap-16 items-center content-center pt-10 pb-16 lg:py-0"
          >
            <div className="text-left">
                {/* One family throughout, weight carrying the contrast: the greeting sits
                    at 300 against the name at 700. */}
                <p
                  className="font-[family-name:var(--font-display)] font-light text-[clamp(1.05rem,1.8vw,1.45rem)]"
                  style={{ color: 'var(--muted)' }}
                >
                  Hello! I&rsquo;m
                </p>
                <h1
                  className="mt-1 font-[family-name:var(--font-display)] font-bold tracking-tight leading-[0.92] text-[clamp(3.5rem,10vw,7.5rem)]"
                  style={{ color: 'var(--ink)' }}
                >
                  Meena.
                </h1>

              <p
                className="mt-7 max-w-[46ch] font-[family-name:var(--font-body)] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.75]"
                style={{ color: 'var(--muted)' }}
              >
                I&rsquo;m a 3rd year <Emph>Computer Engineering</Emph> student @ the{' '}
                <Emph>University of Waterloo</Emph>. Previously, I&rsquo;ve worked at{' '}
                <span className="shimmer">Amazon</span>,{' '}
                <span className="shimmer shimmer-delayed">RBC</span> and more, across full-stack,
                infrastructure and ML. I enjoy working through ambiguities and building things
                from scratch.
              </p>
            </div>

            <PhotoCard />

            <a
              href="#work"
              aria-hidden={scrolled}
              className="hidden lg:flex absolute bottom-10 left-0 flex-col items-start gap-2 font-[family-name:var(--font-mono)] text-[0.78rem] uppercase tracking-[0.22em] transition-opacity duration-500"
              style={{
                color: 'var(--muted-2)',
                opacity: scrolled ? 0 : 1,
                pointerEvents: scrolled ? 'none' : 'auto',
              }}
            >
              Scroll
              <span className="scroll-cue">↓</span>
            </a>
          </section>

            {/* Work Experience */}
            <section id="work" className="max-w-5xl mx-auto scroll-mt-24 pt-20 pb-16 sm:pt-24 sm:pb-20">
              <div className="mb-10">
                <h2
                  className="font-[family-name:var(--font-display)] font-bold tracking-tight text-3xl sm:text-4xl"
                  style={{ color: 'var(--ink)' }}
                >
                  Work Experience
                </h2>
              </div>

              <div>
                {EXPERIENCE.map((exp) => (
                  <ExperienceRow key={exp.company} exp={exp} />
                ))}
              </div>
            </section>

            {/* Featured Projects */}
            <section id="projects" className="max-w-5xl mx-auto scroll-mt-24 pt-20 pb-16 sm:pt-24 sm:pb-20">
              <div className="flex items-baseline justify-between mb-10">
                <h2
                  className="font-[family-name:var(--font-display)] font-bold tracking-tight text-3xl sm:text-4xl"
                  style={{ color: 'var(--ink)' }}
                >
                  Selected Projects
                </h2>
                <span
                  className="font-[family-name:var(--font-mono)] text-[0.9rem] uppercase tracking-[0.12em] hidden sm:block"
                  style={{ color: 'var(--muted-2)' }}
                >
                  {String(PROJECTS.length).padStart(2, '0')} projects
                </span>
              </div>

              <div>
                {PROJECTS.map((p, i) => (
                  <ProjectRow key={p.title} project={p} index={i} />
                ))}
              </div>
            </section>

            {/* Interested In */}
            <section className="max-w-5xl mx-auto pt-20 pb-16 sm:pt-24 sm:pb-20">
              <div className="mb-10">
                <h2
                  className="font-[family-name:var(--font-display)] font-bold tracking-tight text-3xl sm:text-4xl"
                  style={{ color: 'var(--ink)' }}
                >
                  I&rsquo;m Interested In
                </h2>
              </div>
              {/* A two-column ruled list rather than a dot-separated run: with entries of
                  very different lengths, inline separators leave ragged gaps and long
                  items wrap mid-phrase. Rows keep each interest intact and scannable. */}
              <ul className="grid sm:grid-cols-2 gap-x-14 max-w-4xl">
                {INTERESTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3.5 py-4"
                    style={{ borderTop: '1px solid var(--line)' }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                    <span className="font-[family-name:var(--font-display)] font-medium text-xl sm:text-2xl">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>


            {/* Connect */}
            <section id="connect" className="max-w-5xl mx-auto scroll-mt-24 pt-20 pb-20 sm:pt-24 sm:pb-24">
              <h2 className="font-[family-name:var(--font-display)] font-bold tracking-tight text-3xl sm:text-4xl">
                Connect with me!
              </h2>
              <p className="mt-4 max-w-[46ch] text-lg leading-relaxed" style={{ color: 'var(--muted)' }}>
                Reach out to talk tech, opportunities, or anything at all! :)
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="mailto:meenakshi.gopalakrishnan15@gmail.com"
                  className="font-[family-name:var(--font-mono)] text-[0.99rem] pb-1 w-fit"
                  style={{ borderBottom: '2px solid var(--ink)', color: 'var(--ink)' }}
                >
                  meenakshi.gopalakrishnan15@gmail.com
                </a>
                <a
                  href="https://github.com/meenag0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-mono)] text-[0.99rem] w-fit"
                  style={{ color: 'var(--muted-2)' }}
                >
                  github.com/meenag0
                </a>
                <a
                  href="https://linkedin.com/in/meenagopalakrishnan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-mono)] text-[0.99rem] w-fit"
                  style={{ color: 'var(--muted-2)' }}
                >
                  linkedin.com/in/meenagopalakrishnan
                </a>
              </div>
            </section>

          <footer className="max-w-5xl mx-auto pt-8 pb-10" style={{ borderTop: '1px solid var(--line)' }}>
            <p className="font-[family-name:var(--font-mono)] text-[0.96rem]" style={{ color: 'var(--muted-2)' }}>
              © {new Date().getFullYear()} Meena Gopalakrishnan
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
