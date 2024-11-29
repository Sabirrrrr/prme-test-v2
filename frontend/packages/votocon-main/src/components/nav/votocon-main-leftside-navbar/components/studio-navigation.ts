import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DomainUtils } from '../utils/domain-utils';
import { leftSideNavbarStyles } from '../styles/leftside-navbar.styles';

@customElement('studio-navigation')
export class StudioNavigation extends LitElement {
  static styles = leftSideNavbarStyles;

  render() {
    return html`
      <section class="nav-section">
        <div class="section-title">STUDIO</div>
        <div class="nav-items">
          <a href="${DomainUtils.getStudioDomainUrl('/intro')}" class="nav-item">
            <span>📝</span>
            <span>Introduction</span>
          </a>
          <a href="${DomainUtils.getStudioDomainUrl('/apps')}" class="nav-item">
            <span>📱</span>
            <span>Apps</span>
          </a>
          <a href="${DomainUtils.getStudioDomainUrl('/campaigns')}" class="nav-item">
            <span>🎯</span>
            <span>Campaigns</span>
          </a>
          <a href="${DomainUtils.getStudioDomainUrl('/ads')}" class="nav-item">
            <span>📢</span>
            <span>Advertisement</span>
          </a>
          <a href="${DomainUtils.getStudioDomainUrl('/billings')}" class="nav-item">
            <span>💰</span>
            <span>Billings</span>
          </a>
        </div>
      </section>
      <div class="section-divider"></div>
    `;
  }
}
