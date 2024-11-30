import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { tokens } from '../../../styles/tokens';
import { buttonBase } from '../../../styles/mixins';

@customElement('v-profile-button')
export class ProfileButton extends LitElement {
  @property({ type: Boolean }) isLoggedIn = false;
  @property({ type: Function }) onClick = () => {};

  static styles = [
    tokens,
    buttonBase,
    css`
      :host {
        display: inline-block;
      }

      button {
        ${buttonBase}
        background: transparent;
        font-size: var(--font-size-large);
        padding: var(--spacing-small);
        
        &:hover {
          opacity: 0.8;
        }
      }
    `
  ];

  render() {
    return html`
      <button @click=${this.onClick}>
        ${this.isLoggedIn ? '👤' : '🔒'}
      </button>
    `;
  }
}
