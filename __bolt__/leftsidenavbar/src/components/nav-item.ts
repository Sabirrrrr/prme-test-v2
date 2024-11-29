import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('nav-item')
export class NavItem extends LitElement {
  @property({ type: String }) href = '';
  @property({ type: String }) icon = '';

  static styles = css`
    :host {
      display: block;
    }
    a {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem;
      color: var(--text-color, #374151);
      text-decoration: none;
      border-radius: 0.375rem;
      transition: background-color 0.2s;
      font-size: 0.875rem;
    }
    a:hover {
      background-color: var(--hover-bg, #f3f4f6);
    }
    .icon {
      font-size: 1.25rem;
      flex-shrink: 0;
    }
  `;

  render() {
    return html`
      <a href="${this.href}">
        ${this.icon ? html`<span class="icon">${this.icon}</span>` : ''}
        <slot></slot>
      </a>
    `;
  }
}