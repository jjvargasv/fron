import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResenasComponent } from './list-resenas.component';

describe('ListResenasComponent', () => {
  let component: ListResenasComponent;
  let fixture: ComponentFixture<ListResenasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListResenasComponent]
    });
    fixture = TestBed.createComponent(ListResenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
