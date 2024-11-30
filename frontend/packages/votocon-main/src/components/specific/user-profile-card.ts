import { html, css } from 'lit';
import { BaseComponent } from '../common/base-component';

export class UserProfileCard extends BaseComponent {
    static properties = {
        username: { type: String },
        email: { type: String }
    };

    render() {
        return html`
            <div class="user-profile-card">
                <h2>${this.username}</h2>
                <p>${this.email}</p>
            </div>
        `;
    }
}

customElements.define('user-profile-card', UserProfileCard);