export enum RolesEnun {
    ADMIN = 2,
    REPARTIDOR = 3, // CAMION
    BODEGA = 4, // Asigna a repartidor
    COMERCIAL = 5, // Crea ordenes
}

export const roles = {
    ADMIN: RolesEnun.ADMIN,
    REPARTIDOR: RolesEnun.ADMIN, // CAMION
    BODEGA: RolesEnun.BODEGA,
    COMERCIAL: RolesEnun.COMERCIAL,
};
