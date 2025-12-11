import { Routes } from '@angular/router';
import { CategoriasAddComponent } from './components/categorias-add/categorias-add.component';
import { CategoriasListComponent } from './components/categorias-list/categorias-list.component';
import { CategoriasViewComponent } from './components/categorias-view/categorias-view.component';

export const categoriasRoutes: Routes = [
    { path: '', component: CategoriasListComponent },
    { path: 'crear', component: CategoriasAddComponent },
    { path: 'editar/:id', component: CategoriasAddComponent },
    { path: 'view/:id', component: CategoriasViewComponent }
];
