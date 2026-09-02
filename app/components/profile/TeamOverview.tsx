"use client";

import type { MatchResult } from "../../types/riot";

interface Props {
    match: MatchResult;
}

export default function TeamOverview({ match }: Props) {
    if (!match.teams || match.teams.length !== 2) {
        return null;
    }

    return (
        <div className="space-y-3">
            {match.teams.map((team) => {
                const teamKills = team.players.reduce(
                    (total, player) => total + player.kills,
                    0
                );

                const isWinningTeam = team.win;

                return (
                    <div
                        key={team.teamId}
                        className={`
                            overflow-hidden
                            rounded-2xl
                            border
                            ${
                                isWinningTeam
                                    ? "border-emerald-500/20 bg-emerald-500/[0.03]"
                                    : "border-red-500/20 bg-red-500/[0.03]"
                            }
                        `}
                    >
                        {/* Team header */}

                        <div className="flex items-center justify-between border-b border-zinc-800/70 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <span
                                    className={`
                                        h-2.5
                                        w-2.5
                                        rounded-full
                                        ${
                                            isWinningTeam
                                                ? "bg-emerald-400"
                                                : "bg-red-400"
                                        }
                                    `}
                                />

                                <span className="text-sm font-semibold">
                                    {isWinningTeam
                                        ? "Victory"
                                        : "Defeat"}
                                </span>

                                <span className="text-xs text-zinc-500">
                                    Team {team.teamId}
                                </span>
                            </div>

                            <div className="text-sm font-bold">
                                <span
                                    className={
                                        isWinningTeam
                                            ? "text-emerald-400"
                                            : "text-red-400"
                                    }
                                >
                                    {teamKills}
                                </span>

                                <span className="mx-1 text-zinc-600">
                                    -
                                </span>

                                <span className="text-zinc-400">
                                    {getEnemyTeamKills(match, team.teamId)}
                                </span>
                            </div>
                        </div>

                        {/* Players */}

                        <div className="divide-y divide-zinc-800/50">
                            {team.players.map((player) => {
                                const isCurrentPlayer =
                                    player.puuid === match.puuid;

                                return (
                                    <div
                                        key={player.puuid}
                                        className={`
                                            flex
                                            items-center
                                            justify-between
                                            px-4
                                            py-2.5
                                            ${
                                                isCurrentPlayer
                                                    ? "bg-white/[0.04]"
                                                    : ""
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <ChampionIcon
                                                champion={
                                                    player.champion
                                                }
                                            />

                                            <div>
                                                <p
                                                    className={`
                                                        text-sm
                                                        ${
                                                            isCurrentPlayer
                                                                ? "font-bold text-white"
                                                                : "text-zinc-300"
                                                        }
                                                    `}
                                                >
                                                    {isCurrentPlayer
                                                        ? "You"
                                                        : player.champion}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-xs text-zinc-400">
                                            <span className="text-white">
                                                {player.kills}
                                            </span>

                                            <span className="mx-1 text-zinc-600">
                                                /
                                            </span>

                                            <span>
                                                {player.deaths}
                                            </span>

                                            <span className="mx-1 text-zinc-600">
                                                /
                                            </span>

                                            <span>
                                                {player.assists}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


function getEnemyTeamKills(
    match: MatchResult,
    teamId: number
) {
    const enemyTeam = match.teams?.find(
        (team) => team.teamId !== teamId
    );

    if (!enemyTeam) {
        return 0;
    }

    return enemyTeam.players.reduce(
        (total, player) => total + player.kills,
        0
    );
}


function ChampionIcon({
    champion,
}: {
    champion: string;
}) {
    return (
        <img
            src={`https://ddragon.leagueoflegends.com/cdn/15.10.1/img/champion/${champion}.png`}
            alt={champion}
            className="
                h-8
                w-8
                rounded-lg
                border
                border-zinc-700
                object-cover
            "
        />
    );
}