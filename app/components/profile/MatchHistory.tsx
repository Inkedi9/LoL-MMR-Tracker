"use client";

import { useState } from "react";

import {
    Swords,
    Coins,
    Crosshair,
    Eye,
    Target,
    Skull,
    Shield,
    Trophy,
    Users,
} from "lucide-react";

import type { MatchResult } from "../../types/riot";

interface Props {
    matches: MatchResult[];
}

export default function MatchHistory({
    matches,
}: Props) {

    const [expandedMatchId, setExpandedMatchId] =
        useState<string | null>(null);


    return (
        <section
            id="matches"
            className="space-y-4"
        >

            {/* Header */}

            <div>
                <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
                    Match History
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                    Recent Games
                </h2>
            </div>


            {/* Matches */}

            <div className="space-y-3">

                {matches.map((match) => {

                    const isExpanded =
                        expandedMatchId === match.matchId;

                    return (
                        <div
                            key={match.matchId}
                            className="space-y-2"
                        >

                            <MatchCard
                                match={match}
                                isExpanded={isExpanded}
                                onToggle={() =>
                                    setExpandedMatchId(
                                        isExpanded
                                            ? null
                                            : match.matchId
                                    )
                                }
                            />

                            {isExpanded && (
                                <>
                                    {/* Team Overview */}
                                    <div className="mt-6">
                                        <div className="mb-3 flex items-center gap-2">
                                            <Users className="h-4 w-4 text-zinc-500" />

                                            <p className="text-sm font-semibold text-zinc-300">
                                                Team Overview
                                            </p>
                                        </div>

                                        <TeamOverview match={match} />
                                    </div>

                                    <MatchDetails
                                        match={match}
                                    />
                                </>
                            )}

                        </div>
                    );
                })}

            </div>

        </section>
    );
}


function MatchCard({
    match,
    isExpanded,
    onToggle,
}: {
    match: MatchResult;
    isExpanded: boolean;
    onToggle: () => void;
}) {

    const durationMinutes =
        Math.floor(match.duration / 60);

    const durationSeconds =
        match.duration % 60;


    const gradeClass =
        match.performanceGrade === "S"
            ? "text-yellow-400 bg-yellow-400/10"
            : match.performanceGrade === "A"
                ? "text-emerald-400 bg-emerald-400/10"
                : match.performanceGrade === "B"
                    ? "text-blue-400 bg-blue-400/10"
                    : match.performanceGrade === "F"
                        ? "text-red-400 bg-red-400/10"
                        : "text-zinc-400 bg-zinc-400/10";


    return (

        <button
            type="button"
            onClick={onToggle}
            className={`
                group
                w-full
                overflow-hidden
                rounded-2xl
                border
                bg-zinc-900/60
                text-left
                backdrop-blur-xl
                transition
                hover:border-zinc-700
                ${match.win
                    ? "border-emerald-900/40"
                    : "border-red-900/40"
                }
                ${isExpanded
                    ? "border-zinc-600"
                    : ""
                }
            `}
        >

            <div className="flex items-stretch">


                {/* Result */}

                <div
                    className={`
                        flex
                        w-24
                        shrink-0
                        flex-col
                        items-center
                        justify-center
                        border-r
                        ${match.win
                            ? "border-emerald-900/40 bg-emerald-500/5"
                            : "border-red-900/40 bg-red-500/5"
                        }
                    `}
                >

                    <span
                        className={`
                            text-sm
                            font-bold
                            ${match.win
                                ? "text-emerald-400"
                                : "text-red-400"
                            }
                        `}
                    >
                        {match.win
                            ? "VICTORY"
                            : "DEFEAT"}
                    </span>

                    <span className="mt-1 text-xs text-zinc-500">
                        {durationMinutes}:
                        {durationSeconds
                            .toString()
                            .padStart(2, "0")}
                    </span>

                </div>


                {/* Champion */}

                <div className="flex w-52 shrink-0 items-center gap-4 px-5">

                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/15.10.1/img/champion/${match.champion}.png`}
                        alt={match.champion}
                        className="
                            h-14
                            w-14
                            rounded-xl
                            border
                            border-zinc-700
                            object-cover
                        "
                    />

                    <div>

                        <p className="font-semibold">
                            {match.champion}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                            Ranked Solo
                        </p>

                    </div>

                </div>


                {/* KDA */}

                <div className="flex w-48 shrink-0 flex-col justify-center">

                    <div className="flex items-center gap-2 text-lg font-bold">

                        <span>{match.kills}</span>

                        <span className="text-zinc-600">
                            /
                        </span>

                        <span className="text-red-400">
                            {match.deaths}
                        </span>

                        <span className="text-zinc-600">
                            /
                        </span>

                        <span>{match.assists}</span>

                    </div>

                    <p className="mt-1 text-xs text-zinc-500">
                        {match.kda.toFixed(2)} KDA
                    </p>

                </div>


                {/* Performance */}

                <div className="flex flex-1 items-center justify-center">

                    <div
                        className={`
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-xl
                            text-lg
                            font-black
                            ${gradeClass}
                        `}
                    >
                        {match.performanceGrade}
                    </div>

                    <div className="ml-3">

                        <p className="text-sm font-semibold">
                            {match.performanceScore}
                        </p>

                        <p className="text-xs text-zinc-500">
                            Performance
                        </p>

                    </div>

                </div>


                {/* Metrics */}

                <div className="
                    hidden
                    items-center
                    gap-6
                    px-6
                    xl:flex
                ">

                    <Metric
                        icon={Swords}
                        value={`${match.damagePerMinute.toFixed(0)}`}
                        label="DMG/min"
                    />

                    <Metric
                        icon={Target}
                        value={`${match.csPerMinute.toFixed(1)}`}
                        label="CS/min"
                    />

                    <Metric
                        icon={Coins}
                        value={`${match.goldPerMinute.toFixed(0)}`}
                        label="Gold/min"
                    />

                    <Metric
                        icon={Eye}
                        value={`${match.visionPerMinute.toFixed(1)}`}
                        label="Vision"
                    />

                    <Metric
                        icon={Crosshair}
                        value={`${Math.round(
                            match.killParticipation * 100
                        )}%`}
                        label="KP"
                    />

                </div>

            </div>

        </button>
    );
}


function MatchDetails({
    match,
}: {
    match: MatchResult;
}) {

    return (

        <div className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-950/70
            p-6
            backdrop-blur-xl
        ">

            {/* Header */}

            <div className="
                flex
                items-center
                justify-between
                border-b
                border-zinc-800
                pb-4
            ">

                <div>

                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                        Match Details
                    </p>

                    <h3 className="mt-1 text-lg font-bold">
                        {match.champion}
                    </h3>

                </div>

                <div className="
                    rounded-lg
                    bg-zinc-900
                    px-3
                    py-1.5
                    text-xs
                    text-zinc-400
                ">
                    {match.matchId}
                </div>

            </div>


            {/* Performance */}

            <div className="mt-6">

                <p className="mb-3 text-sm font-semibold text-zinc-300">
                    Performance
                </p>

                <div className="
                    grid
                    gap-3
                    sm:grid-cols-2
                    lg:grid-cols-4
                ">

                    <DetailMetric
                        icon={Skull}
                        label="KDA"
                        value={`${match.kda.toFixed(2)}`}
                    />

                    <DetailMetric
                        icon={Swords}
                        label="Damage / min"
                        value={`${match.damagePerMinute.toFixed(0)}`}
                    />

                    <DetailMetric
                        icon={Target}
                        label="CS / min"
                        value={`${match.csPerMinute.toFixed(1)}`}
                    />

                    <DetailMetric
                        icon={Crosshair}
                        label="Kill Participation"
                        value={`${Math.round(
                            match.killParticipation * 100
                        )}%`}
                    />

                </div>

            </div>


            {/* Economy + Vision */}

            <div className="mt-6">

                <p className="mb-3 text-sm font-semibold text-zinc-300">
                    Economy & Vision
                </p>

                <div className="
                    grid
                    gap-3
                    sm:grid-cols-2
                    lg:grid-cols-4
                ">

                    <DetailMetric
                        icon={Coins}
                        label="Gold"
                        value={match.gold.toLocaleString()}
                    />

                    <DetailMetric
                        icon={Coins}
                        label="Gold / min"
                        value={`${match.goldPerMinute.toFixed(0)}`}
                    />

                    <DetailMetric
                        icon={Eye}
                        label="Vision Score"
                        value={`${match.visionScore}`}
                    />

                    <DetailMetric
                        icon={Eye}
                        label="Vision / min"
                        value={`${match.visionPerMinute.toFixed(2)}`}
                    />

                </div>

            </div>


            {/* Objectives */}

            <div className="mt-6">

                <p className="mb-3 text-sm font-semibold text-zinc-300">
                    Objectives
                </p>

                <div className="
                    grid
                    gap-3
                    sm:grid-cols-3
                ">

                    <DetailMetric
                        icon={Trophy}
                        label="Barons"
                        value={`${match.baronKills}`}
                    />

                    <DetailMetric
                        icon={Shield}
                        label="Dragons"
                        value={`${match.dragonKills}`}
                    />

                    <DetailMetric
                        icon={Target}
                        label="Turrets"
                        value={`${match.turretKills}`}
                    />

                </div>

            </div>

        </div>
    );
}

function TeamOverview({
    match,
}: {
    match: MatchResult;
}) {
    return (
        <div className="grid gap-4 lg:grid-cols-2">
            {match.teams.map((team) => {
                const isWinningTeam = team.win;

                const totalKills = team.players.reduce(
                    (total, player) => total + player.kills,
                    0
                );

                return (
                    <div
                        key={team.teamId}
                        className={`
                            overflow-hidden
                            rounded-xl
                            border
                            ${isWinningTeam
                                ? "border-emerald-900/40 bg-emerald-500/[0.03]"
                                : "border-red-900/40 bg-red-500/[0.03]"
                            }
                        `}
                    >
                        {/* Team header */}
                        <div
                            className={`
                                flex
                                items-center
                                justify-between
                                border-b
                                px-4
                                py-3
                                ${isWinningTeam
                                    ? "border-emerald-900/30"
                                    : "border-red-900/30"
                                }
                            `}
                        >
                            <div>
                                <p
                                    className={`
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-widest
                                        ${isWinningTeam
                                            ? "text-emerald-400"
                                            : "text-red-400"
                                        }
                                    `}
                                >
                                    {isWinningTeam
                                        ? "Victory"
                                        : "Defeat"}
                                </p>

                                <p className="mt-1 text-xs text-zinc-500">
                                    Team {team.teamId}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-lg font-bold">
                                    {totalKills}
                                </p>

                                <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                                    Team Kills
                                </p>
                            </div>
                        </div>

                        {/* Players */}
                        <div className="divide-y divide-zinc-800/70">
                            {team.players.map((player) => (
                                <div
                                    key={player.puuid}
                                    className="flex items-center gap-3 px-4 py-3"
                                >
                                    {/* Champion */}
                                    <img
                                        src={`https://ddragon.leagueoflegends.com/cdn/15.10.1/img/champion/${player.champion}.png`}
                                        alt={player.champion}
                                        className="
                                            h-10
                                            w-10
                                            rounded-lg
                                            border
                                            border-zinc-700
                                            object-cover
                                        "
                                    />

                                    {/* Champion name */}
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold">
                                            {player.champion}
                                        </p>

                                        <p className="mt-0.5 text-xs text-zinc-600">
                                            Player
                                        </p>
                                    </div>

                                    {/* KDA */}
                                    <div className="text-right">
                                        <div className="flex items-center gap-1 text-sm font-semibold">
                                            <span>
                                                {player.kills}
                                            </span>

                                            <span className="text-zinc-700">
                                                /
                                            </span>

                                            <span className="text-red-400">
                                                {player.deaths}
                                            </span>

                                            <span className="text-zinc-700">
                                                /
                                            </span>

                                            <span>
                                                {player.assists}
                                            </span>
                                        </div>

                                        <p className="mt-0.5 text-[10px] uppercase tracking-wide text-zinc-600">
                                            KDA
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


function DetailMetric({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{
        className?: string;
    }>;
    label: string;
    value: string;
}) {

    return (

        <div className="
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900/50
            p-4
        ">

            <div className="flex items-center gap-2">

                <Icon className="h-4 w-4 text-zinc-500" />

                <span className="text-xs text-zinc-500">
                    {label}
                </span>

            </div>

            <p className="mt-2 text-xl font-bold">
                {value}
            </p>

        </div>
    );
}


function Metric({
    icon: Icon,
    value,
    label,
}: {
    icon: React.ComponentType<{
        className?: string;
    }>;
    value: string;
    label: string;
}) {

    return (

        <div className="flex items-center gap-2">

            <Icon className="h-4 w-4 text-zinc-500" />

            <div>

                <p className="text-sm font-semibold">
                    {value}
                </p>

                <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                    {label}
                </p>

            </div>

        </div>
    );
}