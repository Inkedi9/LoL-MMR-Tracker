import type { MatchResult } from "../../types/riot";

export interface EvolutionPoint {
    game: number;
    matchId: string;
    champion: string;
    result: "WIN" | "LOSS";

    performance: number;
    kda: number;
    csPerMinute: number;
    damagePerMinute: number;
    visionPerMinute: number;
}

export function getEvolutionData(
    matches: MatchResult[]
): EvolutionPoint[] {

    return [...matches]
        .reverse()
        .map((match, index) => ({
            game: index + 1,
            matchId: match.matchId,
            champion: match.champion,

            result: match.win
                ? "WIN"
                : "LOSS",

            performance:
                match.performanceScore ?? 0,

            kda:
                match.kda,

            csPerMinute:
                match.csPerMinute ?? 0,

            damagePerMinute:
                match.damagePerMinute ?? 0,

            visionPerMinute:
                match.visionPerMinute ?? 0,
        }));
}