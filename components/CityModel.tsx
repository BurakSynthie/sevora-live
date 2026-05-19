"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { memo, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type CityMode = "night" | "day" | "work" | "event";

type Zone = {
  id: string;
  label: string;
  sub: string;
  value: string;
  x: number;
  z: number;
  color: string;
  icon: string;
  score: string;
  detail: string;
};

const zoneData: Zone[] = [
  {
    id: "park",
    label: "Quiet Park",
    sub: "Green calm zone",
    value: "28%",
    x: -7.8,
    z: 5.4,
    color: "#22c55e",
    icon: "PARK",
    score: "Calm 92",
    detail: "Low noise, low crowd and comfortable walking area.",
  },
  {
    id: "cafe",
    label: "Cafe Street",
    sub: "Work friendly",
    value: "12 spots",
    x: -5.4,
    z: -4.8,
    color: "#f59e0b",
    icon: "CAFE",
    score: "Work 88",
    detail: "Wi‑Fi, calm seating and good working atmosphere.",
  },
  {
    id: "event",
    label: "Event Plaza",
    sub: "Festival active",
    value: "LIVE",
    x: 2.8,
    z: -6.8,
    color: "#a855f7",
    icon: "EVENT",
    score: "Live 96",
    detail: "Festival crowd, music activity and live venue signal.",
  },
  {
    id: "busy",
    label: "Business Core",
    sub: "Crowd rising",
    value: "82%",
    x: 7.2,
    z: -1.4,
    color: "#fb3f70",
    icon: "HOT",
    score: "Busy 82",
    detail: "High density area. Alternative calm routes are suggested.",
  },
  {
    id: "parking",
    label: "Parking Hub",
    sub: "Space found",
    value: "6 min",
    x: 6.4,
    z: 5.9,
    color: "#38bdf8",
    icon: "P",
    score: "Open 67",
    detail: "Parking chance nearby with estimated 6 minutes walking distance.",
  },
];

function modeColors(mode: CityMode) {
  if (mode === "day") {
    return {
      bg: "#071426",
      fog: "#071426",
      cyan: "#38bdf8",
      purple: "#818cf8",
      road: "#111827",
      ambient: 0.72,
      sun: 2.4,
    };
  }

  if (mode === "work") {
    return {
      bg: "#03131f",
      fog: "#03131f",
      cyan: "#22d3ee",
      purple: "#14b8a6",
      road: "#0b1728",
      ambient: 0.55,
      sun: 1.9,
    };
  }

  if (mode === "event") {
    return {
      bg: "#08051a",
      fog: "#08051a",
      cyan: "#a78bfa",
      purple: "#fb3f70",
      road: "#10091e",
      ambient: 0.5,
      sun: 1.8,
    };
  }

  return {
    bg: "#020814",
    fog: "#020814",
    cyan: "#67e8f9",
    purple: "#a855f7",
    road: "#08111f",
    ambient: 0.45,
    sun: 1.7,
  };
}

function AnimatedCamera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    state.camera.position.x +=
      (Math.sin(t * 0.11) * 1.15 - state.camera.position.x) * 0.014;
    state.camera.position.y +=
      (12.2 + Math.sin(t * 0.18) * 0.28 - state.camera.position.y) * 0.014;
    state.camera.position.z +=
      (14.6 + Math.cos(t * 0.13) * 0.6 - state.camera.position.z) * 0.014;

    state.camera.lookAt(0.5, 0, 0.1);
  });

  return null;
}

function Road({
  x,
  z,
  width,
  length,
  rotation = 0,
  color,
  lane = true,
}: {
  x: number;
  z: number;
  width: number;
  length: number;
  rotation?: number;
  color: string;
  lane?: boolean;
}) {
  return (
    <group position={[x, 0.055, z]} rotation={[0, rotation, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial
          color={color}
          roughness={0.64}
          metalness={0.28}
          emissive="#071426"
          emissiveIntensity={0.14}
        />
      </mesh>

      {lane && (
        <>
          <Line
            points={[
              [0, 0.035, -length / 2 + 0.5],
              [0, 0.035, length / 2 - 0.5],
            ]}
            color="#e0f2fe"
            transparent
            opacity={0.34}
            lineWidth={1.2}
          />
          <Line
            points={[
              [-width / 2 + 0.13, 0.035, -length / 2 + 0.4],
              [-width / 2 + 0.13, 0.035, length / 2 - 0.4],
            ]}
            color="#38bdf8"
            transparent
            opacity={0.18}
            lineWidth={1}
          />
          <Line
            points={[
              [width / 2 - 0.13, 0.035, -length / 2 + 0.4],
              [width / 2 - 0.13, 0.035, length / 2 - 0.4],
            ]}
            color="#38bdf8"
            transparent
            opacity={0.18}
            lineWidth={1}
          />
        </>
      )}
    </group>
  );
}

function Intersection({ x, z, color }: { x: number; z: number; color: string }) {
  return (
    <group position={[x, 0.07, z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.05, 42]} />
        <meshStandardMaterial
          color="#0a1220"
          roughness={0.62}
          metalness={0.25}
          emissive={color}
          emissiveIntensity={0.08}
        />
      </mesh>
      <Line
        points={[
          [-0.7, 0.035, 0],
          [0.7, 0.035, 0],
        ]}
        color="#e0f2fe"
        transparent
        opacity={0.28}
        lineWidth={1}
      />
      <Line
        points={[
          [0, 0.035, -0.7],
          [0, 0.035, 0.7],
        ]}
        color="#e0f2fe"
        transparent
        opacity={0.28}
        lineWidth={1}
      />
    </group>
  );
}

function Ground({ mode }: { mode: CityMode }) {
  const colors = modeColors(mode);

  const grid = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let i = -15; i <= 15; i++) {
      lines.push([
        new THREE.Vector3(-15, 0.01, i),
        new THREE.Vector3(15, 0.01, i),
      ]);
      lines.push([
        new THREE.Vector3(i, 0.01, -15),
        new THREE.Vector3(i, 0.01, 15),
      ]);
    }
    return lines;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color={mode === "day" ? "#0c1828" : "#050d1b"}
          roughness={0.82}
          metalness={0.18}
        />
      </mesh>

      {grid.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={colors.cyan}
          transparent
          opacity={0.08}
          lineWidth={0.42}
        />
      ))}

      <Road x={0} z={-3.8} width={1.7} length={28} rotation={Math.PI / 2} color={colors.road} />
      <Road x={0} z={4.7} width={1.55} length={27} rotation={Math.PI / 2} color={colors.road} />
      <Road x={-4.8} z={0} width={1.45} length={27} color={colors.road} />
      <Road x={4.9} z={0} width={1.45} length={27} color={colors.road} />
      <Road x={0.8} z={0.3} width={1.2} length={19} rotation={0.63} color={colors.road} />
      <Road x={-1.6} z={0.7} width={1.1} length={18} rotation={-0.55} color={colors.road} />

      <Intersection x={-4.8} z={-3.8} color={colors.cyan} />
      <Intersection x={4.9} z={-3.8} color={colors.purple} />
      <Intersection x={-4.8} z={4.7} color={colors.cyan} />
      <Intersection x={4.9} z={4.7} color={colors.purple} />

      <HeatPatch x={7.2} z={-1.4} color="#fb3f70" />
      <HeatPatch x={-7.8} z={5.4} color="#22c55e" />
      <HeatPatch x={2.8} z={-6.8} color="#a855f7" />

      <mesh position={[-7.8, 0.065, 5.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.15, 64]} />
        <meshStandardMaterial
          color="#052e1c"
          roughness={0.78}
          metalness={0.08}
          emissive="#064e3b"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[6.4, 0.07, 5.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.8, 2.55]} />
        <meshStandardMaterial
          color="#071526"
          roughness={0.7}
          metalness={0.25}
          emissive="#082f49"
          emissiveIntensity={0.18}
        />
      </mesh>

      {Array.from({ length: 7 }).map((_, i) => (
        <Line
          key={`parking-${i}`}
          points={[
            [4.95 + i * 0.42, 0.095, 4.72],
            [4.95 + i * 0.42, 0.095, 7.05],
          ]}
          color="#60a5fa"
          transparent
          opacity={0.55}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function HeatPatch({
  x,
  z,
  color,
}: {
  x: number;
  z: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.35 + x) * 0.06;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref} position={[x, 0.075, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[2.25, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} depthWrite={false} />
    </mesh>
  );
}

function DistrictLabel({
  title,
  x,
  z,
  color,
}: {
  title: string;
  x: number;
  z: number;
  color: string;
}) {
  return (
    <Html position={[x, 0.12, z]} transform rotation={[-Math.PI / 2, 0, 0]} distanceFactor={8}>
      <div className="districtLabel" style={{ ["--district" as string]: color }}>
        {title}
      </div>
    </Html>
  );
}

function CitySign({
  text,
  x,
  z,
  color,
}: {
  text: string;
  x: number;
  z: number;
  color: string;
}) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.4} />
      </mesh>
      <Html position={[0, 0.84, 0]} center transform distanceFactor={8}>
        <div className="citySign" style={{ ["--sign" as string]: color }}>
          {text}
        </div>
      </Html>
    </group>
  );
}

function Building({
  x,
  z,
  h,
  w,
  d,
  seed,
  onSelect,
}: {
  x: number;
  z: number;
  h: number;
  w: number;
  d: number;
  seed: number;
  onSelect: (text: string) => void;
}) {
  const baseColor =
    seed % 5 === 0 ? "#0c2746" : seed % 3 === 0 ? "#10243d" : "#071426";
  const roofColor =
    seed % 4 === 0 ? "#67e8f9" : seed % 6 === 0 ? "#a78bfa" : "#1e40af";
  const kind =
    seed % 11 === 0
      ? "Hotel"
      : seed % 7 === 0
        ? "Office Tower"
        : seed % 5 === 0
          ? "Residence"
          : "City Block";

  const windows = Math.max(2, Math.floor(h * 2.4));

  return (
    <group
      position={[x, h / 2, z]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(`${kind} · Density ${42 + (seed % 51)}% · Live signal active`);
      }}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={baseColor}
          metalness={0.42}
          roughness={0.42}
          emissive="#06192c"
          emissiveIntensity={0.24}
        />
      </mesh>

      <mesh position={[0, h / 2 + 0.018, 0]}>
        <boxGeometry args={[w + 0.05, 0.035, d + 0.05]} />
        <meshBasicMaterial
          color={roofColor}
          transparent
          opacity={seed % 4 === 0 ? 0.76 : 0.42}
        />
      </mesh>

      {Array.from({ length: windows }).map((_, i) => (
        <group key={i}>
          <mesh position={[w / 2 + 0.006, -h / 2 + 0.34 + i * 0.36, -d * 0.24]}>
            <planeGeometry args={[0.012, 0.11]} />
            <meshBasicMaterial
              color={seed % 7 === 0 ? "#fde68a" : "#67e8f9"}
              transparent
              opacity={0.52}
            />
          </mesh>

          <mesh position={[w / 2 + 0.006, -h / 2 + 0.34 + i * 0.36, d * 0.24]}>
            <planeGeometry args={[0.012, 0.11]} />
            <meshBasicMaterial color="#93c5fd" transparent opacity={0.34} />
          </mesh>

          <mesh
            position={[-w * 0.24, -h / 2 + 0.34 + i * 0.36, d / 2 + 0.006]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <planeGeometry args={[0.012, 0.11]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {seed % 6 === 0 && (
        <mesh position={[0, -h / 2 + 0.34, d / 2 + 0.012]} rotation={[0, 0, 0]}>
          <planeGeometry args={[w * 0.6, 0.12]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.78} />
        </mesh>
      )}
    </group>
  );
}

function Buildings({ onSelect }: { onSelect: (text: string) => void }) {
  const buildings = useMemo(() => {
    const positions: { x: number; z: number; h: number; w: number; d: number; seed: number }[] = [];
    let seed = 1;

    const blocks = [
      [-10, -9],
      [-8.4, -8.6],
      [-7.0, -8.2],
      [-1.4, -8.1],
      [0.1, -8.5],
      [5.9, -8.2],
      [7.7, -8.7],
      [9.4, -7.9],
      [-10.2, -1.7],
      [-8.7, -1.2],
      [-6.9, -1.5],
      [-1.2, -1.2],
      [1.0, -1.7],
      [7.4, -1.4],
      [9.1, -1.0],
      [-10, 1.8],
      [-7.9, 1.5],
      [-1.1, 1.6],
      [0.9, 1.2],
      [7.0, 1.6],
      [9.3, 1.2],
      [-10.1, 8.1],
      [-8.4, 8.7],
      [-2.2, 8.4],
      [-0.4, 8.0],
      [2.0, 8.5],
      [9.3, 8.2],
    ];

    for (const [x, z] of blocks) {
      const dist = Math.sqrt(x * x + z * z);
      const coreBoost = x > 5 && z > -2.8 && z < 2.8 ? 1.7 : 0;
      const h = 0.9 + ((Math.sin(x * 1.7 + z * 2.1) + 1) / 2) * 3.3 + coreBoost;
      const w = 0.72 + (seed % 3) * 0.18;
      const d = 0.72 + (seed % 4) * 0.14;
      positions.push({ x, z, h, w, d, seed: seed++ });
    }

    return positions;
  }, []);

  return (
    <group>
      {buildings.map((b) => (
        <Building
          key={`${b.x}-${b.z}`}
          x={b.x}
          z={b.z}
          h={b.h}
          w={b.w}
          d={b.d}
          seed={b.seed}
          onSelect={onSelect}
        />
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
        <meshStandardMaterial
          color="#15803d"
          roughness={0.75}
          emissive="#064e3b"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

function CafeBlock({
  x,
  z,
  onSelect,
}: {
  x: number;
  z: number;
  onSelect: (text: string) => void;
}) {
  return (
    <group
      position={[x, 0, z]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("Cafe Street · Wi‑Fi good · Calm seats available");
      }}
    >
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[0.82, 0.56, 0.72]} />
        <meshStandardMaterial
          color="#28170a"
          roughness={0.5}
          emissive="#7c2d12"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[0.96, 0.05, 0.86]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.78} />
      </mesh>

      <pointLight position={[0, 0.9, 0]} color="#f59e0b" intensity={1.35} distance={2.2} />
    </group>
  );
}

function EventStage({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <group
      position={[2.8, 0, -6.8]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("Event Plaza · Festival active · Crowd growing");
      }}
    >
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.55, 48]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.22} />
      </mesh>

      <mesh position={[0, 0.32, 0]} castShadow>
        <boxGeometry args={[1.75, 0.48, 0.9]} />
        <meshStandardMaterial color="#18132f" emissive="#7c3aed" emissiveIntensity={0.4} />
      </mesh>

      <mesh position={[0, 0.95, -0.45]}>
        <boxGeometry args={[1.45, 0.55, 0.06]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.78} />
      </mesh>

      <pointLight position={[0, 1.3, 0]} color="#a855f7" intensity={6} distance={5.2} />
      <pointLight position={[0.85, 1.1, -0.4]} color="#fde047" intensity={2.7} distance={4.2} />

      <Sparkles count={90} speed={0.72} scale={[2.6, 1.9, 2.6]} size={1.8} color="#fde047" opacity={0.66} />
    </group>
  );
}

function Person({
  x,
  z,
  color = "#f8fafc",
}: {
  x: number;
  z: number;
  color?: string;
}) {
  return (
    <group position={[x, 0, z]}>
      <mesh position={[0, 0.16, 0]}>
        <capsuleGeometry args={[0.045, 0.18, 4, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.08} />
      </mesh>

      <mesh position={[0, 0.34, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
    </group>
  );
}

function Car({
  color = "#38bdf8",
  type = "sedan",
  direction = 0,
}: {
  color?: string;
  type?: "sedan" | "taxi" | "bus" | "ev";
  direction?: number;
}) {
  const isBus = type === "bus";
  const isTaxi = type === "taxi";

  return (
    <group rotation={[0, direction, 0]} scale={isBus ? 1.18 : 1}>
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={isBus ? [0.82, 0.24, 0.32] : [0.48, 0.17, 0.24]} />
        <meshStandardMaterial
          color={isTaxi ? "#facc15" : "#0f172a"}
          roughness={0.35}
          metalness={0.45}
          emissive={color}
          emissiveIntensity={0.08}
        />
      </mesh>

      {!isBus && (
        <mesh position={[0.1, 0.26, 0]}>
          <boxGeometry args={[0.21, 0.11, 0.18]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.55} />
        </mesh>
      )}

      <mesh position={[isBus ? 0.44 : 0.27, 0.15, -0.085]}>
        <boxGeometry args={[0.05, 0.028, 0.036]} />
        <meshBasicMaterial color={type === "ev" ? "#67e8f9" : color} />
      </mesh>

      <mesh position={[isBus ? 0.44 : 0.27, 0.15, 0.085]}>
        <boxGeometry args={[0.05, 0.028, 0.036]} />
        <meshBasicMaterial color={type === "ev" ? "#67e8f9" : color} />
      </mesh>
    </group>
  );
}

function ParkingLotCars() {
  const cars = [
    [5.25, 5.05, "#38bdf8", "sedan"],
    [5.85, 6.65, "#a78bfa", "ev"],
    [6.55, 5.25, "#f8fafc", "sedan"],
    [7.15, 6.65, "#fb7185", "sedan"],
    [7.85, 5.25, "#f59e0b", "taxi"],
  ] as const;

  return (
    <group>
      {cars.map(([x, z, c, type], i) => (
        <group key={i} position={[x, 0.1, z]}>
          <Car color={c} type={type} direction={Math.PI / 2} />
        </group>
      ))}
    </group>
  );
}

function CityDetails({ onSelect }: { onSelect: (text: string) => void }) {
  const parkTrees = [
    [-8.9, 4.6],
    [-8.2, 5.7],
    [-7.4, 4.8],
    [-6.7, 6.3],
    [-8.8, 6.8],
    [-6.4, 5.3],
    [-7.6, 6.9],
    [-5.9, 4.5],
    [-9.3, 5.7],
    [-7.1, 5.8],
  ];

  const streetTrees = [
    [-10.8, -2.8],
    [-9.6, -2.6],
    [-7.2, -2.2],
    [6.2, 4.0],
    [8.2, 4.0],
    [9.6, 4.1],
    [-4.9, -5.8],
    [-4.1, -5.4],
  ];

  const people: [number, number, string][] = [
    [-7.6, 5.2, "#86efac"],
    [-6.7, 5.7, "#f8fafc"],
    [-5.1, -4.5, "#fbbf24"],
    [2.5, -6.6, "#c4b5fd"],
    [3.2, -7.0, "#fb7185"],
    [7.0, -1.0, "#f8fafc"],
  ];

  return (
    <group>
      {parkTrees.map(([x, z], i) => (
        <Tree key={`park-${i}`} x={x} z={z} scale={1.16} />
      ))}

      {streetTrees.map(([x, z], i) => (
        <Tree key={`street-${i}`} x={x} z={z} scale={0.72} />
      ))}

      {people.map(([x, z, c], i) => (
        <Person key={i} x={x} z={z} color={c} />
      ))}

      <CafeBlock x={-6.0} z={-5.05} onSelect={onSelect} />
      <CafeBlock x={-5.1} z={-5.6} onSelect={onSelect} />
      <CafeBlock x={-4.3} z={-4.9} onSelect={onSelect} />

      <EventStage onSelect={onSelect} />
      <ParkingLotCars />

      <DistrictLabel title="GREEN DISTRICT" x={-8.0} z={7.8} color="#22c55e" />
      <DistrictLabel title="CAFE STREET" x={-5.2} z={-6.8} color="#f59e0b" />
      <DistrictLabel title="EVENT PLAZA" x={2.7} z={-8.6} color="#a855f7" />
      <DistrictLabel title="BUSINESS CORE" x={8.2} z={0.8} color="#fb3f70" />

      <CitySign text="PARK" x={-6.1} z={4.15} color="#22c55e" />
      <CitySign text="CAFE" x={-4.2} z={-5.9} color="#f59e0b" />
      <CitySign text="EVENT" x={4.0} z={-6.4} color="#a855f7" />
      <CitySign text="P" x={4.7} z={5.0} color="#38bdf8" />
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
    useRef<THREE.Group>(null),
  ];

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    refs.forEach((ref, i) => {
      if (!ref.current) return;

      const speed = 0.72 + i * 0.13;
      const p = ((t * speed + i * 3.2) % 24) - 12;

      if (i === 0) {
        ref.current.position.set(p, 0.12, -3.8);
        ref.current.rotation.y = Math.PI / 2;
      } else if (i === 1) {
        ref.current.position.set(-p, 0.12, 4.7);
        ref.current.rotation.y = -Math.PI / 2;
      } else if (i === 2) {
        ref.current.position.set(-4.8, 0.12, p);
        ref.current.rotation.y = 0;
      } else if (i === 3) {
        ref.current.position.set(4.9, 0.12, -p);
        ref.current.rotation.y = Math.PI;
      } else if (i === 4) {
        ref.current.position.set(p * 0.72, 0.12, -0.55 + Math.sin(t + i) * 0.55);
        ref.current.rotation.y = Math.PI / 2;
      } else {
        ref.current.position.set(-p * 0.72, 0.12, 1.0 + Math.cos(t + i) * 0.45);
        ref.current.rotation.y = -Math.PI / 2;
      }
    });
  });

  const colors = ["#67e8f9", "#a78bfa", "#f8fafc", "#fb7185", "#f59e0b", "#22c55e"];
  const types: ("sedan" | "taxi" | "bus" | "ev")[] = [
    "sedan",
    "ev",
    "sedan",
    "taxi",
    "bus",
    "sedan",
  ];

  return (
    <group>
      {refs.map((ref, i) => (
        <group key={i} ref={ref}>
          <Car color={colors[i]} type={types[i]} />
          <pointLight color={colors[i]} intensity={0.65} distance={1.45} />
        </group>
      ))}
    </group>
  );
}

function PulseRing({ zone, delay = 0 }: { zone: Zone; delay?: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = (state.clock.elapsedTime + delay) % 2.8;
    const s = 0.45 + t * 1.12;

    if (ref.current) {
      ref.current.scale.set(s, s, s);

      ref.current.children.forEach((child) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = Math.max(0, 0.62 - t * 0.22);
      });
    }
  });

  return (
    <group ref={ref} position={[zone.x, 0.09, zone.z]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <torusGeometry args={[0.78, 0.018, 12, 92]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

function ZoneMarker({
  zone,
  onSelect,
}: {
  zone: Zone;
  onSelect: (text: string) => void;
}) {
  return (
    <group
      position={[zone.x, 0.1, zone.z]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(`${zone.label} · ${zone.detail}`);
      }}
    >
      <PulseRing zone={zone} />
      <PulseRing zone={zone} delay={1.1} />

      <pointLight color={zone.color} intensity={7} distance={6.2} />

      <Float speed={2.0} rotationIntensity={0.08} floatIntensity={0.24}>
        <Html center position={[0, 1.85, 0]} transform distanceFactor={8}>
          <button
            className="sceneTag sceneTagV11"
            style={{ ["--zone" as string]: zone.color }}
            type="button"
          >
            <span>{zone.icon}</span>
            <div>
              <b>{zone.label}</b>
              <small>{zone.sub}</small>
            </div>
            <strong>{zone.value}</strong>
            <em>{zone.score}</em>
          </button>
        </Html>
      </Float>
    </group>
  );
}

function SelectionPanel({ text }: { text: string }) {
  return (
    <Html position={[-9.8, 3.3, -9.4]} transform distanceFactor={10}>
      <div className="selectionPanel selectionPanelV11">
        <b>SEVORA LIVE INSIGHT</b>
        <p>{text}</p>
        <div>
          <span>AI confidence</span>
          <strong>91%</strong>
        </div>
        <i />
        <small>Click another area to inspect city signals.</small>
      </div>
    </Html>
  );
}

function CityModel({ mode = "night" }: { mode?: CityMode }) {
  const [selected, setSelected] = useState(
    "Click a building, café, event area or city signal to inspect live data."
  );

  const colors = modeColors(mode);

  return (
    <Canvas shadows dpr={[1, 1.65]} camera={{ position: [0, 12.2, 14.6], fov: 42 }}>
      <color attach="background" args={[colors.bg]} />
      <fog attach="fog" args={[colors.fog, 15, 38]} />

      <ambientLight intensity={colors.ambient} />
      <directionalLight position={[4, 13, 8]} intensity={colors.sun} castShadow />
      <pointLight position={[-7, 5, -4]} color={colors.cyan} intensity={15} distance={16} />
      <pointLight position={[8, 6, -2]} color={colors.purple} intensity={13} distance={16} />
      <pointLight position={[0, 4, 5]} color="#f59e0b" intensity={3} distance={8} />

      <Sparkles
        count={150}
        speed={0.22}
        scale={[23, 4, 23]}
        size={1.25}
        color={colors.cyan}
        opacity={0.2}
      />

      <Ground mode={mode} />
      <Buildings onSelect={setSelected} />
      <CityDetails onSelect={setSelected} />
      <MovingVehicles />

      {zoneData.map((zone) => (
        <ZoneMarker key={zone.label} zone={zone} onSelect={setSelected} />
      ))}

      <SelectionPanel text={selected} />

      <AnimatedCamera />

      <OrbitControls
        enableZoom
        enablePan={false}
        enableRotate
        minDistance={9}
        maxDistance={25}
        minPolarAngle={0.42}
        maxPolarAngle={1.25}
      />
    </Canvas>
  );
}

export default memo(CityModel);
