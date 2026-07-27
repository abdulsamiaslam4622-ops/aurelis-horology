import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Group } from "three";
import { MeshStandardMaterial } from "three";

function Watch({ scrollY }: { scrollY: { current: number } }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.25 + scrollY.current * 0.003;
    ref.current.rotation.x = Math.sin(t * 0.3) * 0.1 - scrollY.current * 0.0008;
  });

  const gold = new MeshStandardMaterial({ color: "#d4af6a", metalness: 1, roughness: 0.15 });
  const dark = new MeshStandardMaterial({ color: "#0a0a0a", metalness: 0.9, roughness: 0.25 });
  const glass = new MeshStandardMaterial({ color: "#1a1a1a", metalness: 0.4, roughness: 0.05, transparent: true, opacity: 0.6 });

  return (
    <group ref={ref} scale={1.1}>
      {/* Case bezel */}
      <mesh material={gold} position={[0, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.35, 96]} />
      </mesh>
      {/* Case body */}
      <mesh material={gold} position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1.55, 1.4, 0.5, 96]} />
      </mesh>
      {/* Dial */}
      <mesh material={dark} position={[0, 0.18, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.02, 96]} />
      </mesh>
      {/* Glass */}
      <mesh material={glass} position={[0, 0.22, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.05, 96]} />
      </mesh>
      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} material={gold} position={[Math.sin(a) * 1.15, 0.195, Math.cos(a) * 1.15]}>
            <boxGeometry args={[0.06, 0.02, 0.15]} />
          </mesh>
        );
      })}
      {/* Hands */}
      <mesh material={gold} position={[0, 0.21, 0.35]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.04, 0.02, 0.75]} />
      </mesh>
      <mesh material={gold} position={[0.5, 0.21, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.03, 0.02, 1.0]} />
      </mesh>
      <mesh material={gold} position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 32]} />
      </mesh>
      {/* Crown */}
      <mesh material={gold} position={[1.6, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.2, 32]} />
      </mesh>
      {/* Strap hints */}
      <mesh material={dark} position={[0, -0.2, 1.6]}>
        <boxGeometry args={[1.6, 0.35, 1.3]} />
      </mesh>
      <mesh material={dark} position={[0, -0.2, -1.6]}>
        <boxGeometry args={[1.6, 0.35, 1.3]} />
      </mesh>
    </group>
  );
}

function ScrollTracker({ scrollY }: { scrollY: { current: number } }) {
  useFrame(() => {
    scrollY.current = typeof window !== "undefined" ? window.scrollY : 0;
  });
  return null;
}

export function WatchScene() {
  const scrollY = useRef(0);
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 1.2, 5], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <spotLight position={[6, 8, 6]} intensity={2.2} color="#f4d599" angle={0.6} penumbra={0.8} />
        <spotLight position={[-6, 4, -4]} intensity={1.2} color="#c9a15c" />
        <pointLight position={[0, -3, 2]} intensity={0.4} color="#fff2c9" />
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
          <Watch scrollY={scrollY} />
        </Float>
        <Environment preset="night" />
      </Suspense>
      <ScrollTracker scrollY={scrollY} />
    </Canvas>
  );
}
