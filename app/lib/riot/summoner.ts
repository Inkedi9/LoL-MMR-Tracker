import { riotFetch } from "./client";
import type { Summoner } from "../../types/riot";

export async function getSummonerByPuuid(
    puuid: string
) {
    return riotFetch<Summoner>(
        `/lol/summoner/v4/summoners/by-puuid/${puuid}`,
        "platform"
    );
}
