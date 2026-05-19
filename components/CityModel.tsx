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
  icon: string;
};

const zones: Zone[] = [
  { label: "QUIET PARK", sub: "Trees + calm area", value: "28%", x: -6.2, z: 3.8, color: "#22c55e", icon: "PARK" },
  { label: "CAFE STREET", sub: "Work friendly", value: "12 spots", x: -3.4, z: -3.6, color: "#f59e0b", icon: "CAFE" },
  { label: "EVENT AREA", sub: "Festival active", value: "LIVE", x: 2.4, z: -5.2, color: "#a855f7", icon: "EVENT" },
  { label: "BUSY CENTER", sub: "Crowd rising", value: "82%", x: 5.7, z: -0.9, color: "#fb3f70", icon: "HOT" },
  { label: "PARKING", sub: "Space found", value: "6 min", x: 4.4, z: 4.8, color: "#38bdf8", icon: "P" },
];

function AnimatedCamera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.13) * 1.65;
    state.camera.position.y = 10.4 + Math.sin(t * 0.2) * 0.38;
    state.camera.position.z = 12.3 + Math.cos(t * 0.16) * 0.85;
    state.camera.lookAt(0.5, 0.2, 0.1);
  });
  return null;
}

function Ground() {
  const grid = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let i = -12; i <= 12; i++) {
      lines.push([new THREE.Vector3(-12, 0.01, i), new THREE.Vector3(12, 0.01, i)]);
      lines.push([new THREE.Vector3(i, 0.01, -12), new THREE.Vector3(i, 0.01, 12)]);
    }
    return lines;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#050d1b" roughness={0.78} metalness={0.18} />
      </mesh>

      {grid.map((points, i) => (
        <Line key={i} points={points} color="#1d7896" transparent opacity={0.18} lineWidth={0.48} />
      ))}

      <Line points={[[-12, 0.06, -3.1], [-7, 0.06, -2.3], [-1.5, 0.06, -3.8], [4.2, 0.06, -2.1], [12, 0.06, -3.2]]} color="#67e8f9" transparent opacity={0.82} lineWidth={2.4} />
      <Line points={[[-11.4, 0.06, 4.8], [-5, 0.06, 3.5], [0.5, 0.06, 4.8], [6.5, 0.06, 3.6], [11.8, 0.06, 4.2]]} color="#38bdf8" transparent opacity={0.58} lineWidth={2.2} />
      <Line points={[[-4.3, 0.06, -12], [-3.2, 0.06, -5], [-4.2, 0.06, 1.7], [-2.1, 0.06, 12]]} color="#67e8f9" transparent opacity={0.62} lineWidth={2.2} />
      <Line points={[[4.8, 0.06, -11.5], [3.5, 0.06, -5.4], [5.4, 0.06, 0.8], [4.2, 0.06, 11.2]]} color="#a78bfa" transparent opacity={0.55} lineWidth={2.2} />

      <mesh position={[-6.2, 0.035, 3.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.65, 48]} />
        <meshStandardMaterial color="#052e1c" roughness={0.75} metalness={0.1} emissive="#064e3b" emissiveIntensity={0.18} />
      </mesh>

      <mesh position={[4.4, 0.04, 4.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.1, 2.2]} />
        <meshStandardMaterial color="#071526" roughness={0.7} metalness={0.25} emissive="#082f49" emissiveIntensity={0.18} />
      </mesh>

      {Array.from({ length: 5 }).map((_, i) => (
        <Line
          key={`parking-${i}`}
          points={[[3.2 + i * 0.42, 0.085, 3.8], [3.2 + i * 0.42, 0.085, 5.8]]}
          color="#60a5fa"
          transparent
          opacity={0.52}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function Building({ x, z, h, seed }: { x: number; z: number; h: number; seed: number }) {
  const baseColor = seed % 5 === 0 ? "#0c2746" : seed % 3 === 0 ? "#10243d" : "#071426";
  const roofColor = seed % 4 === 0 ? "#67e8f9" : seed % 6 === 0 ? "#a78bfa" : "#1e40af";
  const windows = Math.max(2, Math.floor(h * 2.6));

  return (
    <group position={[x, h / 2, z]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.68, h, 0.68]} />
        <meshStandardMaterial color={baseColor} metalness={0.42} roughness={0.4} emissive="#06192c" emissiveIntensity={0.22} />
      </mesh>

      <mesh position={[0, h / 2 + 0.015, 0]}>
        <boxGeometry args={[0.72, 0.03, 0.72]} />
        <meshBasicMaterial color={roofColor} transparent opacity={seed % 4 === 0 ? 0.7 : 0.42} />
      </mesh>

      {Array.from({ length: windows }).map((_, i) => (
        <group key={i}>
          <mesh position={[0.346, -h / 2 + 0.32 + i * 0.34, -0.16]}>
            <planeGeometry args={[0.012, 0.1]} />
            <meshBasicMaterial color={seed % 7 === 0 ? "#fde68a" : "#67e8f9"} transparent opacity={0.55} />
          </mesh>
          <mesh position={[0.346, -h / 2 + 0.32 + i * 0.34, 0.14]}>
            <planeGeometry args={[0.012, 0.1]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={0.34} />
          </mesh>
          <mesh position={[-0.14, -h / 2 + 0.32 + i * 0.34, 0.346]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[0.012, 0.1]} />
            <meshBasicMaterial color="#93c5fd" transparent opacity={0.34} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Buildings() {
  const buildings = useMemo(() => {
    const arr: { x: number; z: number; h: number; seed: number }[] = [];
    let seed = 1;

    for (let x = -10.2; x <= 10.2; x += 1.18) {
      for (let z = -10.2; z <= 10.2; z += 1.18) {
        const dist = Math.sqrt(x * x + z * z);
        const roadBlock =
          Math.abs(z + 3.1) < 0.55 ||
          Math.abs(z - 4.2) < 0.55 ||
          Math.abs(x + 3.6) < 0.48 ||
          Math.abs(x - 4.6) < 0.48;
        const parkBlock = x > -7.9 && x < -4.5 && z > 2.2 && z < 5.4;
        const parkingBlock = x > 2.7 && x < 6.0 && z > 3.4 && z < 6.2;
        const eventBlock = x > 0.7 && x < 4.2 && z > -6.8 && z < -3.8;
        const cafeBlock = x > -5.2 && x < -2.2 && z > -4.8 && z < -2.5;

        if (roadBlock || parkBlock || parkingBlock || eventBlock || cafeBlock) continue;

        const downtownBoost = dist < 5.4 ? 1.2 : 0;
        const coreBoost = x > 2.8 && x < 7.0 && z > -2.8 && z < 1.2 ? 1.55 : 0;
        const h = 0.65 + ((Math.sin(x * 1.7 + z * 2.05) + 1) / 2) * 3.0 + downtownBoost + coreBoost;
        arr.push({ x, z, h, seed: seed++ });
      }
    }

    return arr;
  }, []);

  return (
    <group>
      {buildings.map((b) => (
        <Building key={`${b.x}-${b.z}`} x={b.x} z={b.z} h={b.h} seed={b.seed} />
      ))}
    </group>
  );
}

function Tree({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.035, 0.05, 0.45, 8]} />
        <meshStandardMaterial color="#3f2a17" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <coneGeometry args={[0.28, 0.7, 10]} />
        <meshStandardMaterial color="#15803d" roughness={0.75} emissive="#064e3b" emissiveIntensity={0.18} />
      </mesh>
    </group>
  );
}

function CafeBlock({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[0.72, 0.56, 0.72]} />
        <meshStandardMaterial color="#28170a" roughness={0.5} emissive="#7c2d12" emissiveIntensity={0.28} />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[0.86, 0.05, 0.86]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.72} />
      </mesh>
      <pointLight position={[0, 0.9, 0]} color="#f59e0b" intensity={1.2} distance={2} />
    </group>
  );
}

function EventStage() {
  return (
    <group position={[2.4, 0, -5.2]}>
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.4, 48]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.6, 0.45, 0.85]} />
        <meshStandardMaterial color="#18132f" emissive="#7c3aed" emissiveIntensity={0.35} />
      </mesh>
      <pointLight position={[0, 1.2, 0]} color="#a855f7" intensity={6} distance={5} />
      <pointLight position={[0.8, 1.1, -0.4]} color="#fde047" intensity={2.5} distance={4} />
      <Sparkles count={70} speed={0.7} scale={[2.4, 1.8, 2.4]} size={1.8} color="#fde047" opacity={0.65} />
    </group>
  );
}

function Car({ color = "#38bdf8", direction = 0 }: { color?: string; direction?: number }) {
  return (
    <group rotation={[0, direction, 0]}>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.42, 0.16, 0.22]} />
        <meshStandardMaterial color="#0f172a" roughness={0.35} metalness={0.45} emissive={color} emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0.12, 0.22, 0]}>
        <boxGeometry args={[0.18, 0.1, 0.18]} />
        <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.55} />
      </mesh>
      <mesh position={[0.24, 0.14, -0.08]}>
        <boxGeometry args={[0.04, 0.025, 0.03]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0.24, 0.14, 0.08]}>
        <boxGeometry args={[0.04, 0.025, 0.03]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

function ParkingLotCars() {
  const cars = [
    [3.25, 4.1, "#38bdf8"],
    [3.75, 5.35, "#a78bfa"],
    [4.3, 4.25, "#f8fafc"],
    [4.9, 5.45, "#fb7185"],
    [5.3, 4.2, "#f59e0b"],
  ] as const;

  return (
    <group>
      {cars.map(([x, z, c], i) => (
        <group key={i} position={[x, 0.09, z]}>
          <Car color={c} direction={Math.PI / 2} />
        </group>
      ))}
    </group>
  );
}

function CityDetails() {
  const parkTrees = [
    [-7.2, 3.0], [-6.7, 4.2], [-5.8, 3.2], [-5.2, 4.7],
    [-7.0, 5.1], [-5.4, 2.5], [-6.1, 5.2], [-4.8, 3.7],
  ];

  const streetTrees = [
    [-8.6, -2.2], [-7.5, -2.0], [-6.3, -1.8], [6.6, 4.9],
    [7.7, 4.5], [8.7, 4.2], [-2.0, -3.8], [-1.2, -3.5],
  ];

  return (
    <group>
      {parkTrees.map(([x, z], i) => <Tree key={`park-${i}`} x={x} z={z} scale={1.15} />)}
      {streetTrees.map(([x, z], i) => <Tree key={`street-${i}`} x={x} z={z} scale={0.72} />)}

      <CafeBlock x={-4.4} z={-3.55} />
      <CafeBlock x={-3.45} z={-3.88} />
      <CafeBlock x={-2.65} z={-3.25} />

      <EventStage />
      <ParkingLotCars />
    </group>
  );
}

function MovingVehicles() {
  const refs = [
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
    useRef<THREE.Group>(null),
  ];

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    refs.forEach((ref, i) => {
      if (!ref.current) return;
      const speed = 0.75 + i * 0.18;
      const p = ((t * speed + i * 3.2) % 20) - 10;

      if (i === 0) {
        ref.current.position.set(p, 0.11, -3.1 + Math.sin(p * 0.5) * 0.25);
        ref.current.rotation.y = Math.PI / 2;
      } else if (i === 1) {
        ref.current.position.set(-p, 0.11, 4.4 + Math.sin(p * 0.45) * 0.22);
        ref.current.rotation.y = -Math.PI / 2;
      } else if (i === 2) {
        ref.current.position.set(-3.7 + Math.sin(p * 0.22) * 0.18, 0.11, p);
        ref.current.rotation.y = 0;
      } else if (i === 3) {
        ref.current.position.set(4.7 + Math.sin(p * 0.2) * 0.18, 0.11, -p);
        ref.current.rotation.y = Math.PI;
      } else {
        ref.current.position.set(p * 0.75, 0.11, -0.5 + Math.sin(t + i) * 0.8);
        ref.current.rotation.y = Math.PI / 2;
      }
    });
  });

  const colors = ["#67e8f9", "#a78bfa", "#f8fafc", "#fb7185", "#f59e0b"];

  return (
    <group>
      {refs.map((ref, i) => (
        <group key={i} ref={ref}>
          <Car color={colors[i]} direction={0} />
          <pointLight color={colors[i]} intensity={0.6} distance={1.2} />
        </group>
      ))}
    </group>
  );
}

function PulseRing({ zone, delay = 0 }: { zone: Zone; delay?: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = (state.clock.elapsedTime + delay) % 2.8;
    const s = 0.45 + t * 1.15;

    if (ref.current) {
      ref.current.scale.set(s, s, s);
      ref.current.children.forEach((child) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = Math.max(0, 0.62 - t * 0.22);
      });
    }
  });

  return (
    <group ref={ref} position={[zone.x, 0.08, zone.z]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.75, 0.018, 12, 92]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function ZoneMarker({ zone }: { zone: Zone }) {
  return (
    <group position={[zone.x, 0.1, zone.z]}>
      <PulseRing zone={zone} />
      <PulseRing zone={zone} delay={1.1} />
      <pointLight color={zone.color} intensity={7} distance={6} />

      <Float speed={2.2} rotationIntensity={0.12} floatIntensity={0.32}>
        <Html center position={[0, 1.85, 0]} transform distanceFactor={8}>
          <div className="sceneTag" style={{ ["--zone" as string]: zone.color }}>
            <span>{zone.icon}</span>
            <b>{zone.label}</b>
            <small>{zone.sub}</small>
            <strong>{zone.value}</strong>
          </div>
        </Html>
      </Float>
    </group>
  );
}

function CityModel() {
  return (
    <Canvas shadows dpr={[1, 1.65]} camera={{ position: [0, 10.4, 12.3], fov: 43 }}>
      <color attach="background" args={["#020814"]} />
      <fog attach="fog" args={["#020814", 13, 32]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 12, 7]} intensity={1.7} castShadow />
      <pointLight position={[-6, 5, -4]} color="#38bdf8" intensity={15} distance={14} />
      <pointLight position={[7, 5, -2]} color="#a855f7" intensity={13} distance={14} />
      <pointLight position={[0, 4, 5]} color="#f59e0b" intensity={3} distance={7} />

      <Sparkles count={170} speed={0.28} scale={[20, 4, 20]} size={1.35} color="#67e8f9" opacity={0.24} />
      <Ground />
      <Buildings />
      <CityDetails />
      <MovingVehicles />

      {zones.map((zone) => (
        <ZoneMarker key={zone.label} zone={zone} />
      ))}

      <AnimatedCamera />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}

export default memo(CityModel);
