import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class InputErrorsComponent implements OnInit {
  @Input() formControlInput!: FormControl;
  constructor() {
    //
  }

  ngOnInit() {
    //
  }
}
