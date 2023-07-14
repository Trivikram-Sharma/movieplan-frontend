import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittheatreComponent } from './edittheatre.component';

describe('EdittheatreComponent', () => {
  let component: EdittheatreComponent;
  let fixture: ComponentFixture<EdittheatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittheatreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
