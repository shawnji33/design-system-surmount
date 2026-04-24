# Input Field — Component Proposal (Pass 1, audit only)

**Status:** proposed — no code until approved
**Figma:** no canonical Input Field component in the Surmount DS file today. The closest is the `.field` pattern we built into the B2C onboarding prototypes (`/Users/shawnji/Surmount/B2C/designs/onboarding/*.html`). This doc formalizes that pattern so we can ship a real DS component next.
**Date:** 2026-04-24

---

## Why this is needed

- Four onboarding screens (phone, date-of-birth, address, ssn) currently ship with a locally-defined `.field` class. Same behavior, four copies.
- The Button audit we just finished would pair well with an Input; right now the two get their focus treatment from different places (Button uses `--focus-ring`, the prototype Input uses a hand-coded border + ring).
- We just added `--color-border-focus` (`9aec7d1`) but nothing in the DS consumes it yet.

One component, one canonical focus treatment, one set of tokens.

---

## Anatomy

```
┌─────────────────────────────────────┐
│ [leading]  Label                    │  ← optional floating label
│            Value / placeholder  [↘] │  ← optional trailing
└─────────────────────────────────────┘
 Helper text                          ← optional
```

Slots:
- **Label** — inside top of the shell (floating-label pattern) or above the shell (classic label)
- **Value / placeholder** — the `<input>` itself
- **Leading icon** (optional) — 20 px, `fg-tertiary-600`
- **Trailing icon / action** (optional) — 20 px, clickable for password toggle / dropdown caret / clear
- **Helper text** (optional) — below the shell, `text-xs` in `fg-tertiary-600` (error variant → `fg-error-primary`)

---

## Props (proposed React API)

```ts
type InputProps = {
  size?: 'sm' | 'md' | 'lg';
  label?: ReactNode;                 // if set → floating-label layout
  placeholder?: string;
  helperText?: ReactNode;
  error?: boolean;
  errorText?: ReactNode;
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  // all native <input> props passthrough
} & Omit<ComponentPropsWithoutRef<'input'>, 'size'>;
```

Matches the Button API shape (`iconLeading`, `iconTrailing`, `size`, `disabled`) so muscle memory transfers.

---

## Sizes

| Size | Height | Padding | Text | Icon | Radius |
|---|---|---|---|---|---|
| sm | 40 px | `py-md px-lg` (8 × 12) | `text-sm` 14/20 | 16 | `radius-md` (8) |
| md | **52 px** *(default)* | `py-2-5 px-xl` (10 × 16) | `text-md` 16/24 | 20 | `radius-xl` (12) |
| lg | 64 px | `py-xl px-xl` (16 × 16) | `text-md` 16/24 | 20 | `radius-xl` (12) |

The `lg` size covers the floating-label case (label + value stacked takes more vertical room; current onboarding uses 64 px for this).

Open question → pick one: **md = 52 px** (what address/ssn use) or **md = 48 px** (one step smaller, feels tighter).

---

## States — tokens already in the DS

| State | Border | Shell bg | Extra |
|---|---|---|---|
| Default | `border-border-primary` | `bg-bg-primary` | — |
| Hover | `border-border-primary` | `bg-bg-primary-hover` | subtle only |
| Focused | **`border-border-focus`** (24% α, just added) | `bg-bg-primary` | `shadow: 0 0 0 3px var(--focus-ring-subtle)` |
| Filled | `border-border-primary` | `bg-bg-primary` | value in `fg-primary-900` |
| Disabled | `border-border-disabled-subtle` | `bg-bg-disabled` | text in `fg-disabled` |
| Error | `border-border-error` | `bg-bg-primary` | helper/error text in `fg-error-primary` |
| Read-only | `border-border-primary` | `bg-bg-secondary` | no focus ring, no hover |

---

## One new token I'd like to add

The Button uses `--focus-ring` at 4 px spread (15 % α). The Input needs a **softer** ring at 3 px spread (8 % α) so the inner border change reads as the primary signal, not the ring. Proposing:

```css
/* tokens.css — light */
--focus-ring-subtle: #0a0d1214;  /* rgba(10,13,18,0.08) */

/* tokens.css — dark */
--focus-ring-subtle: #ffffff28;  /* rgba(255,255,255,0.16) */
```

Exposed in `tailwind.config.ts` as `focus-ring-subtle` alongside `focus-ring`. This is the **only** net-new token I'm asking for — everything else re-uses what's already there.

Alternative (if you want the DS to have one ring, not two): keep `--focus-ring` at 15 % and use **4 px** for Button but **3 px** for Input to vary intensity via width alone. I marginally prefer two tokens since `focus-ring-subtle` composes with `focus-ring-error` naming.

---

## Typography

| Element | Style | Tokens |
|---|---|---|
| Value | Geist Medium 16/24 | `text-text-md` + `font-medium` |
| Placeholder | same as value, color swap | `text-text-placeholder` |
| Floating label | Geist Medium 14/20 | `text-text-sm` + `font-medium`, color `fg-tertiary-600` |
| Helper text | Geist Regular 12/18 | `text-text-xs` + `font-normal`, color `fg-tertiary-600` |
| Error text | Geist Regular 12/18 | `text-text-xs`, color `fg-error-primary` |

Letter-spacing `0` across the board (Figma variable defs confirm this for `text-sm/Medium` + `text-md/Regular`).

---

## Group composition (stretch scope — call out, don't implement yet)

Two places we've already built an "Input Group":
- Phone step: country-code + number, side by side
- Address step: street + apt/unit stacked in one rounded shell

Proposed: an `InputGroup` component that wraps N Input children and owns the focus-within treatment on the outer shell. Not in scope for Pass 2. Call this out so we don't accidentally build Input in a way that blocks the group.

---

## Files Pass 2 will touch

- `components/ui/input.tsx` — new
- `components/ui/input.stories.tsx` — new
- `tokens/tokens.css` — add `--focus-ring-subtle` (light + dark) if approved
- `tailwind.config.ts` — expose `focus-ring-subtle` color utility if approved
- No edits to Button, no edits to existing tokens

---

## Decisions I need from you before Pass 2

1. **md height** → 52 px or 48 px?
2. **Two focus rings or one?** Add `--focus-ring-subtle` token, or vary width (3/4 px) on the single `--focus-ring`?
3. **Scope** — ship just the single Input first, or include the Checkbox shell + InputGroup in the same PR?
4. **Floating label or outer label as the default?** The B2C prototypes use floating. DS could default either way; I'd lean floating since that's what we already ship.

Once you pick, I'll write the component + stories and push.
