import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonModule, Button } from 'primeng/button';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
    standalone: true,
    imports: [CommonModule, ButtonModule],
})
export class ButtonComponent implements OnInit {
    @Input() iconPosition: 'left' | 'right' = 'left';
    @Input() dataKey?: string;
    @Input() disabled = false;
    @Input() width = '165px';
    @Input() showIcon = false;
    @Input() label = '';
    @Input() rounded = false;
    @Input() text = false;
    @Input() raised = false;
    @Input() size: Button['size'];
    @Input() icon = '';
    @Input() severity: Button['severity'];

    @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
    constructor() {}

    ngOnInit() {}

    onClick($event: any) {
        this.clicked.emit($event);
    }
}
