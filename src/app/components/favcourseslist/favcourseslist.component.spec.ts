import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavCoursesListComponent } from './favcourseslist.component';

describe('FavcourseslistComponent', () => {
  let component: FavCoursesListComponent;
  let fixture: ComponentFixture<FavCoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavCoursesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavCoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
