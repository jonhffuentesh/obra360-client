import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MenuTablaConfig } from '../../interfaces/menu-tabla-config.interface';
import { Paginacion } from '../../interfaces/paginacion.interface';
import { TableConfig } from '../../interfaces/table-config.interface';
import { aplanar } from '../../utils/aplanar-objetos';
import { DefaultTdTableComponent } from '../default-td-table/default-td-table.component';
import { RoundButtonMenuComponent } from '../round-button-menu.component';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        DefaultTdTableComponent,
        RoundButtonMenuComponent,
        TieredMenuModule,
        InputTextModule,
        FormsModule,
        ButtonModule,
        ReactiveFormsModule,
        DropdownModule,
    ],
})
export class TableComponent implements OnInit, OnChanges {
    menuOptions: MenuItem[] = [];
    dataFormated: any[] = [];
    dataFormatedNoLazy: any[] = [];
    currentPage!: number;
    currentLimit!: number;
    search!: string;
    searchControl = new FormControl('');

    @Input() loading = false;
    @Input() rows = 10;
    @Input() rowsPerPage = [10, 20, 50, 100];
    @Input() data: any[] = [];
    @Input() showBuscador = false;
    @Input() showGenerarExcel = false;
    @Input() showImportarExcel = false;
    @Input() menuInput: MenuTablaConfig = [];
    @Input() configTable: TableConfig[] = [];
    @Input() lazyLoad = true;
    @Input() menuOptionsGroup: MenuItem[] = [];
    @Input() selection = false;
    @Input() totalCount = 0;
    @Output() onPaginacion = new EventEmitter<Paginacion>();
    @Output() onGenerarExcel = new EventEmitter<void>();
    @Output() onImportarExcel = new EventEmitter<void>();
    @Input() showMenu = true;
    isMobile = false;
    @Input() subfields: string[] = [];
    @Input() globalFilterFields: string[] = [];
    @Input() showClearFilters = true;

    @Input() selectedItems: any[] = []; // Recibe el valor del padre
    @Output() selectionChange = new EventEmitter<any[]>(); // Emite los cambios al padre

    constructor() {}

    onSelectionChange($event: any) {
        this.selectionChange.emit($event);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            this.data = changes['data'].currentValue;
            this.formateo(this.data);
        }
        if (changes['menuInput']) {
            this.menuInput = changes['menuInput'].currentValue;
        }
        if (changes['menuInputGroup']) {
            this.menuOptionsGroup = changes['menuInputGroup'].currentValue;
        }
        if (changes['totalCount']) {
            this.totalCount = changes['totalCount'].currentValue;
        }
    }

    ngOnInit() {
        //
        this.searchControl.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((value) => {
                this.onPaginacion.emit({
                    page: 0,
                    limit: this.rows,
                    search: value,
                    globalFilterFields: this.globalFilterFields,
                    filters: {},
                });
            });
    }

    setMenu(item: any) {
        this.menuOptions = this.menuInput[item.id];
    }

    loadLazy($event: TableLazyLoadEvent) {
        const order = $event.sortField
            ? { direction: $event.sortOrder, field: $event.sortField }
            : null;
        this.onPaginacion.emit({
            page: $event.first,
            limit: $event.rows,
            order,
            search: this.searchControl.value,
            filters: $event.filters,
        });
    }

    formateo(data: any[]) {
        this.dataFormated = [];
        data.forEach((item: any) => {
            const result = aplanar(item);
            this.dataFormated.push(result);
        });
    }

    onPagination($event: Paginacion) {
        this.currentPage = $event.page;
        this.currentLimit = $event.limit;
    }
}
