# Surmount Design System — CLAUDE.md

## 1. Stack

- **Framework**: Next.js (App Router) — scaffold not yet pushed
- **Styling**: TBD (Tailwind CSS expected; confirm once scaffold is added)
- **Language**: TypeScript
- **Linting**: ESLint (Next.js default config)
- **Package manager**: TBD — not yet determined from repo

> Stack details are based on stated intent. Verify once the Next.js scaffold is committed.

---

## 2. Folder Conventions

```
/
├── tokens/
│   ├── source/          # Raw Figma exports — DO NOT EDIT
│   ├── tokens.css       # Generated CSS custom properties (do not hand-edit)
│   ├── foundations.md   # Human-readable token audit
│   └── README.md        # Token generation instructions (not yet written)
├── components/
│   └── ui/              # UI primitives — one .tsx + one .stories.tsx per component
└── CLAUDE.md
```

- `tokens/source/` holds raw JSON exported from Figma. Never edit these files manually.
- `tokens/tokens.css` is generated from source. Do not hand-edit.
- `components/ui/` is for primitives only (Button, Input, Badge, etc.) — no page-level components.
- Each component lives in its own file: `button.tsx` + `button.stories.tsx`. No barrel `index.ts` unless components share a directory.
- Components will be pulled from Figma via the Figma MCP server.

---

## 3. Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Files | kebab-case | `button.tsx`, `icon-badge.tsx` |
| Components | PascalCase | `Button`, `IconBadge` |
| Props — variant | `variant` (not `kind`) | `variant="primary"` |
| Props — size | `size` (not `sz`, not `scale`) | `size="sm"` |
| CSS custom properties | kebab-case, no namespace prefix | `--color-bg-primary` |

---

## 4. Token Naming Rule

Figma token keys are transformed to CSS custom properties by:

1. Stripping leading category segments (e.g. `colorsBackground`, `colorsForeground`, `colorsText`, `colorsBorder`, `colorsEffects`)
2. Converting the remainder from camelCase to kebab-case
3. Prefixing with `--`

**Examples** (to be verified once `tokens.css` is generated):

| Figma key | CSS variable |
|---|---|
| `colorsBackgroundBgPrimary` | `--color-bg-primary` |
| `colorsForegroundFgPrimary900` | `--color-fg-primary-900` |
| `colorsTextTextSecondary700` | `--color-text-secondary-700` |
| `colorsBorderBorderBrand` | `--color-border-brand` |
| `spacingMd` | `--spacing-md` |
| `radiusSm` | `--radius-sm` |
| `fontSizeTextSm` | `--font-size-text-sm` |

> Full transformation rule to be documented once `tokens.css` is generated and the exact stripping logic is confirmed.

---

## 5. What Does NOT Exist Yet

- **No `tokens.css`** — token source JSON exists at `tokens/source/` but no CSS variables have been generated
- **No UI components** — `components/ui/` does not exist; nothing has been built
- **No Figma Code Connect setup** — no `.figma.ts` / `.figma.js` mapping files
- **No story runner** — no Storybook config; `.stories.tsx` files are planned but none exist
- **No Next.js scaffold** — framework files not yet committed
- **No CI/CD** — no GitHub Actions workflows

---

## 6. Design System Implementation Plan

_To be filled in as work progresses._

<!-- Steps will be added here as tokens, components, and Code Connect are implemented -->
