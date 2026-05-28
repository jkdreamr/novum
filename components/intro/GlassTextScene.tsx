'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Fallback: three box meshes spelling "novum" since font JSON conversion
// may not be available at build time (as noted in spec §4)
function GlassBoxLetters() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.08;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.04;
  });

  const material = (
    <meshPhysicalMaterial
      transmission={1}
      roughness={0.04}
      metalness={0}
      ior={1.52}
      thickness={0.6}
      envMapIntensity={2.5}
      color="#e8dcc8"
      transparent
      opacity={0.95}
    />
  );

  // Approximate letter widths for "novum" — 5 letters
  const letterPositions = [-2.2, -1.1, 0, 1.1, 2.2];
  const letterSizes: [number, number, number][] = [
    [0.7, 1.1, 0.25], // n
    [0.55, 0.85, 0.25], // o
    [0.5, 1.1, 0.25],  // v
    [0.7, 0.85, 0.25], // u
    [0.85, 1.1, 0.25], // m
  ];

  return (
    <group ref={groupRef}>
      {letterPositions.map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <boxGeometry args={letterSizes[i]} />
          {material}
        </mesh>
      ))}
    </group>
  );
}

export default function GlassTextScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Environment preset="city" />
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={1.5} color="#c8a96e" />
      <pointLight position={[-4, -2, -4]} intensity={0.8} color="#1e7a72" />
      <Center>
        <GlassBoxLetters />
      </Center>
    </Canvas>
  );
}
