<a name="top"></a>

# Saqaya E-commerce App

A Vue 3 e-commerce application built as part of the Saqaya internship program.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Branching Strategy](#branching-strategy)
- [Commit Convention](#commit-convention)
- [Tech Stack](#tech-stack)
- [Component Documentation](#component-documentation)
  - [UI Primitives](#ui-primitives)
    - [AppButton](#appbutton)
    - [AppIcon](#appicon)
    - [AppInput](#appinput)
    - [AppSkeleton](#appskeleton)
    - [AppError](#apperror)
    - [AsyncList](#asynclist)
    - [AppBreadcrumb](#appbreadcrumb)
    - [SearchInput](#searchinput)
    - [SortDropdown](#sortdropdown)
    - [StarRating](#starrating)
    - [HeroBanner](#herobanner)
    - [SectionHeader](#sectionheader)
  - [Business Components](#business-components)
    - [ProductCard](#productcard)
    - [ProductsGrid](#productsgrid)
    - [ProductGallery](#productgallery)
    - [ProductInfo](#productinfo)
    - [CartItem](#cartitem)
    - [CartList](#cartlist)
    - [CartSummary](#cartsummary)
- [Composables](#composables)
  - [usePagination](#usepagination)
  - [useDebounce](#usedebounce)
- [Progress Log](#progress-log)

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

[↑ Back to top](#top)

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
├── composables/           # usePagination composable (replaces mixins/)
├── layouts/               # page layout wrappers (DefaultLayout)
├── plugins/               # Vue plugins (axios, cart persistence)
├── router/                # Vue Router 4 config with guards and lazy-loaded routes
├── services/              # API call functions
├── store/                 # flat Pinia stores (cart.ts, products.ts, ui.ts)
│   └── index.ts           # createPinia() + re-exports
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

[↑ Back to top](#top)

---

## Branching Strategy

| Branch      | Purpose                                     |
| ----------- | ------------------------------------------- |
| `main`      | Production-ready, reviewer-approved code    |
| `develop`   | Integration branch — all PRs target here    |
| `feature/*` | Individual features branched from `develop` |

Weekly PRs from `develop` → `main` are reviewed and approved by the company mentor.

[↑ Back to top](#top)

---

## Commit Convention

Follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — tooling, config, formatting
- `deps:` — dependency changes

[↑ Back to top](#top)

---

## Tech Stack

- Vue 3 + Vue CLI
- TypeScript
- Vue Router 4
- Pinia
- SCSS (7-1 inspired architecture)
- ESLint + Prettier
- Jest + Vue Test Utils v2
- GitHub Actions (CI)

[↑ Back to top](#top)

---

## Component Documentation

The components below are the core reusable building blocks of the app. Each entry covers its purpose, props, events, slots, and usage.

---

### UI Primitives

<details>
<summary><strong>AppButton</strong></summary>

**Purpose**
A single button primitive that covers every interactive action in the app. All buttons should go through this component — never use a raw `<button>` in a page or business component.

**Props**

| Prop       | Type                               | Default     | Required | Description                                     |
| ---------- | ---------------------------------- | ----------- | -------- | ----------------------------------------------- |
| `modifier` | `'primary' \| 'outline' \| 'dark'` | `'primary'` | No       | Controls the visual style of the button         |
| `type`     | `'button' \| 'submit' \| 'reset'`  | `'button'`  | No       | Maps directly to the HTML `type` attribute      |
| `disabled` | `boolean`                          | `false`     | No       | Disables the button and applies disabled styles |

**Slots**

| Slot      | Description             |
| --------- | ----------------------- |
| `default` | Button label or content |

**Usage**

```vue
<!-- Primary action -->
<app-button modifier="primary" @click="handleSubmit">Place Order</app-button>

<!-- Destructive / secondary -->
<app-button modifier="outline" @click="cancel">Cancel</app-button>

<!-- Inside a form -->
<app-button type="submit" modifier="primary">Send Message</app-button>

<!-- Loading state -->
<app-button :disabled="isLoading">
  {{ isLoading ? 'Loading...' : 'Load More' }}
</app-button>
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>AppIcon</strong></summary>

**Purpose**
A single entry point for rendering any SVG icon in the app. It resolves icon names to their Vue components via the typed icon registry in `src/components/ui/icons/index.ts`. Falls back to `CloseIcon` for unknown names.

**Props**

| Prop   | Type       | Default | Required | Description                                                |
| ------ | ---------- | ------- | -------- | ---------------------------------------------------------- |
| `name` | `IconName` | —       | Yes      | The icon identifier. Must be a key of the `icons` registry |
| `size` | `number`   | `24`    | No       | Sets both `width` and `height` on the SVG in pixels        |

**Available icon names**

`search`, `cart`, `facebook`, `twitter`, `instagram`, `linkedin`, `burger`, `close`, `send`, `phone`, `mail`, `heart`, `view`, `star`, `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`, `beauty`, `fragrances`, `furniture`, `home-decoration`, `mobile-accessories`, `delivery`, `shield`, `headphone`, `plus`, `minus`, `return`, `shop`, `sale`, `shopping-bag`, `money-bag`

**Usage**

```vue
<app-icon name="cart" />
<app-icon name="arrow-right" :size="16" />
<app-icon name="delivery" :size="40" />
```

**Adding a new icon**

1. Create the SVG component in `src/components/ui/icons/YourIcon.vue`
2. Import and register it in `src/components/ui/icons/index.ts`
3. `IconName` updates automatically via `keyof typeof icons`

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>AppInput</strong></summary>

**Purpose**
A controlled input primitive that supports both single-line text inputs and multi-line textareas through a single component. Implements `v-model` via the `modelValue` / `update:modelValue` pattern.

**Props**

| Prop          | Type      | Default  | Required | Description                                                         |
| ------------- | --------- | -------- | -------- | ------------------------------------------------------------------- |
| `modelValue`  | `string`  | —        | Yes      | The current value — bind with `v-model`                             |
| `type`        | `string`  | `'text'` | No       | HTML input type. Pass `'textarea'` to render a `<textarea>` instead |
| `placeholder` | `string`  | `''`     | No       | Placeholder text shown when the field is empty                      |
| `required`    | `boolean` | `false`  | No       | Maps to the HTML `required` attribute for native form validation    |

**Events**

| Event               | Payload  | Description                                                     |
| ------------------- | -------- | --------------------------------------------------------------- |
| `update:modelValue` | `string` | Emitted on every keystroke. Use `v-model` to bind automatically |

**Usage**

```vue
<!-- Text input -->
<app-input v-model="email" type="email" placeholder="Your Email *" required />

<!-- Textarea -->
<app-input v-model="message" type="textarea" placeholder="Your Message" />
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>AppSkeleton</strong></summary>

**Purpose**
A loading placeholder that occupies space while async content is being fetched. Used by `AsyncList` to signal loading state. Styled with a shimmer animation via `_app-skeleton.scss`.

**Props**
None.

**Usage**

```vue
<app-skeleton v-if="isLoading" />
```

> In most cases you won't use `AppSkeleton` directly — use `AsyncList` instead, which handles the loading/error/empty/content states together.

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>AppError</strong></summary>

**Purpose**
Displays an error message with a "Try again" button. Used by `AsyncList` to handle failed API requests. Emits a `retry` event so the parent can re-trigger the fetch.

**Props**

| Prop      | Type     | Default                                     | Required | Description                      |
| --------- | -------- | ------------------------------------------- | -------- | -------------------------------- |
| `message` | `string` | `'Something went wrong. Please try again.'` | No       | The error text shown to the user |

**Events**

| Event   | Payload | Description                              |
| ------- | ------- | ---------------------------------------- |
| `retry` | —       | Emitted when the user clicks "Try again" |

**Usage**

```vue
<app-error message="Failed to load products." @retry="fetchProducts" />
```

> In most cases you won't use `AppError` directly — use `AsyncList` instead.

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>AsyncList</strong></summary>

**Purpose**
A wrapper that consolidates the four states of any async list — loading, error, empty, and populated — into a single declarative component. Eliminates repetitive `v-if` chains across listing components.

**Props**

| Prop           | Type             | Default             | Required | Description                                                 |
| -------------- | ---------------- | ------------------- | -------- | ----------------------------------------------------------- |
| `isLoading`    | `boolean`        | —                   | Yes      | Shows `AppSkeleton` when `true`                             |
| `error`        | `string \| null` | —                   | Yes      | Shows `AppError` with this message when non-null            |
| `isEmpty`      | `boolean`        | —                   | Yes      | Shows the empty message when `true` and not loading/errored |
| `emptyMessage` | `string`         | `'Nothing to show'` | No       | Text shown in the empty state                               |

**Events**

| Event   | Payload | Description                                               |
| ------- | ------- | --------------------------------------------------------- |
| `retry` | —       | Forwarded from `AppError` — re-trigger the parent's fetch |

**Slots**

| Slot      | Description                               |
| --------- | ----------------------------------------- |
| `default` | The content rendered in the success state |

**State priority**

`isLoading` → `error` → `isEmpty` → `default slot`

**Usage**

```vue
<async-list
  :is-loading="isLoading"
  :error="error"
  :is-empty="!products.length"
  empty-message="No products found."
  @retry="fetchProducts"
>
  <div class="products-grid">
    <product-card v-for="p in products" :key="p.id" :product="p" />
  </div>
</async-list>
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>AppBreadcrumb</strong></summary>

**Purpose**
Reads the current route's matched segments and renders a breadcrumb trail automatically. Breadcrumb labels are defined in route `meta.breadcrumb` — either as a static string or as a resolver function `(store) => string`. Renders nothing on routes with no breadcrumb meta.

**Configuration**

Breadcrumbs are declared in `src/router/index.ts` on each route's `meta` object:

```ts
// Static label
{ path: 'about', meta: { breadcrumb: 'About' } }

// Dynamic label resolved from the products store
{
  path: ':id',
  meta: {
    breadcrumb: (store: ReturnType<typeof useProductsStore>) =>
      store.selectedProductTitle
  }
}
```

**Props**
None — reads directly from `useRoute()` and `useProductsStore()`.

**Rendered output**

- Each non-last crumb renders as a `<router-link>` with `data-test="crumb-link"`
- The last crumb renders as a `<span>` with `data-test="crumb-current"`
- The entire `<nav>` is hidden when there are no breadcrumb routes matched

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>SearchInput</strong></summary>

**Purpose**
A search field with a live results dropdown. Renders a list of matching products (thumbnail, title, price) as the user types. The component is purely presentational — it receives results and search state as props and emits user interactions upward. In `TheHeader`, it is paired with `useDebounce` and the `searchProducts` API call to drive the actual search logic.

**Props**

| Prop          | Type        | Default | Required | Description                                                                                                     |
| ------------- | ----------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `modelValue`  | `string`    | —       | Yes      | The current query string — bind with `v-model`                                                                  |
| `results`     | `Product[]` | —       | Yes      | The list of products to show in the dropdown                                                                    |
| `isSearching` | `boolean`   | —       | Yes      | When `true` and `modelValue` is non-empty, suppresses the "No results found" message while a fetch is in flight |

**Events**

| Event               | Payload             | Description                                                                     |
| ------------------- | ------------------- | ------------------------------------------------------------------------------- |
| `update:modelValue` | `string`            | Emitted on every keystroke. Use `v-model` to bind                               |
| `select`            | `productId: number` | Emitted when the user clicks a result. The parent is responsible for navigation |

**Behavior**

- The dropdown is only visible when `modelValue` is non-empty
- Shows the results list when `results.length > 0`
- Shows "No results found" when `results` is empty and `isSearching` is `false`
- Shows nothing (no empty message) while `isSearching` is `true` — prevents a flash of "No results" during the debounce window

**Usage**

```vue
<search-input
  v-model="searchQuery"
  :results="searchResults"
  :is-searching="isSearching"
  @select="navigateToProduct"
/>
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>SortDropdown</strong></summary>

**Purpose**
A controlled dropdown for selecting a sort option. Emits the full option object (not just its value) so the parent gets `sortBy` and `order` in a single event. Implements `v-model` via `modelValue` / `update:modelValue`.

**Props**

| Prop         | Type           | Default | Required | Description                                         |
| ------------ | -------------- | ------- | -------- | --------------------------------------------------- |
| `modelValue` | `SortOption`   | —       | Yes      | The currently selected option — bind with `v-model` |
| `options`    | `SortOption[]` | —       | Yes      | The list of available options to display            |

**`SortOption` shape**

```ts
interface SortOption {
  label: string // Display text shown in the trigger and list
  value: string // Unique identifier for active class comparison
  sortBy: string // API param — the field to sort by
  order: string // API param — 'asc' or 'desc'
}
```

**Events**

| Event               | Payload      | Description                                                       |
| ------------------- | ------------ | ----------------------------------------------------------------- |
| `update:modelValue` | `SortOption` | Emitted when an option is selected. Closes the menu automatically |

**Usage**

```vue
<sort-dropdown
  v-model="selectedSort"
  :options="sortOptions"
  @update:modelValue="resetAndLoad"
/>
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>StarRating</strong></summary>

**Purpose**
Renders a 5-star rating display with support for fractional ratings. Each star clips its filled layer based on the decimal portion of the rating using the `getFill(index)` method.

**Props**

| Prop     | Type     | Default | Required | Description                                                          |
| -------- | -------- | ------- | -------- | -------------------------------------------------------------------- |
| `rating` | `number` | —       | Yes      | The rating value between `0` and `5`. Supports decimals (e.g. `4.3`) |
| `size`   | `number` | `24`    | No       | Passed to `AppIcon` — controls the star size in pixels               |

**Usage**

```vue
<star-rating :rating="product.rating" />
<star-rating :rating="product.rating" :size="20" />
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>HeroBanner</strong></summary>

**Purpose**
An auto-advancing carousel that displays promotional slides. Advances every 5 seconds and resets the timer when the user manually navigates to a slide. Cleans up the interval on unmount.

**Props**

| Prop     | Type            | Default | Required | Description                    |
| -------- | --------------- | ------- | -------- | ------------------------------ |
| `slides` | `BannerSlide[]` | —       | Yes      | Array of slide data to display |

**`BannerSlide` shape**

```ts
interface BannerSlide {
  brandIcon: string // Path to brand logo image
  brandName: string // Alt text and brand label
  title: string // Headline text
  image: string // Path to the hero image
}
```

**Usage**

```vue
<hero-banner :slides="slides" />
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>SectionHeader</strong></summary>

**Purpose**
A consistent section header used across every listing section. Optionally renders prev/next navigation arrows when `hasPrev` or `hasNext` are provided — used alongside `usePagination` in `FlashSale`, `BrowseCategory`, and `ExploreProducts`.

**Props**

| Prop      | Type      | Default     | Required | Description                                                                                                                |
| --------- | --------- | ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `label`   | `string`  | —           | No       | Small label above the title (e.g. `'Today's'`)                                                                             |
| `title`   | `string`  | —           | No       | The main section heading                                                                                                   |
| `hasPrev` | `boolean` | `undefined` | No       | Enables the left arrow button when `true`. Arrows are hidden entirely unless **both** `hasPrev` and `hasNext` are provided |
| `hasNext` | `boolean` | `undefined` | No       | Enables the right arrow button when `true`                                                                                 |

**Events**

| Event  | Payload | Description                             |
| ------ | ------- | --------------------------------------- |
| `prev` | —       | Emitted when the left arrow is clicked  |
| `next` | —       | Emitted when the right arrow is clicked |

**Usage**

```vue
<!-- Without navigation -->
<section-header title="Explore Our Products" />

<!-- With navigation (paired with usePagination) -->
<section-header
  label="Today's"
  title="Flash Sales"
  :hasPrev="hasPrev"
  :hasNext="hasNext"
  @prev="prev"
  @next="next"
/>
```

[↑ Back to top](#top)

</details>

---

### Business Components

<details>
<summary><strong>ProductCard</strong></summary>

**Purpose**
Displays a single product in a grid or list context. Handles discount badge, new badge, price formatting, original price calculation, review count, and the add-to-cart action. Navigates to the product details page on title or image click.

**Props**

| Prop      | Type      | Default | Required | Description                          |
| --------- | --------- | ------- | -------- | ------------------------------------ |
| `product` | `Product` | —       | Yes      | The full product object from the API |

**Events**

| Event         | Payload   | Description                                                                                                   |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| `add-to-cart` | `Product` | Emitted when the "Add to cart" button is clicked. The parent is responsible for calling `cartStore.addToCart` |

**Computed internals**

- **`isProductNew`** — `true` when `product.meta.createdAt` is within the last 7 days and not in the future
- **`originalPrice`** — derived from `price / (1 - discountPercentage / 100)`

**Badge visibility rules**

| Badge          | Condition                                |
| -------------- | ---------------------------------------- |
| Discount badge | `discountPercentage > 0` AND `price > 0` |
| New badge      | `createdAt` is between 0 and 7 days ago  |
| Both badges    | Both conditions true simultaneously      |

**Usage**

```vue
<product-card
  v-for="product in products"
  :key="product.id"
  :product="product"
  @add-to-cart="cartStore.addToCart($event, 1)"
/>
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>ProductsGrid</strong></summary>

**Purpose**
Renders a responsive grid of `ProductCard` components wrapped in `AsyncList`. Manages the "Load More" button, forwarding the action to the parent rather than fetching directly.

**Props**

| Prop          | Type             | Default | Required | Description                                                       |
| ------------- | ---------------- | ------- | -------- | ----------------------------------------------------------------- |
| `products`    | `Product[]`      | —       | Yes      | The current visible slice of products to render                   |
| `canLoadMore` | `boolean`        | —       | Yes      | Shows the "Load More" button when `true`                          |
| `isLoading`   | `boolean`        | —       | Yes      | Passed to `AsyncList` and used to disable the button during fetch |
| `error`       | `string \| null` | —       | Yes      | Passed to `AsyncList` — only shown when `products` is also empty  |

**Events**

| Event       | Payload | Description                             |
| ----------- | ------- | --------------------------------------- |
| `load-more` | —       | Emitted when "Load More" is clicked     |
| `retry`     | —       | Forwarded from `AsyncList`'s `AppError` |

**Usage**

```vue
<products-grid
  :products="visibleProducts"
  :can-load-more="canLoadMore"
  :is-loading="isLoading"
  :error="error"
  @load-more="loadMore"
  @retry="resetAndLoad"
/>
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>ProductGallery</strong></summary>

**Purpose**
Renders a 4-thumbnail + main image gallery for the product details page. If the API returns fewer than 4 images, it cycles through the available images to always fill all 4 thumbnail slots.

**Props**

| Prop     | Type       | Default | Required | Description                          |
| -------- | ---------- | ------- | -------- | ------------------------------------ |
| `images` | `string[]` | —       | Yes      | Array of image URLs from the product |
| `alt`    | `string`   | —       | Yes      | Alt text for the main image          |

**Usage**

```vue
<product-gallery :images="product.images" :alt="product.title" />
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>ProductInfo</strong></summary>

**Purpose**
The right panel on the product details page. Displays title, rating, stock status, price, discount, description, category link, and a quantity stepper. Adds to cart directly via `useCartStore` on "Buy Now".

**Props**

| Prop      | Type      | Default | Required | Description             |
| --------- | --------- | ------- | -------- | ----------------------- |
| `product` | `Product` | —       | Yes      | The full product object |

**Internal state**

- `quantity` — local `ref(1)`, clamped between `1` and `product.stock` by the stepper buttons

**Usage**

```vue
<product-info :product="selectedProduct" />
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>CartItem</strong></summary>

**Purpose**
Renders a single row in the cart — thumbnail, title, quantity controls, and line total. Does not mutate the store directly; all interactions are emitted upward to `CartList`.

**Props**

| Prop       | Type       | Default | Required | Description                                       |
| ---------- | ---------- | ------- | -------- | ------------------------------------------------- |
| `cartItem` | `CartItem` | —       | Yes      | The cart item containing `product` and `quantity` |

**Events**

| Event             | Payload                            | Description                                                                                             |
| ----------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `remove`          | `productId: number`                | Emitted when the remove button is clicked                                                               |
| `update-quantity` | `{ id: number, quantity: number }` | Emitted on increment or decrement. Does not guard against `quantity < 1` — that's handled in `CartList` |

**Usage**

```vue
<cart-item
  :cartItem="item"
  @remove="cartStore.removeFromCart"
  @update-quantity="updateQuantity"
/>
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>CartList</strong></summary>

**Purpose**
Renders the full list of cart items using `CartItem`. Reads `cartStore.cartItems` directly. Handles the `update-quantity` edge case: when quantity drops below `1`, it calls `removeFromCart` instead of `updateQuantity`.

**Props**
None — reads from `useCartStore()` directly.

**Usage**

```vue
<cart-list />
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>CartSummary</strong></summary>

**Purpose**
Displays the cart totals (subtotal, shipping, total), payment method selection, coupon code input, and the "Place Order" button. Reads from `useCartStore()` getters. Shipping displays as "Free" when `shippingCost === 0`.

**Props**
None — reads from `useCartStore()` directly.

**Usage**

```vue
<cart-summary />
```

[↑ Back to top](#top)

</details>

---

## Composables

<details>
<summary><strong>usePagination</strong></summary>

**Purpose**
A generic composable that paginates any reactive array by slicing it client-side. Used by `FlashSale`, `BrowseCategory`, `ExploreProducts`, and `TeamSection`.

**Signature**

```ts
function usePagination<T>(
  items: Ref<T[]>,
  itemsPerPage: number
): {
  currentPage: Ref<number>
  totalPages: ComputedRef<number>
  hasPrev: ComputedRef<boolean>
  hasNext: ComputedRef<boolean>
  paginatedItems: ComputedRef<T[]>
  prev: () => void
  next: () => void
}
```

**Parameters**

| Param          | Type       | Description                                                                   |
| -------------- | ---------- | ----------------------------------------------------------------------------- |
| `items`        | `Ref<T[]>` | A reactive array to paginate. Must be a `ref` or `computed` — not a raw array |
| `itemsPerPage` | `number`   | How many items to show per page                                               |

**Usage**

```ts
const itemsPerPage = 4
const items = computed(() => props.products)
const { hasPrev, hasNext, paginatedItems, prev, next } = usePagination(
  items,
  itemsPerPage
)
```

```vue
<section-header
  :hasPrev="hasPrev"
  :hasNext="hasNext"
  @prev="prev"
  @next="next"
/>
<product-card
  v-for="product in paginatedItems"
  :key="product.id"
  :product="product"
/>
```

[↑ Back to top](#top)

</details>

---

<details>
<summary><strong>useDebounce</strong></summary>

**Purpose**
A generic composable that returns a debounced copy of any reactive ref. The returned ref only updates after the source ref has been stable for the specified delay in milliseconds. Used in `TheHeader` to delay search API calls until the user stops typing.

**Signature**

```ts
function useDebounce<T>(source: Ref<T>, delay: number): Ref<T>
```

**Parameters**

| Param    | Type     | Description                                                                 |
| -------- | -------- | --------------------------------------------------------------------------- |
| `source` | `Ref<T>` | The reactive value to debounce                                              |
| `delay`  | `number` | Milliseconds to wait after the last change before updating the returned ref |

**Usage**

```ts
const searchQuery = ref("")
const debouncedQuery = useDebounce(searchQuery, 500)

// Watch the debounced ref — fires at most once per 500ms
watch(debouncedQuery, async (query) => {
  if (!query.trim()) return
  const data = await searchProducts({ query, limit: 5 })
  searchResults.value = data.products
})
```

[↑ Back to top](#top)

</details>

[↑ Back to top](#top)

---

## Progress Log

### Week 4 — Migration + Documentation + Polishing

**Vue 3 Migration**

- Installed `@vue/compat` as a compatibility bridge to surface Vue 2 patterns as warnings before removing them entirely
- Updated transition class names from `.slide-enter` to `.slide-enter-from` following Vue 3's renamed hooks
- Migrated `main.ts` from `new Vue()` to `createApp()` and upgraded Vue Router 3 → 4 and Vuex 3 → 4
- Fixed all Vue 3 runtime warnings — removed `@click.native`, migrated `AppInput` and `SortDropdown` to the new `v-model` convention (`modelValue` + `update:modelValue`)
- Removed `@vue/compat` and switched to pure Vue 3

**Pinia Migration**

- Replaced Vuex with Pinia — no more mutations, namespaced modules, or string-based dispatch calls
- Adopted flat single-file store structure (`cart.ts`, `products.ts`, `ui.ts`) following the official Pinia docs recommendation
- Stores are imported and called directly in components via `useCartStore()`, `useProductsStore()`, `useUiStore()`

**Composition API**

- Migrated all 40+ components from Options API to `<script setup>`
- Converted the `paginationMixin` to a `usePagination<T>` composable — mixins are deprecated in Vue 3
- Replaced `$store`, `$route`, and `$router` globals with `useCartStore()`, `useRoute()`, and `useRouter()` direct imports
- Refactored API functions and store actions to accept params objects instead of individual arguments

**Testing**

- Upgraded Vue Test Utils v1 → v2 and `@vue/vue2-jest` → `@vue/vue3-jest`
- Migrated all 9 test suites — key changes: `propsData` → `props`, global options moved under `global`, store mocking via `jest.mock` on Pinia store modules instead of `$store` global mock, `RouterLink` stub updated to render slot content
- Added `coverageProvider: "v8"` to `jest.config.js` for accurate coverage reporting on Vue SFCs

---

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

[↑ Back to top](#top)
