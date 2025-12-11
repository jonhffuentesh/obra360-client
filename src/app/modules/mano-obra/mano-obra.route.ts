import { Routes } from '@angular/router';
import { ManoObraListComponent } from './components/mano-obra-list/mano-obra-list.component';
import { ManoObraAddComponent } from './components/mano-obra-add/mano-obra-add.component';
import { ManoObraViewComponent } from './components/mano-obra-view/mano-obra-view.component';

export const manoObraRoutes: Routes = [
    { path: '', component: ManoObraListComponent },
    { path: 'crear', component: ManoObraAddComponent },
    { path: 'editar/:id', component: ManoObraAddComponent },
    { path: 'view/:id', component: ManoObraViewComponent }
];
