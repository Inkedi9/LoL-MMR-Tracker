"use client";

import Link from "next/link";
import { Trophy, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const [riotId, setRiotId] = useState("");

    function handleSearch() {
        const value = riotId.trim();

        if (!value) {
            return;
        }

        const [gameName, tagLine] = value.split("#");

        if (!gameName || !tagLine) {
            alert("Format attendu : Pseudo#TAG");
            return;
        }

        router.push(
            `/profile/${encodeURIComponent(
                `${gameName}-${tagLine}`
            )}`
        );

        setRiotId("");
    }

    return (
        <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50"
        >
            <div className="mx-auto mt-6 flex max-w-7xl items-center gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 px-6 py-4 backdrop-blur-xl">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-3 transition hover:opacity-80"
                >
                    <Trophy className="text-red-500" />

                    <span className="text-lg font-bold">
                        LoL MMR
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex shrink-0 gap-6 text-sm text-zinc-400">
                    <Link
                        href="/"
                        className="transition hover:text-white"
                    >
                        Home
                    </Link>

                    <a
                        href="#features"
                        className="transition hover:text-white"
                    >
                        Features
                    </a>

                    <a
                        href="#about"
                        className="transition hover:text-white"
                    >
                        About
                    </a>
                </nav>

                {/* Search */}
                <div className="ml-auto flex min-w-0 flex-1 justify-end">
                    <div className="flex w-full max-w-md items-center rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-1.5 transition focus-within:border-zinc-600">

                        <Search
                            size={18}
                            className="mr-2 shrink-0 text-zinc-500"
                        />

                        <input
                            value={riotId}
                            onChange={(event) =>
                                setRiotId(event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    handleSearch();
                                }
                            }}
                            placeholder="Rechercher Pseudo#TAG"
                            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-zinc-600"
                        />

                        <button
                            onClick={handleSearch}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold transition hover:bg-red-500"
                        >
                            Search
                        </button>

                    </div>
                </div>

            </div>
        </motion.header>
    );
}