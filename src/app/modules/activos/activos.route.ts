import { Routes } from '@angular/router';
import { ActivosListComponent } from './components/activos-list/activos-list.component';
import { ActivosAddComponent } from './components/activos-add/activos-add.component';
import { ActivosViewComponent } from './components/activos-view/activos-view.component';

export const activosRoutes: Routes = [
    { path: '', component: ActivosListComponent },
    { path: 'crear', component: ActivosAddComponent },
    { path: 'editar/:id', component: ActivosAddComponent },
    { path: 'view/:id', component: ActivosViewComponent }
];