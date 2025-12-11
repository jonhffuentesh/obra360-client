import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

/**
 * Interceptor funcional para agregar el token de autenticación a las peticiones HTTP
 */
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('access_token');

    // Si hay token, clonar la petición y agregar el header de autorización
    if (token) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        return next(authReq);
    }

    // Si no hay token, continuar con la petición original
    return next(req);
};
