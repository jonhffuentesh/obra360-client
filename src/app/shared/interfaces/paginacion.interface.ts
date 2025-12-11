import { FilterMetadata } from 'primeng/api';

export interface Paginacion {
    page: number;
    limit: number;
    search?: string;
    filters?: FilterMetadata | FilterMetadata[];
    order?: {
        field: string | string[];
        direction: number;
    };
    globalFilterFields?: string[];
}
