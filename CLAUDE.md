# CLAUDE.md — The Curator

## Project
Cinematic luxury real estate landing page.
Single HTML file (code.html).

## Skills disponibles
- UI/UX Pro Max: ~/.claude/skills/ui-ux-pro-max-skill/
- Search command: python3 ~/.claude/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>
- Domains: style, color, typography, landing, ux

## Avant chaque modification majeure
1. Requête le skill UI/UX pour les recommandations :
   python3 ~/.claude/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "luxury real estate cinematic" --domain style
   python3 ~/.claude/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "luxury dark editorial" --domain typography
2. Appliquer les recommandations avant de coder

## Stack
- Vanilla HTML/CSS/JS (single file)
- GSAP + ScrollTrigger via CDN
- Lenis smooth scroll via CDN
- Cormorant Garamond (Google Fonts)

## Design Direction
- Référence: wearebrand.io, igloo.inc
- Ambiance: cinématique, sombre, luxueux
- Couleurs: #0a0a0a bg, #f5f0e8 text
- Typographie: serif éditorial oversized
- PAS de couleurs génériques, PAS d'effets cheap

## Expérience scroll
- Position fixed sur toutes les scènes
- Scroll = narration cinématique
- scrub: 2 sur tous les ScrollTrigger
- Chaque transition = une seule animation fluide
- L'utilisateur doit sentir qu'il VIT une expérience

## 21st.dev
- Pour les composants UI premium, s'inspirer de 21st.dev
- Cursor effects, magnetic buttons, smooth reveals

## Règles absolues
- UN seul fichier HTML
- Aucun framework externe
- Toujours consulter le skill UI/UX avant de modifier
- Jamais d'animations cheap ou génériques
