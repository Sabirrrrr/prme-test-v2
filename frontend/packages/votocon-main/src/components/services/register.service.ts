interface RegisterCredentials {
    email: string;
    password: string;
}

export class RegisterService {
    private static readonly BASE_URL = '/api/users/register';

    static async register(credentials: RegisterCredentials): Promise<void> {
        try {
            const response = await fetch(`${this.BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Registration failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    static validatePassword(password: string): boolean {
        // En az 8 karakter, bir büyük harf, bir küçük harf ve bir sayı içermeli
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers;
    }

    static validateEmail(email: string): boolean {
        // Basit bir email doğrulama
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
