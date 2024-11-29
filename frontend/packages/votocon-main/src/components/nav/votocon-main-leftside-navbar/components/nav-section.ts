import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('nav-section')
export class NavSection extends LitElement {
  @property({ type: String }) title = '';

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
    .title {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--title-color, #6b7280);
      margin-bottom: 0.5rem;
      padding-left: 0.5rem;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
  `;

  render() {
    return html`
      <div>
        <div class="title">${this.title}</div>
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}
