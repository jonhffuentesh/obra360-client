import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivosViewComponent } from './activos-view.component';

describe('ActivosViewComponent', () => {
  let component: ActivosViewComponent;
  let fixture: ComponentFixture<ActivosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivosViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
