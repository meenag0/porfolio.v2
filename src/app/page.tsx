'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

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
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    };

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
    
    return () => {
      window.removeEventListener('mousemove', throttledHandleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const projects: Project[] = [
    {
      title: "Project One",
      description: "A full-stack application built with Next.js and TypeScript, featuring real-time data visualization and seamless user interactions. This project showcases modern web development practices and responsive design principles.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
      link: "#",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Project Two",
      description: "An e-commerce platform with real-time inventory management, integrated payment processing, and advanced analytics dashboard. Built with scalability and performance in mind.",
      tags: ["React", "Node.js", "MongoDB", "AWS"],
      link: "#",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Project Three",
      description: "A mobile-first progressive web application enabling seamless collaboration between remote teams. Features include real-time chat, document sharing, and project management tools.",
      tags: ["Vue.js", "Firebase", "WebRTC", "PWA"],
      link: "#",
      image: "/api/placeholder/600/400"
    }
  ];

  return (
    <>
      <div className="noise" />
      <main className="min-h-screen text-white bg-gradient-dark relative">
        {/* Hero Section */}
        <section className="relative min-h-[100vh] flex items-center overflow-hidden">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
              {/* Left column - Text content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-2/5 space-y-6"
              >
                <h1 className="text-5xl sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300 font-aeonik-regular">
                  Hi! I'm <span className="font-aeonik-regular font-bold">Meena</span>
                </h1>
                <h2 className="text-2xl sm:text-3xl font-aeonik-regular text-purple-200">
                  Full Stack Developer & Designer
                </h2>
                <p className="text-base sm:text-lg font-aeonik-light text-purple-100/80 leading-relaxed">
                  I craft elegant solutions through code and design, specializing in building 
                  exceptional digital experiences that live at the intersection of form and function.
                </p>
                
                <div className="flex space-x-4 pt-4">
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#contact" 
                    className="px-6 py-3 bg-purple-500/10 border border-purple-500/20 hover:border-purple-300 rounded-lg transition-all font-aeonik-regular text-purple-200 hover:bg-purple-500/20"
                  >
                    Get in touch
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="#projects" 
                    className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 hover:border-blue-300 rounded-lg transition-all font-aeonik-regular text-blue-200 hover:bg-blue-500/20"
                  >
                    View my work
                  </motion.a>
                </div>
              </motion.div>

              {/* Right column - Spline animation */}
              <div className="w-full lg:w-3/5 z-100 lg:translate-x-16">
                <div className="h-[80vh] lg:h-[100vh] w-full">
                  <SplineViewer />
                </div>
              </div>
            </div>
          </div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden lg:block cursor-pointer"
          >
            <ChevronDown className="w-8 h-8 text-purple-300/50" />
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-aeonik-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
              Selected Works
            </h2>
            <p className="text-purple-200/60 font-aeonik-light max-w-2xl mx-auto">
              A collection of projects that showcase my expertise in building scalable, 
              user-centric applications with modern technologies.
            </p>
          </motion.div>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
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
                  <div className="w-full lg:w-1/2 space-y-4">
                    <h3 className="text-2xl font-aeonik-semibold text-purple-200">{project.title}</h3>
                    <p className="text-purple-100/80 font-aeonik-light leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-aeonik-light text-purple-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <motion.a 
                      whileHover={{ x: 5 }}
                      href={project.link}
                      className="inline-flex items-center text-blue-300 hover:text-blue-200 font-aeonik-regular group/link mt-4 block"
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
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-aeonik-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300">
              Let's Connect
            </h2>
            <p className="text-purple-200/60 font-aeonik-light max-w-2xl mx-auto">
              Have a project in mind or just want to chat? Feel free to reach out through any of these channels.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-8"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="mailto:your.email@example.com"
              className="flex items-center space-x-3 text-purple-200 hover:text-white transition-colors font-aeonik-regular group"
            >
              <Mail className="w-6 h-6 group-hover:text-purple-300" />
              <span>your.email@example.com</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="https://github.com/yourusername"
              className="flex items-center space-x-3 text-purple-200 hover:text-white transition-colors font-aeonik-regular group"
            >
              <Github className="w-6 h-6 group-hover:text-purple-300" />
              <span>GitHub</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="https://linkedin.com/in/yourusername"
              className="flex items-center space-x-3 text-purple-200 hover:text-white transition-colors font-aeonik-regular group"
            >
              <Linkedin className="w-6 h-6 group-hover:text-purple-300" />
              <span>LinkedIn</span>
            </motion.a>
          </motion.div>
        </section>
      </main>
    </>
  );
}