import React from 'react';
import { motion } from 'framer-motion';

const InterestsSection = () => {
  const interests = [
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

  return (
    <section className="pt-14 pb-2 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"> 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-7"
      >
        <h2 className="text-[2.8rem] sm:text-7xl lg:text-[5.5rem] font-display tracking-wide text-purple-200 mb-12">
          I'm Interested In
        </h2>

        <div className="flex flex-wrap gap-3 sm:gap-6"> 
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: interest.delay }}
              className="transform-gpu"
            >
              <div 
                className="group relative px-4 sm:px-10 py-2 sm:py-5 rounded-xl sm:rounded-2xl border border-purple-500/20 bg-transparent overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 ease-out"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(186,138,246,0.15)_0%,_rgba(236,207,255,0.1)_45%,_transparent_70%)] opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-150 transition-all duration-300 ease-out" />
                
                <span className="relative z-10 font-display text-base sm:text-2xl text-purple-200/80 group-hover:text-purple-200 transition-colors whitespace-nowrap">
                  {interest.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default InterestsSection;