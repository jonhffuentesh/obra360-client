import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManoObraViewComponent } from './mano-obra-view.component';

describe('ManoObraViewComponent', () => {
  let component: ManoObraViewComponent;
  let fixture: ComponentFixture<ManoObraViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManoObraViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManoObraViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
