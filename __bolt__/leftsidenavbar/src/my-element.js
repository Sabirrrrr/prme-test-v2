import { LitElement, html, css } from 'lit';

export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--my-element-text-color, #000);
    }
    .container {
      border: 2px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
    }
  `;

  render() {
    return html`
      <div class="container">
        <slot></slot>
        <p>Bu bir Lit bileşenidir!</p>
        <button @click=${this._onClick}>Tıkla</button>
      </div>
    `;
  }

  _onClick() {
    alert('Butona tıklandı!');
  }
}

customElements.define('my-element', MyElement);