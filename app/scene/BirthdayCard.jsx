"use client";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";

/* ------------ Texture helpers ------------ */

function createFrontTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Gradient header
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

  ctx.fillStyle = gradient;
  const headerPadding = 40;
  ctx.fillRect(
    headerPadding,
    headerPadding,
    canvas.width - headerPadding * 2,
    70
  );

  // Header text
  ctx.fillStyle = "#707070ff";
  ctx.font = "bold 42px Tahoma, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("HAPPY BIRTHDAY🎉", canvas.width / 2, headerPadding + 35);

  // Create texture now
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  // ---- Draw toast image instead of balloons ----
  const img = new Image();
  img.src = "/textures/toast.png"; // from public/textures/toast.png
  img.onload = () => {
    // clear area below header just in case
    // (optional, since background is already white)
    // ctx.fillStyle = "#ffffff";
    // ctx.fillRect(0, 140, canvas.width, canvas.height - 140);

    // Fit toast nicely in the middle of the card
    const maxWidth = 390;
    const scale = maxWidth / img.width;
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;
    const x = (canvas.width - drawWidth) / 2;
    const y = 180;

    ctx.drawImage(img, x, y, drawWidth, drawHeight);

    texture.needsUpdate = true;
  };

  return texture;
}

function createInsideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#333333";


  ctx.fillStyle = "#333333";
  ctx.font = "bold 28px Tahoma, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "#333333";
  ctx.font = '42px "Brush Script MT", cursive';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const lines = [
    "Hey,",
    "",
    "Happy birthday Irene🧡",
    "Thank you for being you.",
    "You deserve the world!",
    "Enjoy your special day.",
  ];

  let y = 150;
  lines.forEach((line) => {
    ctx.fillText(line, 60, y);
    y += 40;
  });

  ctx.font = '32px "Brush Script MT", cursive';
  ctx.textAlign = "left";
  ctx.fillText("- Rafael", 260, 430);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

/* ------------ 3D Card ------------ */

const CARD_W = 0.3;
const CARD_H = 0.45;
const Z_GAP = 0.001;
const BASE_OPEN_ANGLE = -Math.PI * 0.2; // ~36°

export default function BirthdayCard3D({
  position = [0, 1.3, 2.8],
  ...props
}) {
  const groupRef = useRef();
  const frontPivotRef = useRef();
  const [hovered, setHovered] = useState(false);

  const frontTexture = useMemo(() => createFrontTexture(), []);
  const insideTexture = useMemo(() => createInsideTexture(), []);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const frontPivot = frontPivotRef.current;
    if (!group || !frontPivot) return;

    const targetTilt = hovered ? THREE.MathUtils.degToRad(5) : 0;
    const targetOpen = hovered ? -Math.PI * 0.7 : BASE_OPEN_ANGLE;

    group.rotation.y += (targetTilt - group.rotation.y) * 5 * delta;
    frontPivot.rotation.y +=
      (targetOpen - frontPivot.rotation.y) * 5 * delta;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      {...props}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Inside page, right side of spine */}
      <mesh position={[CARD_W / 2, 0, -Z_GAP]} castShadow receiveShadow>
        <planeGeometry args={[CARD_W, CARD_H]} />
        <meshPhongMaterial map={insideTexture} side={THREE.DoubleSide} />
      </mesh>

      {/* Front cover hinged on spine at x=0 */}
      <group ref={frontPivotRef} position={[0, 0, 0]}>
        <mesh position={[CARD_W / 2, 0, Z_GAP]} castShadow receiveShadow>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshPhongMaterial map={frontTexture} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
