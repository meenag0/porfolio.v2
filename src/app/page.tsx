'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';

const SplineViewer = dynamic(() => import('./SplineViewer'), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px]" /> 
});

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Update CSS variables for mouse position
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };

    // Add event listener with throttling for performance
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const throttledHandleMouseMove = (e: MouseEvent) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleMouseMove(e);
          timeoutId = null;
        }, 10);
      }
    };

    window.addEventListener('mousemove', throttledHandleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', throttledHandleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const projects = [
    {
      title: "Project One",
      description: "A full-stack application built with Next.js and TypeScript",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "#"
    },
  ];

  return (
    <>
      <div className="noise" />
      <main className="min-h-screen text-white bg-gradient-dark relative">
        {/* Hero Section */}
        <section className="relative min-h-[100vh] flex items-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto">
            {/* Flex container for the two-column layout */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
              {/* Left column - Text content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 space-y-6"
              >
                <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                  Hello, I'm <span className="font-extrabold">Meena</span>
                </h1>
                <h2 className="text-2xl sm:text-3xl text-slate-300">
                  Full Stack Developer & Designer
                </h2>
                <p className="text-lg sm:text-xl text-slate-400">
                  I craft elegant solutions through code and design, specializing in building 
                  exceptional digital experiences that live at the intersection of form and function.
                </p>
                
                <div className="flex space-x-4 pt-4">
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#contact" 
                    className="px-6 py-3 border border-slate-700 hover:border-blue-500 rounded-lg transition-all"
                  >
                    Get in touch
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects" 
                    className="px-6 py-3 border border-slate-700 hover:border-blue-500 rounded-lg transition-all"
                  >
                    View my work
                  </motion.a>
                </div>
              </motion.div>

              {/* Right column - Spline animation */}
              <div className="w-full lg:w-1/2 z-100">
                <div className="h-[80vh] lg:h-[100vh] w-full">
                  <SplineViewer />
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block"
          >
            <ChevronDown className="w-8 h-8 text-slate-400" />
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-12"
          >
            Selected Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-slate-800/50 p-6 rounded-xl hover:bg-slate-800 transition-all"
              >
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-slate-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300"
                >
                  View Project <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-12"
          >
            Let's Connect
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-8"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="mailto:your.email@example.com"
              className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-6 h-6" />
              <span>your.email@example.com</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="https://github.com/yourusername"
              className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
              <span>GitHub</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="https://linkedin.com/in/yourusername"
              className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
              <span>LinkedIn</span>
            </motion.a>
          </motion.div>
        </section>
      </main>
    </>
  );
}