import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge doesn't know our custom fontSize keys use the text- prefix
// (e.g. text-text-sm), so it treats them as textColor — conflicting with
// color utilities like text-text-white. Registering them in font-size
// prevents tailwind-merge from dropping color classes when both appear.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-text-xxs',
        'text-text-xs',
        'text-text-sm',
        'text-text-md',
        'text-text-lg',
        'text-text-xl',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
