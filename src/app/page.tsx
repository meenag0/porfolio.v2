'use client';

import ProjectsGrid from './projects';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import InterestsSection from './interests';
import TechStackSection from './techstack';
import ConnectSection from './connect';
import ExperienceSection from './experience';
import ProjectsSection from './projects';
import HeroSection from './hero';

const SplineViewer = dynamic(() => import('./SplineViewer'), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px]" /> 
});


interface Interest {
  name: string;
  delay?: number;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  link?: string;
  logo: string;  
}


interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  thumbnail?: string;
  modalContent: {
    fullDescription: string;
    timeline: string;
    techStack: Array<{
      category: string;
      items: string[];
    }>;
    keyFeatures: string[];
    links: {
      demo?: string;
      github?: string;
      documentation?: string;
    };
  };
}

// Example project data with the correct type:
const projects: Project[] = [
  {
    title: "cine.fm 🎶",
    description: "A web application using machine learning to generate playlists based on movie selections.",
    tags: ["python", "machine-learning", "spotify-api", "nlp", "transformers", "pandas", "numpy"],
    link: "https://cinefm.streamlit.app/",
    image: "/images/cine-fm.png",

    modalContent: {
      fullDescription: "cine.fm is a web application that uses machine learning to generate a playlist based on the user's selection from 50,000+ movies. It uses NLP transformers from Hugging face to analyze movie descriptions gathered from Wikipedia, and song lyrics acquired through the Spotify and Genius APIs. It utilizes content-based filtering to generate the playlist based on a similarity matrix.",
      timeline: "Developed Dec 2023 - Feb 2024",
      techStack: [
        {
          category: "Core Tech",
          items: ["Python", "Pandas", "NumPy", "sklearn", "Transformers"]
        },
        {
          category: "APIs",
          items: ["Spotify API", "Genius API", "Selenium"]
        }
      ],
      keyFeatures: [
        "Movie sentiment analysis",
        "Content-based filtering",
        "Personalized playlists",
        "50,000+ movie database"
      ],
      links: {
        demo: "https://cinefm.streamlit.app/",
        github: "https://github.com/yourusername/cine-fm"
      }
    }
  },
  {
    title: "EcoTrackr 🌱",
    description: "A cross-platform mobile app for tracking personal carbon footprint and promoting eco-conscious living.",
    tags: ["react-native", "typescript", "fastAPI", "REST", "python", "node.js", "expo"],
    link: "https://ecotrackr.app",
    image: "/images/ecotrackr.png",
    modalContent: {
      fullDescription: "EcoTrackr is a cross-platform mobile app that allows users to track their carbon footprint, develop habits to live more eco-consciously, and see information related to the environment, such as air quality, solar distribution, and nearby conservatories/trails. It's built using react-native, utilizing external apis as well as a backend server to implement a RESTful architecture.",
      timeline: "Developed Jan 2024 - Present",
      techStack: [
        {
          category: "Frontend",
          items: ["React Native", "TypeScript", "JavaScript"]
        },
        {
          category: "Backend",
          items: ["FastAPI", "Python", "Node.js", "REST APIs"]
        }
      ],
      keyFeatures: [
        "Carbon footprint tracking",
        "Environmental data visualization",
        "Eco-friendly habit suggestions",
        "Location-based features"
      ],
      links: {
        demo: "https://ecotrackr.app",
        github: "https://github.com/yourusername/ecotrackr"
      }
    }
  },
  {
    title: "2Read [Rust] 📖",
    description: "A Rust-based web scraping application that generates a reading list pulling from my favourite publications.",
    tags: ["rust", "javascript", "web-scraping", "heroku", "actix", "reqwest"],
    link: "https://2read.rs",
    image: "/images/toread.png",
    modalContent: {
      fullDescription: "2Read is a Rust-based web scraping application that generates a reading list by gathering articles from technical publications like Quanta Magazine, Towards Data Science, Wired, and Scientific American. It utilizes reqwest for HTTP requests, scraper for HTML parsing, and actix-web for building the server. Asynchronous tasks are managed using async-std.",
      timeline: "Developed Mar 2024 - Present",
      techStack: [
        {
          category: "Backend",
          items: ["Rust", "Actix", "Reqwest", "HTML/CSS"]
        },
        {
          category: "Frontend",
          items: ["JavaScript", "Web APIs", "Scraper"]
        }
      ],
      keyFeatures: [
        "Automated article collection",
        "Custom reading lists",
        "Async processing",
        "Multiple publication sources"
      ],
      links: {
        github: "https://github.com/yourusername/2read"
      }
    }
  },
  {
    title: "Flappy Bird 🐤",
    description: "A browser-based recreation of the classic Flappy Bird game built with JavaScript and Phaser.",
    tags: ["javascript", "phaser", "html/css"],
    link: "https://flappybird-demo.com",
    image: "/images/flappybird.png",
    modalContent: {
      fullDescription: "This browser-based Flappy Bird game is developed using Javascript, Phaser and HTML. It utilizes Phaser's Arcade physics system to handle game mechanics efficiently. The game features an angry bird sprite that players can control using the up arrow key to navigate through columns without colliding with them or the ground. The game logic continuously updates to check for user input and update the game state accordingly.",
      timeline: "Developed Feb 2024",
      techStack: [
        {
          category: "Frontend",
          items: ["JavaScript", "Phaser", "HTML/CSS"]
        },
        {
          category: "Development",
          items: ["VSCode", "Sprites", "Assets", "Scenes"]
        }
      ],
      keyFeatures: [
        "Physics-based gameplay",
        "Score tracking",
        "Collision detection",
        "Responsive controls"
      ],
      links: {
        demo: "https://flappybird-demo.com",
        github: "https://github.com/yourusername/flappy-bird"
      }
    }
  },
  {
    title: "Price Predictor 🏠",
    description: "Machine learning model for predicting housing prices using California housing dataset.",
    tags: ["python", "scikit-learn", "pandas", "tensorflow", "keras", "matplotlib"],
    link: "https://price-predictor-demo.com",
    image: "/images/price-predictor.png",
    modalContent: {
      fullDescription: "This Housing Price Prediction Model uses python and regression models to predict housing prices using the California housing dataset. Pandas is used for data exploration/visualization to understand feature distributions. I encoded the categorical data, and created custom transformers to add attributes to the dataset. Random Forest, Support Vector Machine, and XGBoost are employed for regression tasks, and hyperparameter tuning is performed using Scikit-learn's GridSearchCV.",
      timeline: "Developed Jan 2024",
      techStack: [
        {
          category: "Data Science",
          items: ["Python", "Pandas", "NumPy", "Matplotlib"]
        },
        {
          category: "Machine Learning",
          items: ["Scikit-learn", "TensorFlow", "Keras", "XGBoost"]
        }
      ],
      keyFeatures: [
        "Data preprocessing",
        "Feature engineering",
        "Model comparison",
        "Hyperparameter tuning"
      ],
      links: {
        demo: "https://price-predictor-demo.com",
        github: "https://github.com/yourusername/price-predictor"
      }
    }
  },
  {
    title: "MNIST Classify ✍️",
    description: "A machine learning classifier for recognizing handwritten digits using the MNIST dataset.",
    tags: ["python", "pandas", "sklearn", "jupyter", "matplotlib", "numpy"],
    link: "https://mnist-classify-demo.com",
    image: "/images/mnist.png",
    modalContent: {
      fullDescription: "This is a MNIST classifier to recognize handwritten digits. It splits the data into a training and testing set, and a KNN classifier is then trained on the training data. Model evaluation is performed using cross-validation and the F1 score metric. I used various libraries in python for this, such as Pandas for data manipulation, NumPy for numerical computations, Matplotlib for visualization, and Scikit-learn for machine learning tasks.",
      timeline: "Developed Mar 2024",
      techStack: [
        {
          category: "Data Science",
          items: ["Python", "Pandas", "NumPy", "Matplotlib"]
        },
        {
          category: "Machine Learning",
          items: ["Scikit-learn", "Jupyter", "KNN"]
        }
      ],
      keyFeatures: [
        "Digit recognition",
        "Model evaluation",
        "Cross-validation",
        "Performance metrics"
      ],
      links: {
        demo: "https://mnist-classify-demo.com",
        github: "https://github.com/yourusername/mnist-classifier"
      }
    }
  },
  {
    title: "Portfolio.v1 💻",
    description: "First iteration of my personal portfolio showcasing projects+experiences, built with Three.js and React.",
    tags: ["javascript", "react", "node.js", "three.js", "vite", "spline"],
    link: "https://meenagopalakrishnan.com",
    image: "/images/portfoliov1.png",
    modalContent: {
      fullDescription: "This is my portfolio website showcasing my projects, experiences, interests, and more. It's built using html, javascript, css, node.js, and vite. While making this, I also experimented with Three.js, React Three Fibre, and a variety of frameworks. This is a continuous work in progress.",
      timeline: "Developed Mar 2024",
      techStack: [
        {
          category: "Frontend",
          items: ["JavaScript", "React", "Node.js", "GSAP"]
        },
        {
          category: "3D & Animation",
          items: ["Three.js", "Vite", "HTML/CSS", "Spline"]
        }
      ],
      keyFeatures: [
        "3D animations",
        "Responsive design",
        "Interactive UI",
        "Project showcase"
      ],
      links: {
        demo: "https://meenagopalakrishnan.com",
        github: "https://github.com/yourusername/portfolio"
      }
    }
  },
  {
    title: "Portfolio v2 💫",
    description: "Latest version of personal website built with modern web technologies and animations.",
    tags: ["next.js", "typescript", "react", "javascript", "tailwind CSS"],
    link: "https://meenagopalakrishnan.com",
    image: "/images/portfoliov2.png",
    modalContent: {
      fullDescription: "A complete redesign of my portfolio website focusing on modern aesthetics and smooth interactions. Built using Next.js and TypeScript, featuring animated page transitions with Framer Motion, Tailwind CSS for styling, and responsive design. The dark theme uses a unique purple gradient aesthetic with custom card hover effects and backdrop blur.",
      timeline: "Developed Apr 2024",
      techStack: [
        {
          category: "Frontend",
          items: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
        },
        {
          category: "Design",
          items: ["Figma", "Custom Animations", "Responsive Design"]
        }
      ],
      keyFeatures: [
        "Custom animations and transitions",
        "Interactive project cards",
        "Dynamic modal system",
        "Responsive dark theme",
        "Modern UI/UX design"
      ],
      links: {
        demo: "https://meenagopalakrishnan.com",
        github: "https://github.com/yourusername/portfolio-v2"
      }
    }
  }
];


const interests: Interest[] = [
  { name: "Machine Learning", delay: 0 },
  { name: "Cloud Computing", delay: 0.1 },
  { name: "Neural Networks", delay: 0.2 },
  { name: "Cryptography", delay: 0.3 },
  { name: "Data Science", delay: 0.4 },
  { name: "GUI Development", delay: 0.5 },
  { name: "Generative AI", delay: 0.6 },
  { name: "Sustainability", delay: 0.7 },
  { name: "Music", delay: 0.8 }
];

const experiences: Experience[] = [
  {
    title: "Technical Systems Analyst Intern",
    company: "Royal Bank of Canada (RBC)",
    period: "May 2023 - Aug 2023",
    description: [
      "Chosen to present at SLT Showcase to senior leaders for outstanding performance",
      "Engineered resolution of 40+ critical incidents across AWS (EC2, Cloudformation, Lambda, S3, VPC) and Azure (AKS, Databricks, ACR, App Services), tackling infrastructure provisioning, enhancing serverless performance, etc.",
      "Optimized and managed critical cloud infrastructure supporting 20,000+ users across AWS/Azure, leveraging ACR/ECR, Kubernetes(AKS), Azure AD, AKV, Azure MI & AWS IAM.",
      "Onboarded enterprise applications across AWS and Azure by implementing Terraform, configuring network policies, and enforcing security compliance."
    ],
    technologies: [
      "AWS",
      "EC2",
      "CloudFormation",
      "S3",
      "VPC",
      "Azure",
      "Kubernetes (AKS/EKS)",
      "Databricks",
      "Azure Container Registry (ACR)",
      "Terraform",
      "Azure AD",
      "Azure Key Vault",
      "Azure Managed Identity",
      "AWS IAM",
      "ECR"
    ],
    logo: "/images/rbc.png"  
  },
  {
    title: "Software Developer",
    company: "Google Developer Group Waterloo",
    period: "Sept 2022 - Dec 2022",
    description: [
      "Developed responsive events page for GDSC Waterloo's website using React, TypeScript and TanStack Router, serving 500+ student members.",
      "Built dynamic event card system with Tailwind CSS featuring dual viewing modes and real-time attendee tracking for Google and club events.",
      "Implemented filterable interface to showcase upcoming tech events and workshops, improving discoverability for 150+ monthly student attendees."
    ],
    technologies: [
      "React",
      "TypeScript",
      "TanStack Router",
      "Tailwind CSS",
      "HTML",
      "JavaScript",
      "Git"
    ],
    logo: "/images/googledev.png"  
  },
  {
    title: "AI & Azure Engineer Intern",
    company: "Microsoft WEA\n @UWaterloo",
    period: "Jan 2022 - Apr 2022",
    description: [
      "Designed AI pipeline using Azure ML and Azure DB to generate financial recommendations.",
      "Refined stock and ETF performance prediction using advanced regression models, integrating personalized recommendations through content-based filtering for tailored insights.",
      "Led cross-functional team collaboration, improving productivity through communication & teamwork"
    ],
    technologies: [
      "Azure Machine Learning",
      "Azure Database",
      "Python",
      "Regression Models",
      "SQL"
      ],
    logo: "/images/uwaterloo.png"  
  },
  {
    title: "Lead Web Developer",
    company: "The Fraser Post",
    period: "Jan 2022 - Apr 2022",
    description: [
      "Managed and delivered a responsive website using React, HTML/CSS and JS following the SDLC",
      "Developed dynamic features using Microsoft Excel to manage content scheduling and tracking",
      "Led and collaborated with team to plan and organize tasks, integrate content and resolve issues"
    ],
    technologies: [
      "React",
      "HTML",
      "CSS",
      "JavaScript",
      "Microsoft Excel",
      "Git",
      "Project Management"
    ],
    logo: "/images/fp.png"  
  }
];


const LoadingScreen = () => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-[#09000f]"
  >
    <div className="relative flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <img 
          src="/images/m.png" 
          alt="logo" 
          className="w-12 h-12 object-contain" // Adjust size as needed
        />
      </motion.div>
      <div className="w-48 h-[2px] bg-purple-500/10 rounded-full overflow-hidden loading-gradient">
      </div>
    </div>
  </motion.div>
);

export default function HomePage() {
  const [showScroll, setShowScroll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowScroll(false);
      } else {
        setShowScroll(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSplineLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <main className="min-h-screen text-white bg-[#09000f] relative">
        <div className="noise" />
        <HeroSection showScroll={showScroll} onSplineLoad={handleSplineLoad} />
        <ProjectsSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <InterestsSection />
        <TechStackSection />
        <ConnectSection />
      </main>
    </>
  );
}