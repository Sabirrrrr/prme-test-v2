import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { UserProfile } from '../../types';
import { tokens, card, heading, text, buttonBase, flexColumn } from '../../../../styles';

@customElement('v-profile-info')
export class ProfileInfo extends LitElement {
  @property({ type: Object }) userProfile: UserProfile | null = null;
  @property({ type: Function }) onLogout = () => {};

  static styles = [
    tokens,
    css`
      :host {
        display: block;
      }

      .user-profile {
        ${card}
        ${flexColumn}
        gap: var(--space-3x);
      }

      .profile-header {
        ${heading}
        color: var(--text-primary);
      }

      .profile-info {
        ${text}
        ${flexColumn}
        gap: var(--space-2x);
      }

      button {
        ${buttonBase}
        background: var(--theme-primary);
        color: var(--text-on-primary);
        
        &:hover {
          background: var(--theme-primary-dark);
        }
      }
    `
  ];

  render() {
    if (!this.userProfile) return null;

    return html`
      <div class="user-profile">
        <div class="profile-header">User Profile</div>
        <div class="profile-info">
          <div>Email: ${this.userProfile.email}</div>
          <div>Type: ${this.userProfile.user_type}</div>
          <div>Status: ${this.userProfile.status}</div>
        </div>
        <button @click=${this.onLogout}>
          Logout
        </button>
      </div>
    `;
  }
}
