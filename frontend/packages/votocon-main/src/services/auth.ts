interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export class AuthService {
  private static readonly API_URL = 'http://localhost:8000/api';

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Login failed: ' + (error as Error).message);
    }
  }

  static async register(credentials: RegisterCredentials): Promise<void> {
    try {
      const response = await fetch(`${this.API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }
    } catch (error) {
      throw new Error('Registration failed: ' + (error as Error).message);
    }
  }

  static logout(): void {
    localStorage.removeItem('token');
  }
}
