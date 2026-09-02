"use client";

import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 px-6 py-4 backdrop-blur-xl">

        <div className="flex items-center gap-3">
          <Trophy className="text-red-500" />
          <span className="font-bold text-lg">LoL MMR</span>
        </div>

        <nav className="hidden md:flex gap-8 text-zinc-400">
          <a href="#" className="hover:text-white transition">
            Home
          </a>

          <a href="#" className="hover:text-white transition">
            Features
          </a>

          <a href="#" className="hover:text-white transition">
            About
          </a>
        </nav>

      </div>
    </motion.header>
  );
}