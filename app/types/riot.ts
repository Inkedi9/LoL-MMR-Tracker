export interface RiotAccount {
    puuid: string;
    gameName: string;
    tagLine: string;
}

export interface Summoner {
    puuid: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
}

export interface LeagueEntry {
    leagueId?: string;
    queueType: string;
    tier: string;
    rank: string;
    leaguePoints: number;
    wins: number;
    losses: number;

    hotStreak: boolean;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;

    puuid: string;
}

export interface MatchReference {
    matchId: string;
}

export interface MatchResult {
    matchId: string;
    puuid: string;
    champion: string;
    win: boolean;
    kills: number;
    deaths: number;
    assists: number;
    kda: number;
    duration: number;
    cs: number;
    csPerMinute: number;
    gold: number;
    goldPerMinute: number;
    damage: number;
    damagePerMinute: number;
    visionScore: number;
    visionPerMinute: number;
    teamKills: number;
    killParticipation: number;
    baronKills: number;
    dragonKills: number;
    turretKills: number;
    performanceScore: number;
    performanceGrade: string;
    teams: MatchTeam[];
}

export interface MatchParticipant {
    puuid: string;
    champion: string;

    kills: number;
    deaths: number;
    assists: number;

    win: boolean;
}

export interface MatchTeam {
    teamId: number;
    win: boolean;
    players: MatchParticipant[];
}