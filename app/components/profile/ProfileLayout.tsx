"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
    User,
    Swords,
    TrendingUp,
    BarChart3,
    Activity,
    Scale,
    History,
} from "lucide-react";

interface Props {
    children: ReactNode;
}

const sections = [
    {
        id: "overview",
        label: "Overview",
        icon: User,
    },
    {
        id: "performance",
        label: "Performance",
        icon: Swords,
    },
    {
        id: "progression",
        label: "Progression",
        icon: TrendingUp,
    },
    {
        id: "analysis",
        label: "Analysis",
        icon: BarChart3,
    },
    {
        id: "evolution",
        label: "Evolution",
        icon: Activity,
    },
    {
        id: "winloss",
        label: "Win / Loss",
        icon: Scale,
    },
    {
        id: "matches",
        label: "Matches",
        icon: History,
    },
];

export default function ProfileLayout({
    children,
}: Props) {

    const [activeSection, setActiveSection] =
        useState("overview");


    useEffect(() => {

        const observer = new IntersectionObserver(
            (entries) => {

                const visibleEntry =
                    entries
                        .filter(
                            (entry) => entry.isIntersecting
                        )
                        .sort(
                            (a, b) =>
                                b.intersectionRatio -
                                a.intersectionRatio
                        )[0];

                if (visibleEntry) {
                    setActiveSection(
                        visibleEntry.target.id
                    );
                }

            },
            {
                rootMargin: "-20% 0px -65% 0px",
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );


        sections.forEach(({ id }) => {

            const element =
                document.getElementById(id);

            if (element) {
                observer.observe(element);
            }

        });


        return () => {
            observer.disconnect();
        };

    }, []);


    return (

        <div className="mx-auto flex w-full max-w-7xl gap-8">

            {/* Sidebar */}

            <aside className="
                hidden
                w-56
                shrink-0
                lg:block
            ">

                <div className="
                    sticky
                    top-24
                    rounded-2xl
                    border
                    border-zinc-800
                    bg-zinc-900/60
                    p-3
                    backdrop-blur-xl
                ">

                    <p className="
                        px-3
                        pb-3
                        pt-2
                        text-xs
                        font-semibold
                        uppercase
                        tracking-widest
                        text-zinc-500
                    ">
                        Profile
                    </p>


                    <nav className="space-y-1">

                        {sections.map(
                            ({
                                id,
                                label,
                                icon: Icon,
                            }) => (

                                <a
                                    key={id}
                                    href={`#${id}`}
                                    className={`
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-2.5
                                        text-sm
                                        font-medium
                                        transition
                                        ${
                                            activeSection === id
                                                ? "bg-red-500/10 text-red-400"
                                                : "text-zinc-400 hover:bg-zinc-800/70 hover:text-zinc-200"
                                        }
                                    `}
                                >

                                    <Icon
                                        className={`
                                            h-4
                                            w-4
                                            transition
                                            ${
                                                activeSection === id
                                                    ? "text-red-400"
                                                    : "text-zinc-500 group-hover:text-zinc-300"
                                            }
                                        `}
                                    />

                                    {label}

                                </a>

                            )
                        )}

                    </nav>

                </div>

            </aside>


            {/* Content */}

            <main className="min-w-0 flex-1">
                {children}
            </main>

        </div>
    );
}
