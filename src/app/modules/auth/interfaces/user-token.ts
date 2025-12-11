import { Auxiliar } from 'src/app/shared/interfaces/auxiliar.interface';

export interface UserToken {
    user: {
        id: number;
        username: string;
        auxiliar_id: number;
    };
    auxiliar: Auxiliar;
    rol: { id: number; nombre: string };
    auxiliar_id: number;
    exp: number;
    iat: number;
    full_name: string;
}
