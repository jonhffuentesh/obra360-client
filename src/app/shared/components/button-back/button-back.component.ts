import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-button-back',
    templateUrl: './button-back.component.html',
    styleUrls: ['./button-back.component.css'],
    imports: [CommonModule, ButtonModule],
    standalone: true,
})
export class ButtonBackComponent implements OnInit {
    constructor(private location: Location) {}

    ngOnInit() {}

    onClick($event: any) {
        this.location.back();
    }
}
