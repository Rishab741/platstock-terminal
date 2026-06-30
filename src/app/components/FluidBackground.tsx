"use client";

import { motion } from "framer-motion";

const orbs = [
  {
    size: 680,
    color: "rgba(124,58,237,0.11)",
    top: "0%",
    left: "20%",
    duration: 26,
    x: [0, 90, -50, 70, 0],
    y: [0, 110, 50, -80, 0],
    scale: [1, 1.12, 0.91, 1.07, 1],
    blur: 90,
  },
  {
    size: 580,
    color: "rgba(6,182,212,0.07)",
    top: "45%",
    left: "72%",
    duration: 22,
    x: [0, -90, 50, -60, 0],
    y: [0, -70, 90, 35, 0],
    scale: [1, 0.93, 1.09, 0.97, 1],
    blur: 85,
  },
  {
    size: 500,
    color: "rgba(167,139,250,0.07)",
    top: "78%",
    left: "22%",
    duration: 30,
    x: [0, 80, -50, 100, 0],
    y: [0, -90, -40, 80, 0],
    scale: [1, 1.11, 0.94, 1.05, 1],
    blur: 80,
  },
  {
    size: 440,
    color: "rgba(124,58,237,0.07)",
    top: "28%",
    left: "88%",
    duration: 24,
    x: [0, -70, 60, -40, 0],
    y: [0, 80, -60, 50, 0],
    scale: [0.94, 1.09, 1, 0.91, 0.94],
    blur: 80,
  },
];

export default function FluidBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            top: orb.top,
            left: orb.left,
            filter: `blur(${orb.blur}px)`,
            transform: "translate(-50%, -50%)",
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
          animate={{ x: orb.x, y: orb.y, scale: orb.scale }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
