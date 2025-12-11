import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { PasswordModule } from 'primeng/password';
import { DatePickerModule } from 'primeng/datepicker';

const PRIME_MODULES = [
    ToastModule,
    ConfirmDialogModule,
    ButtonModule,
    TableModule,
    MenuModule,
    InputTextModule,
    TextareaModule,
    InputNumberModule,
    DropdownModule,
    SelectModule,
    CalendarModule,
    MultiSelectModule,
    TooltipModule,
    CardModule,
    RippleModule,
    ProgressSpinnerModule,
    TagModule,
    FileUploadModule,
    PasswordModule,
    DatePickerModule
];

@NgModule({
    imports: [
        CommonModule,
        ...PRIME_MODULES
    ],
    exports: [
        ...PRIME_MODULES
    ],
    providers: [
        DialogService,
        ConfirmationService,
        MessageService
    ]
})
export class PrimeNGModule { } 