import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioInterface, UpdateUsuario } from '../interfaces/usuarios.interface';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private apiUrl = `${environment.api}/auxiliares`;

    constructor(private http: HttpClient) {}

    getUsuarios(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getUsuario(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }

    crearUsuario(usuario: UsuarioInterface): Observable<any> {
        return this.http.post(this.apiUrl, usuario);
    }

    actualizarUsuario(id: number, usuario: UpdateUsuario): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}`, usuario);
    }

    eliminarUsuario(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    getRoles(): Observable<any> {
        return this.http.get(`${environment.api}/roles`);
    }
}
