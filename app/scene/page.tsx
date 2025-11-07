"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import * as Drei from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";
import BirthdayCard3D from "./BirthdayCard";

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
    return  <primitive
      object={scene}
      scale={0.35}
      position={[-0.4, 1.08, 2.3]}
      rotation={[0, Math.PI / 1.5, 0]} // 90° around Y
    />
}

function ChocolateCakeModel() {
    const { scene } = Drei.useGLTF("/models/ganache.glb");
    return <primitive object={scene} scale={0.3} position={[0, 1.08, 1.6]} />;
}

/* ---------------- Main Scene ---------------- */
export default function Scene() {
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-amber-300 to-gray-500">
      <Canvas shadows>
        {/* Camera */}
        <Drei.PerspectiveCamera makeDefault position={[0, 1.5, 4]} />

        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={2} castShadow />

        {/* Objects */}
        {/* Uncomment these when models are ready */}
        {/* <CakeModel /> */}

        <BirthdayCard3D />
        <ChocolateCakeModel />
        <TreeModel />
        <Drei.OrbitControls />
        <TableModel />
        <LeavesModel />
        <CherryCakeModel />
        {/* <PieModel /> */}

        {/* Controls */}
        <Drei.OrbitControls 
          target={[0, 1.3, 1.8]}
          enableDamping
          />
      </Canvas>
    </div>
  );
}
