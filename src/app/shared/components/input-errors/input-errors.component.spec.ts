/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputErrorsComponent } from './input-errors.component';

describe('InputErrorsComponent', () => {
  let component: InputErrorsComponent;
  let fixture: ComponentFixture<InputErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputErrorsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
