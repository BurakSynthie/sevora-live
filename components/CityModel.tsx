"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { memo, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type CityMode = "night" | "day" | "work" | "event";

type Zone = {
  id: string;
  title: string;
  type: string;
  subtitle: string;
  value: string;
  color: string;
  x: number;
  z: number;
  detail: string;
};

const zones: Zone[] = [
  {
    id: "park",
    title: "Yıldız Park",
    type: "CALM",
    subtitle: "Green quiet zone",
    value: "28%",
    color: "#22c55e",
    x: -8.2,
    z: 6.7,
    detail: "Low density park area with calm walking paths, trees and quiet score.",
  },
  {
    id: "cafe",
    title: "Cafe Street",
    type: "WORK",
    subtitle: "Wi‑Fi + calm seats",
    value: "12 spots",
    color: "#f59e0b",
    x: -7.6,
    z: -6.6,
    detail: "Work-friendly café district with visible shop lights and calm seating signals.",
  },
  {
    id: "event",
    title: "Event Plaza",
    type: "LIVE",
    subtitle: "Festival active",
    value: "20:00",
    color: "#a855f7",
    x: 7.2,
    z: -6.5,
    detail: "Live event stage with crowd movement, spot lights and activity pulse.",
  },
  {
    id: "business",
    title: "Business Core",
    type: "BUSY",
    subtitle: "Crowd rising",
    value: "82%",
    color: "#fb3f70",
    x: 7.7,
    z: 0.5,
    detail: "Dense business district with high movement and active traffic signals.",
  },
  {
    id: "parking",
    title: "Parking Hub",
    type: "PARK",
    subtitle: "Open spaces",
    value: "6 min",
    color: "#38bdf8",
    x: 7.7,
    z: 6.4,
    detail: "Parking area with visible parked vehicles and estimated walking distance.",
  },
];

function modeTheme(mode: CityMode) {
  if (mode === "day") {
    return {
      bg: "#081528",
      fog: "#081528",
      ground: "#0b1728",
      road: "#121826",
      roadLine: "#dbeafe",
      primary: "#38bdf8",
      secondary: "#818cf8",
      ambient: 0.72,
      sun: 2.6,
      windows: 0.42,
    };
  }

  if (mode === "work") {
    return {
      bg: "#03131f",
      fog: "#03131f",
      ground: "#061320",
      road: "#0b1728",
      roadLine: "#dbeafe",
      primary: "#22d3ee",
      secondary: "#14b8a6",
      ambient: 0.52,
      sun: 1.9,
      windows: 0.58,
    };
  }

  if (mode === "event") {
    return {
      bg: "#08051a",
      fog: "#08051a",
      ground: "#080d1c",
      road: "#120a20",
      roadLine: "#f5d0fe",
      primary: "#a78bfa",
      secondary: "#fb3f70",
      ambient: 0.48,
      sun: 1.75,
      windows: 0.68,
    };
  }

  return {
    bg: "#020814",
    fog: "#020814",
    ground: "#050d1b",
    road: "#08111f",
    roadLine: "#dbeafe",
    primary: "#67e8f9",
    secondary: "#a855f7",
    ambient: 0.43,
    sun: 1.65,
    windows: 0.62,
  };
}

function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x += (Math.sin(t * 0.11) * 1.25 - state.camera.position.x) * 0.012;
    state.camera.position.y += (12.8 + Math.sin(t * 0.17) * 0.28 - state.camera.position.y) * 0.012;
    state.camera.position.z += (14.9 + Math.cos(t * 0.13) * 0.6 - state.camera.position.z) * 0.012;
    state.camera.lookAt(0.35, 0.2, 0.1);
  });

  return null;
}

function Ground({ mode }: { mode: CityMode }) {
  const theme = modeTheme(mode);

  const grid = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let i = -14; i <= 14; i++) {
      lines.push([new THREE.Vector3(-14, 0.015, i), new THREE.Vector3(14, 0.015, i)]);
      lines.push([new THREE.Vector3(i, 0.015, -14), new THREE.Vector3(i, 0.015, 14)]);
    }
    return lines;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color={theme.ground} roughness={0.86} metalness={0.14} />
      </mesh>

      {grid.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={theme.primary}
          transparent
          opacity={0.06}
          lineWidth={0.42}
        />
      ))}

      <RoadEW z={-4.6} length={25.5} width={1.42} theme={theme} name="Main Avenue" />
      <RoadEW z={4.4} length={25.0} width={1.32} theme={theme} name="North Boulevard" />
      <RoadNS x={-4.7} length={24.8} width={1.34} theme={theme} name="West Road" />
      <RoadNS x={4.8} length={24.8} width={1.34} theme={theme} name="East Road" />

      <RoadCurve theme={theme} />
      <Crosswalk x={-4.7} z={-4.6} />
      <Crosswalk x={4.8} z={-4.6} />
      <Crosswalk x={-4.7} z={4.4} />
      <Crosswalk x={4.8} z={4.4} />

      <DistrictGround x={-8.2} z={6.7} w={4.7} d={3.8} color="#052e1c" />
      <DistrictGround x={-7.6} z={-6.6} w={4.7} d={3.5} color="#261404" />
      <DistrictGround x={7.2} z={-6.5} w={4.5} d={3.5} color="#170f2e" />
      <DistrictGround x={7.7} z={6.4} w={4.3} d={3.3} color="#071526" />
    </group>
  );
}

function RoadEW({
  z,
  length,
  width,
  theme,
  name,
}: {
  z: number;
  length: number;
  width: number;
  theme: ReturnType<typeof modeTheme>;
  name: string;
}) {
  return (
    <group position={[0, 0.06, z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[length, width]} />
        <meshStandardMaterial
          color={theme.road}
          roughness={0.68}
          metalness={0.22}
          emissive="#061426"
          emissiveIntensity={0.15}
        />
      </mesh>

      <Line points={[[-length / 2 + 0.5, 0.04, 0], [length / 2 - 0.5, 0.04, 0]]} color={theme.roadLine} transparent opacity={0.38} lineWidth={1.1} />
      <Line points={[[-length / 2 + 0.5, 0.04, -width / 2 + 0.12], [length / 2 - 0.5, 0.04, -width / 2 + 0.12]]} color={theme.primary} transparent opacity={0.22} lineWidth={1} />
      <Line points={[[-length / 2 + 0.5, 0.04, width / 2 - 0.12], [length / 2 - 0.5, 0.04, width / 2 - 0.12]]} color={theme.primary} transparent opacity={0.22} lineWidth={1} />

      <Html position={[-length / 2 + 2.3, 0.09, -width / 2 - 0.35]} transform rotation={[-Math.PI / 2, 0, 0]} distanceFactor={8}>
        <div className="roadName">{name}</div>
      </Html>
    </group>
  );
}

function RoadNS({
  x,
  length,
  width,
  theme,
  name,
}: {
  x: number;
  length: number;
  width: number;
  theme: ReturnType<typeof modeTheme>;
  name: string;
}) {
  return (
    <group position={[x, 0.065, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial
          color={theme.road}
          roughness={0.68}
          metalness={0.22}
          emissive="#061426"
          emissiveIntensity={0.15}
        />
      </mesh>

      <Line points={[[0, 0.04, -length / 2 + 0.5], [0, 0.04, length / 2 - 0.5]]} color={theme.roadLine} transparent opacity={0.38} lineWidth={1.1} />
      <Line points={[[-width / 2 + 0.12, 0.04, -length / 2 + 0.5], [-width / 2 + 0.12, 0.04, length / 2 - 0.5]]} color={theme.primary} transparent opacity={0.22} lineWidth={1} />
      <Line points={[[width / 2 - 0.12, 0.04, -length / 2 + 0.5], [width / 2 - 0.12, 0.04, length / 2 - 0.5]]} color={theme.primary} transparent opacity={0.22} lineWidth={1} />

      <Html position={[width / 2 + 0.36, 0.09, -length / 2 + 2.6]} transform rotation={[-Math.PI / 2, 0, Math.PI / 2]} distanceFactor={8}>
        <div className="roadName">{name}</div>
      </Html>
    </group>
  );
}

function RoadCurve({ theme }: { theme: ReturnType<typeof modeTheme> }) {
  const points = [
    new THREE.Vector3(-12.2, 0.115, 0.4),
    new THREE.Vector3(-8.0, 0.115, -1.0),
    new THREE.Vector3(-2.0, 0.115, 0.8),
    new THREE.Vector3(3.2, 0.115, 1.1),
    new THREE.Vector3(11.9, 0.115, -0.5),
  ];

  return (
    <group>
      <Line points={points} color={theme.secondary} transparent opacity={0.34} lineWidth={6.5} />
      <Line points={points} color={theme.primary} transparent opacity={0.55} lineWidth={1.6} />
    </group>
  );
}

function Crosswalk({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, 0.13, z]}>
      {Array.from({ length: 5 }).map((_, index) => (
        <mesh key={index} position={[-0.45 + index * 0.22, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 0.9]} />
          <meshBasicMaterial color="#e2e8f0" transparent opacity={0.42} />
        </mesh>
      ))}
    </group>
  );
}

function DistrictGround({
  x,
  z,
  w,
  d,
  color,
}: {
  x: number;
  z: number;
  w: number;
  d: number;
  color: string;
}) {
  return (
    <mesh position={[x, 0.05, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[w, d]} />
      <meshStandardMaterial
        color={color}
        roughness={0.8}
        metalness={0.12}
        emissive={color}
        emissiveIntensity={0.18}
      />
    </mesh>
  );
}

function Building({
  x,
  z,
  h,
  w,
  d,
  kind,
  color,
  seed,
  onSelect,
}: {
  x: number;
  z: number;
  h: number;
  w: number;
  d: number;
  kind: string;
  color: string;
  seed: number;
  onSelect: (text: string) => void;
}) {
  const windowColor = seed % 4 === 0 ? "#fde68a" : seed % 3 === 0 ? "#93c5fd" : "#67e8f9";
  const roofColor = seed % 5 === 0 ? "#a78bfa" : "#38bdf8";
  const floors = Math.max(2, Math.floor(h * 2.4));

  return (
    <group
      position={[x, h / 2, z]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(`${kind} · Activity ${45 + (seed % 45)}% · Live signal active`);
      }}
    >
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={color}
          roughness={0.35}
          metalness={0.48}
          emissive="#061426"
          emissiveIntensity={0.22}
        />
      </mesh>

      <mesh position={[0, h / 2 + 0.02, 0]}>
        <boxGeometry args={[w + 0.06, 0.04, d + 0.06]} />
        <meshBasicMaterial color={roofColor} transparent opacity={0.48} />
      </mesh>

      {Array.from({ length: floors }).map((_, floor) => (
        <group key={floor}>
          {Array.from({ length: Math.max(2, Math.floor(w * 3)) }).map((_, col) => (
            <mesh
              key={`front-${floor}-${col}`}
              position={[-w / 2 + 0.18 + col * 0.22, -h / 2 + 0.32 + floor * 0.34, d / 2 + 0.006]}
              rotation={[0, 0, 0]}
            >
              <planeGeometry args={[0.08, 0.085]} />
              <meshBasicMaterial color={windowColor} transparent opacity={0.38 + (seed % 3) * 0.06} />
            </mesh>
          ))}

          {Array.from({ length: Math.max(2, Math.floor(d * 3)) }).map((_, col) => (
            <mesh
              key={`side-${floor}-${col}`}
              position={[w / 2 + 0.006, -h / 2 + 0.32 + floor * 0.34, -d / 2 + 0.18 + col * 0.22]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <planeGeometry args={[0.08, 0.085]} />
              <meshBasicMaterial color={windowColor} transparent opacity={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      {kind === "Hotel" && (
        <mesh position={[0, -h / 2 + 0.35, d / 2 + 0.012]}>
          <planeGeometry args={[w * 0.65, 0.16]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.78} />
        </mesh>
      )}

      {kind === "Mall" && (
        <mesh position={[0, -h / 2 + 0.55, d / 2 + 0.012]}>
          <planeGeometry args={[w * 0.78, 0.22]} />
          <meshBasicMaterial color="#fb7185" transparent opacity={0.7} />
        </mesh>
      )}
    </group>
  );
}

function Buildings({ onSelect }: { onSelect: (text: string) => void }) {
  const blocks = [
    [-11.0, -8.7, 2.4, 1.0, 0.85, "Residence", "#071426"],
    [-9.2, -8.9, 3.2, 0.86, 0.86, "Hotel", "#10243d"],
    [-2.4, -8.6, 2.8, 1.05, 0.92, "Office", "#0c2746"],
    [-0.8, -8.8, 4.4, 0.86, 0.86, "Office Tower", "#10243d"],
    [2.2, -8.5, 2.2, 1.2, 0.86, "Mall", "#0b1728"],

    [-11.2, -1.5, 2.3, 0.98, 0.88, "Residence", "#071426"],
    [-9.4, -1.4, 3.0, 0.9, 0.88, "Office", "#0c2746"],
    [-1.8, -1.5, 3.6, 0.88, 0.88, "Office Tower", "#10243d"],
    [1.5, -1.4, 2.5, 1.08, 0.9, "Mall", "#0b1728"],
    [7.0, -1.2, 5.1, 0.9, 0.9, "Office Tower", "#10243d"],
    [8.7, -1.0, 4.2, 0.9, 0.9, "Office Tower", "#0c2746"],
    [10.3, -1.5, 3.3, 1.0, 0.9, "Business", "#071426"],

    [-11.1, 1.7, 2.4, 0.96, 0.86, "Residence", "#071426"],
    [-9.2, 1.7, 2.9, 0.9, 0.9, "Hotel", "#10243d"],
    [-1.8, 1.5, 3.8, 0.88, 0.88, "Office Tower", "#10243d"],
    [1.4, 1.4, 2.6, 1.0, 0.9, "Residence", "#071426"],
    [7.0, 1.5, 5.0, 0.92, 0.92, "Office Tower", "#10243d"],
    [8.8, 1.6, 4.4, 0.9, 0.9, "Office Tower", "#0c2746"],
    [10.6, 1.3, 3.4, 1.0, 0.9, "Business", "#071426"],

    [-2.4, 8.3, 2.0, 1.2, 0.9, "Residence", "#071426"],
    [-0.6, 8.5, 3.1, 0.9, 0.88, "Hotel", "#10243d"],
    [2.0, 8.2, 2.5, 1.15, 0.88, "Mall", "#0b1728"],
  ] as const;

  return (
    <group>
      {blocks.map(([x, z, h, w, d, kind, color], index) => (
        <Building
          key={`${x}-${z}`}
          x={x}
          z={z}
          h={h}
          w={w}
          d={d}
          kind={kind}
          color={color}
          seed={index + 1}
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
        <meshStandardMaterial color="#3f2a17" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <coneGeometry args={[0.28, 0.7, 10]} />
        <meshStandardMaterial color="#15803d" roughness={0.75} emissive="#064e3b" emissiveIntensity={0.18} />
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
        <meshStandardMaterial color="#28170a" roughness={0.5} emissive="#7c2d12" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[0.96, 0.05, 0.86]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.78} />
      </mesh>
      <Html position={[0, 0.92, 0]} center transform distanceFactor={8}>
        <div className="mini3DSign cafeSign">CAFÉ</div>
      </Html>
      <pointLight position={[0, 1.0, 0]} color="#f59e0b" intensity={1.45} distance={2.3} />
    </group>
  );
}

function EventStage({ onSelect }: { onSelect: (text: string) => void }) {
  return (
    <group
      position={[7.2, 0, -6.5]}
      onClick={(event) => {
        event.stopPropagation();
        onSelect("Event Plaza · Festival active · Crowd growing");
      }}
    >
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.62, 56]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.24} />
      </mesh>
      <mesh position={[0, 0.32, 0]} castShadow>
        <boxGeometry args={[1.9, 0.5, 0.95]} />
        <meshStandardMaterial color="#18132f" emissive="#7c3aed" emissiveIntensity={0.42} />
      </mesh>
      <mesh position={[0, 0.98, -0.52]}>
        <boxGeometry args={[1.55, 0.58, 0.06]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.82} />
      </mesh>
      <mesh position={[-0.8, 0.76, 0.42]} rotation={[0, 0.3, 0]}>
        <coneGeometry args={[0.08, 1.6, 18]} />
        <meshBasicMaterial color="#fde047" transparent opacity={0.22} />
      </mesh>
      <mesh position={[0.8, 0.76, 0.42]} rotation={[0, -0.3, 0]}>
        <coneGeometry args={[0.08, 1.6, 18]} />
        <meshBasicMaterial color="#fb7185" transparent opacity={0.22} />
      </mesh>
      <Html position={[0, 1.42, 0]} center transform distanceFactor={8}>
        <div className="mini3DSign eventSign">LIVE EVENT</div>
      </Html>
      <pointLight position={[0, 1.4, 0]} color="#a855f7" intensity={6.3} distance={5.4} />
      <pointLight position={[0.9, 1.2, -0.45]} color="#fde047" intensity={2.9} distance={4.4} />
      <Sparkles count={95} speed={0.78} scale={[2.8, 2.0, 2.8]} size={1.8} color="#fde047" opacity={0.66} />
    </group>
  );
}

function Person({ x, z, color = "#f8fafc" }: { x: number; z: number; color?: string }) {
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
  rotation = 0,
}: {
  color?: string;
  type?: "sedan" | "taxi" | "bus" | "ev";
  rotation?: number;
}) {
  const isBus = type === "bus";
  const isTaxi = type === "taxi";

  return (
    <group rotation={[0, rotation, 0]} scale={isBus ? 1.18 : 1}>
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={isBus ? [0.86, 0.24, 0.32] : [0.52, 0.17, 0.25]} />
        <meshStandardMaterial
          color={isTaxi ? "#facc15" : "#0f172a"}
          roughness={0.34}
          metalness={0.48}
          emissive={color}
          emissiveIntensity={0.08}
        />
      </mesh>
      {!isBus && (
        <mesh position={[0.1, 0.26, 0]}>
          <boxGeometry args={[0.22, 0.11, 0.18]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.58} />
        </mesh>
      )}
      <mesh position={[isBus ? 0.47 : 0.29, 0.15, -0.088]}>
        <boxGeometry args={[0.052, 0.028, 0.038]} />
        <meshBasicMaterial color={type === "ev" ? "#67e8f9" : color} />
      </mesh>
      <mesh position={[isBus ? 0.47 : 0.29, 0.15, 0.088]}>
        <boxGeometry args={[0.052, 0.028, 0.038]} />
        <meshBasicMaterial color={type === "ev" ? "#67e8f9" : color} />
      </mesh>
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
    const p1 = ((t * 0.9) % 22) - 11;
    const p2 = 11 - ((t * 0.78) % 22);
    const p3 = ((t * 0.82) % 22) - 11;
    const p4 = 11 - ((t * 0.72) % 22);
    const p5 = ((t * 0.62) % 22) - 11;
    const p6 = 11 - ((t * 0.66) % 22);

    if (refs[0].current) refs[0].current.position.set(p1, 0.12, -4.2);
    if (refs[1].current) refs[1].current.position.set(p2, 0.12, -5.0);
    if (refs[2].current) refs[2].current.position.set(p3, 0.12, 4.05);
    if (refs[3].current) refs[3].current.position.set(4.35, 0.12, p4);
    if (refs[4].current) refs[4].current.position.set(5.25, 0.12, p5);
    if (refs[5].current) refs[5].current.position.set(-5.15, 0.12, p6);
  });

  return (
    <group>
      <group ref={refs[0]}>
        <Car color="#67e8f9" type="sedan" rotation={0} />
      </group>
      <group ref={refs[1]}>
        <Car color="#f59e0b" type="taxi" rotation={Math.PI} />
      </group>
      <group ref={refs[2]}>
        <Car color="#a78bfa" type="ev" rotation={0} />
      </group>
      <group ref={refs[3]}>
        <Car color="#fb7185" type="sedan" rotation={-Math.PI / 2} />
      </group>
      <group ref={refs[4]}>
        <Car color="#f8fafc" type="bus" rotation={Math.PI / 2} />
      </group>
      <group ref={refs[5]}>
        <Car color="#22c55e" type="sedan" rotation={-Math.PI / 2} />
      </group>
    </group>
  );
}

function ParkingLotCars() {
  const cars = [
    [6.5, 5.5, "#38bdf8", "sedan"],
    [7.1, 6.6, "#a78bfa", "ev"],
    [7.8, 5.5, "#f8fafc", "sedan"],
    [8.4, 6.6, "#fb7185", "sedan"],
    [9.0, 5.5, "#f59e0b", "taxi"],
  ] as const;

  return (
    <group>
      {cars.map(([x, z, color, type], index) => (
        <group key={index} position={[x, 0.1, z]}>
          <Car color={color} type={type} rotation={Math.PI / 2} />
        </group>
      ))}
    </group>
  );
}

function CityDetails({ onSelect }: { onSelect: (text: string) => void }) {
  const trees = [
    [-9.6, 5.5],
    [-8.9, 6.7],
    [-8.1, 5.7],
    [-7.3, 7.2],
    [-6.6, 6.0],
    [-9.9, 7.4],
    [-6.3, 7.1],
    [-7.7, 6.6],
    [-8.7, 7.7],
    [-6.9, 5.1],
  ];

  const streetTrees = [
    [-11.0, -3.6],
    [-9.2, -3.7],
    [-7.4, -3.8],
    [6.4, 4.0],
    [8.2, 4.0],
    [10.1, 4.1],
  ];

  const people: [number, number, string][] = [
    [-8.2, 6.3, "#86efac"],
    [-7.5, 6.0, "#f8fafc"],
    [-7.3, -6.2, "#fbbf24"],
    [-8.1, -6.7, "#fde68a"],
    [6.8, -6.2, "#c4b5fd"],
    [7.5, -7.0, "#fb7185"],
    [8.0, 0.7, "#f8fafc"],
    [7.2, 0.1, "#93c5fd"],
  ];

  return (
    <group>
      {trees.map(([x, z], index) => (
        <Tree key={`park-tree-${index}`} x={x} z={z} scale={1.18} />
      ))}

      {streetTrees.map(([x, z], index) => (
        <Tree key={`street-tree-${index}`} x={x} z={z} scale={0.74} />
      ))}

      {people.map(([x, z, color], index) => (
        <Person key={index} x={x} z={z} color={color} />
      ))}

      <CafeBlock x={-8.4} z={-6.4} onSelect={onSelect} />
      <CafeBlock x={-7.4} z={-7.1} onSelect={onSelect} />
      <CafeBlock x={-6.5} z={-6.3} onSelect={onSelect} />

      <EventStage onSelect={onSelect} />
      <ParkingLotCars />

      <CitySign text="PARK" x={-6.1} z={5.4} color="#22c55e" />
      <CitySign text="CAFE STREET" x={-5.7} z={-6.8} color="#f59e0b" />
      <CitySign text="LIVE EVENT" x={9.4} z={-6.4} color="#a855f7" />
      <CitySign text="PARKING" x={5.7} z={6.5} color="#38bdf8" />
    </group>
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
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.72, 8]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.42} />
      </mesh>
      <Html position={[0, 0.86, 0]} center transform distanceFactor={8}>
        <div className="mini3DSign" style={{ ["--sign" as string]: color }}>
          {text}
        </div>
      </Html>
    </group>
  );
}

function ZonePulse({ zone, delay = 0 }: { zone: Zone; delay?: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = (state.clock.elapsedTime + delay) % 2.8;
    const s = 0.45 + t * 1.12;

    if (ref.current) {
      ref.current.scale.set(s, s, s);

      ref.current.children.forEach((child) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        if (mat) mat.opacity = Math.max(0, 0.6 - t * 0.22);
      });
    }
  });

  return (
    <group ref={ref} position={[zone.x, 0.1, zone.z]} rotation={[-Math.PI / 2, 0, 0]}>
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
        onSelect(`${zone.title} · ${zone.detail}`);
      }}
    >
      <ZonePulse zone={zone} />
      <ZonePulse zone={zone} delay={1.1} />
      <pointLight color={zone.color} intensity={7} distance={6.4} />

      <Float speed={1.8} rotationIntensity={0.06} floatIntensity={0.2}>
        <Html center position={[0, 1.86, 0]} transform distanceFactor={8}>
          <button
            className="premiumSceneTag"
            style={{ ["--zone" as string]: zone.color }}
            type="button"
          >
            <span>{zone.type}</span>
            <b>{zone.title}</b>
            <small>{zone.subtitle}</small>
            <strong>{zone.value}</strong>
          </button>
        </Html>
      </Float>
    </group>
  );
}

function SelectionPanel({ text }: { text: string }) {
  return (
    <Html position={[-10.8, 3.5, -10.4]} transform distanceFactor={10}>
      <div className="selectionPanel selectionPanelV12">
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

  const theme = modeTheme(mode);

  return (
    <Canvas shadows dpr={[1, 1.6]} camera={{ position: [0, 12.8, 14.9], fov: 41 }}>
      <color attach="background" args={[theme.bg]} />
      <fog attach="fog" args={[theme.fog, 16, 39]} />

      <ambientLight intensity={theme.ambient} />
      <directionalLight position={[4, 13, 8]} intensity={theme.sun} castShadow />
      <pointLight position={[-8, 5, -4]} color={theme.primary} intensity={15} distance={16} />
      <pointLight position={[8, 6, -3]} color={theme.secondary} intensity={13} distance={16} />
      <pointLight position={[0, 4, 5]} color="#f59e0b" intensity={3} distance={8} />

      <Sparkles
        count={135}
        speed={0.22}
        scale={[22, 4, 22]}
        size={1.2}
        color={theme.primary}
        opacity={0.18}
      />

      <Ground mode={mode} />
      <Buildings onSelect={setSelected} />
      <CityDetails onSelect={setSelected} />
      <MovingVehicles />

      {zones.map((zone) => (
        <ZoneMarker key={zone.id} zone={zone} onSelect={setSelected} />
      ))}

      <SelectionPanel text={selected} />

      <CameraRig />

      <OrbitControls
        enableZoom
        enablePan={false}
        enableRotate
        minDistance={9}
        maxDistance={25}
        minPolarAngle={0.42}
        maxPolarAngle={1.22}
      />
    </Canvas>
  );
}

export default memo(CityModel);
