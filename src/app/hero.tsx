import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';

const SplineViewer = dynamic(() => import('./SplineViewer'), { 
  ssr: false,
  loading: () => <div className="w-full h-[400px]" /> 
});

interface HeroSectionProps {
  showScroll: boolean;
  onSplineLoad: () => void;
}

export default function HeroSection({ showScroll, onSplineLoad }: HeroSectionProps) {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-4 sm:px-6 lg:px-8 py-4 lg:py-0">
          {/* Left column - Text content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full lg:w-1/2 space-y-4 lg:space-y-8" 
          >
            {/* Role badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block"
            >
              <span className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-mono tracking-wider text-purple-200/90 uppercase whitespace-nowrap">
                Computer Engineering @ UWaterloo
              </span>
            </motion.div>

            {/* Main content */}
            <div className="space-y-4 lg:space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3 lg:space-y-6" 
              >
                {/* Greeting and Name */}
                <div>
                  <div className="text-2xl sm:text-3xl font-light text-purple-200/90">
                    Hello! I am
                  </div>
                  <h1 className="mt-1 sm:mt-2 text-7xl sm:text-7xl lg:text-[6.9rem] font-display font-bold tracking-tight leading-[0.9]">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-200 to-blue-300">
                      Meena.
                    </span>
                  </h1>
                  <div className="mt-2 mb-0 text-lg sm:text-xl lg:text-[1.3rem] font-display font-normal tracking-wide text-purple-100/80">
                    engineer  ∙  developer  ∙  innovator
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <div className="mt-2">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-base sm:text-lg leading-relaxed text-purple-100/75 font-thin"
                >
                  I strive to solve problems through computers and code. Previously, I have delved into{' '}
                  <span className="text-blue-100 relative inline-block group cursor-pointer">
                    full stack development
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-300 group-hover:w-full transition-all duration-300 ease-out" />
                  </span>, {' '}
                  <span className="text-blue-100 relative inline-block group cursor-pointer">
                    cloud computing
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-300 group-hover:w-full transition-all duration-300 ease-out" />
                  </span>, {' '}
                  <span className="text-blue-100 relative inline-block group cursor-pointer">
                    machine learning
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-300 group-hover:w-full transition-all duration-300 ease-out" />
                  </span> and {' '}
                  <span className="text-blue-100 relative inline-block group cursor-pointer">
                    computer systems
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-300 group-hover:w-full transition-all duration-300 ease-out" />
                  </span>, and am always looking for new technologies to tinker with. I enjoy integrating my love for science, art and music with my passion for coding to create cool and useful projects.
                </motion.p>
              </div>
            </div>

            {/* Action buttons and social links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6"
            >
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  href="#connect-section" 
                  className="group px-8 py-4 bg-purple-500/10 rounded-xl border border-purple-500/20 hover:bg-purple-500/20 transition-all duration-300"
                >
                  <span className="flex items-center justify-center sm:justify-start gap-3 font-display tracking-wide text-purple-200">
                    Get in touch
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.a>

                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  href="#projects" 
                  className="group px-8 py-4 bg-blue-500/10 rounded-xl border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300"
                >
                  <span className="flex items-center justify-center sm:justify-start gap-3 font-display tracking-wide text-blue-200">
                    View work
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.a>
              </div>

              {/* Social links */}
              <div className="flex gap-6 items-center justify-center sm:justify-start">
                <div className="h-[1px] w-12 bg-purple-300/20 hidden sm:block" />
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
          <div className="hidden lg:block w-full lg:w-4/6 z-10 lg:translate-x-14 lg:translate-y-7">
            <div className="relative h-[80vh] lg:h-[100vh] w-full">
              <SplineViewer onLoad={onSplineLoad} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {showScroll && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.3, 1, 0.3],
              y: [0, 10, 0]
            }}
            exit={{ 
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-purple-200/60" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}