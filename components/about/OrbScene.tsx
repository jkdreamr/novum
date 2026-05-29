'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
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
        <torusGeometry args={[1.1, 0.06, 24, 120]} />
        <meshPhysicalMaterial color="#c8a96e" metalness={0.8} roughness={0.18} emissive="#3a2c12" emissiveIntensity={0.3} envMapIntensity={1.6} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshPhysicalMaterial transmission={0.95} roughness={0.06} ior={1.5} thickness={0.6} color="#e7dcc4" clearcoat={1} envMapIntensity={1.8} transparent />
      </mesh>
    </>
  );
}

export default function OrbScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={1.2} color="#c8a96e" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2} color="#fff3da" position={[0, 2, 3]} scale={[5, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#1e7a72" position={[-3, 0, 2]} scale={[2, 3, 1]} />
      </Environment>
      <Orb />
    </Canvas>
  );
}
