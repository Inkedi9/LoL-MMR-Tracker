"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-8 text-center"
        >

            <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 backdrop-blur-xl">

                <Sparkles size={16} className="text-red-500" />

                <span className="text-sm text-zinc-300">
                    Powered by Riot API
                </span>

            </div>

            <h1 className="text-7xl font-black tracking-tight">

                Estimate your

                <span className="block bg-gradient-to-r from-red-500 via-red-300 to-white bg-clip-text text-transparent">

                    Hidden MMR

                </span>

            </h1>

            <p className="max-w-xl text-lg text-zinc-400">

                Analyze your ranked games, estimate your hidden MMR and understand
                how Riot matchmaking really sees your account.

            </p>

        </motion.section>
    );
}