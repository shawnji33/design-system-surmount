# Surmount Design System — CLAUDE.md

## 1. Stack

- **Framework**: Next.js (App Router) — scaffold not yet pushed
- **Styling**: TBD (Tailwind CSS expected; confirm once scaffold is added)
- **Language**: TypeScript
- **Linting**: ESLint (Next.js default config)
- **Package manager**: TBD — not yet determined from repo
- **Test runner**: None configured yet

> Note: The repo is currently empty. Stack details above are based on stated intent; verify once the Next.js scaffold is committed.

---

## 2. Folder Conventions

```
/
├── tokens/              # Design tokens (colors, spacing, typography, etc.) — pulled from Figma
├── components/
│   └── ui/              # UI primitives (Button, Input, Badge, etc.)
├── stories/             # Component stories (Storybook or similar) — not yet configured
└── CLAUDE.md
```

- `tokens/` will hold raw and transformed token files (e.g. JSON from Figma, CSS variables, TS constants)
- `components/ui/` is for unstyled or lightly styled primitives only — no page-level components here
- Stories live alongside or in a top-level `stories/` directory — TBD once a story runner is chosen

---

## 3. Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Files | kebab-case | `button.tsx`, `color-tokens.ts` |
| Components | PascalCase | `Button`, `IconBadge` |
| Props — variant | `variant` (not `kind`) | `variant="primary"` |
| Props — size | `size` (not `sz`, not `scale`) | `size="sm"` |
| Token files | kebab-case | `spacing.ts`, `font-size.ts` |
| CSS custom properties | `--surmount-*` prefix | `--surmount-color-primary` |

---

## 4. What Does NOT Exist Yet

- **No design tokens** — no color, spacing, typography, or radius values have been defined
- **No UI components** — `components/ui/` does not exist; nothing has been built
- **No Figma Code Connect setup** — no `.figma.ts` / `.figma.js` mapping files
- **No Storybook or story runner** — no stories, no story config
- **No Next.js scaffold** — the repo is currently empty; framework files not yet committed
- **No test setup** — no Jest, Vitest, or Playwright config
- **No CI/CD** — no GitHub Actions workflows

---

## 5. Design System Implementation Plan

_To be filled in as work progresses._

<!-- Steps will be added here as tokens, components, and Code Connect are implemented -->
