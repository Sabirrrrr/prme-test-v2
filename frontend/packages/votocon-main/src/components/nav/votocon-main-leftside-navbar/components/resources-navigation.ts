import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { leftSideNavbarStyles } from '../styles/leftside-navbar.styles';
import { DomainUtils } from '../utils/domain-utils';

@customElement('resources-navigation')
export class ResourcesNavigation extends LitElement {
  static styles = leftSideNavbarStyles;

  render() {
    return html`
      <section class="nav-section">
        <div class="section-title">RESOURCES</div>
        <nav class="nav-items">
          <a href="${DomainUtils.getMainDomainUrl('/resources/intro')}" class="nav-item">
            <span>📚</span>
            <span>Introduction</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/resources/library')}" class="nav-item">
            <span>📖</span>
            <span>Library</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/resources/careers')}" class="nav-item">
            <span>💼</span>
            <span>Careers</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/resources/sitemap')}" class="nav-item">
            <span>🗺️</span>
            <span>Sitemap</span>
          </a>
        </nav>
      </section>
    `;
  }
}
