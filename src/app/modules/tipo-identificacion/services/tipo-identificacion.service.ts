import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paginacion } from 'src/app/shared/interfaces/paginacion.interface';
import { TableDataPaginada } from 'src/app/shared/interfaces/table-data-paginada.interface';
import { environment } from 'src/environments/environment';
import { TipoIdentificacionInterface } from '../interfaces/tipo-identificacion.interface';

@Injectable({
    providedIn: 'root',
})
export class TipoIdentificacionService {
    api = `${environment.api}/tipo-identificacion`;
    constructor(private http: HttpClient) {}

    getPaginados(data: Paginacion) {
        return this.http.post<TableDataPaginada<TipoIdentificacionInterface>>(
            `${this.api}/paginado`,
            data
        );
    }

    getAll() {
        return this.http.get<TipoIdentificacionInterface[]>(`${this.api}`);
    }
}
