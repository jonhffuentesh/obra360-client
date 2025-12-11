import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { take, Subscription } from 'rxjs';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { HeaderTitleComponent } from 'src/app/shared/components/header-title/header-title.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { MenuTablaConfig } from 'src/app/shared/interfaces/menu-tabla-config.interface';
import { Paginacion } from 'src/app/shared/interfaces/paginacion.interface';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';
import { UsuarioInterface } from '../../interfaces/usuarios.interface';
import { UsuarioService } from '../../services/usuarios.service';
import { config } from './config';
import { PrimeNGModule } from 'src/app/shared/primeng.module';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
    styleUrls: ['./usuarios-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule, 
        TableComponent, 
        HeaderTitleComponent, 
        ButtonComponent, 
        RouterModule,
        PrimeNGModule
    ],
    providers: [DialogService, MessageService, ConfirmationService]
})
export class UsuariosListComponent implements OnInit, OnDestroy {
    menu: MenuTablaConfig = [];
    usuarios: UsuarioInterface[] = [];
    config: TableConfig[] = config;
    totalCount = 0;
    currentPage = 1;
    pageLimit = 10;
    loading = false;
    subscription = new Subscription();

    constructor(
        private usuarioService: UsuarioService,
        public router: Router,
        private route: ActivatedRoute,
        private confirmService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.getDataPaginada({
            page: this.currentPage,
            limit: this.pageLimit
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    configMenu() {
        this.menu = this.usuarios.reduce((acc, item) => {
            acc[item.id!] = this.setMenuOptions(item);
            return acc;
        }, {} as any);
    }

    setMenuOptions(item: UsuarioInterface) {
        const options: MenuItem[] = [];
        options.push({
            label: 'Ver',
            icon: 'pi pi-eye',
            command: () => {
                this.router.navigate(['ver', item.id], {
                    relativeTo: this.route
                });
            }
        });
        options.push({
            label: 'Editar',
            icon: 'pi pi-pencil',
            command: () => {
                this.router.navigate(['editar', item.id], {
                    relativeTo: this.route
                });
            }
        });

        options.push({
            label: 'Eliminar',
            icon: 'pi pi-trash',
            command: () => {
                this.eliminarUsuario(item);
            }
        });
        return options;
    }

    eliminarUsuario(item: UsuarioInterface) {
        if (!item.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se puede eliminar el usuario: ID no válido'
            });
            return;
        }

        this.confirmService.confirm({
            message: `¿Está seguro que desea eliminar el usuario "${item.nombres} ${item.apellidos}"? Esta acción no se puede deshacer.`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, eliminar',
            rejectLabel: 'No, cancelar',
            accept: () => {
                this.loading = true;
                this.subscription.add(
                    this.usuarioService
                        .eliminarUsuario(item.id)
                        .pipe(take(1))
                        .subscribe({
                            next: () => {
                                this.messageService.add({
                                    severity: 'success',
                                    summary: 'Éxito',
                                    detail: 'Usuario eliminado correctamente'
                                });
                                this.getDataPaginada({
                                    page: this.currentPage,
                                    limit: this.pageLimit
                                });
                            },
                            error: (error) => {
                                console.error('Error al eliminar el usuario:', error);
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Error',
                                    detail: 'No se pudo eliminar el usuario. Por favor, intente nuevamente.'
                                });
                                this.loading = false;
                            }
                        })
                );
            }
        });
    }

    getDataPaginada(data: Paginacion) {
        this.loading = true;
        this.subscription.add(
            this.usuarioService
                .getUsuarios()
                .pipe(take(1))
                .subscribe({
                    next: (res) => {
                        this.usuarios = res;
                        this.totalCount = res.length;
                        this.configMenu();
                    },
                    error: (error) => {
                        console.error('Error al obtener los usuarios:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No se pudieron cargar los usuarios'
                        });
                    },
                    complete: () => {
                        this.loading = false;
                    }
                })
        );
    }

    OnPagination($event: Paginacion) {
        this.currentPage = $event.page;
        this.pageLimit = $event.limit;
        this.getDataPaginada($event);
    }

    onGenerarExcel($event: any) {
        throw new Error('Method not implemented.');
    }

    editarUsuario(id: number): void {
        this.router.navigate(['/usuarios/edit', id]);
    }
}
