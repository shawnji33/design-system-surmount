# Surmount Design System — Token Audit

> **Source:** `design-system.json` (exported from Figma)
> **Date audited:** 2026-04-18
> **Status:** Audit only — no code generated yet

---

## Table of Contents

1. [Primitives — Color Scales](#1-primitives--color-scales)
2. [Primitives — Raw Spacing](#2-primitives--raw-spacing)
3. [Semantic Colors — Light vs Dark](#3-semantic-colors--light-vs-dark)
   - [Text](#31-text)
   - [Background](#32-background)
   - [Border](#33-border)
   - [Foreground](#34-foreground)
   - [Effects — Focus Rings](#35-effects--focus-rings)
   - [Effects — Shadows](#36-effects--shadows)
   - [Component Utility — Core Palette](#37-component-utility--core-palette)
   - [Component Utility — Extended Palette](#38-component-utility--extended-palette)
   - [Component Utility — Alpha](#39-component-utility--alpha)
   - [Component — Specific Components](#310-component--specific-components)
4. [Radius](#4-radius)
5. [Spacing (Semantic)](#5-spacing-semantic)
6. [Widths](#6-widths)
7. [Containers](#7-containers)
8. [Typography](#8-typography)
9. [Anomalies & Notes](#9-anomalies--notes)

---

## 1. Primitives — Color Scales

### Base

| Token | Value |
|---|---|
| `colorsBaseWhite` | `#ffffff` |
| `colorsBaseBlack` | `#000000` |
| `colorsBaseTransparent` | `#ffffff00` |

### Gray — Light Mode scale

| Step | Value |
|---|---|
| 25 | `#fcfcfc` |
| 50 | `#fafafa` |
| 100 | `#f5f5f5` |
| 200 | `#e9e9eb` |
| 300 | `#d5d6d9` |
| 400 | `#a3a7ae` |
| 500 | `#717680` |
| 600 | `#535861` |
| 700 | `#414651` |
| 800 | `#252b37` |
| 900 | `#181d27` |
| 950 | `#0a0c12` |

### Gray — Dark Mode scale

| Step | Value |
|---|---|
| 25 | `#fafafa` |
| 50 | `#f7f7f7` |
| 100 | `#f0f0f1` |
| 200 | `#e9e9eb` |
| 300 | `#cecfd2` |
| 400 | `#94979c` |
| 500 | `#85888e` |
| 600 | `#61656c` |
| 700 | `#373a41` |
| 800 | `#22262f` |
| 900 | `#13161b` |
| 950 | `#0a0c12` |

### Brand (Blue)

| Step | Value |
|---|---|
| 25 | `#f7faff` |
| 50 | `#f1f6fd` |
| 100 | `#e0eaf9` |
| 200 | `#c8dbf5` |
| 300 | `#8eb8eb` |
| 400 | `#75a5e5` |
| 500 | `#5585dc` |
| 600 | `#406ad0` |
| 700 | `#3757be` |
| 800 | `#32499b` |
| 900 | `#2d3f7b` |
| 950 | `#1f294c` |

### Error (Red)

| Step | Value |
|---|---|
| 25 | `#fefafa` |
| 50 | `#fbf5f5` |
| 100 | `#f9eceb` |
| 200 | `#f3d7d5` |
| 300 | `#eabbb7` |
| 400 | `#db948e` |
| 500 | `#cb6f68` |
| 600 | `#b6544c` |
| 700 | `#98443d` |
| 800 | `#7e3b36` |
| 900 | `#6a3632` |
| 950 | `#391916` |

### Warning (Orange-Red)

| Step | Value |
|---|---|
| 25 | `#fffcf4` |
| 50 | `#fef7ee` |
| 100 | `#fdedd7` |
| 200 | `#f9d7af` |
| 300 | `#f5ba7c` |
| 400 | `#f19246` |
| 500 | `#ed7828` |
| 600 | `#de5b18` |
| 700 | `#b84416` |
| 800 | `#933819` |
| 900 | `#763018` |
| 950 | `#40160a` |

### Success (Green)

| Step | Value |
|---|---|
| 25 | `#f5fdf9` |
| 50 | `#eef7ee` |
| 100 | `#e4f4e5` |
| 200 | `#cbe7cc` |
| 300 | `#a2d3a5` |
| 400 | `#71b775` |
| 500 | `#4d9a51` |
| 600 | `#3b7e3f` |
| 700 | `#316434` |
| 800 | `#2b502e` |
| 900 | `#254227` |
| 950 | `#102312` |

### Purple

| Step | Value |
|---|---|
| 25 | `#faf9ff` |
| 50 | `#f3f3ff` |
| 100 | `#eae8fe` |
| 200 | `#d9d5fe` |
| 300 | `#bcb4fd` |
| 400 | `#9a89fb` |
| 500 | `#7959f8` |
| 600 | `#6838ee` |
| 700 | `#5925db` |
| 800 | `#4a1fb7` |
| 900 | `#3e1b96` |
| 950 | `#27115e` |

### Orange

| Step | Value |
|---|---|
| 25 | `#fef9f5` |
| 50 | `#fef5ed` |
| 100 | `#fcead7` |
| 200 | `#f8dbaf` |
| 300 | `#f7b279` |
| 400 | `#f38743` |
| 500 | `#ef681f` |
| 600 | `#df4f16` |
| 700 | `#b93814` |
| 800 | `#932f18` |
| 900 | `#762817` |
| 950 | `#501b0f` |

### Yellow

> ⚠️ Scale jumps from 100 directly to 200 with no missing values declared. Steps 25 missing.

| Step | Value |
|---|---|
| 25 | `#fefcf0` |
| 50 | `#fefbe8` |
| 100 | `#fdf7c3` |
| 200 | `#feee94` |
| 300 | `#fde272` |
| 400 | `#fac414` |
| 500 | `#eaa907` |
| 600 | `#ca8403` |
| 700 | `#a15b06` |
| 800 | `#85490d` |
| 900 | `#713b11` |
| 950 | `#542c0d` |

### Pink

> ⚠️ Steps 50 and 100 share the same value (`#fbe8f6`).

| Step | Value |
|---|---|
| 25 | `#fff9fc` |
| 50 | `#fbe8f6` ⚠️ |
| 100 | `#fbe8f6` ⚠️ |
| 200 | `#f8d2ee` |
| 300 | `#f4ade0` |
| 400 | `#ec7fca` |
| 500 | `#e153b0` |
| 600 | `#cf3392` |
| 700 | `#b32377` |
| 800 | `#942062` |
| 900 | `#7c1f53` |
| 950 | `#4b0c2f` |

---

## 2. Primitives — Raw Spacing

All values in `px`.

| Token | px |
|---|---|
| `spacing00px` | 0 |
| `spacing052px` | 2 |
| `spacing14px` | 4 |
| `spacing156px` | 6 |
| `spacing28px` | 8 |
| `spacing312px` | 12 |
| `spacing416px` | 16 |
| `spacing520px` | 20 |
| `spacing624px` | 24 |
| `spacing832px` | 32 |
| `spacing1040px` | 40 |
| `spacing1248px` | 48 |
| `spacing1664px` | 64 |
| `spacing2080px` | 80 |
| `spacing2496px` | 96 |
| `spacing32128px` | 128 |
| `spacing40160px` | 160 |
| `spacing48192px` | 192 |
| `spacing56224px` | 224 |
| `spacing64256px` | 256 |
| `spacing80320px` | 320 |
| `spacing96384px` | 384 |
| `spacing120480px` | 480 |
| `spacing140560px` | 560 |
| `spacing160640px` | 640 |
| `spacing180720px` | 720 |
| `spacing192768px` | 768 |
| `spacing2561024px` | 1024 |
| `spacing3201280px` | 1280 |
| `spacing3601440px` | 1440 |
| `spacing4001600px` | 1600 |
| `spacing4801920px` | 1920 |

---

## 3. Semantic Colors — Light vs Dark

### 3.1 Text

| Token | Light | Dark |
|---|---|---|
| `colorsTextTextPrimary900` | `#0a0d12e5` | `#0a0d12e5` ⚠️ |
| `colorsTextTextSecondary700` | `#0a0d12b2` | `#0a0d12b2` ⚠️ |
| `colorsTextTextTertiary600` | `#0a0d1299` | `#0a0d1299` ⚠️ |
| `colorsTextTextQuaternary500` | `#0a0d127f` | `#0a0d127f` ⚠️ |
| `colorsTextTextDisabled` | `#0a0d1266` | `#85888e` |
| `colorsTextTextPlaceholder` | `#0a0d1266` | `#85888e` |
| `colorsTextTextPlaceholderSubtle` | `#0a0d124c` | `#373a41` |
| `colorsTextTextWhite` | `#ffffff` | `#ffffff` |
| `colorsTextTextSecondaryHover` | `#0a0d12cc` | `#0a0d12cc` ⚠️ |
| `colorsTextTextTertiaryHover` | `#0a0d12b2` | `#0a0d12b2` ⚠️ |
| `colorsTextTextBrandPrimary900` | `#2d3f7b` | `#f7f7f7` |
| `colorsTextTextBrandSecondary700` | `#3757be` | `#cecfd2` |
| `colorsTextTextBrandTertiary600` | `#406ad0` | `#94979c` |
| `colorsTextTextBrandTertiaryAlt` | `#406ad0` | `#f7f7f7` |
| `colorsTextTextBrandSecondaryHover` | `#32499b` | `#e9e9eb` |
| `colorsTextTextErrorPrimary600` | `#b6544c` | `#db948e` |
| `colorsTextTextErrorPrimaryHover` | `#98443d` | `#eabbb7` |
| `colorsTextTextWarningPrimary600` | `#de5b18` | `#f19246` |
| `colorsTextTextSuccessPrimary600` | `#3b7e3f` | `#71b775` |
| `colorsTextTextPrimaryOnBrand` | `#ffffff` | `#0a0d12e5` |
| `colorsTextTextSecondaryOnBrand` | `#c8dbf5` | `#cecfd2` |
| `colorsTextTextTertiaryOnBrand` | `#c8dbf5` | `#94979c` |
| `colorsTextTextQuaternaryOnBrand` | `#8eb8eb` | `#94979c` |

> ⚠️ `TextPrimary900`, `TextSecondary700`, `TextTertiary600`, `TextQuaternary500`, `TextSecondaryHover`, `TextTertiaryHover` are **identical in light and dark** — these are dark alpha values that will render incorrectly on a dark background. Likely a Figma export issue.

### 3.2 Background

| Token | Light | Dark |
|---|---|---|
| `colorsBackgroundBgPrimary` | `#ffffff` | `#0a0c12` |
| `colorsBackgroundBgPrimaryAlt` | `#ffffff` | `#fafafa` |
| `colorsBackgroundBgPrimarySolid` | `#0a0c12` | `#fafafa` |
| `colorsBackgroundBgPrimaryHover` | `#fafafa` | `#22262f` |
| `colorsBackgroundBgSecondary` | `#fafafa` | `#13161b` |
| `colorsBackgroundBgSecondaryAlt` | `#fafafa` | `#ffffff` |
| `colorsBackgroundBgSecondarySubtle` | `#fcfcfc` | `#13161b` |
| `colorsBackgroundBgSecondaryHover` | `#f5f5f5` | `#22262f` |
| `colorsBackgroundBgTertiary` | `#f5f5f5` | `#22262f` |
| `colorsBackgroundBgQuaternary` | `#e9e9eb` | `#373a41` |
| `colorsBackgroundBgActive` | `#fafafa` | `#22262f` |
| `colorsBackgroundBgDisabled` | `#f5f5f5` | `#22262f` |
| `colorsBackgroundBgDisabledSubtle` | `#fafafa` | `#13161b` |
| `colorsBackgroundBgOverlay` | `#0a0c12` | `#22262f` |
| `colorsBackgroundBgBrandPrimary` | `#f1f6fd` | `#5585dc` |
| `colorsBackgroundBgBrandPrimaryAlt` | `#f1f6fd` | `#fafafa` |
| `colorsBackgroundBgBrandSecondary` | `#e0eaf9` | `#406ad0` |
| `colorsBackgroundBgBrandSolid` | `#406ad0` | `#406ad0` |
| `colorsBackgroundBgBrandSolidHover` | `#3757be` | `#5585dc` |
| `colorsBackgroundBgBrandSection` | `#32499b` | `#fafafa` |
| `colorsBackgroundBgBrandSectionSubtle` | `#3757be` | `#ffffff` |
| `colorsBackgroundBgSecondarySolid` | `#535861` | `#373a41` |
| `colorsBackgroundBgErrorPrimary` | `#fbf5f5` | `#391916` |
| `colorsBackgroundBgErrorSecondary` | `#f9eceb` | `#b6544c` |
| `colorsBackgroundBgErrorSolid` | `#b6544c` | `#b6544c` |
| `colorsBackgroundBgErrorSolidHover` | `#98443d` | `#cb6f68` |
| `colorsBackgroundBgWarningPrimary` | `#fef7ee` | `#40160a` |
| `colorsBackgroundBgWarningSecondary` | `#fdedd7` | `#de5b18` |
| `colorsBackgroundBgWarningSolid` | `#de5b18` | `#de5b18` |
| `colorsBackgroundBgSuccessPrimary` | `#eef7ee` | `#102312` |
| `colorsBackgroundBgSuccessSecondary` | `#e4f4e5` | `#3b7e3f` |
| `colorsBackgroundBgSuccessSolid` | `#3b7e3f` | `#3b7e3f` |

### 3.3 Border

| Token | Light | Dark |
|---|---|---|
| `colorsBorderBorderPrimary` | `#00000016` | `#373a41` |
| `colorsBorderBorderSecondary` | `#00000010` | `#22262f` |
| `colorsBorderBorderSecondaryAlt` | `#00000011` | `#22262f` |
| `colorsBorderBorderTertiary` | `#0000000a` | `#22262f` |
| `colorsBorderBorderBrand` | `#5585dc` | `#75a5e5` |
| `colorsBorderBorderBrandAlt` | `#406ad0` | `#373a41` |
| `colorsBorderBorderError` | `#cb6f68` | `#db948e` |
| `colorsBorderBorderErrorSubtle` | `#eabbb7` | `#cb6f68` |
| `colorsBorderBorderDisabled` | `#00000005` | `#373a41` |
| `colorsBorderBorderDisabledSubtle` | `#e9e9eb` | `#22262f` |

### 3.4 Foreground

| Token | Light | Dark |
|---|---|---|
| `colorsForegroundFgPrimary900` | `#181d27` | `#ffffff` |
| `colorsForegroundFgSecondary700` | `#414651` | `#cecfd2` |
| `colorsForegroundFgSecondaryHover` | `#252b37` | `#e9e9eb` |
| `colorsForegroundFgTertiary600` | `#535861` | `#94979c` |
| `colorsForegroundFgTertiaryHover` | `#414651` | `#cecfd2` |
| `colorsForegroundFgQuaternary400` | `#a3a7ae` | `#61656c` |
| `colorsForegroundFgQuaternaryHover` | `#717680` | `#85888e` |
| `colorsForegroundFgDisabled` | `#a3a7ae` | `#85888e` |
| `colorsForegroundFgDisabledSubtle` | `#d5d6d9` | `#61656c` |
| `colorsForegroundFgWhite` | `#ffffff` | `#ffffff` |
| `colorsForegroundFgBrandPrimary600` | `#406ad0` | `#5585dc` |
| `colorsForegroundFgBrandPrimaryAlt` | `#406ad0` | `#cecfd2` |
| `colorsForegroundFgBrandSecondary500` | `#5585dc` | `#5585dc` |
| `colorsForegroundFgBrandSecondaryAlt` | `#5585dc` | `#61656c` |
| `colorsForegroundFgBrandSecondaryHover` | `#406ad0` | `#85888e` |
| `colorsForegroundFgErrorPrimary` | `#b6544c` | `#cb6f68` |
| `colorsForegroundFgErrorSecondary` | `#cb6f68` | `#db948e` |
| `colorsForegroundFgWarningPrimary` | `#de5b18` | `#ed7828` |
| `colorsForegroundFgWarningSecondary` | `#ed7828` | `#f19246` |
| `colorsForegroundFgSuccessPrimary` | `#3b7e3f` | `#4d9a51` |
| `colorsForegroundFgSuccessSecondary` | `#4d9a51` | `#71b775` |

### 3.5 Effects — Focus Rings

| Token | Light | Dark |
|---|---|---|
| `colorsEffectsFocusRingsFocusRing` | `#5585dc` | `#5585dc` |
| `colorsEffectsFocusRingsFocusRingError` | `#cb6f68` | `#cb6f68` |

### 3.6 Effects — Shadows

> ⚠️ All standard shadows are `#ffffff00` (fully transparent) in dark mode. Dark UIs intentionally use no shadows.

| Token | Light | Dark |
|---|---|---|
| `colorsEffectsShadowsShadowXs` | `#0a0c120c` | `#ffffff00` |
| `colorsEffectsShadowsShadowSm01` | `#0a0c1219` | `#ffffff00` |
| `colorsEffectsShadowsShadowSm02` | `#0a0c1219` | `#ffffff00` |
| `colorsEffectsShadowsShadowMd01` | `#0a0c1219` | `#ffffff00` |
| `colorsEffectsShadowsShadowMd02` | `#0a0c120f` | `#ffffff00` |
| `colorsEffectsShadowsShadowLg01` | `#0a0c1214` | `#ffffff00` |
| `colorsEffectsShadowsShadowLg02` | `#0a0c1207` | `#ffffff00` |
| `colorsEffectsShadowsShadowLg03` | `#0a0c120a` | `#ffffff00` |
| `colorsEffectsShadowsShadowXl01` | `#0a0c1214` | `#ffffff00` |
| `colorsEffectsShadowsShadowXl02` | `#0a0c1207` | `#ffffff00` |
| `colorsEffectsShadowsShadowXl03` | `#0a0c120a` | `#ffffff00` |
| `colorsEffectsShadowsShadow2xl01` | `#0a0c122d` | `#ffffff00` |
| `colorsEffectsShadowsShadow2xl02` | `#0a0c120a` | `#ffffff00` |
| `colorsEffectsShadowsShadow3xl01` | `#0a0c1223` | `#ffffff00` |
| `colorsEffectsShadowsShadow3xl02` | `#0a0c120a` | `#ffffff00` |
| `colorsEffectsShadowsShadowSkeumorphicInner` | `#0a0c120c` | `#0c0e120c` |
| `colorsEffectsShadowsShadowSkeumorphicInnerBorder` | `#0a0c122d` | `#0c0e122d` |
| `colorsEffectsPortfolioMockupsShadowMainCentreMd` | `#0a0c1223` | `#ffffff00` |
| `colorsEffectsPortfolioMockupsShadowMainCentreLg` | `#0a0c122d` | `#ffffff00` |
| `colorsEffectsPortfolioMockupsShadowOverlayLg` | `#0a0c121e` | `#ffffff00` |
| `colorsEffectsPortfolioMockupsShadowGridMd` | `#0a0c1214` | `#ffffff00` |

### 3.7 Component Utility — Core Palette

Each family has steps 50–700 (plus 200 and 300 for all), with light and dark values.

#### Utility Brand

| Step | Light | Dark |
|---|---|---|
| 50 | `#f1f6fd` | `#1f294c` |
| 100 | `#e0eaf9` | `#2d3f7b` |
| 200 | `#c8dbf5` | `#32499b` |
| 300 | `#8eb8eb` | `#3757be` |
| 400 | `#75a5e5` | `#406ad0` |
| 500 | `#5585dc` | `#5585dc` |
| 600 | `#406ad0` | `#75a5e5` |
| 700 | `#3757be` | `#8eb8eb` |
| 800 | `#32499b` | `#c8dbf5` |
| 900 | `#2d3f7b` | `#e0eaf9` |

> Note: Brand scale is fully inverted in dark mode.

#### Utility Brand — Alt variants

| Step | Light | Dark |
|---|---|---|
| 50 Alt | `#f1f6fd` | `#fafafa` |
| 100 Alt | `#e0eaf9` | `#f5f5f5` |
| 200 Alt | `#c8dbf5` | `#e9e9eb` |
| 300 Alt | `#8eb8eb` | `#d5d6d9` |
| 400 Alt | `#75a5e5` | `#a3a7ae` |
| 500 Alt | `#5585dc` | `#717680` |
| 600 Alt | `#406ad0` | `#535861` |
| 700 Alt | `#3757be` | `#414651` |
| 800 Alt | `#32499b` | `#252b37` |
| 900 Alt | `#2d3f7b` | `#181d27` |

> Note: Alt variants map to gray scale in dark mode.

#### Utility Gray

| Step | Light | Dark |
|---|---|---|
| 50 | `#fafafa` | `#13161b` |
| 100 | `#f5f5f5` | `#22262f` |
| 200 | `#e9e9eb` | `#373a41` |
| 300 | `#d5d6d9` | `#373a41` |
| 400 | `#a3a7ae` | `#61656c` |
| 500 | `#717680` | `#85888e` |
| 600 | `#535861` | `#94979c` |
| 700 | `#414651` | `#cecfd2` |
| 800 | `#252b37` | `#e9e9eb` |
| 900 | `#181d27` | `#f0f0f1` |

#### Utility Error

| Step | Light | Dark |
|---|---|---|
| 50 | `#fbf5f5` | `#391916` |
| 100 | `#f9eceb` | `#6a3632` |
| 200 | `#f3d7d5` | `#7e3b36` |
| 300 | `#eabbb7` | `#98443d` |
| 400 | `#db948e` | `#b6544c` |
| 500 | `#cb6f68` | `#cb6f68` |
| 600 | `#b6544c` | `#db948e` |
| 700 | `#98443d` | `#eabbb7` |

#### Utility Warning

| Step | Light | Dark |
|---|---|---|
| 50 | `#fef7ee` | `#40160a` |
| 100 | `#fdedd7` | `#763018` |
| 200 | `#f9d7af` | `#933819` |
| 300 | `#f5ba7c` | `#b84416` |
| 400 | `#f19246` | `#de5b18` |
| 500 | `#ed7828` | `#ed7828` |
| 600 | `#de5b18` | `#f19246` |
| 700 | `#b84416` | `#f5ba7c` |

#### Utility Success

| Step | Light | Dark |
|---|---|---|
| 50 | `#eef7ee` | `#102312` |
| 100 | `#e4f4e5` | `#254227` |
| 200 | `#cbe7cc` | `#2b502e` |
| 300 | `#a2d3a5` | `#316434` |
| 400 | `#71b775` | `#3b7e3f` |
| 500 | `#4d9a51` | `#4d9a51` |
| 600 | `#3b7e3f` | `#71b775` |
| 700 | `#316434` | `#a2d3a5` |

#### Utility Purple

| Step | Light | Dark |
|---|---|---|
| 50 | `#f3f3ff` | `#27115e` |
| 100 | `#eae8fe` | `#3e1b96` |
| 200 | `#d9d5fe` | `#4a1fb7` |
| 300 | `#bcb4fd` | `#5925db` |
| 400 | `#9a89fb` | `#6838ee` |
| 500 | `#7959f8` | `#7959f8` |
| 600 | `#6838ee` | `#9a89fb` |
| 700 | `#5925db` | `#bcb4fd` |

#### Utility Yellow

> ⚠️ Dark mode scale is fully inverted (950→50 direction) relative to light mode.

| Step | Light | Dark |
|---|---|---|
| 50 | `#fefbe8` | `#542c0d` |
| 100 | `#fdf7c3` | `#713b11` |
| 200 | `#feee94` | `#85490d` |
| 300 | `#fde272` | `#a15b06` |
| 400 | `#fac414` | `#ca8403` |
| 500 | `#eaa907` | `#eaa907` |
| 600 | `#ca8403` | `#fac414` |
| 700 | `#a15b06` | `#fde272` |

### 3.8 Component Utility — Extended Palette

These are accent/extended colors used for badges, tags, and illustrations. Light and dark values may not always be inverses.

#### Utility GrayBlue

| Step | Light | Dark |
|---|---|---|
| 50 | `#f8f8fb` | `#0d0f1b` |
| 100 | `#eaebf5` | `#101222` |
| 200 | `#d5d8eb` | `#283056` |
| 400 | `#707abc` | `#3e4783` |
| 500 | `#4e5aa6` | `#4e5aa6` |
| 600 | `#3e4783` | `#707abc` |
| 700 | `#353e72` | `#b2b8db` |

#### Utility Blue

| Step | Light | Dark |
|---|---|---|
| 50 | `#eff8ff` | `#102955` |
| 100 | `#d1e9ff` | `#194084` |
| 200 | `#b2ddff` | `#1849a9` |
| 400 | `#53b0fd` | `#156fee` |
| 500 | `#2e90fa` | `#2e90fa` |
| 600 | `#156fee` | `#53b0fd` |
| 700 | `#175cd3` | `#84caff` |

#### Utility BlueLight

| Step | Light | Dark |
|---|---|---|
| 50 | `#f0f9ff` | `#062b40` |
| 100 | `#dff2fe` | `#0a4a6f` |
| 200 | `#b9e5fd` | `#055986` |
| 400 | `#36bff9` | `#0085c9` |
| 500 | `#0ba4eb` | `#0ba4eb` |
| 700 | `#016aa2` | `#7bd4fd` |

#### Utility BlueDark

| Step | Light | Dark |
|---|---|---|
| 600 | `#155dee` | `#518bff` |

#### Utility Indigo

| Step | Light | Dark |
|---|---|---|
| 50 | `#eef3ff` | `#1f235b` |
| 100 | `#dfeaff` | `#2c3282` |
| 200 | `#c6d7fe` | `#2d31a5` |
| 400 | `#7f98f9` | `#444ce6` |
| 500 | `#6071f3` | `#6071f3` |
| 600 | `#444ce6` | `#7f98f9` |
| 700 | `#3537cc` | `#a3bbfd` |

#### Utility Orange

| Step | Light | Dark |
|---|---|---|
| 50 | `#fef5ed` | `#501b0f` |
| 100 | `#fcead7` | `#762817` |
| 200 | `#f8dbaf` | `#932f18` |
| 400 | `#f38743` | `#df4f16` |
| 500 | `#ef681f` | `#ef681f` |
| 700 | `#b93814` | `#f7b279` |

#### Utility Pink

| Step | Light | Dark |
|---|---|---|
| 50 | `#fbe8f6` | `#4b0c2f` |
| 100 | `#fbe8f6` | `#7c1f53` |
| 200 | `#f8d2ee` | `#942062` |
| 400 | `#ec7fca` | `#cf3392` |
| 500 | `#e153b0` | `#e153b0` |
| 600 | `#cf3392` | `#ec7fca` |
| 700 | `#b32377` | `#f4ade0` |

### 3.9 Component Utility — Alpha

> Note: Alpha semantics are **inverted** in dark mode. `AlphaWhite` becomes a dark overlay in dark mode; `AlphaBlack` becomes a light overlay.

| Token | Light | Dark |
|---|---|---|
| `AlphaWhite10` | `#ffffff19` | `#0c0e1219` |
| `AlphaWhite20` | `#ffffff33` | `#0c0e1233` |
| `AlphaWhite30` | `#ffffff4c` | `#0c0e124c` |
| `AlphaWhite40` | `#ffffff66` | `#0c0e1266` |
| `AlphaWhite50` | `#ffffff7f` | `#0c0e127f` |
| `AlphaWhite60` | `#ffffff99` | `#0c0e1299` |
| `AlphaWhite70` | `#ffffffb2` | `#0c0e12b2` |
| `AlphaWhite80` | `#ffffffcc` | `#0c0e12cc` |
| `AlphaWhite90` | `#ffffffe5` | `#0c0e12e5` |
| `AlphaWhite100` | `#ffffff` | `#0a0c12` |
| `AlphaBlack10` | `#0a0d1219` | `#ffffff19` |
| `AlphaBlack20` | `#0a0d1233` | `#ffffff33` |
| `AlphaBlack30` | `#0a0d124c` | `#ffffff4c` |
| `AlphaBlack40` | `#0a0d1266` | `#ffffff66` |
| `AlphaBlack50` | `#0a0d127f` | `#ffffff7f` |
| `AlphaBlack60` | `#0a0d1299` | `#ffffff99` |
| `AlphaBlack70` | `#0a0d12b2` | `#ffffffb2` |
| `AlphaBlack80` | `#0a0d12cc` | `#ffffffcc` |
| `AlphaBlack90` | `#0a0d12e5` | `#ffffffe5` |
| `AlphaBlack100` | `#0a0d12` | `#ffffff` |

### 3.10 Component — Specific Components

| Token | Light | Dark |
|---|---|---|
| **Tooltips** | | |
| `TooltipSupportingText` | `#d5d6d9` | `#cecfd2` |
| **Text Editor** | | |
| `TextEditorIconFg` | `#a3a7ae` | `#94979c` |
| `TextEditorIconFgActive` | `#717680` | `#ffffff` |
| **Avatars** | | |
| `AvatarStylesBgNeutral` | `#e0e0e0` | `#e0e0e0` |
| **Icons — Featured** | | |
| `FeaturedIconLightFgBrand` | `#406ad0` | `#c8dbf5` |
| `FeaturedIconLightFgGray` | `#717680` | `#e9e9eb` |
| `FeaturedIconLightFgError` | `#b6544c` | `#f3d7d5` |
| `FeaturedIconLightFgWarning` | `#de5b18` | `#f9d7af` |
| `FeaturedIconLightFgSuccess` | `#3b7e3f` | `#cbe7cc` |
| **Icons** | | |
| `IconFgBrand` | `#406ad0` | `#94979c` |
| `IconFgBrandOnBrand` | `#c8dbf5` | `#94979c` |
| **Buttons** | | |
| `ButtonPrimaryIcon` | `#ffffff` | `#ffffff` |
| `ButtonPrimaryIconHover` | `#fafafa` | `#fafafa` |
| `ButtonDestructivePrimaryIcon` | `#eabbb7` | `#eabbb7` |
| `ButtonDestructivePrimaryIconHover` | `#f3d7d5` | `#f3d7d5` |
| **Toggles** | | |
| `ToggleBorder` | `#d5d6d9` | `#ffffff00` |
| `ToggleButtonFgDisabled` | `#fafafa` | `#61656c` |
| `ToggleSlimBorderPressed` | `#406ad0` | `#ffffff00` |
| `ToggleSlimBorderPressedHover` | `#3757be` | `#ffffff00` |
| **Sliders** | | |
| `SliderHandleBorder` | `#406ad0` | `#ffffff` |
| `SliderHandleBg` | `#ffffff` | `#406ad0` |
| **Mockups** | | |
| `ScreenMockupBorder` | `#181d27` | `#373a41` |
| **Footers** | | |
| `FooterButtonFg` | `#c8dbf5` | `#cecfd2` |
| `FooterButtonFgHover` | `#ffffff` | `#f0f0f1` |
| **App Store Badges** | | |
| `AppStoreBadgeBorder` | `#a6a6a6` | `#ffffff` |

---

## 4. Radius

| Token | px |
|---|---|
| `radiusNone` | 0 |
| `radiusXxs` | 2 |
| `radiusXs` | 4 |
| `radiusSm` | 6 |
| `radiusMd` | 8 |
| `radiusLg` | 10 |
| `radiusXl` | 12 |
| `radius2xl` | 16 |
| `radius3xl` | 20 |
| `radius4xl` | 24 |
| `radiusFull` | 9999 |

---

## 5. Spacing (Semantic)

| Token | px |
|---|---|
| `spacingNone` | 0 |
| `spacingXxs` | 2 |
| `spacingXs` | 4 |
| `spacingSm` | 6 |
| `spacingMd` | 8 |
| `spacingLg` | 12 |
| `spacingXl` | 16 |
| `spacing2xl` | 20 |
| `spacing3xl` | 24 |
| `spacing4xl` | 32 |
| `spacing5xl` | 40 |
| `spacing6xl` | 48 |
| `spacing7xl` | 64 |
| `spacing8xl` | 80 |
| `spacing9xl` | 96 |
| `spacing10xl` | 128 |
| `spacing11xl` | 160 |

> Note: There is no `spacingSm`=6 alias in the xs/sm/md naming logic — the scale jumps: `xs`=4, `sm`=6, `md`=8. The `sm` step exists but is squeezed between xs and md at a non-doubling increment.

---

## 6. Widths

| Token | px |
|---|---|
| `widthXxs` | 320 |
| `widthXs` | 384 |
| `widthSm` | 480 |
| `widthMd` | 560 |
| `widthLg` | 640 |
| `widthXl` | 768 |
| `width2xl` | 1024 |
| `width3xl` | 1280 |
| `width4xl` | 1440 |
| `width5xl` | 1600 |
| `width6xl` | 1920 |
| `paragraphMaxWidth` | 720 |

---

## 7. Containers

| Token | Value |
|---|---|
| `containerMaxWidthDesktop` | 1280px |
| `containerPaddingDesktop` | 32px |
| `containerPaddingMobile` | 16px |

> Note: Max width aligns with `width3xl` (1280px). No tablet breakpoint container padding defined.

---

## 8. Typography

### Font Families

| Role | Family |
|---|---|
| Display | Inter |
| Body | Geist |

### Font Weights

| Token | Value |
|---|---|
| `fontWeightRegular` | Regular |
| `fontWeightRegularItalic` | Regular italic |
| `fontWeightMedium` | Medium |
| `fontWeightMediumItalic` | Medium italic |
| `fontWeightSemibold` | Semibold |
| `fontWeightSemiboldItalic` | Semibold italic |
| `fontWeightBold` | Bold |
| `fontWeightBoldItalic` | Bold italic |

### Text Scale (body / UI copy)

| Step | Font size (px) | Line height (px) | Ratio |
|---|---|---|---|
| `xxs` | 10 | 13 | 1.30 |
| `xs` | 12 | 18 | 1.50 |
| `sm` | 14 | 20 | 1.43 |
| `md` | 16 | 24 | 1.50 |
| `lg` | 18 | 28 | 1.56 |
| `xl` | 20 | 30 | 1.50 |

### Display Scale (headings)

| Step | Font size (px) | Line height (px) | Ratio |
|---|---|---|---|
| `xxxs` | 18 | 24 | 1.33 |
| `xxs` | 20 | 26 | 1.30 |
| `xs` | 24 | 32 | 1.33 |
| `sm` | 30 | 38 | 1.27 |
| `md` | 36 | 44 | 1.22 |
| `lg` | 48 | 60 | 1.25 |
| `xl` | 60 | 72 | 1.20 |
| `2xl` | 72 | 90 | 1.25 |

> Note: Display scale has two sub-`xs` steps (`xxxs` and `xxs`) that overlap with the text `xl` size (20px). Worth confirming intended usage: `displayXxxs`=18px and `displayXxs`=20px are the same size as `textLg` and `textXl`. These may be intended as "large body" or "small heading" sizes.

---

## 9. Anomalies & Notes

| # | Location | Issue |
|---|---|---|
| 1 | `1ColorModes.lightMode` text tokens | `TextPrimary900`, `TextSecondary700`, `TextTertiary600`, `TextQuaternary500`, `TextSecondaryHover`, `TextTertiaryHover` have **identical hex values in both light and dark**. All use dark-base alpha (`#0a0d12xx`), which will render as near-invisible on dark backgrounds. Likely needs dark-mode overrides. |
| 2 | `primitives.style` Pink | `colorsPink50` and `colorsPink100` share the same hex value (`#fbe8f6`). No visual difference between these two stops. |
| 3 | `1ColorModes` shadows | All standard shadow tokens are `#ffffff00` in dark mode. This is intentional — dark UIs omit drop shadows — but confirm this is desired before removing shadow CSS. |
| 4 | `1ColorModes` Alpha | `AlphaWhite` and `AlphaBlack` semantics are **fully swapped** in dark mode. Ensure consumers reference the semantic token, not the primitive hex. |
| 5 | `6Typography` display | `displayXxxs` (18px) and `displayXxs` (20px) overlap with `textLg` (18px) and `textXl` (20px). Confirm whether these are meant to be the same ramp or separate semantic roles. |
| 6 | `5Containers` | No mobile max-width token — only padding. No tablet breakpoint. |
| 7 | `3Spacing` | No `spacing` steps between `spacing11xl` (160px) and the top of the raw primitive scale. Semantic spacing caps at 160px; larger layout values must reference primitives. |
