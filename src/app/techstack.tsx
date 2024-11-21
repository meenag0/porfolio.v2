import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Globe, 
  Cloud,
  Brain,
  Code2,
  Wrench
} from 'lucide-react';

const TechStackSection = () => {
  const techStack = [
    {
      category: "Languages",
      icon: <Code2 className="w-5 h-5" />,
      techs: ["JavaScript", "TypeScript", "Python", "C++", "Rust", "Dart", "SQL", "HTML", "CSS", "SASS"],
      color: "from-purple-400/5 to-blue-400/5"
    },
    {
      category: "Web & Frontend",
      icon: <Globe className="w-5 h-5" />,
      techs: ["React", "Next.js", "Tailwind CSS", "Three.js", "Material UI", "React Native", "Expo", "Flutter"],
      color: "from-pink-400/5 to-purple-400/5"
    },
    {
      category: "Backend & APIs",
      icon: <Database className="w-5 h-5" />,
      techs: ["Node.js", "FastAPI", "REST API", "Actix-Web", "Express", "Axios", "Fetch API", "Spotify API", "Google API"],
      color: "from-blue-400/5 to-cyan-400/5"
    },
    {
      category: "ML & Data Science",
      icon: <Brain className="w-5 h-5" />,
      techs: ["TensorFlow", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Keras", "Hugging Face Transformers"],
      color: "from-emerald-400/5 to-blue-400/5"
    },
    {
      category: "Cloud & DevOps",
      icon: <Cloud className="w-5 h-5" />,
      techs: ["AWS", "Azure", "Docker", "Kubernetes", "Jenkins", "Terraform", "Google Cloud", "Heroku"],
      color: "from-orange-400/5 to-red-400/5"
    },
    {
      category: "Developer Tools",
      icon: <Wrench className="w-5 h-5" />,
      techs: ["Git", "VS Code", "XCode", "Jira", "Firebase", "Agile", "Confluence", "HCL", "Excel", "MS Word"],
      color: "from-violet-400/5 to-purple-400/5"
    }
  ];

  return (
    <section className="pt-0rem sm:pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"> 
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-16"
      >
        <h2 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-display tracking-wide text-purple-200">
          My Tech Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
          {techStack.map((category, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className={`relative p-8 rounded-2xl border border-purple-500/20 bg-gradient-to-br ${category.color} backdrop-blur-sm overflow-hidden h-full`}>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-purple-500/5 text-purple-200">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-display text-purple-200">
                      {category.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {category.techs.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ 
                          scale: 1.1,
                          transition: { duration: 0.2 }
                        }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: i * 0.1 + index * 0.1,
                          duration: 0.3
                        }}
                        className="relative"
                      >
                        <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm
                                    hover:bg-purple-500/15 transition-all duration-300 cursor-default">
                          <span className="font-display text-base text-purple-200/80 whitespace-nowrap">
                            {tech}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(186,138,246,0.15)_0%,_rgba(236,207,255,0.1)_45%,_transparent_70%)] opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-150 transition-all duration-300 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TechStackSection;