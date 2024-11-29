import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

// Import components
import './components/nav/votocon-main-leftside-navbar/leftside-navbar';
import './components/votocon-main-profile-menu/profile-menu';
import './components/footer/footer';

// Import pages
import './pages/upgrade-page';

// Import router
import { router, initializeRouter } from './router';

// Ensure custom elements are only defined once
if (!customElements.get('votocon-main-leftside-navbar')) {
  import('./components/nav/votocon-main-leftside-navbar/leftside-navbar');
}
if (!customElements.get('votocon-main-profile-menu')) {
  import('./components/votocon-main-profile-menu/profile-menu');
}
if (!customElements.get('votocon-main-footer')) {
  import('./components/footer/footer');
}

@customElement('votocon-main-app')
export class VotoconMainApp extends LitElement {
  // @ts-ignore: Router is used implicitly
  private _router = router;

  static styles = css`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
    }

    .app-container {
      display: grid;
      grid-template-columns: 240px 1fr;
      grid-template-rows: auto 1fr auto;
      height: 100%;
    }

    .sidebar {
      grid-column: 1;
      grid-row: 1 / span 2;
    }

    .header {
      grid-column: 2;
      grid-row: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    #outlet {
      grid-column: 2;
      grid-row: 2;
      overflow-y: auto;
      padding: 20px;
      background-color: #f4f4f4;
    }

    .footer {
      grid-column: 1 / span 2;
      grid-row: 3;
    }
  `;

  render() {
    return html`
      <div class="app-container">
        <div class="sidebar">
          <leftside-navbar></leftside-navbar>
        </div>
        <div class="header">
          <h1 class="text-xl font-semibold text-gray-800">Votocon</h1>
          <votocon-main-profile-menu></votocon-main-profile-menu>
        </div>
        <div id="outlet"></div>
        <div class="footer">
          <votocon-main-footer></votocon-main-footer>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    // Ensure the outlet is set after the component is rendered
    const outlet = this.renderRoot.querySelector('#outlet');
    if (outlet instanceof HTMLElement) {
      initializeRouter(outlet);
    } else {
      console.error('Outlet is not an HTMLElement');
    }
  }
}

// Define the custom element only if it hasn't been defined already
if (!customElements.get('votocon-main-app')) {
  customElements.define('votocon-main-app', VotoconMainApp);
}

// Create and append the main app element only if it doesn't exist
if (!document.querySelector('votocon-main-app')) {
  const app = document.createElement('votocon-main-app');
  document.body.appendChild(app);
}