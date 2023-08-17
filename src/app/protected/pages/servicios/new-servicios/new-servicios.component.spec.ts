import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiciosComponent } from './new-servicios.component';

describe('NewServiciosComponent', () => {
  let component: NewServiciosComponent;
  let fixture: ComponentFixture<NewServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewServiciosComponent]
    });
    fixture = TestBed.createComponent(NewServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
