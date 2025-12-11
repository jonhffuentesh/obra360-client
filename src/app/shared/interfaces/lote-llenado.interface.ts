import { Cilindro } from 'src/app/modules/cilindros/interfaces/cilindro.interface';

export interface LoteLlenado {
    id: number;
    codigoLote: string;
    fechaVencimiento: Date;
    createdAt: Date;
    cilindros: Cilindro[];
}
