import { forwardRef, Suspense, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Line } from '@react-three/drei';

/**
 * Cinematic 3D deployment globe — React Three Fiber.
 *
 * Textured Earth (NASA Blue Marble) with a faint cyan wireframe, dual
 * atmosphere layers,
 * 12 pulsing cloud-region hotspots (ripple rings), and glowing arcs with
 * "data packet" spheres traveling between regions. Wrapped in a Canvas with
 * drag-to-rotate OrbitControls plus HTML overlay badges, so the Hero can
 * lazy-load this single file and keep three.js in its own chunk.
 *
 * Palette matches the design system: cyan #00d4ff, purple #7c3aed,
 * terminal-green #22c55e home base, AWS-orange #f59e0b highlights.
 *
 * Performance & a11y:
 *  - prefers-reduced-motion → frameloop="demand", all animation skipped.
 *  - dpr capped at 2; fewer stars + arcs on <768px screens.
 *  - Explicit geometry/material disposal on unmount.
 */

const GLOBE_R = 2.2;
const DEG = Math.PI / 180;
// Equirectangular day map — continents must stay recognizable, so land
// detail matters more here than matching the neon palette exactly.
const EARTH_TEXTURE = `${import.meta.env.BASE_URL}textures/earth-day.jpg`;
const CYAN = '#00d4ff';
const PURPLE = '#7c3aed';
const GREEN = '#22c55e';
const ORANGE = '#f59e0b';

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

/** Lat/lng (degrees) → xyz on a sphere of the given radius. */
function latLngToVec3(lat, lng, radius) {
  const phi = (90 - lat) * DEG;
  const theta = (lng + 180) * DEG;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// ---- 12 cloud-region hotspots -------------------------------------
const REGIONS = [
  { name: 'Sri Lanka', lat: 7.8731, lng: 80.7718, color: GREEN, label: '<home />', labelClass: 'text-terminal-green' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, color: CYAN },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, color: CYAN },
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, color: CYAN },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777, color: CYAN },
  { name: 'Frankfurt', lat: 50.1109, lng: 8.6821, color: PURPLE, label: 'AWS eu-central', labelClass: 'text-brand-purple-soft' },
  { name: 'London', lat: 51.5074, lng: -0.1278, color: PURPLE },
  { name: 'N. Virginia', lat: 37.4316, lng: -78.6569, color: ORANGE, label: 'AWS us-east-1', labelClass: 'text-[#f59e0b]' },
  { name: 'Oregon', lat: 43.8041, lng: -120.5542, color: ORANGE },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333, color: CYAN },
  { name: 'Johannesburg', lat: -26.2041, lng: 28.0473, color: CYAN },
  { name: 'Seoul', lat: 37.5665, lng: 126.978, color: CYAN },
];

// ---- Arc routes between region names -------------------------------
const ROUTES = [
  ['Sri Lanka', 'Singapore'],
  ['Singapore', 'Tokyo'],
  ['Tokyo', 'N. Virginia'], // trans-pacific
  ['N. Virginia', 'London'], // trans-atlantic
  ['London', 'Frankfurt'],
  ['Frankfurt', 'Mumbai'],
  ['Mumbai', 'Singapore'],
  ['N. Virginia', 'São Paulo'],
  ['Sydney', 'Singapore'],
  ['Seoul', 'Tokyo'],
];

/* ---------- Globe core + wireframe + atmosphere ------------------- */
const GlobeCore = forwardRef(function GlobeCore(_, ref) {
  const earthMap = useLoader(THREE.TextureLoader, EARTH_TEXTURE);
  useMemo(() => {
    earthMap.colorSpace = THREE.SRGBColorSpace;
    earthMap.anisotropy = 8;
  }, [earthMap]);

  return (
    <group>
      {/* Earth sphere — day map so continents/countries are recognizable.
          The emissiveMap re-uses the day map so the night side never goes
          fully black and landmasses stay readable while the globe spins. */}
      <mesh ref={ref}>
        <sphereGeometry args={[GLOBE_R, 80, 80]} />
        <meshPhongMaterial
          map={earthMap}
          emissiveMap={earthMap}
          emissive="#7a8db0"
          emissiveIntensity={0.45}
          specular="#1d3a5f"
          shininess={12}
        />
      </mesh>

      {/* Faint cyan wireframe overlay */}
      <mesh>
        <sphereGeometry args={[GLOBE_R + 0.02, 40, 40]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.04} />
      </mesh>

      {/* Atmosphere layer 1 — inner cyan glow */}
      <mesh>
        <sphereGeometry args={[2.28, 48, 48]} />
        <meshPhongMaterial color={CYAN} transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>

      {/* Atmosphere layer 2 — outer purple halo */}
      <mesh>
        <sphereGeometry args={[2.5, 48, 48]} />
        <meshPhongMaterial color={PURPLE} transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </group>
  );
});

/* ---------- Pulsing hotspot dot + ripple ring + optional label ---- */
function Hotspot({ region, index, occludeRef, animate }) {
  const dotRef = useRef();
  const ringRef = useRef();
  const position = useMemo(
    () => latLngToVec3(region.lat, region.lng, GLOBE_R + 0.02),
    [region]
  );
  // Orient the ripple ring flush with the surface (normal = position dir).
  const ringQuat = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), position.clone().normalize());
    return q;
  }, [position]);

  useFrame(({ clock }) => {
    if (!animate) return;
    const t = clock.getElapsedTime();
    // Dot breathes 0.7 → 1.4
    if (dotRef.current) {
      dotRef.current.scale.setScalar(1.05 + Math.sin(t * 2 + index) * 0.35);
    }
    // Ring ripples out: scale 1 → 2, opacity 0.6 → 0 on a 2s loop
    if (ringRef.current) {
      const phase = ((t + index * 0.35) % 2) / 2;
      ringRef.current.scale.setScalar(1 + phase);
      ringRef.current.material.opacity = 0.6 * (1 - phase);
    }
  });

  return (
    <group position={position}>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial
          color={region.color}
          emissive={region.color}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={ringRef} quaternion={ringQuat}>
        <torusGeometry args={[0.07, 0.008, 8, 32]} />
        <meshBasicMaterial color={region.color} transparent opacity={0.6} toneMapped={false} />
      </mesh>

      {region.label && (
        <Html
          center
          position={[0, 0.18, 0]}
          distanceFactor={3.2}
          occlude={occludeRef ? [occludeRef] : undefined}
          zIndexRange={[10, 0]}
          wrapperClass="pointer-events-none"
        >
          <span
            className={`glass whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[11px] ${region.labelClass}`}
          >
            {region.label}
          </span>
        </Html>
      )}
    </group>
  );
}

/* ---------- Glowing arc + traveling data packet -------------------- */
function Arc({ from, to, index, animate }) {
  const packetRef = useRef();
  const progress = useRef(index * 0.1);

  const { curve, points } = useMemo(() => {
    const start = latLngToVec3(from.lat, from.lng, GLOBE_R + 0.02);
    const end = latLngToVec3(to.lat, to.lng, GLOBE_R + 0.02);
    const dist = start.distanceTo(end);
    // Peak altitude grows with arc length; long hauls reach ~3.2.
    const peak = Math.min(3.2, GLOBE_R + 0.35 + dist * 0.18);

    // 5 control points: endpoints + 3 midpoints pushed outward.
    const lerpOnSphere = (t, r) =>
      new THREE.Vector3().lerpVectors(start, end, t).normalize().multiplyScalar(r);
    const curve = new THREE.CatmullRomCurve3([
      start,
      lerpOnSphere(0.25, (GLOBE_R + peak) / 2),
      lerpOnSphere(0.5, peak),
      lerpOnSphere(0.75, (GLOBE_R + peak) / 2),
      end,
    ]);
    return { curve, points: curve.getPoints(60) };
  }, [from, to]);

  useFrame(() => {
    if (!animate || !packetRef.current) return;
    progress.current += 0.004;
    if (progress.current > 1) progress.current -= 1;
    curve.getPointAt(progress.current, packetRef.current.position);
  });

  return (
    <group>
      <Line points={points} color={CYAN} lineWidth={0.8} transparent opacity={0.5} />
      <mesh ref={packetRef} position={points[0]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/* ---------- Slowly drifting star shell ----------------------------- */
function Stars({ count, animate }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const dir = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();
      dir.multiplyScalar(8 + Math.random() * 6); // shell radius 8 → 14
      arr.set([dir.x, dir.y, dir.z], i * 3);
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (animate && ref.current) ref.current.rotation.y += 0.0001;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.025} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ---------- Scene: lights + rotating globe group ------------------- */
function GlobeSceneInner({ animate }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const { scene } = useThree();

  const mobile = isMobile();
  const routes = useMemo(() => {
    const byName = Object.fromEntries(REGIONS.map((r) => [r.name, r]));
    const pairs = ROUTES.map(([a, b]) => [byName[a], byName[b]]);
    return mobile ? pairs.slice(0, 5) : pairs;
  }, [mobile]);

  // Slow, elegant auto-rotation of the whole planet (dots + arcs ride along).
  useFrame(() => {
    if (animate && groupRef.current) groupRef.current.rotation.y += 0.0015;
  });

  // Dispose all geometries/materials on unmount.
  useEffect(() => {
    return () => {
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [scene]);

  return (
    <>
      {/* Lighting rig */}
      <ambientLight color="#1a1a2e" intensity={0.8} />
      <directionalLight position={[5, 3, 5]} color="#ffffff" intensity={1.2} />
      <pointLight position={[4, 4, 4]} color={CYAN} intensity={1.5} distance={10} />
      <pointLight position={[-4, -2, -4]} color={PURPLE} intensity={0.8} distance={8} />
      <pointLight position={[0, -5, 0]} color="#0a2040" intensity={0.5} />

      <Stars count={mobile ? 200 : 600} animate={animate} />

      <group ref={groupRef} rotation={[0, -1.2, 0]}>
        <GlobeCore ref={coreRef} />
        {REGIONS.map((region, i) => (
          <Hotspot
            key={region.name}
            region={region}
            index={i}
            occludeRef={coreRef}
            animate={animate}
          />
        ))}
        {routes.map(([from, to], i) => (
          <Arc key={`${from.name}-${to.name}`} from={from} to={to} index={i} animate={animate} />
        ))}
      </group>
    </>
  );
}

/* ---------- Default export: Canvas + overlay badges ---------------- */
export default function GlobeScene({ className = '' }) {
  const animate = !reduceMotion();

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 1.5, 5.5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        frameloop={animate ? 'always' : 'demand'}
      >
        <Suspense fallback={null}>
          <GlobeSceneInner animate={animate} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          minPolarAngle={Math.PI * 0.3}
          maxPolarAngle={Math.PI * 0.7}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>

      {/* ---- HTML overlay badges (never intercept drag) ---- */}
      <div className="pointer-events-none absolute right-3 top-3 z-10">
        <span className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs text-accent shadow-glow">
          ☁ 12 Active Regions
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 z-10">
        <span className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal-green" />
          </span>
          Live Infrastructure
        </span>
      </div>
    </div>
  );
}
