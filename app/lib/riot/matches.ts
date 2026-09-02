import { riotFetch } from "./client";
import { getMatchById } from "./match";
import { parseMatch } from "./parser";


export async function getMatchIdsByPuuid(
    puuid: string
) {

    return riotFetch<string[]>(
        `/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
        "regional"
    );

}

function sleep(ms: number) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}


export async function getPlayerMatches(
    puuid: string
) {

    const matchIds = await getMatchIdsByPuuid(
        puuid
    );


    const matches = [];


    for (const id of matchIds) {

        const match = await getMatchById(id);


        matches.push(
            parseMatch(
                match,
                puuid
            )
        );


        // Petite pause pour respecter Riot
        await sleep(300);

    }


    return matches;

}