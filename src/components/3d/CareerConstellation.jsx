import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Category color palette mapping for dynamic visual responsiveness
 */
const CATEGORY_COLORS = [
  { primary: '#FF8A00', secondary: '#FF3366', ambient: '#8B5CF6' }, // Software / General Tech (Amber/Coral/Violet)
  { primary: '#8B5CF6', secondary: '#06B6D4', ambient: '#3B82F6' }, // AI & Data Science (Violet/Cyan)
  { primary: '#10B981', secondary: '#06B6D4', ambient: '#F59E0B' }, // Finance & Quant (Emerald/Teal)
  { primary: '#EC4899', secondary: '#8B5CF6', ambient: '#FF8A00' }, // Design & Creative (Pink/Violet)
  { primary: '#06B6D4', secondary: '#10B981', ambient: '#3B82F6' }, // Healthcare & Bio (Cyan/Green)
  { primary: '#F59E0B', secondary: '#EF4444', ambient: '#8B5CF6' }, // Core Engineering (Amber/Red)
  { primary: '#6366F1', secondary: '#EC4899', ambient: '#14B8A6' }, // Business & Ops (Indigo/Pink)
];

/**
 * Career Data Starfield / Node Nebula
 * Renders floating skill & pathway data nodes in 3D space
 */
function Starfield({ categoryIndex = 0 }) {
  const pointsRef = useRef();
  const count = 550;

  const palette = CATEGORY_COLORS[categoryIndex % CATEGORY_COLORS.length];

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color(palette.primary);
    const color2 = new THREE.Color(palette.secondary);
    const color3 = new THREE.Color(palette.ambient);
    const colorWhite = new THREE.Color('#FFFFFF');

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      const radius = 2.8 + Math.random() * 3.5;

      pos[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(theta);

      // Color distribution
      const rand = Math.random();
      let chosenColor = color1;
      if (rand > 0.7) chosenColor = color2;
      else if (rand > 0.45) chosenColor = color3;
      else if (rand > 0.88) chosenColor = colorWhite;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [categoryIndex, count, palette]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Central Quantum Career Lattice
 * Rotating geometric wireframe representing structured pathways and milestones
 */
function QuantumLattice({ categoryIndex = 0 }) {
  const outerLatticeRef = useRef();
  const innerCoreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();

  const palette = CATEGORY_COLORS[categoryIndex % CATEGORY_COLORS.length];

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (outerLatticeRef.current) {
      outerLatticeRef.current.rotation.x += delta * 0.08;
      outerLatticeRef.current.rotation.y += delta * 0.12;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x -= delta * 0.14;
      innerCoreRef.current.rotation.z += delta * 0.1;
      // Gentle breathing pulse
      const scale = 1 + Math.sin(t * 1.5) * 0.05;
      innerCoreRef.current.scale.set(scale, scale, scale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.06;
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.2 + 0.8;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.09;
      ring2Ref.current.rotation.y = Math.cos(t * 0.6) * 0.25 - 0.6;
    }
  });

  return (
    <group>
      {/* Outer Icosahedron Geodesic Wireframe */}
      <mesh ref={outerLatticeRef}>
        <icosahedronGeometry args={[2.0, 1]} />
        <meshBasicMaterial
          wireframe
          color={palette.primary}
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Inner Crystalline Octahedron Core */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshBasicMaterial
          wireframe
          color={palette.secondary}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Orbital Trajectory Ring 1 */}
      <mesh ref={ring1Ref} rotation={[0.8, 0.4, 0]}>
        <torusGeometry args={[2.7, 0.012, 16, 80]} />
        <meshBasicMaterial
          color={palette.primary}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbital Trajectory Ring 2 */}
      <mesh ref={ring2Ref} rotation={[-0.6, -0.5, 0.3]}>
        <torusGeometry args={[3.2, 0.009, 16, 80]} />
        <meshBasicMaterial
          color={palette.ambient}
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/**
 * Scene Controller for Interactive Mouse Parallax
 */
function SceneRig({ categoryIndex = 0, children }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    // Smooth lerp toward mouse pointer coordinates
    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.25;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.04);
  });

  return <group ref={groupRef}>{children}</group>;
}

/**
 * Main CareerConstellation 3D Canvas Component
 * Designed to sit seamlessly in the hero background with zero blocking of UI events
 */
export const CareerConstellation = ({ 
  categoryIndex = 0, 
  className = '' 
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  // Check WebGL support safely
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const glSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setHasWebGL(glSupported);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    // Graceful fallback for non-WebGL environments
    return (
      <div className={`absolute inset-0 pointer-events-none opacity-30 ${className}`}>
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,#FF8A0015,transparent_70%)]" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {/* Subtle atmospheric vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060709]/40 to-[#060709] pointer-events-none z-10" />

      {/* R3F High Performance Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6.8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none' }}
      >
        <SceneRig categoryIndex={categoryIndex}>
          <Starfield categoryIndex={categoryIndex} />
          <QuantumLattice categoryIndex={categoryIndex} />
        </SceneRig>
      </Canvas>
    </div>
  );
};

export default CareerConstellation;
