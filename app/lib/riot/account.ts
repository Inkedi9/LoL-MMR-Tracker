import { riotFetch } from "./client";
import type { RiotAccount } from "../../types/riot";

export async function getAccountByRiotId(
    gameName: string,
    tagLine: string
) {
    return riotFetch<RiotAccount>(
        `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`
    );
}