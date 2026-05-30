'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei';
import type { Mesh } from 'three';

function Glass({ shape }: { shape: 'gem' | 'knot' }) {
  const ref = useRef<Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    const d = Math.min(dt, 0.05);
    ref.current.rotation.y += d * 0.4;
    ref.current.rotation.x += d * 0.16;
  });
  return (
    <mesh ref={ref} scale={shape === 'gem' ? 1.05 : 0.95}>
      {shape === 'gem' ? (
        <icosahedronGeometry args={[1, 0]} />
      ) : (
        <torusKnotGeometry args={[0.62, 0.26, 180, 32]} />
      )}
      <MeshTransmissionMaterial
        samples={6}
        resolution={256}
        transmission={1}
        thickness={1.4}
        roughness={0.12}
        ior={1.45}
        chromaticAberration={0.04}
        distortion={0.1}
        distortionScale={0.2}
        temporalDistortion={0}
        clearcoat={1}
        clearcoatRoughness={0.1}
        color="#ffffff"
        attenuationColor="#EDE8DF"
        attenuationDistance={3}
      />
    </mesh>
  );
}

/**
 * Realistic transmissive glass on a FULLY TRANSPARENT canvas (no dark box — it floats on the ink
 * page). Lit by a local studio rig of drei Lightformers (no CDN/HDRI fetch, which the network
 * blocks) so the glass actually refracts and catches highlights instead of rendering black. The
 * camera frames the object with padding so it's never clipped. Capped DPR; lazy-mounted on desktop
 * only (see GlassIcon), with a CSS-mark error fallback.
 */
export default function GlassScene({ shape }: { shape: 'gem' | 'knot' }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.5], fov: 30 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent' }}
      onCreated={(state) => state.gl.setClearColor(0x000000, 0)}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} />
      <Glass shape={shape} />
      {/* Local studio environment — lights the glass, never shown as a backdrop (background off).
          Small resolution (128) keeps the cubemap render cheap so first paint is quick. */}
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={4} position={[0, 3, 3]} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={2} position={[-4, 0, 2]} scale={[3, 8, 1]} color="#EDE8DF" />
        <Lightformer form="rect" intensity={2.5} position={[0, 0, -5]} scale={[10, 10, 1]} />
        <Lightformer form="circle" intensity={3} position={[2, 2, 3]} scale={[2, 2, 1]} color="#C8FF5E" />
      </Environment>
    </Canvas>
  );
}
