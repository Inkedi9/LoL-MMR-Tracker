"use client";

import MatchHistory from "./MatchHistory";
import PerformanceCard from "./PerformanceCard";
import MMRCard from "./MMRCard";
import MMRProgression from "./MMRProgression";
import RecentAnalysis from "./RecentAnalysis";
import PerformanceEvolution from "./PerformanceEvolution";
import WinLossTimeline from "./WinLossTimeline";
import GameplayMetrics from "./GameplayMetrics";
import ProfileOverview from "./ProfileOverview";

import { calculatePerformance } from "../../lib/analysis/performance";
import { calculateMMR } from "../../lib/analysis/mmr";
import { calculateMMRProgression } from "../../lib/analysis/progression";

import type {
    RiotAccount,
    Summoner,
    LeagueEntry,
    MatchResult,
} from "../../types/riot";


interface Props {
    account: RiotAccount;
    summoner: Summoner;
    league: LeagueEntry;
    matches: MatchResult[];
}


export default function ProfileDashboard({
    account,
    summoner,
    league,
    matches,
}: Props) {

    const performance = calculatePerformance(matches);

    const mmr = calculateMMR(
        matches,
        league.tier,
        league.leaguePoints
    );

    const progression = calculateMMRProgression(
        matches,
        mmr.average
    );


    return (
        <section
            id="overview"
            className="w-full space-y-8"
        >

            <ProfileOverview
                account={account}
                summoner={summoner}
                league={league}
            />

            <div
                id="performance"
                className="grid gap-8 xl:grid-cols-2">
                <PerformanceCard data={performance} />
                <MMRCard data={mmr} />
            </div>

            <div id="progression">
                <MMRProgression
                    data={progression}
                />
            </div>

            <div
                id="analysis"
                className="grid gap-8 xl:grid-cols-2">
                <RecentAnalysis matches={matches} />
                <GameplayMetrics matches={matches} />
            </div>

            <div id="evolution">
                <PerformanceEvolution
                    matches={matches}
                />
            </div>

            <div id="winloss">
                <WinLossTimeline
                    matches={matches}
                />
            </div>

            <div id="matches">
                <MatchHistory
                    matches={matches}
                />
            </div>

        </section>
    );
}