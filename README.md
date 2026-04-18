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
│   ├── fonts/             # Poppins and Inter font files
│   └── images/            # static images organized by page/feature
├── components/
│   ├── business/          # feature-specific components (products, cart, about, etc.)
│   ├── forms/             # form components
│   ├── layouts/           # Header, Footer, AppDrawer
│   └── ui/                # reusable primitives and icon registry
├── layouts/               # page layout wrappers (DefaultLayout)
├── mixins/                # shared Vue mixins (pagination)
├── plugins/               # Vue plugins (axios, cart persistence)
├── router/                # Vue Router 3 config with guards and lazy-loaded routes
├── services/              # API call functions
├── store/                 # Vuex store with namespaced modules (products, cart, ui)
├── styles/
│   ├── abstracts/         # design tokens and mixins
│   ├── base/              # reset, typography, font declarations
│   ├── components/        # component-scoped styles
│   ├── layout/            # container, drawer, header, footer, page-layout
│   └── pages/             # page-level styles
├── types/                 # TypeScript type definitions
└── views/                 # route-level page components
tests/
└── unit/                  # Jest unit tests (one spec file per component)
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
- Jest + Vue Test Utils
- GitHub Actions (CI)

---

## Progress Log

### Week 3 — Routing & Testing

**Cart Store Enhancements**

- Added `shippingCost` state to the cart module with an initial value of `0`
- Extracted a `calculateSubtotal` helper function shared between getters
- Added `GET_SUBTOTAL_USD` and `GET_SHIPPING_COST` getters alongside the existing `GET_TOTAL_USD` which now computes subtotal + shipping

**Components**

- Updated `CartSummary` to consume the new getters and display shipping cost dynamically
- Added `data-test` attributes across `CartItem`, `CartList`, `CartSummary`, `AppBreadcrumb`, and `SortDropdown` to support testability

**Testing Setup**

- Configured `coveragePathIgnorePatterns` in `jest.config.js` to exclude the icon registry and assets from coverage reports, keeping the output focused on actual source logic

**Unit Tests**

- `ProductCard` — rendering, discount badge, new badge, and add-to-cart emit behavior
- `SortDropdown` — menu toggle, option rendering, active class, selection emit
- `CartSummary` — subtotal, shipping, and total display with varied decimal inputs and combined scenarios
- `CartList` — empty state, item count rendering, `removeFromCart` and `updateQuantity` mutations via child event stubs
- `CartItem` — title, quantity, total rendering, remove and quantity control emit payloads
- `AppButton` — modifier class, type attribute, disabled state
- `AppIcon` — correct icon resolution, fallback to `CloseIcon` for unknown names, size prop
- `StarRating` — full, empty, and partial fill logic via `getFill`
- `AppBreadcrumb` — nav visibility, link vs current span rendering, string and function breadcrumb label resolution

---

### Week 2 — Pages & Features

**Routing**

- Extended the router with nested routes, breadcrumb meta keys, and a navigation guard for the product details page

**State Management**

- Added `products`, `cart` and `ui` Vuex modules and a cart persistence plugin to keep cart state across page refreshes

**Components & Icons**

- Built out all UI primitives, business components, and expanded the icon registry to support the new pages

**Pages**

- Added a shared pagination mixin used across listing pages
- Implemented Home, Products, Product Details, and About pages with their own dedicated components and styles

### Week 2 Review — Refactors

- Extracted inline template logic into methods for better readability and testability
- Replaced inline and dynamic imports with static top-level imports throughout
- Fixed a product list duplication issue on page re-entry by resetting state on fresh fetches
- Improved the navigation guard to validate the route param before making any API call
- Cleaned up the codebase by removing unused comments and the leftover `HelloWorld` component

---

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

### Week 1 Review — Refactors

**SCSS folder restructure**

- Renamed `src/assets/scss/` → `src/styles/` and updated the import path in `main.ts` accordingly

**Shared drawer layout**

- Extracted a reusable `_drawer.scss` under `styles/layout/` defining `.drawer`, `.drawer-overlay`, and the `drawer-slide-right` / `drawer-overlay` Vue transition classes
- Both the cart sidebar and the mobile nav menu now share this base layout instead of duplicating fixed positioning, sizing, overflow, and transition logic
- Removed redundant `is-open` / `is-closed` CSS classes — `v-if` handles DOM presence so these were dead code

**Footer refactor**

- Replaced hardcoded navigation lists with `v-for` loops driven by `navColumns`, `appBadges`, and `socials` data arrays
- Moved support contact details (`address`, `email`, `phone`) into a `support` data object and bound them dynamically

---

## Configuration Reference

See [Vue CLI Configuration Reference](https://cli.vuejs.org/config/).
