import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
  "bg": {
    "primary": "var(--color-bg-primary)",
    "tertiary": "var(--color-bg-tertiary)",
    "brand-primary": "var(--color-bg-brand-primary)",
    "error-secondary": "var(--color-bg-error-secondary)",
    "warning-primary": "var(--color-bg-warning-primary)",
    "warning-secondary": "var(--color-bg-warning-secondary)",
    "success-primary": "var(--color-bg-success-primary)",
    "success-secondary": "var(--color-bg-success-secondary)",
    "brand-solid": "var(--color-bg-brand-solid)",
    "secondary-solid": "var(--color-bg-secondary-solid)",
    "error-solid": "var(--color-bg-error-solid)",
    "warning-solid": "var(--color-bg-warning-solid)",
    "success-solid": "var(--color-bg-success-solid)",
    "secondary-hover": "var(--color-bg-secondary-hover)",
    "primary-hover": "var(--color-bg-primary-hover)",
    "disabled": "var(--color-bg-disabled)",
    "active": "var(--color-bg-active)",
    "brand-solid-hover": "var(--color-bg-brand-solid-hover)",
    "error-primary": "var(--color-bg-error-primary)",
    "brand-secondary": "var(--color-bg-brand-secondary)",
    "secondary": "var(--color-bg-secondary)",
    "disabled-subtle": "var(--color-bg-disabled-subtle)",
    "quaternary": "var(--color-bg-quaternary)",
    "primary-alt": "var(--color-bg-primary-alt)",
    "brand-primary-alt": "var(--color-bg-brand-primary-alt)",
    "secondary-alt": "var(--color-bg-secondary-alt)",
    "overlay": "var(--color-bg-overlay)",
    "secondary-subtle": "var(--color-bg-secondary-subtle)",
    "brand-section": "var(--color-bg-brand-section)",
    "brand-section-subtle": "var(--color-bg-brand-section-subtle)",
    "primary-solid": "var(--color-bg-primary-solid)",
    "error-solid-hover": "var(--color-bg-error-solid-hover)"
  },
  "fg": {
    "secondary-700": "var(--color-fg-secondary-700)",
    "warning-primary": "var(--color-fg-warning-primary)",
    "success-primary": "var(--color-fg-success-primary)",
    "white": "var(--color-fg-white)",
    "success-secondary": "var(--color-fg-success-secondary)",
    "secondary-hover": "var(--color-fg-secondary-hover)",
    "primary-900": "var(--color-fg-primary-900)",
    "disabled": "var(--color-fg-disabled)",
    "brand-secondary-500": "var(--color-fg-brand-secondary-500)",
    "brand-primary-600": "var(--color-fg-brand-primary-600)",
    "quaternary-400": "var(--color-fg-quaternary-400)",
    "quaternary-hover": "var(--color-fg-quaternary-hover)",
    "error-primary": "var(--color-fg-error-primary)",
    "disabled-subtle": "var(--color-fg-disabled-subtle)",
    "warning-secondary": "var(--color-fg-warning-secondary)",
    "error-secondary": "var(--color-fg-error-secondary)",
    "tertiary-600": "var(--color-fg-tertiary-600)",
    "tertiary-hover": "var(--color-fg-tertiary-hover)",
    "brand-primary-alt": "var(--color-fg-brand-primary-alt)",
    "brand-secondary-alt": "var(--color-fg-brand-secondary-alt)",
    "brand-secondary-hover": "var(--color-fg-brand-secondary-hover)"
  },
  "text": {
    "primary-900": "var(--color-text-primary-900)",
    "tertiary-600": "var(--color-text-tertiary-600)",
    "error-primary-600": "var(--color-text-error-primary-600)",
    "warning-primary-600": "var(--color-text-warning-primary-600)",
    "success-primary-600": "var(--color-text-success-primary-600)",
    "white": "var(--color-text-white)",
    "secondary-700": "var(--color-text-secondary-700)",
    "disabled": "var(--color-text-disabled)",
    "secondary-hover": "var(--color-text-secondary-hover)",
    "tertiary-hover": "var(--color-text-tertiary-hover)",
    "brand-secondary-700": "var(--color-text-brand-secondary-700)",
    "placeholder": "var(--color-text-placeholder)",
    "placeholder-subtle": "var(--color-text-placeholder-subtle)",
    "brand-tertiary-600": "var(--color-text-brand-tertiary-600)",
    "quaternary-500": "var(--color-text-quaternary-500)",
    "brand-primary-900": "var(--color-text-brand-primary-900)",
    "primary-on-brand": "var(--color-text-primary-on-brand)",
    "secondary-on-brand": "var(--color-text-secondary-on-brand)",
    "tertiary-on-brand": "var(--color-text-tertiary-on-brand)",
    "quaternary-on-brand": "var(--color-text-quaternary-on-brand)",
    "brand-tertiary-alt": "var(--color-text-brand-tertiary-alt)",
    "brand-secondary-hover": "var(--color-text-brand-secondary-hover)",
    "error-primary-hover": "var(--color-text-error-primary-hover)"
  },
  "border": {
    "secondary": "var(--color-border-secondary)",
    "error-subtle": "var(--color-border-error-subtle)",
    "primary": "var(--color-border-primary)",
    "brand": "var(--color-border-brand)",
    "disabled": "var(--color-border-disabled)",
    "error": "var(--color-border-error)",
    "disabled-subtle": "var(--color-border-disabled-subtle)",
    "tertiary": "var(--color-border-tertiary)",
    "brand-alt": "var(--color-border-brand-alt)",
    "secondary-alt": "var(--color-border-secondary-alt)",
    "focus": "var(--color-border-focus)"
  },
  "brand": {
    "50": "var(--color-utility-brand-50)",
    "100": "var(--color-utility-brand-100)",
    "200": "var(--color-utility-brand-200)",
    "300": "var(--color-utility-brand-300)",
    "400": "var(--color-utility-brand-400)",
    "500": "var(--color-utility-brand-500)",
    "600": "var(--color-utility-brand-600)",
    "700": "var(--color-utility-brand-700)",
    "800": "var(--color-utility-brand-800)",
    "900": "var(--color-utility-brand-900)"
  },
  "utility-brand": {
    "50": "var(--color-utility-brand-50)",
    "100": "var(--color-utility-brand-100)",
    "200": "var(--color-utility-brand-200)",
    "300": "var(--color-utility-brand-300)",
    "400": "var(--color-utility-brand-400)",
    "500": "var(--color-utility-brand-500)",
    "600": "var(--color-utility-brand-600)",
    "700": "var(--color-utility-brand-700)"
  },
  "utility-gray": {
    "50": "var(--color-utility-gray-50)",
    "100": "var(--color-utility-gray-100)",
    "200": "var(--color-utility-gray-200)",
    "300": "var(--color-utility-gray-300)",
    "400": "var(--color-utility-gray-400)",
    "500": "var(--color-utility-gray-500)",
    "600": "var(--color-utility-gray-600)",
    "700": "var(--color-utility-gray-700)"
  },
  "utility-error": {
    "50": "var(--color-utility-error-50)",
    "100": "var(--color-utility-error-100)",
    "200": "var(--color-utility-error-200)",
    "300": "var(--color-utility-error-300)",
    "400": "var(--color-utility-error-400)",
    "500": "var(--color-utility-error-500)",
    "600": "var(--color-utility-error-600)",
    "700": "var(--color-utility-error-700)"
  },
  "utility-warning": {
    "50": "var(--color-utility-warning-50)",
    "100": "var(--color-utility-warning-100)",
    "200": "var(--color-utility-warning-200)",
    "300": "var(--color-utility-warning-300)",
    "400": "var(--color-utility-warning-400)",
    "500": "var(--color-utility-warning-500)",
    "600": "var(--color-utility-warning-600)",
    "700": "var(--color-utility-warning-700)"
  },
  "utility-success": {
    "50": "var(--color-utility-success-50)",
    "100": "var(--color-utility-success-100)",
    "200": "var(--color-utility-success-200)",
    "300": "var(--color-utility-success-300)",
    "400": "var(--color-utility-success-400)",
    "500": "var(--color-utility-success-500)",
    "600": "var(--color-utility-success-600)",
    "700": "var(--color-utility-success-700)"
  },
  "utility-purple": {
    "50": "var(--color-utility-purple-50)",
    "100": "var(--color-utility-purple-100)",
    "200": "var(--color-utility-purple-200)",
    "300": "var(--color-utility-purple-300)",
    "400": "var(--color-utility-purple-400)",
    "500": "var(--color-utility-purple-500)",
    "600": "var(--color-utility-purple-600)",
    "700": "var(--color-utility-purple-700)"
  },
  "utility-yellow": {
    "50": "var(--color-utility-yellow-50)",
    "100": "var(--color-utility-yellow-100)",
    "200": "var(--color-utility-yellow-200)",
    "300": "var(--color-utility-yellow-300)",
    "400": "var(--color-utility-yellow-400)",
    "500": "var(--color-utility-yellow-500)",
    "600": "var(--color-utility-yellow-600)",
    "700": "var(--color-utility-yellow-700)"
  },
  "focus-ring": "var(--focus-ring)",
  "focus-ring-error": "var(--focus-ring-error)"
},

      spacing: {
  "none": "var(--spacing-none)",
  "xxs": "var(--spacing-xxs)",
  "xs": "var(--spacing-xs)",
  "md": "var(--spacing-md)",
  "lg": "var(--spacing-lg)",
  "xl": "var(--spacing-xl)",
  "2xl": "var(--spacing-2xl)",
  "3xl": "var(--spacing-3xl)",
  "4xl": "var(--spacing-4xl)",
  "6xl": "var(--spacing-6xl)",
  "7xl": "var(--spacing-7xl)",
  "8xl": "var(--spacing-8xl)",
  "9xl": "var(--spacing-9xl)",
  "10xl": "var(--spacing-10xl)",
  "11xl": "var(--spacing-11xl)",
  "sm": "var(--spacing-sm)",
  "5xl": "var(--spacing-5xl)",
  "2-5": "var(--spacing-2-5)",
  "3-5": "var(--spacing-3-5)",
  "4-5": "var(--spacing-4-5)"
},

      borderRadius: {
  "none": "var(--radius-none)",
  "xxs": "var(--radius-xxs)",
  "xs": "var(--radius-xs)",
  "sm": "var(--radius-sm)",
  "md": "var(--radius-md)",
  "xl": "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  "4xl": "var(--radius-4xl)",
  "full": "var(--radius-full)",
  "lg": "var(--radius-lg)",
  "3xl": "var(--radius-3xl)"
},

      fontFamily: {
        display: ['var(--font-family-display)', 'sans-serif'],
        body:    ['var(--font-family-body)',    'sans-serif'],
      },

      fontSize: {
  "text-xxs": [
    "var(--font-size-text-xxs)",
    {
      "lineHeight": "var(--line-height-text-xxs)"
    }
  ],
  "text-xs": [
    "var(--font-size-text-xs)",
    {
      "lineHeight": "var(--line-height-text-xs)"
    }
  ],
  "text-sm": [
    "var(--font-size-text-sm)",
    {
      "lineHeight": "var(--line-height-text-sm)"
    }
  ],
  "text-md": [
    "var(--font-size-text-md)",
    {
      "lineHeight": "var(--line-height-text-md)"
    }
  ],
  "text-lg": [
    "var(--font-size-text-lg)",
    {
      "lineHeight": "var(--line-height-text-lg)"
    }
  ],
  "text-xl": [
    "var(--font-size-text-xl)",
    {
      "lineHeight": "var(--line-height-text-xl)"
    }
  ],
  "display-xxxs": [
    "var(--font-size-display-xxxs)",
    {
      "lineHeight": "var(--line-height-display-xxxs)"
    }
  ],
  "display-xxs": [
    "var(--font-size-display-xxs)",
    {
      "lineHeight": "var(--line-height-display-xxs)"
    }
  ],
  "display-xs": [
    "var(--font-size-display-xs)",
    {
      "lineHeight": "var(--line-height-display-xs)"
    }
  ],
  "display-sm": [
    "var(--font-size-display-sm)",
    {
      "lineHeight": "var(--line-height-display-sm)"
    }
  ],
  "display-md": [
    "var(--font-size-display-md)",
    {
      "lineHeight": "var(--line-height-display-md)"
    }
  ],
  "display-lg": [
    "var(--font-size-display-lg)",
    {
      "lineHeight": "var(--line-height-display-lg)"
    }
  ],
  "display-xl": [
    "var(--font-size-display-xl)",
    {
      "lineHeight": "var(--line-height-display-xl)"
    }
  ],
  "display-2xl": [
    "var(--font-size-display-2xl)",
    {
      "lineHeight": "var(--line-height-display-2xl)"
    }
  ]
},

      maxWidth: {
  "container": "var(--container-max-width-desktop)",
  "xxs": "var(--width-xxs)",
  "sm": "var(--width-sm)",
  "lg": "var(--width-lg)",
  "xl": "var(--width-xl)",
  "2xl": "var(--width-2xl)",
  "3xl": "var(--width-3xl)",
  "4xl": "var(--width-4xl)",
  "5xl": "var(--width-5xl)",
  "6xl": "var(--width-6xl)",
  "md": "var(--width-md)",
  "--paragraph-max-width": "var(--paragraph-max-width)",
  "xs": "var(--width-xs)"
},

      boxShadow: {
        // Single elevation token. The shadow color goes transparent in dark mode,
        // so the shadow disappears automatically without dark: variants.
        card: '0px 2px 12px 0px var(--shadow-card)',
        none: 'none',
      },
    },
  },
  plugins: [],
};

export default config;
