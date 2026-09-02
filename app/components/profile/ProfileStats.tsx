import type { LeagueEntry } from "../../types/riot";

interface Props {
    league: LeagueEntry;
}

export default function ProfileStats({
    league,
}: Props) {

    const games = league.wins + league.losses;

    const winrate =
        games > 0
            ? Math.round((league.wins / games) * 100)
            : 0;

    return (
        <div className="
            grid
            gap-6
            md:grid-cols-4
        ">

            <StatCard
                title="Rank"
                value={`${league.tier} ${league.rank}`}
            />

            <StatCard
                title="LP"
                value={`${league.leaguePoints}`}
            />

            <StatCard
                title="Games"
                value={`${games}`}
            />

            <StatCard
                title="Winrate"
                value={`${winrate}%`}
            />

        </div>
    );
}

function StatCard({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div className="
            rounded-2xl
            border border-zinc-800
            bg-zinc-900/60
            p-6
        ">

            <p className="text-sm text-zinc-400">
                {title}
            </p>

            <p className="
                mt-3
                text-3xl
                font-bold
            ">
                {value}
            </p>

        </div>
    );
}