import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AuthenticationService } from '@services/auth/authentication-service';
import { AppStateService } from '@services/state/app-state-service';

type UserProfile = {
  email: string;
  user_type: 'individual' | 'corporate';
  status?: string;
  id?: string;
}

@customElement('votocon-main-profile-menu')
export class VotoconMainProfileMenu extends LitElement {
  @property({ type: Boolean }) 
  isMenuOpen = false;

  @property({ type: Boolean }) 
  isLoggedIn = false;

  @property({ type: Boolean }) 
  showLoginForm = true;

  @property({ type: String }) 
  private _email = '';

  @property({ type: String }) 
  private _password = '';

  @property({ type: String }) 
  private _errorMessage = '';

  @property({ type: String }) 
  private _userType: 'individual' | 'corporate' = 'individual';

  @property({ type: Object }) 
  private _userProfile: UserProfile | null = null;

  constructor() {
    super();
    this.isLoggedIn = AuthenticationService.isAuthenticated();
  }

  public async checkAuthStatus(): Promise<void> {
    this.isLoggedIn = AuthenticationService.isAuthenticated();
    if (this.isLoggedIn) {
      try {
        this._userProfile = await AuthenticationService.getCurrentUser();
        if (!this._userProfile) {
          this.isLoggedIn = false;
          this._errorMessage = 'Failed to load user profile';
        }
        AppStateService.setState('userProfile', this._userProfile);
      } catch (error) {
        console.error('Error checking auth status:', error);
        this.isLoggedIn = false;
        this._errorMessage = 'Failed to load user profile';
      }
    }
  }

  public async login(): Promise<void> {
    try {
      await AuthenticationService.login(this._email, this._password);
      const userProfile = await AuthenticationService.getCurrentUser();
      
      this.isLoggedIn = true;
      AppStateService.setState('userProfile', userProfile);
      AppStateService.setState('isLoggedIn', true);
      
      this.showLoginForm = false;
    } catch (error) {
      console.error('Login failed', error);
      this.isLoggedIn = false;
    }
  }

  public logout(): void {
    AuthenticationService.logout();
    this.isLoggedIn = false;
    AppStateService.setState('userProfile', null);
    AppStateService.setState('isLoggedIn', false);
    this.showLoginForm = true;
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
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
              <form @submit=${this.handleLoginSubmit}>
                <h2 class="form-title">
                  ${this.showLoginForm ? 'Login' : 'Create Account'}
                </h2>
                
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    class="form-input"
                    .value=${this._email}
                    @input=${(e: Event) => this._email = (e.target as HTMLInputElement).value}
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label class="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    class="form-input"
                    .value=${this._password}
                    @input=${(e: Event) => this._password = (e.target as HTMLInputElement).value}
                    required
                  />
                </div>

                ${!this.showLoginForm ? html`
                  <div class="form-group">
                    <label class="form-label">Account Type</label>
                    <select
                      name="userType"
                      class="form-input"
                      .value=${this._userType}
                      @change=${this.handleUserTypeChange}
                    >
                      <option value="individual">Individual</option>
                      <option value="corporate">Corporate</option>
                    </select>
                  </div>
                ` : ''}

                ${this._errorMessage ? html`
                  <div class="error-message">${this._errorMessage}</div>
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
                    @click=${() => this.showLoginForm = !this.showLoginForm}
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

  private handleLoginSubmit(e: Event): void {
    e.preventDefault();
    this.login();
  }

  private handleUserTypeChange(e: Event): void {
    const target = e.target as HTMLSelectElement;
    const value = target.value;
    
    if (value === 'individual' || value === 'corporate') {
      this._userType = value;
    } else {
      console.warn(`Invalid user type: ${value}. Defaulting to 'individual'.`);
      this._userType = 'individual';
    }
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
