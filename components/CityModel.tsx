"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { memo, useMemo, useRef } from "react";
import * as THREE from "three";

type Zone = {
  label: string;
  sub: string;
  value: string;
  x: number;
  z: number;
  color: string;
};

const zones: Zone[] = [
  { label: "QUIET ZONE", sub: "Work friendly", value: "28%", x: -4.6, z: -1.8, color: "#22c55e" },
  { label: "EVENT AREA", sub: "Festival active", value: "LIVE", x: 0.7, z: -3.7, color: "#a855f7" },
  { label: "BUSY CENTER", sub: "Crowd rising", value: "82%", x: 5.0, z: -1.1, color: "#fb3f70" },
  { label: "PARKING SIGNAL", sub: "Space found", value: "6 min", x: 2.2, z: 2.9, color: "#38bdf8" },
];

function AnimatedCamera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.16) * 1.2;
    state.camera.position.y = 9.2 + Math.sin(t * 0.22) * 0.25;
    state.camera.position.z = 10.6 + Math.cos(t * 0.18) * 0.7;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Ground() {
  const grid = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let i = -9; i <= 9; i++) {
      lines.push([new THREE.Vector3(-9, 0.01, i), new THREE.Vector3(9, 0.01, i)]);
      lines.push([new THREE.Vector3(i, 0.01, -9), new THREE.Vector3(i, 0.01, 9)]);
    }
    return lines;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial color="#061020" roughness={0.72} metalness={0.2} />
      </mesh>

      {grid.map((points, i) => (
        <Line key={i} points={points} color="#1e7592" transparent opacity={0.22} lineWidth={0.55} />
      ))}

      <Line
        points={[[-9, 0.05, -2.1], [-4, 0.05, -1.3], [1.8, 0.05, -2.7], [9, 0.05, -1.5]]}
        color="#67e8f9"
        transparent
        opacity={0.7}
        lineWidth={2}
      />
      <Line
        points={[[-8, 0.05, 3.9], [-2.2, 0.05, 2.7], [2.8, 0.05, 4.1], [8.8, 0.05, 2.4]]}
        color="#38bdf8"
        transparent
        opacity={0.55}
        lineWidth={2}
      />
      <Line
        points={[[-3.4, 0.05, -8.8], [-2.4, 0.05, -2], [-3.2, 0.05, 2.5], [-1.4, 0.05, 8.6]]}
        color="#67e8f9"
        transparent
        opacity={0.48}
        lineWidth={2}
      />
      <Line
        points={[[3.7, 0.05, -8], [2.8, 0.05, -3.2], [4.1, 0.05, 1.2], [3.1, 0.05, 8]]}
        color="#a78bfa"
        transparent
        opacity={0.45}
        lineWidth={2}
      />
    </group>
  );
}

function Building({ x, z, h, colorSeed }: { x: number; z: number; h: number; colorSeed: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const color = colorSeed % 5 === 0 ? "#0b2440" : colorSeed % 3 === 0 ? "#10243c" : "#0b1728";
  return (
    <group position={[x, h / 2, z]}>
      <mesh ref={mesh} castShadow receiveShadow>
        <boxGeometry args={[0.62, h, 0.62]} />
        <meshStandardMaterial color={color} metalness={0.38} roughness={0.42} emissive="#071a2d" emissiveIntensity={0.24} />
      </mesh>
      <mesh position={[0, h / 2 + 0.012, 0]}>
        <boxGeometry args={[0.64, 0.025, 0.64]} />
        <meshBasicMaterial color={colorSeed % 4 === 0 ? "#67e8f9" : "#1e40af"} transparent opacity={0.45} />
      </mesh>
      {Array.from({ length: Math.max(2, Math.floor(h * 2.2)) }).map((_, i) => (
        <mesh key={i} position={[0.315, -h / 2 + 0.38 + i * 0.38, 0.01]}>
          <planeGeometry args={[0.012, 0.12]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.38} />
        </mesh>
      ))}
    </group>
  );
}

function Buildings() {
  const buildings = useMemo(() => {
    const arr: { x: number; z: number; h: number; seed: number }[] = [];
    let seed = 1;
    for (let x = -7.2; x <= 7.2; x += 1.15) {
      for (let z = -7.2; z <= 7.2; z += 1.15) {
        const dist = Math.sqrt(x * x + z * z);
        if (dist < 1.4 || Math.abs(z + 2) < 0.45 || Math.abs(z - 3.2) < 0.45 || Math.abs(x + 2.8) < 0.36) continue;
        const h = 0.7 + ((Math.sin(x * 2.1 + z * 1.7) + 1) / 2) * 2.6 + (dist < 4 ? 1.05 : 0);
        arr.push({ x, z, h, seed: seed++ });
      }
    }
    return arr;
  }, []);

  return (
    <group>
      {buildings.map((b) => (
        <Building key={`${b.x}-${b.z}`} x={b.x} z={b.z} h={b.h} colorSeed={b.seed} />
      ))}
    </group>
  );
}

function PulseRing({ zone, delay = 0 }: { zone: Zone; delay?: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = (state.clock.elapsedTime + delay) % 2.6;
    const s = 0.5 + t * 1.15;
    if (ref.current) {
      ref.current.scale.set(s, s, s);
      ref.current.children.forEach((child) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = Math.max(0, 0.62 - t * 0.24);
      });
    }
  });

  return (
    <group ref={ref} position={[zone.x, 0.08, zone.z]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.72, 0.018, 12, 80]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.56} />
      </mesh>
    </group>
  );
}

function ZoneMarker({ zone }: { zone: Zone }) {
  return (
    <group position={[zone.x, 0.1, zone.z]}>
      <PulseRing zone={zone} />
      <PulseRing zone={zone} delay={1.1} />
      <pointLight color={zone.color} intensity={7} distance={5.8} />
      <Float speed={2.2} rotationIntensity={0.12} floatIntensity={0.32}>
        <Html center position={[0, 1.75, 0]} transform distanceFactor={8}>
          <div className="sceneTag" style={{ ["--zone" as string]: zone.color }}>
            <span />
            <b>{zone.label}</b>
            <small>{zone.sub}</small>
            <strong>{zone.value}</strong>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function TrafficLights() {
  const refs = [useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null), useRef<THREE.Mesh>(null)];

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      ref.current.position.x = -7 + ((t * (1.15 + i * 0.35) + i * 3) % 14);
      ref.current.position.z = i === 0 ? -2.1 : i === 1 ? 3.2 : -0.4 + Math.sin(t + i) * 0.8;
    });
  });

  return (
    <>
      {refs.map((ref, i) => (
        <mesh key={i} ref={ref} position={[-7, 0.13, i === 0 ? -2.1 : 3.2]}>
          <boxGeometry args={[0.55, 0.035, 0.05]} />
          <meshBasicMaterial color={i === 1 ? "#a78bfa" : "#67e8f9"} transparent opacity={0.88} />
        </mesh>
      ))}
    </>
  );
}

function CityModel() {
  return (
    <Canvas shadows dpr={[1, 1.65]} camera={{ position: [0, 9.5, 11], fov: 42 }}>
      <color attach="background" args={["#020814"]} />
      <fog attach="fog" args={["#020814", 10, 24]} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[3, 10, 6]} intensity={1.8} castShadow />
      <pointLight position={[-4, 4, -3]} color="#38bdf8" intensity={16} distance={10} />
      <pointLight position={[5, 5, -2]} color="#a855f7" intensity={12} distance={10} />
      <Sparkles count={130} speed={0.28} scale={[15, 3, 15]} size={1.5} color="#67e8f9" opacity={0.22} />
      <Ground />
      <Buildings />
      <TrafficLights />
      {zones.map((zone) => (
        <ZoneMarker key={zone.label} zone={zone} />
      ))}
      <AnimatedCamera />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}

export default memo(CityModel);
