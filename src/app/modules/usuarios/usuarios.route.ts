import { Routes } from '@angular/router';
import { UsuariosListComponent } from './components/usuarios-list/usuarios-list.component';
import { UsuariosAddComponent } from './components/usuarios-add/usuarios-add.component';

export const usuariosRoutes: Routes = [
    { path: '', component: UsuariosListComponent },
    { path: 'crear', component: UsuariosAddComponent },
    { path: 'editar/:id', component: UsuariosAddComponent }
];
