import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';

const ConnectSection = () => {
  return (
    <section id="connect-section" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left side - SVG */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 200 200" 
            className="w-full max-w-md mx-auto"
          >
            <path 
              fill="url(#SvgjsLinearGradient8900)" 
              fillRule="evenodd" 
              d="M0 0h50v50H0V0Zm100 50H50v50H0v50h50v50h50v-50h50v50h50v-50h-50v-50h50V50h-50V0h-50v50Zm0 50h50V50h-50v50Zm0 0v50H50v-50h50Z" 
              clipRule="evenodd"
            />
            <defs>
              <linearGradient 
                id="SvgjsLinearGradient8900" 
                gradientTransform="rotate(0 0.5 0.5)"
              >
                <stop stopOpacity="1" stopColor="rgba(156, 172, 238)" offset="0.138515625" />
                <stop stopOpacity="1" stopColor="rgba(255, 225, 195)" offset="0.48" />
                <stop stopOpacity="1" stopColor="rgba(227, 163, 255)" offset="0.883515625" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        
        {/* Rest of the component remains the same */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-[5.5rem] font-display font-bold tracking-tight text-purple-200">
              Let's Connect
            </h2>
            <p className="text-purple-200/60 font-light max-w-2xl">
              Have a project in mind or just want to chat? I'm always open to new opportunities 
              and interesting conversations.
            </p>
          </div>

          <div className="space-y-6">
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="mailto:m3gopala@uwaterloo.ca"
              className="flex items-center gap-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/15 transition-all duration-300"
            >
              <Mail className="w-5 h-5 text-purple-300" />
              <span className="font-mono text-purple-200">m3gopala@uwaterloo.ca</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.02 }}
              href="https://github.com/meenag0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/15 transition-all duration-300"
            >
              <Github className="w-5 h-5 text-purple-300" />
              <span className="font-mono text-purple-200">github.com/meenag0</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="https://linkedin.com/in/meenagopalakrishnan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/15 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5 text-purple-300 flex-shrink-0" />
              <div className="font-mono text-sm sm:text-base text-purple-200 truncate">
                <span className="hidden sm:inline">linkedin.com/in/</span>
                <span className="sm:hidden">linkedin.com/.../</span>
                <span>meenagopalakrishnan</span>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConnectSection;