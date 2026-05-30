'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei';
import type { Mesh } from 'three';

function Glass({ shape }: { shape: 'gem' | 'knot' }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    // Slow continuous revolve (clamp dt so a tab refocus doesn't jump).
    const d = Math.min(dt, 0.05);
    ref.current.rotation.y += d * 0.35;
    ref.current.rotation.x += d * 0.13;
  });
  return (
    <mesh ref={ref} scale={1.45}>
      {shape === 'gem' ? (
        <icosahedronGeometry args={[1, 0]} />
      ) : (
        <torusKnotGeometry args={[0.6, 0.25, 160, 32]} />
      )}
      <MeshTransmissionMaterial
        transmission={1}
        thickness={1.1}
        roughness={0.05}
        ior={1.5}
        chromaticAberration={0.06}
        anisotropy={0.1}
        distortion={0.2}
        distortionScale={0.3}
        temporalDistortion={0}
        color="#ffffff"
      />
    </mesh>
  );
}

/**
 * Realistic transmissive glass, lit by a locally-built environment (Lightformers — no CDN/HDRI
 * fetch, which the network policy blocks). Capped DPR; rendered only on desktop and only when in
 * view (see GlassIcon). Wrapped by an ErrorBoundary that falls back to the CSS mark.
 */
export default function GlassScene({ shape }: { shape: 'gem' | 'knot' }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 28 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 4]} intensity={1.1} />
      <Glass shape={shape} />
      <Environment resolution={128}>
        <Lightformer intensity={2.2} position={[0, 2, 4]} scale={[6, 6, 1]} />
        <Lightformer intensity={1.4} position={[-3, -1, 2]} scale={[5, 5, 1]} color="#EDE8DF" />
        <Lightformer intensity={1} position={[3, 1, -2]} scale={[4, 4, 1]} color="#C8FF5E" />
      </Environment>
    </Canvas>
  );
}
