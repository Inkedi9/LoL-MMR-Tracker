import type {
    RiotAccount,
    Summoner,
    LeagueEntry,
} from "../../types/riot";

interface Props {
    account: RiotAccount;
    summoner: Summoner;
    league: LeagueEntry;
}

export default function ProfileHeader({
    account,
    summoner,
    league,
}: Props) {
    return (
        <div className="
            rounded-3xl
            border border-zinc-800
            bg-zinc-900/70
            p-8
            backdrop-blur-xl
        ">

            <div className="flex items-center gap-6">

                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/15.10.1/img/profileicon/${summoner.profileIconId}.png`}
                    alt="Profile icon"
                    className="
                        h-24
                        w-24
                        rounded-2xl
                        border
                        border-zinc-700
                    "
                />

                <div>

                    <h1 className="
                        text-4xl
                        font-black
                    ">
                        {account.gameName}

                        <span className="text-zinc-500">
                            #{account.tagLine}
                        </span>
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        Level {summoner.summonerLevel}
                    </p>

                    {league.hotStreak && (
                        <span className="
                            mt-3
                            inline-flex
                            rounded-full
                            bg-red-500/10
                            px-3
                            py-1
                            text-sm
                            text-red-400
                        ">
                            🔥 Hot Streak
                        </span>
                    )}

                </div>

            </div>

        </div>
    );
}
