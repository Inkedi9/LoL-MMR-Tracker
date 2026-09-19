import type {
    MatchResult,
    MatchParticipant,
    MatchTeam,
} from "../../types/riot";
import { calculateMatchPerformance } from "../analysis/performance";

export function parseMatch(
    match: any,
    puuid: string
): MatchResult {
    // --------------------------------------------------
    // Validation des données Riot
    // --------------------------------------------------

    if (!match?.info?.participants) {
        throw new Error(
            "Invalid match data: participants not found"
        );
    }

    const participants = match.info.participants;

    if (participants.length !== 10) {
        throw new Error(
            `Invalid match data: expected 10 participants, got ${participants.length}`
        );
    }

    // --------------------------------------------------
    // Joueur analysé
    // --------------------------------------------------

    const player = participants.find(
        (participant: any) =>
            participant.puuid === puuid
    );

    if (!player) {
        throw new Error(
            "Player not found in match"
        );
    }

    // --------------------------------------------------
    // Durée
    // --------------------------------------------------

    const duration = Math.max(
        Number(match.info.gameDuration) || 0,
        0
    );

    const minutes = duration / 60;

    // --------------------------------------------------
    // KDA
    // --------------------------------------------------

    const kda =
        (
            player.kills +
            player.assists
        ) /
        Math.max(player.deaths, 1);

    // --------------------------------------------------
    // CS
    // --------------------------------------------------

    const cs =
        (Number(player.totalMinionsKilled) || 0) +
        (Number(player.neutralMinionsKilled) || 0);

    const csPerMinute =
        minutes > 0
            ? cs / minutes
            : 0;

    // --------------------------------------------------
    // Gold
    // --------------------------------------------------

    const gold =
        Number(player.goldEarned) || 0;

    const goldPerMinute =
        minutes > 0
            ? gold / minutes
            : 0;

    // --------------------------------------------------
    // Damage
    // --------------------------------------------------

    const damage =
        Number(
            player.totalDamageDealtToChampions
        ) || 0;

    const damagePerMinute =
        minutes > 0
            ? damage / minutes
            : 0;

    // --------------------------------------------------
    // Vision
    // --------------------------------------------------

    const visionScore =
        Number(player.visionScore) || 0;

    const visionPerMinute =
        minutes > 0
            ? visionScore / minutes
            : 0;

    // --------------------------------------------------
    // Team kills
    // --------------------------------------------------

    const teamKills = participants
        .filter(
            (participant: any) =>
                participant.teamId === player.teamId
        )
        .reduce(
            (
                total: number,
                participant: any
            ) =>
                total +
                (Number(participant.kills) || 0),
            0
        );

    // --------------------------------------------------
    // Kill Participation
    // --------------------------------------------------

    const killParticipation =
        teamKills > 0
            ? (
                player.kills +
                player.assists
            ) / teamKills
            : 0;

    // --------------------------------------------------
    // Objectifs
    // --------------------------------------------------

    const baronKills =
        Number(player.baronKills) || 0;

    const dragonKills =
        Number(player.dragonKills) || 0;

    const turretKills =
        Number(player.turretKills) || 0;

    // --------------------------------------------------
    // Teams
    // --------------------------------------------------

    const teams: MatchTeam[] =
        [100, 200].map((teamId) => {
            const teamPlayers: MatchParticipant[] =
                participants
                    .filter(
                        (participant: any) =>
                            participant.teamId === teamId
                    )
                    .map(
                        (participant: any) => ({
                            puuid: participant.puuid,
                            champion:
                                participant.championName,
                            kills:
                                Number(
                                    participant.kills
                                ) || 0,
                            deaths:
                                Number(
                                    participant.deaths
                                ) || 0,
                            assists:
                                Number(
                                    participant.assists
                                ) || 0,
                            win:
                                Boolean(
                                    participant.win
                                ),
                        })
                    );

            const teamWon =
                teamPlayers.some(
                    (participant) =>
                        participant.win
                );

            return {
                teamId,
                win: teamWon,
                players: teamPlayers,
            };
        });

    // --------------------------------------------------
    // Résultat de base
    // --------------------------------------------------

    const result: MatchResult = {
        matchId:
            match.metadata.matchId,

        champion:
            player.championName,

        win:
            Boolean(player.win),

        puuid:
            player.puuid,

        kills:
            Number(player.kills) || 0,

        deaths:
            Number(player.deaths) || 0,

        assists:
            Number(player.assists) || 0,

        kda:
            Number(kda.toFixed(2)),

        duration,

        cs,

        csPerMinute:
            Number(
                csPerMinute.toFixed(2)
            ),

        gold,

        goldPerMinute:
            Number(
                goldPerMinute.toFixed(2)
            ),

        damage,

        damagePerMinute:
            Number(
                damagePerMinute.toFixed(2)
            ),

        visionScore,

        visionPerMinute:
            Number(
                visionPerMinute.toFixed(2)
            ),

        teamKills,

        killParticipation:
            Number(
                killParticipation.toFixed(3)
            ),

        baronKills,
        dragonKills,
        turretKills,

        performanceScore: 0,
        performanceGrade: "F",

        teams,
    };

    // --------------------------------------------------
    // Performance
    // --------------------------------------------------

    const performance =
        calculateMatchPerformance(result);

    result.performanceScore =
        performance.score;

    result.performanceGrade =
        performance.grade;

    return result;
}