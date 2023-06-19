import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrelistComponent } from './genrelist.component';

describe('GenrelistComponent', () => {
  let component: GenrelistComponent;
  let fixture: ComponentFixture<GenrelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenrelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
