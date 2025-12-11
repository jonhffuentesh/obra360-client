import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriaInterface, CreateCategoria, UpdateCategoria } from '../interfaces/categorias.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoriasService {
    private readonly apiUrl = `${environment.api}/categorias`;

    constructor(private readonly http: HttpClient) {}

    /**
     * Obtiene todas las categorías
     * @returns Observable con el array de categorías
     */
    getAll(): Observable<CategoriaInterface[]> {
        return this.http.get<CategoriaInterface[]>(this.apiUrl)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Crea una nueva categoría
     * @param categoria Datos de la categoría a crear
     * @returns Observable con la categoría creada
     */
    create(categoria: CreateCategoria): Observable<CategoriaInterface> {
        return this.http.post<CategoriaInterface>(`${this.apiUrl}/create`, categoria)
            .pipe(
                catchError(this.handleError)
            );
    }

    /**
     * Maneja los errores de las peticiones HTTP
     * @param error Error recibido
     * @returns Observable con el error
     */
    private handleError(error: any): Observable<never> {
        console.error('Error en el servicio de categorías:', error);
        return throwError(() => error);
    }

    getById(id: number): Observable<CategoriaInterface> {
        return this.http.get<CategoriaInterface>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    update(id: number, categoria: UpdateCategoria): Observable<CategoriaInterface> {
        return this.http.patch<CategoriaInterface>(`${this.apiUrl}/${id}`, categoria)
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }
} 