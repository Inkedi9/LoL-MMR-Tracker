"use client";

import type {
    RiotAccount,
    Summoner,
    LeagueEntry,
} from "../../types/riot";

import { getRankIcon } from "../../lib/riot/rank";

interface Props {
    account: RiotAccount;
    summoner: Summoner;
    league: LeagueEntry;
}

export default function ProfileOverview({
    account,
    summoner,
    league,
}: Props) {

    const games = league.wins + league.losses;

    const winrate =
        games > 0
            ? Math.round((league.wins / games) * 100)
            : 0;

    const rankIcon = getRankIcon(league.tier);

    return (
        <section className="
            overflow-hidden
            rounded-3xl
            border border-zinc-800
            bg-zinc-900/70
            backdrop-blur-xl
        ">

            {/* Player + Rank */}

            <div className="
                flex
                flex-col
                gap-8
                p-8
                md:flex-row
                md:items-center
                md:justify-between
                md:p-10
            ">

                {/* Player */}

                <div className="flex items-center gap-5">

                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/15.10.1/img/profileicon/${summoner.profileIconId}.png`}
                        alt="Profile icon"
                        className="
                            h-20
                            w-20
                            rounded-2xl
                            border
                            border-zinc-700
                            md:h-24
                            md:w-24
                        "
                    />

                    <div>

                        <h1 className="
                            text-2xl
                            font-black
                            md:text-3xl
                        ">
                            {account.gameName}

                            <span className="text-zinc-500">
                                #{account.tagLine}
                            </span>
                        </h1>

                        <p className="mt-1 text-zinc-400">
                            Level {summoner.summonerLevel}
                        </p>

                        {league.hotStreak && (
                            <span className="
                                mt-3
                                inline-flex
                                rounded-full
                                bg-red-500/10
                                px-3
                                py-1
                                text-sm
                                text-red-400
                            ">
                                🔥 Hot Streak
                            </span>
                        )}

                    </div>

                </div>


                {/* Rank */}

                <div className="
                    flex
                    items-center
                    gap-5
                    md:text-right
                ">

                    {rankIcon && (
                        <img
                            src={rankIcon}
                            alt={`${league.tier} rank`}
                            className="
                                h-20
                                w-20
                                object-contain
                                md:h-24
                                md:w-24
                            "
                        />
                    )}

                    <div>

                        <p className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-widest
                            text-zinc-500
                        ">
                            Current Rank
                        </p>

                        <p className="
                            mt-1
                            text-3xl
                            font-black
                            text-red-500
                        ">
                            {league.tier}
                        </p>

                        <p className="text-lg text-zinc-300">
                            Division {league.rank}
                        </p>

                        <p className="
                            mt-1
                            font-semibold
                            text-white
                        ">
                            {league.leaguePoints} LP
                        </p>

                    </div>

                </div>

            </div>


            {/* Metrics */}

            <div className="
                grid
                grid-cols-2
                border-t
                border-zinc-800
                md:grid-cols-4
            ">

                <Metric
                    label="Rank"
                    value={`${league.tier} ${league.rank}`}
                />

                <Metric
                    label="LP"
                    value={`${league.leaguePoints}`}
                />

                <Metric
                    label="Games"
                    value={`${games}`}
                />

                <Metric
                    label="Winrate"
                    value={`${winrate}%`}
                />

            </div>

        </section>
    );
}


function Metric({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="
            border-r
            border-zinc-800
            p-5
            last:border-r-0
        ">

            <p className="
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-zinc-500
            ">
                {label}
            </p>

            <p className="
                mt-2
                text-xl
                font-bold
                text-zinc-100
            ">
                {value}
            </p>

        </div>
    );
}
