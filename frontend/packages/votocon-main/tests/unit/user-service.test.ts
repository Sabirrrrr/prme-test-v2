import { expect } from 'chai';
import { AuthenticationService } from '../../src/services/auth/authentication-service';

describe('AuthenticationService', () => {
    it('should return false when no token is present', () => {
        localStorage.clear();
        expect(AuthenticationService.isAuthenticated()).to.be.false;
    });

    // Add more test cases
});