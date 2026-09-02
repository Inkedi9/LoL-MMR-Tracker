# ⚔️ LoL MMR Tracker

![LoL MMR Tracker Banner](https://via.placeholder.com/1200x400)

Application web permettant d'analyser un profil League of Legends via le Riot ID et d'obtenir une estimation de performance basée sur les données publiques disponibles.

Le projet utilise l'API Riot Games afin de récupérer les informations joueur, le classement SoloQ ainsi que l'historique récent des parties.

> ⚠️ Le MMR réel de League of Legends n'est pas accessible via l'API Riot publique. L'application fournit donc une **estimation basée sur plusieurs indicateurs de performance**.

---

# ✨ Fonctionnalités V1

## 🔎 Recherche joueur

Recherche d'un joueur via son Riot ID :

Récupération automatique :

- Nom du compte
- Niveau d'invocateur
- PUUID Riot
- Rang actuel

---

## 🏆 Profil joueur

Affichage :

- Tier actuel
- Division
- LP
- Nombre de victoires / défaites
- Winrate
- Hot Streak

Exemple :

SILVER I

66 LP

190 Games

53% Winrate

🔥 Hot Streak

---

## 🎮 Historique des parties

Analyse des dernières games :

- Champion joué
- Victoire / Défaite
- Kills
- Deaths
- Assists
- KDA
- Durée de partie

Avec affichage des icônes champions via Riot Data Dragon.

---

## 📊 Performance récente

Calcul automatique :

- Winrate récent
- Nombre de games analysées
- KDA moyen
- Champion le plus joué

---

## 🧠 Estimation MMR

Création d'un score d'estimation basé sur :

- Rang actuel
- LP
- Winrate récent
- KDA moyen
- Performances récentes

Exemple :

Estimated MMR

1250 - 1350

Most likely:

Gold IV

Trend:

↗ Rising

---

# 🛠️ Stack technique

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js API Routes
- Riot Games API

## Data

- Riot Account API
- Riot Summoner API
- Riot League API
- Riot Match API
- Riot Data Dragon

---

# 📁 Architecture

```
lol-mmr-tracker/

├── app/
│ ├── api/
│ │ └── search/
│ │ └── route.ts
│ │
│ └── page.tsx
│
├── components/
│ ├── home/
│ │ ├── Hero.tsx
│ │ ├── SearchBar.tsx
│ │ └── Features.tsx
│ │
│ └── profile/
│ ├── ProfileDashboard.tsx
│ ├── PerformanceCard.tsx
│ ├── MMRCard.tsx
│ └── MatchHistory.tsx
│
├── lib/
│ ├── riot/
│ │ ├── account.ts
│ │ ├── summoner.ts
│ │ ├── league.ts
│ │ ├── matches.ts
│ │ ├── match.ts
│ │ └── parser.ts
│ │
│ └── analysis/
│ ├── performance.ts
│ └── mmr.ts
│
├── types/
│ └── riot.ts
│
├──README.md
└── ROADMAP.md
```

---

# 🚀 Installation

## Prérequis

- Node.js 20+
- Compte développeur Riot Games

---

## Cloner le projet

git clone https://github.com/username/lol-mmr-tracker.git

cd lol-mmr-tracker

Installer les dépendances

```
bash npm install
```

## Configuration

Créer un fichier :

.env.local

Ajouter :

RIOT_API_KEY=your_api_key_here

RIOT_REGIONAL_URL=https://europe.api.riotgames.com

Lancer le projet
```
npm run dev
```

Application disponible :

http://localhost:3000

## 🔐 API Riot

Le projet utilise les APIs Riot suivantes :

Account API

Recherche par Riot ID :

/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}

Summoner API

Informations joueur :

/lol/summoner/v4/summoners/by-puuid/{puuid}

League API

Classement :

/lol/league/v4/entries/by-puuid/{puuid}

Match API

Historique :

/lol/match/v5/matches/by-puuid/{puuid}/ids

## ⚠️ Limites actuelles

MMR

Riot ne fournit pas le MMR réel publiquement.

L'estimation actuelle est donc un indicateur basé sur :

- statistiques récentes
- rang actuel
- performances

Elle ne représente pas une valeur officielle Riot.

Rate Limit Riot

L'API Riot possède des limites de requêtes.

Le projet utilise actuellement :

- appels contrôlés
- délai entre les requêtes
- récupération limitée de matchs

## 🗺️ Roadmap

[ROADMAP](./ROADMAP.md)

### 📜 Disclaimer

League of Legends et Riot Games sont des marques déposées de Riot Games, Inc.

Ce projet n'est pas affilié à Riot Games.

Les données utilisées proviennent de l'API officielle Riot Games.

### 👤 Auteur

Projet réalisé par Inkedi9

Développement orienté :

React / Next.js
TypeScript
API Integration
Data Analysis
Gaming Tools
