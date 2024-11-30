import { css } from 'lit';

// Design tokens using CSS custom properties
export const tokens = css`
  :host {
    /* Theme Colors */
    --theme-primary: #007bff;
    --theme-primary-light: #4da3ff;
    --theme-primary-dark: #0056b3;
    --theme-secondary: #6c757d;
    --theme-success: #28a745;
    --theme-error: #dc3545;
    --theme-warning: #ffc107;

    /* Surface Colors */
    --surface-background: #ffffff;
    --surface-card: #f8f9fa;
    --surface-border: #dee2e6;

    /* Text Colors */
    --text-primary: #212529;
    --text-secondary: #6c757d;
    --text-on-primary: #ffffff;
    --text-on-dark: #ffffff;
    --text-on-light: #212529;

    /* Spacing Scale */
    --space-unit: 4px;
    --space-2x: calc(var(--space-unit) * 2);  /* 8px */
    --space-3x: calc(var(--space-unit) * 3);  /* 12px */
    --space-4x: calc(var(--space-unit) * 4);  /* 16px */
    --space-6x: calc(var(--space-unit) * 6);  /* 24px */
    --space-8x: calc(var(--space-unit) * 8);  /* 32px */

    /* Typography */
    --font-family: system-ui, -apple-system, sans-serif;
    --font-size-xs: 12px;
    --font-size-sm: 14px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 24px;
    
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-bold: 700;

    /* Effects */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.05);
    
    --radius-sm: 4px;
    --radius-md: 6px;
    --radius-lg: 8px;
    --radius-full: 9999px;

    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-normal: 250ms ease;
    --transition-slow: 350ms ease;

    /* Z-index Scale */
    --z-dropdown: 1000;
    --z-modal: 2000;
    --z-tooltip: 3000;
  }
`;
