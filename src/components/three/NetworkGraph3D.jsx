import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';

/**
 * 3D floating DevOps pipeline network — React Three Fiber.
 *
 * Eight glowing tool nodes (GitHub → Docker → Jenkins → AWS → K8s → …)
 * connected by cyan lines with "data packet" spheres traveling the edges,
 * the whole constellation slowly orbiting. Hovering a node scales it up
 * and reveals its label. Rendered at the bottom of the Skills section.
 *
 * Performance & a11y: honours prefers-reduced-motion (static frame),
 * dpr capped at 2, geometries/materials disposed on unmount.
 */

const CYAN = '#00d4ff';

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Pipeline nodes ------------------------------------------------
const NODES = [
  { name: 'GitHub', position: [-2.5, 1.5, 0], color: '#6e40c9' },
  { name: 'Docker', position: [-0.8, 2.0, 0], color: '#2496ed' },
  { name: 'Jenkins', position: [1.0, 1.5, 0], color: '#d33833' },
  { name: 'AWS', position: [2.5, 0.5, 0], color: '#f59e0b' },
  { name: 'K8s', position: [1.5, -1.0, 0], color: '#326ce5' },
  { name: 'Terraform', position: [-0.5, -1.5, 0], color: '#7c3aed' },
  { name: 'Grafana', position: [-2.0, -0.5, 0], color: '#f46800' },
  { name: 'Nginx', position: [0.0, 0.2, 0], color: '#22c55e' },
];

// ---- Pipeline edges (by node name) ---------------------------------
const EDGES = [
  ['GitHub', 'Docker'],
  ['Docker', 'Jenkins'],
  ['Jenkins', 'AWS'],
  ['Jenkins', 'K8s'],
  ['K8s', 'Terraform'],
  ['AWS', 'K8s'],
  ['K8s', 'Grafana'],
  ['Nginx', 'Docker'],
  ['Nginx', 'K8s'],
];

/* ---------- Floating, hoverable tool node -------------------------- */
function Node({ node, index, animate }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const baseY = node.position[1];

  useFrame(({ clock }) => {
    if (!ref.current) return;
    if (animate) {
      ref.current.position.y = baseY + Math.sin(clock.getElapsedTime() + index) * 0.12;
    }
    const target = hovered ? 1.5 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
  });

  return (
    <group
      ref={ref}
      position={node.position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = '';
      }}
    >
      <mesh>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 2 : 1}
          toneMapped={false}
        />
      </mesh>

      {/* Soft halo */}
      <mesh>
        <sphereGeometry args={[0.26, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.12} toneMapped={false} />
      </mesh>

      <Html
        center
        position={[0, -0.38, 0]}
        distanceFactor={5}
        zIndexRange={[10, 0]}
        wrapperClass="pointer-events-none"
      >
        <span
          className={`glass whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[11px] transition-opacity duration-200 ${
            hovered ? 'opacity-100 text-slate-50' : 'opacity-60 text-slate-400'
          }`}
          style={{ borderColor: hovered ? node.color : undefined }}
        >
          {node.name}
        </span>
      </Html>
    </group>
  );
}

/* ---------- Edge line + traveling packet --------------------------- */
function Edge({ from, to, index, animate }) {
  const packetRef = useRef();
  const progress = useRef((index * 0.13) % 1);

  const { start, end } = useMemo(
    () => ({
      start: new THREE.Vector3(...from.position),
      end: new THREE.Vector3(...to.position),
    }),
    [from, to]
  );

  useFrame(() => {
    if (!animate || !packetRef.current) return;
    progress.current += 0.004;
    if (progress.current > 1) progress.current -= 1;
    packetRef.current.position.lerpVectors(start, end, progress.current);
  });

  return (
    <group>
      <Line points={[start, end]} color={CYAN} lineWidth={0.8} transparent opacity={0.3} />
      <mesh ref={packetRef} position={start}>
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

/* ---------- Scene ---------------------------------------------------- */
function NetworkInner({ animate }) {
  const groupRef = useRef();
  const { scene } = useThree();

  const edges = useMemo(() => {
    const byName = Object.fromEntries(NODES.map((n) => [n.name, n]));
    return EDGES.map(([a, b]) => [byName[a], byName[b]]);
  }, []);

  // Slow constellation orbit.
  useFrame(() => {
    if (animate && groupRef.current) groupRef.current.rotation.y += 0.001;
  });

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
      <ambientLight color="#1a1a2e" intensity={0.9} />
      <directionalLight position={[4, 3, 5]} color="#ffffff" intensity={1} />
      <pointLight position={[0, 0, 4]} color={CYAN} intensity={1.2} distance={12} />

      <group ref={groupRef}>
        {edges.map(([from, to], i) => (
          <Edge key={`${from.name}-${to.name}`} from={from} to={to} index={i} animate={animate} />
        ))}
        {NODES.map((node, i) => (
          <Node key={node.name} node={node} index={i} animate={animate} />
        ))}
      </group>
    </>
  );
}

/* ---------- Default export: Canvas wrapper -------------------------- */
export default function NetworkGraph3D({ className = '' }) {
  const animate = !reduceMotion();

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        frameloop={animate ? 'always' : 'demand'}
      >
        <NetworkInner animate={animate} />
      </Canvas>
    </div>
  );
}
