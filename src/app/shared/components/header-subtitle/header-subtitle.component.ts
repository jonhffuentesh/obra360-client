import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-header-subtitle',
    templateUrl: './header-subtitle.component.html',
    standalone: true,
    imports: [CommonModule],
})
export class HeaderSubtitleComponent implements OnInit {
    @Input({ required: true }) subtitle!: string;
    constructor() {}

    ngOnInit() {}
}
