import { Routes } from '@angular/router';
import { MaterialesAddComponent } from './components/materiales-add/materiales-add.component';
import { MaterialesListComponent } from './components/materiales-list/materiales-list.component';
import { MaterialesViewComponent } from './components/materiales-view/materiales-view.component';

export const materialesRoutes: Routes = [
    { path: '', component: MaterialesListComponent },
    { path: 'crear', component: MaterialesAddComponent },
    { path: 'editar/:id', component: MaterialesAddComponent },
    { path: 'view/:id', component: MaterialesViewComponent }
]