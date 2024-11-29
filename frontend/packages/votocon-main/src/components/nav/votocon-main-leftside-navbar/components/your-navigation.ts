import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { leftSideNavbarStyles } from '../styles/leftside-navbar.styles';
import { DomainUtils } from '../utils/domain-utils';

@customElement('your-navigation')
export class YourNavigation extends LitElement {
  static styles = leftSideNavbarStyles;

  render() {
    return html`
      <section class="nav-section">
        <div class="section-title">YOUR</div>
        <nav class="nav-items">
          <a href="${DomainUtils.getMainDomainUrl('/page')}" class="nav-item">
            <span>📄</span>
            <span>Page</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/reviews')}" class="nav-item">
            <span>⭐</span>
            <span>Reviews</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/claims')}" class="nav-item">
            <span>📝</span>
            <span>Claims</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/encounters')}" class="nav-item">
            <span>🤝</span>
            <span>Encounters</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/comments')}" class="nav-item">
            <span>💬</span>
            <span>Comments</span>
          </a>
          <a href="${DomainUtils.getMainDomainUrl('/votes')}" class="nav-item">
            <span>👍</span>
            <span>Votes</span>
          </a>
        </nav>
      </section>
    `;
  }
}
