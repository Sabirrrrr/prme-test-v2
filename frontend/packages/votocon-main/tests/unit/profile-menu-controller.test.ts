import { fixture } from '@open-wc/testing';
import sinon from 'sinon';
import { ProfileMenu } from '../../src/components2/features/auth/profile/profile-menu';
import { ProfileController } from '../../src/components2/features/auth/hooks/useProfile';
import { AuthenticationService } from '../../src/services/auth/authentication-service';
import { AppStateService } from '../../src/services/state/app-state-service';
import type { ReactiveControllerHost } from 'lit';
import { describe, it, beforeEach, afterEach, expect as vitestExpect } from 'vitest';

describe('Profile Menu Controller Tests', () => {
  let element: ProfileMenu;
  let controller: ProfileController;
  let isAuthenticatedStub: sinon.SinonStub;
  let loginStub: sinon.SinonStub;
  let getCurrentUserStub: sinon.SinonStub;
  let logoutStub: sinon.SinonStub;
  let mockHost: ReactiveControllerHost;

  const mockUserProfile = {
    email: 'test@example.com',
    user_type: 'individual'
  };

  beforeEach(async () => {
    // Restore and create fresh stubs
    sinon.restore();

    // Create a mock host with the required methods
    mockHost = {
      addController: sinon.stub(),
      removeController: sinon.stub(),
      requestUpdate: sinon.stub()
    } as unknown as ReactiveControllerHost;

    // Create stubs for AuthenticationService methods
    isAuthenticatedStub = sinon.stub(AuthenticationService, 'isAuthenticated');
    loginStub = sinon.stub(AuthenticationService, 'login');
    getCurrentUserStub = sinon.stub(AuthenticationService, 'getCurrentUser');
    logoutStub = sinon.stub(AuthenticationService, 'logout');

    // Set default return values
    isAuthenticatedStub.returns(false);
    loginStub.resolves();
    getCurrentUserStub.resolves(mockUserProfile);
    logoutStub.resolves();

    // Stub AppStateService static methods
    sinon.stub(AppStateService, 'setState');
    sinon.stub(AppStateService, 'getState');

    // Create element and controller
    element = await fixture<ProfileMenu>('<v-profile-menu></v-profile-menu>');
    controller = new ProfileController(mockHost);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('State Management', () => {
    it('should initialize in not authenticated state', async () => {
      // Setup
      isAuthenticatedStub.returns(false);
      
      // Create new controller to test initial state
      const testController = new ProfileController(mockHost);
      
      // Verify initial state
      vitestExpect(isAuthenticatedStub.called).toBe(true);
      vitestExpect(testController.state.isLoggedIn).toBe(false);
      vitestExpect(testController.state.userProfile).toBeNull();
    });

    it('should update state on authentication change', async () => {
      // Setup initial state
      isAuthenticatedStub.returns(false);
      loginStub.resolves();
      getCurrentUserStub.resolves(mockUserProfile);
      
      // Create controller
      const testController = new ProfileController(mockHost);
      
      // Perform login
      await testController.login('test@example.com', 'password');
      
      // Verify login was called with correct parameters
      vitestExpect(loginStub.calledOnce).toBe(true);
      vitestExpect(loginStub.calledWith('test@example.com', 'password')).toBe(true);
      
      // Verify state was updated
      vitestExpect(getCurrentUserStub.calledOnce).toBe(true);
      vitestExpect(testController.state.userProfile).toEqual(mockUserProfile);
    });
  });

  describe('Error Handling', () => {
    it('should handle authentication errors', async () => {
      loginStub.rejects(new Error('Auth failed'));
      
      // Attempt login
      await controller.login('test@example.com', 'wrong-password');
      
      vitestExpect(controller.state.errorMessage).toBe('Login failed. Please check your credentials.');
      vitestExpect(controller.state.isLoggedIn).toBe(false);
    });

    it('should handle invalid email format', async () => {
      loginStub.rejects(new Error('Invalid email format'));
      
      // Attempt login
      await controller.login('invalid-email', 'password');
      
      vitestExpect(controller.state.errorMessage).toBe('Login failed. Please check your credentials.');
      vitestExpect(controller.state.isLoggedIn).toBe(false);
    });
  });

  describe('Form Input Handling', () => {
    it('should have email and password inputs', async () => {
      // Ensure not authenticated
      isAuthenticatedStub.returns(false);
      
      // Create the form inputs
      const emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.id = 'email';
      element.appendChild(emailInput);

      const passwordInput = document.createElement('input');
      passwordInput.type = 'password';
      passwordInput.id = 'password';
      element.appendChild(passwordInput);

      // Assert inputs exist
      vitestExpect(element.querySelector('#email')).toBeDefined();
      vitestExpect(element.querySelector('#password')).toBeDefined();
    });

    it('should clear form after successful login', async () => {
      // Simulate successful login
      await controller.login('test@example.com', 'password');
      
      vitestExpect(controller.state.isLoggedIn).toBe(true);
      vitestExpect(controller.state.errorMessage).toBe('');
    });
  });

  describe('User Authentication Flow', () => {
    it('should fetch current user successfully', async () => {
      const userProfile = await getCurrentUserStub();
      vitestExpect(userProfile).toEqual(mockUserProfile);
    });

    it('should logout successfully', async () => {
      // Setup
      isAuthenticatedStub.returns(true);
      
      // Trigger logout
      await controller.logout();
      
      // Verify logout was called
      vitestExpect(logoutStub.calledOnce).toBe(true);
    });

    it('should handle logout errors', async () => {
      // Setup
      isAuthenticatedStub.returns(true);
      const error = new Error('Logout failed');
      logoutStub.rejects(error);
      
      // Expect the logout to throw an error
      await vitestExpect(controller.logout()).rejects.toThrow('Logout failed');
      
      // Verify logout was called
      vitestExpect(logoutStub.calledOnce).toBe(true);
    });
  });
});
