import {
    Shield,
    LineChart,
    Swords,
} from "lucide-react";

const features = [
    {
        icon: Shield,
        title: "Reliable estimation",
        description: "Advanced algorithm based on Riot public data.",
    },
    {
        icon: LineChart,
        title: "Performance tracking",
        description: "Follow your MMR evolution over time.",
    },
    {
        icon: Swords,
        title: "Match analysis",
        description: "Understand every ranked game.",
    },
];

export default function Features() {
    return (
        <section className="grid w-full max-w-6xl gap-6 md:grid-cols-3">

            {features.map((feature) => {

                const Icon = feature.icon;

                return (
                    <div
                        key={feature.title}
                        className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 transition hover:-translate-y-2 hover:border-red-500"
                    >

                        <Icon className="mb-6 text-red-500" />

                        <h3 className="text-xl font-bold">
                            {feature.title}
                        </h3>

                        <p className="mt-3 text-zinc-400">
                            {feature.description}
                        </p>

                    </div>
                );

            })}

        </section>
    );
}