import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManoObraAddComponent } from './mano-obra-add.component';

describe('ManoObraAddComponent', () => {
  let component: ManoObraAddComponent;
  let fixture: ComponentFixture<ManoObraAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManoObraAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManoObraAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
