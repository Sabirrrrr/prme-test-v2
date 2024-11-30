// Route Authentication Guard
export class AuthGuard {
    static canActivate(): boolean {
        // Check if user is authenticated
        const token = localStorage.getItem('auth_token');
        return !!token;
    }

    static redirectToLogin() {
        // Redirect to login page if not authenticated
        window.location.href = '/login';
    }
}
