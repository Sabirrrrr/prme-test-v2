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
      <nav-section title="YOUR">
        <nav-item href="${this.domainUtils.getUrl('main', '/page')}" icon="📄">Page</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/reviews')}" icon="⭐">Reviews</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/claims')}" icon="📝">Claims</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/encounters')}" icon="🤝">Encounters</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/comments')}" icon="💬">Comments</nav-item>
        <nav-item href="${this.domainUtils.getUrl('main', '/votes')}" icon="👍">Votes</nav-item>
      </nav-section>
    `;
  }
}