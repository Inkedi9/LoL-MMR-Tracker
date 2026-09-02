import type { MatchResult } from "../../types/riot";
import { calculateMatchPerformance } from "./performance";

export interface RecentAnalysis {
    games: number;

    wins: number;
    losses: number;
    winrate: number;

    averageKda: number;
    averageCsPerMinute: number;
    averageDamagePerMinute: number;
    averageKillParticipation: number;

    averagePerformance: number;

    trend: "RISING" | "STABLE" | "FALLING";
}


export function analyzeRecentMatches(
    matches: MatchResult[]
): RecentAnalysis {

    if (matches.length === 0) {
        return {
            games: 0,
            wins: 0,
            losses: 0,
            winrate: 0,
            averageKda: 0,
            averageCsPerMinute: 0,
            averageDamagePerMinute: 0,
            averageKillParticipation: 0,
            averagePerformance: 0,
            trend: "STABLE",
        };
    }


    const wins = matches.filter(
        match => match.win
    ).length;


    const losses =
        matches.length - wins;


    const average = (
        values: number[]
    ) =>
        values.reduce(
            (sum, value) => sum + value,
            0
        ) / values.length;


    const performances =
        matches.map(
            match =>
                match.performanceScore ??
                calculateMatchPerformance(match).score
        );


    const averageKda =
        average(
            matches.map(
                match => match.kda
            )
        );


    const averageCsPerMinute =
        average(
            matches.map(
                match => match.csPerMinute
            )
        );


    const averageDamagePerMinute =
        average(
            matches.map(
                match => match.damagePerMinute
            )
        );


    const averageKillParticipation =
        average(
            matches.map(
                match => match.killParticipation
            )
        );


    const averagePerformance =
        average(
            performances
        );


    /*
     * Trend :
     *
     * On compare les 5 dernières parties
     * aux 5 précédentes.
     */

    const recent =
        performances.slice(0, 5);

    const previous =
        performances.slice(5, 10);


    let trend:
        "RISING" |
        "STABLE" |
        "FALLING" = "STABLE";


    if (previous.length > 0) {

        const recentAverage =
            average(recent);

        const previousAverage =
            average(previous);


        const difference =
            recentAverage -
            previousAverage;


        if (difference >= 8) {
            trend = "RISING";
        }
        else if (difference <= -8) {
            trend = "FALLING";
        }
    }


    return {
        games: matches.length,

        wins,
        losses,

        winrate:
            Math.round(
                (wins / matches.length) * 100
            ),

        averageKda:
            Number(
                averageKda.toFixed(2)
            ),

        averageCsPerMinute:
            Number(
                averageCsPerMinute.toFixed(2)
            ),

        averageDamagePerMinute:
            Math.round(
                averageDamagePerMinute
            ),

        averageKillParticipation:
            Number(
                (averageKillParticipation * 100)
                    .toFixed(1)
            ),

        averagePerformance:
            Math.round(
                averagePerformance
            ),

        trend,
    };
}