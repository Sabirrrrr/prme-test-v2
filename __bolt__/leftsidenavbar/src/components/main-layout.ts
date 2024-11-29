import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import './side-nav';

@customElement('main-layout')
export class MainLayout extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .container {
      min-height: 100vh;
      background-color: var(--bg-color, #f9fafb);
    }
    main {
      margin-left: 15rem;
      padding: 2rem;
    }
  `;

  render() {
    return html`
      <div class="container">
        <side-nav></side-nav>
        <main>
          <slot></slot>
        </main>
      </div>
    `;
  }
}