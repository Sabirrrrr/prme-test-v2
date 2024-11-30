import { html, css } from 'lit';
import { BaseComponent } from '../common/base-component';

export class MainLayout extends BaseComponent {
    static styles = css`
        :host {
            display: grid;
            grid-template-areas: 
                "header header"
                "sidebar main"
                "footer footer";
            min-height: 100vh;
        }
    `;

    render() {
        return html`
            <header>Header Content</header>
            <sidebar>Sidebar Content</sidebar>
            <main>Main Content</main>
            <footer>Footer Content</footer>
        `;
    }
}

customElements.define('main-layout', MainLayout);