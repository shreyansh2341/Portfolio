import React from 'react';
import { motion } from 'framer-motion';
import { Download, Terminal, Server, Database, Cpu, Award, BookOpen, Eye } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const STATS = [
  { emoji: '🚀', value: '8+', label: 'Projects' },
  { emoji: '💼', value: '2+', label: 'Internships' },
  { emoji: '🏆', value: '4+', label: 'Certificates' },
  { emoji: '📚', value: '8.15', label: 'CGPA' },
];

const SKILLS = [
  {
    icon: Terminal, title: 'Frontend & Coding', color: '#00d9ff',
    items: ['React.js', 'TailwindCSS', 'Redux', 'ES6+ JS', 'Python', 'C/C++'],
  },
  {
    icon: Server, title: 'Backend & APIs', color: '#f59e0b',
    items: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'OAuth 2.0', 'MVC'],
  },
  {
    icon: Database, title: 'Database & ML', color: '#10b981',
    items: ['MongoDB', 'Mongoose ODM', 'Aggregation', 'Pandas', 'NumPy'],
  },
  {
    icon: Cpu, title: 'DevOps & AI/IoT', color: '#a78bfa',
    items: ['Git/GitHub', 'Vercel', 'Heroku', 'Postman', 'ESP32 IoT', 'NLP'],
  },
];

const EDUCATION = [
  {
    year: '2022 - 2026',
    title: 'B.E. Computer Science (AI & ML)',
    institution: 'ARMIET · Mumbai University',
    score: 'CGPA: 8.15 / 10',
  },
  {
    year: '2021',
    title: 'HSC (12th Grade) · ISC Board',
    institution: 'St. Joseph Montessori School · Lucknow',
    score: 'Score: 89.27%',
  },
  {
    year: '2019',
    title: 'SSC (10th Grade) · ICSE Board',
    institution: 'St. Joseph Montessori School · Lucknow',
    score: 'Score: 83.0%',
  },
];

const CERTS = [
  {
    title: 'HTML Certification',
    description: 'Demonstrates strong foundational knowledge in web markup and structure.',
    link: '/certificates/HTML_Certification.jpeg'
  },
  {
    title: 'CSS Certification',
    description: 'Demonstrates proficiency in styling, layout, and responsive web design.',
    link: '/certificates/CSS_Certification.jpeg'
  },
  {
    title: 'Python Certification',
    description: 'Covers fundamental Python programming concepts, data structures, and algorithms.',
    link: '/certificates/Python Certificate.pdf'
  },
  {
    title: 'Software Developer Internship',
    description: 'Internship certificate from Technewity Labs for my role as a Software Developer Intern.',
    link: '/certificates/Shreyansh _Internship.pdf'
  },
  {
    title: 'Tata Crucible Prelims Level 1',
    description: 'Successfully cleared the preliminary Level 1 of the prestigious Tata Crucible Hackathon/Quiz.',
    link: '/certificates/Shreyansh_Tata_Cruible_Prelims_Level1.pdf'
  },
  {
    title: 'Professional Certification',
    description: 'General certification validating professional skills and competencies.',
    link: '/certificates/Shreyansh Rai_Certificate.pdf'
  }
];

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <p className="font-mono text-xs tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
            Get to know me
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gradient-shimmer">About Me</h1>
        </motion.div>

        {/* Bio + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 glass-card rounded-2xl p-8"
          >
            <h2 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Shreyansh Rai
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              I am a passionate software engineer based in Kalyan, Maharashtra. Bridging system architecture design and machine learning, I engineer complete products from scratch.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              As a Software Developer Intern at Technewity Labs, I led the frontend logic of ACCU DESIGN and built 15+ backend controllers. I'm currently pursuing B.E. in Computer Science (AI & ML) at ARMIET, Mumbai University.
            </p>

            {/* Status badge */}
            <div
              className="inline-flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Status</div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Open to Work / Internships</div>
              </div>
            </div>
          </motion.div>

          {/* Stats grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="glass-card rounded-xl p-4 text-center"
              >
                <div className="text-2xl mb-1">{stat.emoji}</div>
                <div className="font-display text-xl font-bold text-gradient-cyan">{stat.value}</div>
                <div className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Skills & Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-2xl"
                style={{ '--hover-color': '#00d9ff' }}
              >
                <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2" style={{ color: skill.color }}>
                  <skill.icon className="w-5 h-5" /> {skill.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((s) => (
                    <span
                      key={s}
                      className="py-1 px-3 rounded-full text-xs font-mono"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Education</h2>
          <div className="space-y-10 relative border-l pl-6 ml-3" style={{ borderColor: 'var(--border)' }}>
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div
                  className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full"
                  style={{ background: 'var(--cyan)', boxShadow: '0 0 10px rgba(0,217,255,0.4)' }}
                />
                <span className="text-xs font-semibold font-mono" style={{ color: 'var(--amber)' }}>{edu.year}</span>
                <h3 className="font-display text-lg font-bold mt-1" style={{ color: 'var(--text-primary)' }}>{edu.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{edu.institution}</p>
                <span
                  className="text-xs font-medium mt-1 inline-block px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(0,217,255,0.08)',
                    border: '1px solid rgba(0,217,255,0.2)',
                    color: 'var(--cyan)',
                  }}
                >
                  {edu.score}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Certifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CERTS.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-xl p-5 flex flex-col gap-2 hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--amber)' }} />
                  <h3 className="font-display text-base font-bold" style={{ color: 'var(--text-primary)' }}>{cert.title}</h3>
                </div>
                <p className="text-sm mt-2 leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                  {cert.description}
                </p>
                <div className="mt-3 flex">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-btn inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-semibold text-xs cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,217,255,0.15), rgba(167,139,250,0.15))',
                      border: '1px solid rgba(0,217,255,0.3)',
                      color: 'var(--cyan)',
                    }}
                  >
                    <Eye className="w-3.5 h-3.5" /> View Certificate
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resume Download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Resume Buttons */}
            <div className="flex flex-col items-center gap-3">
              <div className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Resume</div>
              <div className="flex gap-2">
                <a
                  href="/pdfs/Shreyansh_Rai_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,217,255,0.15), rgba(167,139,250,0.15))',
                    border: '1px solid rgba(0,217,255,0.3)',
                    color: 'var(--cyan)',
                  }}
                >
                  <Eye className="w-4 h-4" /> View
                </a>
                <a
                  href="/pdfs/Shreyansh_Rai_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="glow-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer"
                  style={{
                    border: '1px solid rgba(0,217,255,0.3)',
                    background: 'rgba(0,217,255,0.05)',
                    color: 'var(--cyan)',
                  }}
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            </div>

            {/* CV Buttons */}
            <div className="flex flex-col items-center gap-3">
              <div className="text-xs font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Curriculum Vitae</div>
              <div className="flex gap-2">
                <a
                  href="/pdfs/Shreyansh_Rai_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.15))',
                    border: '1px solid rgba(245,158,11,0.3)',
                    color: 'var(--amber)',
                  }}
                >
                  <Eye className="w-4 h-4" /> View
                </a>
                <a
                  href="/pdfs/Shreyansh_Rai_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="glow-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm cursor-pointer"
                  style={{
                    border: '1px solid rgba(245,158,11,0.3)',
                    background: 'rgba(245,158,11,0.05)',
                    color: 'var(--amber)',
                  }}
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
