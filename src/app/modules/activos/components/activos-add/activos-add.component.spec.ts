import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivosAddComponent } from './activos-add.component';

describe('ActivosAddComponent', () => {
  let component: ActivosAddComponent;
  let fixture: ComponentFixture<ActivosAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivosAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
