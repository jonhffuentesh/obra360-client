import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApuListComponent } from './apu-list.component';

describe('ApuListComponent', () => {
  let component: ApuListComponent;
  let fixture: ComponentFixture<ApuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApuListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
