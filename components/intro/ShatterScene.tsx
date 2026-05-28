'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Each fragment: a small plane that flies outward
function Fragment({ velocity }: { delay: number; velocity: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null);
  const startY = (Math.random() - 0.5) * 0.8;
  const startX = (Math.random() - 0.5) * 4;

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.addScaledVector(velocity, 0.022);
    ref.current.rotation.x += 0.04 + Math.random() * 0.02;
    ref.current.rotation.z += 0.03;
    const mat = ref.current.material as THREE.MeshPhysicalMaterial;
    mat.opacity = Math.max(0, mat.opacity - 0.018);
  });

  return (
    <mesh ref={ref} position={[startX, startY, 0]}>
      <planeGeometry args={[
        0.15 + Math.random() * 0.25,
        0.08 + Math.random() * 0.18,
      ]} />
      <meshPhysicalMaterial
        transmission={0.8}
        roughness={0.05}
        color="#d4c4a0"
        transparent
        opacity={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Fragments() {
  const fragments = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      delay: Math.random() * 0.2,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.18,
        (Math.random() - 0.5) * 0.14,
        (Math.random() - 0.3) * 0.06,
      ),
    })),
  []);

  return (
    <>
      {fragments.map(f => (
        <Fragment key={f.id} delay={f.delay} velocity={f.velocity} />
      ))}
    </>
  );
}

export default function ShatterScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 3]} intensity={2} color="#c8a96e" />
      <Fragments />
    </Canvas>
  );
}
