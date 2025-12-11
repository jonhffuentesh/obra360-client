import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { take } from 'rxjs';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { HeaderTitleComponent } from 'src/app/shared/components/header-title/header-title.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { MenuTablaConfig } from 'src/app/shared/interfaces/menu-tabla-config.interface';
import { Paginacion } from 'src/app/shared/interfaces/paginacion.interface';
import { TableConfig } from 'src/app/shared/interfaces/table-config.interface';
import { CategoriasService } from '../../services/categorias.service';
import { CategoriaInterface } from '../../interfaces/categorias.interface';
import { config } from './config'

@Component({
    selector: 'app-categorias-list',
    templateUrl: './categorias-list.component.html',
    styleUrls: ['./categorias-list.component.scss'],
    standalone: true,
    providers: [ConfirmationService, MessageService],
    imports: [
        CommonModule,
        RouterModule,
        TableComponent,
        HeaderTitleComponent,
        ButtonComponent,
        ToastModule,
        ConfirmDialogModule
    ]
})
export class CategoriasListComponent implements OnInit {
    menu: MenuTablaConfig = [];
    categorias: CategoriaInterface[] = [];
    config: TableConfig[] = config;
    totalCount = 0;
    currentPage = 1;
    pageLimit = 10;
    loading = false;

    constructor(
        private readonly categoriasService: CategoriasService,
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly confirmService: ConfirmationService,
        private readonly messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.getDataPaginada({
            page: this.currentPage,
            limit: this.pageLimit
        });
    }

    configMenu(): void {
        this.menu = this.categorias.reduce((acc, item) => {
            acc[item.id] = this.setMenuOptions(item);
            return acc;
        }, {} as any);
    }

    setMenuOptions(item: CategoriaInterface): MenuItem[] {
        const options: MenuItem[] = [];
        // options.push({
        //     label: 'Ver',
        //     icon: 'pi pi-eye',
        //     command: () => {
        //         this.router.navigate(['view', item.id], {
        //             relativeTo: this.route
        //         });
        //     }
        // });
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
                this.delete(item);
            }
        });
        return options;
    }

    delete(item: CategoriaInterface): void {
        this.confirmService.confirm({
            message: `¿Está seguro de eliminar la categoría "${item.nombre}"?`,
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => {
                this.categoriasService.delete(item.id)
                    .pipe(take(1))
                    .subscribe({
                        next: () => {
                            this.getDataPaginada({
                                page: this.currentPage,
                                limit: this.pageLimit
                            });
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Éxito',
                                detail: 'La categoría ha sido eliminada correctamente'
                            });
                        },
                        error: () => {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'No se pudo eliminar la categoría'
                            });
                        }
                    });
            }
        });
    }

    getDataPaginada(data: Paginacion): void {
        this.loading = true;
        this.categoriasService.getAll()
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.categorias = response;
                    this.totalCount = response.length;
                    this.configMenu();
                },
                error: (error) => {
                    console.error('Error al cargar categorías:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se pudieron cargar las categorías'
                    });
                },
                complete: () => {
                    this.loading = false;
                }
            });
    }

    OnPagination($event: Paginacion): void {
        this.currentPage = $event.page;
        this.pageLimit = $event.limit;
        this.getDataPaginada($event);
    }

    onGenerarExcel($event: any): void {
        throw new Error('Method not implemented.');
    }
}
