import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paginacion } from 'src/app/shared/interfaces/paginacion.interface';
import { TableDataPaginada } from 'src/app/shared/interfaces/table-data-paginada.interface';
import { environment } from 'src/environments/environment';
import { MunicipiosInterface } from '../interfaces/municipios.interface';

@Injectable({
    providedIn: 'root',
})
export class MunicipiosService {
    api = `${environment.api}/municipios`;
    constructor(private http: HttpClient) {}

    getPaginados(data: Paginacion) {
        return this.http.post<TableDataPaginada<MunicipiosInterface>>(
            `${this.api}/paginado`,
            data
        );
    }

    getAll() {
        return this.http.get<MunicipiosInterface[]>(`${this.api}`);
    }
}
