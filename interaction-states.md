# Interaction States — Design System Spec

**Status:** canonical. All DS components must follow this model.
**Date:** 2026-04-24

## The six states

Interactive elements live in a matrix of states that are **independent and composable**:

| State | When it applies | Persistent? | Primary signal |
|---|---|---|---|
| **Default** | no user interaction | ✅ baseline | — |
| **Hover** | pointer over element | ❌ while hovered | bg bump (`bg-primary-hover`) |
| **Focus-visible** | keyboard focus only | ❌ while focused | outer ring (`--focus-ring` or `--focus-ring-subtle`) + `border-border-focus` |
| **Active / Pressed** | momentary click-down | ❌ during press | `scale(0.97)` or darker bg |
| **Selected / Checked** | the current choice or value | ✅ persistent | a distinct, persistent visual (fill, dot, check) |
| **Disabled** | non-interactive | ✅ persistent | dimmed, no interaction |
| **Error** | validation failure | ✅ persistent | `border-border-error`, `focus-ring-error` on focus |

## Rules

### 1. Don't conflate "Selected" with "Focused"

They answer different questions:
- **Selected** → "*which option is the current choice?*" (a property of the data)
- **Focus-visible** → "*which element does keyboard focus land on right now?*" (a property of the user's session)

A user can tab to a **selected** option without triggering any re-selection, and can also tab to an **unselected** option without changing the current choice. Both are legitimate states.

**Concretely:**
- Selected state → **no focus ring**. Persistent selection doesn't borrow the focus vocabulary.
- Focus-visible state → **no selection cue**. Arriving with the keyboard doesn't imply picking.
- When both apply → the two sets of visuals combine (selected bg + focus ring).

### 2. Focus-visible ≠ focus

Use `:focus-visible`, never `:focus`. `:focus` fires on mouse click too, which is what dragged a ring onto clicked radios in the employment flow. `:focus-visible` only fires when the browser heuristically decides the user is keyboard-navigating.

### 3. One ring token per shell family

| Shell | Ring width | Token |
|---|---|---|
| Button, filled CTA | 4 px | `--focus-ring` (15% α) |
| Input, input-group, radio/checkbox row | 3 px | `--focus-ring-subtle` (8% α) |
| Error context | 3–4 px | `--focus-ring-error` |

### 4. Transitions

Always transition `background-color`, `border-color`, `box-shadow`, and `transform` on state changes. Never transition `opacity` or `color` alone for state feedback — it looks mushy.

Standard easing: `150 ms ease` (fills/borders), `120 ms ease` (transforms).

## Apply to selection-row pattern (radio / checkbox card)

```css
/* Default */
.row {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-xl);
}

/* Hover */
.row:hover {
  background: var(--color-bg-primary-hover);
}

/* Selected — persistent, signal is bg fill + filled dot */
.row:has(:checked) {
  background: var(--color-bg-secondary);
}

/* Focus-visible — keyboard only, independent */
.row:has(:focus-visible) {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px var(--focus-ring-subtle);
}

/* Disabled */
.row:has(:disabled) {
  background: var(--color-bg-disabled);
  border-color: var(--color-border-disabled-subtle);
  cursor: not-allowed;
}
```

Selected + Focused naturally composes: `bg-secondary` fill + focus ring overlay.

## Apply to input (already conformant)

```css
.input {
  border: 1px solid var(--color-border-primary);
}
.input:focus-within {
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px var(--focus-ring-subtle);
}
/* No "selected" state — inputs only carry value, not selection */
```

## Apply to button (already conformant)

```css
.button {
  /* Default, Hover, Focus-visible, Active, Disabled, Loading — all distinct, no overlap */
}
.button:focus-visible {
  box-shadow: 0 0 0 4px var(--focus-ring);
}
/* Primary / Secondary / Tertiary aren't "states" — they're hierarchies (persistent visual identities) */
```

## When in doubt

If you find yourself applying the same visual (ring, dark border, etc.) to both a user-generated interaction state (focus/hover/active) and a data state (selected/error/disabled), you have a conflation bug. Split them.
