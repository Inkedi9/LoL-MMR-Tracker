"use client";

import type { MatchResult } from "../../types/riot";
import { getEvolutionData } from "../../lib/analysis/evolution";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    Tooltip,
} from "recharts";

interface Props {
    matches: MatchResult[];
}

export default function GameplayMetrics({
    matches,
}: Props) {

    const data = getEvolutionData(matches);

    const csAverage = getAverage(
        data.map(match => match.csPerMinute)
    );

    const damageAverage = getAverage(
        data.map(match => match.damagePerMinute)
    );

    const visionAverage = getAverage(
        data.map(match => match.visionPerMinute)
    );


    return (
        <section className="w-full max-w-5xl">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">
                    Gameplay Metrics
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                    Your average performance across recent games
                </p>

            </div>


            <div className="grid gap-6 md:grid-cols-3">

                <MetricCard
                    title="CS / Min"
                    value={csAverage.toFixed(1)}
                    label="Farming"
                    data={data}
                    dataKey="csPerMinute"
                    formatter={(value) => `${value.toFixed(1)}`}
                />


                <MetricCard
                    title="Damage / Min"
                    value={Math.round(damageAverage).toLocaleString()}
                    label="Damage"
                    data={data}
                    dataKey="damagePerMinute"
                    formatter={(value) =>
                        Math.round(value).toLocaleString()
                    }
                />


                <MetricCard
                    title="Vision / Min"
                    value={visionAverage.toFixed(2)}
                    label="Vision"
                    data={data}
                    dataKey="visionPerMinute"
                    formatter={(value) => value.toFixed(2)}
                />

            </div>

        </section>
    );
}


function MetricCard({
    title,
    value,
    label,
    data,
    dataKey,
    formatter,
}: {
    title: string;
    value: string;
    label: string;
    data: ReturnType<typeof getEvolutionData>;
    dataKey:
    | "csPerMinute"
    | "damagePerMinute"
    | "visionPerMinute";
    formatter: (value: number) => string;
}) {

    return (
        <div className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950/80
            p-5
            backdrop-blur-xl
        ">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm text-zinc-500">
                        {title}
                    </p>

                    <div className="mt-2 flex items-baseline gap-2">

                        <span className="text-3xl font-bold text-white">
                            {value}
                        </span>

                        <span className="text-xs text-zinc-600">
                            avg
                        </span>

                    </div>

                </div>


                <span className="rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[10px] uppercase tracking-wider text-zinc-500">
                    {label}
                </span>

            </div>


            <div className="mt-6 h-20">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart data={data}>

                        <Tooltip
                            cursor={false}
                            contentStyle={{
                                backgroundColor: "#09090b",
                                border: "1px solid #27272a",
                                borderRadius: "10px",
                                fontSize: "12px",
                            }}
                            formatter={(value) => [
                                formatter(Number(value)),
                                title,
                            ]}
                            labelFormatter={(label) =>
                                `Game ${label}`
                            }
                        />

                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke="#a1a1aa"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 4,
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>


            <div className="mt-4 flex items-center justify-between">

                <span className="text-xs text-zinc-600">
                    Last {data.length} games
                </span>

                <span className="text-xs text-zinc-500">
                    Recent trend
                </span>

            </div>

        </div>
    );
}


function getAverage(values: number[]) {

    if (values.length === 0) {
        return 0;
    }

    return (
        values.reduce(
            (sum, value) => sum + value,
            0
        ) / values.length
    );
}