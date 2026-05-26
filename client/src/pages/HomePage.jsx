import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, FileText, MessageSquare } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { PROJECTS } from '../data/projects';

const ROLES = ['FULL STACK DEVELOPER', 'AI&ML ENGINEER', 'MERN STACK SPECIALIST'];

const TECH_ICONS = [
  { name: 'React', color: '#61DAFB', angle: 0 },
  { name: 'Node.js', color: '#339933', angle: 60 },
  { name: 'Python', color: '#3776AB', angle: 120 },
  { name: 'MongoDB', color: '#47A248', angle: 180 },
  { name: 'TensorFlow', color: '#FF6F00', angle: 240 },
  { name: 'Express', color: '#94a3b8', angle: 300 },
];


function FloatingTechIcon({ name, color, angle, radius = 320 }) {
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius * 0.65; // elliptical to avoid navbar overlap
  const dur = 4 + Math.random() * 3;
  const delay = (angle / 360) * 3;
  const [isDragging, setIsDragging] = useState(false);

  return (
    // Outer wrapper handles CSS positioning only
    <div
      className={isDragging ? 'absolute' : 'icon-float absolute'}
      style={{
        top: '50%', left: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        '--dur': `${dur}s`,
        '--delay': `${delay}s`,
        zIndex: isDragging ? 50 : 20,
        pointerEvents: 'auto',
      }}
    >
      {/* Inner motion.div — free drag with spring snap-back on release */}
      <motion.div
        className="flex flex-col items-center gap-1.5"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        drag
        dragSnapToOrigin
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        whileDrag={{ scale: 1.18, filter: `drop-shadow(0 0 18px ${color})` }}
      >
        <motion.div
          className="w-12 h-12 rounded-xl p-2 flex items-center justify-center shadow-lg backdrop-blur-sm"
          style={{
            background: `${color}25`,
            border: `2px solid ${color}70`,
            boxShadow: `0 0 20px ${color}30`,
          }}
          animate={isDragging ? { rotate: [0, -5, 5, -3, 0] } : {}}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <span className="text-sm font-bold" style={{ color }}>{name[0]}</span>
        </motion.div>
        <span className="text-xs font-display font-medium tracking-wide drop-shadow-md" style={{ color }}>{name}</span>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Concentric circles */}
        {[380, 600, 840, 1080].map((size, i) => (
          <div
            key={i}
            className="circle-bg hidden sm:block"
            style={{
              width: size, height: size,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.6 - i * 0.1,
            }}
          />
        ))}

        {/* Floating tech icons — draggable with snap-back */}
        <div className="hidden lg:block absolute inset-0 z-20 pointer-events-none">
          {TECH_ICONS.map((tech) => (
            <FloatingTechIcon key={tech.name} {...tech} />
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display tracking-[0.25em] uppercase mb-4 text-lg md:text-xl"
            style={{ color: 'var(--text-muted)' }}
          >
            Hello! I'm
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-5xl md:text-7xl font-bold mb-2 leading-none tracking-tight"
            style={{ color: 'var(--text-primary)' }}
          >
            Shreyansh Rai
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-display text-base md:text-xl tracking-wide mb-6"
            style={{ color: 'var(--text-muted)' }}
          >
            A passionate{' '}
            <span style={{ color: 'rgba(0,217,255,0.7)' }}>Full-Stack</span> &{' '}
            <span style={{ color: 'rgba(245,158,11,0.7)' }}>ML</span> Developer
          </motion.p>

          {/* Rotating role word */}
          <div className="mb-4 flex justify-center h-10 items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="font-display font-bold text-gradient-cyan block text-center text-3xl md:text-4xl leading-none tracking-[-0.02em]"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Dot pagination */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 mb-10"
          >
            {ROLES.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-350"
                style={{
                  height: 5,
                  width: i === roleIndex ? 28 : 5,
                  background: i === roleIndex ? 'var(--cyan)' : 'var(--border)',
                }}
              />
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-display text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            Building intelligent systems at the intersection of{' '}
            <span style={{ color: 'var(--text-secondary)' }}>full-stack development</span> and{' '}
            <span style={{ color: 'var(--text-secondary)' }}>machine learning</span>.
          </motion.p>

        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-16 sm:bottom-20 left-0 w-full flex justify-center items-center gap-4 flex-wrap px-6 z-30"
        >
          <Link
            to="/projects"
            className="glow-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold"
            style={{
              border: '1px solid rgba(0,217,255,0.28)',
              background: 'rgba(0,217,255,0.05)',
              color: 'rgba(0,217,255,0.85)',
            }}
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="glow-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold"
            style={{
              border: '1px solid rgba(245,158,11,0.25)',
              background: 'rgba(245,158,11,0.05)',
              color: 'rgba(245,158,11,0.85)',
            }}
          >
            <FileText className="w-3.5 h-3.5" /> Resume & CV
          </Link>
          <Link
            to="/contact"
            className="glow-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold"
            style={{
              border: '1px solid rgba(167,139,250,0.25)',
              background: 'rgba(167,139,250,0.05)',
              color: 'rgba(167,139,250,0.85)',
            }}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Get in Touch
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none" style={{ opacity: 0.25 }}>
          <span className="text-[10px] tracking-[0.2em] uppercase font-sans" style={{ color: 'var(--text-primary)' }}>Scroll</span>
          <div className="w-px h-8" style={{ background: 'var(--text-primary)' }} />
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="pt-28 pb-12 px-6">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="font-mono text-xs tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Featured Work</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>Projects</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROJECTS.slice(0, 3).map((proj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="proj-card rounded-2xl p-6 flex flex-col gap-3 relative overflow-hidden group transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${proj.color}18`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = proj.color;
                  e.currentTarget.style.boxShadow = `0 12px 32px ${proj.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${proj.color}18`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Dynamic colored accent bar at top */}
                <div 
                  className="absolute top-0 left-0 right-0 h-0.75 transition-all duration-500 group-hover:h-1.5"
                  style={{ background: proj.color }}
                />

                {/* Decorative glow aura in background on hover */}
                <div 
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2.5xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                  style={{ background: proj.color }}
                />

                <div className="w-8 h-0.5 rounded-full z-10" style={{ background: proj.color }} />
                <h3 className="font-semibold text-lg z-10" style={{ color: 'var(--text-primary)' }}>{proj.title}</h3>
                <p className="text-sm leading-relaxed flex-1 line-clamp-3 z-10" style={{ color: 'var(--text-secondary)' }}>{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 z-10">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded-full font-mono font-semibold"
                      style={{
                        background: `${proj.color}15`,
                        color: proj.color,
                        border: `1px solid ${proj.color}32`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              to="/projects"
              className="glow-btn inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold"
              style={{
                border: '1px solid rgba(0,217,255,0.28)',
                background: 'rgba(0,217,255,0.05)',
                color: 'rgba(0,217,255,0.8)',
              }}
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-4xl mx-auto h-px" style={{ background: 'var(--border)' }} />

      {/* About Preview */}
      <section className="pt-12 pb-28 px-6">
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="font-mono text-xs tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Who I Am</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>About Me</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Location card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl relative overflow-hidden min-h-[200px]"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 70% 60%, rgba(0,217,255,0.08) 0%, transparent 65%)',
              }} />
              <div className="p-6 flex flex-col justify-between h-full relative z-10">
                <p className="font-mono text-xs flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                  📍 LOCATION
                </p>
                <div>
                  <div className="font-display font-bold text-3xl mb-1.5" style={{ color: 'var(--text-primary)' }}>INDIA</div>
                  <div className="font-mono text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Kalyan, Maharashtra — GMT+5:30</div>
                  <div className="font-mono text-[11px] mb-1.5" style={{ color: 'var(--cyan)' }}>ARMIET Engineering (Mumbai University)</div>
                  <div className="font-mono text-[10px] flex items-center gap-1.5" style={{ color: 'var(--amber)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                    Open to global relocation & remote roles
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bio card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl p-6 flex flex-col justify-between gap-4 min-h-[200px]"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <div>
                <p className="font-mono text-xs tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>/ ABOUT</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  I'm Shreyansh — a CS student at ARMIET (Mumbai University) building at the intersection of full-stack systems and machine learning. I specialize in MERN architectures, RESTful API design, database query optimizations, and deep learning security models. I care deeply about writing clean, maintainable code that drives real-world value.
                </p>
              </div>
              <p className="text-xs italic border-t pt-4" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                "From curiosity to code — engineering complete, maintainable products from scratch."
              </p>
            </motion.div>
          </div>

          {/* Trait cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'GROWTH', color: '#a78bfa', desc: 'Continuous learning path. Driven by technical curiosity, exploring modern software architectures and machine learning models.' },
              { label: 'FOCUS', color: '#00d9ff', desc: 'Deep work on engineering logic, optimizing database indexes, and securing tokenized access guards.' },
              { label: 'CRAFT', color: '#f59e0b', desc: 'Discipline in code. Creating maintainable structures, reusable templates, and polished responsive interfaces.' },
            ].map((trait, i) => (
              <motion.div
                key={trait.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-4"
                style={{
                  background: `${trait.color}0d`,
                  border: `1px solid ${trait.color}30`,
                }}
              >
                <div className="text-xs font-bold tracking-widest mb-2 font-mono" style={{ color: trait.color }}>{trait.label}</div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{trait.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link
              to="/about"
              className="glow-btn inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold"
              style={{
                border: '1px solid rgba(0,217,255,0.28)',
                background: 'rgba(0,217,255,0.05)',
                color: 'rgba(0,217,255,0.8)',
              }}
            >
              View Full Profile <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
