# tweakcn "surmount" theme → Surmount design system mapping

Source: `tweakcn-surmount-theme.json` (installed into `app/globals.css` via `shadcn add`).
Target DS: `../design-system-surmount` (Tailwind v4, custom `--color-*` token vocabulary).

The theme speaks **shadcn semantic names** (`--primary`, `--card`, `--border`, `--chart-1`).
Your components consume **Surmount tokens** (`--color-bg-primary`, `--color-fg-primary-900`, …).
This file maps one to the other. `surmount-bridge.css` is the executable version.

oklch values below are converted to hex for comparison with `tokens/tokens.css`.

---

## Color tokens — LIGHT

| shadcn token | theme hex | → Surmount token | DS hex | Match? |
|---|---|---|---|---|
| `--background` | `#fcfcfc` | `--color-bg-primary` | `#ffffff` | ~ (theme slightly off-white) |
| `--foreground` | `#272218` | `--color-fg-primary-900` | `#181d27` | ⚠ theme is **warm** near-black, DS is **cool** |
| `--card` | `#ffffff` | `--color-bg-primary` | `#ffffff` | ✅ |
| `--card-foreground` | `#272218` | `--color-fg-primary-900` | `#181d27` | ⚠ warm vs cool |
| `--popover` | `#fcfcfc` | `--color-bg-primary` | `#ffffff` | ~ |
| `--popover-foreground` | `#272218` | `--color-fg-primary-900` | `#181d27` | ⚠ |
| `--primary` | `#272218` | `--color-fg-primary-900` | `#181d27` | ⚠ see decision #1 |
| `--primary-foreground` | `#ffffff` | `--color-fg-white` | `#ffffff` | ✅ |
| `--secondary` | `#f4f4f5` | `--color-bg-secondary` | `#fafafa` | ~ |
| `--secondary-foreground` | `#272218` | `--color-fg-primary-900` | `#181d27` | ⚠ |
| `--muted` | `#f5f5f5` | `--color-bg-tertiary` | `#f5f5f5` | ✅ |
| `--muted-foreground` | `#525252` | `--color-text-tertiary-600` | `#0a0d1299` | ~ |
| `--accent` | `#ebebeb` | `--color-bg-quaternary` | `#e9e9eb` | ✅ |
| `--accent-foreground` | `#272218` | `--color-fg-primary-900` | `#181d27` | ⚠ |
| `--destructive` | `#b6544c` | `--color-utility-error-600` | `#b6544c` | ✅ **exact** |
| `--destructive-foreground` | `#ffffff` | `--color-fg-white` | `#ffffff` | ✅ |
| `--border` | `#e6e6e6` | `--color-border-primary` | `#00000016` | ~ DS uses alpha-black |
| `--input` | `#ebebeb` | `--color-border-primary` | `#00000016` | ~ (inputs: 9%-alpha border) |
| `--ring` | `#272218` | `--color-fg-brand-primary-600` | `#406ad0` | ⚠ see decision #4 |
| `--chart-1` | `#406ad0` | `--color-utility-brand-600` | `#406ad0` | ✅ **exact** |
| `--chart-2` | `#ed7828` | `--color-utility-warning-600` | `#de5b18` | ~ |
| `--chart-3` | `#a4a4a4` | `--color-fg-quaternary-400` | `#a3a7ae` | ✅ |
| `--chart-4` | `#e4e4e4` | `--color-fg-disabled-subtle` | `#d5d6d9` | ~ |
| `--chart-5` | `#747474` | `--color-fg-quaternary-hover` | `#717680` | ✅ |

## Color tokens — DARK

| shadcn token | theme hex | → Surmount token | Note |
|---|---|---|---|
| `--background` | `#000000` | `--color-bg-primary` (dark) | DS dark bg is not pure black — reconcile |
| `--foreground` | `#ffffff` | `--color-fg-primary-900` (dark) | ✅ |
| `--card` | `#1a1a19` | `--color-bg-secondary` (dark) | ~ |
| `--primary` | `#ffffff` | `--color-fg-primary-900` (dark) | inverts to white — ✅ |
| `--destructive` | `#5bffff` 🐛 | `--color-utility-error-600` | **BUG: teal/cyan. Must override to red.** |
| `--chart-1` | `#0555ff` | `--color-utility-brand-600` (dark) | brighter blue than light |
| `--chart-2` | `#f4a926` | `--color-utility-warning-600` (dark) | ~ |
| `--ring` | `#a4a4a4` | brand or gray | decision #4 |

(Remaining dark tokens follow the same mapping as light, inverted.)

---

## Non-color tokens

| token | theme | Surmount | Action |
|---|---|---|---|
| `--radius` (base) | `0.5rem` (8px) | — | base OK; derived scale drifts (below) |
| `--radius-lg` | `0.5rem` = 8px | `--radius-md` 8px (buttons) | ✅ |
| `--radius-xl` | `0.7rem` = 11.2px | `--radius-xl` 12px (cards) | ⚠ bump 1.4→1.5 to hit 12px |
| `--letter-spacing` | `0em` | **−0.5px body** | ⚠ override — theme regresses this |
| `--tracking-normal` | `0em` | **−0.5px** (−0.031em) | ⚠ override |
| `--font-sans` | Geist | Geist (body) | ✅ |
| `--font-serif` | Inter | Inter (display) | ✅ |
| `--font-mono` | Geist Mono | — (DS avoids mono) | keep defined, don't use |
| `--shadow-*` | `#1a1a1a` @ 0.18, tight | card: soft 12px-blur @ 3% | ⚠ replace card shadow per DS rule |

---

## Decisions — RESOLVED

1. ✅ **Primary** — keep DS **cool** `--color-fg-primary-900` (`#181d27`). Theme's warm `#272218` rejected.
2. ✅ **Destructive** — use original Surmount red `--color-utility-error-600` (`#b6544c`) in **both** light and dark. Theme's dark teal `#5bffff` overridden.
3. ✅ **Borders** — keep DS alpha-black `--color-border-primary` (`#00000016`). Theme's opaque gray rejected.
4. ✅ **Focus ring** — **gray** `--color-fg-secondary-700` (`#414651`). Brand blue rejected.
5. ✅ **Letter-spacing & shadows** — keep DS values: −0.5px tracking + soft card shadow. Theme's `0em` / hard shadow overridden.

All five are encoded in `surmount-bridge.css`.

---

## What to do with this

Nothing is merged into the DS yet. Once decisions above are settled, the resolved
overrides in `surmount-bridge.css` are the spec for what (if anything) lands in
`design-system-surmount/tokens/tokens.css`. Most of the *value* here is confirming
the theme already tracks your brand (chart-1, destructive) and surfacing the 5 drifts.
