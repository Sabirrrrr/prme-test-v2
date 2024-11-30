// Application Route Configurations
export const routes = [
    {
        path: '/',
        name: 'home',
        component: 'app-home',
        auth: false
    },
    {
        path: '/login',
        name: 'login',
        component: 'app-login',
        auth: false
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: 'app-dashboard',
        auth: true
    },
    {
        path: '/profile',
        name: 'profile',
        component: 'app-profile',
        auth: true
    }
];
