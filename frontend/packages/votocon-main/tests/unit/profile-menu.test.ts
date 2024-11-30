import { expect } from 'chai';
import { fixture } from '@open-wc/testing';
import sinon from 'sinon';
import { VotoconMainProfileMenu } from '@components/votocon-main-profile-menu/profile-menu';
import { AuthenticationService } from '@services/auth/authentication-service';
import { AppStateService } from '@services/state/app-state-service';

describe('VotoconMainProfileMenu', () => {
  let element: HTMLElement;
  let loginStub: sinon.SinonStub;
  let getCurrentUserStub: sinon.SinonStub;
  let isAuthenticatedStub: sinon.SinonStub;
  let logoutStub: sinon.SinonStub;
  let appStateSetStateStub: sinon.SinonStub;

  const mockUserProfile = {
    email: 'test@example.com', 
    user_type: 'individual'
  };

  beforeEach(async () => {
    // Only define the custom element if it hasn't been defined yet
    if (!customElements.get('votocon-main-profile-menu')) {
      customElements.define('votocon-main-profile-menu', VotoconMainProfileMenu);
    }

    // Restore and stub all necessary services
    sinon.restore();

    // Stub AuthenticationService methods
    loginStub = sinon.stub(AuthenticationService, 'login').resolves();
    getCurrentUserStub = sinon.stub(AuthenticationService, 'getCurrentUser').resolves(mockUserProfile);
    isAuthenticatedStub = sinon.stub(AuthenticationService, 'isAuthenticated').returns(false);
    logoutStub = sinon.stub(AuthenticationService, 'logout');

    // Stub AppStateService.setState
    appStateSetStateStub = sinon.stub(AppStateService, 'setState');

    // Create the element using fixture
    element = await fixture<VotoconMainProfileMenu>(`
      <votocon-main-profile-menu></votocon-main-profile-menu>
    `);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should have login method', () => {
    const profileMenu = element as VotoconMainProfileMenu;
    expect(typeof profileMenu.login).to.equal('function', 'Login method should be a function');
  });

  it('initializes with default state', () => {
    const profileMenu = element as VotoconMainProfileMenu;
    expect(profileMenu.isMenuOpen).to.be.false;
    expect(profileMenu.isLoggedIn).to.be.false;
    expect(profileMenu.showLoginForm).to.be.true;
  });

  it('handles login successfully', async () => {
    const profileMenu = element as VotoconMainProfileMenu;
    
    // Prepare login
    profileMenu['_email'] = 'test@example.com';
    profileMenu['_password'] = 'password123';

    // Modify authentication stubs
    isAuthenticatedStub.returns(true);

    // Trigger login
    await profileMenu.login();

    // Verify login process
    expect(loginStub.calledOnceWith('test@example.com', 'password123')).to.be.true;
    expect(getCurrentUserStub.calledOnce).to.be.true;
    expect(profileMenu.isLoggedIn).to.be.true;
    expect(profileMenu.showLoginForm).to.be.false;
    expect(appStateSetStateStub.calledWith('userProfile', mockUserProfile)).to.be.true;
    expect(appStateSetStateStub.calledWith('isLoggedIn', true)).to.be.true;
  });

  it('handles logout successfully', () => {
    const profileMenu = element as VotoconMainProfileMenu;
    
    // Simulate logged-in state
    profileMenu.isLoggedIn = true;
    profileMenu.showLoginForm = false;

    // Trigger logout
    profileMenu.logout();

    // Verify logout process
    expect(logoutStub.calledOnce).to.be.true;
    expect(profileMenu.isLoggedIn).to.be.false;
    expect(profileMenu.showLoginForm).to.be.true;
    expect(appStateSetStateStub.calledWith('userProfile', null)).to.be.true;
    expect(appStateSetStateStub.calledWith('isLoggedIn', false)).to.be.true;
  });

  it('toggles menu state', () => {
    const profileMenu = element as VotoconMainProfileMenu;
    const initialMenuState = profileMenu.isMenuOpen;
    profileMenu.toggleMenu();
    expect(profileMenu.isMenuOpen).to.be.equal(!initialMenuState);
  });
});
