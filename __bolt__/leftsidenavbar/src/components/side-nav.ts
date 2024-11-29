import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { DomainUtils } from '../utils/domain-utils';

import '../sections/discover-section';
import '../sections/your-section';
import '../sections/studio-section';
import '../sections/quick-links-section';

@customElement('side-nav')
export class SideNav extends LitElement {
  @state() private domainUtils = new DomainUtils();

  static styles = css`
    :host {
      display: block;
      width: 15rem;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-color: white;
      border-right: 1px solid var(--border-color, #e5e7eb);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      z-index: 50;
    }
    .container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .logo {
      padding: 1rem;
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--logo-color, #111827);
      text-align: center;
      text-decoration: none;
      border-bottom: 1px solid var(--border-color, #e5e7eb);
    }
    .content {
      flex: 1;
      overflow-y: auto;
    }
    .toggle-button {
      width: 100%;
      padding: 1rem;
      background-color: var(--button-bg, #f9fafb);
      border-top: 1px solid var(--border-color, #e5e7eb);
      color: var(--button-color, #374151);
      font-size: 0.875rem;
      transition: background-color 0.2s;
    }
    .toggle-button:hover {
      background-color: var(--button-hover-bg, #f3f4f6);
    }
  `;

  render() {
    return html`
      <div class="container">
        <a href="${this.domainUtils.getUrl('main', '/')}" class="logo">
          votocon
        </a>
        <div class="content">
          <discover-section .domainUtils=${this.domainUtils}></discover-section>
          <your-section .domainUtils=${this.domainUtils}></your-section>
          <studio-section .domainUtils=${this.domainUtils}></studio-section>
          <quick-links-section .domainUtils=${this.domainUtils}></quick-links-section>
        </div>
        <button class="toggle-button">
          Toggle Menu
        </button>
      </div>
    `;
  }
}