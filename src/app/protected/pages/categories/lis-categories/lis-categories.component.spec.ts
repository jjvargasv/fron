import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisCategoriesComponent } from './lis-categories.component';

describe('LisCategoriesComponent', () => {
  let component: LisCategoriesComponent;
  let fixture: ComponentFixture<LisCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LisCategoriesComponent]
    });
    fixture = TestBed.createComponent(LisCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
