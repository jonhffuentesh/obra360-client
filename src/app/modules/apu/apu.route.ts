import { Routes } from '@angular/router';
import { ApuListComponent } from './components/apu-list/apu-list.component';
import { ApuAddComponent } from './components/apu-add/apu-add.component';
import { ApuViewComponent } from './components/apu-view/apu-view.component';

export const apuRoutes: Routes = [
    { path: '', component: ApuListComponent },
    { path: 'crear', component: ApuAddComponent },
    { path: 'editar/:id', component: ApuAddComponent },
    { path: 'view/:id', component: ApuViewComponent }
];
