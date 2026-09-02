import type { MatchResult } from "../../types/riot";


interface MmrResult {

    min: number;

    max: number;

    average: number;

    rankPrediction: string;

    trend: "RISING" | "STABLE" | "FALLING";

    confidence: number;

}



export function calculateMMR(
    matches: MatchResult[],
    tier: string,
    lp: number
): MmrResult {


    let score = 0;


    // Base selon le rang actuel

    const tierScore: Record<string, number> = {

        IRON: 500,
        BRONZE: 700,
        SILVER: 900,
        GOLD: 1100,
        PLATINUM: 1300,
        EMERALD: 1500,
        DIAMOND: 1800,
        MASTER: 2200

    };


    score += tierScore[tier] ?? 900;


    // LP

    score += lp * 2;



    // Performance récente

    const wins =
        matches.filter(
            m => m.win
        ).length;


    const winrate =
        wins / matches.length;



    if (winrate >= 0.6) {

        score += 150;

    }
    else if (winrate < 0.45) {

        score -= 100;

    }



    // KDA moyen

    const avgKda =
        matches.reduce(
            (sum, m) => sum + m.kda,
            0
        ) / matches.length;



    if (avgKda >= 4) {

        score += 100;

    }
    else if (avgKda < 2) {

        score -= 75;

    }



    let trend:
        "RISING" |
        "STABLE" |
        "FALLING";


    if (score > tierScore[tier] + 150) {

        trend = "RISING";

    }
    else if (score < tierScore[tier] - 100) {

        trend = "FALLING";

    }
    else {

        trend = "STABLE";

    }



    const average = Math.round(score);


    const min = average - 75;
    const max = average + 75;



    function getRankFromMMR(mmr: number) {

        if (mmr >= 2000)
            return "Master";

        if (mmr >= 1800)
            return "Diamond IV";

        if (mmr >= 1600)
            return "Emerald IV";

        if (mmr >= 1450)
            return "Platinum IV";

        if (mmr >= 1350)
            return "Gold I";

        if (mmr >= 1250)
            return "Gold IV";

        if (mmr >= 1150)
            return "Silver I";

        if (mmr >= 1050)
            return "Silver IV";

        if (mmr >= 900)
            return "Bronze";

        return "Iron";

    }


    return {

        min,

        max,

        average,

        rankPrediction:
            getRankFromMMR(average),

        trend,

        confidence:
            Math.min(
                95,
                matches.length * 5
            )

    };

}