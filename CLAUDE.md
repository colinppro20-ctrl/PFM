# CLAUDE.md — PRAY FOR ME (PFM)

## Projet
Site e-commerce mode avant-garde — **EN LIGNE et connecté à Shopify** (vraies commandes, vrai stock).
Site en ligne: https://prayforme2002.com/
Hébergement: Netlify — déploiement AUTOMATIQUE à chaque push sur `main` (push = mise en prod immédiate)
Repo GitHub: colinppro20-ctrl/PFM — https://github.com/colinppro20-ctrl/PFM (branche `main`)
Stack: vanilla HTML/CSS/JS — UN seul fichier par page, aucun framework, aucun build.

⚠️ Site en production : toute modif poussée sur `main` touche des clients réels.
Toujours tester localement (panier + checkout) avant de commit/push.

## Arborescence
- index.html — Landing (vidéo de fond + musique)
- collection.html — Grille produits + panier
- product.html — Fiche DRAMA TONGS (tailles 35→46)
- tote.html — Fiche MUGSHOT BAG (taille unique)
- terms.html — Terms + crédit musique
- privacy.html — Shipping policy (titre de page: "SHIPPING POLICY")
- images/ — tongs-recto.jpeg, tongs-verso.jpeg, BagwBG4.jpeg, totebag.jpeg, fond-plage.jpeg
- logos/ — logo-pfm-v2.svg, favicon.ico, logotypeeverlast.jpeg
- video/vids.mp4 — vidéo de fond accueil (compressée ~1.5 Mo, garder léger)
- audios/track.mp3 — musique de fond

## Shopify (Storefront API — Cart API)
- Boutique: `0irdnx-yq.myshopify.com`
- API: `https://0irdnx-yq.myshopify.com/api/2024-07/graphql.json`
- Header `X-Shopify-Storefront-Access-Token` (token Storefront public, en dur dans les pages)
- La logique panier est **dupliquée** dans collection.html, product.html et tote.html
  (bloc `LOGIQUE PANIER SHOPIFY`) → toute modif doit être reportée dans les 3 fichiers.
- Mutations: cartCreate, cartLinesAdd, cartLinesUpdate, cartLinesRemove ; query cart(id)
- ID du panier persistant en `localStorage['pfmCartId']` (partagé entre pages ; supprimé si expiré)
- Checkout: redirection vers `cart.checkoutUrl` (checkout hébergé par Shopify)
- Panier = tiroir latéral (`.cart-drawer`) + bouton "Cart (n)" dans le header
- Devise affichée: EUR

### Produits / variantes
| Produit | Page | Prix | Variantes |
|---|---|---|---|
| DRAMA TONGS | product.html | 55 EUR | tailles 35→46, map `size → gid://shopify/ProductVariant/57224130396540…57224130756988` |
| MUGSHOT BAG | tote.html | 35 EUR | `VARIANT_ID = gid://shopify/ProductVariant/57224135377276` |

- Rupture de taille: gérée **en dur** dans le HTML (`class="size sold-out" disabled`), actuellement taille 45.
  Le stock réel est dans Shopify : garder les deux synchronisés.
- Les prix affichés sont en dur dans le HTML (collection + fiches) : les mettre à jour si le prix change dans Shopify.

## Fonctionnalités
- **Timer de drop** (product.html, tote.html): bouton "Add to Cart" caché jusqu'au
  5 août 2026 19:00 Paris (`2026-08-05T19:00:00+02:00`). Bypass test: `?preview=angers`.
- **Musique**: bouton son sur toutes les pages, état "coupé" en `sessionStorage['pfmMusicStopped']`.
- **Menu overlay** avec horloge Paris (format `JJ/MM/AAAA HH:MM am PAR`).
- Collection: cartes flat → hover worn (crossfade), lien vers la fiche produit.
- Mention "All Sales Final" sur les fiches.

## Direction artistique
Références: Balenciaga 2017 + sicko.jp + Maison Margiela + enfant riche déprimé
Mood: brutal, minimaliste, anti-design, subversif, poétique

## Design System (état réel du code)
- Background: #ffffff — Text: #000000 — Accent: #ff0000 (rare, glitch/alerte)
- Fonts: Arial/Helvetica (texte) + Courier New (monospace, détails), uppercase, letter-spacing large (0.08–0.2em)
- ZERO gradient, ZERO shadow, ZERO border-radius
- Mobile soigné (vidéo, menu bas de page, recadrage photos) : toujours vérifier le rendu mobile

## Règles absolues
- JAMAIS dark background sur collection, fiches produit, terms, privacy
- JAMAIS border-radius
- JAMAIS couleurs autres que #000, #fff, #ff0000
- UN seul fichier HTML par page
- Ne jamais casser le flux panier → checkout Shopify ; reporter les changements panier dans les 3 pages
- Ne jamais mettre de token Admin API / secret dans le code (seul le token Storefront public est autorisé)
- Toujours lire ce CLAUDE.md avant toute modification
