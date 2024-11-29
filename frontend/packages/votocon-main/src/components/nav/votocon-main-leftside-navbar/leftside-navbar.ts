import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('leftside-navbar')
export class LeftsideNavbar extends LitElement {
  static styles = css`
    :host {
      display: block;
      height: 100vh;
      width: 250px;
      background-color: var(--bg-color, #f9fafb);
      border-right: 1px solid var(--border-color, #e5e7eb);
      color: var(--text-color, #374151);
    }

    .nav-container {
      padding: 1rem;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--logo-color, #111827);
      margin-bottom: 2rem;
    }

    .nav-section {
      margin-bottom: 1.5rem;
    }

    .nav-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--title-color, #6b7280);
      margin-bottom: 0.5rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-radius: 0.375rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .nav-item:hover {
      background-color: var(--hover-bg, #f3f4f6);
    }

    .nav-item svg {
      width: 1.25rem;
      height: 1.25rem;
      margin-right: 0.75rem;
    }

    .nav-item span {
      font-size: 0.875rem;
    }

    .nav-button {
      width: 100%;
      padding: 0.5rem;
      margin-top: 1rem;
      border: none;
      border-radius: 0.375rem;
      background-color: var(--button-bg, #f9fafb);
      color: var(--button-color, #374151);
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .nav-button:hover {
      background-color: var(--button-hover-bg, #f3f4f6);
    }
  `;

  render() {
    return html`
      <nav class="nav-container">
        <div class="logo">Votocon</div>
        
        <div class="nav-section">
          <div class="nav-title">DISCOVER</div>
          <div class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </div>
          <div class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search</span>
          </div>
        </div>

        <div class="nav-section">
          <div class="nav-title">YOUR LIBRARY</div>
          <div class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Library</span>
          </div>
          <div class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>Bookmarks</span>
          </div>
        </div>

        <div class="nav-section">
          <div class="nav-title">SETTINGS</div>
          <div class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Settings</span>
          </div>
        </div>

        <button class="nav-button">Create New Project</button>
      </nav>
    `;
  }
}
