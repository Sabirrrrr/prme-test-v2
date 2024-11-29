import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DomainUtils } from '../utils/domain-utils';
import '../components/nav-section';
import '../components/nav-item';

@customElement('studio-section')
export class StudioSection extends LitElement {
  @property({ type: Object }) domainUtils!: DomainUtils;

  protected createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav-section title="STUDIO">
        <nav-item href="${this.domainUtils.getUrl('studio', '/intro')}" icon="📝">Introduction</nav-item>
        <nav-item href="${this.domainUtils.getUrl('studio', '/apps')}" icon="📱">Apps</nav-item>
        <nav-item href="${this.domainUtils.getUrl('studio', '/campaigns')}" icon="🎯">Campaigns</nav-item>
        <nav-item href="${this.domainUtils.getUrl('studio', '/ads')}" icon="📢">Advertisement</nav-item>
        <nav-item href="${this.domainUtils.getUrl('studio', '/billings')}" icon="💰">Billings</nav-item>
      </nav-section>
    `;
  }
}