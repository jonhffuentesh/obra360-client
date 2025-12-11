import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';

export const config: TableConfig[] = [
    {
        field: 'id',
        header: 'ID',
        type: 'text',
        textAlign: 'center',
        sortable: true,
    },
    {
        field: 'nombres',
        header: 'Nombres',
        type: 'text',
        textAlign: 'center',
        sortable: true,
    },
    {
        field: 'apellidos',
        header: 'Apellidos',
        type: 'text',
        textAlign: 'center',
        sortable: true,
    },
    {
        field: 'correo',
        header: 'Correo',
        type: 'text',
        textAlign: 'center',
        sortable: true,
    },
    {
        field: 'telefono',
        header: 'Teléfono',
        type: 'text',
        textAlign: 'center',
        sortable: true,
    },
    {
        field: 'auth.username',
        header: 'Usuario',
        type: 'text',
        textAlign: 'center',
        sortable: true,
    },
    {
        field: 'auth.rol.nombre',
        header: 'Rol',
        type: 'text',
        textAlign: 'center',
        sortable: true,
    }
];