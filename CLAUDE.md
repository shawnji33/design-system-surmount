# Surmount Design System — CLAUDE.md

## 1. Stack

- **Framework**: Next.js 15 (App Router) + React 18
- **Styling**: Tailwind CSS **v4** — CSS-first config via `@theme` in `app/theme.css`; no `tailwind.config.ts`. Tokens fed via CSS custom properties from `tokens/tokens.css`.
- **Components**: **shadcn/ui (Radix primitives)** in `components/ui/`, configured by `components.json` (style `new-york`, lucide icons). Migrated from `react-aria-components` on 2026-06-10 — the old react-aria set is preserved on branch `backup/react-aria-pre-shadcn`.
- **Theming bridge**: `tokens/shadcn-bridge.css` maps shadcn's semantic token names (`--background`, `--primary`, `--card`, …) onto the canonical Surmount `--color-*` tokens. See `tokens/shadcn-bridge.md` for the full map. **Do not let `shadcn add` re-inject its own raw token blocks into `app/globals.css`** — the bridge is canonical.
- **Language**: TypeScript 5
- **Component variants**: `class-variance-authority` (`cva`) + `clsx` + `tailwind-merge` (via `cn` helper in `lib/utils.ts`)
- **Stories**: Storybook 8 with `@storybook/react-vite`. Deployed to GitHub Pages via CI on push to `main`.
- **Package manager**: npm (lockfile committed)

---

## 2. Folder Conventions

```
/
├── tokens/
│   ├── source/          # Raw Figma exports — DO NOT EDIT
│   ├── tokens.css       # Generated CSS custom properties — DO NOT hand-edit
│   └── foundations.md   # Human-readable token audit
├── components/
│   └── ui/              # UI primitives — one .tsx + one .stories.tsx per component
├── lib/
│   └── utils.ts         # `cn()` helper (clsx + tailwind-merge)
├── .storybook/
│   ├── main.ts          # Storybook config
│   └── preview.ts       # Tokens import + theme decorator
├── tailwind.config.ts   # Token → utility class wiring
└── CLAUDE.md
```

- `tokens/source/` holds raw JSON exported from Figma. Never edit these files manually.
- `tokens/tokens.css` is generated from source. Do not hand-edit.
- `components/ui/` holds the shadcn/ui primitives plus a few Surmount-specific ones (`accounts-section.tsx`, `portfolio-switcher.tsx`, the composed `date-picker.tsx`). shadcn components ship without stories.
- A consolidated gallery lives in `components/ui/showcase.stories.tsx` (title `Overview/Components`) — one story per category renders every component. Prefer extending this over adding 60 single-component story files.
- Add new shadcn components with `npx shadcn@latest add <name>` (don't hand-author). After adding, confirm it didn't append raw token blocks to `app/globals.css`.

---

## 3. Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Files | kebab-case | `button.tsx`, `text-input.tsx` |
| Components | PascalCase | `Button`, `TextInput`, `DatePicker` |
| Props — variant | `variant` (not `kind`) | `variant="primary"` |
| Props — size | `size` (not `sz`, not `scale`) | `size="sm"` |
| Props — error | `invalid` + `errorText` | `<TextInput invalid errorText="…">` |
| CSS custom properties | kebab-case, no namespace prefix | `--color-bg-primary` |

---

## 4. Token Naming Rule

Figma token keys are transformed to CSS custom properties by:

1. Stripping leading category segments (e.g. `colorsBackground`, `colorsForeground`, `colorsText`, `colorsBorder`)
2. Converting the remainder from camelCase to kebab-case
3. Prefixing with `--`

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `colorsBackgroundBgPrimary` | `--color-bg-primary` | `bg-bg-primary` |
| `colorsForegroundFgPrimary900` | `--color-fg-primary-900` | `text-fg-primary-900`, `bg-fg-primary-900` |
| `colorsTextTextErrorPrimary600` | `--color-text-error-primary-600` | `text-text-error-primary-600` |
| `colorsBorderBorderError` | `--color-border-error` | `border-border-error` |

**Dark mode**: set `data-theme="dark"` on `<html>` (or any container). Tokens auto-flip via the `[data-theme="dark"]` selector in `tokens/tokens.css`. The `@custom-variant dark` in `app/globals.css` matches **both** `[data-theme="dark"]` and shadcn's `.dark` class, so react-aria tokens and shadcn `dark:` utilities stay in sync.

---

## 5. Components

`components/ui/` is the **full shadcn/ui set** (~55 components: accordion, alert, alert-dialog,
avatar, badge, breadcrumb, button, button-group, calendar, card, carousel, chart, checkbox,
collapsible, command, context-menu, dialog, drawer, dropdown-menu, empty, field, hover-card,
input, input-group, input-otp, item, kbd, label, menubar, native-select, navigation-menu,
pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet,
sidebar, skeleton, slider, sonner, spinner, switch, table, tabs, textarea, toggle, toggle-group,
tooltip, …). APIs are standard shadcn/ui — refer to https://ui.shadcn.com/docs/components.

Standard shadcn prop conventions apply: `variant` (`default | secondary | destructive | outline |
ghost | link` on Button) and `size` (`default | sm | lg | icon`). These differ from the old
react-aria props (no more `variant="primary"`, `invalid`, `errorText`, etc.).

### Surmount-specific / composed components

| Component | File | Notes |
|---|---|---|
| **DatePicker** | `date-picker.tsx` | Composed from Popover + Calendar + Button. Uncontrolled by default; pass `value` + `onChange` to control. Replaced the old react-aria auto-mask DatePicker. |
| AccountsSection | `accounts-section.tsx` | B2B-specific (kept from the react-aria era). |
| PortfolioSwitcher | `portfolio-switcher.tsx` | B2B-specific primitive (kept). |

### Theming

shadcn components use semantic utilities (`bg-background`, `text-muted-foreground`, `border-input`,
`ring-ring`, `bg-primary`, …). Those resolve to Surmount tokens through `tokens/shadcn-bridge.css`.
Reconciled decisions baked into the bridge: primary is **cool** (`--color-fg-primary-900`),
destructive is the Surmount **red** (`--color-utility-error-600`) in both modes, borders are
**alpha-black** (`--color-border-primary`), focus ring is **gray** (`--color-fg-secondary-700`),
body tracking stays **−0.5px**. Don't reintroduce brand-blue CTAs or `0em` tracking.

**Brand blue is now the exception, not the accent.** All UI chrome — checked checkboxes/radios,
toggle on-state, selected-card borders, focus rings, hover/selection — is **gray** (`fg-primary-900`
fills, `fg-secondary-700` rings). Brand blue (`#406ad0`) is reserved for (a) intentional
informational **callouts** the design is deliberately highlighting (e.g. a "Save 2 months"
savings badge) and (b) charts/data-viz. When in doubt whether something is chrome vs. a callout,
default to gray.

---

## 6. Micro-interaction Scale (Emil Kowalski — animations.dev)

Apply to every animation in this design system.

| Element | Duration | Easing |
|---|---|---|
| Button press / hover color | 100–160ms | `ease` |
| Tooltips, small popovers | 125–200ms | ease-out |
| Toasts, dropdowns | 150–300ms | ease-out enter / ease-in-out exit |
| Modals, drawers | 200–500ms | ease-out enter |
| Hard UI cap | 300ms | — |

**Easing shortcuts:**
- Enter (appearing): `cubic-bezier(0.23, 1, 0.32, 1)` — strong ease-out
- Move / exit: `cubic-bezier(0.77, 0, 0.175, 1)` — strong ease-in-out
- **Never use `ease-in`** — delays start, feels sluggish

**Transforms:**
- Button `:active`: `scale(0.97–0.98)`
- Appearing element: start `scale(0.95)` with opacity
- Toast enter: `translateX(calc(100% + 24px)) → translateX(0)`
- Toast exit: `translateY(0) → translateY(-120%)` + opacity 0

**Exit animations in React:** Add `isLeaving` state → apply exit CSS class → clear from DOM after exit duration. Never unmount instantly when an exit animation is defined.

**`@media (prefers-reduced-motion: reduce)`:** keep opacity/color transitions; strip transform motion.

---

## 7. Working on this repo

> **Auto commit + push every change.** This repo deploys Storybook to `shawnji.github.io` on push to `main` — leaving uncommitted edits in the working tree means the deployed Storybook is out of sync with the source.

After every meaningful edit:

```bash
git add <files>
git commit -m "<message>"
git pull --rebase origin main && git push origin main
```

Always test new components in Storybook before committing if a dev server is running locally (`npm run storybook`).

---

## 8. Open Items

- **No Figma Code Connect setup** — no `.figma.ts` mapping files yet. When wired up, components will be linked back to their Figma source via `add_code_connect_map`.
- **Token regeneration script** — `tokens/tokens.css` is currently committed as a static file. A script that regenerates from `tokens/source/` is not yet in place.
- **CI** — push-to-main triggers Pages deploy; there is no separate typecheck/lint workflow yet.
- **shadcn components lack individual stories** — they're exercised collectively in `showcase.stories.tsx`. Per-component stories can be split out later if needed.
- **Two component idioms coexist** — most of `components/ui/` is shadcn/Radix, but `accounts-section`/`portfolio-switcher` remain react-aria. Migrate to shadcn idioms when convenient, or leave as-is.
- **`combobox.tsx`** ships from shadcn but is not yet wired into the showcase (Base UI-style API); add when needed.
