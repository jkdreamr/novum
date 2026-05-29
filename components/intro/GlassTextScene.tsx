'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Text3D, MeshTransmissionMaterial, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

// Real extruded 3D letterforms — a serif typeface JSON subset to just "novum" (see scripts/subset-font.mjs).
const FONT_URL = '/fonts/serif_novum.typeface.json';

function GlassWord() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    // gentle, dreamy float + subtle mouse parallax
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.13 + pointer.x * 0.12;
    ref.current.rotation.x = Math.sin(t * 0.27) * 0.05 - pointer.y * 0.08;
    ref.current.position.y = Math.sin(t * 0.6) * 0.035;
  });

  return (
    <group ref={ref}>
      <Center>
        <Text3D
          font={FONT_URL}
          size={0.85}
          height={0.4}
          curveSegments={20}
          bevelEnabled
          bevelThickness={0.05}
          bevelSize={0.03}
          bevelOffset={0}
          bevelSegments={10}
          letterSpacing={0.01}
        >
          novum
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={1024}
            thickness={0.55}
            roughness={0.05}
            chromaticAberration={0.45}
            distortion={0.15}
            distortionScale={0.3}
            temporalDistortion={0.08}
            ior={1.5}
            color="#f4ecd9"
            attenuationColor="#d8c39c"
            attenuationDistance={1.6}
            clearcoat={1}
            clearcoatRoughness={0.04}
            envMapIntensity={2.4}
          />
        </Text3D>
      </Center>
    </group>
  );
}

function StudioEnv() {
  return (
    <Environment resolution={256}>
      <Lightformer form="rect" intensity={3} color="#fff4e0" position={[0, 2, 4]} scale={[8, 4, 1]} />
      <Lightformer form="rect" intensity={1.6} color="#c8a96e" position={[-4, -1, 3]} rotation={[0, 0.4, 0]} scale={[3, 4, 1]} />
      <Lightformer form="rect" intensity={1.4} color="#1e7a72" position={[4, 1, -2]} rotation={[0, -0.4, 0]} scale={[3, 4, 1]} />
      <Lightformer form="circle" intensity={2} color="#ffffff" position={[0, 3, -4]} scale={4} />
    </Environment>
  );
}

export default function GlassTextScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#c8a96e" />
      <pointLight position={[-4, -2, 2]} intensity={0.8} color="#1e7a72" />
      <Suspense fallback={null}>
        <GlassWord />
        <StudioEnv />
      </Suspense>
    </Canvas>
  );
}
