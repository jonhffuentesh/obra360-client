import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        InputTextComponent,
        ReactiveFormsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
    ],
})
export class SearchInputComponent implements OnInit {
    @Input() search: FormControl = new FormControl();
    @Output() valueEmitter: EventEmitter<string | undefined> =
        new EventEmitter();
    constructor() {}

    ngOnInit() {
        this.search.valueChanges
            .pipe(debounceTime(500), distinctUntilChanged())
            .subscribe((value) => {
                console.log('🚀>>> ~ value:', value);
                this.valueEmitter.emit(value);
            });
    }
}
