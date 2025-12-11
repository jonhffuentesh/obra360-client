import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
    AutoCompleteCompleteEvent,
    AutoCompleteModule,
} from 'primeng/autocomplete';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonComponent } from '../button/button.component';
@Component({
    selector: 'app-scan-or-code',
    templateUrl: './scan-or-code.component.html',
    styleUrls: ['./scan-or-code.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        AutoCompleteModule,
        ReactiveFormsModule,
        ButtonComponent,
    ],
})
export class ScanOrCodeComponent implements OnInit {
    control = new FormControl(null, []);
    opciones: any[] | undefined;
    opcionesFiltradas: any[] | undefined;
    label = 'nombre';

    constructor(
        private ref: DynamicDialogRef,
        private config: DynamicDialogConfig
    ) {}

    ngOnInit() {
        const opciones = this.config?.data?.opciones;
        const label = this.config?.data?.label;
        if (label) {
            this.label = label;
        }
        if (opciones && opciones.length) {
            this.opciones = opciones;
        }
    }

    onSelect() {
        this.ref.close(this.control.value);
    }

    filterCountry(event: AutoCompleteCompleteEvent) {
        let filtered: any[] = [];
        let query = event.query;

        if (this.opciones && this.opciones.length) {
            for (let i = 0; i < (this.opciones as any[]).length; i++) {
                let opcion = (this.opciones as any[])[i];
                if (
                    opcion[this.label]
                        .toLowerCase()
                        .indexOf(query.toLowerCase()) == 0
                ) {
                    filtered.push(opcion);
                }
            }
        }

        this.opcionesFiltradas = filtered;
    }
}
