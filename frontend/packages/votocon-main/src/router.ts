import { Router } from '@vaadin/router';
import { AuthService } from './services/auth';

export const router = new Router();

router.setRoutes([
  { 
    path: '/', 
    component: 'home-page',
    action: (_context, commands) => {
      if (!AuthService.isAuthenticated()) {
        return commands.redirect('/login');
      }
    }
  },
  { 
    path: '/login', 
    component: 'login-page' 
  },
  { 
    path: '/register', 
    component: 'register-page' 
  },
  { 
    path: '/upgrade', 
    component: 'upgrade-page',
    action: (_context, commands) => {
      if (!AuthService.isAuthenticated()) {
        return commands.redirect('/login');
      }
    }
  }
]);

// Method to set outlet after DOM is ready
export function initializeRouter(outlet: HTMLElement | null) {
  if (outlet) {
    router.setOutlet(outlet);
  } else {
    console.error('Router outlet not found');
  }
}
