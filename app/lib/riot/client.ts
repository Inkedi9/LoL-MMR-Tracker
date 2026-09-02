const API_KEY = process.env.RIOT_API_KEY!;
const REGIONAL_URL = process.env.RIOT_REGIONAL_URL!;
const PLATFORM_URL = process.env.RIOT_PLATFORM_URL!;

export async function riotFetch<T>(
    endpoint: string,
    region: "regional" | "platform" = "regional"
): Promise<T> {

    const baseUrl =
        region === "regional"
            ? REGIONAL_URL
            : PLATFORM_URL;

    const response = await fetch(`${baseUrl}${endpoint}`, {
        headers: {
            "X-Riot-Token": process.env.RIOT_API_KEY!,
        },
    });

    if (!response.ok) {
        const body = await response.text();

        throw new Error(
            `Riot API Error ${response.status}: ${body}`
        );
    }

    return response.json();
}