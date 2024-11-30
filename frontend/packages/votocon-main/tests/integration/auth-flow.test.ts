import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AuthenticationService } from '@services/auth/authentication-service';

describe('Authentication Flow', () => {
    let fetchMock: any;

    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
        
        // Mock the global fetch function
        fetchMock = vi.spyOn(global, 'fetch');
        fetchMock.mockResolvedValue(new Response(JSON.stringify({ token: 'test-token' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }));
    });

    afterEach(() => {
        // Restore the original fetch function
        fetchMock.mockRestore();
    });

    it('should login and set token', async () => {
        const result = await AuthenticationService.login('testuser', 'password');
        expect(result).toHaveProperty('token', 'test-token');
        expect(localStorage.getItem('auth_token')).toBe('test-token');
        
        // Verify the fetch call
        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [url, options] = fetchMock.mock.calls[0];
        expect(url).toContain('/api/auth/login');
        expect(options.method).toBe('POST');
    });

    it('should handle login failure', async () => {
        // Configure fetch to return an error
        fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ error: 'Invalid credentials' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        }));

        await expect(
            AuthenticationService.login('testuser', 'wrong-password')
        ).rejects.toThrow('Login failed');
        
        expect(localStorage.getItem('auth_token')).toBeNull();
    });

    // Add more integration test cases
});