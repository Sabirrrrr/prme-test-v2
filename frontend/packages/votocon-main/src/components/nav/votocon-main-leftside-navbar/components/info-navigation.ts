import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { leftSideNavbarStyles } from '../styles/leftside-navbar.styles';
import { DomainUtils } from '../utils/domain-utils';

@customElement('info-navigation')
export class InfoNavigation extends LitElement {
  static styles = leftSideNavbarStyles;

  render() {
    return html`
      <section class="nav-section">
        <div class="section-title">INFO</div>
        <nav class="nav-items">
          <a href="${DomainUtils.getMainDomainUrl('/about')}" class="nav-item">
            <span>ℹ️</span>
            <span>About</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/user-agreements')}" class="nav-item">
            <span>📜</span>
            <span>User Agreements</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/privacy-policy')}" class="nav-item">
            <span>🔒</span>
            <span>Privacy Policy</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/cookie-policy')}" class="nav-item">
            <span>🍪</span>
            <span>Cookie Policy</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/copyright-policy')}" class="nav-item">
            <span>©️</span>
            <span>Copyright Policy</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/encounter-policy')}" class="nav-item">
            <span>🤝</span>
            <span>Encounter Policy</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/sales')}" class="nav-item">
            <span>💰</span>
            <span>Sales</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/accessibility')}" class="nav-item">
            <span>♿</span>
            <span>Accessibility</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/contact')}" class="nav-item">
            <span>📞</span>
            <span>Contact</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/devs')}" class="nav-item">
            <span>👨‍💻</span>
            <span>Devs</span>
          </a>
        </nav>
      </section>
    `;
  }
}
