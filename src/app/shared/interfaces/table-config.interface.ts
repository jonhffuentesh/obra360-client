/* eslint-disable @typescript-eslint/ban-types */
export interface TableConfig {
    field: string;
    header: string;
    pipe?:
        | 'currency'
        | 'date'
        | 'timestamp'
        | 'uppercase'
        | 'lowercase'
        | 'boolean'
        | 'editor'
        | 'editorModal'
        | 's3Url'
        | 'substring'
        | 'imagen'
        | 'cantidad'
        | 'cantidadModal'
        | 'isNotAplanar'
        | 'article'
        | 'number'
        | 'estadoTramite'
        | 'dateWithoutTime'
        | 'webUrl'
        | 'color'
        | 'dateToNow'
        | 'dateToNowBadge'
        | 'estados'
        | 'estadoOrden'
        | 'colorText'
        | 'localCurrency';
    pipeArgs?: string[];
    type: 'text' | 'numeric' | 'date' | 'boolean' | 'object' | 'select';
    filter?: {
        type: 'text' | 'numeric' | 'date' | 'boolean' | 'select';
        field: string;
        options?: { nombre: string; value: any }[];
    };
    sortable?: boolean;
    selectedColumn?: boolean;
    style?: Object;
    class?: string;
    columnasModal?: TableConfig[];
    bodyTemplate?: (rowData: any) => string;
    subfields?: any[];
    visible?: boolean;
    textAlign?: 'left' | 'center' | 'right';
}
