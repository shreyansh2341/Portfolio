import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Home', path: '/', hoverColor: 'var(--cyan)' },
  { label: 'About', path: '/about', hoverColor: 'var(--amber)' },
  { label: 'Experience', path: '/experience', hoverColor: 'var(--violet)' },
  { label: 'Projects', path: '/projects', hoverColor: 'var(--cyan)' },
  { label: 'Skills', path: '/skills', hoverColor: 'var(--amber)' },
  { label: 'Contact', path: '/contact', hoverColor: 'var(--violet)' },
];

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/shreyansh2341', label: 'GitHub', hoverColor: 'var(--violet)', hoverBorder: 'rgba(var(--violet-rgb), 0.4)', hoverBg: 'rgba(var(--violet-rgb), 0.05)' },
  { icon: Linkedin, href: 'https://linkedin.com/in/shreyansh-rai-412578312', label: 'LinkedIn', hoverColor: 'var(--cyan)', hoverBorder: 'rgba(var(--cyan-rgb), 0.4)', hoverBg: 'rgba(var(--cyan-rgb), 0.05)' },
  { icon: Mail, href: 'mailto:shreyanshrai940@gmail.com', label: 'Email', hoverColor: 'var(--amber)', hoverBorder: 'rgba(var(--amber-rgb), 0.4)', hoverBg: 'rgba(var(--amber-rgb), 0.05)' },
];

function HoverLink({ to, children, hoverColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      className="text-sm inline-block transition-all duration-300"
      style={{
        color: hovered ? hoverColor : 'var(--text-secondary)',
        transform: hovered ? 'translateX(6px)' : 'translateX(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

function HoverSpan({ children, hoverColor, fontWeight }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="transition-colors duration-300 cursor-pointer"
      style={{
        color: hovered ? hoverColor : undefined,
        fontWeight: fontWeight || undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </span>
  );
}

function SocialIcon({ social }) {
  const [hovered, setHovered] = useState(false);
  const Icon = social.icon;
  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
      style={{
        background: hovered ? social.hoverBg : 'var(--bg-card)',
        border: `1px solid ${hovered ? social.hoverBorder : 'var(--border)'}`,
        color: hovered ? social.hoverColor : 'var(--text-secondary)',
        transform: hovered ? 'scale(1.1) translateY(-2px)' : 'scale(1) translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={social.label}
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

export default function Footer() {
  const [brandHovered, setBrandHovered] = useState(false);

  return (
    <footer
      className="w-full py-16 border-t"
      style={{
        background: 'var(--bg)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-display text-2xl font-bold inline-block mb-3 transition-all duration-300"
              style={{
                color: 'var(--cyan)',
                transform: brandHovered ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0)',
              }}
              onMouseEnter={() => setBrandHovered(true)}
              onMouseLeave={() => setBrandHovered(false)}
            >
              SR<span className="text-gradient-cyan">.</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <HoverSpan hoverColor="var(--cyan)" fontWeight="500">Full Stack Developer</HoverSpan> &amp;{' '}
              <HoverSpan hoverColor="var(--amber)" fontWeight="500">AI Engineer</HoverSpan> crafting modern{' '}
              <HoverSpan hoverColor="var(--violet)" fontWeight="500">web experiences</HoverSpan>.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h5
              className="font-mono text-xs uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Navigate
            </h5>
            <div className="grid grid-cols-2 gap-2">
              {FOOTER_LINKS.map((link) => (
                <HoverLink key={link.path} to={link.path} hoverColor={link.hoverColor}>
                  {link.label}
                </HoverLink>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h5
              className="font-mono text-xs uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              Connect
            </h5>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon key={social.label} social={social} />
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2026 <HoverSpan hoverColor="var(--cyan)">Shreyansh Rai</HoverSpan>. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Built with{' '}
            <HoverSpan hoverColor="var(--cyan)" fontWeight="600">React</HoverSpan>,{' '}
            <HoverSpan hoverColor="var(--amber)" fontWeight="600">Three.js</HoverSpan> &amp;{' '}
            <HoverSpan hoverColor="var(--violet)" fontWeight="600">Express.js</HoverSpan>
          </p>
        </div>
      </div>
    </footer>
  );
}
