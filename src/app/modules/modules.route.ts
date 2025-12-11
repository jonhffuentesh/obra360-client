import { Routes } from '@angular/router';
import { reportesRoutes } from './reportes/reportes.route';
import { usuariosRoutes } from './usuarios/usuarios.route';
import { dashboardRoutes } from './dashboard/dashboard.route';
import { materialesRoutes } from './materiales/materiales.route';
import { activosRoutes } from './activos/activos.route';
import { apuRoutes } from './apu/apu.route';
import { manoObraRoutes } from './mano-obra/mano-obra.route';

export default [
    { path: 'reportes', children: reportesRoutes },
    { path: 'usuarios', children: usuariosRoutes },
    { path: 'dashboard', children: dashboardRoutes },
    { path: 'materiales', children: materialesRoutes },
    { path: 'activos', children: activosRoutes },
    { path: 'apu', children: apuRoutes },
    { path: 'mano-obra', children: manoObraRoutes }
] as Routes;
