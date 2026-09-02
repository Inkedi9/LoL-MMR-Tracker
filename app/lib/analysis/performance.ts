import type { MatchResult } from "../../types/riot";

export interface PerformanceResult {
    score: number;
    grade: string;
    kdaScore: number;
    csScore: number;
    damageScore: number;
    kpScore: number;
    visionScore: number;
    objectiveScore: number;
}

export interface OverallPerformanceResult {
    games: number;
    wins: number;
    losses: number;
    winrate: number;
    averageKda: number;
    favoriteChampion: string;
    favoriteChampionGames: number;
}

function clamp(
    value: number,
    min: number,
    max: number
): number {
    return Math.min(max, Math.max(min, value));
}

/**
 * Analyse la performance d'un seul match.
 *
 * Utilisée par le parser pour calculer :
 * - performanceScore
 * - performanceGrade
 */
export function calculateMatchPerformance(
    match: MatchResult
): PerformanceResult {

    const kdaScore = clamp(
        match.kda * 10,
        0,
        100
    );

    const csScore = clamp(
        (match.csPerMinute / 8) * 100,
        0,
        100
    );

    const damageScore = clamp(
        (match.damagePerMinute / 1500) * 100,
        0,
        100
    );

    const kpScore = clamp(
        match.killParticipation * 100,
        0,
        100
    );

    const visionScore = clamp(
        match.visionPerMinute * 100,
        0,
        100
    );

    const objectivePoints =
        match.baronKills * 30 +
        match.dragonKills * 15 +
        match.turretKills * 10;

    const objectiveScore = clamp(
        objectivePoints,
        0,
        100
    );

    let score =
        kdaScore * 0.30 +
        csScore * 0.15 +
        damageScore * 0.25 +
        kpScore * 0.15 +
        visionScore * 0.05 +
        objectiveScore * 0.10;

    if (match.win) {
        score += 5;
    } else {
        score -= 5;
    }

    score = Math.round(
        clamp(score, 0, 100)
    );

    let grade: string;

    if (score >= 90) {
        grade = "S+";
    } else if (score >= 80) {
        grade = "S";
    } else if (score >= 70) {
        grade = "A";
    } else if (score >= 60) {
        grade = "B";
    } else if (score >= 50) {
        grade = "C";
    } else if (score >= 40) {
        grade = "D";
    } else {
        grade = "F";
    }

    return {
        score,
        grade,
        kdaScore: Math.round(kdaScore),
        csScore: Math.round(csScore),
        damageScore: Math.round(damageScore),
        kpScore: Math.round(kpScore),
        visionScore: Math.round(visionScore),
        objectiveScore: Math.round(objectiveScore),
    };
}

/**
 * Analyse globale de l'historique des matchs.
 *
 * Utilisée par ProfileDashboard / PerformanceCard.
 */
export function calculatePerformance(
    matches: MatchResult[]
): OverallPerformanceResult {

    if (matches.length === 0) {
        return {
            games: 0,
            wins: 0,
            losses: 0,
            winrate: 0,
            averageKda: 0,
            favoriteChampion: "—",
            favoriteChampionGames: 0,
        };
    }

    const games = matches.length;

    const wins = matches.filter(
        (match) => match.win
    ).length;

    const losses = games - wins;

    const winrate = Math.round(
        (wins / games) * 100
    );

    const averageKda =
        matches.reduce(
            (sum, match) => sum + match.kda,
            0
        ) / games;

    const championCounts = new Map<
        string,
        number
    >();

    for (const match of matches) {
        championCounts.set(
            match.champion,
            (championCounts.get(match.champion) ?? 0) + 1
        );
    }

    let favoriteChampion = "—";
    let favoriteChampionGames = 0;

    for (const [
        champion,
        count,
    ] of championCounts) {

        if (count > favoriteChampionGames) {
            favoriteChampion = champion;
            favoriteChampionGames = count;
        }
    }

    return {
        games,
        wins,
        losses,
        winrate,
        averageKda,
        favoriteChampion,
        favoriteChampionGames,
    };
}