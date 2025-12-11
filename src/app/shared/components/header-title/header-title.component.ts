import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-header-title',
    templateUrl: './header-title.component.html',
    styleUrls: ['./header-title.component.css'],
    standalone: true,
    imports: [CommonModule],
})
export class HeaderTitleComponent implements OnInit {
    @Input({
        required: true,
    })
    title!: string;
    constructor() {}

    ngOnInit() {}
}
