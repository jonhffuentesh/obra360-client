import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApuAddComponent } from './apu-add.component';

describe('ApuAddComponent', () => {
  let component: ApuAddComponent;
  let fixture: ComponentFixture<ApuAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApuAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApuAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
