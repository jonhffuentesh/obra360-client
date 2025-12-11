import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserToken } from '../interfaces/user-token';

@Injectable({ providedIn: 'root' })
export class TokenService {
    private decodedToken: BehaviorSubject<UserToken | null>;
    decodedToken$: Observable<UserToken | null>;

    constructor() {
        this.decodedToken = new BehaviorSubject<UserToken | null>(this.getDecodedToken());
        this.decodedToken$ = this.decodedToken.asObservable();
    }

    setToken(token: string): void {
        localStorage.setItem('access_token', token);
        const decodedToken = this.getDecodedToken();
        this.decodedToken.next(decodedToken);
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    getRol(): number {
        const decode = this.getDecodedToken();
        return decode ? decode.rol.id : -1;
    }

    removeToken(): void {
        localStorage.removeItem('access_token');
        this.decodedToken.next(null);
    }

    existToken(): boolean {
        const token = this.getToken();
        return !!token;
    }

    getDecodedToken(): UserToken | null {
        const token = this.getToken();
        if (!token) {
            return null;
        }

        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error('JWT must have 3 parts');
            return null;
        }

        const decoded = JSON.parse(window.atob(parts[1]));
        return decoded;
    }

    isExpired(): boolean {
        const token = this.getDecodedToken();
        if (!token) {
            return true;
        }
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime > token.exp;
    }

    isLoggedIn(): Observable<boolean> {
        return this.decodedToken$.pipe(
            map((token) => token && !this.isExpired())
        );
    }

    getAuxiliarId(): number {
        const userToken = this.getDecodedToken();
        if (userToken) {
            return userToken.auxiliar_id;
        }
        return -1;
    }
} 