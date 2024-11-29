interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

export class AuthService {
  private static readonly AUTH_URL = '/api/auth';
  private static readonly USERS_URL = 'http://localhost:8000/api/users';

  static async login(credentials: LoginCredentials): Promise<{ access_token: string; token_type: string }> {
    const response = await fetch(`${this.AUTH_URL}/login`, {
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

    return response.json();
  }

  static async register(credentials: RegisterCredentials): Promise<void> {
    try {
      console.log('Sending registration request:', credentials);

      const response = await fetch(`${this.USERS_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      console.log('Registration response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration error data:', errorData);
        throw new Error(errorData.detail || 'Registration failed');
      }

      return response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static logout(): void {
    localStorage.removeItem('token');
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export { LoginService } from './login.service';
export { RegisterService } from './register.service';
