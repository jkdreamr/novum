'use client';
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

const SHARD_COUNT = 120;
const GRAVITY = 1.3;

interface Shard {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  spin: THREE.Vector3;
  rot: THREE.Euler;
  scale: number;
  delay: number;
}

function Shards() {
  // One small triangular shard geometry shared by every fragment.
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const verts = new Float32Array([-0.5, -0.35, 0, 0.55, -0.2, 0, 0.0, 0.5, 0]);
    g.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    g.computeVertexNormals();
    return g;
  }, []);

  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const startRef = useRef<number | null>(null);

  const shards = useMemo<Shard[]>(() =>
    Array.from({ length: SHARD_COUNT }, () => {
      // Origin sampled across the WORD'S footprint, so shards burst from where the glass text was.
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 3.0,   // ~ width of "novum"
        (Math.random() - 0.5) * 1.0,   // ~ cap height
        (Math.random() - 0.5) * 0.35,  // ~ extrusion depth
      );
      // Velocity radiates outward from the centre, biased upward and toward the camera (splatter).
      const dir = pos.clone().normalize();
      const speed = 1.7 + Math.random() * 2.4;
      const vel = dir.multiplyScalar(speed).add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 1.0,
          0.5 + Math.random() * 0.9,
          0.9 + Math.random() * 1.8,
        ),
      );
      return {
        pos,
        vel,
        spin: new THREE.Vector3((Math.random() - 0.5) * 7, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 7),
        rot: new THREE.Euler(Math.random() * 6, Math.random() * 6, Math.random() * 6),
        scale: 0.07 + Math.random() * 0.18,
        // shards near the centre go first → the burst ripples outward from the word
        delay: pos.length() * 0.045 + Math.random() * 0.03,
      };
    }),
  []);

  useFrame(({ clock }) => {
    if (startRef.current === null) startRef.current = clock.elapsedTime;
    const t = clock.elapsedTime - startRef.current;
    for (let i = 0; i < shards.length; i++) {
      const m = meshes.current[i];
      const s = shards[i];
      if (!m) continue;
      const lt = t - s.delay;
      if (lt <= 0) {
        m.scale.setScalar(0);
        continue;
      }
      m.position.set(
        s.pos.x + s.vel.x * lt,
        s.pos.y + s.vel.y * lt - 0.5 * GRAVITY * lt * lt,
        s.pos.z + s.vel.z * lt,
      );
      m.rotation.set(s.rot.x + s.spin.x * lt, s.rot.y + s.spin.y * lt, s.rot.z + s.spin.z * lt);
      m.scale.setScalar(s.scale);
      (m.material as THREE.MeshPhysicalMaterial).opacity = THREE.MathUtils.clamp(1 - (lt - 0.25) / 1.4, 0, 1);
    }
  });

  return (
    <group>
      {shards.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => { meshes.current[i] = el; }}
          geometry={geom}
          position={s.pos.toArray()}
        >
          <meshPhysicalMaterial
            color="#ecdcb8"
            roughness={0.12}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2.4}
            emissive="#2a2110"
            emissiveIntensity={0.4}
            transparent
            opacity={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ShatterScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[2, 3, 4]} intensity={2.2} color="#fff0d0" />
      <pointLight position={[-3, -1, 2]} intensity={1} color="#1e7a72" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.5} color="#fff4e0" position={[0, 2, 4]} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#c8a96e" position={[-3, 0, 2]} scale={[3, 3, 1]} />
      </Environment>
      <Shards />
    </Canvas>
  );
}
