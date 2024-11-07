'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const SplineViewer = dynamic(() => import('./SplineViewer'), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px]" /> 
});

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

export default function HomePage() {

  

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
  }, []);

  const projects: Project[] = [
    {
      title: "cine.fm 🎶",
      description: "cine.fm is a web application that uses machine learning to generate a playlist based on the user's selection from 50,000+ movies. It was developed by conducting sentiment analysis using NLP transformers from hugging face, on the movie-descriptions gathered from wikipedia, and song lyrics acquired through the spotify and genius apis. It utilizes content-based filtering to generate the playlist based on a similarity matrix.",
      tags: ["python", "pandas", "numpy", "sklearn", "tokenizers", "transformers", "spotify api", "genius api", "selenium"],
      link: "https://cinefm.streamlit.app/",
      image: "/cine-fm.png"
    },
    // ... (keep other projects)
  ];

  return (
    <>
      <div className="noise" />
      <main className="min-h-screen text-white bg-[#09000f] relative">
        <section className="relative min-h-[100vh] flex items-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
              {/* Left column - Text content */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full lg:w-1/2 space-y-8"
              >
                {/* Role badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block"
                >
                  <span className="px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 
                                 text-sm font-mono tracking-wider text-purple-200/90 uppercase">
                    Computer Engineering @ UWaterloo
                  </span>
                </motion.div>

                {/* Main content */}
                <div className="space-y-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Greeting and Name */}
                    <div className="space-y-2">
                      <div className="text-3xl font-light text-purple-200/90">
                        Hello! I am
                      </div>
                      <h1 className="text-7xl sm:text-8xl font-display font-bold tracking-tight leading-[0.9]">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r 
                                     from-purple-300 via-purple-200 to-blue-300">
                          Meena.
                        </span>
                      </h1>
                      <div className="mt-4 text-xl font-display font-normal tracking-wide text-purple-100/80">
                        engineer * developer * innovator
                      </div>
                    </div>
                    
    
                  </motion.div>

                  {/* Description */}
                  <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg leading-relaxed text-purple-100/75 font-thin"
                >
                  I strive to solve problems through computers and code. Previously, I have delved into{' '}
                  <span className="text-blue-100 relative inline-block group cursor-pointer">
                    full stack development
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-300 
                                   group-hover:w-full transition-all duration-300 ease-out" />
                  </span>, {' '}
                  <span className="text-blue-100 relative inline-block group cursor-pointer"> cloud computing                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-300 
                                   group-hover:w-full transition-all duration-300 ease-out" />
                  </span>, {' '}
                  <span className="text-blue-100 relative inline-block group cursor-pointer">
                    machine learning
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-300 
                                   group-hover:w-full transition-all duration-300 ease-out" />
                  </span> and {' '}
                  <span className="text-blue-100 relative inline-block group cursor-pointer">
                    computer systems
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-300 
                                   group-hover:w-full transition-all duration-300 ease-out" />
                  </span>, and{''}
                  <span className="text-purple-200 relative inline-block group cursor-pointer">
                  </span> and am always looking for new technologies to tinker with. I enjoy integrating my love for science, art and music with my passion for coding to create cool and useful projects.
                </motion.p>
                </div>

                {/* Action buttons with hover effects */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex gap-4">
                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      href="#contact" 
                      className="group px-8 py-4 bg-purple-500/10 rounded-xl border border-purple-500/20 
                               hover:bg-purple-500/20 transition-all duration-300"
                    >
                      <span className="flex items-center gap-3 font-display tracking-wide text-purple-200">
                        Get in touch
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.a>

                    <motion.a 
                      whileHover={{ scale: 1.02 }}
                      href="#projects" 
                      className="group px-8 py-4 bg-blue-500/10 rounded-xl border border-blue-500/20 
                               hover:bg-blue-500/20 transition-all duration-300"
                    >
                      <span className="flex items-center gap-3 font-display tracking-wide text-blue-200">
                        View work
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </motion.a>
                  </div>

                  {/* Social links */}
                  <div className="flex gap-6 items-center">
                    <div className="h-[1px] w-12 bg-purple-300/20" />
                    <div className="flex gap-4">
                      <motion.a 
                        whileHover={{ scale: 1.1, color: '#A78BFA' }}
                        href="https://github.com/meenag0"
                        target="_blank"
                        className="text-purple-200/60 hover:text-purple-200 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                      <motion.a 
                        whileHover={{ scale: 1.1, color: '#A78BFA' }}
                        href="https://linkedin.com/in/meenagopalakrishnan"
                        target="_blank"
                        className="text-purple-200/60 hover:text-purple-200 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </motion.a>
                      <motion.a 
                        whileHover={{ scale: 1.1, color: '#A78BFA' }}
                        href="mailto:m3gopala@uwaterloo.ca"
                        className="text-purple-200/60 hover:text-purple-200 transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right column - Spline animation */}
              <div className="w-full lg:w-4/6 z-10 lg:translate-x-14">
                <div className="relative h-[80vh] lg:h-[100vh] w-full">
                  <SplineViewer />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 mb-16"
          >
            <div className="font-mono text-sm tracking-widest text-purple-200/60 uppercase">
              Featured Work
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
              Selected Projects
            </h2>
          </motion.div>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                  {/* Project Image */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="w-full lg:w-1/2 aspect-video relative overflow-hidden rounded-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 group-hover:opacity-0 transition-opacity duration-300" />
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </motion.div>
                  
                  {/* Project Info */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <h3 className="text-2xl font-display font-semibold text-purple-200">
                      {project.title}
                    </h3>
                    <p className="text-purple-100/70 font-light leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 
                                   rounded-full text-sm font-mono tracking-wider text-purple-200/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.a 
                      whileHover={{ x: 5 }}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-300 hover:text-blue-200 
                               font-mono text-sm tracking-wider group/link mt-4 block"
                    >
                      View Project 
                      <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-center mb-16"
          >
            <div className="font-mono text-sm tracking-widest text-purple-200/60 uppercase">
              Get In Touch
            </div>
            <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
              Let's Connect
            </h2>
            <p className="text-purple-200/60 font-light max-w-2xl mx-auto">
              Have a project in mind or just want to chat? I'm always open to new opportunities 
              and interesting conversations.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center items-center gap-8"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="mailto:m3gopala@uwaterloo.ca"
              className="flex items-center space-x-3 text-purple-200 hover:text-white 
                       transition-colors font-mono tracking-wider group"
            >
              <Mail className="w-5 h-5 group-hover:text-purple-300" />
              <span>m3gopala@uwaterloo.ca</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="https://github.com/meenag0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-purple-200 hover:text-white 
                       transition-colors font-mono tracking-wider group"
            >
              <Github className="w-5 h-5 group-hover:text-purple-300" />
              <span>GitHub</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="https://linkedin.com/in/meenagopalakrishnan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-purple-200 hover:text-white 
                       transition-colors font-mono tracking-wider group"
            >
              <Linkedin className="w-5 h-5 group-hover:text-purple-300" />
              <span>LinkedIn</span>
            </motion.a>
          </motion.div>
        </section>
      </main>
    </>
  );
}