# cv-framework

CV interactif de Kamil — Senior Frontend Engineer.
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · 4 dependances.

👉 **En production : https://cv.kamil.dev**

## Le principe : 100 % data-driven

Aucun contenu de CV n'est ecrit dans les composants. Tout vient de `data/*.json`,
qui est type par `types/cv.types.ts` et transforme en props par `app/page.tsx`.

```
data/*.json  ->  app/page.tsx  ->  components/cv/*  ->  composants d'UI (Liste, Paragraph, Title)
```

| Fichier | Contenu |
|---|---|
| `data/profile.json` | nom, titre, localisation, contact, liens, accroche |
| `data/skills.json` | 8 categories, rendu generiquement par `Object.entries` |
| `data/experiences.json` | 4 employeurs ; certains portent des `missions` (sous-experiences) |
| `data/previousExperiences.json` | experiences anterieures |
| `data/education.json` | formation |

**Modifier le CV = editer du JSON.** Aucun composant a toucher.

## Demarrer

```bash
nvm use          # lit .nvmrc
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build      # build de production
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

## Arborescence

```
app/
  layout.tsx        metadata SEO, polices Geist, icones
  globals.css       palette @theme, polices, styles print
  page.tsx          lit les JSON, assemble <CV />
  favicon.ico
components/
  cv/               Header, About, Skills, Experiences, PreviousExperiences, Education
    experiences/    Experience, ExperienceHeader, Mission, Stack
  ui/               Liste, Paragraph, Title (primitives maison)
data/               le contenu du CV
types/cv.types.ts   CVData, Experience, Mission, Education, Skills
public/
  assets/photo.jpg  portrait
  cv.png            favicon (151x151)
```

## Choix techniques

- **Rendu 100 % serveur.** `app/page.tsx` est un Server Component : aucun `useState`,
  aucun `fetch`, aucun client-side data layer. Le CV est du HTML statique, indexable
  et instantane. Les donnees sont importees directement (pas de route handler, pas de
  revalidation) — c'est le bon niveau de complexite pour un contenu versionne en JSON.
- **3 primitives d'UI maison** (`Liste`, `Paragraph`, `Title`) au lieu de shadcn/ui.
  Le CV n'a besoin que de trois balises ; 4 composants shadcn (370 lignes) et
  `lib/utils.ts` ont ete supprimes. `clsx` est la seule dependance de mise en forme.
- **Palette via `@theme`.** Le CV affiche une palette grise customize. Elle vivait
  dans `tailwind.config.js`, que Tailwind v4 ne charge pas sans directive `@config` :
  elle etait donc silencieusement ignoree. Les tokens sont desormais dans
  `app/globals.css`, ou ils s'appliquent reellement.
- **Styles print.** `@media print` retire le padding du conteneur et force
  l'impression des couleurs — le CV sort proprement sur papier.
- **Polices Geist** injectees par `next/font/google` sur `<html>` (et non `<body>`),
  car `--font-sans` doit se resoudre sur l'element racine.

## Projets voisins

Le depot a ete allegé : ce qui n'etait pas du CV a ete deplace.

| Demo | Ou elle est passee |
|---|---|
| Board kanban, React anti-pattern checklist, master/detail users, formulaire d'inscription | `../sprint-board` |
| API Fastify + Prisma (servait uniquement les demos `/users` et `/signup`) | `../fastify` |

## Points ouverts

- [ ] **Image Open Graph 1200x630 absente.** Le bloc `images` a ete retire de `layout.tsx`
      plutot que de pointer vers un fichier inexistant : les cartes de partage Twitter/LinkedIn
      s'affichent donc sans vignette. Generer l'image et rejouer l'ajout.
- [ ] `data/profile.json` porte un champ `subtitle` que `Header.tsx` ne lit pas.
- [ ] Aucun test. Le contenu est statique, donc le vrai risque est une typo dans un JSON :
      un test de non-nullite sur les cloisons de `data/*.json` couvrirait le coup.
