interface Props {
    data: {
        games: number;
        wins: number;
        losses: number;
        winrate: number;
        averageKda: number;
        favoriteChampion: string;
        favoriteChampionGames: number;
    }
}


export default function PerformanceCard({
    data
}: Props) {

    return (

        <section className="
rounded-3xl
border
border-zinc-800
bg-zinc-900/70
p-8
">

            <h2 className="
text-3xl
font-black
mb-6
">
                Recent Performance
            </h2>


            <div className="
grid
gap-5
md:grid-cols-4
">


                <Card
                    title="Winrate"
                    value={`${data.winrate}%`}
                />


                <Card
                    title="Games"
                    value={data.games}
                />


                <Card
                    title="Average KDA"
                    value={data.averageKda}
                />


                <Card
                    title="Best Champion"
                    value={`${data.favoriteChampion} (${data.favoriteChampionGames})`}
                />


            </div>


        </section>

    )

}



function Card({
    title,
    value
}: {
    title: string,
    value: string | number
}) {

    return (

        <div className="
rounded-2xl
bg-black/40
p-5
">

            <p className="text-zinc-400">
                {title}
            </p>

            <p className="
mt-2
text-2xl
font-black
">
                {value}
            </p>

        </div>

    )

}