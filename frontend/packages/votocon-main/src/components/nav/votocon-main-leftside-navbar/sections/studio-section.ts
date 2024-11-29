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
        <nav-item href="${this.domainUtils.getUrl('studio', '/create')}" icon="✨">Create</nav-item>
        <nav-item href="${this.domainUtils.getUrl('studio', '/drafts')}" icon="📝">Drafts</nav-item>
        <nav-item href="${this.domainUtils.getUrl('studio', '/analytics')}" icon="📊">Analytics</nav-item>
        <nav-item href="${this.domainUtils.getUrl('studio', '/settings')}" icon="⚙️">Settings</nav-item>
      </nav-section>
    `;
  }
}
