import Dexie, { Table } from 'dexie';

export interface Item {
    id?: number;
    object: string;
    synced?: boolean; // Para marcar si se sincronizó con el backend
}

export interface PedidoDb {
    id?: number;
    object: string;
}

export interface EquiposAuxiliar {
    id?: number;
    object: string;
}

export interface CilindrosAuxiliar {
    id?: number;
    object: string;
}
export interface CilindrosCliente {
    id?: number;
    object: string;
}
export class AppDatabase extends Dexie {
    pedidos!: Table<PedidoDb, number>;
    equiposAuxiliar!: Table<EquiposAuxiliar, number>;
    cilindrosAuxiliar!: Table<CilindrosAuxiliar, number>;
    equiposClientes!: Table<CilindrosCliente, number>;
    cilindrosClientes!: Table<CilindrosCliente, number>;
    evidenciasPedidos!: Table<Item, number>;
    entregablesPedidos!: Table<Item, number>;
    observacionesPedidos!: Table<Item, number>;
    firmasPedidos!: Table<Item, number>;
    cilindrosEquiposDetalle!: Table<Item, number>;
    itemsRecolectadosSync!: Table<Item, number>;
    sync!: Table<Item, number>;
    configBd!: Table<Item, number>;

    constructor() {
        super('MyDatabase');
        this.version(1).stores({
            [Tables.pedidos]: '++id,object',
            [Tables.cilindrosAuxiliar]: '++id,object',
            [Tables.equiposAuxiliar]: '++id,object',
            [Tables.cilindrosClientes]: '++id,object,clienteId',
            [Tables.equiposClientes]: '++id,object,clienteId',
            [Tables.evidenciasPedidos]: '++id,object,synced,pedidoId',
            [Tables.observacionesPedidos]: '++id,object,synced,pedidoId',
            [Tables.firmasPedidos]: '++id,object,synced,pedidoId',
            [Tables.entregablesPedidos]: '++id,object,synced,pedidoId',
            [Tables.cilindrosEquiposDetalle]:
                '++id,object,synced,pedidoId,detallePedidoId,idCilindroPedido',
            [Tables.itemsRecolectadosSync]:
                '++id,object,synced,pedidoId,detallePedidoId,idCilindroPedido',
            [Tables.sync]: '++id,fechaLastSync',
            [Tables.configBd]: '++id,fecha',
        });
    }
}

export enum Tables {
    pedidos = 'pedidos',
    equiposAuxiliar = 'equiposAuxiliar',
    cilindrosAuxiliar = 'cilindrosAuxiliar',
    evidenciasPedidos = 'evidenciasPedidos',
    observacionesPedidos = 'observacionesPedidos',
    firmasPedidos = 'firmasPedidos',
    entregablesPedidos = 'entregablesPedidos',
    cilindrosEquiposDetalle = 'cilindrosEquiposDetalle',
    cilindrosClientes = 'cilindrosClientes',
    equiposClientes = 'equiposClientes',
    itemsRecolectadosSync = 'itemsRecolectadosSync',
    sync = 'sync',
    configBd = 'configBd',
}

export const db = new AppDatabase();
