import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', path: '/', color: 'var(--cyan)', hoverClass: 'hover:text-cyan', activeBg: 'rgba(var(--cyan-rgb), 0.08)', activeBorder: 'rgba(var(--cyan-rgb), 0.15)' },
  { label: 'About', path: '/about', color: 'var(--cyan)', hoverClass: 'hover:text-cyan', activeBg: 'rgba(var(--cyan-rgb), 0.08)', activeBorder: 'rgba(var(--cyan-rgb), 0.15)' },
  { label: 'Experience', path: '/experience', color: 'var(--cyan)', hoverClass: 'hover:text-cyan', activeBg: 'rgba(var(--cyan-rgb), 0.08)', activeBorder: 'rgba(var(--cyan-rgb), 0.15)' },
  { label: 'Projects', path: '/projects', color: 'var(--cyan)', hoverClass: 'hover:text-cyan', activeBg: 'rgba(var(--cyan-rgb), 0.08)', activeBorder: 'rgba(var(--cyan-rgb), 0.15)' },
  { label: 'Skills', path: '/skills', color: 'var(--cyan)', hoverClass: 'hover:text-cyan', activeBg: 'rgba(var(--cyan-rgb), 0.08)', activeBorder: 'rgba(var(--cyan-rgb), 0.15)' },
  { label: 'Contact', path: '/contact', color: 'var(--cyan)', hoverClass: 'hover:text-cyan', activeBg: 'rgba(var(--cyan-rgb), 0.08)', activeBorder: 'rgba(var(--cyan-rgb), 0.15)' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[10000] w-[92%] max-w-4xl">
        <div className="relative rounded-2xl">
          {/* Breathing glow border */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl animate-breathing"
            style={{
              background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(0,217,255,0.3), transparent 70%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: 1,
            }}
          />

          {/* Main nav bar */}
          <div className="glass-nav rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="font-display text-lg sm:text-xl font-bold" style={{ color: 'var(--cyan)' }}>
              SR<span className="text-gradient-cyan">.</span>
            </NavLink>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative text-xs font-semibold tracking-wider px-3 py-1.5 rounded-xl transition-colors duration-200 ${isActive
                      ? ''
                      : `text-[var(--text-secondary)] ${item.hoverClass}`
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? item.color : undefined,
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: item.activeBg,
                            border: `1px solid ${item.activeBorder}`,
                          }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label.toUpperCase()}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-4 h-4" style={{ color: 'var(--amber)' }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-4 h-4" style={{ color: 'var(--violet)' }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                ) : (
                  <Menu className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 overflow-hidden"
            >
              <div className="glass-nav rounded-2xl p-4 flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `text-sm font-semibold rounded-xl text-center py-3 px-4 transition-colors duration-200 ${isActive
                        ? ''
                        : `text-[var(--text-secondary)] ${item.hoverClass}`
                      }`
                    }
                    style={({ isActive }) => ({
                      color: isActive ? item.color : undefined,
                      background: isActive ? item.activeBg : 'transparent',
                      border: isActive ? `1px solid ${item.activeBorder}` : '1px solid transparent',
                    })}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
