"use client";

import type { MatchResult } from "../../types/riot";
import { analyzeRecentMatches } from "../../lib/analysis/recent";

interface Props {
    matches: MatchResult[];
}


export default function RecentAnalysis({
    matches,
}: Props) {

    const analysis =
        analyzeRecentMatches(matches);


    const trendLabel = {
        RISING: "Rising",
        STABLE: "Stable",
        FALLING: "Falling",
    }[analysis.trend];


    const trendIcon = {
        RISING: "↗",
        STABLE: "→",
        FALLING: "↘",
    }[analysis.trend];


    return (
        <section className="w-full max-w-5xl">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">
                    Recent Performance
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                    Analysis of your last {analysis.games} games
                </p>

            </div>


            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-xl">


                {/* HEADER */}

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                    <div>

                        <p className="text-sm text-zinc-500">
                            Winrate
                        </p>

                        <p className="mt-1 text-4xl font-bold text-white">
                            {analysis.winrate}%
                        </p>

                        <p className="mt-2 text-sm">

                            <span className="text-emerald-400">
                                {analysis.wins}W
                            </span>

                            <span className="mx-2 text-zinc-700">
                                /
                            </span>

                            <span className="text-red-400">
                                {analysis.losses}L
                            </span>

                        </p>

                    </div>


                    {/* PERFORMANCE */}

                    <div className="text-center">

                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                            Avg Performance
                        </p>

                        <p className="mt-1 text-3xl font-bold text-white">
                            {analysis.averagePerformance}
                            <span className="text-base text-zinc-600">
                                /100
                            </span>
                        </p>

                    </div>


                    {/* TREND */}

                    <div className="text-right">

                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                            Trend
                        </p>

                        <p
                            className={`
                                mt-1
                                text-lg
                                font-semibold
                                ${analysis.trend === "RISING"
                                    ? "text-emerald-400"
                                    : analysis.trend === "FALLING"
                                        ? "text-red-400"
                                        : "text-zinc-300"
                                }
                            `}
                        >
                            {trendIcon} {trendLabel}
                        </p>

                    </div>

                </div>


                {/* PERFORMANCE BAR */}

                <div className="mt-8">

                    <div className="mb-2 flex justify-between text-xs">

                        <span className="text-zinc-500">
                            Performance
                        </span>

                        <span className="text-zinc-400">
                            {analysis.averagePerformance}/100
                        </span>

                    </div>


                    <div className="h-2 overflow-hidden rounded-full bg-zinc-900">

                        <div
                            className="h-full rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-emerald-400 transition-all duration-700"
                            style={{
                                width: `${analysis.averagePerformance}%`,
                            }}
                        />

                    </div>

                </div>


                {/* STATS */}

                <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">

                    <AnalysisStat
                        label="Avg KDA"
                        value={analysis.averageKda.toFixed(2)}
                    />

                    <AnalysisStat
                        label="CS / Min"
                        value={analysis.averageCsPerMinute.toFixed(2)}
                    />

                    <AnalysisStat
                        label="Damage / Min"
                        value={analysis.averageDamagePerMinute.toLocaleString("fr-FR")}
                    />

                    <AnalysisStat
                        label="Kill Participation"
                        value={`${analysis.averageKillParticipation}%`}
                    />

                </div>

            </div>

        </section>
    );
}


function AnalysisStat({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/40 p-4">

            <p className="text-xs uppercase tracking-wider text-zinc-600">
                {label}
            </p>

            <p className="mt-2 text-lg font-semibold text-zinc-200">
                {value}
            </p>

        </div>
    );
}