interface LoginCredentials {
    username: string;
    password: string;
}

export class LoginService {
    private static readonly BASE_URL = '/api/auth';

    static async login(credentials: LoginCredentials): Promise<{ access_token: string; token_type: string }> {
        const response = await fetch(`${this.BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                username: credentials.username,
                password: credentials.password,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Login failed');
        }

        const result = await response.json();
        // Store the token in localStorage
        localStorage.setItem('token', result.access_token);
        return result;
    }

    static logout(): void {
        localStorage.removeItem('token');
    }

    static isAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
    }

    static getToken(): string | null {
        return localStorage.getItem('token');
    }
}
