"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const router = useRouter();
    const [riotId, setRiotId] = useState("");

    async function handleSearch() {
        const [gameName, tagLine] = riotId.split("#");

        if (!gameName || !tagLine) {
            alert("Format attendu : Pseudo#TAG");
            return;
        }

        router.push(
            `/profile/${encodeURIComponent(`${gameName}-${tagLine}`)}`
        );
    }

    return (
        <div className="w-full max-w-2xl">
            <div className="flex rounded-2xl border border-zinc-800 bg-zinc-900/70 p-2 backdrop-blur-xl">

                <input
                    value={riotId}
                    onChange={(e) => setRiotId(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                    placeholder="Summoner#TAG"
                    className="flex-1 bg-transparent px-5 py-4 outline-none"
                />

                <button
                    onClick={handleSearch}
                    className="rounded-xl bg-red-600 px-8 font-semibold transition hover:scale-105 hover:bg-red-500"
                >
                    Search
                </button>

            </div>
        </div>
    );
}