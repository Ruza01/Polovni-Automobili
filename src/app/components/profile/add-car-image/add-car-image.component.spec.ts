import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarImageComponent } from './add-car-image.component';

describe('AddCarImageComponent', () => {
  let component: AddCarImageComponent;
  let fixture: ComponentFixture<AddCarImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCarImageComponent]
    });
    fixture = TestBed.createComponent(AddCarImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
