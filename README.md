# Saqaya E-commerce App

A Vue 2 e-commerce application built as part of the Saqaya internship program.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

### Run unit tests

```bash
npm run test:unit
```

### Lint and fix files

```bash
npm run lint
```

---

## Project Structure

```
src/
├── assets/
│   ├── images/            # static assets (footer badges, QR code)
│   └── scss/
│       ├── abstracts/     # design tokens (_variables.scss) and mixins
│       ├── base/          # reset, typography, font declarations
│       ├── layout/        # container and page-layout utilities
│       └── components/    # component-scoped styles
├── components/
│   ├── icons/             # SVG icon registry with typed IconName
│   └── layouts/           # Header and Footer components
├── layouts/               # page layout wrappers (DefaultLayout)
├── views/                 # route-level page components
├── router/                # Vue Router 3 config with lazy-loaded routes
└── store/                 # Vuex store
```

---

## Branching Strategy

| Branch      | Purpose                                     |
| ----------- | ------------------------------------------- |
| `main`      | Production-ready, reviewer-approved code    |
| `develop`   | Integration branch — all PRs target here    |
| `feature/*` | Individual features branched from `develop` |

Weekly PRs from `develop` → `main` are reviewed and approved by the company mentor.

---

## Commit Convention

Follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — tooling, config, formatting
- `deps:` — dependency changes

---

## Tech Stack

- Vue 2 + Vue CLI
- TypeScript
- Vue Router 3
- Vuex 3
- SCSS (7-1 inspired architecture)
- ESLint + Prettier
- GitHub Actions (CI)

---

## Progress Log

### Week 1 — Project Foundation

**Tooling & CI**

- Initialized project with Vue CLI (Vue 2 + TypeScript + ESLint + Prettier)
- Added Prettier config and synced it with ESLint to avoid conflicts
- Set up GitHub Actions CI pipeline running lint and unit tests on push and PR to `develop` and `main`
- Added PR template to standardize contribution format

**Routing**

- Configured Vue Router 3 with named routes and lazy-loaded page components
- Set up nested routing under `DefaultLayout` — all pages are children of the layout route
- Scaffolded 6 views: Home, About, Contact, Products, Product Details, Not Found (wildcard)
- Removed multi-word component name warnings to satisfy ESLint rules

**Design System**

- Added SASS and sass-loader dependencies
- Built SCSS architecture with `abstracts/`, `base/`, `layout/`, and `components/` layers
- Defined full design token set in `_variables.scss`: colors, typography scale, spacing, breakpoints, shadows, transitions
- Added utility mixins: `respond-to`, `flex-center`, `flex-between`, `truncate`
- Added `_container.scss` (max-width wrapper) and `_page-layout.scss` (full-height flex layout) under a new `layout/` layer
- Integrated custom fonts: Poppins (body) and Inter (headings) with proper `@font-face` declarations

**Icon System**

- Built a typed icon registry using `as const` + `keyof typeof` pattern for clean TypeScript inference
- Registered 9 icons: search, cart, burger, close, send, facebook, twitter, instagram, linkedin
- Created `AppIcon.vue` as a single entry point for rendering any icon by name

**Header Component**

- Desktop navigation with active route underline indicator using `router-link-exact-active`
- Search form with `v-model` binding
- Mobile responsive full-screen overlay drawer with burger/close toggle
- Responsive breakpoints using the `respond-to` mixin

**Footer Component**

- Responsive 5-column grid layout (collapses to 3 → 2 → 1 across breakpoints)
- Email subscribe form with `v-model` binding
- Support column with address, email, and phone using semantic `<address>` tag
- Navigation columns: Account links and Quick Links
- App download section with QR code and Google Play / App Store badges
- Social icons row using the icon registry
- Copyright bar with a subtle top border separator

---

## Configuration Reference

See [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).
