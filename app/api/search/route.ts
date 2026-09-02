import { NextResponse } from "next/server";
import { getAccountByRiotId } from "../../lib/riot/account";
import { getSummonerByPuuid } from "../../lib/riot/summoner";
import { getLeagueByPuuid } from "../../lib/riot/league";
import { getPlayerMatches } from "../../lib/riot/matches";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);

    const gameName = searchParams.get("gameName");
    const tagLine = searchParams.get("tagLine");

    if (!gameName || !tagLine) {
        return NextResponse.json(
            {
                error: "Missing Riot ID",
            },
            {
                status: 400,
            }
        );
    }


    try {

        const account = await getAccountByRiotId(
            gameName,
            tagLine
        );


        const summoner = await getSummonerByPuuid(
            account.puuid
        );

        const leagues = await getLeagueByPuuid(
            account.puuid
        );

        const matchHistory = await getPlayerMatches(
            account.puuid
        );

        return NextResponse.json({
            account,
            summoner,
            leagues,
            matchHistory
        });


    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error",
            },
            {
                status: 500,
            }
        );

    }
}