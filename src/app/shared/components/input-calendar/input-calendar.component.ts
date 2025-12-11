import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputErrorsComponent } from '../input-errors/input-errors.component';

@Component({
    selector: 'app-input-calendar',
    templateUrl: './input-calendar.component.html',
    styleUrls: ['./input-calendar.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        CalendarModule,
        ReactiveFormsModule,
        InputErrorsComponent,
    ],
})
export class InputCalendarComponent implements OnInit {
    @Input() formControlInput!: FormControl;
    @Input() label = '';
    @Input() inputId = '';
    @Input() class = '';
    @Input() labelClass = '';
    @Input() value!: string | number | Date;
    @Input() placeholder = 'Seleccione una fecha';
    @Input() required = false;
    @Input() disable = false;
    @Input() textColor: 'white' | '' = '';
    @Input() dateFormat = 'dd/mm/yy'; // Default format
    @Input() showTime = false; // Enable time selection
    @Input() minDate!: Date; // Minimum selectable date
    @Input() maxDate!: Date; // Maximum selectable date
    @Input() showError = true;
    visible = true;
    changetype = false;

    ngOnInit(): void {
        // Initialize default values if necessary
    }
}
