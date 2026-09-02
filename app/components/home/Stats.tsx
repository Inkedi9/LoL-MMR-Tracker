"use client";

import { motion } from "framer-motion";

const stats = [
    {
        value: "1.2M+",
        label: "Games analyzed",
    },
    {
        value: "95%",
        label: "Estimation accuracy",
    },
    {
        value: "14",
        label: "Regions supported",
    },
];

export default function Stats() {
    return (
        <section className="grid w-full max-w-5xl gap-6 md:grid-cols-3">

            {stats.map((stat, index) => (

                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: index * 0.15,
                    }}
                    className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl"
                >

                    <h2 className="text-4xl font-black text-red-500">
                        {stat.value}
                    </h2>

                    <p className="mt-3 text-zinc-400">
                        {stat.label}
                    </p>

                </motion.div>

            ))}

        </section>
    );
}