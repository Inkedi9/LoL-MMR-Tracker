import { notFound } from "next/navigation";

import ProfileDashboard from "../../components/profile/ProfileDashboard";

import ProfileLayout from "../../components/profile/ProfileLayout";

interface Props {
    params: Promise<{
        riotId: string;
    }>;
}

export default async function ProfilePage({
    params,
}: Props) {

    const { riotId } = await params;

    if (!riotId) {
        notFound();
    }

    const decodedRiotId = decodeURIComponent(riotId);

    const separatorIndex = decodedRiotId.lastIndexOf("-");

    if (separatorIndex === -1) {
        notFound();
    }

    const gameName = decodedRiotId.slice(0, separatorIndex);
    const tagLine = decodedRiotId.slice(separatorIndex + 1);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/search?gameName=${encodeURIComponent(gameName)}&tagLine=${encodeURIComponent(tagLine)}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        notFound();
    }

    const profile = await response.json();

    return (
        <ProfileLayout>
            <ProfileDashboard
                account={profile.account}
                summoner={profile.summoner}
                league={profile.leagues[0]}
                matches={profile.matchHistory}
            />
        </ProfileLayout>
    );
}