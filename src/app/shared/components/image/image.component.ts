import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css'],
    standalone: true,
    imports: [CommonModule, ImageModule],
})
export class ImageComponent implements OnInit {
    @Input() url!: string;
    @Input() width: string = '250px';
    @Input() heigth!: string;
    constructor() {}

    ngOnInit() {}
}
