// projects.tsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, MousePointer } from 'lucide-react';

// Types
interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;   // <-- make optional
  image: string;
  thumbnail?: string;
  video?: string;
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


interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

interface ProjectsSectionProps {
  projects: Project[];
}

// Modal Component
const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;
  
  const { modalContent } = project;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-10"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="relative w-full max-w-3xl p-6 mx-4 rounded-xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-lg"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-purple-500/20 transition-colors"
            >
              <X className="w-4 h-4 text-purple-200" />
            </button>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Content */}
              <div className="flex-1 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-purple-200">
                      {project.title}
                    </h2>
                    <p className="text-purple-200/60 font-mono text-xs mt-1">
                      {modalContent.timeline}
                    </p>
                  </div>
                  {/* Links */}
                  <div className="flex gap-2">
                    {modalContent.links.demo && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={modalContent.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-purple-500/10 rounded-full text-purple-200/80 hover:text-purple-200 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                    {modalContent.links.github && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={modalContent.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-purple-500/10 rounded-full text-purple-200/80 hover:text-purple-200 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Project Image */}
                <div className="h-40 w-full overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-lg font-display text-purple-200 mb-2">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {modalContent.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-purple-100/80 text-sm">
                        <span className="w-1 h-1 rounded-full bg-purple-400"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Description */}
                <div>
                  <h3 className="text-lg font-display text-purple-200 mb-2">About</h3>
                  <p className="text-sm text-purple-100/80 leading-relaxed">
                    {modalContent.fullDescription}
                  </p>
                </div>
              </div>

              {/* Tech Stack Sidebar */}
              <div className="lg:w-56 space-y-4 lg:border-l lg:border-purple-500/20 lg:pl-4">
                <div>
                  <h3 className="text-lg font-display text-purple-200 mb-3">Tech Stack</h3>
                  <div className="space-y-4">
                    {modalContent.techStack.map((category, index) => (
                      <div key={index}>
                        <h4 className="text-purple-200/90 font-mono text-xs mb-1.5">
                          {category.category}
                        </h4>
                        <ul className="space-y-1">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="text-purple-100/70 text-xs flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-purple-400/50"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const openVideoInNewTab = () => {
    const videoWindow = window.open('', '_blank');
    if (videoWindow) {
      videoWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${project.title} - Demo Video</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              background: #000;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              font-family: Arial, sans-serif;
            }
            h1 {
              color: white;
              text-align: center;
              margin-bottom: 20px;
              font-size: 1.5rem;
            }
            video {
              max-width: 90vw;
              max-height: 80vh;
              border-radius: 8px;
              box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            }
          </style>
        </head>
        <body>
          <h1>${project.title} Demo</h1>
          <video controls autoplay>
            <source src="${project.video}" type="video/mp4">
            <source src="${project.video}" type="video/mov">
            <source src="${project.video}" type="video/webm">
            Your browser does not support the video tag.
          </video>
        </body>
        </html>
      `);
      videoWindow.document.close();
    }
  };

  const handleExternalLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (project.video) {
      openVideoInNewTab();
    } else {
      window.open(project.link, "_blank");
    }
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onClick={() => setIsModalOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="project-card group relative rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer"
      >
        <div className="aspect-video relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20 group-hover:opacity-0 transition-opacity duration-300" />
          <img
            src={project.image || "/project-placeholder.png"}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-display font-semibold text-purple-200 group-hover:text-purple-100 transition-colors">
              {project.title}
            </h3>
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="p-2 bg-purple-500/10 rounded-full text-purple-200/80 hover:text-purple-200 transition-colors"
              >
                <MousePointer className="w-4 h-4" />
              </motion.button>
              
              {(project.video || project.link) && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={handleExternalLinkClick}
                  className="p-2 bg-purple-500/10 rounded-full text-purple-200/80 hover:text-purple-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              )}


              {project.modalContent.links.github && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  href={project.modalContent.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 bg-purple-500/10 rounded-full text-purple-200/80 hover:text-purple-200 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
              )}
            </div>
          </div>
          
          <p className="text-sm text-purple-100/70 font-light leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 
                         rounded-full text-xs font-mono tracking-wider text-purple-200/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      
      <ProjectModal
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};



// Projects Section Component
const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24"
      >
        <h2 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-display tracking-wide text-purple-200">
          Featured Projects
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};


interface VideoModalProps {
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="relative w-full max-w-4xl p-4 rounded-xl bg-black"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/70 transition"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <video
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default ProjectsSection;