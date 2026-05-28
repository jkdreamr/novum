'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

function Orb() {
  const torusRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.4;
      torusRef.current.rotation.y = t * 0.25;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
    }
  });

  return (
    <>
      <mesh ref={torusRef}>
        <torusGeometry args={[1.1, 0.06, 16, 100]} />
        <meshPhysicalMaterial
          color="#c8a96e"
          metalness={0.7}
          roughness={0.2}
          transmission={0.3}
          emissive="#c8a96e"
          emissiveIntensity={0.1}
        />
      </mesh>
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhysicalMaterial
          transmission={0.95}
          roughness={0.05}
          ior={1.5}
          thickness={0.4}
          color="#ddd0b8"
        />
      </mesh>
    </>
  );
}

export default function OrbScene() {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 2]} intensity={1} color="#c8a96e" />
      <Orb />
    </Canvas>
  );
}
