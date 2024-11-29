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
        ${!this.domainUtils.isMainDomain() ? html`
          <nav-item href="${this.domainUtils.getUrl('main', '/')}" icon="🏠">Main Site</nav-item>
        ` : ''}
        ${!this.domainUtils.isStudioDomain() ? html`
          <nav-item href="${this.domainUtils.getUrl('studio', '/')}" icon="🎨">Studio</nav-item>
        ` : ''}
        <nav-item href="${this.domainUtils.getUrl('info', '/')}" icon="ℹ️">Info</nav-item>
        <nav-item href="${this.domainUtils.getUrl('help', '/')}" icon="❓">Help</nav-item>
      </nav-section>
    `;
  }
}