"use client";

import type { MatchResult } from "../../types/riot";
import { getEvolutionData } from "../../lib/analysis/evolution";

interface Props {
    matches: MatchResult[];
}

export default function WinLossTimeline({
    matches,
}: Props) {

    const data = getEvolutionData(matches);

    const wins = data.filter(
        match => match.result === "WIN"
    ).length;

    const losses = data.length - wins;

    const winrate =
        data.length > 0
            ? Math.round((wins / data.length) * 100)
            : 0;


    return (
        <section className="w-full max-w-5xl">

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Recent Results
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                    Your latest {data.length} ranked games
                </p>
            </div>


            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl">

                {/* Header */}

                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

                    <div>

                        <p className="text-sm text-zinc-500">
                            Recent Winrate
                        </p>

                        <p className="mt-1 text-2xl font-bold text-white">
                            {winrate}%
                        </p>

                    </div>


                    <div className="flex gap-5 text-sm">

                        <div>
                            <span className="text-zinc-500">
                                Wins
                            </span>

                            <span className="ml-2 font-semibold text-emerald-400">
                                {wins}
                            </span>
                        </div>


                        <div>
                            <span className="text-zinc-500">
                                Losses
                            </span>

                            <span className="ml-2 font-semibold text-red-400">
                                {losses}
                            </span>
                        </div>

                    </div>

                </div>


                {/* Timeline */}

                <div className="relative">

                    <div className="absolute left-0 right-0 top-5 h-px bg-zinc-800" />


                    <div className="relative flex justify-between">

                        {data.map((match) => (

                            <div
                                key={match.matchId}
                                className="group flex flex-col items-center"
                            >

                                {/* Point */}

                                <div
                                    className={`
                                        relative
                                        z-10
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        text-sm
                                        font-bold
                                        transition-all
                                        duration-200
                                        group-hover:scale-110
                                        ${match.result === "WIN"
                                            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                                            : "border-red-500/40 bg-red-500/10 text-red-400"
                                        }
                                    `}
                                >
                                    {match.result === "WIN"
                                        ? "W"
                                        : "L"}
                                </div>


                                {/* Game */}

                                <span className="mt-3 text-[10px] text-zinc-600">
                                    G{match.game}
                                </span>


                                {/* Champion */}

                                <span className="mt-1 max-w-14 truncate text-[10px] text-zinc-500">
                                    {match.champion}
                                </span>


                                {/* Tooltip */}

                                <div className="pointer-events-none absolute bottom-full left-1/2 mb-4 hidden w-40 -translate-x-1/2 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-xs shadow-xl group-hover:block">

                                    <p className="font-semibold text-white">
                                        Game {match.game}
                                    </p>

                                    <p className="mt-1 text-zinc-500">
                                        {match.champion}
                                    </p>

                                    <div className="mt-2 flex justify-between">
                                        <span className="text-zinc-500">
                                            KDA
                                        </span>

                                        <span className="text-white">
                                            {match.kda}
                                        </span>
                                    </div>

                                    <div className="mt-1 flex justify-between">
                                        <span className="text-zinc-500">
                                            Performance
                                        </span>

                                        <span className="text-white">
                                            {match.performance}/100
                                        </span>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}