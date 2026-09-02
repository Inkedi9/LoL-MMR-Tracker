"use client";

import type { MatchResult } from "../../types/riot";
import { getEvolutionData } from "../../lib/analysis/evolution";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

interface Props {
    matches: MatchResult[];
}

export default function PerformanceEvolution({
    matches,
}: Props) {

    const data = getEvolutionData(matches);

    return (
        <section className="w-full max-w-5xl">

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Performance Evolution
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                    Track your performance across recent games
                </p>
            </div>


            <div className="grid gap-6 lg:grid-cols-2">

                <ChartCard
                    title="Performance Score"
                    subtitle="Performance over recent games"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#27272a"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="game"
                                tick={{
                                    fill: "#71717a",
                                    fontSize: 11,
                                }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                domain={[0, 100]}
                                tick={{
                                    fill: "#71717a",
                                    fontSize: 11,
                                }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#09090b",
                                    border: "1px solid #27272a",
                                    borderRadius: "12px",
                                }}
                                labelFormatter={(label) =>
                                    `Game ${label}`
                                }
                            />

                            <Line
                                type="monotone"
                                dataKey="performance"
                                name="Performance"
                                stroke="#ef4444"
                                strokeWidth={3}
                                dot={{
                                    r: 4,
                                    fill: "#09090b",
                                    stroke: "#ef4444",
                                    strokeWidth: 2,
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />

                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>


                <ChartCard
                    title="KDA Evolution"
                    subtitle="KDA across recent games"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#27272a"
                                vertical={false}
                            />

                            <XAxis
                                dataKey="game"
                                tick={{
                                    fill: "#71717a",
                                    fontSize: 11,
                                }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                tick={{
                                    fill: "#71717a",
                                    fontSize: 11,
                                }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#09090b",
                                    border: "1px solid #27272a",
                                    borderRadius: "12px",
                                }}
                                labelFormatter={(label) =>
                                    `Game ${label}`
                                }
                            />

                            <Line
                                type="monotone"
                                dataKey="kda"
                                name="KDA"
                                stroke="#a1a1aa"
                                strokeWidth={3}
                                dot={{
                                    r: 4,
                                    fill: "#09090b",
                                    stroke: "#a1a1aa",
                                    strokeWidth: 2,
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            />

                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>

            </div>

        </section>
    );
}


function ChartCard({
    title,
    subtitle,
    children,
    className = "",
}: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    className?: string;
}) {

    return (
        <div
            className={`
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-950/80
                p-6
                backdrop-blur-xl
                ${className}
            `}
        >

            <div className="mb-6">

                <h3 className="font-semibold text-white">
                    {title}
                </h3>

                <p className="mt-1 text-xs text-zinc-600">
                    {subtitle}
                </p>

            </div>

            <div className="h-64 w-full">
                {children}
            </div>

        </div>
    );
}