import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { leftSideNavbarStyles } from './styles/leftside-navbar.styles';
import { DomainUtils } from './utils/domain-utils';

import './components/discover-navigation';
import './components/your-navigation';
import './components/resources-navigation';
import './components/studio-navigation';
import './components/info-navigation';

@customElement('leftside-navbar')
export class LeftsideNavbar extends LitElement {
  static styles = leftSideNavbarStyles;

  render() {
    return html`
      <div class="nav-container">
        <section class="nav-section">
          <a href="${DomainUtils.getMainDomainUrl('/')}" class="logo">votocon</a>
        </section>
        <div class="section-divider"></div>

        ${DomainUtils.isMainDomain() ? html`
          <discover-navigation></discover-navigation>
          <div class="section-divider"></div>
          <your-navigation></your-navigation>
          <div class="section-divider"></div>
          <resources-navigation></resources-navigation>
          <div class="section-divider"></div>
          <info-navigation></info-navigation>
        ` : ''}

        ${DomainUtils.isStudioDomain() ? html`
          <studio-navigation></studio-navigation>
        ` : ''}
      </div>
    `;
  }
}
