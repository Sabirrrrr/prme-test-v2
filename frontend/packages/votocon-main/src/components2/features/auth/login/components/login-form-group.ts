import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('v-login-form-group')
export class LoginFormGroup extends LitElement {
  @property({ type: String }) email = '';
  @property({ type: String }) password = '';
  @property({ type: String }) errorMessage = '';
  @property({ type: Boolean }) showLoginForm = true;
  @property({ type: Function }) onSubmit = () => {};
  @property({ type: Function }) onToggleForm = () => {};

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <h2 class="form-title">
          ${this.showLoginForm ? 'Login' : 'Create Account'}
        </h2>
        
        <div class="form-group">
          <label class="form-label">Email</label>
          <input
            type="email"
            name="email"
            class="form-input"
            .value=${this.email}
            @input=${this.handleEmailInput}
            required
          />
        </div>
        
        <div class="form-group">
          <label class="form-label">Password</label>
          <input
            type="password"
            name="password"
            class="form-input"
            .value=${this.password}
            @input=${this.handlePasswordInput}
            required
          />
        </div>

        ${this.errorMessage ? html`
          <div class="error-message">${this.errorMessage}</div>
        ` : ''}

        <button type="submit" class="btn btn-primary">
          ${this.showLoginForm ? 'Login' : 'Create Account'}
        </button>

        <div class="toggle-form">
          ${this.showLoginForm ? 
            'Don\'t have an account?' : 
            'Already have an account?'}
          <button 
            type="button"
            class="toggle-button"
            @click=${this.onToggleForm}
          >
            ${this.showLoginForm ? 'Sign up' : 'Login'}
          </button>
        </div>
      </form>
    `;
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    this.onSubmit();
  }

  private handleEmailInput(e: Event) {
    this.email = (e.target as HTMLInputElement).value;
  }

  private handlePasswordInput(e: Event) {
    this.password = (e.target as HTMLInputElement).value;
  }

  static styles = css`
    /* styles from original component */
  `;
}
