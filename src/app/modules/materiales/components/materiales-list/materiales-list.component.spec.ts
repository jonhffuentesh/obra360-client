import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesListComponent } from './materiales-list.component';

describe('MaterialesListComponent', () => {
  let component: MaterialesListComponent;
  let fixture: ComponentFixture<MaterialesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
