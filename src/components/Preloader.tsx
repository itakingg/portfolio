'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 400); // Penundaan singkat sebelum menyembunyikan loader
          return 100;
        }
        return prev + 1;
      });
    }, 20); // Kecepatan hitung persentase

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0E0E10] p-6 sm:p-12 text-[#EAE6DF]"
    >
      {/* Header Preloader */}
      <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-neutral-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D45D3B] animate-ping" />
          <span>PORTFOLIO®</span>
        </div>
        <span>ADI PRAMANA PUTRA</span>
      </div>

      {/* Konten Tengah */}
      <div className="max-w-xl">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-4xl font-light leading-snug text-neutral-200"
        >
          Crafting refined digital experiences with precision & motion.
        </motion.p>
      </div>

      {/* Footer Preloader (Persentase) */}
      <div className="flex justify-between items-end border-t border-neutral-800/80 pt-4">
        <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">LOADING</span>
        <span className="text-5xl sm:text-7xl font-bold font-mono text-[#E5A869]">
          {progress}%
        </span>
      </div>
    </motion.div>
  );
}