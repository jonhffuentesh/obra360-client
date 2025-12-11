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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputErrorsComponent } from '../input-errors/input-errors.component';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        DropdownModule,
        ReactiveFormsModule,
        InputErrorsComponent,
    ],
})
export class DropdownComponent implements OnInit, OnChanges {
    transformedOptions: any[] = [];
    @Output() selectionChange = new EventEmitter<any>();

    @Input() options: any[] = [];
    @Input() formControlInput!: FormControl;
    @Input() label = '';
    @Input() class = '';
    @Input() styleClass = '';
    @Input() required = false;
    @Input() editable = false;
    @Input() lazy = true;
    @Input() optionLabel = 'nombre';
    @Input() optionValue = 'id';
    @Input() placeholder = 'Escoger';
    @Input() filter = false;
    @Input() labelClass = '';
    @Input() readonly = true;
    @Input() showError = true;

    @Output() valueChange = new EventEmitter<any>();
    constructor() {}

    ngOnInit() {
        this.transformOptions();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['options']) {
            this.transformOptions();
        }
    }

    transformOptions() {
        this.transformedOptions = this.options?.map((option) => {
            if (typeof option === 'string') {
                return {
                    [this.optionLabel]: option,
                    [this.optionValue]: option,
                };
            } else {
                return option;
            }
        });
    }
    onSelectionChange(event: any) {
        this.selectionChange.emit(event.value);
        const selectedOption = this.transformedOptions.find(
            (option) => option[this.optionValue] === event.value
        );
        this.formControlInput.setValue(selectedOption[this.optionValue]);
    }
}
