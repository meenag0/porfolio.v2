import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
  link?: string;
  logo: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-24"
      >
        <h2 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-display tracking-wide text-purple-200">
          Work Experience
        </h2>
      </motion.div>

      <div className="space-y-20">
        {experiences.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              {/* Company, Logo, and Period */}
              <div className="lg:col-span-4 space-y-2 pl-4">
                <div className="flex items-center -ml-2"> {/* Added negative margin to just the flex container */}
                  {/* Company Logo */}
                  <img
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    className="w-16 h-16 object-contain"
                  />
                  {/* Company Name */}
                  <div className="flex items-center gap-2 ml-8">
                    <h3 className="text-3xl font-display font-semibold text-purple-200 whitespace-pre-line">
                      {experience.company}
                    </h3>
                  </div>
                </div>
                <p className="font-mono text-sm text-purple-200/60 ml-24">
                  {experience.period}
                </p>
              </div>

              {/* Role and Details */}
              <div className="lg:col-span-8 space-y-6">
                <h4 className="text-2xl font-display font-medium text-purple-100 tracking-wide">
                  {experience.title}
                </h4>
                <ul className="space-y-3">
                  {experience.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-purple-200/75">
                      <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm font-mono rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}