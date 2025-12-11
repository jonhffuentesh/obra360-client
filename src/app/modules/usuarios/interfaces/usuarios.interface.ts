export interface UsuarioInterface {
    id?: number;
    nombres: string;
    apellidos: string;
    fullName?: string;
    fechaNacimiento: string;
    tipoIdentificacionId: number;
    identificacion: string;
    correo: string;
    telefono: string;
    direccion: string;
    departamentoId: number;
    municipioId: number;
    observaciones?: string;
    // Campos de autenticación
    username: string;
    password: string;
    rolId: number;
}

export type CreateUsuario = Omit<UsuarioInterface, 'id'>;

export type UpdateUsuario = Partial<CreateUsuario>;
