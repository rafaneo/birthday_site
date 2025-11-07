"use client";
import { Canvas } from "@react-three/fiber";
import * as Drei from "@react-three/drei";
import { Suspense } from "react";
import BirthdayCard3D from "./BirthdayCard";

function LoadingPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-amber-300 to-gray-500 text-2xl text-white">
      Loading scene...
    </div>
  );
}

function TableModel() {
  const { scene } = Drei.useGLTF("/models/table.glb");
  return <primitive object={scene} scale={1.5} position={[-10, -2, 6]} />;
}

function LeavesModel() {
  const { scene } = Drei.useGLTF("/models/leaves.glb");
  return <primitive object={scene} scale={2} position={[0, 1.08, 1.9]} />;
}

function TreeModel() {
  const { scene } = Drei.useGLTF("/models/autumn_maple.glb");
  return <primitive object={scene} scale={6} position={[-3, -0.5, -2]} />;
}

function CherryCakeModel() {
  const { scene } = Drei.useGLTF("/models/cherrycake.glb");
  return (
    <primitive
      object={scene}
      scale={0.35}
      position={[-0.4, 1.08, 2.3]}
      rotation={[0, Math.PI / 1.5, 0]}
    />
  );
}

function ChocolateCakeModel() {
  const { scene } = Drei.useGLTF("/models/ganache.glb");
  return <primitive object={scene} scale={0.3} position={[0, 1.08, 1.6]} />;
}

export default function Scene() {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-amber-300 to-gray-500">
      <Canvas shadows>
        <color attach="background" args={["#fef3c7"]} />
        <Drei.PerspectiveCamera makeDefault position={[0, 1.5, 4]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={2} castShadow />

        <Suspense fallback={<LoadingPlaceholder />}>
          <BirthdayCard3D />
          <ChocolateCakeModel />
          <TreeModel />
          <TableModel />
          <LeavesModel />
          <CherryCakeModel />
        </Suspense>

        <Drei.OrbitControls target={[0, 1.3, 1.8]} enableDamping />
      </Canvas>
    </div>
  );
}
