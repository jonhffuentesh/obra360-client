import { MunicipiosInterface } from "src/app/modules/municipios/interfaces/municipios.interface";

export interface Auxiliar {
    id: number;
    identificacion: string;
    nombres: string;
    apellidos: string;
    alias: string;
    fullName: string;
    telefono_personal: string;
    direccion: string;
    email: string;
    fechaIngreso: Date;
    activo: boolean;
    auth: any;
    municipioId: any;
    municipio: MunicipiosInterface;
    placa: string;
    ruta: string;
    vehiculo: string;
}

export type CreateAuxiliar = Required<Omit<Auxiliar, 'id'>>;

export type ListAuxiliar = Pick<Auxiliar, 'identificacion' | 'fullName'>;
