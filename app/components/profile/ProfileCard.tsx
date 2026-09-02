import type { RiotAccount, Summoner, LeagueEntry } from "../../types/riot";


interface Props {
    account: RiotAccount;
    summoner: Summoner;
    league: LeagueEntry;
}


export default function ProfileCard({
    account,
    summoner,
    league,
}: Props) {

    const totalGames =
        league.wins + league.losses;

    const winrate =
        Math.round(
            (league.wins / totalGames) * 100
        );


    return (
        <div className="
      w-full max-w-xl
      rounded-3xl
      border border-zinc-800
      bg-zinc-900/70
      p-8
      backdrop-blur-xl
    ">

            <h2 className="text-3xl font-bold">
                {account.gameName}
                <span className="text-zinc-500">
                    #{account.tagLine}
                </span>
            </h2>


            <p className="mt-2 text-zinc-400">
                Level {summoner.summonerLevel}
            </p>


            <div className="mt-8">

                <p className="text-sm text-zinc-400">
                    Ranked Solo
                </p>


                <h3 className="mt-2 text-5xl font-black text-red-500">
                    {league.tier} {league.rank}
                </h3>


                <p className="mt-2">
                    {league.leaguePoints} LP
                </p>


                <div className="mt-6 text-zinc-400">

                    {league.wins}W
                    {" "}
                    {league.losses}L

                    <span className="ml-4">
                        {winrate}% Winrate
                    </span>

                </div>

            </div>

        </div>
    );
}