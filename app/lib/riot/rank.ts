export function getRankIcon(tier: string): string {
    const normalizedTier = tier.toUpperCase();

    const validTiers = [
        "IRON",
        "BRONZE",
        "SILVER",
        "GOLD",
        "PLATINUM",
        "EMERALD",
        "DIAMOND",
        "MASTER",
        "GRANDMASTER",
        "CHALLENGER",
    ];

    if (!validTiers.includes(normalizedTier)) {
        return "";
    }

    return `https://ddragon.leagueoflegends.com/cdn/15.10.1/img/rank/${normalizedTier}.png`;
}
