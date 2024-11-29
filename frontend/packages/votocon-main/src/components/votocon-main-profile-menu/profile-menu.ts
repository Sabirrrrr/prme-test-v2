import { LitElement, html, css } from 'lit';
import { state, customElement } from 'lit/decorators.js';
import { AuthService } from '../../services/auth';

@customElement('votocon-main-profile-menu')
export class VotoconMainProfileMenu extends LitElement {
  private _isMenuOpen = false;
  private _isLoggedIn = false;
  private _showLoginForm = true;
  private _email = '';
  private _password = '';
  private _errorMessage = '';
  private _userType = 'individual';
  private _userProfile = null;

  constructor() {
    super();
    this.checkAuthStatus();
  }

  private async checkAuthStatus() {
    this.isLoggedIn = AuthService.isAuthenticated();
    if (this.isLoggedIn) {
      try {
        this._userProfile = await AuthService.getCurrentUser();
        if (!this._userProfile) {
          this.isLoggedIn = false;
          this.errorMessage = 'Failed to load user profile';
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        this.isLoggedIn = false;
        this.errorMessage = 'Failed to load user profile';
      }
    }
  }

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

  @state()
  get userType() { return this._userType; }
  set userType(value: string) {
    const oldValue = this._userType;
    this._userType = value;
    this.requestUpdate('userType', oldValue);
  }

  private toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  private async handleSubmit(e: Event) {
    e.preventDefault();
    this.errorMessage = '';

    try {
      if (this.showLoginForm) {
        await AuthService.login({
          username: this.email,
          password: this.password,
        });
        
        this._userProfile = await AuthService.getCurrentUser();
        if (!this._userProfile) {
          throw new Error('Failed to load user profile after login');
        }
        
        this.isLoggedIn = true;
        this.isMenuOpen = false;
        this.email = '';
        this.password = '';
      } else {
        await AuthService.register({
          email: this.email,
          password: this.password,
          user_type: this.userType as 'individual' | 'corporate',
        });
        
        this.showLoginForm = true;
        this.errorMessage = 'Registration successful! Please login.';
        this.email = '';
        this.password = '';
      }
    } catch (error) {
      console.error('Auth error:', error);
      if (error instanceof Error) {
        this.errorMessage = error.message;
      } else {
        this.errorMessage = 'An error occurred. Please try again.';
      }
    }
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.name === 'email') {
      this.email = target.value;
    } else if (target.name === 'password') {
      this.password = target.value;
    } else if (target.name === 'userType') {
      this.userType = target.value;
    }
  }

  private toggleForm() {
    this.showLoginForm = !this.showLoginForm;
    this.errorMessage = '';
    this.email = '';
    this.password = '';
  }

  private logout() {
    AuthService.logout();
    this._userProfile = null;
    this.isLoggedIn = false;
    this.isMenuOpen = false;
    this.email = '';
    this.password = '';
  }

  render() {
    return html`
      <div class="profile-container">
        <button @click=${this.toggleMenu} class="profile-button">
          ${this.isLoggedIn ? '👤' : '🔒'}
        </button>
        ${this.isMenuOpen ? html`
          <div class="menu">
            ${this.isLoggedIn ? html`
              <div class="user-profile">
                <div class="profile-header">User Profile</div>
                <div class="profile-info">
                  <div>Email: ${this._userProfile?.email}</div>
                  <div>Type: ${this._userProfile?.user_type}</div>
                  <div>Status: ${this._userProfile?.status}</div>
                </div>
                <button @click=${this.logout} class="btn btn-primary">
                  Logout
                </button>
              </div>
            ` : html`
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

                ${!this.showLoginForm ? html`
                  <div class="form-group">
                    <label class="form-label">Account Type</label>
                    <select
                      name="userType"
                      class="form-input"
                      .value=${this.userType}
                      @change=${this.handleInput}
                    >
                      <option value="individual">Individual</option>
                      <option value="corporate">Corporate</option>
                    </select>
                  </div>
                ` : ''}

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
        ` : ''}
      </div>
    `;
  }

  static styles = css`
    .profile-container {
      position: relative;
      display: inline-block;
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
      font-size: 1.2rem;
    }

    .profile-button:hover {
      background-color: #2563eb;
    }

    .menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      min-width: 320px;
      z-index: 1000;
    }

    .user-profile {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .profile-header {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.5rem;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: #4b5563;
      font-size: 0.875rem;
    }

    .form-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin: 0 0 1.5rem 0;
      text-align: center;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      color: #374151;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .form-input {
      width: 100%;
      padding: 0.625rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #1f2937;
      transition: border-color 0.2s;
    }

    .form-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    .btn {
      width: 100%;
      padding: 0.625rem 1rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background-color: #3b82f6;
      color: white;
      border: none;
    }

    .btn-primary:hover {
      background-color: #2563eb;
    }

    .error-message {
      color: #dc2626;
      font-size: 0.875rem;
      margin: 0.5rem 0;
      text-align: center;
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
      margin-left: 0.25rem;
      font: inherit;
      font-weight: 500;
      cursor: pointer;
      text-decoration: underline;
    }

    .toggle-button:hover {
      color: #2563eb;
    }
  `;
}
