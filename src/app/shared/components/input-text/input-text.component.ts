import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputErrorsComponent } from '../input-errors/input-errors.component';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        InputTextModule,
        ReactiveFormsModule,
        InputErrorsComponent,
    ],
})
export class InputTextComponent implements OnInit {
    @Input() inputType: 'password' | 'text' | 'number' | 'url' = 'text';
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
    @Input() textColor: 'black' | '' = '';
    @Input() showError = true;
    @Input() readonly = false;
    @Input() uppercase = false;
    @Input() disabled = false;
    visible = true;
    changetype = false;

    viewpass() {
        this.visible = !this.visible;
        this.changetype = !this.changetype;
    }

    ngOnInit() {
        this.viewpass();
        if (this.value) {
            this.formControlInput.setValue(this.value);
        }
    }

    onInput(event: Event): void {
        if (this.uppercase) {
            const input = event.target as HTMLInputElement;
            input.value = input.value.toUpperCase();
            this.formControlInput.setValue(input.value);
        }
    }
}
