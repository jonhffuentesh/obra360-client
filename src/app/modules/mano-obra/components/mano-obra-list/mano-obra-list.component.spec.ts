import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManoObraListComponent } from './mano-obra-list.component';

describe('ManoObraListComponent', () => {
  let component: ManoObraListComponent;
  let fixture: ComponentFixture<ManoObraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManoObraListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManoObraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
