import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

export type ColorPreviewSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'n-round-button-menu',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `<button
    pButton
    type="button"
    icon="pi pi-ellipsis-v"
    class="p-button-secondary p-button-rounded p-button-text options-menu"
    (click)="onClick($event)"
  ></button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundButtonMenuComponent {
  @Output() clicked = new EventEmitter<Event>();

  onClick(event: Event) {
    this.clicked.emit(event);
  }
}
