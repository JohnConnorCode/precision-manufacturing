"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticlesSystem() {
  const ref = useRef<THREE.Points>(null);
  const particlesCount = 500;

  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      sizes[i] = Math.random() * 2;
    }

    return [positions, sizes];
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;

      // Pulse effect
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;

      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const originalY = (i % 10) - 5;
        positions[i3 + 1] = originalY + Math.sin(time + i * 0.1) * 0.1;
      }

      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} sizes={sizes}>
      <PointMaterial
        transparent
        color="#06B6D4"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

export default function ParticleField({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
        <ParticlesSystem />
      </Canvas>
    </div>
  );
}