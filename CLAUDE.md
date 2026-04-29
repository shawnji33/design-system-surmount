# Surmount Design System — CLAUDE.md

## 1. Stack

- **Framework**: Next.js 15 (App Router) + React 18
- **Styling**: Tailwind CSS v3 (config in `tailwind.config.ts`, tokens fed via CSS custom properties)
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
- `components/ui/` is for primitives only (Button, TextInput, Badge, etc.) — no page-level components.
- Each component lives in its own file: `button.tsx` + `button.stories.tsx`. No barrel `index.ts`.

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

**Dark mode**: set `data-theme="dark"` on `<html>` (or any container). Tokens auto-flip via `[data-theme="dark"]` selector configured in `tailwind.config.ts`.

---

## 5. Components

| Component | File | States covered |
|---|---|---|
| Badge | `badge.tsx` | variants × sizes |
| Button | `button.tsx` | hierarchy × size × disabled |
| Checkbox | `checkbox.tsx` | checkbox/radio × size × checked/indeterminate × disabled × with-label |
| **DatePicker** | `date-picker.tsx` | resting / focused / filled / invalid / disabled, calendar popover, auto-mask, two-way sync, custom validators, imperative ref API |
| Dropdown | `dropdown.tsx` | open/closed × selection × disabled |
| PortfolioSwitcher | `portfolio-switcher.tsx` | (B2B-specific primitive) |
| Sidebar | `sidebar.tsx` | nav primitive |
| Table | `table.tsx` | row/header primitives |
| Tabs | `tabs.tsx` | sizes × selection |
| **TextInput** | `text-input.tsx` | resting / focused / filled / invalid / disabled, sm/md/lg, leading + trailing icons |
| Toggle | `toggle.tsx` | sizes × on/off × disabled |

### Input field principles (Carbon-aligned)

- `invalid={true}` + `errorText="…"` is the only way to enter the error state. The error message **takes precedence** over `helperText` — never show both at once.
- Error visuals: `border-border-error` (`#cb6f68`), 3px focus ring at `rgba(203,111,104,0.18)`, `text-text-error-primary-600` (`#b6544c`) for the message + a circle-i icon.
- The error message is announced to assistive tech via `role="alert"` and `aria-live="polite"`. The input gets `aria-invalid="true"` and `aria-describedby` pointing at the error message id.
- **Disabled** is non-interactive: bg is `bg-bg-disabled-subtle`, cursor is `not-allowed`, `pointer-events:none` on consumer-side CTAs.
- Helper text is suppressed in the invalid state — the error message replaces it.
- Validation should not flash red while a user is mid-typing. Run inline validation only when input is "complete enough" (e.g. all 8 digits of a date), and unconditionally on `blur`.

### Date picker specifics

- Auto-mask: typing `04102000` becomes `04 / 10 / 2000` automatically. The mask strips non-digits, caps at 8, inserts ` / ` after MM and DD.
- Two-way sync: typing a valid date moves the calendar view + selection; clicking a day fills the input.
- Default validator rejects: invalid calendar dates, future dates, years < 1900. Override via `validate` prop.
- Imperative API via `forwardRef<DatePickerHandle>`: `getValue()`, `setValue(v)`, `validate()` for submit-time checks.
- Calendar popover is 296px wide, sits below the field with an 8px gap, anchored `left:0`.

---

## 6. Working on this repo

> **Auto commit + push every change.** This repo deploys Storybook to `shawnji.github.io` on push to `main` — leaving uncommitted edits in the working tree means the deployed Storybook is out of sync with the source.

After every meaningful edit:

```bash
git add <files>
git commit -m "<message>"
git pull --rebase origin main && git push origin main
```

Always test new components in Storybook before committing if a dev server is running locally (`npm run storybook`).

---

## 7. Open Items

- **No Figma Code Connect setup** — no `.figma.ts` mapping files yet. When wired up, components will be linked back to their Figma source via `add_code_connect_map`.
- **Token regeneration script** — `tokens/tokens.css` is currently committed as a static file. A script that regenerates from `tokens/source/` is not yet in place.
- **CI** — push-to-main triggers Pages deploy; there is no separate typecheck/lint workflow yet.
