'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

// To use a real model, drop a CC0 philosopher bust at public/models/bust.glb
// and set this to '/models/bust.glb'. Otherwise the sculptural fallback renders.
const BUST_MODEL_URL: string | null = null;

const marble = {
  color: '#e7ddca',
  roughness: 0.62,
  metalness: 0.0,
  clearcoat: 0.35,
  clearcoatRoughness: 0.5,
};

function GLBModel({ url }: { url: string }) {
  const gltf = useGLTF(url);
  gltf.scene.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh) mesh.material = new THREE.MeshPhysicalMaterial(marble);
  });
  return <primitive object={gltf.scene} />;
}

// Elegant, Brancusi-like classical head + draped shoulders — reads as fine-art sculpture.
function SculpturalBust() {
  return (
    <group>
      {/* Cranium — softly elongated ovoid */}
      <mesh position={[0, 1.55, 0]} scale={[0.82, 1.05, 0.92]}>
        <sphereGeometry args={[0.78, 64, 64]} />
        <meshPhysicalMaterial {...marble} />
      </mesh>
      {/* Brow ridge */}
      <mesh position={[0, 1.6, 0.6]} rotation={[0.3, 0, 0]} scale={[0.62, 0.16, 0.3]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshPhysicalMaterial {...marble} />
      </mesh>
      {/* Nose ridge */}
      <mesh position={[0, 1.38, 0.82]} rotation={[0.32, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.11, 0.5, 16]} />
        <meshPhysicalMaterial {...marble} />
      </mesh>
      {/* Jaw / chin mass */}
      <mesh position={[0, 1.12, 0.32]} scale={[0.6, 0.55, 0.62]}>
        <sphereGeometry args={[0.6, 48, 48]} />
        <meshPhysicalMaterial {...marble} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.62, 0.05]}>
        <cylinderGeometry args={[0.26, 0.34, 0.8, 48]} />
        <meshPhysicalMaterial {...marble} />
      </mesh>
      {/* Shoulders / draped chest */}
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.95, 0.62, 1.25, 64]} />
        <meshPhysicalMaterial {...marble} color="#ddd2bd" />
      </mesh>
      {/* Carved base of the bust */}
      <mesh position={[0, -0.78, 0]}>
        <cylinderGeometry args={[0.82, 0.86, 0.18, 64]} />
        <meshPhysicalMaterial {...marble} color="#cfc4ad" />
      </mesh>
    </group>
  );
}

function Bust() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition();
  const spin = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;
    spin.current += 0.0025;
    const mx = mouse.current.x * 0.18;
    const my = mouse.current.y * 0.08;
    groupRef.current.rotation.y += (spin.current + mx - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (my - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef} position={[1.45, -1.35, 0]} scale={1.55}>
      {BUST_MODEL_URL ? (
        <Suspense fallback={<SculpturalBust />}>
          <GLBModel url={BUST_MODEL_URL} />
        </Suspense>
      ) : (
        <SculpturalBust />
      )}
    </group>
  );
}

export default function PhilosopherScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5.4], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <fog attach="fog" args={['#08080e', 7, 18]} />
      <ambientLight intensity={0.22} />
      {/* warm key, upper-right — the museum spotlight */}
      <directionalLight position={[4, 6, 3]} intensity={1.6} color="#fff1cf" />
      {/* teal rim from behind-left */}
      <pointLight position={[-4, 1, -3]} intensity={2.2} color="#1e7a72" />
      {/* dim warm fill */}
      <pointLight position={[1, -1, 4]} intensity={0.4} color="#c8a050" />
      <Suspense fallback={null}>
        <Bust />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={1.6} color="#fff1cf" position={[3, 4, 3]} scale={[5, 5, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#1e7a72" position={[-4, 1, -3]} scale={[3, 5, 1]} />
          <Lightformer form="circle" intensity={0.8} color="#ffffff" position={[0, 3, 2]} scale={3} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
