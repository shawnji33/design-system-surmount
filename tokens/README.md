# Surmount Design System — Token Reference

> Auto-generated from `tokens/source/design-system.json`.
> Full CSS output: [`tokens.css`](./tokens.css)
> Tailwind config: [`tailwind.config.ts`](../tailwind.config.ts)

---

## Naming Rule

```
colorsBackgroundBgPrimary              →  --color-bg-primary          →  bg-bg-primary
colorsForegroundFgPrimary900           →  --color-fg-primary-900      →  text-fg-primary-900
colorsTextTextSecondary700             →  --color-text-secondary-700  →  text-text-secondary-700
colorsBorderBorderBrand                →  --color-border-brand        →  border-border-brand
colorsEffectsShadowsShadowXs           →  --shadow-xs                 →  shadow-xs
componentColorsUtilityBrandUtilityBrand600  →  --color-utility-brand-600  →  bg-utility-brand-600
spacingMd                              →  --spacing-md                →  p-md / m-md / gap-md
radiusSm                               →  --radius-sm                 →  rounded-sm
fontSizeTextSm                         →  --font-size-text-sm         →  text-text-sm
```

---

## Semantic Colors

### Background

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `colorsBackgroundBgPrimary` | `--color-bg-primary` | `bg-bg-primary` |
| `colorsBackgroundBgTertiary` | `--color-bg-tertiary` | `bg-bg-tertiary` |
| `colorsBackgroundBgBrandPrimary` | `--color-bg-brand-primary` | `bg-bg-brand-primary` |
| `colorsBackgroundBgErrorSecondary` | `--color-bg-error-secondary` | `bg-bg-error-secondary` |
| `colorsBackgroundBgWarningPrimary` | `--color-bg-warning-primary` | `bg-bg-warning-primary` |
| `colorsBackgroundBgWarningSecondary` | `--color-bg-warning-secondary` | `bg-bg-warning-secondary` |
| `colorsBackgroundBgSuccessPrimary` | `--color-bg-success-primary` | `bg-bg-success-primary` |
| `colorsBackgroundBgSuccessSecondary` | `--color-bg-success-secondary` | `bg-bg-success-secondary` |
| `colorsBackgroundBgBrandSolid` | `--color-bg-brand-solid` | `bg-bg-brand-solid` |
| `colorsBackgroundBgSecondarySolid` | `--color-bg-secondary-solid` | `bg-bg-secondary-solid` |
| `colorsBackgroundBgErrorSolid` | `--color-bg-error-solid` | `bg-bg-error-solid` |
| `colorsBackgroundBgWarningSolid` | `--color-bg-warning-solid` | `bg-bg-warning-solid` |
| `colorsBackgroundBgSuccessSolid` | `--color-bg-success-solid` | `bg-bg-success-solid` |
| `colorsBackgroundBgSecondaryHover` | `--color-bg-secondary-hover` | `bg-bg-secondary-hover` |
| `colorsBackgroundBgPrimaryHover` | `--color-bg-primary-hover` | `bg-bg-primary-hover` |
| `colorsBackgroundBgDisabled` | `--color-bg-disabled` | `bg-bg-disabled` |
| `colorsBackgroundBgActive` | `--color-bg-active` | `bg-bg-active` |
| `colorsBackgroundBgBrandSolidHover` | `--color-bg-brand-solid-hover` | `bg-bg-brand-solid-hover` |
| `colorsBackgroundBgErrorPrimary` | `--color-bg-error-primary` | `bg-bg-error-primary` |
| `colorsBackgroundBgBrandSecondary` | `--color-bg-brand-secondary` | `bg-bg-brand-secondary` |
| `colorsBackgroundBgSecondary` | `--color-bg-secondary` | `bg-bg-secondary` |
| `colorsBackgroundBgDisabledSubtle` | `--color-bg-disabled-subtle` | `bg-bg-disabled-subtle` |
| `colorsBackgroundBgQuaternary` | `--color-bg-quaternary` | `bg-bg-quaternary` |
| `colorsBackgroundBgPrimaryAlt` | `--color-bg-primary-alt` | `bg-bg-primary-alt` |
| `colorsBackgroundBgBrandPrimaryAlt` | `--color-bg-brand-primary-alt` | `bg-bg-brand-primary-alt` |
| `colorsBackgroundBgSecondaryAlt` | `--color-bg-secondary-alt` | `bg-bg-secondary-alt` |
| `colorsBackgroundBgOverlay` | `--color-bg-overlay` | `bg-bg-overlay` |
| `colorsBackgroundBgSecondarySubtle` | `--color-bg-secondary-subtle` | `bg-bg-secondary-subtle` |
| `colorsBackgroundBgBrandSection` | `--color-bg-brand-section` | `bg-bg-brand-section` |
| `colorsBackgroundBgBrandSectionSubtle` | `--color-bg-brand-section-subtle` | `bg-bg-brand-section-subtle` |
| `colorsBackgroundBgPrimarySolid` | `--color-bg-primary-solid` | `bg-bg-primary-solid` |
| `colorsBackgroundBgErrorSolidHover` | `--color-bg-error-solid-hover` | `bg-bg-error-solid-hover` |


### Text

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `colorsTextTextPrimary900` | `--color-text-primary-900` | `text-text-primary-900` |
| `colorsTextTextTertiary600` | `--color-text-tertiary-600` | `text-text-tertiary-600` |
| `colorsTextTextErrorPrimary600` | `--color-text-error-primary-600` | `text-text-error-primary-600` |
| `colorsTextTextWarningPrimary600` | `--color-text-warning-primary-600` | `text-text-warning-primary-600` |
| `colorsTextTextSuccessPrimary600` | `--color-text-success-primary-600` | `text-text-success-primary-600` |
| `colorsTextTextWhite` | `--color-text-white` | `text-text-white` |
| `colorsTextTextSecondary700` | `--color-text-secondary-700` | `text-text-secondary-700` |
| `colorsTextTextDisabled` | `--color-text-disabled` | `text-text-disabled` |
| `colorsTextTextSecondaryHover` | `--color-text-secondary-hover` | `text-text-secondary-hover` |
| `colorsTextTextTertiaryHover` | `--color-text-tertiary-hover` | `text-text-tertiary-hover` |
| `colorsTextTextBrandSecondary700` | `--color-text-brand-secondary-700` | `text-text-brand-secondary-700` |
| `colorsTextTextPlaceholder` | `--color-text-placeholder` | `text-text-placeholder` |
| `colorsTextTextPlaceholderSubtle` | `--color-text-placeholder-subtle` | `text-text-placeholder-subtle` |
| `colorsTextTextBrandTertiary600` | `--color-text-brand-tertiary-600` | `text-text-brand-tertiary-600` |
| `colorsTextTextQuaternary500` | `--color-text-quaternary-500` | `text-text-quaternary-500` |
| `colorsTextTextBrandPrimary900` | `--color-text-brand-primary-900` | `text-text-brand-primary-900` |
| `colorsTextTextPrimaryOnBrand` | `--color-text-primary-on-brand` | `text-text-primary-on-brand` |
| `colorsTextTextSecondaryOnBrand` | `--color-text-secondary-on-brand` | `text-text-secondary-on-brand` |
| `colorsTextTextTertiaryOnBrand` | `--color-text-tertiary-on-brand` | `text-text-tertiary-on-brand` |
| `colorsTextTextQuaternaryOnBrand` | `--color-text-quaternary-on-brand` | `text-text-quaternary-on-brand` |
| `colorsTextTextBrandTertiaryAlt` | `--color-text-brand-tertiary-alt` | `text-text-brand-tertiary-alt` |
| `colorsTextTextBrandSecondaryHover` | `--color-text-brand-secondary-hover` | `text-text-brand-secondary-hover` |
| `colorsTextTextErrorPrimaryHover` | `--color-text-error-primary-hover` | `text-text-error-primary-hover` |


### Foreground (icons / fills)

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `colorsForegroundFgSecondary700` | `--color-fg-secondary-700` | `text-fg-secondary-700 / fill-fg-secondary-700` |
| `colorsForegroundFgWarningPrimary` | `--color-fg-warning-primary` | `text-fg-warning-primary / fill-fg-warning-primary` |
| `colorsForegroundFgSuccessPrimary` | `--color-fg-success-primary` | `text-fg-success-primary / fill-fg-success-primary` |
| `colorsForegroundFgWhite` | `--color-fg-white` | `text-fg-white / fill-fg-white` |
| `colorsForegroundFgSuccessSecondary` | `--color-fg-success-secondary` | `text-fg-success-secondary / fill-fg-success-secondary` |
| `colorsForegroundFgSecondaryHover` | `--color-fg-secondary-hover` | `text-fg-secondary-hover / fill-fg-secondary-hover` |
| `colorsForegroundFgPrimary900` | `--color-fg-primary-900` | `text-fg-primary-900 / fill-fg-primary-900` |
| `colorsForegroundFgDisabled` | `--color-fg-disabled` | `text-fg-disabled / fill-fg-disabled` |
| `colorsForegroundFgBrandSecondary500` | `--color-fg-brand-secondary-500` | `text-fg-brand-secondary-500 / fill-fg-brand-secondary-500` |
| `colorsForegroundFgBrandPrimary600` | `--color-fg-brand-primary-600` | `text-fg-brand-primary-600 / fill-fg-brand-primary-600` |
| `colorsForegroundFgQuaternary400` | `--color-fg-quaternary-400` | `text-fg-quaternary-400 / fill-fg-quaternary-400` |
| `colorsForegroundFgQuaternaryHover` | `--color-fg-quaternary-hover` | `text-fg-quaternary-hover / fill-fg-quaternary-hover` |
| `colorsForegroundFgErrorPrimary` | `--color-fg-error-primary` | `text-fg-error-primary / fill-fg-error-primary` |
| `colorsForegroundFgDisabledSubtle` | `--color-fg-disabled-subtle` | `text-fg-disabled-subtle / fill-fg-disabled-subtle` |
| `colorsForegroundFgWarningSecondary` | `--color-fg-warning-secondary` | `text-fg-warning-secondary / fill-fg-warning-secondary` |
| `colorsForegroundFgErrorSecondary` | `--color-fg-error-secondary` | `text-fg-error-secondary / fill-fg-error-secondary` |
| `colorsForegroundFgTertiary600` | `--color-fg-tertiary-600` | `text-fg-tertiary-600 / fill-fg-tertiary-600` |
| `colorsForegroundFgTertiaryHover` | `--color-fg-tertiary-hover` | `text-fg-tertiary-hover / fill-fg-tertiary-hover` |
| `colorsForegroundFgBrandPrimaryAlt` | `--color-fg-brand-primary-alt` | `text-fg-brand-primary-alt / fill-fg-brand-primary-alt` |
| `colorsForegroundFgBrandSecondaryAlt` | `--color-fg-brand-secondary-alt` | `text-fg-brand-secondary-alt / fill-fg-brand-secondary-alt` |
| `colorsForegroundFgBrandSecondaryHover` | `--color-fg-brand-secondary-hover` | `text-fg-brand-secondary-hover / fill-fg-brand-secondary-hover` |


### Border

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `colorsBorderBorderSecondary` | `--color-border-secondary` | `border-border-secondary` |
| `colorsBorderBorderErrorSubtle` | `--color-border-error-subtle` | `border-border-error-subtle` |
| `colorsBorderBorderPrimary` | `--color-border-primary` | `border-border-primary` |
| `colorsBorderBorderBrand` | `--color-border-brand` | `border-border-brand` |
| `colorsBorderBorderDisabled` | `--color-border-disabled` | `border-border-disabled` |
| `colorsBorderBorderError` | `--color-border-error` | `border-border-error` |
| `colorsBorderBorderDisabledSubtle` | `--color-border-disabled-subtle` | `border-border-disabled-subtle` |
| `colorsBorderBorderTertiary` | `--color-border-tertiary` | `border-border-tertiary` |
| `colorsBorderBorderBrandAlt` | `--color-border-brand-alt` | `border-border-brand-alt` |
| `colorsBorderBorderSecondaryAlt` | `--color-border-secondary-alt` | `border-border-secondary-alt` |


## Effects

### Focus Rings

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `colorsEffectsFocusRingsFocusRing` | `--focus-ring` | `—` |
| `colorsEffectsFocusRingsFocusRingError` | `--focus-ring-error` | `—` |


### Shadows

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `colorsEffectsShadowsShadowXs` | `--shadow-xs` | `shadow-xs` |
| `colorsEffectsShadowsShadowSm02` | `--shadow-sm-02` | `shadow-sm-02` |
| `colorsEffectsShadowsShadowLg01` | `--shadow-lg-01` | `shadow-lg-01` |
| `colorsEffectsShadowsShadowLg02` | `--shadow-lg-02` | `shadow-lg-02` |
| `colorsEffectsShadowsShadowSm01` | `--shadow-sm-01` | `shadow-sm-01` |
| `colorsEffectsShadowsShadow3xl01` | `--shadow-3xl-01` | `shadow-3xl-01` |
| `colorsEffectsShadowsShadow2xl01` | `--shadow-2xl-01` | `shadow-2xl-01` |
| `colorsEffectsShadowsShadowMd01` | `--shadow-md-01` | `shadow-md-01` |
| `colorsEffectsShadowsShadowMd02` | `--shadow-md-02` | `shadow-md-02` |
| `colorsEffectsShadowsShadowXl01` | `--shadow-xl-01` | `shadow-xl-01` |
| `colorsEffectsShadowsShadowXl02` | `--shadow-xl-02` | `shadow-xl-02` |
| `colorsEffectsShadowsShadowSkeumorphicInner` | `--shadow-skeumorphic-inner` | `shadow-skeumorphic-inner` |
| `colorsEffectsShadowsShadowSkeumorphicInnerBorder` | `--shadow-skeumorphic-inner-border` | `shadow-skeumorphic-inner-border` |
| `colorsEffectsShadowsShadowLg03` | `--shadow-lg-03` | `shadow-lg-03` |
| `colorsEffectsShadowsShadowXl03` | `--shadow-xl-03` | `shadow-xl-03` |
| `colorsEffectsShadowsShadow2xl02` | `--shadow-2xl-02` | `shadow-2xl-02` |
| `colorsEffectsShadowsShadow3xl02` | `--shadow-3xl-02` | `shadow-3xl-02` |


## Spacing

### Spacing scale

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `spacingNone` | `--spacing-none` | `p-none / m-none / gap-none` |
| `spacingXxs` | `--spacing-xxs` | `p-xxs / m-xxs / gap-xxs` |
| `spacingXs` | `--spacing-xs` | `p-xs / m-xs / gap-xs` |
| `spacingMd` | `--spacing-md` | `p-md / m-md / gap-md` |
| `spacingLg` | `--spacing-lg` | `p-lg / m-lg / gap-lg` |
| `spacingXl` | `--spacing-xl` | `p-xl / m-xl / gap-xl` |
| `spacing2xl` | `--spacing-2xl` | `p-2xl / m-2xl / gap-2xl` |
| `spacing3xl` | `--spacing-3xl` | `p-3xl / m-3xl / gap-3xl` |
| `spacing4xl` | `--spacing-4xl` | `p-4xl / m-4xl / gap-4xl` |
| `spacing6xl` | `--spacing-6xl` | `p-6xl / m-6xl / gap-6xl` |
| `spacing7xl` | `--spacing-7xl` | `p-7xl / m-7xl / gap-7xl` |
| `spacing8xl` | `--spacing-8xl` | `p-8xl / m-8xl / gap-8xl` |
| `spacing9xl` | `--spacing-9xl` | `p-9xl / m-9xl / gap-9xl` |
| `spacing10xl` | `--spacing-10xl` | `p-10xl / m-10xl / gap-10xl` |
| `spacing11xl` | `--spacing-11xl` | `p-11xl / m-11xl / gap-11xl` |
| `spacingSm` | `--spacing-sm` | `p-sm / m-sm / gap-sm` |
| `spacing5xl` | `--spacing-5xl` | `p-5xl / m-5xl / gap-5xl` |


## Border Radius

### Radius scale

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `radiusNone` | `--radius-none` | `rounded-none` |
| `radiusXxs` | `--radius-xxs` | `rounded-xxs` |
| `radiusXs` | `--radius-xs` | `rounded-xs` |
| `radiusSm` | `--radius-sm` | `rounded-sm` |
| `radiusMd` | `--radius-md` | `rounded-md` |
| `radiusXl` | `--radius-xl` | `rounded-xl` |
| `radius2xl` | `--radius-2xl` | `rounded-2xl` |
| `radius4xl` | `--radius-4xl` | `rounded-4xl` |
| `radiusFull` | `--radius-full` | `rounded-full` |
| `radiusLg` | `--radius-lg` | `rounded-lg` |
| `radius3xl` | `--radius-3xl` | `rounded-3xl` |


## Widths & Containers

### Width breakpoints

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `widthXxs` | `--width-xxs` | `—` |
| `widthSm` | `--width-sm` | `—` |
| `widthLg` | `--width-lg` | `—` |
| `widthXl` | `--width-xl` | `—` |
| `width2xl` | `--width-2xl` | `—` |
| `width3xl` | `--width-3xl` | `—` |
| `width4xl` | `--width-4xl` | `—` |
| `width5xl` | `--width-5xl` | `—` |
| `width6xl` | `--width-6xl` | `—` |
| `widthMd` | `--width-md` | `—` |
| `paragraphMaxWidth` | `--paragraph-max-width` | `—` |
| `widthXs` | `--width-xs` | `—` |


### Container

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `containerMaxWidthDesktop` | `--container-max-width-desktop` | `—` |
| `containerPaddingDesktop` | `--container-padding-desktop` | `—` |
| `containerPaddingMobile` | `--container-padding-mobile` | `—` |


## Typography

### Font size — text

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `fontSizeTextXs` | `--font-size-text-xs` | `text-text-xs` |
| `fontSizeTextSm` | `--font-size-text-sm` | `text-text-sm` |
| `fontSizeTextMd` | `--font-size-text-md` | `text-text-md` |
| `fontSizeTextLg` | `--font-size-text-lg` | `text-text-lg` |
| `fontSizeTextXl` | `--font-size-text-xl` | `text-text-xl` |
| `fontSizeTextXxs` | `--font-size-text-xxs` | `text-text-xxs` |


### Font size — display

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `fontSizeDisplayXs` | `--font-size-display-xs` | `text-display-xs` |
| `fontSizeDisplaySm` | `--font-size-display-sm` | `text-display-sm` |
| `fontSizeDisplayMd` | `--font-size-display-md` | `text-display-md` |
| `fontSizeDisplayLg` | `--font-size-display-lg` | `text-display-lg` |
| `fontSizeDisplayXl` | `--font-size-display-xl` | `text-display-xl` |
| `fontSizeDisplay2xl` | `--font-size-display-2xl` | `text-display-2xl` |
| `fontSizeDisplayXxs` | `--font-size-display-xxs` | `text-display-xxs` |
| `fontSizeDisplayXxxs` | `--font-size-display-xxxs` | `text-display-xxxs` |


### Line height — text

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `lineHeightTextXs` | `--line-height-text-xs` | `—` |
| `lineHeightTextSm` | `--line-height-text-sm` | `—` |
| `lineHeightTextMd` | `--line-height-text-md` | `—` |
| `lineHeightTextLg` | `--line-height-text-lg` | `—` |
| `lineHeightTextXl` | `--line-height-text-xl` | `—` |
| `lineHeightTextXxs` | `--line-height-text-xxs` | `—` |


### Line height — display

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `lineHeightDisplayXs` | `--line-height-display-xs` | `—` |
| `lineHeightDisplaySm` | `--line-height-display-sm` | `—` |
| `lineHeightDisplayMd` | `--line-height-display-md` | `—` |
| `lineHeightDisplayLg` | `--line-height-display-lg` | `—` |
| `lineHeightDisplayXl` | `--line-height-display-xl` | `—` |
| `lineHeightDisplay2xl` | `--line-height-display-2xl` | `—` |
| `lineHeightDisplayXxs` | `--line-height-display-xxs` | `—` |
| `lineHeightDisplayXxxs` | `--line-height-display-xxxs` | `—` |


### Font families

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `fontFamilyFontFamilyDisplay` | `--font-family-display` | `—` |
| `fontFamilyFontFamilyBody` | `--font-family-body` | `—` |


### Font weights

| Figma key | CSS variable | Tailwind class |
|---|---|---|
| `fontWeightRegular` | `--font-weight-regular` | `—` |
| `fontWeightRegularItalic` | `--font-weight-regular-italic` | `—` |
| `fontWeightMedium` | `--font-weight-medium` | `—` |
| `fontWeightMediumItalic` | `--font-weight-medium-italic` | `—` |
| `fontWeightSemibold` | `--font-weight-semibold` | `—` |
| `fontWeightSemiboldItalic` | `--font-weight-semibold-italic` | `—` |
| `fontWeightBold` | `--font-weight-bold` | `—` |
| `fontWeightBoldItalic` | `--font-weight-bold-italic` | `—` |


---

## Utility Palette

The component utility scales (brand, gray, error, warning, success, purple, yellow, and extended
colors: blue, indigo, orange, pink, etc.) are available as `--color-utility-{name}-{step}` CSS
variables and as `bg-utility-{name}-{step}` / `text-utility-{name}-{step}` Tailwind classes.

See `tokens.css` for the complete list.
