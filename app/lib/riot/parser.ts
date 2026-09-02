import type {
    MatchResult,
    MatchParticipant,
    MatchTeam,
} from "../../types/riot";
import {
    calculateMatchPerformance,
} from "../analysis/performance";


export function parseMatch(
    match: any,
    puuid: string
): MatchResult {

    const player =
        match.info.participants.find(
            (p: any) => p.puuid === puuid
        );


    if (!player) {
        throw new Error(
            "Player not found in match"
        );
    }


    // Durée de la partie en secondes

    const duration =
        match.info.gameDuration;


    // Durée en minutes

    const minutes =
        duration / 60;


    // KDA

    const kda =
        (
            player.kills +
            player.assists
        )
        /
        Math.max(player.deaths, 1);


    // CS total

    const cs =
        player.totalMinionsKilled +
        player.neutralMinionsKilled;


    // CS / minute

    const csPerMinute =
        minutes > 0
            ? cs / minutes
            : 0;


    // Gold

    const gold =
        player.goldEarned;


    // Gold / minute

    const goldPerMinute =
        minutes > 0
            ? gold / minutes
            : 0;


    // Damage aux champions

    const damage =
        player.totalDamageDealtToChampions;


    // Damage / minute

    const damagePerMinute =
        minutes > 0
            ? damage / minutes
            : 0;


    // Vision

    const visionScore =
        player.visionScore;


    // Vision / minute

    const visionPerMinute =
        minutes > 0
            ? visionScore / minutes
            : 0;


    // Kills de l'équipe

    const teamKills =
        match.info.participants
            .filter(
                (p: any) =>
                    p.teamId === player.teamId
            )
            .reduce(
                (
                    total: number,
                    p: any
                ) =>
                    total + p.kills,
                0
            );


    // Kill Participation

    const killParticipation =
        teamKills > 0
            ? (
                player.kills +
                player.assists
            ) / teamKills
            : 0;


    // Objectifs

    const baronKills =
        player.baronKills ?? 0;


    const dragonKills =
        player.dragonKills ?? 0;


    const turretKills =
        player.turretKills ?? 0;


    const result: MatchResult = {
        matchId: match.metadata.matchId,
        champion: player.championName,
        win: player.win,
        puuid: player.puuid,
        kills: player.kills,
        deaths: player.deaths,
        assists: player.assists,
        kda: Number(kda.toFixed(2)),
        duration,
        cs,
        csPerMinute: Number(csPerMinute.toFixed(2)),
        gold,
        goldPerMinute: Number(goldPerMinute.toFixed(2)),
        damage,
        damagePerMinute: Number(damagePerMinute.toFixed(2)),
        visionScore,
        visionPerMinute: Number(visionPerMinute.toFixed(2)),
        teamKills,
        killParticipation: Number(
            killParticipation.toFixed(3)
        ),
        baronKills,
        dragonKills,
        turretKills,
        performanceScore: 0,
        performanceGrade: "F",
        teams: [],
    };

    const performance = calculateMatchPerformance(match);

    result.performanceScore =
        performance.score;

    result.performanceGrade =
        performance.grade;


    const teams: MatchTeam[] = [100, 200].map((teamId) => {
        const teamPlayers = match.info.participants
            .filter((p: any) => p.teamId === teamId)
            .map((p: any) => ({
                puuid: p.puuid,
                champion: p.championName,
                kills: p.kills,
                deaths: p.deaths,
                assists: p.assists,
                win: p.win,
            }));

        const teamWon = teamPlayers.some(
            (player: MatchParticipant) => player.win
        );

        return {
            teamId,
            win: teamWon,
            players: teamPlayers,
        };
    });

    result.teams = teams;

    return result;

}