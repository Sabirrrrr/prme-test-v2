export class AuthInterceptor {
    static intercept(request: Request): Request {
        const token = localStorage.getItem('auth_token');
        
        if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
        }

        return request;
    }

    static handleError(error: any) {
        if (error.status === 401) {
            // Unauthorized, redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
}