import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesAddComponent } from './materiales-add.component';

describe('MaterialesAddComponent', () => {
  let component: MaterialesAddComponent;
  let fixture: ComponentFixture<MaterialesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
