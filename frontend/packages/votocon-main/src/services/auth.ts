interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  user_type?: 'individual' | 'corporate';
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface UserProfile {
  id: number;
  email: string;
  user_type: string;
  status: string;
  created_at: string;
  permissions: Array<{
    id: number;
    name: string;
    description: string | null;
    scope: string;
  }>;
}

export class AuthService {
  private static readonly API_URL = '/api';

  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      const response = await fetch(`${this.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      
      // Fetch and store user profile after successful login
      const userData = await this.getCurrentUser();
      if (userData) {
        localStorage.setItem('userProfile', JSON.stringify(userData));
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed: ' + (error as Error).message);
    }
  }

  static async register(credentials: RegisterCredentials): Promise<void> {
    try {
      console.log('Registration Credentials:', JSON.stringify(credentials));

      // Validate input
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      if (credentials.password.length < 3) {
        throw new Error('Password must be at least 3 characters long');
      }

      const response = await fetch(`${this.API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          user_type: credentials.user_type || 'individual',
        }),
      });

      console.log('Registration Response Status:', response.status);
      console.log('Registration Response Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Registration Error Response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.detail || 'Registration failed');
        } catch {
          throw new Error(errorText || 'Registration failed');
        }
      }

      return await response.json();
    } catch (error) {
      console.error('Full Registration Error:', error);
      
      // More specific error handling
      if (error instanceof TypeError) {
        throw new Error('Network error. Please check your connection.');
      }
      
      throw new Error(error instanceof Error ? error.message : 'Registration failed');
    }
  }

  static async getCurrentUser(): Promise<UserProfile | null> {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await fetch(`${this.API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
          return null;
        }
        throw new Error('Failed to get user profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  static updateUserProfile(profile: UserProfile) {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }

  static logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
