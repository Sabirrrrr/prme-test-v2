import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { leftSideNavbarStyles } from '../styles/leftside-navbar.styles';
import { DomainUtils } from '../utils/domain-utils';

@customElement('discover-navigation')
export class DiscoverNavigation extends LitElement {
  static styles = leftSideNavbarStyles;

  render() {
    return html`
      <div class="nav-section">
        <div class="section-title">DISCOVER</div>
        <nav class="nav-items">
          <a href="${DomainUtils.getMainDomainUrl('/home')}" class="nav-item">
            <span>🏠</span>
            <span>Home</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/apps')}" class="nav-item">
            <span>📱</span>
            <span>Apps</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/tickets')}" class="nav-item">
            <span>🎫</span>
            <span>Tickets</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/rivals')}" class="nav-item">
            <span>🤝</span>
            <span>Rivals</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/fellows')}" class="nav-item">
            <span>👥</span>
            <span>Fellows</span>
          </a>
        </nav>
      </div>
    `;
  }
}
