import type { MatchResult } from "../../types/riot";

export interface PerformanceResult {
    score: number;
    grade: string;

    /**
     * Performance individuelle pure.
     * Ne prend pas en compte la victoire/défaite.
     */
    individualScore: number;

    /**
     * Impact du résultat du match.
     * +5 victoire / -5 défaite.
     */
    resultModifier: number;

    /**
     * Scores normalisés par dimension.
     */
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

export interface MatchComparison {
    matchId: string;
    score: number;
    deltaFromPrevious: number | null;
    deltaFromRecentAverage: number | null;
    isAnomaly: boolean;
    anomalyType: "positive" | "negative" | null;
}

export interface ConsistencyResult {
    score: number;
    standardDeviation: number;
    averageScore: number;
    recentAverage: number;
    previousAverage: number;
    trend: "up" | "down" | "stable";
    trendValue: number;
    confidence: number;
    comparisons: MatchComparison[];
}

// --------------------------------------------------
// Helpers
// --------------------------------------------------

function clamp(
    value: number,
    min: number,
    max: number
): number {
    return Math.min(max, Math.max(min, value));
}

/**
 * Convertit une valeur en score 0-100.
 *
 * Au lieu de simplement dépasser un seuil et être immédiatement
 * bloqué à 100, on utilise une progression plus douce.
 *
 * Exemple :
 * 4 KDA  -> ~80
 * 6 KDA  -> ~100
 */
function normalize(
    value: number,
    target: number
): number {
    if (!Number.isFinite(value) || value <= 0) {
        return 0;
    }

    if (target <= 0) {
        return 0;
    }

    return clamp(
        (value / target) * 100,
        0,
        100
    );
}

/**
 * Normalisation avec saturation progressive.
 *
 * Permet d'éviter qu'une statistique exceptionnellement élevée
 * domine complètement le score global.
 */
function normalizeSaturated(
    value: number,
    target: number
): number {
    if (!Number.isFinite(value) || value <= 0) {
        return 0;
    }

    if (target <= 0) {
        return 0;
    }

    const ratio = value / target;

    /**
     * Fonction logarithmique :
     *
     * ratio 0.5  -> ~41
     * ratio 1.0  -> ~100
     * ratio 1.5  -> ~100
     *
     * On garde ensuite un plafond à 100.
     */
    const score =
        100 *
        (1 - Math.exp(-ratio));

    return clamp(score, 0, 100);
}

function calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;

    return (
        values.reduce((sum, value) => sum + value, 0) /
        values.length
    );
}

function calculateStandardDeviation(values: number[]): number {
    if (values.length <= 1) return 0;

    const average = calculateAverage(values);

    const variance =
        values.reduce(
            (sum, value) =>
                sum + Math.pow(value - average, 2),
            0
        ) / values.length;

    return Math.sqrt(variance);
}

function getTrend(
    recentAverage: number,
    previousAverage: number
): "up" | "down" | "stable" {
    const difference = recentAverage - previousAverage;

    if (difference >= 3) return "up";
    if (difference <= -3) return "down";

    return "stable";
}

// --------------------------------------------------
// Match Performance
// --------------------------------------------------

/**
 * Analyse la performance d'un seul match.
 *
 * V2.1.2
 *
 * Architecture :
 *
 * 1. Calcul des dimensions individuelles
 * 2. Calcul du score individuel
 * 3. Application du résultat du match
 * 4. Score final
 * 5. Grade
 */
export function calculateMatchPerformance(
    match: MatchResult
): PerformanceResult {

    // --------------------------------------------------
    // KDA
    // --------------------------------------------------

    const kdaScore = normalize(
        match.kda,
        4
    );

    // --------------------------------------------------
    // Farming
    // --------------------------------------------------

    const csScore = normalize(
        match.csPerMinute,
        8
    );

    // --------------------------------------------------
    // Damage
    // --------------------------------------------------

    const damageScore = normalizeSaturated(
        match.damagePerMinute,
        1500
    );

    // --------------------------------------------------
    // Kill Participation
    // --------------------------------------------------

    const kpScore = normalize(
        match.killParticipation,
        0.65
    );

    // --------------------------------------------------
    // Vision
    // --------------------------------------------------

    const visionScore = normalize(
        match.visionPerMinute,
        1
    );

    // --------------------------------------------------
    // Objectives
    // --------------------------------------------------

    const objectivePoints =
        match.baronKills * 30 +
        match.dragonKills * 15 +
        match.turretKills * 10;

    const objectiveScore = clamp(
        objectivePoints,
        0,
        100
    );

    // --------------------------------------------------
    // Individual Performance
    // --------------------------------------------------

    /**
     * Pondération V2.1.2
     *
     * Combat / KDA       25%
     * Farming            15%
     * Damage             25%
     * Participation      15%
     * Vision             10%
     * Objectives         10%
     *
     * Total              100%
     */
    const individualScore =
        kdaScore * 0.25 +
        csScore * 0.15 +
        damageScore * 0.25 +
        kpScore * 0.15 +
        visionScore * 0.10 +
        objectiveScore * 0.10;

    const roundedIndividualScore = Math.round(
        clamp(individualScore, 0, 100)
    );

    // --------------------------------------------------
    // Match Result
    // --------------------------------------------------

    /**
     * Le résultat ne fait plus partie de la performance
     * individuelle.
     *
     * Il intervient uniquement comme modificateur final.
     */
    const resultModifier = match.win
        ? 5
        : -5;

    // --------------------------------------------------
    // Final Score
    // --------------------------------------------------

    const score = Math.round(
        clamp(
            roundedIndividualScore + resultModifier,
            0,
            100
        )
    );

    // --------------------------------------------------
    // Grade
    // --------------------------------------------------

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

        individualScore:
            roundedIndividualScore,

        resultModifier,

        kdaScore:
            Math.round(kdaScore),

        csScore:
            Math.round(csScore),

        damageScore:
            Math.round(damageScore),

        kpScore:
            Math.round(kpScore),

        visionScore:
            Math.round(visionScore),

        objectiveScore:
            Math.round(objectiveScore),
    };
}

// --------------------------------------------------
// Overall Performance
// --------------------------------------------------

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
            (sum, match) =>
                sum + match.kda,
            0
        ) / games;

    const championCounts =
        new Map<string, number>();

    for (const match of matches) {
        championCounts.set(
            match.champion,
            (
                championCounts.get(
                    match.champion
                ) ?? 0
            ) + 1
        );
    }

    let favoriteChampion = "—";
    let favoriteChampionGames = 0;

    for (const [
        champion,
        count,
    ] of championCounts) {

        if (
            count >
            favoriteChampionGames
        ) {
            favoriteChampion =
                champion;

            favoriteChampionGames =
                count;
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

export function calculateConsistency(
    matches: MatchResult[]
): ConsistencyResult {
    if (matches.length === 0) {
        return {
            score: 0,
            standardDeviation: 0,
            averageScore: 0,
            recentAverage: 0,
            previousAverage: 0,
            trend: "stable",
            trendValue: 0,
            confidence: 0,
            comparisons: [],
        };
    }

    const scores = matches.map(
        (match) =>
            calculateMatchPerformance(match).individualScore
    );

    const averageScore = calculateAverage(scores);

    const standardDeviation =
        calculateStandardDeviation(scores);

    /*
     * Plus la variance est faible,
     * plus le joueur est régulier.
     *
     * 0 SD  -> 100 consistency
     * 10 SD -> 75
     * 20 SD -> 50
     * 30 SD -> 25
     * 40 SD -> 0
     */
    const score = Math.round(
        clamp(
            100 - standardDeviation * 2.5,
            0,
            100
        )
    );

    /*
     * On compare les 5 dernières parties
     * aux 5 précédentes.
     */
    const recentMatches = matches.slice(-5);

    const previousMatches = matches.slice(
        Math.max(0, matches.length - 10),
        Math.max(0, matches.length - 5)
    );

    const recentScores = recentMatches.map(
        (match) =>
            calculateMatchPerformance(match).individualScore
    );

    const previousScores = previousMatches.map(
        (match) =>
            calculateMatchPerformance(match).individualScore
    );

    const recentAverage =
        calculateAverage(recentScores);

    const previousAverage =
        calculateAverage(previousScores);

    const trendValue =
        recentAverage - previousAverage;

    const trend = getTrend(
        recentAverage,
        previousAverage
    );

    /*
     * Plus on a de parties,
     * plus la consistency est fiable.
     */
    const confidence = Math.round(
        clamp(
            (matches.length / 20) * 100,
            0,
            100
        )
    );

    const comparisons: MatchComparison[] = [];

    for (let i = 0; i < matches.length; i++) {
        const currentScore = scores[i];

        const previousScore =
            i > 0 ? scores[i - 1] : null;

        const previousMatchesScores =
            scores.slice(0, i);

        const recentHistory =
            previousMatchesScores.slice(-5);

        const recentHistoryAverage =
            calculateAverage(recentHistory);

        const deltaFromPrevious =
            previousScore !== null
                ? Math.round(
                      currentScore -
                          previousScore
                  )
                : null;

        const deltaFromRecentAverage =
            recentHistory.length > 0
                ? Math.round(
                      currentScore -
                          recentHistoryAverage
                  )
                : null;

        /*
         * Une anomalie n'est détectée
         * qu'après avoir suffisamment
         * d'historique.
         */
        let isAnomaly = false;
        let anomalyType:
            | "positive"
            | "negative"
            | null = null;

        if (previousMatchesScores.length >= 4) {
            const historyAverage =
                calculateAverage(
                    previousMatchesScores
                );

            const historyDeviation =
                calculateStandardDeviation(
                    previousMatchesScores
                );

            if (historyDeviation > 0) {
                const zScore =
                    (currentScore -
                        historyAverage) /
                    historyDeviation;

                if (zScore >= 1.75) {
                    isAnomaly = true;
                    anomalyType = "positive";
                } else if (zScore <= -1.75) {
                    isAnomaly = true;
                    anomalyType = "negative";
                }
            }
        }

        comparisons.push({
            matchId: matches[i].matchId,
            score: currentScore,
            deltaFromPrevious,
            deltaFromRecentAverage,
            isAnomaly,
            anomalyType,
        });
    }

    return {
        score,
        standardDeviation: Math.round(
            standardDeviation * 10
        ) / 10,
        averageScore: Math.round(averageScore),
        recentAverage: Math.round(recentAverage),
        previousAverage: Math.round(
            previousAverage
        ),
        trend,
        trendValue: Math.round(trendValue),
        confidence,
        comparisons,
    };
}