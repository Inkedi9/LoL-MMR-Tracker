"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import type { MMRProgression as MMRProgressionData } from "../../lib/analysis/progression";


interface Props {
    data: MMRProgressionData;
}


export default function MMRProgression({
    data
}: Props) {

    if (data.points.length === 0) {
        return null;
    }


    const chartData = data.points.map(
        point => ({
            game: point.game,
            mmr: point.mmr,
        })
    );


    const minMMR = Math.min(
        ...data.points.map(
            point => point.mmr
        )
    );


    const maxMMR = Math.max(
        ...data.points.map(
            point => point.mmr
        )
    );


    const padding = 50;


    return (

        <section className="
            w-full
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900/70
            p-8
            backdrop-blur-xl
        ">


            {/* Header */}

            <div className="
                mb-8
                flex
                items-start
                justify-between
            ">

                <div>

                    <p className="
                        text-sm
                        font-medium
                        uppercase
                        tracking-widest
                        text-zinc-500
                    ">
                        Performance
                    </p>


                    <h2 className="
                        mt-1
                        text-2xl
                        font-black
                    ">
                        MMR Progression
                    </h2>

                </div>


                <div className="text-right">

                    <p className="
                        text-2xl
                        font-black
                    ">
                        {data.change >= 0 ? "+" : ""}
                        {data.change}
                    </p>


                    <p className={`
                        text-sm
                        font-semibold
                        ${
                            data.trend === "RISING"
                                ? "text-green-400"
                                : data.trend === "FALLING"
                                    ? "text-red-400"
                                    : "text-yellow-400"
                        }
                    `}>

                        {data.trend === "RISING" && "↗ Rising"}

                        {data.trend === "FALLING" && "↘ Falling"}

                        {data.trend === "STABLE" && "→ Stable"}

                    </p>

                </div>

            </div>


            {/* Chart */}

            <div className="
                h-[300px]
                w-full
            ">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <LineChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 10,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                        />


                        <XAxis
                            dataKey="game"
                            tick={{
                                fill: "#71717a",
                                fontSize: 12
                            }}
                            tickLine={false}
                            axisLine={false}
                            label={{
                                value: "Game",
                                position: "insideBottom",
                                offset: -5,
                                fill: "#52525b"
                            }}
                        />


                        <YAxis
                            domain={[
                                minMMR - padding,
                                maxMMR + padding
                            ]}
                            tick={{
                                fill: "#71717a",
                                fontSize: 12
                            }}
                            tickLine={false}
                            axisLine={false}
                        />


                        <Tooltip
                            contentStyle={{
                                background: "#18181b",
                                border: "1px solid #27272a",
                                borderRadius: "12px",
                            }}
                            labelStyle={{
                                color: "#a1a1aa"
                            }}
                            formatter={(value) => [
                                `${value} MMR`,
                                "Estimated MMR"
                            ]}
                        />


                        <Line
                            type="monotone"
                            dataKey="mmr"
                            stroke="#ef4444"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: "#18181b",
                                stroke: "#ef4444",
                                strokeWidth: 2
                            }}
                            activeDot={{
                                r: 6
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>


            {/* Footer */}

            <div className="
                mt-6
                grid
                grid-cols-2
                gap-4
                border-t
                border-zinc-800
                pt-6
                sm:grid-cols-3
            ">


                <div>

                    <p className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-zinc-500
                    ">
                        Starting MMR
                    </p>

                    <p className="
                        mt-1
                        font-bold
                    ">
                        {data.startMMR}
                    </p>

                </div>


                <div>

                    <p className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-zinc-500
                    ">
                        Current MMR
                    </p>

                    <p className="
                        mt-1
                        font-bold
                    ">
                        {data.currentMMR}
                    </p>

                </div>


                <div>

                    <p className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-zinc-500
                    ">
                        Games analyzed
                    </p>

                    <p className="
                        mt-1
                        font-bold
                    ">
                        {data.points.length}
                    </p>

                </div>


            </div>


        </section>

    );

}