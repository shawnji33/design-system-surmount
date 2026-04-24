# Checkbox — Audit (Pass 1, no code changes)

**Component:** `components/ui/checkbox.tsx` (includes Radio via `type` prop)
**Against:** `interaction-states.md` (canonical) + `components/ui/button.tsx` (neutral Primary)
**Date:** 2026-04-24

---

## Summary

Checkbox is well-built structurally — handles xs/sm/md sizing, radio mode, indeterminate, label + supportingText, uses `:focus-visible` correctly, proper ARIA via native `<input>`. **Three issues** tie it back to the recent neutral + interaction-states push:

1. **Checked state is brand-blue** (`bg-bg-brand-solid` → `#406ad0`). Stale relative to neutral Primary Button (`#181d27`) and the spec's rule that persistent choice states shouldn't borrow brand color either.
2. **Focus ring is 4 px × `--focus-ring` (15 % α)** — the Button treatment. Per `interaction-states.md`, form controls (Input, InputGroup, radio/checkbox row) should use **3 px × `--focus-ring-subtle` (8 % α)**.
3. **Minor API drift**: `supportingText` prop name differs from `Input`'s `helperText`.

No interaction-state conflation — the code correctly uses `:focus-visible` and keeps checked/focus visuals independent. Good.

---

## Findings

### Priority 1 — Checked color (visual inconsistency)

**Current** (`checkbox.tsx:137–139`):
```tsx
isActive
  ? 'bg-bg-brand-solid border-0'
  : 'border-border-primary',
```

`isActive` = checked OR (checkbox only) indeterminate. Uses `bg-bg-brand-solid` → `#406ad0` (brand-600 blue).

**Per the neutral Primary Button update** (`3729925`), primary filled surfaces use `bg-fg-primary-900` → `#181d27` (near-black). Checkbox-checked is a primary filled surface by the same logic — it's a persistent commitment, filled, on a bright background. Keeping it blue creates a two-tone story ("Primary actions are black, but a *checked* checkbox is blue") that's hard to justify.

**Proposed:**
```tsx
isActive
  ? 'bg-fg-primary-900 border-0'
  : 'border-border-primary',
```

The check/minus icons keep their existing `text-fg-white` color — still legible on `fg-primary-900`.

Downstream: anyone consuming `<Checkbox checked>` sees the box go from blue to near-black. Low blast radius in practice (Checkbox is used in Table + a couple places per grep). A visual-regression pass after the change should be enough.

### Priority 2 — Focus ring intensity

**Current** (`checkbox.tsx:32`):
```tsx
'has-[:focus-visible]:shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_4px_var(--focus-ring)]',
```

4 px outer ring at `--focus-ring` (15 % α) — matches Button. The 2 px inset of `bg-primary` is a nice "pop" effect.

**Per `interaction-states.md`:**

> One focus ring token per shell family:
> - Button, filled CTA → 4 px `--focus-ring` (15 % α)
> - **Input, input-group, radio/checkbox row** → 3 px `--focus-ring-subtle` (8 % α)

Checkbox is the atomic form control; its ring should match Input's, not Button's.

**Proposed:**
```tsx
'has-[:focus-visible]:shadow-[0_0_0_2px_var(--color-bg-primary),0_0_0_3px_var(--focus-ring-subtle)]',
```

Kept the 2 px white inset (nice detail, visually separates the box from the halo).  Swapped `4px → 3px` and `--focus-ring → --focus-ring-subtle`. Token added in `0c38382`, so this lights up without further DS work.

### Priority 3 — API drift with Input

| Prop | Input | Checkbox | Proposal |
|---|---|---|---|
| Label below the control | `helperText` | `supportingText` | rename `supportingText` → `helperText` on Checkbox |

Minor but matters — two neighboring form components with different names for the same concept will cause confusion in component playgrounds + docs. Rename `supportingText` → `helperText`, keep a deprecation note for one release if this has downstream consumers (check `git grep supportingText` first).

---

## Non-findings (already correct)

- ✅ Uses `:focus-visible` (not `:focus`) — selected-while-clicked doesn't steal a ring
- ✅ Indeterminate is handled via `ref + useEffect` (DOM property, not attribute) — correct
- ✅ Native `<input>` remains in DOM via `sr-only` — accessible to assistive tech + form submission
- ✅ Label wrapper is a real `<label>` — click-to-toggle works natively
- ✅ Disabled + checked + indeterminate cross-states covered in stories

---

## Optional follow-ups (don't include in Pass 2 unless you say so)

- **Error state** — Checkbox has no error variant. Not needed by any consumer today. Add when a form asks for it.
- **Hover state** — no explicit `:hover` styling. Native input change on hover is subtle; probably fine. Flag if the visual-regression pass reveals a miss.
- **Radio checked-color** — the Radio variant uses the same blue fill. Same neutral proposal applies. Included in P1.

---

## Files Pass 2 will touch

- `components/ui/checkbox.tsx` — two class changes (P1 bg, P2 focus ring) + one prop rename (P3)
- `components/ui/checkbox.stories.tsx` — update any `supportingText` usage after rename
- **No** token changes, **no** tailwind config changes, **no** changes to other components

---

## Decisions I need from you before Pass 2

1. **P1 bg swap** `bg-bg-brand-solid` → `bg-fg-primary-900` — do it?
2. **P2 ring swap** 4 px `--focus-ring` → 3 px `--focus-ring-subtle` — do it?
3. **P3 rename** `supportingText` → `helperText` — do it? Or preserve for back-compat?
4. **Scope** — ship all three together (one commit), or break P1 vs P2+P3 apart in case P1 needs a visual-regression sweep first?

Default recommendation if you just say "go": **1 ✅, 2 ✅, 3 ✅, all in one commit** — three small class/prop edits, same risk profile as the Button neutralization we already shipped.
