import type { MatchResult } from "../../types/riot";

export interface MMRPoint {
    game: number;
    matchId: string;
    mmr: number;
    impact: number;
}

export interface MMRProgression {
    points: MMRPoint[];
    startMMR: number;
    currentMMR: number;
    change: number;
    trend: "RISING" | "STABLE" | "FALLING";
}


function calculateMatchImpact(
    match: MatchResult
): number {

    let impact = match.win ? 25 : -25;


    // Impact du KDA

    if (match.kda >= 5) {
        impact += 15;
    }
    else if (match.kda >= 3) {
        impact += 8;
    }
    else if (match.kda < 1.5) {
        impact -= 10;
    }


    // Limiter l'impact d'une seule partie

    return Math.max(
        -40,
        Math.min(40, impact)
    );
}


export function calculateMMRProgression(
    matches: MatchResult[],
    currentMMR: number
): MMRProgression {

    if (matches.length === 0) {
        return {
            points: [],
            startMMR: currentMMR,
            currentMMR,
            change: 0,
            trend: "STABLE",
        };
    }


    const orderedMatches = [
        ...matches
    ].reverse();


    /*
     * On reconstruit l'historique
     * à partir du MMR actuel.
     */

    const impacts = orderedMatches.map(
        match => calculateMatchImpact(match)
    );


    const totalImpact =
        impacts.reduce(
            (sum, impact) => sum + impact,
            0
        );


    const startMMR =
        currentMMR - totalImpact;


    let mmr = startMMR;


    const points: MMRPoint[] =
        orderedMatches.map(
            (match, index) => {

                const impact =
                    impacts[index];


                mmr += impact;


                return {
                    game: index + 1,
                    matchId: match.matchId,
                    mmr,
                    impact,
                };

            }
        );


    const change =
        currentMMR - startMMR;


    let trend:
        "RISING" |
        "STABLE" |
        "FALLING";


    if (change >= 50) {

        trend = "RISING";

    }
    else if (change <= -50) {

        trend = "FALLING";

    }
    else {

        trend = "STABLE";

    }


    return {

        points,

        startMMR,

        currentMMR,

        change,

        trend,

    };

}