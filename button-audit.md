# Button Component Audit — Figma vs `components/ui/button.tsx`

**Figma source:** `Buttons/Button` component set — `vr9mgx3CwlKmdGujGIumRK` node `3287:427074`
**Code source:** `components/ui/button.tsx` (current) + `components/ui/button.stories.tsx`
**Date:** 2026-04-23

---

## Summary

- **5 changed values** (colors) — all on the **Primary** hierarchy. This is the headline change: Primary shifted from **brand blue** to a **neutral dark gray** across every state.
- **4 changed values** (icon-only padding/icon size) — mid-size icon-only paddings and icon-sizes are off.
- **1 removed variant** — `Size=xs × Icon only=True` no longer exists in Figma.
- **0 new variants.** No new hierarchies, sizes, or states were added.
- **0 changed prop names.** Prop surface (`variant`, `size`, `loading`, `iconOnly`, `iconLeading`, `iconTrailing`, `asChild`) is unchanged.
- **0 missing tokens.** Every value below resolves to an existing token in `tokens.css` and an existing utility in `tailwind.config.ts`. Nothing needs to be hardcoded.

---

## 1. Changed values — **Primary** hierarchy (HEADLINE)

Every Primary state now uses **neutral gray** (`fg-secondary-*`) instead of **brand blue** (`bg-brand-solid-*`). The 2px inner white-12 border and `radius-md` shell are unchanged.

| Slot | Figma value | Current code | Token to use |
|---|---|---|---|
| **Primary / Default — bg** | `colors/foreground/fg-secondary (700)` → `#414651` | `bg-bg-brand-solid` (`#406ad0`) | `bg-fg-secondary-700` |
| **Primary / Hover — bg** | `colors/foreground/fg-secondary_hover` → `#252b37` | `hover:bg-bg-brand-solid-hover` (`#3757be`) | `hover:bg-fg-secondary-hover` |
| **Primary / Focused — bg** | `colors/foreground/fg-secondary (700)` → `#414651` (same as Default, keeps outer focus ring on top) | same as Default (no change needed beyond Default) | `bg-fg-secondary-700` (inherits) |
| **Primary / Loading — bg** | `colors/foreground/fg-secondary_hover` → `#252b37` (same as Hover) | `loadingBgClass.primary = 'bg-bg-brand-solid-hover'` | `bg-fg-secondary-hover` |
| **Primary / Disabled — bg** | `colors/foreground/fg-disabled` → `#a4a7ae` | `disabled:bg-bg-disabled` (`#f5f5f5`) | `disabled:bg-fg-disabled` (token resolves to `#a3a7ae` — 1-hex drift from Figma's `#a4a7ae`, see §5) |
| **Primary / Disabled — text** | `colors/foreground/fg-disabled_subtle` → `#d5d7da` | `disabled:text-fg-disabled` (`#a3a7ae`) | `disabled:text-fg-disabled-subtle` |
| **Primary / Disabled — border** | `1px` `colors/border/border-disabled_subtle` → `#e9eaeb` | `disabled:border disabled:border-border-disabled-subtle` ✓ | (no change) |
| **Primary / text (all states except Disabled)** | `colors/text/text-white` → `#ffffff` | `text-text-white` ✓ | (no change) |
| **Primary / default border** | `2px rgba(255,255,255,0.12)` = `--color-alpha-white-12` | `border-2 border-[var(--color-alpha-white-12)]` ✓ | (no change) |

### What this means in practice

The current "Fix #8/#9" comments are now stale. The new fixes that need to land:
- `loadingBgClass.primary` value
- Primary's `disabled:bg-*` token
- Primary's `disabled:text-*` token
- Primary's base `bg-*` + `hover:bg-*`

---

## 2. Changed values — **Secondary / Tertiary / Link** hierarchies

**No changes.** I spot-checked md Secondary Default/Hover/Focused, md Tertiary Default/Hover, md Link-color Default, md Link-gray Default — every color, padding, icon size, and gap matches current `button.tsx`. The existing Fix #10/#11/#12 behavior for Secondary/Tertiary focused (`focus-visible:bg-bg-secondary`) is still correct per Figma.

---

## 3. Changed values — Icon-only padding

Icon-only for **md** and **xl** has drifted. Figma's pattern is: icon-only uses the size's **vertical** padding on both axes (makes a square), not the symmetric `spacing-md`/`spacing-lg` the code currently uses.

| Size | Figma `p` (icon-only) | Figma frame size | Current code | New class |
|---|---|---|---|---|
| xs | N/A (variant removed — see §4) | N/A | `px-md py-md` (8×8) | (see §4) |
| sm | `spacing-md` → `8px` | 36×36 | `px-md py-md` (8×8) ✓ | no change |
| md | `10px` → `spacing-2-5` | 40×40 | `px-md py-md` (8×8) ❌ | `p-2-5` |
| lg | `spacing-lg` → `12px` | 44×44 | `px-lg py-lg` (12×12) ✓ | no change |
| xl | `14px` → `spacing-3-5` | 48×48 | `px-lg py-lg` (12×12) ❌ | `p-3-5` |

All four target tokens (`spacing-md`, `spacing-2-5`, `spacing-lg`, `spacing-3-5`) already exist in `tokens.css` and are registered as `md`, `2-5`, `lg`, `3-5` in `tailwind.config.ts → spacing`.

---

## 4. Changed values — Icon-only icon SIZE

Icon-only icons are **larger** than inline icons for `sm` and `md`. Figma's pattern: icon-only always uses a **20 px icon**, while inline icons size to match the text cap-height.

| Size | Figma inline icon | Figma icon-only icon | Current code (single table for both) | Needs split? |
|---|---|---|---|---|
| xs | 14 | — (no variant) | 14 ✓ | no |
| sm | 16 | **20** | 16 ❌ for icon-only | **yes** |
| md | 18 | **20** | 18 ❌ for icon-only | **yes** |
| lg | 20 | 20 | 20 ✓ | no |
| xl | 20 | 20 | 20 ✓ | no |

The current code uses one `iconSizeClass` map for both inline and icon-only contexts. Recommended fix: add a parallel `iconOnlyIconSizeClass` map (or branch inline vs icon-only in the render), where all present sizes (sm/md/lg/xl) use `size-2xl` (20 px).

---

## 5. Removed variants

`Size=xs × Icon only=True` **does not exist** in the updated Figma component set. Scanning every xs symbol in the parent frame (node ids `22425:*`) confirms: only `Icon only=False` variants are present at xs.

Current code still has a compound variant for it:
```ts
{ iconOnly: true, size: 'xs', class: 'px-md py-md' },
```
…which means a consumer passing `size="xs" iconOnly` will still render — but with no design coverage. Recommended action: **leave it in at runtime** (calling it isn't a type error and it still produces reasonable output), but document it as deprecated in a short comment and ensure Storybook's `AllSizes` / icon-only stories skip xs.

---

## 6. Changed prop names

**None.** The prop surface (`variant`, `size`, `loading`, `asChild`, `iconLeading`, `iconTrailing`, `iconOnly`) is unchanged. The Figma component still uses `Size`, `Hierarchy`, `State`, `Icon only` as variant axes, plus `⬅️ Icon leading`, `➡️ Icon trailing`, `🔀 Icon leading swap`, `🔀 Icon trailing swap`, `Loading text` as properties — all of which the existing React prop surface already covers semantically.

---

## 7. Token drift (tokens.css vs Figma) — **do NOT fix in this PR**

A few token **values** in `tokens.css` drift by 1–2 hex digits from what the Figma variable resolves to. These aren't button.tsx problems — they'd be fixed by re-exporting tokens from Figma, not by editing the button. Flagging for awareness only:

| Token | `tokens.css` | Figma var resolves to |
|---|---|---|
| `--color-border-primary` | `#00000016` (0.086 α) | `#00000017` (0.09 α) |
| `--color-fg-disabled` | `#a3a7ae` | `#a4a7ae` |
| `--color-fg-disabled-subtle` | `#d5d6d9` | `#d5d7da` |
| `--color-fg-tertiary-600` | `#535861` | `#535862` |

Action: ignore for this PR. The button should continue to reference the semantic tokens (`bg-fg-disabled`, etc.), and token drift gets fixed when the tokens are re-exported from Figma into `tokens.css`.

---

## 8. Missing tokens

**None.** Every value I need for Pass 2 resolves cleanly:

| Needed utility class | Resolves to CSS var | Var exists in `tokens.css`? | Class exists in `tailwind.config.ts`? |
|---|---|---|---|
| `bg-fg-secondary-700` | `--color-fg-secondary-700` | ✅ line 162 | ✅ `colors.fg."secondary-700"` |
| `bg-fg-secondary-hover` | `--color-fg-secondary-hover` | ✅ line 184 | ✅ `colors.fg."secondary-hover"` |
| `bg-fg-disabled` | `--color-fg-disabled` | ✅ line 188 | ✅ `colors.fg.disabled` |
| `text-fg-disabled-subtle` | `--color-fg-disabled-subtle` | ✅ line 209 | ✅ `colors.fg."disabled-subtle"` |
| `border-border-disabled-subtle` | `--color-border-disabled-subtle` | ✅ line 254 | ✅ `colors.border."disabled-subtle"` |
| `p-2-5` | `--spacing-2-5` (10 px) | ✅ line 645 | ✅ `spacing."2-5"` |
| `p-3-5` | `--spacing-3-5` (14 px) | ✅ line 646 | ✅ `spacing."3-5"` |
| `size-2xl` | `--spacing-2xl` (20 px) | ✅ line 634 | ✅ `spacing."2xl"` |
| `[var(--color-alpha-white-12)]` | `--color-alpha-white-12` | ✅ line 275 | used via arbitrary-value already |

No hardcoding required.

---

## Pass 2 change list (preview)

If you ok this audit, Pass 2 will make exactly these edits in `button.tsx`:

1. In `button({ variants: { variant: { primary: [...] }}})`:
   - `bg-bg-brand-solid` → `bg-fg-secondary-700`
   - `hover:bg-bg-brand-solid-hover` → `hover:bg-fg-secondary-hover`
   - `disabled:bg-bg-disabled` → `disabled:bg-fg-disabled`
   - `disabled:text-fg-disabled` → `disabled:text-fg-disabled-subtle`
2. In `loadingBgClass`:
   - `primary: 'bg-bg-brand-solid-hover'` → `primary: 'bg-fg-secondary-hover'`
3. In `compoundVariants`:
   - `{ iconOnly: true, size: 'md', class: 'px-md py-md' }` → `class: 'p-2-5'`
   - `{ iconOnly: true, size: 'xl', class: 'px-lg py-lg' }` → `class: 'p-3-5'`
   - (leave the xs/sm/lg compound variants alone — they still match)
4. Split icon-size map: add an `iconOnlyIconSizeClass` (`sm/md/lg/xl → size-2xl`) and route through it when `iconOnly === true`. Keep the existing `iconSizeClass` for the inline case.
5. Update the stale "Fix #N" comments so they reflect the new reality (Primary is neutral; md/xl icon-only paddings; iconOnly icon sizes).

And in `button.stories.tsx`:
- Add a short comment/block clarifying that Primary is now neutral (not brand blue) so reviewers aren't surprised.
- Filter `xs` out of the `IconOnly` / `StateMatrix` icon-only usage (since that variant was removed from Figma). `AllSizes` keeps xs because text-mode xs is still valid.
- No new variants, sizes, or states need their own stories.

---

**Awaiting your go-ahead before touching code.**
