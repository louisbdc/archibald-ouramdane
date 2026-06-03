# Archibald Ouramdane — Landing page

Landing page pour **Archibald Ouramdane**, thérapeute manuel des fascias à Marseille.
Accompagnement doux contre le stress, les douleurs chroniques et les troubles du sommeil,
avec réservation en ligne.

Reproduction fidèle d'une maquette HTML/CSS/JS, réécrite en **Astro + React**.

## Stack

- **[Astro](https://astro.build)** 6 — génération du site statique
- **[React](https://react.dev)** 19 — île interactive (widget de réservation)
- CSS « maison » (variables, palette naturelle, polices Newsreader + Manrope)

Le site est **entièrement statique** : le widget de réservation est une île React
hydratée côté client (`client:load`), il n'y a donc aucun rendu serveur.

## Structure

```
src/
├── layouts/
│   └── Layout.astro          # <head>, polices, CSS global
├── pages/
│   └── index.astro           # assemble toutes les sections
├── components/
│   ├── Header.astro          # en-tête fixe
│   ├── Hero.astro            # hero plein écran + widget
│   ├── BookingWidget.tsx     # île React : réservation + toast
│   ├── TrustStrip.astro      # bandeau de réassurance
│   ├── Empathy.astro         # accroche éditoriale
│   ├── FasciaExplainer.astro # explication des fascias
│   ├── PourQui.astro         # grille des situations
│   ├── Steps.astro           # déroulé d'une séance (galerie)
│   ├── About.astro           # présentation + tarifs
│   ├── Reviews.astro         # avis Google
│   ├── CtaFinal.astro        # appel à l'action plein cadre
│   ├── Contact.astro         # coordonnées + carte
│   ├── Footer.astro          # pied de page
│   └── StickyBar.astro       # barre de réservation mobile
├── scripts/
│   └── interactions.ts       # header sticky, reveal au scroll, scroll-to-book
└── styles/
    └── global.css            # design system + responsive
```

## Développement

```bash
npm install
npm run dev      # serveur de dev → http://localhost:4321
```

| Commande          | Action                                      |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Démarre le serveur de développement (HMR)   |
| `npm run build`   | Génère le site statique dans `dist/`        |
| `npm run preview` | Sert le build de production en local        |

Node ≥ 22 recommandé.

## Déploiement — Cloudflare Pages

Le site étant statique, aucun adaptateur n'est nécessaire. Dans le dashboard
**Cloudflare Pages**, connecte le repo GitHub puis renseigne :

| Réglage                    | Valeur          |
| -------------------------- | --------------- |
| Framework preset           | `Astro`         |
| Build command              | `npm run build` |
| Build output directory     | `dist`          |
| Variable `NODE_VERSION`    | `22`            |

Chaque push sur `main` déclenchera alors un redéploiement automatique.
