import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
            },
            {
                label: 'Materiales',
                items: [
                    { label: 'Lista de Materiales', icon: 'pi pi-fw pi-list', routerLink: ['/materiales'] },
                    { label: 'Crear Lista de Materiales', icon: 'pi pi-fw pi-plus', routerLink: ['/materiales/crear'] }
                ]
            },
            {
                label: 'Activos',
                items: [
                    { label: 'Equipos, Herramientas y transportes', icon: 'pi pi-fw pi-list', routerLink: ['/activos'] },
                    { label: 'Crear Equipos, Herramientas y transportes', icon: 'pi pi-fw pi-plus', routerLink: ['/activos/crear'] }
                ]
            },
            {
                label: 'Analisis de Precios Unitarios',
                items: [
                    { label: 'APU', icon: 'pi pi-fw pi-list', routerLink: ['/apu'] },
                    { label: 'Crear APU', icon: 'pi pi-fw pi-plus', routerLink: ['/apu/crear'] }
                ]
            },
            {
                label: 'Mano de Obra',
                items: [
                    { label: 'Mano de Obra', icon: 'pi pi-fw pi-list', routerLink: ['/mano-obra'] },
                    { label: 'Crear Mano de Obra', icon: 'pi pi-fw pi-plus', routerLink: ['/mano-obra/crear'] }
                ]
            },
            {
                label: 'Reportes',
                items: [{ label: 'Tabla de Reportes', icon: 'pi pi-fw pi-list', routerLink: ['/reportes'] }]
            },
            {
                label: 'Usuarios',
                items: [
                    { label: 'Usuarios', icon: 'pi pi-fw pi-list', routerLink: ['/usuarios'] },
                    { label: 'Crear Usuario', icon: 'pi pi-fw pi-plus', routerLink: ['/usuarios/crear'] }
                ]
            }
        ];
    }
}
