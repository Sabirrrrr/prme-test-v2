import { LitElement } from 'lit';

export class BaseComponent extends LitElement {
    connectedCallback() {
        super.connectedCallback();
        this.classList.add('base-component');
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // Optional cleanup
    }

    protected log(message: string) {
        console.log(`[${this.constructor.name}]: ${message}`);
    }
}