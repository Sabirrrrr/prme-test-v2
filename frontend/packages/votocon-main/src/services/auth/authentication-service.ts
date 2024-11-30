export class AuthenticationService {
    private static BASE_URL = '/api/auth';

    static async login(username: string, password: string) {
        try {
            const response = await fetch(`${this.BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('auth_token', data.token);
            return data;
        } catch (error) {
            console.error('Authentication error:', error);
            throw error;
        }
    }

    static logout() {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
    }

    static isAuthenticated(): boolean {
        return !!localStorage.getItem('auth_token');
    }

    static async getCurrentUser() {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                return null;
            }

            const response = await fetch(`${this.BASE_URL}/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Get current user error:', error);
            return null;
        }
    }

    static async register(userData: { 
        email: string, 
        password: string, 
        user_type: 'individual' | 'corporate' 
    }) {
        try {
            const response = await fetch(`${this.BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }
}