import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MovimientosCilindroService {
    api = `${environment.api}/movimientos-cilindro`;
    constructor(private http: HttpClient) {}

    generarPdf(id: number) {
        return this.http.post(
            `${this.api}/print/${id}`,
            {},
            { responseType: 'blob' }
        );
    }
}
