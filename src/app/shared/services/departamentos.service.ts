import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class DepartamentosService {
    api = `${environment.api}/departamentos`;
    constructor(private http: HttpClient) {}

    getDepartamentos() {
        return this.http.get(this.api);
    }

    getMunicipiosDepartamentos(id: number) {
        return this.http.get(`${this.api}/${id}/municipios`);
    }
}
