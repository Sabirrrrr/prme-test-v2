import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DomainUtils } from '../utils/domain-utils';
import '../components/nav-section';
import '../components/nav-item';

@customElement('quick-links-section')
export class QuickLinksSection extends LitElement {
  @property({ type: Object }) domainUtils!: DomainUtils;

  protected createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav-section title="QUICK LINKS">
        <nav-item href="${this.domainUtils.getUrl('help', '/docs')}" icon="📖">Documentation</nav-item>
        <nav-item href="${this.domainUtils.getUrl('help', '/support')}" icon="💡">Support</nav-item>
        <nav-item href="${this.domainUtils.getUrl('info', '/about')}" icon="ℹ️">About</nav-item>
      </nav-section>
    `;
  }
}
