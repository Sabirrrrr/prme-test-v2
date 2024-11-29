import { LitElement, html, css } from 'lit';
import { state, customElement } from 'lit/decorators.js';

const DEV_PORTS = {
  main: '5173',
  studio: '5174',
  info: '5175',
  help: '5176'
};

@customElement('side-nav')
export class SideNav extends LitElement {
  private _currentDomain = '';
  private isDev = window.location.hostname === 'localhost';

  @state()
  get currentDomain() {
    return this._currentDomain;
  }

  set currentDomain(value: string) {
    const oldValue = this._currentDomain;
    this._currentDomain = value;
    this.requestUpdate('currentDomain', oldValue);
  }

  constructor() {
    super();
    this.currentDomain = window.location.hostname;
  }

  static styles = css`
    :host {
      display: block;
      width: 240px;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      background-color: white;
      border-right: 1px solid #e5e7eb;
    }

    .nav-container {
      display: grid;
      grid-template-rows: auto auto auto auto auto auto auto;
      height: 100%;
      overflow-y: auto;
    }

    .nav-section {
      padding: 1rem;
      border-bottom: 1px solid #f3f4f6;
    }

    .section-divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 0 20px;
    }

    .section-title {
      font-size: 0.75rem;
      color: #6b7280;
      margin-bottom: 0.75rem;
      font-weight: 600;
    }

    .nav-items {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-items.horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .nav-item {
      color: #374151;
      text-decoration: none;
      padding: 0.5rem;
      border-radius: 0.25rem;
      transition: background-color 0.2s;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-item:hover {
      background-color: #f3f4f6;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #111827;
      text-decoration: none;
      display: block;
      padding: 1rem;
    }

    .info-separator {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: #9ca3af;
      border-radius: 50%;
      margin: 0 0.5rem;
    }

    .bottom-button {
      width: 100%;
      padding: 1rem;
      background-color: #f3f4f6;
      border: none;
      cursor: pointer;
      margin-top: auto;
    }
  `;

  private isMainDomain() {
    if (this.isDev) {
      return window.location.port === DEV_PORTS.main;
    }
    return this.currentDomain === 'votocon.com';
  }

  private isStudioDomain() {
    if (this.isDev) {
      return window.location.port === DEV_PORTS.studio;
    }
    return this.currentDomain === 'votocon.studio';
  }

  private isInfoDomain() {
    if (this.isDev) {
      return window.location.port === DEV_PORTS.info;
    }
    return this.currentDomain === 'votocon.info';
  }

  private isHelpDomain() {
    if (this.isDev) {
      return window.location.port === DEV_PORTS.help;
    }
    return this.currentDomain === 'votocon.help';
  }

  private getMainDomainUrl(path: string) {
    if (this.isDev) {
      return `http://localhost:${DEV_PORTS.main}${path}`;
    }
    return `https://votocon.com${path}`;
  }

  private getStudioDomainUrl(path: string) {
    if (this.isDev) {
      return `http://localhost:${DEV_PORTS.studio}${path}`;
    }
    return `https://votocon.studio${path}`;
  }

  private getInfoDomainUrl(path: string) {
    if (this.isDev) {
      return `http://localhost:${DEV_PORTS.info}${path}`;
    }
    return `https://votocon.info${path}`;
  }

  private getHelpDomainUrl(path: string) {
    if (this.isDev) {
      return `http://localhost:${DEV_PORTS.help}${path}`;
    }
    return `https://votocon.help${path}`;
  }

  render() {
    return html`
      <div class="nav-container">
        <!-- Logo Section -->
        <section class="nav-section">
          <a href="${this.getMainDomainUrl('/')}" class="logo">votocon</a>
        </section>
        <div class="section-divider"></div>

        ${this.isMainDomain() ? html`
          <!-- Discover Section -->
          <section class="nav-section">
            <div class="section-title">DISCOVER</div>
            <div class="nav-items">
              <a href="${this.getMainDomainUrl('/home')}" class="nav-item">
                <span>🏠</span>
                <span>Home</span>
              </a>
              <a href="${this.getMainDomainUrl('/apps')}" class="nav-item">
                <span>📱</span>
                <span>Apps</span>
              </a>
              <a href="${this.getMainDomainUrl('/tickets')}" class="nav-item">
                <span>🎫</span>
                <span>Tickets</span>
              </a>
              <a href="${this.getMainDomainUrl('/rivals')}" class="nav-item">
                <span>🤝</span>
                <span>Rivals</span>
              </a>
              <a href="${this.getMainDomainUrl('/fellows')}" class="nav-item">
                <span>👥</span>
                <span>Fellows</span>
              </a>
            </div>
          </section>
          <div class="section-divider"></div>

          <!-- Your Section -->
          <section class="nav-section">
            <div class="section-title">YOUR</div>
            <div class="nav-items">
              <a href="${this.getMainDomainUrl('/page')}" class="nav-item">
                <span>📄</span>
                <span>Page</span>
              </a>
              <a href="${this.getMainDomainUrl('/reviews')}" class="nav-item">
                <span>⭐</span>
                <span>Reviews</span>
              </a>
              <a href="${this.getMainDomainUrl('/claims')}" class="nav-item">
                <span>📝</span>
                <span>Claims</span>
              </a>
              <a href="${this.getMainDomainUrl('/encounters')}" class="nav-item">
                <span>🤝</span>
                <span>Encounters</span>
              </a>
              <a href="${this.getMainDomainUrl('/comments')}" class="nav-item">
                <span>💬</span>
                <span>Comments</span>
              </a>
              <a href="${this.getMainDomainUrl('/votes')}" class="nav-item">
                <span>👍</span>
                <span>Votes</span>
              </a>
            </div>
          </section>
          <div class="section-divider"></div>

          <!-- Resources Section -->
          <section class="nav-section">
            <div class="section-title">RESOURCES</div>
            <div class="nav-items">
              <a href="${this.getMainDomainUrl('/resources/intro')}" class="nav-item">
                <span>📚</span>
                <span>Introduction</span>
              </a>
              <a href="${this.getMainDomainUrl('/resources/library')}" class="nav-item">
                <span>📖</span>
                <span>Library</span>
              </a>
              <a href="${this.getMainDomainUrl('/resources/careers')}" class="nav-item">
                <span>💼</span>
                <span>Careers</span>
              </a>
              <a href="${this.getMainDomainUrl('/resources/sitemap')}" class="nav-item">
                <span>🗺️</span>
                <span>Sitemap</span>
              </a>
            </div>
          </section>
          <div class="section-divider"></div>
        ` : ''}

        ${this.isStudioDomain() ? html`
          <!-- Studio Section -->
          <section class="nav-section">
            <div class="section-title">STUDIO</div>
            <div class="nav-items">
              <a href="${this.getStudioDomainUrl('/intro')}" class="nav-item">
                <span>📝</span>
                <span>Introduction</span>
              </a>
              <a href="${this.getStudioDomainUrl('/apps')}" class="nav-item">
                <span>📱</span>
                <span>Apps</span>
              </a>
              <a href="${this.getStudioDomainUrl('/campaigns')}" class="nav-item">
                <span>🎯</span>
                <span>Campaigns</span>
              </a>
              <a href="${this.getStudioDomainUrl('/ads')}" class="nav-item">
                <span>📢</span>
                <span>Advertisement</span>
              </a>
              <a href="${this.getStudioDomainUrl('/billings')}" class="nav-item">
                <span>💰</span>
                <span>Billings</span>
              </a>
            </div>
          </section>
          <div class="section-divider"></div>
        ` : ''}

        <!-- Common Sections -->
        <section class="nav-section">
          <div class="section-title">QUICK LINKS</div>
          <div class="nav-items">
            ${!this.isMainDomain() ? html`
              <a href="${this.getMainDomainUrl('/')}" class="nav-item">
                <span>🏠</span>
                <span>Main Site</span>
              </a>
            ` : ''}
            ${!this.isStudioDomain() ? html`
              <a href="${this.getStudioDomainUrl('/')}" class="nav-item">
                <span>🎨</span>
                <span>Studio</span>
              </a>
            ` : ''}
            ${!this.isInfoDomain() ? html`
              <a href="${this.getInfoDomainUrl('/')}" class="nav-item">
                <span>ℹ️</span>
                <span>Info</span>
              </a>
            ` : ''}
            ${!this.isHelpDomain() ? html`
              <a href="${this.getHelpDomainUrl('/')}" class="nav-item">
                <span>❓</span>
                <span>Help</span>
              </a>
            ` : ''}
          </div>
        </section>

        <!-- Bottom Button -->
        <button class="bottom-button">Toggle Menu</button>
      </div>
    `;
  }
}
