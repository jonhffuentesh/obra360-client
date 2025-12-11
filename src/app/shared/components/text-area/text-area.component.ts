import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputErrorsComponent } from '../input-errors/input-errors.component';
@Component({
    selector: 'app-text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextareaModule,
        InputErrorsComponent,
    ],
})
export class TextAreaComponent implements OnInit {
    @Input() formControlInput!: FormControl;
    @Input() label = '';
    @Input() inputId = '';
    @Input() placeholder = '';
    @Input() class = '';
    @Input() labelClass = '';
    @Input() required = false;
    @Input() value!: string | number;
    @Input() maxLength!: number;
    @Input() minLength!: number;
    @Input() textColor: 'white' | '' = '';
    @Input() showError = true;
    visible = true;
    changetype = false;

    viewpass() {
        this.visible = !this.visible;
        this.changetype = !this.changetype;
    }
    // constructor() {}

    ngOnInit() {
        this.viewpass();
        if (this.value) {
            this.formControlInput.setValue(this.value);
        }
    }
    validandoContraseña() {
        if (this.inputId.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres');
        }

        //
    }
}
