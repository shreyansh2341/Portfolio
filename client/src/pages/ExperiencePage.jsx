import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const TITLES = [
  { text: 'Full-Stack Developer', color: '#00d9ff' },
  { text: 'AI & ML Engineer', color: '#f59e0b' },
  { text: 'MERN Stack Specialist', color: '#a78bfa' },
];

const EXPERIENCE = [
  {
    date: 'Jun 2024 – Current',
    company: 'Technewity Labs',
    role: 'Software Developer Intern',
    color: '#00d9ff',
    points: [
      'Led frontend development of ACCU DESIGN – a production-grade service marketplace platform.',
      'Developed 15+ backend controllers for user auth, analytics, and RBAC using Express.js & MongoDB.',
      'Integrated Razorpay payment gateway and built a real-time order tracking system.',
      'Designed RESTful API layer with JWT-based authentication and middleware architecture.',
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Razorpay', 'JWT'],
  },
  
  {
    date: '2024',
    company: 'accudesign.in',
    role: 'Full-Stack Lead',
    color: '#10b981',
    points: [
      'Architected end-to-end MERN stack service platform with multi-role access control.',
      'Implemented advanced aggregation pipelines for analytics and reporting dashboards.',
      'Deployed production build on Vercel + Render with CI/CD integration.',
    ],
    tech: ['React.js', 'MongoDB', 'Node.js', 'Vercel', 'Render'],
  },
];

export default function ExperiencePage() {
  const [focusIndex, setFocusIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);

  // Rotate focus text on interval
  useEffect(() => {
    const interval = setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % TITLES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Track scroll progress for timeline
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const top = rect.top;
      const height = rect.height;
      const viewH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewH - top) / (height + viewH * 0.5)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageTransition>
      <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
            Career & Growth
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-shimmer">Experience</h1>
        </motion.div>

        {/* Focus/Blur Role Titles — inspired by jatin-kevlani */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-20 flex flex-col items-start gap-3"
        >
          {TITLES.map((title, i) => (
            <div key={i} className="relative w-max" style={{ padding: '8px 14px' }}>
              {/* Bracket indicators — animated with layoutId */}
              <AnimatePresence>
                {i === focusIndex && (
                  <motion.div
                    className="bracket-box"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <span className="bracket tl" style={{ borderColor: title.color, filter: `drop-shadow(0 0 6px ${title.color})` }} />
                    <span className="bracket tr" style={{ borderColor: title.color, filter: `drop-shadow(0 0 6px ${title.color})` }} />
                    <span className="bracket bl" style={{ borderColor: title.color, filter: `drop-shadow(0 0 6px ${title.color})` }} />
                    <span className="bracket br" style={{ borderColor: title.color, filter: `drop-shadow(0 0 6px ${title.color})` }} />
                  </motion.div>
                )}
              </AnimatePresence>
              <h2
                className={`font-display text-2xl md:text-4xl font-bold transition-all duration-500 ${
                  i === focusIndex ? 'focused' : 'blurred'
                } focus-text`}
                style={{
                  color: i === focusIndex ? title.color : 'var(--text-muted)',
                }}
              >
                {title.text}
              </h2>
            </div>
          ))}
        </motion.div>

        {/* Scroll Timeline */}
        <div ref={timelineRef} className="relative pl-10 md:pl-14">
          {/* Background line */}
          <div className="timeline-line" />
          {/* Animated progress line */}
          <div
            className="timeline-progress"
            style={{ height: `${scrollProgress * 100}%` }}
          />

          <div className="space-y-16">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="timeline-dot" style={{ top: 4 }} />

                {/* Date pill */}
                <span
                  className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-3"
                  style={{
                    background: `${exp.color}12`,
                    border: `1px solid ${exp.color}25`,
                    color: exp.color,
                  }}
                >
                  {exp.date}
                </span>

                {/* Card */}
                <div
                  className="glass-card rounded-2xl p-6"
                  style={{ borderLeft: `3px solid ${exp.color}` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: exp.color }} />
                    <h3 className="font-display text-xs tracking-wider uppercase" style={{ color: exp.color }}>{exp.company}</h3>
                  </div>
                  <h4 className="font-display text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{exp.role}</h4>

                  <ul className="space-y-2 mb-5">
                    {exp.points.map((pt, j) => (
                      <li key={j} className="text-sm leading-relaxed flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                        <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{
                          background: `${exp.color}08`,
                          border: `1px solid ${exp.color}18`,
                          color: `${exp.color}`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
