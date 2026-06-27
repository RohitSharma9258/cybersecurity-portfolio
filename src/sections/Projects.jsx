import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaSearch, FaShieldAlt, FaTerminal, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import projectsData from '../data/projectsData.json';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  // Derive display data from the single source of truth (projectsData.json)
  const projects = projectsData.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.problemStatement.slice(0, 180) + '...',
    tech: p.techStack.map((t) => t.name),
    features: p.features.slice(0, 4),
    github: p.githubUrl,
    type: p.id === '1' ? 'defense' : 'offense',
    devTimeline: p.id === '1' ? '~6 weeks' : '~4 weeks',
  }));

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.tech.map(t => t.toLowerCase()).includes(filter.toLowerCase()) || p.type === filter);

  const filterCategories = ['all', 'python', 'security', 'networking'];

  return (
    <section id="projects" className="relative py-24 bg-black/90 cyber-grid-dense">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-cyber text-white uppercase tracking-wider">
            &gt; Tactical_Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-2"></div>
          <p className="text-gray-500 font-code text-xs mt-3 uppercase tracking-widest">
            Defensive systems and network scanning utility software
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center space-x-3 mb-12">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              aria-label={`Filter projects by ${category}`}
              aria-pressed={filter === category}
              className={`font-cyber font-bold text-xs uppercase px-4 py-2 rounded-sm border transition-all duration-300 ${
                filter === category
                  ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                  : 'bg-neutral-950/40 text-gray-500 border-neutral-800 hover:text-cyan-400 hover:border-cyan-500/30'
              }`}
            >
              {category === 'all' ? 'show_all' : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                key={project.id}
                className="glass-panel-cyan rounded-lg p-6 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Status badge + dev timeline */}
                <div className="absolute top-0 right-0 p-3 flex items-center gap-2 text-[10px] font-code select-none-decorative">
                  <span className="text-cyan-500/30">[STATUS: COMPILED]</span>
                  <span className="flex items-center gap-1 text-emerald-400/60 border border-emerald-500/20 bg-emerald-950/20 px-1.5 py-0.5 rounded-sm">
                    <FaClock size={8} aria-hidden="true" />
                    {project.devTimeline}
                  </span>
                </div>

                <div>
                  {/* Title */}
                  <div className="flex items-center space-x-3 mb-4 mt-2">
                    <span className="p-2 border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 rounded-sm" aria-hidden="true">
                      {project.type === 'defense' ? <FaShieldAlt /> : <FaSearch />}
                    </span>
                    <h3 className="text-lg md:text-xl font-cyber font-bold text-white">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">
                    {project.description}
                  </p>

                  {/* Feature Listing */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[10px] font-code text-neutral-500 uppercase tracking-widest">
                      Modules Installed:
                    </div>
                    <ul className="text-xs text-gray-400 space-y-1 font-code">
                      {project.features.map((feat, index) => (
                        <li key={index} className="flex items-center space-x-1.5">
                          <span className="text-cyan-500 font-bold" aria-hidden="true">&gt;</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer with Tags and Links */}
                <div className="pt-4 border-t border-cyan-500/10 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-neutral-950 border border-neutral-800 text-[10px] text-gray-400 font-code px-2 py-0.5 rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Link
                      to={`/project/${project.id}`}
                      className="border border-cyan-500/30 hover:border-cyan-400 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-950/50 font-code text-xs px-3 py-1.5 rounded-sm flex items-center space-x-1.5 transition-all duration-300"
                    >
                      <FaTerminal size={10} aria-hidden="true" />
                      <span>AUDIT_REPORT</span>
                    </Link>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-neutral-800 hover:border-neutral-600 bg-neutral-950 text-neutral-400 hover:text-cyan-400 font-code text-xs px-3 py-1.5 rounded-sm flex items-center space-x-1.5 transition-all duration-300"
                    >
                      <FaGithub size={11} aria-hidden="true" />
                      <span>SRC_CODE</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Projects;
