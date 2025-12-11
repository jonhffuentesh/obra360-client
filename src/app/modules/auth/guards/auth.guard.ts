import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = authService.isAuthenticated();

    // Si la ruta es la página de login (/auth/login), permitir siempre el acceso
    if (state.url === '/auth/login') {
        return true;
    }

    if (!isAuthenticated) {
        // Si no está autenticado y no está en la página de login, redirige a la página de login
        return router.createUrlTree(['/login']);
    }

    return true; // Si está autenticado, permite el acceso
}; 