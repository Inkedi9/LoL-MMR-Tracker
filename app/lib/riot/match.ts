import { riotFetch } from "./client";


export async function getMatchById(
    matchId: string
) {

    return riotFetch<any>(
        `/lol/match/v5/matches/${matchId}`,
        "regional"
    );

}