"use client";

import { useRef } from 'react';
import { Canvas, useFrame, RootState } from '@react-three/fiber';
import { OrbitControls, MeshWobbleMaterial, Box, Sphere, Torus, Cylinder, Cone, Float } from '@react-three/drei';
import * as THREE from 'three';

function TurbineBladeModel() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Main shaft */}
        <Cylinder args={[0.3, 0.3, 3, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#3B82F6"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </Cylinder>

        {/* Turbine blades */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <group key={i} rotation={[0, 0, (angle * Math.PI) / 180]}>
            <Box args={[2, 0.1, 0.5]} position={[1, 0, i * 0.2 - 0.5]}>
              <meshStandardMaterial
                color="#06B6D4"
                metalness={0.95}
                roughness={0.05}
                emissive="#06B6D4"
                emissiveIntensity={0.1}
              />
            </Box>
          </group>
        ))}

        {/* Center hub */}
        <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#1E40AF"
            metalness={1}
            roughness={0}
            envMapIntensity={2}
          />
        </Sphere>

        {/* Detail rings */}
        {[-1, 0, 1].map((z, i) => (
          <Torus key={i} args={[0.6, 0.05, 16, 32]} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
              color="#67E8F9"
              metalness={0.9}
              roughness={0.1}
              emissive="#67E8F9"
              emissiveIntensity={0.2}
            />
          </Torus>
        ))}
      </group>
    </Float>
  );
}

function PrecisionGear() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.z -= 0.003;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2, 0, -1]}>
      <Cylinder args={[1.2, 1.2, 0.3, 24]}>
        <meshStandardMaterial
          color="#475569"
          metalness={0.95}
          roughness={0.15}
        />
      </Cylinder>
      {/* Gear teeth */}
      {Array.from({ length: 12 }, (_, i) => (
        <Box
          key={i}
          args={[0.2, 0.4, 0.3]}
          position={[
            Math.cos((i * Math.PI * 2) / 12) * 1.3,
            Math.sin((i * Math.PI * 2) / 12) * 1.3,
            0
          ]}
          rotation={[0, 0, (i * Math.PI * 2) / 12]}
        >
          <meshStandardMaterial
            color="#64748B"
            metalness={0.9}
            roughness={0.2}
          />
        </Box>
      ))}
    </mesh>
  );
}

function FloatingPart() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state: RootState) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={[2, 0.5, -0.5]}>
        <Cone args={[0.5, 1, 6]} rotation={[0, 0, Math.PI]}>
          <MeshWobbleMaterial
            color="#06B6D4"
            metalness={0.8}
            roughness={0.2}
            speed={2}
            factor={0.2}
          />
        </Cone>
      </mesh>
    </Float>
  );
}

export default function PrecisionPart({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#06B6D4" />
        <pointLight position={[0, 0, 0]} intensity={0.5} color="#3B82F6" />

        <TurbineBladeModel />
        <PrecisionGear />
        <FloatingPart />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />

        {/* Environment reflections */}
        <mesh visible={false}>
          <sphereGeometry args={[50, 32, 32]} />
          <meshBasicMaterial side={THREE.BackSide} color="#020617" />
        </mesh>
      </Canvas>
    </div>
  );
}