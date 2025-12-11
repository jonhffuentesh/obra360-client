export interface CategoriaInterface {
    id: number;
    nombre: string;
    descripcion: string;
    observaciones?: string;
    expanded?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export interface CreateCategoria {
    nombre: string;
    descripcion: string;
    observaciones?: string;
}

export type UpdateCategoria = Partial<CreateCategoria>; 