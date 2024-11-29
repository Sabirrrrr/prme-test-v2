import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DomainUtils } from '../utils/domain-utils';
import '../components/nav-section';
import '../components/nav-item';

@customElement('discover-section')
export class DiscoverSection extends LitElement {
  @property({ type: Object }) domainUtils!: DomainUtils;

  protected createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav-section title="DISCOVER">
        <nav-item href="${this.domainUtils.getUrl('main', '/home')}" icon="🏠">Home</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/apps')}" icon="📱">Apps</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/tickets')}" icon="🎫">Tickets</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/rivals')}" icon="🤝">Rivals</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/fellows')}" icon="👥">Fellows</nav-item>
      </nav-section>
    `;
  }
}