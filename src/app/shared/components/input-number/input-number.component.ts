import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputErrorsComponent } from '../input-errors/input-errors.component';

@Component({
    selector: 'app-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        InputNumberModule,
        ReactiveFormsModule,
        InputErrorsComponent,
    ],
})
export class InputNumberComponent implements OnInit {
    @Input() formControlInput!: FormControl;
    @Input() label = '';
    @Input() inputId = '';
    @Input() placeholder = '';
    @Input() class = '';
    @Input() labelClass = '';
    @Input() required = false;
    @Input() value!: string | number;
    @Input() max!: number;
    @Input() min!: number;
    @Input() maxLength!: number;
    @Input() minLength!: number;
    @Input() textColor: 'white' | '' = '';
    @Input() showError = true;
    visible = true;

    // constructor() {}

    ngOnInit() {
        if (this.value) {
            this.formControlInput.setValue(this.value);
        }
    }
}
