import { css } from 'lit';

// Layout Mixins
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

// Component Base Styles
export const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2x) var(--space-4x);
  border: none;
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const inputBase = css`
  width: 100%;
  padding: var(--space-2x) var(--space-3x);
  border: 1px solid var(--surface-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  transition: all var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--theme-primary);
    box-shadow: 0 0 0 2px var(--theme-primary-light);
  }

  &:disabled {
    background-color: var(--surface-card);
    cursor: not-allowed;
  }
`;

// Container Styles
export const card = css`
  background: var(--surface-card);
  border-radius: var(--radius-md);
  padding: var(--space-4x);
  box-shadow: var(--shadow-sm);
`;

export const dropdown = css`
  position: absolute;
  background: var(--surface-background);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  z-index: var(--z-dropdown);
`;

// Typography Styles
export const heading = css`
  font-family: var(--font-family);
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
  color: var(--text-primary);
`;

export const text = css`
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  line-height: 1.5;
  color: var(--text-primary);
`;

// Interactive States
export const interactive = css`
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;
