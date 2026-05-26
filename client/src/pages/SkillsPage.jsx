import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Server, Database, Cpu, Github, Activity, Code2, Heart, Award } from 'lucide-react';
import PageTransition from '../components/PageTransition';

// Custom Animated Counter for premium feel
function AnimatedCounter({ value, duration = 1.2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    // Extract numbers and suffixes
    const numericPart = parseFloat(value);
    const suffix = value.replace(/[0-9.]/g, '');

    if (isNaN(numericPart)) {
      setCount(value);
      return;
    }

    let start = 0;
    const end = numericPart;
    const isFloat = value.includes('.');
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Quadratic ease-out
      const easeProgress = progress * (2 - progress);
      const currentVal = start + (end - start) * easeProgress;

      setCount((isFloat ? currentVal.toFixed(2) : Math.floor(currentVal)) + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

// SVG Brand Icons
const ICONS = {
  react: (
    <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#00D9FF" strokeWidth="2" transform="rotate(0 50 50)" />
      <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#00D9FF" strokeWidth="2" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="50" rx="8" ry="20" stroke="#00D9FF" strokeWidth="2" transform="rotate(120 50 50)" />
      <circle cx="50" cy="50" r="4.5" fill="#00D9FF" />
    </svg>
  ),
  nodejs: (
    <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 15L23.2 30.5V61.5L50 77L76.8 61.5V30.5L50 15Z" stroke="#339933" strokeWidth="3" strokeLinejoin="round" />
      <path d="M50 15V77" stroke="#339933" strokeWidth="1.5" />
      <path d="M23.2 30.5L50 46L76.8 30.5" stroke="#339933" strokeWidth="1.5" />
    </svg>
  ),
  python: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 2C6.5 2 6.8 4.3 6.8 4.3L6.9 6.7H12V7.4H5C5 7.4 2 7.7 2 12.8C2 17.8 4.6 17.6 4.6 17.6L6 17.6V15.7C6 15.7 5.8 12.3 8.9 12.3H13.8C13.8 12.3 17 12.1 17 9V4.6C17 4.6 17.3 2 11.9 2Z" fill="#3776AB" />
      <path d="M12.1 22C17.5 22 17.2 19.7 17.2 19.7L17.1 17.3H12V16.6H19C19 16.6 22 16.3 22 11.2C22 6.2 19.4 6.4 19.4 6.4L18 6.4V8.3C18 8.3 18.2 11.7 15.1 11.7H10.2C10.2 10.2 7 10.4 7 13.5V17.9C7 17.9 6.7 20.5 12.1 22Z" fill="#FFE052" />
      <circle cx="9.2" cy="4.7" r="0.6" fill="#FFF" />
      <circle cx="14.8" cy="19.3" r="0.6" fill="#000" />
    </svg>
  ),
  mongodb: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 6 7 6 12C6 16.5 9 20 12 22C15 20 18 16.5 18 12C18 7 12 2 12 2Z" stroke="#47A248" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 2V22" stroke="#47A248" strokeWidth="1" />
      <path d="M10 12C10 12 11.5 13 12 13C12.5 13 14 12 14 12" stroke="#47A248" strokeWidth="1.5" />
    </svg>
  ),
  tensorflow: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7.2V16.8L12 22L21 16.8V7.2L12 2Z" stroke="#FF6F00" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 2V12M12 12L3 7.2M12 12L21 7.2M12 12L12 22" stroke="#FF6F00" strokeWidth="1" />
      <path d="M7.5 14.5L12 12L16.5 14.5" stroke="#FF6F00" strokeWidth="1.5" />
    </svg>
  ),
  express: (
    <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="25" width="70" height="50" rx="10" stroke="#ffffff" strokeWidth="4.5" />
      <text x="50" y="58" fill="#ffffff" fontSize="22" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EXP</text>
    </svg>
  ),
  typescript: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#3178C6" />
      <text x="18" y="19" fill="white" fontSize="11" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">TS</text>
    </svg>
  ),
  javascript: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <text x="18" y="19" fill="black" fontSize="11" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">JS</text>
    </svg>
  ),
  git: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 12L12 2.5L21.5 12L12 21.5L2.5 12Z" stroke="#F05032" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2" fill="#F05032" />
      <circle cx="8" cy="12" r="1.5" fill="#F05032" />
      <circle cx="16" cy="12" r="1.5" fill="#F05032" />
      <path d="M8 12H16" stroke="#F05032" strokeWidth="1.5" />
    </svg>
  ),
  tailwindcss: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6C9 6 7.2 7.5 6.6 10.5C7.5 9.3 8.7 8.7 10.2 8.7C12.3 8.7 13.8 9.9 14.8 11.3C16.5 13.5 18.2 15 21.2 15C24.2 15 26 13.5 26.6 10.5C25.7 11.7 24.5 12.3 23 12.3C20.9 12.3 19.4 11.1 18.4 9.7C16.7 7.5 15 6 12 6Z" fill="#38BDF8" transform="scale(0.8) translate(2, 2)" />
    </svg>
  ),
  cplusplus: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#00599C" strokeWidth="2" />
      <text x="12" y="16" fill="#00599C" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">C++</text>
    </svg>
  ),
  fastapi: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 12H9L7 22L22 10H14L16 2H12Z" fill="#059669" />
    </svg>
  ),
};

const MARQUEE_ROW_1 = [
  { name: 'React', icon: ICONS.react, color: '#00D9FF' },
  { name: 'Node.js', icon: ICONS.nodejs, color: '#339933' },
  { name: 'Python', icon: ICONS.python, color: '#3776AB' },
  { name: 'MongoDB', icon: ICONS.mongodb, color: '#47A248' },
  { name: 'TensorFlow', icon: ICONS.tensorflow, color: '#FF6F00' },
  { name: 'Express', icon: ICONS.express, color: '#ffffff' },
  { name: 'TypeScript', icon: ICONS.typescript, color: '#3178C6' },
  { name: 'TailwindCSS', icon: ICONS.tailwindcss, color: '#38BDF8' },
];

const MARQUEE_ROW_2 = [
  { name: 'Git', icon: ICONS.git, color: '#F05032' },
  { name: 'JavaScript', icon: ICONS.javascript, color: '#F7DF1E' },
  { name: 'C++', icon: ICONS.cplusplus, color: '#00599C' },
  { name: 'FastAPI', icon: ICONS.fastapi, color: '#059669' },
  { name: 'React', icon: ICONS.react, color: '#00D9FF' },
  { name: 'Node.js', icon: ICONS.nodejs, color: '#339933' },
  { name: 'MongoDB', icon: ICONS.mongodb, color: '#47A248' },
  { name: 'Python', icon: ICONS.python, color: '#3776AB' },
];

const SKILL_CATEGORIES = [
  {
    icon: Terminal,
    title: 'Languages & Core',
    color: '#00d9ff',
    desc: 'Foundational programming and scripting languages for algorithm design, data management, and system logic.',
    skills: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'C / C++', 'SQL', 'HTML5 & CSS3'],
  },
  {
    icon: Code2,
    title: 'Frontend Engineering',
    color: '#38bdf8',
    desc: 'Creating client interfaces that look beautiful and feel fluid. Optimizing bundle loads and routing schemes.',
    skills: ['React.js', 'Redux Toolkit', 'TailwindCSS', 'Framer Motion', 'Axios Client', 'Vite Bundler'],
  },
  {
    icon: Server,
    title: 'Backend & Server Control',
    color: '#f59e0b',
    desc: 'Architecting secure APIs, managing server logic controllers, and integrating authentication guards.',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'JWT Auth', 'Bcrypt Hashing', 'MVC Design Pattern'],
  },
  {
    icon: Database,
    title: 'Data Science & Databases',
    color: '#10b981',
    desc: 'Structuring relational schemas and query controllers, writing complex aggregations, and prepping data.',
    skills: ['MongoDB', 'MySQL', 'Mongoose ODM', 'Pandas', 'NumPy', 'Data Aggregations'],
  },
  {
    icon: Cpu,
    title: 'Machine Learning & IoT',
    color: '#ec4899',
    desc: 'Modeling neural architectures, deploying predictors, and programming microcontrollers for hardware tasks.',
    skills: ['TensorFlow', 'Keras', 'CNN Classifiers', 'LSTM & Autoencoders', 'Scikit-Learn', 'ESP32 IoT'],
  },
  {
    icon: Award,
    title: 'DevOps & Tooling',
    color: '#a78bfa',
    desc: 'Automating deployments, utilizing version repositories, performing API diagnostics, and quality testing.',
    skills: ['Git / GitHub', 'Vercel Deployment', 'Render / Heroku', 'Postman Client', 'ESLint', 'Git Workflows'],
  },
];

const STATS_CARDS = [
  { value: '10+', label: 'Github Repositories', emoji: '📁', color: '#00d9ff' },
  { value: '450+', label: 'Total Contributions', emoji: '🔥', color: '#f59e0b' },
  { value: '8.15', label: 'University CGPA', emoji: '🎓', color: '#10b981' },
  { value: '4+', label: 'Professional Certs', emoji: '📜', color: '#a78bfa' },
];

export default function SkillsPage() {
  return (
    <PageTransition>
      <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center md:text-left"
        >
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
            My Toolkit
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-shimmer">Skills &amp; Stats</h1>
          <p className="text-sm md:text-base mt-4 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            An animated overview of my technologies, development frameworks, and real-time open-source contribution metrics.
          </p>
        </motion.div>

        {/* Dual Scrolling Marquees (pszostak-inspired with wave-float & brand-colored glow) */}
        <div className="mb-20 space-y-6 overflow-hidden">
          <div className="marquee-container w-full py-2">
            <div className="marquee-track animate-marquee-reverse">
              {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, idx) => (
                <div
                  key={idx}
                  className="marquee-item-wave py-3"
                  style={{ '--wave-delay': `${idx * 0.3}s` }}
                >
                  <div
                    className="flex items-center gap-2.5 px-6 py-3 rounded-2xl glass-card border border-white/5 cursor-pointer transition-all duration-300"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = item.color;
                      e.currentTarget.style.boxShadow = `0 8px 28px ${item.color}30`;
                      e.currentTarget.style.background = `${item.color}08`;
                      e.currentTarget.style.transform = 'scale(1.06) translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'var(--bg-card)';
                      e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    }}
                  >
                    {item.icon}
                    <span className="text-sm font-mono font-medium" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="marquee-container w-full py-2">
            <div className="marquee-track animate-marquee">
              {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, idx) => (
                <div
                  key={idx}
                  className="marquee-item-wave py-3"
                  style={{ '--wave-delay': `${idx * -0.3}s` }}
                >
                  <div
                    className="flex items-center gap-2.5 px-6 py-3 rounded-2xl glass-card border border-white/5 cursor-pointer transition-all duration-300"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = item.color;
                      e.currentTarget.style.boxShadow = `0 8px 28px ${item.color}30`;
                      e.currentTarget.style.background = `${item.color}08`;
                      e.currentTarget.style.transform = 'scale(1.06) translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'var(--bg-card)';
                      e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    }}
                  >
                    {item.icon}
                    <span className="text-sm font-mono font-medium" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid with Count Animation */}
        <div className="mb-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center md:text-left" style={{ color: 'var(--text-primary)' }}>
            Key Metrics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS_CARDS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl border text-center flex flex-col justify-between"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--bg-card)',
                }}
              >
                <div className="text-3xl mb-3">{stat.emoji}</div>
                <div>
                  <div className="font-display text-2xl md:text-3xl font-bold mb-1.5" style={{ color: stat.color }}>
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories Grid (pszostak/bento style with animated pills) */}
        <div className="mb-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-10 text-center md:text-left" style={{ color: 'var(--text-primary)' }}>
            Detailed Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 2) * 0.15 }}
                  className="glass-card p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                  style={{
                    borderColor: 'var(--border)',
                    background: 'var(--bg-card)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = cat.color;
                    e.currentTarget.style.boxShadow = `0 12px 32px ${cat.color}15`;
                    e.currentTarget.style.background = `${cat.color}05`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.background = 'var(--bg-card)';
                  }}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div
                        className="p-3 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `${cat.color}12`,
                          border: `1px solid ${cat.color}25`,
                        }}
                      >
                        <IconComp className="w-5 h-5" style={{ color: cat.color }} />
                      </div>
                      <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                        {cat.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                      {cat.desc}
                    </p>
                  </div>

                  {/* Animated Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                    {cat.skills.map((skill, sIdx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: sIdx * 0.04, type: 'spring', stiffness: 220, damping: 14 }}
                        className="text-xs px-2.5 py-1 rounded-full font-mono transition-all duration-300"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-secondary)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = cat.color;
                          e.currentTarget.style.background = `${cat.color}15`;
                          e.currentTarget.style.color = '#ffffff';
                          e.currentTarget.style.boxShadow = `0 4px 12px ${cat.color}20`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border)';
                          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                          e.currentTarget.style.color = 'var(--text-secondary)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* GitHub Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t pt-20"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-primary mb-3">
              <span className="w-8 h-px bg-primary/40"></span>GitHub Activity<span className="w-8 h-px bg-primary/40"></span>
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Open Source Contributions
            </h2>
            <p className="text-sm mt-3 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
              A live reflection of my coding consistency, pull requests, and commit trends on GitHub.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <img
                src="https://img.shields.io/github/followers/shreyansh2341?style=for-the-badge&color=06b6d4&labelColor=0d0d14&label=FOLLOWERS"
                alt="followers badge"
                className="h-7 rounded-lg hover:scale-105 transition-all duration-300"
              />
              <img
                src="https://img.shields.io/github/stars/shreyansh2341?style=for-the-badge&color=f59e0b&labelColor=0d0d14&label=STARS"
                alt="stars badge"
                className="h-7 rounded-lg hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {/* Heatmap */}
            <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-1 block">
                  // heatmap
                </span>
                <h3 className="font-sora text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Contribution Grid
                </h3>
              </div>
              <div className="overflow-hidden rounded-xl bg-background/40 p-4 border border-white/5 flex items-center justify-center">
                <img
                  src="https://ghchart.rshah.org/3b82f6/shreyansh2341"
                  alt="GitHub activity chart"
                  className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex items-center gap-2 mt-4 justify-end">
                <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>Less</span>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-white/5"></div>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/20"></div>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/50"></div>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-primary/80"></div>
                <div className="w-[10px] h-[10px] rounded-[2px] bg-primary"></div>
                <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>More</span>
              </div>
            </div>

            {/* Streak & Info cards */}
            <div className="flex flex-col gap-6">
              <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden flex-1">
                <img
                  src="https://github-readme-stats.vercel.app/api?username=shreyansh2341&show_icons=true&theme=transparent&hide_border=true&title_color=00d9ff&icon_color=f59e0b&text_color=94a3b8&bg_color=00000000"
                  alt="GitHub stats card"
                  className="w-full h-auto"
                />
              </div>
              <div className="glass-card p-4 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden flex-1">
                <img
                  src="https://streak-stats.demolab.com/?user=shreyansh2341&theme=transparent&hide_border=true&ring=00d9ff&fire=f59e0b&currStreakLabel=00d9ff&sideLabels=00d9ff&dates=94a3b8&currStreakNum=e2e8f0&sideNums=e2e8f0&stroke=ffffff10&background=00000000"
                  alt="GitHub streak stats"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
