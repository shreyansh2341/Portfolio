import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { PROJECTS } from '../data/projects';

const CATEGORIES = ['All', 'Full-Stack', 'AI/ML'];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = PROJECTS.filter(p => 
    filter === 'All' || p.category === filter
  );

  return (
    <PageTransition>
      <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center md:text-left"
        >
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
            My creations
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-shimmer">Projects</h1>
          <p className="text-sm md:text-base mt-4 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            A gallery of web platforms, intelligent models, and software tools built to solve real-world problems.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2.5 mb-12 justify-center md:justify-start"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-5 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 relative overflow-hidden"
              style={{
                background: filter === cat ? 'var(--cyan)' : 'var(--bg-card)',
                color: filter === cat ? 'var(--bg)' : 'var(--text-secondary)',
                border: filter === cat ? '1px solid var(--cyan)' : '1px solid var(--border)',
                boxShadow: filter === cat ? '0 0 15px rgba(0, 217, 255, 0.3)' : 'none',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => {
              const IconComp = proj.icon;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={proj.title}
                  className="proj-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group"
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${proj.color}15`,
                  }}
                >
                  {/* Decorative glow aura behind icon on hover */}
                  <div 
                    className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{ background: proj.color }}
                  />

                  {/* Top Colored Accent Bar */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
                    style={{ background: proj.color }}
                  />

                  <div>
                    {/* Header: Icon and Actions */}
                    <div className="flex justify-between items-start mb-6 mt-1">
                      <div 
                        className="p-3 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          background: `${proj.color}10`,
                          border: `1px solid ${proj.color}25`,
                        }}
                      >
                        <IconComp className="w-6 h-6" style={{ color: proj.color }} />
                      </div>
                      <div className="flex gap-3">
                        <a 
                          href={proj.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="p-2 rounded-lg bg-background/50 border border-white/5 text-on-muted hover:text-on-background hover:border-white/20 transition-all"
                          title="View Source on GitHub"
                        >
                          <Github className="w-4.5 h-4.5" />
                        </a>
                        {proj.live && (
                          <a 
                            href={proj.live} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="p-2 rounded-lg bg-background/50 border border-white/5 text-on-muted hover:text-on-background hover:border-white/20 transition-all"
                            title="View Live Demo"
                          >
                            <ExternalLink className="w-4.5 h-4.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Metadata */}
                    <span 
                      className="text-[10px] font-mono tracking-wider uppercase font-semibold px-2 py-0.5 rounded"
                      style={{
                        background: `${proj.color}10`,
                        color: proj.color,
                      }}
                    >
                      {proj.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl font-bold mt-3 mb-1" style={{ color: 'var(--text-primary)' }}>
                      {proj.title}
                    </h3>
                    <div className="text-xs font-semibold mb-4 font-mono" style={{ color: 'var(--text-muted)' }}>
                      {proj.role}
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                      {proj.description}
                    </p>
                  </div>

                  {/* Tech stack pills & duration */}
                  <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                          style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                      🕒 {proj.duration}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  );
}
