import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApuViewComponent } from './apu-view.component';

describe('ApuViewComponent', () => {
  let component: ApuViewComponent;
  let fixture: ComponentFixture<ApuViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApuViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
