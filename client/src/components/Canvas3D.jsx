import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Shared ref for document-level mouse position (normalized -1..1)
const globalMouse = { x: 0, y: 0 };

// Component to track mouse at document level (works even with pointer-events: none on canvas)
function MouseTracker() {
  useEffect(() => {
    const onMove = (e) => {
      globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return null;
}

function ParticleGlobe({ theme }) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const { viewport } = useThree();

  // Smooth cursor-following state
  const smoothPointer = useRef({ x: 0, y: 0 });
  const smoothPos = useRef({ x: 0, y: 0 });

  const position = useMemo(() => {
    return viewport.width > 7 ? [3, 0, 0] : [0, 0, 0];
  }, [viewport.width]);

  const scale = useMemo(() => {
    return viewport.width > 9 ? 2.2 : viewport.width > 7 ? 1.6 : 1.0;
  }, [viewport.width]);

  // Theme-aware colors
  const isLight = theme === 'light';
  const cyanColor = isLight ? '#0891b2' : '#00d9ff';
  const amberColor = isLight ? '#d97706' : '#f59e0b';
  const particleOpacity = isLight ? 0.55 : 0.7;
  const ringOpacity1 = isLight ? 0.1 : 0.15;
  const ringOpacity2 = isLight ? 0.07 : 0.1;
  const ringOpacity3 = isLight ? 0.05 : 0.08;
  const wireframeOpacity = isLight ? 0.03 : 0.04;

  // Fibonacci sphere distribution for even particle placement
  const particlePositions = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const r = 1;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Color: mix cyan and amber randomly
      const isCyan = Math.random() > 0.25;
      if (isCyan) {
        if (isLight) {
          colors[i * 3] = 0.03;
          colors[i * 3 + 1] = 0.57;
          colors[i * 3 + 2] = 0.7;
        } else {
          colors[i * 3] = 0;
          colors[i * 3 + 1] = 0.85;
          colors[i * 3 + 2] = 1.0;
        }
      } else {
        if (isLight) {
          colors[i * 3] = 0.85;
          colors[i * 3 + 1] = 0.47;
          colors[i * 3 + 2] = 0.02;
        } else {
          colors[i * 3] = 0.96;
          colors[i * 3 + 1] = 0.62;
          colors[i * 3 + 2] = 0.04;
        }
      }
    }
    return { positions: pos, colors };
  }, [isLight]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Smooth pointer lerp for cursor following
    smoothPointer.current.x += (globalMouse.x - smoothPointer.current.x) * 0.05;
    smoothPointer.current.y += (globalMouse.y - smoothPointer.current.y) * 0.05;

    if (groupRef.current) {
      // Base auto-rotation
      groupRef.current.rotation.y = time * 0.08;

      // Cursor-following tilt — both X and Y axes respond to pointer
      const targetRotX = smoothPointer.current.y * 0.3;
      const targetRotZ = -smoothPointer.current.x * 0.08;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * 0.03;

      // Magnetic position offset — globe subtly drifts toward the cursor
      const basePos = viewport.width > 7 ? 3 : 0;
      const magnetX = smoothPointer.current.x * 0.4;
      const magnetY = smoothPointer.current.y * 0.25 + Math.sin(time * 0.5) * 0.15;

      smoothPos.current.x += (magnetX - smoothPos.current.x) * 0.03;
      smoothPos.current.y += (magnetY - smoothPos.current.y) * 0.03;

      groupRef.current.position.x = basePos + smoothPos.current.x;
      groupRef.current.position.y = smoothPos.current.y;
    }

    if (ring1Ref.current) ring1Ref.current.rotation.x = Math.PI / 2;
    if (ring2Ref.current) ring2Ref.current.rotation.x = Math.PI / 3;
    if (ring3Ref.current) ring3Ref.current.rotation.z = Math.PI / 4;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Particle sphere */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particlePositions.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.018}
          sizeAttenuation
          transparent
          opacity={particleOpacity}
          depthWrite={false}
        />
      </points>

      {/* Latitude rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.02, 0.003, 8, 100]} />
        <meshBasicMaterial color={cyanColor} transparent opacity={ringOpacity1} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[0.85, 0.003, 8, 100]} />
        <meshBasicMaterial color={cyanColor} transparent opacity={ringOpacity2} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.15, 0.002, 8, 100]} />
        <meshBasicMaterial color={amberColor} transparent opacity={ringOpacity3} />
      </mesh>

      {/* Wireframe inner sphere */}
      <mesh>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial color={cyanColor} wireframe transparent opacity={wireframeOpacity} />
      </mesh>
    </group>
  );
}

function BackgroundParticles({ theme }) {
  const points = useRef();
  const count = 600;
  const isLight = theme === 'light';
  const bgParticleColor = isLight ? '#0891b2' : '#00d9ff';
  const bgParticleOpacity = isLight ? 0.08 : 0.12;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={bgParticleColor}
        size={0.02}
        sizeAttenuation
        transparent
        opacity={bgParticleOpacity}
        depthWrite={false}
      />
    </points>
  );
}

export default function Canvas3D({ theme }) {
  // Read CSS variable for grid opacity
  const gridOpacity = theme === 'light' ? 0.04 : 0.015;
  const glowColor = theme === 'light'
    ? 'radial-gradient(ellipse at 70% 30%, rgba(8,145,178,0.06) 0%, transparent 60%)'
    : 'radial-gradient(ellipse at 70% 30%, rgba(0,217,255,0.04) 0%, transparent 60%)';

  return (
    <div className="fixed inset-0" style={{ zIndex: -10, pointerEvents: 'none' }}>
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Top gradient glow */}
      <div
        className="absolute inset-0"
        style={{
          background: glowColor,
        }}
      />

      <Canvas camera={{ position: [0, 0, 5], fov: 55 }}>
        <ambientLight intensity={0.3} />
        <BackgroundParticles theme={theme} />
        <ParticleGlobe theme={theme} />
      </Canvas>
    </div>
  );
}
