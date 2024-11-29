import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class Footer extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: #f3f4f6;
      padding: 1rem;
      text-align: center;
      position: fixed;
      bottom: 0;
      width: 100%;
    }

    .copyright {
      color: #6b7280;
      font-size: 0.875rem;
    }
  `;

  render() {
    const currentYear = new Date().getFullYear();
    
    return html`
      <footer>
        <p class="copyright">
          ${currentYear} Votocon. All rights reserved.
        </p>
      </footer>
    `;
  }
}
