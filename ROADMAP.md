# 🗺️ Roadmap — LoL MMR Tracker

## 🟢 V1 — Foundation ✅ TERMINÉE

> Objectif : construire un tracker fonctionnel capable de récupérer et présenter les données Riot.

Riot API

- [x] Riot Account API
- [x] Summoner API
- [x] League API
- [x] Match-V5 API
- [x] Recherche par Riot ID
- [x] Récupération des matchs
- [x] Parsing des données Riot

Profil

- [x] Profil joueur
- [x] Riot ID
- [x] Niveau du compte
- [x] Rang
- [x] LP
- [x] Winrate
- [x] Wins / Losses
- [x] Hot Streak
- [x] Champion joué

Match History

- [x] Historique des parties
- [x] Victoire / défaite
- [x] Durée
- [x] KDA
- [x] CS
- [x] Gold
- [x] Damage
- [x] Vision
- [x] Kill Participation
- [x] Objectifs
- [x] Icônes champions
- [x] Match expandable
- [x] Détails d'une partie
- [x] Team Overview
- [x] Joueurs des deux équipes

Premier moteur MMR

- [x] Estimation MMR
- [x] Fourchette MMR
- [x] MMR probable
- [x] Comparaison MMR / rang
- [x] Jauge MMR

Premier moteur Performance

- [x] KDA Score
- [x] CS Score
- [x] Damage Score
- [x] Kill Participation Score
- [x] Vision Score
- [x] Objective Score
- [x] Score global
- [x] Grade S+ → F

Dashboard

- [x] /profile/[riotId]
- [x] Profile Overview
- [x] Performance Card
- [x] MMR Card
- [x] Match History
- [x] Navigation interne
- [x] Design dark / premium

Statut : 🟢 TERMINÉE

## 🔵 V2 — Player Analytics

> Objectif : passer d'un simple tracker à un véritable moteur d'analyse du joueur.

> C'est ici que nous sommes actuellement.

## V2.1 — Analytics Engine 🟡 EN COURS

> Le moteur existe déjà, mais il faut maintenant le structurer proprement.

Déjà fait

- [x] Performance Score
- [x] Grade
- [x] KDA
- [x] CS/min
- [x] Damage/min
- [x] Gold/min
- [x] Vision/min
- [x] Kill Participation
- [x] Objectifs

À améliorer

- [ ] Normalisation des scores
- [ ] Gestion des valeurs extrêmes
- [ ] Score différent selon le rôle
- [ ] Score différent selon la durée de partie
- [ ] Meilleure pondération des métriques
- [ ] Séparation performance individuelle / résultat de partie
- [ ] Score de consistance
- [ ] Détection des performances anormales
- [ ] Comparaison avec les parties précédentes

### 🎯 Objectif

Arriver à quelque chose comme :

```
PERFORMANCE

Overall       84
Combat        91
Farming       76
Damage        88
Vision        72
Objectives    94
Consistency   81
```

> C'est une étape importante avant le MMR DNA.

## V2.2 — MMR Progression 🟡

Le composant et le calcul de progression existent déjà.

Déjà fait

- [x] MMR moyen
- [x] MMR progression
- [x] Historique de progression
- [x] Calcul par partie
- [x] Composant MMRProgression

À améliorer

- [ ] Graphique réellement exploitable
- [ ] MMR avant / après chaque partie
- [ ] Tendance
- [ ] Meilleure période
- [ ] Pire période
- [ ] Gain moyen par victoire
- [ ] Perte moyenne par défaite
- [ ] Volatilité du MMR
- [ ] Indicateur de confiance

Exemple :

```
MMR PROGRESSION

1400 ┤                         ╭──
1350 ┤                    ╭────╯
1300 ┤              ╭─────╯
1250 ┤        ╭─────╯
1200 ┤────────╯
     └────────────────────────────
       1    5    10    15    20

Current       1382
Change        +132
Trend         ↗ Positive
Confidence    78%
```

## V2.3 — Match Analysis 🟢 PARTIELLEMENT FAIT

La base est déjà présente dans MatchDetails.

Déjà fait

- [x] KDA
- [x] CS
- [x] Gold
- [x] Damage
- [x] Vision
- [x] Objectives
- [x] KP
- [x] Performance Score
- [x] Performance Grade
- [x] Team Overview

À ajouter

- [ ] Early / Mid / Late game
- [ ] Teamfight participation
- [ ] Gold advantage
- [ ] Damage share
- [ ] Kill share
- [ ] CS advantage
- [ ] Performance comparée aux autres joueurs
- [ ] Performance comparée au rôle
- [ ] Timeline de la partie

## V2.4 — Champion Analysis 🔴 À FAIRE

Créer un véritable Champion Pool.

```
CHAMPION POOL

Kayn       30 games   63% WR
Darius     18 games   56% WR
Fizz       12 games   58% WR
```

Features

- [ ] Champions les plus joués
- [ ] Winrate par champion
- [ ] KDA par champion
- [ ] Performance moyenne
- [ ] Performance récente
- [ ] Nombre de parties
- [ ] Meilleur champion
- [ ] Champion le plus joué
- [ ] Champion le plus performant
- [ ] Champion avec meilleure progression

## V2.5 — Role Analysis 🔴 À FAIRE

Déterminer automatiquement le rôle du joueur.

```
ROLE DISTRIBUTION

Jungle       ██████████ 82%
Top          ███████░░░ 67%
Mid          ███░░░░░░░ 31%
ADC          ██░░░░░░░░ 18%
Support      █░░░░░░░░░  8%

MAIN ROLE

🌲 Jungle
Confidence: 82%
```

Features

- [ ] Détection du rôle
- [ ] Pourcentage par rôle
- [ ] Performance par rôle
- [ ] Winrate par rôle
- [ ] KDA par rôle
- [ ] Main Role
- [ ] Role Confidence

## V2.6 — Dashboard Architecture 🟢 LARGEMENT FAIT

La structure est déjà là.

Actuellement

```
/profile/[riotId]

├── Overview
├── Performance
├── MMR
├── Progression
├── Analysis
├── Evolution
├── Win/Loss
└── Matches
```

À finaliser

- [ ] Navigation sticky
- [ ] Sections mieux séparées
- [ ] Responsive mobile
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Skeleton UI
- [ ] Optimisation des appels Riot API

## V2.7 — Advanced Analytics 🔴

> C'est probablement la dernière grosse étape de V2.

Créer plusieurs dimensions analytiques :

```
COMBAT
├── KDA
├── Damage
├── KP
└── Teamfights

FARMING
├── CS/min
├── Gold/min
└── Resource efficiency

VISION
├── Vision score
├── Vision/min
└── Vision contribution

OBJECTIVES
├── Dragons
├── Barons
├── Turrets
└── Objective participation

CONSISTENCY
├── Performance variance
├── Win/Loss variance
└── Recent form
```

## V2.8 — MMR Engine v2 🔴

Une fois toutes les données disponibles, on améliore le modèle.

V1

```
Rank
+
LP
+
Win/Loss
+
Performance
```

V2

```
Rank
LP
Win/Loss
Performance
Champion
Role
Opponent strength
Game difficulty
Consistency
Recent form
```

Features

- [ ] Modèle MMR amélioré
- [ ] Pondération dynamique
- [ ] Recent form
- [ ] Opponent strength
- [ ] Match difficulty
- [ ] Confidence score
- [ ] MMR history
- [ ] MMR vs visible rank
- [ ] Détection de potentiel "under/over-ranked"

## 🟣 V3 — MMR DNA

> Objectif : comprendre le joueur plutôt que simplement afficher ses statistiques.

```
              COMBAT
                87
                 ▲
                 │
       MACRO ────┼──── CARRY
        61       │       84
                 │
                TEAM
                 63
```

Dimensions

- ⚔️ Combat
- 🧠 Macro
- 💰 Economy
- 🎯 Carry
- 🤝 Team

Features

- [ ] Calcul du DNA
- [ ] Profil de jeu
- [ ] Forces
- [ ] Faiblesses
- [ ] Archetype
- [ ] Évolution du DNA

Exemple :

```
YOUR PLAYSTYLE

⚔️ AGGRESSIVE CARRY

Combat       87
Carry        84
Economy      76
Team         63
Macro        61
```

Puis :

```
Tu as un profil très orienté carry.

Tu convertis efficacement tes ressources
en pression et en kills.

Ton principal axe d'amélioration semble
être la macro après ton avantage initial.
```

## 🟠 V4 — Competitive Intelligence

On ajoute le contexte de la partie.

Match Difficulty

```
EASY
████░░░░░░

NORMAL
██████░░░░

HARD
█████████░
```

Analyse

- [ ] Rang moyen des adversaires
- [ ] Niveau moyen des joueurs
- [ ] Performance selon niveau adverse
- [ ] Difficulté de la partie
- [ ] Performance contre différents ranks
- [ ] Winrate vs Silver
- [ ] Winrate vs Gold
- [ ] Winrate vs Platinum
- [ ] Impact de la difficulté dans le MMR

Cela pourra ensuite alimenter directement MMR Engine v2.

## 🤖 V5 — AI Coach

> Seulement une fois le moteur analytique solide.

Architecture :

```
             RIOT API
                │
                ▼
          DATA ENGINE
                │
                ▼
       ANALYTICS ENGINE
                │
        ┌───────┴───────┐
        ▼               ▼
    MMR ENGINE       PLAYER DNA
        │               │
        └───────┬───────┘
                ▼
            AI COACH
```

## V5.1 — AI Match Review

Après chaque partie :

```
GAME ANALYSIS

Kayn — Victory

Performance
84 / 100

STRENGTHS
✓ Excellent early game
✓ High kill conversion
✓ Strong objective control

WEAKNESSES
⚠ Low CS after 20 min
⚠ Too many mid-game deaths
```

## V5.2 — AI Player Coach

L'IA connaît :

```
Profile
+
50 games
+
MMR history
+
Champion pool
+
Role
+
Player DNA
+
Strengths
+
Weaknesses
```

Elle peut donc répondre à :

> Pourquoi je suis bloqué Silver ?

avec une analyse basée sur les données réelles du joueur, plutôt qu'une réponse générique.

## V5.3 — AI Progression

```
LAST 30 DAYS

MMR       +184
KDA       +0.42
CS/min    +0.6
Deaths    -1.2

BIGGEST IMPROVEMENT

🧠 Macro

61 → 74
```

## V5.4 — AI Chat

```
┌───────────────────────────────┐
│ 🧠 MMR COACH                  │
│                               │
│ Why am I stuck in Silver?     │
│                               │
│ Analyse de tes 50 dernières   │
│ parties...                    │
└───────────────────────────────┘
```

## 🚀 V6 — Full Product

À terme :

```
                     LoL MMR
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       PROFILE      ANALYTICS       COACH
          │             │             │
          ▼             ▼             ▼
        Rank         MMR DNA       AI Coach
        LP           Champions     Match Review
        Winrate      Roles         Recommendations
        Games        Progression   Goals
```

Features produit

- [ ] Comptes utilisateurs
- [ ] Sauvegarde historique
- [ ] Plusieurs comptes LoL
- [ ] Comparaison entre joueurs
- [ ] Objectifs personnels
- [ ] Suivi quotidien
- [ ] Suivi hebdomadaire
- [ ] Notifications
- [ ] Dashboard personnel
- [ ] Historique permanent

### 🎯 Où nous sommes réellement

Je positionnerais le projet comme ça :

```
V1 Foundation
████████████████████ 100% ✅

V2 Analytics
███████████░░░░░░░░░ ~55%

V3 MMR DNA
░░░░░░░░░░░░░░░░░░░░   0%

V4 Competitive
░░░░░░░░░░░░░░░░░░░░   0%

V5 AI Coach
░░░░░░░░░░░░░░░░░░░░   0%

V6 Product
░░░░░░░░░░░░░░░░░░░░   0%
```

Et surtout, le dernier npm run build passe entièrement :

```
✓ Compiled successfully
✓ Finished TypeScript
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```
