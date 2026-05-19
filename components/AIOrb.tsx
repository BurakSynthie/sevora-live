"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, Sparkles } from "@react-three/drei";
import { memo, useMemo, useRef } from "react";
import * as THREE from "three";

function OrbCore() {
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (core.current) {
      core.current.rotation.y = t * 0.6;
      core.current.rotation.x = Math.sin(t * 0.5) * 0.25;
    }
    if (ring.current) {
      ring.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.4) * 0.2;
      ring.current.rotation.z = t * 0.45;
    }
  });

  const waveA = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => {
      const x = -5.8 + (i / 119) * 11.6;
      const y = Math.sin(i * 0.22) * 0.34;
      return new THREE.Vector3(x, y, 0);
    });
  }, []);

  const waveB = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => {
      const x = -5.8 + (i / 119) * 11.6;
      const y = Math.cos(i * 0.19) * 0.26;
      return new THREE.Vector3(x, y, -0.2);
    });
  }, []);

  return (
    <group>
      <Line points={waveA} color="#38bdf8" transparent opacity={0.72} lineWidth={1.4} />
      <Line points={waveB} color="#a855f7" transparent opacity={0.72} lineWidth={1.2} />
      <Float speed={2.2} rotationIntensity={0.18} floatIntensity={0.25}>
        <mesh ref={core}>
          <sphereGeometry args={[1.05, 64, 64]} />
          <meshStandardMaterial color="#24145a" emissive="#7c3aed" emissiveIntensity={0.8} roughness={0.22} metalness={0.48} transparent opacity={0.92} />
        </mesh>
        <mesh ref={ring}>
          <torusGeometry args={[1.45, 0.025, 16, 120]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.65} />
        </mesh>
      </Float>
    </group>
  );
}

function AIOrb() {
  return (
    <Canvas dpr={[1, 1.7]} camera={{ position: [0, 0, 7.5], fov: 42 }}>
      <color attach="background" args={["#040b18"]} />
      <ambientLight intensity={0.56} />
      <pointLight position={[0, 0, 5]} intensity={12} color="#a855f7" />
      <pointLight position={[-3, 2, 3]} intensity={8} color="#38bdf8" />
      <Sparkles count={180} speed={0.35} scale={[9, 3, 3]} size={1.5} color="#a78bfa" opacity={0.38} />
      <OrbCore />
    </Canvas>
  );
}

export default memo(AIOrb);
