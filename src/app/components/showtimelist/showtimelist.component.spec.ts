import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimelistComponent } from './showtimelist.component';

describe('ShowtimelistComponent', () => {
  let component: ShowtimelistComponent;
  let fixture: ComponentFixture<ShowtimelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowtimelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowtimelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
