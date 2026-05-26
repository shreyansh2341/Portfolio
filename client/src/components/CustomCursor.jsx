import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const glassRef = useRef(null);
  const glowRef = useRef(null);
  const trailRefs = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const positions = useRef({ dot: { x: 0, y: 0 }, glass: { x: 0, y: 0 }, glow: { x: 0, y: 0 } });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // Read CSS variable values for theme-reactive cursor
    const getStyle = (varName) => {
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    };

    let raf;
    const animate = () => {
      const { x, y } = mouse.current;

      // Dot follows tightly
      positions.current.dot.x += (x - positions.current.dot.x) * 0.35;
      positions.current.dot.y += (y - positions.current.dot.y) * 0.35;

      // Glass bubble follows with spring
      positions.current.glass.x += (x - positions.current.glass.x) * 0.15;
      positions.current.glass.y += (y - positions.current.glass.y) * 0.15;

      // Glow follows loosely
      positions.current.glow.x += (x - positions.current.glow.x) * 0.08;
      positions.current.glow.y += (y - positions.current.glow.y) * 0.08;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${positions.current.dot.x - 4}px, ${positions.current.dot.y - 4}px)`;
        dotRef.current.style.background = getStyle('--cursor-dot');
        dotRef.current.style.boxShadow = `0 0 8px ${getStyle('--cursor-dot-shadow')}`;
      }
      if (glassRef.current) {
        glassRef.current.style.transform = `translate(${positions.current.glass.x - 20}px, ${positions.current.glass.y - 20}px)`;
        glassRef.current.style.background = getStyle('--cursor-glass-bg');
        glassRef.current.style.borderColor = getStyle('--cursor-glass-border');
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${positions.current.glow.x - 50}px, ${positions.current.glow.y - 50}px)`;
        glowRef.current.style.background = `radial-gradient(circle, ${getStyle('--cursor-glow')} 0%, transparent 65%)`;
      }

      // Trail particles
      const trailRgb = getStyle('--cursor-trail');
      trailRefs.current.forEach((trail, i) => {
        if (!trail) return;
        const px = positions.current.glow.x + Math.sin(Date.now() * 0.003 + i * 1.2) * 15;
        const py = positions.current.glow.y + Math.cos(Date.now() * 0.003 + i * 1.2) * 15;
        trail.style.transform = `translate(${px - 3}px, ${py - 3}px)`;
        trail.style.opacity = 0.3 - i * 0.07;
        trail.style.background = `rgba(${trailRgb}, ${0.4 - i * 0.08})`;
      });

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer glow aura */}
      <div
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 100, height: 100,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99997,
          willChange: 'transform',
          background: 'radial-gradient(circle, var(--cursor-glow) 0%, transparent 65%)',
          filter: 'blur(4px)',
        }}
      />

      {/* Glass bubble */}
      <div
        ref={glassRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
          backdropFilter: 'blur(4px) saturate(150%)',
          WebkitBackdropFilter: 'blur(4px) saturate(150%)',
          background: 'var(--cursor-glass-bg)',
          border: '1px solid var(--cursor-glass-border)',
          boxShadow: `inset 0 1px 0 var(--cursor-glass-highlight), 0 0 12px var(--cursor-glow)`,
        }}
      >
        {/* Glass highlight */}
        <div style={{
          position: 'absolute',
          top: 7, left: 9,
          width: 10, height: 3,
          borderRadius: '50%',
          background: 'var(--cursor-glass-highlight)',
          filter: 'blur(1.5px)',
          transform: 'rotate(-20deg)',
        }} />
      </div>

      {/* Center dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          background: 'var(--cursor-dot)',
          boxShadow: `0 0 8px var(--cursor-dot-shadow)`,
        }}
      />

      {/* Trail particles */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          style={{
            position: 'fixed',
            top: 0, left: 0,
            width: 6, height: 6,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 99996,
            willChange: 'transform',
            background: `rgba(var(--cursor-trail), ${0.4 - i * 0.08})`,
            filter: `blur(${1 + i}px)`,
          }}
        />
      ))}
    </>
  );
}
