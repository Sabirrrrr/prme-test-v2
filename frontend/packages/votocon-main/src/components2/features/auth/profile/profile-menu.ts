// Profile menu component - handles user profile menu UI and interactions

import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ProfileController } from '../hooks/useProfile';
import { tokens, dropdown } from '../../../styles';
import './components/profile-info';
import '../login/components/login-form-group';
import '../../../shared/atoms/buttons/profile-button';

@customElement('v-profile-menu')
export class ProfileMenu extends LitElement {
  private profile = new ProfileController(this);
  
  @state() private isMenuOpen = false;
  @state() private showLoginForm = true;
  @state() private email = '';
  @state() private password = '';

  static styles = [
    tokens,
    css`
      :host {
        position: relative;
        display: inline-block;
      }

      .menu {
        ${dropdown}
        right: 0;
        top: 100%;
        min-width: 300px;
        margin-top: var(--space-2x);
      }
    `
  ];

  private toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private async handleLogin(): Promise<void> {
    await this.profile.login(this.email, this.password);
    if (this.profile.state.isLoggedIn) {
      this.showLoginForm = false;
    }
  }

  render() {
    const { isLoggedIn, userProfile, errorMessage } = this.profile.state;

    return html`
      <div class="profile-container">
        <v-profile-button
          .isLoggedIn=${isLoggedIn}
          .onClick=${this.toggleMenu}
        ></v-profile-button>

        ${this.isMenuOpen ? html`
          <div class="menu">
            ${isLoggedIn ? html`
              <v-profile-info
                .userProfile=${userProfile}
                .onLogout=${() => this.profile.logout()}
              ></v-profile-info>
            ` : html`
              <v-login-form-group
                .email=${this.email}
                .password=${this.password}
                .errorMessage=${errorMessage}
                .showLoginForm=${this.showLoginForm}
                .onSubmit=${() => this.handleLogin()}
                .onToggleForm=${() => this.showLoginForm = !this.showLoginForm}
              ></v-login-form-group>
            `}
          </div>
        ` : ''}
      </div>
    `;
  }
}
