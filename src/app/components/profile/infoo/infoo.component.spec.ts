import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfooComponent } from './infoo.component';

describe('InfooComponent', () => {
  let component: InfooComponent;
  let fixture: ComponentFixture<InfooComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfooComponent]
    });
    fixture = TestBed.createComponent(InfooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
