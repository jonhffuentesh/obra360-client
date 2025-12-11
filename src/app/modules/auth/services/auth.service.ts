import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { TokenService } from './token.service';
import { LoginCredentials } from '../interfaces/login-credentials';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
    apiUrl = environment.api;

    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        if (isPlatformBrowser(this.platformId)) {
            // No necesitamos el evento beforeunload ya que sessionStorage mantiene la sesión
            // hasta que se cierre la pestaña
        }
    }

    login(credentials: LoginCredentials) {
        const url = `${this.apiUrl}/auth/login`;
        const { username, password } = credentials;

        
        return this.http.post<AuthResponse>(url, { username, password }).pipe(
            map(({ accessToken }) => {
                if (accessToken) {
                    this.tokenService.setToken(accessToken);
                }
                return this.tokenService.getDecodedToken();
            })
        );
    }

    isAuthenticated() {
        const exist = this.tokenService.existToken();
        if (!exist) return false;
        const expired = this.tokenService.isExpired();
        if (expired) return false;

        return true;
    }

    logout() {
        this.tokenService.removeToken();
        this.router.navigateByUrl('/auth/login');
    }

    changePassword(identificacion: number, new_password: string) {
        const url = `${this.apiUrl}/auth/update-password/${identificacion}`;
        return this.http.post(url, { new_password });
    }
} 