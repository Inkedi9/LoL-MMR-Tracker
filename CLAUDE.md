# Synthese du projet - LoL MMR Tracker

## Vue d'ensemble

LoL MMR Tracker est une application web Next.js qui analyse un profil League of Legends a partir d'un Riot ID. Elle recupere les donnees publiques via l'API Riot Games, affiche le profil du joueur, son rang SoloQ, son historique recent de parties et calcule des indicateurs maison de performance et de MMR estime.

Important : Riot ne fournit pas le MMR reel via son API publique. Toute valeur affichee comme MMR est donc une estimation construite a partir du rang visible, des LP, du winrate recent, du KDA et d'autres statistiques de match.

## Stack

- Next.js 16 avec App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts pour les graphiques
- Framer Motion pour les animations
- Lucide React pour les icones
- API Routes Next.js pour faire le pont avec l'API Riot

Scripts utiles :

```bash
npm run dev
npm run build
npm run lint
```

## Configuration

Variables d'environnement attendues :

```bash
RIOT_API_KEY=...
RIOT_REGIONAL_URL=https://europe.api.riotgames.com
RIOT_PLATFORM_URL=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`RIOT_REGIONAL_URL` sert aux endpoints regionaux, notamment Account et Match-V5. `RIOT_PLATFORM_URL` sert aux endpoints plateforme, notamment Summoner et League. `NEXT_PUBLIC_APP_URL` est utilise par la page profil pour appeler `/api/search` cote serveur, avec fallback sur `http://localhost:3000`.

## Parcours utilisateur

1. L'utilisateur arrive sur la page d'accueil `/`.
2. Il saisit un Riot ID via la barre de recherche.
3. L'application redirige vers `/profile/[riotId]`, avec un format base sur `gameName-tagLine`.
4. La page profil decode l'identifiant, appelle `/api/search`, puis transmet les donnees a `ProfileDashboard`.
5. Le dashboard affiche le profil, les stats, les analyses de performance, la progression MMR estimee et l'historique des matchs.

## Architecture principale

```text
app/
  page.tsx                         Page d'accueil
  api/search/route.ts              Endpoint agregateur Riot
  profile/[riotId]/page.tsx        Page profil serveur
  components/home/                 Hero, recherche, stats, features
  components/layout/               Navbar
  components/profile/              Dashboard et cartes d'analyse profil
  lib/riot/                        Clients et wrappers Riot API
  lib/analysis/                    Calculs performance, MMR, evolution
  types/riot.ts                    Types principaux des donnees Riot parsees
```

## Flux de donnees Riot

L'endpoint `app/api/search/route.ts` orchestre les appels :

1. `getAccountByRiotId(gameName, tagLine)` recupere le compte Riot et le PUUID.
2. `getSummonerByPuuid(puuid)` recupere le niveau, l'icone et les infos invocateur.
3. `getLeagueByPuuid(puuid)` recupere les entrees classees.
4. `getPlayerMatches(puuid)` recupere et parse l'historique recent.

Les appels passent par `riotFetch` dans `app/lib/riot/client.ts`, qui ajoute le header `X-Riot-Token`.

## Donnees de match

Les matchs sont normalises dans le type `MatchResult` :

- champion, victoire/defaite, KDA, duree
- CS, gold, damage, vision, kill participation
- objectifs : barons, dragons, tours
- score et grade de performance
- overview des deux equipes via `teams`

Ces donnees alimentent ensuite les composants de profil et les modules d'analyse.

## Moteur de performance

`app/lib/analysis/performance.ts` calcule :

- score individuel par match
- modificateur victoire/defaite
- grade de S+ a F
- scores par dimension : KDA, farming, damage, kill participation, vision, objectifs
- performance globale : games, wins, losses, winrate, KDA moyen, champion favori
- consistance : moyenne recente, tendance, variance, detection d'anomalies

La performance individuelle est volontairement separee du resultat de la partie. Le resultat agit seulement comme modificateur final.

## Moteur MMR

`app/lib/analysis/mmr.ts` produit une estimation :

- fourchette min/max
- moyenne estimee
- rang probable
- tendance `RISING`, `STABLE` ou `FALLING`
- niveau de confiance base sur le nombre de matchs

La V1 se base surtout sur le rang, les LP, le winrate recent et le KDA moyen. La roadmap prevoit un moteur V2 plus riche avec champion, role, force adverse, difficulte de match, regularite et forme recente.

## Etat du projet

V1 est terminee :

- recherche Riot ID
- profil joueur
- rang, LP, winrate, hot streak
- historique de matchs
- details de match
- dashboard dark/premium
- premiere estimation MMR
- premier scoring performance

V2 est en cours :

- analytics engine partiellement structure
- progression MMR deja presente mais a rendre plus exploitable
- match analysis partiellement fait
- champion analysis et role analysis encore a construire
- responsive, loading states, empty states et error states a finaliser

Roadmap long terme :

- V3 : MMR DNA / profil de style de jeu
- V4 : competitive intelligence et difficulte de match
- V5 : AI coach base sur les vraies donnees joueur
- V6 : produit complet avec comptes, historique permanent et suivi

## Points d'attention pour les prochains devs

- Le projet utilise Next.js 16. Avant de modifier des APIs Next.js, lire la documentation locale dans `node_modules/next/dist/docs/`, car les conventions peuvent differer des versions connues.
- Eviter de presenter le MMR comme une valeur officielle Riot.
- Garder les appels Riot limites : l'API a des rate limits.
- Respecter la separation actuelle entre `lib/riot` pour la collecte/parsing et `lib/analysis` pour les calculs.
- Favoriser des scores explicables : chaque metrique affichee doit pouvoir etre reliee a des donnees Riot visibles.
- Ne pas exposer `RIOT_API_KEY` cote client.
