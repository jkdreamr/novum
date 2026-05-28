'use client';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

function BustModel({ url }: { url: string }) {
  const gltf = useGLTF(url);

  // Apply patina material to all meshes
  gltf.scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#b8965a'),
        metalness: 0.35,
        roughness: 0.65,
      });
    }
  });

  return <primitive object={gltf.scene} />;
}

function Bust() {
  const groupRef  = useRef<THREE.Group>(null);
  const mouse     = useMousePosition();
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!groupRef.current) return;
    // Auto-rotate + mouse tracking (max ±8°)
    targetRot.current.y += 0.004;
    const mx = mouse.current.x * 0.14;
    const my = mouse.current.y * 0.08;
    groupRef.current.rotation.y += (targetRot.current.y + mx - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (my - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0.8, -0.5, 0]}>
      <Suspense fallback={<ProceduralBust />}>
        <BustModelWithFallback />
      </Suspense>
    </group>
  );
}

function BustModelWithFallback() {
  try {
    return <BustModel url="/models/bust.glb" />;
  } catch {
    return <ProceduralBust />;
  }
}

function ProceduralBust() {
  return (
    <>
      {/* Head */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshStandardMaterial color="#b8965a" metalness={0.35} roughness={0.65} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.78, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 0.6, 32]} />
        <meshStandardMaterial color="#b0905a" metalness={0.35} roughness={0.65} />
      </mesh>
      {/* Torso/shoulders */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.82, 0.72, 1.2, 32]} />
        <meshStandardMaterial color="#a88850" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Pedestal */}
      <mesh position={[0, -0.85, 0]}>
        <cylinderGeometry args={[0.55, 0.7, 0.8, 32]} />
        <meshStandardMaterial color="#8a7048" metalness={0.2} roughness={0.8} />
      </mesh>
    </>
  );
}

export default function PhilosopherScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 5.5], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <fog attach="fog" args={['#08080e', 8, 20]} />
      <ambientLight intensity={0.18} />
      {/* Key light — warm, top right */}
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.4}
        color="#fff3d0"
        castShadow
      />
      {/* Rim light — teal, behind left (Ancient Art Museum backlight) */}
      <pointLight position={[-3.5, 0.5, -3]} intensity={1.8} color="#1e7a72" />
      {/* Fill — very dim warm */}
      <pointLight position={[0, -1, 3]} intensity={0.3} color="#c8a050" />
      <Environment preset="night" />
      <Suspense fallback={null}>
        <Bust />
      </Suspense>
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.4}
        scale={6}
        blur={2.5}
        color="#000000"
      />
    </Canvas>
  );
}
