import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names, resolves clsx class objects, and merges Tailwind classes efficiently
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a URL-friendly slug from a string by removing special characters and replacing spaces with hyphens
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Formats a number to a localized string with appropriate separators
 */
export function formatNumber(
  number: number, 
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat('en-US', options).format(number);
}

/**
 * Waits for a specified amount of time
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
