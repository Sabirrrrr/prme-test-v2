import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('nav-section')
export class NavSection extends LitElement {
  @property({ type: String }) title = '';

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color, #e5e7eb);
    }
    .title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--title-color, #6b7280);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
    }
    .items {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `;

  render() {
    return html`
      ${this.title ? html`<div class="title">${this.title}</div>` : ''}
      <div class="items">
        <slot></slot>
      </div>
    `;
  }
}