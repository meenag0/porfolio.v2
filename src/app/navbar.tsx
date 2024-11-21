'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden sm:block ${
        scrolled ? 'bg-black/10 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-[2000px] mx-auto">
        <div className="flex justify-between items-center h-12">
          {/* Logo/Name */}
          <motion.a
            href="#"
            className="text-purple-200/90 font-display text-base tracking-tight pl-8"
            whileHover={{ scale: 1.05 }}
          >
            meena gopalakrishnan
          </motion.a>

          {/* Navigation Links */}
          <div className="flex space-x-8 pr-8">
            {[
              { name: 'home', href: '#' },
              { name: 'work', href: '#projects' },
              { name: 'resume', href: '/images/Resume-MeenaG.pdf' },
              { name: 'connect', href: '#connect-section' }
            ].map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-purple-200/75 hover:text-purple-200 transition-colors font-display text-base tracking-tight"
                whileHover={{ scale: 1.05 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;