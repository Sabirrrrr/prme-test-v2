import { LitElement, html, css } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { AuthService } from '../../services/auth';

@customElement('profile-menu')
export class ProfileMenu extends LitElement {
  private _isMenuOpen = false;
  private _isLoggedIn = false;
  private _showLoginForm = true;
  private _email = '';
  private _password = '';
  private _errorMessage = '';

  @state()
  get isMenuOpen() { return this._isMenuOpen; }
  set isMenuOpen(value: boolean) {
    const oldValue = this._isMenuOpen;
    this._isMenuOpen = value;
    this.requestUpdate('isMenuOpen', oldValue);
  }

  @state()
  get isLoggedIn() { return this._isLoggedIn; }
  set isLoggedIn(value: boolean) {
    const oldValue = this._isLoggedIn;
    this._isLoggedIn = value;
    this.requestUpdate('isLoggedIn', oldValue);
  }

  @state()
  get showLoginForm() { return this._showLoginForm; }
  set showLoginForm(value: boolean) {
    const oldValue = this._showLoginForm;
    this._showLoginForm = value;
    this.requestUpdate('showLoginForm', oldValue);
  }

  @state()
  get email() { return this._email; }
  set email(value: string) {
    const oldValue = this._email;
    this._email = value;
    this.requestUpdate('email', oldValue);
  }

  @state()
  get password() { return this._password; }
  set password(value: string) {
    const oldValue = this._password;
    this._password = value;
    this.requestUpdate('password', oldValue);
  }

  @state()
  get errorMessage() { return this._errorMessage; }
  set errorMessage(value: string) {
    const oldValue = this._errorMessage;
    this._errorMessage = value;
    this.requestUpdate('errorMessage', oldValue);
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .profile-button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #3b82f6;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
      transition: background-color 0.2s;
    }

    .profile-button:hover {
      background-color: #2563eb;
    }

    .menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 0.5rem;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      padding: 1rem;
      min-width: 300px;
      display: none;
    }

    .menu.open {
      display: block;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      color: #374151;
      font-size: 0.875rem;
    }

    .form-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
    }

    .form-input:focus {
      outline: none;
      border-color: #3b82f6;
      ring: 2px #3b82f6;
    }

    .btn {
      width: 100%;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-primary {
      background-color: #3b82f6;
      color: white;
      border: none;
    }

    .btn-primary:hover {
      background-color: #2563eb;
    }

    .btn-secondary {
      background-color: transparent;
      color: #6b7280;
      border: none;
    }

    .btn-secondary:hover {
      color: #374151;
    }

    .error-message {
      color: #dc2626;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .toggle-form {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.875rem;
      color: #6b7280;
    }

    .toggle-button {
      color: #3b82f6;
      background: none;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      text-decoration: underline;
    }
  `;

  private toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    this.errorMessage = '';

    try {
      if (this.showLoginForm) {
        const { access_token } = await AuthService.login({
          username: this.email,
          password: this.password,
        });
        
        localStorage.setItem('token', access_token);
        this.isLoggedIn = true;
        this.isMenuOpen = false;
      } else {
        await AuthService.register({
          email: this.email,
          password: this.password,
        });
        
        this.showLoginForm = true;
        this.errorMessage = 'Registration successful! Please login.';
      }
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    }
  }

  private handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    if (target.name === 'email') {
      this.email = target.value;
    } else if (target.name === 'password') {
      this.password = target.value;
    }
  }

  private toggleForm() {
    this.showLoginForm = !this.showLoginForm;
    this.errorMessage = '';
  }

  private logout() {
    AuthService.logout();
    this.isLoggedIn = false;
    this.isMenuOpen = false;
  }

  render() {
    return html`
      <div>
        <button @click=${this.toggleMenu} class="profile-button">
          ${this.isLoggedIn ? '👤' : '🔒'}
        </button>
        <div class="menu ${this.isMenuOpen ? 'open' : ''}">
          ${this.isLoggedIn ? html`
            <div class="p-2 border-b border-gray-200 mb-2">
              <div class="text-sm text-gray-600">Email: ${this.email}</div>
            </div>
            <button @click=${this.logout} class="btn btn-primary">
              Logout
            </button>
          ` : html`
            <form @submit=${this.handleSubmit}>
              <h2 class="text-lg font-semibold mb-4">
                ${this.showLoginForm ? 'Login' : 'Create Account'}
              </h2>
              
              <div class="form-group">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  class="form-input"
                  .value=${this.email}
                  @input=${this.handleInput}
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
                  @input=${this.handleInput}
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
                  @click=${this.toggleForm}
                >
                  ${this.showLoginForm ? 'Sign up' : 'Login'}
                </button>
              </div>
            </form>
          `}
        </div>
      </div>
    `;
  }
}
