import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';

/**
 * Configuración de las columnas de la tabla de categorías
 */
export const config: TableConfig[] = [
    {
        field: 'nombre',
        header: 'Nombre',
        type: 'text',
        sortable: true,
        textAlign: 'left'
    },
    {
        field: 'descripcion',
        header: 'Descripción',
        type: 'text',
        sortable: true,
        textAlign: 'left',
        pipe: 'substring',
        pipeArgs: ['100']
    },
    {
        field: 'observaciones',
        header: 'Observaciones',
        type: 'text',
        sortable: true,
        textAlign: 'left',
        pipe: 'substring',
        pipeArgs: ['100']
    },
    {
        field: 'createdAt',
        header: 'Fecha de Creación',
        type: 'date',
        pipe: 'date',
        sortable: true,
        textAlign: 'center'
    }
];
