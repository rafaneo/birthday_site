"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGLTF } from "@react-three/drei";

const messages = ["Hi.", "Today we celebrate...", "You! 🎉", "Happy Birthday 😄 Enjoy your day!"];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // 👇 These run once and start downloading your 3D assets
    useGLTF.preload("/models/autumn_maple.glb");
    useGLTF.preload("/models/cherrycake.glb");
    useGLTF.preload("/models/table.glb");
    useGLTF.preload("/models/leaves.glb");
    useGLTF.preload("/models/ganache.glb");
  }, []);

  useEffect(() => {
    if (index < messages.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 3000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  // 🎬 Effect 2 — After the final message, transition to /scene
  useEffect(() => {
    if (index === messages.length - 1) {
      const timer = setTimeout(() => {
        window.location.href = "/scene"; // navigate to 3D scene
      }, 3000); // wait 3 seconds before switching
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white text-4xl font-semibold">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
