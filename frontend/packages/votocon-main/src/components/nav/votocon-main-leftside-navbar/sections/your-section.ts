import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DomainUtils } from '../utils/domain-utils';
import '../components/nav-section';
import '../components/nav-item';

@customElement('your-section')
export class YourSection extends LitElement {
  @property({ type: Object }) domainUtils!: DomainUtils;

  protected createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav-section title="YOUR LIBRARY">
        <nav-item href="${this.domainUtils.getUrl('main', '/library')}" icon="📚">Library</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/history')}" icon="⏱️">History</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/bookmarks')}" icon="🔖">Bookmarks</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/downloads')}" icon="⬇️">Downloads</nav-item>
      </nav-section>
    `;
  }
}
