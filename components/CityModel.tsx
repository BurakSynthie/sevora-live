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
  detail: string;
};

const zoneData: Zone[] = [
  {
    id: "park",
    label: "QUIET PARK",
    sub: "Trees + calm area",
    value: "28%",
    x: -6.2,
    z: 3.8,
    color: "#22c55e",
    icon: "PARK",
    detail: "Calm level high. Good for walking, reading and resting.",
  },
  {
    id: "cafe",
    label: "CAFE STREET",
    sub: "Work friendly",
    value: "12 spots",
    x: -3.4,
    z: -3.6,
    color: "#f59e0b",
    icon: "CAFE",
    detail: "Work-friendly cafés, Wi‑Fi and moderate crowd density.",
  },
  {
    id: "event",
    label: "EVENT AREA",
    sub: "Festival active",
    value: "LIVE",
    x: 2.4,
    z: -5.2,
    color: "#a855f7",
    icon: "EVENT",
    detail: "Live event detected. More movement, music and social activity.",
  },
  {
    id: "busy",
    label: "BUSY CENTER",
    sub: "Crowd rising",
    value: "82%",
    x: 5.7,
    z: -0.9,
    color: "#fb3f70",
    icon: "HOT",
    detail: "Crowd density is rising. SEVORA suggests alternative calm routes.",
  },
  {
    id: "parking",
    label: "PARKING",
    sub: "Space found",
    value: "6 min",
    x: 4.4,
    z: 4.8,
    color: "#38bdf8",
    icon: "P",
    detail: "Parking chance nearby. Estimated 6 minutes walking distance.",
  },
];

function modeColors(mode: CityMode) {
  if (mode === "day") {
    return {
      bg: "#071426",
      fog: "#071426",
      cyan: "#38bdf8",
      purple: "#818cf8",
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
      ambient: 0.5,
      sun: 1.8,
    };
  }

  return {
    bg: "#020814",
    fog: "#020814",
    cyan: "#67e8f9",
    purple: "#a855f7",
    ambient: 0.45,
    sun: 1.7,
  };
}

function AnimatedCamera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    state.camera.position.x +=
      (Math.sin(t * 0.12) * 1.1 - state.camera.position.x) * 0.015;
    state.camera.position.y +=
      (10.7 + Math.sin(t * 0.2) * 0.26 - state.camera.position.y) * 0.015;
    state.camera.position.z +=
      (12.7 + Math.cos(t * 0.14) * 0.55 - state.camera.position.z) * 0.015;

    state.camera.lookAt(0.5, 0.2, 0.1);
  });

  return null;
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

    const s = 1 + Math.sin(state.clock.elapsedTime * 1.4 + x) * 0.06;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref} position={[x, 0.055, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[2.0, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} depthWrite={false} />
    </mesh>
  );
}

function Ground({ mode }: { mode: CityMode }) {
  const colors = modeColors(mode);

  const grid = useMemo(() => {
    const lines: THREE.Vector3[][] = [];

    for (let i = -13; i <= 13; i++) {
      lines.push([
        new THREE.Vector3(-13, 0.01, i),
        new THREE.Vector3(13, 0.01, i),
      ]);
      lines.push([
        new THREE.Vector3(i, 0.01, -13),
        new THREE.Vector3(i, 0.01, 13),
      ]);
    }

    return lines;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial
          color={mode === "day" ? "#0c1828" : "#050d1b"}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {grid.map((points, i) => (
        <Line
          key={i}
          points={points}
          color={colors.cyan}
          transparent
          opacity={0.16}
          lineWidth={0.5}
        />
      ))}

      <Line
        points={[
          [-13, 0.06, -3.1],
          [-7, 0.06, -2.3],
          [-1.5, 0.06, -3.8],
          [4.2, 0.06, -2.1],
          [13, 0.06, -3.2],
        ]}
        color={colors.cyan}
        transparent
        opacity={0.88}
        lineWidth={2.4}
      />

      <Line
        points={[
          [-12.4, 0.06, 4.8],
          [-5, 0.06, 3.5],
          [0.5, 0.06, 4.8],
          [6.5, 0.06, 3.6],
          [12.8, 0.06, 4.2],
        ]}
        color="#38bdf8"
        transparent
        opacity={0.58}
        lineWidth={2.2}
      />

      <Line
        points={[
          [-4.3, 0.06, -13],
          [-3.2, 0.06, -5],
          [-4.2, 0.06, 1.7],
          [-2.1, 0.06, 13],
        ]}
        color={colors.cyan}
        transparent
        opacity={0.62}
        lineWidth={2.2}
      />

      <Line
        points={[
          [4.8, 0.06, -12.5],
          [3.5, 0.06, -5.4],
          [5.4, 0.06, 0.8],
          [4.2, 0.06, 12.2],
        ]}
        color={colors.purple}
        transparent
        opacity={0.58}
        lineWidth={2.2}
      />

      <HeatPatch x={5.7} z={-0.9} color="#fb3f70" />
      <HeatPatch x={-6.2} z={3.8} color="#22c55e" />
      <HeatPatch x={2.4} z={-5.2} color="#a855f7" />

      <mesh position={[-6.2, 0.04, 3.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.75, 56]} />
        <meshStandardMaterial
          color="#052e1c"
          roughness={0.75}
          metalness={0.1}
          emissive="#064e3b"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh position={[4.4, 0.045, 4.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.3, 2.3]} />
        <meshStandardMaterial
          color="#071526"
          roughness={0.7}
          metalness={0.25}
          emissive="#082f49"
          emissiveIntensity={0.18}
        />
      </mesh>

      {Array.from({ length: 6 }).map((_, i) => (
        <Line
          key={`parking-${i}`}
          points={[
            [3.1 + i * 0.42, 0.09, 3.75],
            [3.1 + i * 0.42, 0.09, 5.85],
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

function Building({
  x,
  z,
  h,
  seed,
  onSelect,
}: {
  x: number;
  z: number;
  h: number;
  seed: number;
  onSelect: (text: string) => void;
}) {
  const baseColor =
    seed % 5 === 0 ? "#0c2746" : seed % 3 === 0 ? "#10243d" : "#071426";
  const roofColor =
    seed % 4 === 0 ? "#67e8f9" : seed % 6 === 0 ? "#a78bfa" : "#1e40af";
  const windows = Math.max(2, Math.floor(h * 2.7));
  const kind =
    seed % 9 === 0
      ? "Hotel"
      : seed % 7 === 0
        ? "Office Tower"
        : seed % 5 === 0
          ? "Residence"
          : "City Block";

  return (
    <group
      position={[x, h / 2, z]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(`${kind} · Density ${45 + (seed % 48)}% · Open signal active`);
      }}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.68, h, 0.68]} />
        <meshStandardMaterial
          color={baseColor}
          metalness={0.42}
          roughness={0.4}
          emissive="#06192c"
          emissiveIntensity={0.24}
        />
      </mesh>

      <mesh position={[0, h / 2 + 0.015, 0]}>
        <boxGeometry args={[0.72, 0.03, 0.72]} />
        <meshBasicMaterial
          color={roofColor}
          transparent
          opacity={seed % 4 === 0 ? 0.78 : 0.44}
        />
      </mesh>

      {Array.from({ length: windows }).map((_, i) => (
        <group key={i}>
          <mesh position={[0.346, -h / 2 + 0.32 + i * 0.34, -0.16]}>
            <planeGeometry args={[0.012, 0.1]} />
            <meshBasicMaterial
              color={seed % 7 === 0 ? "#fde68a" : "#67e8f9"}
              transparent
              opacity={0.56}
            />
          </mesh>

          <mesh position={[0.346, -h / 2 + 0.32 + i * 0.34, 0.14]}>
            <planeGeometry args={[0.012, 0.1]} />
            <meshBasicMaterial color="#67e8f9" transparent opacity={0.36} />
          </mesh>

          <mesh
            position={[-0.14, -h / 2 + 0.32 + i * 0.34, 0.346]}
            rotation={[0, Math.PI / 2, 0]}
          >
            <planeGeometry args={[0.012, 0.1]} />
            <meshBasicMaterial color="#93c5fd" transparent opacity={0.34} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Buildings({ onSelect }: { onSelect: (text: string) => void }) {
  const buildings = useMemo(() => {
    const arr: { x: number; z: number; h: number; seed: number }[] = [];
    let seed = 1;

    for (let x = -10.8; x <= 10.8; x += 1.18) {
      for (let z = -10.8; z <= 10.8; z += 1.18) {
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

        if (roadBlock || parkBlock || parkingBlock || eventBlock || cafeBlock) {
          continue;
        }

        const downtownBoost = dist < 5.4 ? 1.2 : 0;
        const coreBoost = x > 2.8 && x < 7.0 && z > -2.8 && z < 1.2 ? 1.65 : 0;
        const h =
          0.65 +
          ((Math.sin(x * 1.7 + z * 2.05) + 1) / 2) * 3.15 +
          downtownBoost +
          coreBoost;

        arr.push({ x, z, h, seed: seed++ });
      }
    }

    return arr;
  }, []);

  return (
    <group>
      {buildings.map((b) => (
        <Building
          key={`${b.x}-${b.z}`}
          x={b.x}
          z={b.z}
          h={b.h}
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
          emissiveIntensity={0.18}
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
        <boxGeometry args={[0.72, 0.56, 0.72]} />
        <meshStandardMaterial
          color="#28170a"
          roughness={0.5}
          emissive="#7c2d12"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[0.86, 0.05, 0.86]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.75} />
      </mesh>

      <pointLight position={[0, 0.9, 0]} color="#f59e0b" intensity={1.25} distance={2} />
    </group>
  );
}

function EventStage({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <group
      position={[2.4, 0, -5.2]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("Event Area · Festival active · Crowd growing");
      }}
    >
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.4, 48]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.22} />
      </mesh>

      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.6, 0.45, 0.85]} />
        <meshStandardMaterial color="#18132f" emissive="#7c3aed" emissiveIntensity={0.38} />
      </mesh>

      <pointLight position={[0, 1.2, 0]} color="#a855f7" intensity={6} distance={5} />
      <pointLight position={[0.8, 1.1, -0.4]} color="#fde047" intensity={2.6} distance={4} />
      <Sparkles count={80} speed={0.7} scale={[2.4, 1.8, 2.4]} size={1.8} color="#fde047" opacity={0.66} />
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
    <group rotation={[0, direction, 0]} scale={isBus ? 1.15 : 1}>
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={isBus ? [0.72, 0.22, 0.28] : [0.44, 0.16, 0.23]} />
        <meshStandardMaterial
          color={isTaxi ? "#facc15" : "#0f172a"}
          roughness={0.35}
          metalness={0.45}
          emissive={color}
          emissiveIntensity={0.08}
        />
      </mesh>

      {!isBus && (
        <mesh position={[0.1, 0.25, 0]}>
          <boxGeometry args={[0.2, 0.11, 0.18]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.55} />
        </mesh>
      )}

      <mesh position={[isBus ? 0.39 : 0.25, 0.15, -0.08]}>
        <boxGeometry args={[0.045, 0.026, 0.035]} />
        <meshBasicMaterial color={type === "ev" ? "#67e8f9" : color} />
      </mesh>

      <mesh position={[isBus ? 0.39 : 0.25, 0.15, 0.08]}>
        <boxGeometry args={[0.045, 0.026, 0.035]} />
        <meshBasicMaterial color={type === "ev" ? "#67e8f9" : color} />
      </mesh>
    </group>
  );
}

function ParkingLotCars() {
  const cars = [
    [3.25, 4.1, "#38bdf8", "sedan"],
    [3.75, 5.35, "#a78bfa", "ev"],
    [4.3, 4.25, "#f8fafc", "sedan"],
    [4.9, 5.45, "#fb7185", "sedan"],
    [5.3, 4.2, "#f59e0b", "taxi"],
  ] as const;

  return (
    <group>
      {cars.map(([x, z, c, type], i) => (
        <group key={i} position={[x, 0.09, z]}>
          <Car color={c} type={type} direction={Math.PI / 2} />
        </group>
      ))}
    </group>
  );
}

function CityDetails({ onSelect }: { onSelect: (text: string) => void }) {
  const parkTrees = [
    [-7.2, 3.0],
    [-6.7, 4.2],
    [-5.8, 3.2],
    [-5.2, 4.7],
    [-7.0, 5.1],
    [-5.4, 2.5],
    [-6.1, 5.2],
    [-4.8, 3.7],
  ];

  const streetTrees = [
    [-8.6, -2.2],
    [-7.5, -2.0],
    [-6.3, -1.8],
    [6.6, 4.9],
    [7.7, 4.5],
    [8.7, 4.2],
    [-2.0, -3.8],
    [-1.2, -3.5],
  ];

  const people: [number, number, string][] = [
    [-6.4, 3.8, "#86efac"],
    [-5.6, 4.1, "#f8fafc"],
    [-3.2, -3.2, "#fbbf24"],
    [2.1, -5.0, "#c4b5fd"],
    [2.9, -5.4, "#fb7185"],
    [5.4, -0.4, "#f8fafc"],
  ];

  return (
    <group>
      {parkTrees.map(([x, z], i) => (
        <Tree key={`park-${i}`} x={x} z={z} scale={1.15} />
      ))}

      {streetTrees.map(([x, z], i) => (
        <Tree key={`street-${i}`} x={x} z={z} scale={0.72} />
      ))}

      {people.map(([x, z, c], i) => (
        <Person key={i} x={x} z={z} color={c} />
      ))}

      <CafeBlock x={-4.4} z={-3.55} onSelect={onSelect} />
      <CafeBlock x={-3.45} z={-3.88} onSelect={onSelect} />
      <CafeBlock x={-2.65} z={-3.25} onSelect={onSelect} />

      <EventStage onSelect={onSelect} />
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
    useRef<THREE.Group>(null),
  ];

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    refs.forEach((ref, i) => {
      if (!ref.current) return;

      const speed = 0.7 + i * 0.16;
      const p = ((t * speed + i * 3.2) % 21) - 10.5;

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
      } else if (i === 4) {
        ref.current.position.set(p * 0.72, 0.11, -0.55 + Math.sin(t + i) * 0.8);
        ref.current.rotation.y = Math.PI / 2;
      } else {
        ref.current.position.set(-p * 0.72, 0.11, 1.0 + Math.cos(t + i) * 0.6);
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
          <pointLight color={colors[i]} intensity={0.65} distance={1.35} />
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

function SelectionPanel({ text }: { text: string }) {
  return (
    <Html position={[-7.8, 3.2, -7.8]} transform distanceFactor={10}>
      <div className="selectionPanel">
        <b>SEVORA LIVE INSIGHT</b>
        <p>{text}</p>
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
    <Canvas shadows dpr={[1, 1.65]} camera={{ position: [0, 10.4, 12.3], fov: 43 }}>
      <color attach="background" args={[colors.bg]} />
      <fog attach="fog" args={[colors.fog, 13, 34]} />

      <ambientLight intensity={colors.ambient} />
      <directionalLight position={[4, 12, 7]} intensity={colors.sun} castShadow />
      <pointLight position={[-6, 5, -4]} color={colors.cyan} intensity={15} distance={14} />
      <pointLight position={[7, 5, -2]} color={colors.purple} intensity={13} distance={14} />
      <pointLight position={[0, 4, 5]} color="#f59e0b" intensity={3} distance={7} />

      <Sparkles
        count={180}
        speed={0.28}
        scale={[21, 4, 21]}
        size={1.35}
        color={colors.cyan}
        opacity={0.24}
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
        minDistance={8}
        maxDistance={22}
        minPolarAngle={0.45}
        maxPolarAngle={1.25}
      />
    </Canvas>
  );
}

export default memo(CityModel);
