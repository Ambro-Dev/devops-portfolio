// src/components/home/tech-cube.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Html, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useThemeStore } from "@/lib/theme";
import { motion } from "framer-motion";
import * as THREE from "three";

// Technologie do wyświetlenia na kostce
const technologies = [
  { name: "React", icon: "/images/tech/react.svg", color: "#61DAFB" },
  { name: "TypeScript", icon: "/images/tech/typescript.svg", color: "#3178C6" },
  { name: "Next.js", icon: "/images/tech/nextjs.svg", color: "#000000" },
  { name: "Node.js", icon: "/images/tech/nodejs.svg", color: "#339933" },
  { name: "Docker", icon: "/images/tech/docker.svg", color: "#2496ED" },
  { name: "Kubernetes", icon: "/images/tech/kubernetes.svg", color: "#326CE5" },
];

function Cube() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const { mode } = useThemeStore();
  const isDark = mode === "dark";

  // Animacja rotacji kostki
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((state, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.005;
      cubeRef.current.rotation.x =
        Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <Box ref={cubeRef} args={[3.5, 3.5, 3.5]} position={[0, 0, 0]}>
      {/* Renderowanie 6 ścian kostki z różnymi technologiami */}
      {technologies.map((tech, index) => (
        <meshStandardMaterial
          key={tech.name}
          attach={`material-${index}`}
          transparent
          opacity={0.9}
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={isDark ? 0.5 : 0.2}
        >
          <Html
            transform
            distanceFactor={1.6}
            position={[0, 0, 0]}
            rotation={getCubeFaceRotation(index) as [number, number, number]}
            center
          >
            <div className="flex flex-col items-center justify-center w-24 h-24 bg-transparent">
              <div className="relative w-12 h-12 mb-2">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-white" : "text-black"
                } drop-shadow-md`}
              >
                {tech.name}
              </p>
            </div>
          </Html>
        </meshStandardMaterial>
      ))}
    </Box>
  );
}

// Funkcja pomocnicza do obracania zawartości dla różnych ścian kostki
function getCubeFaceRotation(index: number) {
  switch (index) {
    case 0:
      return [0, 0, 0]; // front
    case 1:
      return [0, Math.PI, 0]; // back
    case 2:
      return [0, Math.PI / 2, 0]; // right
    case 3:
      return [0, -Math.PI / 2, 0]; // left
    case 4:
      return [Math.PI / 2, 0, 0]; // top
    case 5:
      return [-Math.PI / 2, 0, 0]; // bottom
    default:
      return [0, 0, 0];
  }
}

export function TechCube() {
  const { mode } = useThemeStore();
  const isDark = mode === "dark";
  const [isMounted, setIsMounted] = useState(false);

  // Odwlekamy rendering komponentu Canvas do momentu, gdy jest on zamontowany po stronie klienta
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        Loading 3D...
      </div>
    );
  }

  return (
    <motion.div
      className="relative w-full h-96"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={isDark ? 0.5 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={isDark ? 0.5 : 0.8} />
        <pointLight position={[-10, -10, -10]} intensity={isDark ? 0.3 : 0.5} />
        <Cube />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </motion.div>
  );
}
