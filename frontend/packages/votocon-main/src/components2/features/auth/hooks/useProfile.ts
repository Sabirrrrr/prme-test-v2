import { ReactiveController, ReactiveControllerHost } from 'lit';
import { AuthenticationService } from '@services/auth/authentication-service';
import { AppStateService } from '@services/state/app-state-service';
import { AuthState } from '../types';

export class ProfileController implements ReactiveController {
  private host: ReactiveControllerHost;
  private _state: AuthState = {
    isLoggedIn: false,
    userProfile: null,
    errorMessage: ''
  };

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
    this._state.isLoggedIn = AuthenticationService.isAuthenticated();
  }

  hostConnected() {
    this.checkAuthStatus();
  }

  get state() {
    return this._state;
  }

  private setState(newState: Partial<AuthState>) {
    this._state = { ...this._state, ...newState };
    this.host.requestUpdate();
  }

  async checkAuthStatus(): Promise<void> {
    const isLoggedIn = AuthenticationService.isAuthenticated();
    
    if (isLoggedIn) {
      try {
        const userProfile = await AuthenticationService.getCurrentUser();
        if (!userProfile) {
          this.setState({
            isLoggedIn: false,
            errorMessage: 'Failed to load user profile'
          });
          return;
        }
        
        this.setState({ isLoggedIn: true, userProfile });
        AppStateService.setState('userProfile', userProfile);
      } catch (error) {
        console.error('Error checking auth status:', error);
        this.setState({
          isLoggedIn: false,
          errorMessage: 'Failed to load user profile'
        });
      }
    } else {
      this.setState({ isLoggedIn: false, userProfile: null });
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await AuthenticationService.login(email, password);
      const userProfile = await AuthenticationService.getCurrentUser();
      
      this.setState({ isLoggedIn: true, userProfile, errorMessage: '' });
      AppStateService.setState('userProfile', userProfile);
      AppStateService.setState('isLoggedIn', true);
    } catch (error) {
      console.error('Login failed:', error);
      this.setState({
        isLoggedIn: false,
        errorMessage: 'Login failed. Please check your credentials.'
      });
    }
  }

  async logout(): Promise<void> {
    try {
      await AuthenticationService.logout();
      this.setState({
        isLoggedIn: false,
        userProfile: null,
        errorMessage: ''
      });
      AppStateService.setState('userProfile', null);
      AppStateService.setState('isLoggedIn', false);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  }
}
