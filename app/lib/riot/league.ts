import { riotFetch } from "./client";
import type { LeagueEntry } from "../../types/riot";

export async function getLeagueByPuuid(
    puuid: string
) {

    if (!puuid) {
        throw new Error("Missing puuid");
    }

    return riotFetch<LeagueEntry[]>(
        `/lol/league/v4/entries/by-puuid/${puuid}`,
        "platform"
    );

}