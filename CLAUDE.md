# CLAUDE.md — PRAY FOR ME (PFM)

## Projet
Site e-commerce mode avant-garde.
Repo GitHub: colinpietri20/the-curator
Stack: vanilla HTML/CSS/JS — UN seul fichier par page, aucun framework.

## Pages
- index.html — Landing page
- collection.html — Grille produits
- about.html — Histoire de la marque
- logo-pfm-v2.svg — Logo SVG dans le dossier

## Direction artistique
Références: Balenciaga 2017 + sicko.jp + Maison Margiela + enfant riche déprimé
Mood: brutal, minimaliste, anti-design, subversif, poétique

## Design System
- Background: #ffffff
- Text: #000000
- Accent: #ff0000 (glitch uniquement)
- Font: Barlow Condensed 700, uppercase, letter-spacing tight
- ZERO gradient, ZERO shadow, ZERO border-radius

## index.html
- Full viewport, pas de scroll
- Logo top-left fixed (120px)
- Canvas 2D glitch VHS en fond
- Bouton "SHOP" centré → collection.html
- Footer fixed: © PRAY FOR ME SS25 / PARIS

## collection.html
- Header: logo + bandeau menu horizontal
- Grille CSS 3 colonnes, gap 1px, bordures noires
- 6 produits: flat → hover worn (crossfade 0.4s)

## about.html
- Story fictive marque
- Titre wobbly SVG feTurbulence
- Barlow Condensed, centré, max-width 600px

## Règles absolues
- JAMAIS dark background sur collection et about
- JAMAIS border-radius
- JAMAIS couleurs autres que #000, #fff, #ff0000
- UN seul fichier HTML par page
- Toujours lire ce CLAUDE.md avant toute modification
