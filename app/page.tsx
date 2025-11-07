"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import { useRouter } from "next/navigation";

const messages = [
  "Hi.",
  "Today we celebrate...",
  "You! 🎉",
  "Happy Birthday 😄 Enjoy your day!",
];

export default function Home() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  // preload assets
  useEffect(() => {
    Promise.all([
      useGLTF.preload("/models/autumn_maple.glb"),
      useGLTF.preload("/models/cherrycake.glb"),
      useGLTF.preload("/models/table.glb"),
      useGLTF.preload("/models/leaves.glb"),
      useGLTF.preload("/models/ganache.glb"),
    ]).then(() => setReady(true));
  }, []);

  // message cycling
  useEffect(() => {
    if (index < messages.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 3000);
      return () => clearTimeout(timer);
    }
  }, [index]);

  // navigate after last message
  useEffect(() => {
    if (ready && index === messages.length - 1) {
      const timer = setTimeout(() => {
        router.push("/scene");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [ready, index, router]);

  // ✅ do conditional rendering AFTER all hooks
  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white text-2xl font-semibold">
        Loading assets...
      </div>
    );
  }

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
